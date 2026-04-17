import { useState } from "react";
import { motion } from "framer-motion";
import type { ToneTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: ToneTask;
  onSolved: () => void;
}

const TONE_MARKS: Record<string, string[]> = {
  a: ["ā", "á", "ǎ", "à"],
  e: ["ē", "é", "ě", "è"],
  i: ["ī", "í", "ǐ", "ì"],
  o: ["ō", "ó", "ǒ", "ò"],
  u: ["ū", "ú", "ǔ", "ù"],
};

function applyTone(syllable: string, tone: number): string {
  // priority order: a, o, e, then last of i/u
  const priorities = ["a", "o", "e"];
  for (const v of priorities) {
    const i = syllable.indexOf(v);
    if (i >= 0) return syllable.slice(0, i) + TONE_MARKS[v][tone - 1] + syllable.slice(i + 1);
  }
  // fall back to last vowel
  for (let i = syllable.length - 1; i >= 0; i--) {
    const ch = syllable[i];
    if (TONE_MARKS[ch]) return syllable.slice(0, i) + TONE_MARKS[ch][tone - 1] + syllable.slice(i + 1);
  }
  return syllable;
}

export function ToneCard({ task, onSolved }: Props) {
  const [picks, setPicks] = useState<(number | null)[]>(() =>
    task.syllables.map(() => null),
  );
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const setTone = (i: number, tone: number) => {
    if (state === "correct") return;
    setPicks((p) => {
      const next = [...p];
      next[i] = tone;
      return next;
    });
    setState("idle");
  };

  const check = () => {
    const ok = task.syllables.every((s, i) => picks[i] === s.correctTone);
    setState(ok ? "correct" : "wrong");
    if (ok) onSolved();
  };

  const allPicked = picks.every((p) => p !== null);

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{task.prompt}</p>
      <div className="rounded-xl border border-border bg-surface px-6 py-6 text-center">
        <div className="font-hanzi text-4xl">{task.word}</div>
        <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
          {task.translation}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-center gap-6">
        {task.syllables.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="font-pinyin text-3xl text-primary">
              {picks[i] ? applyTone(s.base, picks[i]!) : s.base}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((t) => (
                <motion.button
                  key={t}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTone(i, t)}
                  className={`h-10 w-10 rounded-md border-2 font-mono text-sm transition ${
                    picks[i] === t
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-surface hover:border-primary/60"
                  }`}
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={check}
        disabled={!allPicked || state === "correct"}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110 disabled:opacity-40"
      >
        Check tones
      </motion.button>
      <Feedback state={state} />
    </div>
  );
}
