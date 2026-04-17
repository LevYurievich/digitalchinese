import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { MatchingTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: MatchingTask;
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

export function MatchingCard({ task, onSolved }: Props) {
  const rights = useMemo(() => shuffle(task.pairs.map((p) => p.right)), [task.pairs]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const tryMatch = (right: string) => {
    if (!selectedLeft) return;
    const pair = task.pairs.find((p) => p.left === selectedLeft);
    if (pair && pair.right === right) {
      const next = { ...matched, [selectedLeft]: right };
      setMatched(next);
      setSelectedLeft(null);
      if (Object.keys(next).length === task.pairs.length) {
        setState("correct");
        onSolved();
      }
    } else {
      setWrong(right);
      setTimeout(() => setWrong(null), 400);
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{task.prompt}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {task.pairs.map((p) => {
            const done = matched[p.left];
            const active = selectedLeft === p.left;
            return (
              <motion.button
                key={p.left}
                whileTap={{ scale: 0.98 }}
                disabled={!!done}
                onClick={() => setSelectedLeft(p.left)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                  done
                    ? "border-success/40 bg-success/10 opacity-70"
                    : active
                      ? "border-primary bg-primary/10"
                      : "border-border bg-surface hover:border-primary/60"
                }`}
              >
                <span className="text-2xl">{p.left}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {p.leftLabel}
                </span>
              </motion.button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rights.map((r) => {
            const isMatched = Object.values(matched).includes(r);
            const isWrong = wrong === r;
            return (
              <motion.button
                key={r}
                whileTap={{ scale: 0.98 }}
                disabled={isMatched || !selectedLeft}
                onClick={() => tryMatch(r)}
                className={`font-hanzi w-full rounded-xl border-2 px-4 py-3 text-lg transition ${
                  isMatched
                    ? "border-success/40 bg-success/10 opacity-70"
                    : isWrong
                      ? "shake border-destructive bg-destructive/10"
                      : "border-border bg-surface hover:border-primary/60 disabled:opacity-50"
                }`}
              >
                {r}
              </motion.button>
            );
          })}
        </div>
      </div>
      <Feedback state={state} />
    </div>
  );
}
