import { useState } from "react";
import { motion } from "framer-motion";
import type { BattleTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: BattleTask;
  onSolved: () => void;
}

export function BattleCard({ task, onSolved }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const choose = (i: number) => {
    if (state === "correct") return;
    setPicked(i);
    if (i === task.correctIndex) {
      setState("correct");
      onSolved();
    } else {
      setState("wrong");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{task.prompt}</p>
      <div className="rounded-xl border border-border bg-surface px-6 py-6">
        <p className="font-hanzi text-2xl leading-relaxed">
          {task.sentenceBefore}
          <span className="mx-2 inline-flex h-9 w-9 items-center justify-center rounded-md border-2 border-dashed border-primary/60 align-middle text-primary">
            ?
          </span>
          {task.sentenceAfter}
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">{task.translation}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {task.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === task.correctIndex;
          const showState = state !== "idle" && isPicked;
          return (
            <motion.button
              key={opt.hanzi}
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
      <Feedback state={state} message={state === "correct" ? task.translation : task.hint} />
    </div>
  );
}
