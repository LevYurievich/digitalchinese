import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ConstructorTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: ConstructorTask;
  onSolved: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ConstructorCard({ task, onSolved }: Props) {
  const initial = useMemo(() => shuffle(task.blocks), [task.blocks]);
  const [pool, setPool] = useState<string[]>(initial);
  const [slot, setSlot] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const move = (token: string, idx: number, from: "pool" | "slot") => {
    if (state === "correct") return;
    if (from === "pool") {
      setPool((p) => p.filter((_, i) => i !== idx));
      setSlot((s) => [...s, token]);
    } else {
      setSlot((s) => s.filter((_, i) => i !== idx));
      setPool((p) => [...p, token]);
    }
    setState("idle");
  };

  const check = () => {
    const ok = slot.join("|") === task.answer.join("|");
    setState(ok ? "correct" : "wrong");
    if (ok) onSolved();
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{task.prompt}</p>
      <div className="rounded-xl border border-border bg-surface px-5 py-4">
        <div className="font-pinyin text-sm text-primary">{task.pinyin}</div>
        <div className="mt-1 text-xs text-muted-foreground">{task.translation}</div>
      </div>

      <div
        className={`min-h-24 rounded-xl border-2 border-dashed p-4 transition ${
          state === "correct"
            ? "border-success bg-success/5"
            : state === "wrong"
              ? "border-destructive bg-destructive/5 shake"
              : "border-border bg-surface/50"
        }`}
      >
        <div className="font-hanzi flex flex-wrap items-center gap-2 text-2xl">
          <AnimatePresence mode="popLayout">
            {slot.length === 0 ? (
              <span className="text-base text-muted-foreground/60">Tap blocks below…</span>
            ) : (
              slot.map((t, i) => (
                <motion.button
                  key={`${t}-slot-${i}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => move(t, i, "slot")}
                  className="rounded-md border border-primary/50 bg-primary/15 px-3 py-1.5 text-primary"
                >
                  {t}
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {pool.map((t, i) => (
            <motion.button
              key={`${t}-pool-${i}`}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => move(t, i, "pool")}
              className="font-hanzi rounded-lg border-2 border-border bg-surface px-4 py-2 text-xl transition hover:border-primary"
            >
              {t}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={check}
          disabled={pool.length > 0 || state === "correct"}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110 disabled:opacity-40"
        >
          Check
        </motion.button>
        <button
          onClick={() => {
            setPool(shuffle(task.blocks));
            setSlot([]);
            setState("idle");
          }}
          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          reset
        </button>
      </div>
      <Feedback state={state} />
    </div>
  );
}
