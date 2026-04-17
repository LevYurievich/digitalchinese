import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { BattleRound, BattleTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: BattleTask;
  onSolved: () => void;
}

function getRounds(task: BattleTask): BattleRound[] {
  if (task.rounds && task.rounds.length > 0) return task.rounds;
  // Legacy single-round fallback.
  return [
    {
      sentenceBefore: task.sentenceBefore ?? "",
      sentenceAfter: task.sentenceAfter ?? "",
      options: task.options ?? [],
      correctIndex: task.correctIndex ?? 0,
      translation: task.translation ?? "",
      hint: task.hint,
    },
  ];
}

export function BattleCard({ task, onSolved }: Props) {
  const rounds = useMemo(() => getRounds(task), [task]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const round = rounds[roundIdx];
  const isLastRound = roundIdx === rounds.length - 1;

  const choose = (i: number) => {
    if (state === "correct") return;
    setPicked(i);
    if (i === round.correctIndex) {
      setState("correct");
      if (isLastRound) onSolved();
    } else {
      setState("wrong");
    }
  };

  const goNextRound = () => {
    const next = roundIdx + 1;
    if (next < rounds.length) {
      setRoundIdx(next);
      setPicked(null);
      setState("idle");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{task.prompt}</p>
        {rounds.length > 1 && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
            {roundIdx + 1}/{rounds.length}
          </span>
        )}
      </div>
      <div className="rounded-xl border border-border bg-surface px-6 py-6">
        <p className="font-hanzi text-2xl leading-relaxed">
          {round.sentenceBefore}
          <span className="mx-2 inline-flex h-9 w-9 items-center justify-center rounded-md border-2 border-dashed border-primary/60 align-middle text-primary">
            ?
          </span>
          {round.sentenceAfter}
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">{round.translation}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {round.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === round.correctIndex;
          const showState = state !== "idle" && isPicked;
          return (
            <motion.button
              key={`${roundIdx}-${opt.hanzi}-${i}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => choose(i)}
              className={`group rounded-xl border-2 bg-surface px-5 py-5 text-left transition ${
                showState && isCorrect
                  ? "border-success bg-success/10"
                  : showState && !isCorrect
                    ? "border-destructive bg-destructive/10 shake"
                    : "border-border hover:border-primary"
              }`}
            >
              <div className="font-hanzi text-3xl">{opt.hanzi}</div>
              <div className="mt-1 font-pinyin text-sm text-primary">{opt.pinyin}</div>
              <div className="mt-1 text-xs text-muted-foreground">{opt.meaning}</div>
            </motion.button>
          );
        })}
      </div>
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
      ) : null}
      <Feedback state={state} message={state === "correct" ? round.translation : round.hint} />
    </div>
  );
}
