import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { SpeedrunRound, SpeedrunTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: SpeedrunTask;
  onSolved: () => void;
}

function getRounds(task: SpeedrunTask): SpeedrunRound[] {
  if (task.rounds && task.rounds.length > 0) return task.rounds;
  // Legacy single-round fallback.
  return [
    {
      pinyin: task.pinyin ?? "",
      answer: task.answer ?? "",
      translation: task.translation ?? "",
    },
  ];
}

export function SpeedrunCard({ task, onSolved }: Props) {
  const rounds = useMemo(() => getRounds(task), [task]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const round = rounds[roundIdx];
  const isLastRound = roundIdx === rounds.length - 1;

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "correct") return;
    const ok = value.trim() === round.answer;
    setState(ok ? "correct" : "wrong");
    if (ok && isLastRound) onSolved();
  };

  const goNextRound = () => {
    const next = roundIdx + 1;
    if (next < rounds.length) {
      setRoundIdx(next);
      setValue("");
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

      <div className="rounded-xl border border-border bg-surface px-5 py-6 text-center">
        <span className="font-pinyin text-2xl text-primary">{round.pinyin}</span>
      </div>

      <form onSubmit={check} className="space-y-4">
        <input
          autoFocus
          key={roundIdx}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (state === "wrong") setState("idle");
          }}
          placeholder="输入汉字…"
          className={`font-hanzi w-full rounded-xl border-2 bg-surface px-5 py-4 text-2xl tracking-wide outline-none transition placeholder:text-muted-foreground/50 focus:border-primary ${
            state === "wrong" ? "shake border-destructive" : "border-border"
          } ${state === "correct" ? "border-success" : ""}`}
        />
        <div className="flex items-center gap-3">
          {state === "correct" && !isLastRound ? (
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={goNextRound}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
            >
              Следующее слово →
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={!value || state === "correct"}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110 disabled:opacity-40"
            >
              Проверить
            </motion.button>
          )}
        </div>
        <Feedback
          state={state}
          message={
            state === "correct"
              ? `${round.answer} — ${round.translation}`
              : "Не то — попробуй ещё раз"
          }
        />
      </form>
    </div>
  );
}
