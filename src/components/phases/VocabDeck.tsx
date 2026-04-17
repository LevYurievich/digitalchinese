import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Check, RotateCcw, Volume2 } from "lucide-react";
import type { VocabSet } from "@/data/lessons";

interface Props {
  vocab: VocabSet;
  onContinue: () => void;
}

type CardState = "pending" | "known" | "review";

export function VocabDeck({ vocab, onContinue }: Props) {
  const [index, setIndex] = useState(0);
  const [states, setStates] = useState<CardState[]>(() => vocab.items.map(() => "pending"));
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const total = vocab.items.length;
  const known = useMemo(() => states.filter((s) => s === "known").length, [states]);
  const review = useMemo(() => states.filter((s) => s === "review").length, [states]);
  const seen = known + review;
  const done = seen >= total;

  const current = vocab.items[index];

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(vocab.audio);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const advance = (verdict: CardState) => {
    setStates((prev) => {
      const next = [...prev];
      next[index] = verdict;
      return next;
    });
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, total - 1));
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (done) return;
    if (info.offset.x > 100) advance("known");
    else if (info.offset.x < -100) advance("review");
  };

  const restart = () => {
    setStates(vocab.items.map(() => "pending"));
    setIndex(0);
    setFlipped(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Phase 2 · Vocabulary
          </div>
          <h2 className="font-hanzi mt-1 text-2xl font-semibold">{vocab.title}</h2>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          {Math.min(index + 1, total)} / {total}
        </div>
      </div>

      {/* progress strip */}
      <div className="flex gap-1">
        {states.map((s, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition ${
              s === "known"
                ? "bg-success"
                : s === "review"
                  ? "bg-destructive/70"
                  : i === index
                    ? "bg-primary/40"
                    : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="relative h-[320px]">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-6 text-center"
            >
              <Check className="h-10 w-10 text-success" />
              <h3 className="font-hanzi mt-3 text-xl">词汇过完了</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Vocab pass complete
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="text-success">{known} known</span> ·{" "}
                <span className="text-destructive">{review} to review</span>
              </p>
              <div className="mt-6 flex gap-3">
                {review > 0 && (
                  <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm transition hover:border-primary"
                  >
                    <RotateCcw className="h-4 w-4" /> Review again
                  </button>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onContinue}
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
                >
                  Start practice →
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={current.hanzi + index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 0 }}
              whileTap={{ cursor: "grabbing" }}
              onClick={() => setFlipped((f) => !f)}
              className="absolute inset-0 flex cursor-grab flex-col items-center justify-center rounded-2xl border-2 border-border bg-card p-6 text-center shadow-[var(--shadow-glow-soft)]"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  play();
                }}
                aria-label="Play vocab audio"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {current.pos}
              </span>
              <p className="font-hanzi mt-4 text-5xl tracking-wider text-glow">{current.hanzi}</p>
              <p className="font-pinyin mt-3 text-lg text-primary">{current.pinyin}</p>
              <AnimatePresence>
                {flipped && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 max-w-xs text-sm text-foreground/80"
                  >
                    {current.meaning}
                  </motion.p>
                )}
              </AnimatePresence>
              {!flipped && (
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Tap to reveal · swipe ← review · swipe → know
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!done && (
        <div className="flex items-center justify-between gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => advance("review")}
            className="flex-1 rounded-lg border-2 border-destructive/40 bg-destructive/5 px-4 py-2.5 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
          >
            Review later
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => advance("known")}
            className="flex-1 rounded-lg border-2 border-success/40 bg-success/5 px-4 py-2.5 text-sm font-semibold text-success transition hover:bg-success/10"
          >
            I know this
          </motion.button>
        </div>
      )}
    </div>
  );
}
