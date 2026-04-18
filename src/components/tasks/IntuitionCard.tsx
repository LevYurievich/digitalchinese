import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IntuitionRound, IntuitionTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: IntuitionTask;
  onSolved: () => void;
}

function getRounds(task: IntuitionTask): IntuitionRound[] {
  if (task.rounds && task.rounds.length > 0) return task.rounds;
  return [
    {
      brokenSentence: task.brokenSentence ?? [],
      correctOrder: task.correctOrder ?? [],
      translation: task.translation ?? "",
    },
  ];
}

export function IntuitionCard({ task, onSolved }: Props) {
  const rounds = useMemo(() => getRounds(task), [task]);
  const [roundIdx, setRoundIdx] = useState(0);
  const round = rounds[roundIdx];
  const isLastRound = roundIdx === rounds.length - 1;

  const [order, setOrder] = useState<number[]>(() =>
    round.brokenSentence.map((_, i) => i),
  );
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const swap = (idx: number, dir: -1 | 1) => {
    if (state === "correct") return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    setOrder((o) => {
      const n = [...o];
      [n[idx], n[j]] = [n[j], n[idx]];
      return n;
    });
    setState("idle");
  };

  const check = () => {
    const ok = order.join("|") === round.correctOrder.join("|");
    setState(ok ? "correct" : "wrong");
    if (ok && isLastRound) onSolved();
  };

  const goNextRound = () => {
    const next = roundIdx + 1;
    if (next < rounds.length) {
      setRoundIdx(next);
      setOrder(rounds[next].brokenSentence.map((_, i) => i));
      setState("idle");
    }
  };

  return (
    <div className="space-y-5">
      {rounds.length > 1 && (
        <div className="flex justify-end">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
            {roundIdx + 1}/{rounds.length}
          </span>
        </div>
      )}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-4">
        <div className="text-xs uppercase tracking-widest text-destructive/80">broken</div>
        <div className="font-hanzi mt-1 text-xl line-through opacity-70">
          {round.brokenSentence.join(" ")}
        </div>
      </div>

      <div
        className={`rounded-xl border-2 p-4 transition ${
          state === "correct"
            ? "border-success bg-success/5"
            : state === "wrong"
              ? "border-destructive bg-destructive/5 shake"
              : "border-border bg-surface"
        }`}
      >
        <div className="font-hanzi flex flex-wrap items-center gap-2 text-2xl">
          <AnimatePresence>
            {order.map((origIdx, i) => (
              <motion.div key={`${roundIdx}-${origIdx}`} layout className="flex flex-col items-center gap-1">
                <div className="rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-primary">
                  {round.brokenSentence[origIdx]}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => swap(i, -1)}
                    disabled={i === 0}
                    className="rounded border border-border bg-surface px-1.5 text-xs text-muted-foreground hover:border-primary disabled:opacity-30"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => swap(i, 1)}
                    disabled={i === order.length - 1}
                    className="rounded border border-border bg-surface px-1.5 text-xs text-muted-foreground hover:border-primary disabled:opacity-30"
                  >
                    ▶
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-3 font-mono text-xs text-muted-foreground">{round.translation}</p>
      </div>

      <div className="flex items-center gap-3">
        {state === "correct" && !isLastRound ? (
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={goNextRound}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
          >
            Следующее предложение →
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={check}
            disabled={state === "correct"}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110 disabled:opacity-40"
          >
            Проверить порядок
          </motion.button>
        )}
      </div>
      <Feedback state={state} />
    </div>
  );
}
