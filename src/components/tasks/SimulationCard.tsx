import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SimulationRound, SimulationTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: SimulationTask;
  onSolved: () => void;
}

function getRounds(task: SimulationTask): SimulationRound[] {
  if (task.rounds && task.rounds.length > 0) return task.rounds;
  return [
    {
      npcMessage: task.npcMessage ?? "",
      npcPinyin: task.npcPinyin ?? "",
      npcTranslation: task.npcTranslation ?? "",
      options: task.options ?? [],
    },
  ];
}

export function SimulationCard({ task, onSolved }: Props) {
  const rounds = useMemo(() => getRounds(task), [task]);
  const [roundIdx, setRoundIdx] = useState(0);
  const round = rounds[roundIdx];

  const [picked, setPicked] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const choose = (i: number) => {
    if (state === "correct") return;
    setPicked(i);
    if (round.options[i].correct) {
      setState("correct");
      if (roundIdx === rounds.length - 1) onSolved();
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

  const reply = picked !== null ? round.options[picked] : null;
  const isLastRound = roundIdx === rounds.length - 1;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{task.prompt}</p>
        {rounds.length > 1 && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
            {roundIdx + 1}/{rounds.length}
          </span>
        )}
      </div>
      <div className="space-y-3">
        {/* NPC */}
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-secondary-foreground">
            王
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3">
            <div className="font-hanzi text-base">{round.npcMessage}</div>
            <div className="font-pinyin mt-1 text-xs text-primary">{round.npcPinyin}</div>
            <div className="mt-1 text-xs text-muted-foreground">{round.npcTranslation}</div>
          </div>
        </div>

        {/* User reply */}
        <AnimatePresence>
          {reply && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-end gap-3"
            >
              <div
                className={`max-w-[80%] rounded-2xl rounded-tr-sm border px-4 py-3 text-right ${
                  state === "correct"
                    ? "border-success/50 bg-success/10"
                    : "border-destructive/50 bg-destructive/10"
                }`}
              >
                <div className="font-hanzi text-base">{reply.hanzi}</div>
                <div className="font-pinyin mt-1 text-xs text-primary">{reply.pinyin}</div>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs text-primary-foreground">
                我
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NPC follow-up on success */}
        <AnimatePresence>
          {state === "correct" && reply?.reply && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-secondary-foreground">
                王
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3">
                <div className="font-hanzi text-base">{reply.reply}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {round.options.map((opt, i) => (
          <motion.button
            key={opt.hanzi}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            disabled={state === "correct"}
            onClick={() => choose(i)}
            className={`rounded-xl border-2 px-4 py-3 text-left transition ${
              picked === i && state === "wrong"
                ? "shake border-destructive bg-destructive/10"
                : picked === i && state === "correct"
                  ? "border-success bg-success/10"
                  : "border-border bg-surface hover:border-primary"
            }`}
          >
            <div className="font-hanzi text-lg">{opt.hanzi}</div>
            <div className="font-pinyin mt-1 text-xs text-primary">{opt.pinyin}</div>
          </motion.button>
        ))}
      </div>

      {state === "correct" && !isLastRound && (
        <div className="flex justify-end">
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={goNextRound}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
          >
            Следующий диалог →
          </motion.button>
        </div>
      )}

      <Feedback state={state} />
    </div>
  );
}
