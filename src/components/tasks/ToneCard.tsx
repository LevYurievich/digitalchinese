import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ToneRound, ToneTask } from "@/data/lessons";
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
  const priorities = ["a", "o", "e"];
  for (const v of priorities) {
    const i = syllable.indexOf(v);
    if (i >= 0) return syllable.slice(0, i) + TONE_MARKS[v][tone - 1] + syllable.slice(i + 1);
  }
  for (let i = syllable.length - 1; i >= 0; i--) {
    const ch = syllable[i];
    if (TONE_MARKS[ch]) return syllable.slice(0, i) + TONE_MARKS[ch][tone - 1] + syllable.slice(i + 1);
  }
  return syllable;
}

function getRounds(task: ToneTask): ToneRound[] {
  if (task.rounds && task.rounds.length > 0) return task.rounds;
  return [
    {
      word: task.word ?? "",
      translation: task.translation ?? "",
      syllables: task.syllables ?? [],
    },
  ];
}

export function ToneCard({ task, onSolved }: Props) {
  const rounds = useMemo(() => getRounds(task), [task]);
  const [roundIdx, setRoundIdx] = useState(0);
  const round = rounds[roundIdx];
  const isLastRound = roundIdx === rounds.length - 1;

  const [picks, setPicks] = useState<(number | null)[]>(() =>
    round.syllables.map(() => null),
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
    const ok = round.syllables.every((s, i) => picks[i] === s.correctTone);
    setState(ok ? "correct" : "wrong");
    if (ok && isLastRound) onSolved();
  };

  const goNextRound = () => {
    const next = roundIdx + 1;
    if (next < rounds.length) {
      setRoundIdx(next);
      setPicks(rounds[next].syllables.map(() => null));
      setState("idle");
    }
  };

  const allPicked = picks.every((p) => p !== null);

  return (
    <div className="space-y-5">
      {rounds.length > 1 && (
        <div className="flex justify-end">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
            {roundIdx + 1}/{rounds.length}
          </span>
        </div>
      )}
      <div className="rounded-xl border border-border bg-surface px-6 py-6 text-center">
        <div className="font-hanzi text-4xl">{round.word}</div>
        <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
          {round.translation}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-center gap-6">
        {round.syllables.map((s, i) => (
          <div key={`${roundIdx}-${i}`} className="flex flex-col items-center gap-3">
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

      <div className="flex items-center gap-3">
        {state === "correct" && !isLastRound ? (
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={goNextRound}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
          >
            Следующее слово →
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={check}
            disabled={!allPicked || state === "correct"}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110 disabled:opacity-40"
          >
            Проверить тоны
          </motion.button>
        )}
      </div>
      <Feedback state={state} />
    </div>
  );
}
