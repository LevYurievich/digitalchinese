import { Headphones, BookOpen, Gamepad2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PhaseKey = "listen" | "vocab" | "practice" | "recap";

interface Props {
  current: PhaseKey;
  /** practice phase sub-progress: solved tasks / total tasks */
  practiceProgress?: { solved: number; total: number };
}

const PHASES: { key: PhaseKey; label: string; Icon: LucideIcon }[] = [
  { key: "listen", label: "Listen", Icon: Headphones },
  { key: "vocab", label: "Vocab", Icon: BookOpen },
  { key: "practice", label: "Practice", Icon: Gamepad2 },
  { key: "recap", label: "Recap", Icon: Sparkles },
];

const ORDER: PhaseKey[] = ["listen", "vocab", "practice", "recap"];

export function PhaseBar({ current, practiceProgress }: Props) {
  const currentIdx = ORDER.indexOf(current);

  return (
    <div className="flex w-full items-center gap-2">
      {PHASES.map(({ key, label, Icon }, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const showSub = active && key === "practice" && practiceProgress;

        return (
          <div key={key} className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${
                  done
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow-soft)]"
                    : active
                      ? "bg-primary/15 text-primary ring-1 ring-primary/40"
                      : "bg-surface text-muted-foreground"
                }`}
              >
                <Icon className="h-3 w-3" />
              </div>
              <span
                className={`hidden font-mono text-[10px] uppercase tracking-widest sm:inline ${
                  done || active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {/* segment line */}
            <div
              className={`h-1 w-full rounded-full transition-all duration-500 ${
                done
                  ? "bg-primary"
                  : active
                    ? "bg-gradient-to-r from-primary to-primary/20"
                    : "bg-border"
              }`}
            />
            {showSub && practiceProgress && (
              <div className="flex gap-0.5">
                {Array.from({ length: practiceProgress.total }).map((_, t) => (
                  <div
                    key={t}
                    className={`h-0.5 flex-1 rounded-full ${
                      t < practiceProgress.solved ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
