import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { SynthesisTask } from "@/data/lessons";
import { Feedback } from "@/components/Feedback";

interface Props {
  task: SynthesisTask;
  onSolved: () => void;
}

// crude pattern check: '出' suffix counts as V+出 if not preceded by space
function matchesPattern(text: string, requirement: string): boolean {
  if (requirement.includes("V + 出") || requirement.includes("V+出")) {
    // any character followed by 出
    return /[\u4e00-\u9fa5]出/.test(text);
  }
  // strip parenthetical
  const token = requirement.replace(/\s*\(.*\)/, "").trim();
  // patterns with ellipsis (…  or ...) — match A…B as A<anything>B
  if (token.includes("…") || token.includes("...")) {
    const parts = token
      .split(/…|\.{3}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (parts.length >= 2) {
      const re = new RegExp(parts.join("[\\s\\S]{0,40}?"));
      return re.test(text);
    }
  }
  return text.includes(token);
}

export function SynthesisCard({ task, onSolved }: Props) {
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const sentenceCount = useMemo(
    () => text.split(/[。.！？!?\n]+/).filter((s) => s.trim().length > 1).length,
    [text],
  );

  const requirementsMet = task.required.map((r) => ({
    label: r,
    met: matchesPattern(text, r),
  }));

  const allMet = requirementsMet.every((r) => r.met) && sentenceCount >= task.minSentences;

  const submit = () => {
    if (allMet) {
      setState("correct");
      onSolved();
    } else {
      setState("wrong");
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-surface px-5 py-4">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Required ({task.minSentences}+ sentences)
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {requirementsMet.map((r) => (
            <span
              key={r.label}
              className={`font-hanzi rounded-md border px-2.5 py-1 text-sm transition ${
                r.met
                  ? "border-success/50 bg-success/10 text-success"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {r.label} {r.met && "✓"}
            </span>
          ))}
        </div>
        {task.retroWords && task.retroWords.length > 0 && (
          <div className="mt-3">
            <div className="text-xs uppercase tracking-widest text-primary/80">Retro words</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {task.retroWords.map((w) => (
                <span key={w} className="font-hanzi rounded border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (state === "wrong") setState("idle");
        }}
        rows={6}
        placeholder="写下你的句子…"
        className={`font-hanzi w-full rounded-xl border-2 bg-surface px-5 py-4 text-lg leading-relaxed outline-none transition placeholder:text-muted-foreground/50 focus:border-primary ${
          state === "wrong" ? "border-destructive shake" : "border-border"
        } ${state === "correct" ? "border-success" : ""}`}
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono">
          sentences · {sentenceCount}/{task.minSentences}
        </span>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={submit}
          disabled={state === "correct"}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110 disabled:opacity-40"
        >
          Submit
        </motion.button>
      </div>
      <Feedback
        state={state}
        message={
          state === "wrong"
            ? "Use every required item across enough sentences"
            : "Beautifully done"
        }
      />
    </div>
  );
}
