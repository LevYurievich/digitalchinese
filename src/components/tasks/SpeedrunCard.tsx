import { useState } from "react";
import { motion } from "framer-motion";
import type { SpeedrunTask } from "@/data/lessons";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: SpeedrunTask;
  onSolved: () => void;
}

export function SpeedrunCard({ task, onSolved }: Props) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "correct") return;
    const ok = value.trim() === task.answer;
    setState(ok ? "correct" : "wrong");
    if (ok) onSolved();
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{task.prompt}</p>
      {task.mode === "audio-to-hanzi" && (
        <AudioPlayer src={task.audio} label={`Lesson audio · ${task.pinyin}`} />
      )}
      {task.mode === "pinyin-to-hanzi" && task.pinyin && (
        <div className="rounded-xl border border-border bg-surface px-5 py-6 text-center">
          <span className="font-pinyin text-2xl text-primary">{task.pinyin}</span>
        </div>
      )}
      <form onSubmit={check} className="space-y-4">
        <input
          autoFocus
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
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={!value || state === "correct"}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110 disabled:opacity-40"
          >
            Check
          </motion.button>
          {task.hint && (
            <span className="font-mono text-xs text-muted-foreground">hint · {task.hint}</span>
          )}
        </div>
        <Feedback
          state={state}
          message={
            state === "correct"
              ? `${task.answer} — ${task.translation}`
              : "Not quite — listen again"
          }
        />
      </form>
    </div>
  );
}
