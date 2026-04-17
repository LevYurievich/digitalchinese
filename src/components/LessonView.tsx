import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, PartyPopper } from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { PhaseBar, type PhaseKey } from "./PhaseBar";
import { TaskEngine } from "./TaskEngine";
import { DialogueScreen } from "./phases/DialogueScreen";
import { VocabDeck } from "./phases/VocabDeck";
import { RecapScreen } from "./phases/RecapScreen";
import { useProgress } from "@/hooks/useProgress";

interface Props {
  lesson: Lesson;
}

type Stage =
  | { phase: "listen"; dialogueIdx: number }
  | { phase: "vocab"; vocabIdx: number }
  | { phase: "practice"; taskIdx: number }
  | { phase: "recap" }
  | { phase: "done" };

export function LessonView({ lesson }: Props) {
  const navigate = useNavigate();
  const { markComplete } = useProgress();

  const dialogues = lesson.dialogues ?? [];
  const vocabSets = lesson.vocabulary ?? [];
  const tasks = lesson.tasks ?? [];

  // We use Text 1 for the Listen phase, Text 1 vocab for Vocab phase, then practice,
  // then Recap with Text 2 as a bonus listen.
  const initial: Stage =
    dialogues.length > 0
      ? { phase: "listen", dialogueIdx: 0 }
      : vocabSets.length > 0
        ? { phase: "vocab", vocabIdx: 0 }
        : tasks.length > 0
          ? { phase: "practice", taskIdx: 0 }
          : { phase: "recap" };

  const [stage, setStage] = useState<Stage>(initial);
  const [solved, setSolved] = useState<boolean[]>(() => tasks.map(() => false));

  const completedCount = solved.filter(Boolean).length;
  const currentPhase: PhaseKey = stage.phase === "done" ? "recap" : stage.phase;

  const onSolved = () => {
    if (stage.phase !== "practice") return;
    setSolved((s) => {
      if (s[stage.taskIdx]) return s;
      const n = [...s];
      n[stage.taskIdx] = true;
      return n;
    });
  };

  const goNext = () => {
    if (stage.phase === "listen") {
      // Only Text 1 here; Text 2 is used as bonus in Recap.
      if (vocabSets.length > 0) setStage({ phase: "vocab", vocabIdx: 0 });
      else if (tasks.length > 0) setStage({ phase: "practice", taskIdx: 0 });
      else setStage({ phase: "recap" });
      return;
    }
    if (stage.phase === "vocab") {
      // Show only the first vocab set in flow; second is reachable from recap if needed.
      if (tasks.length > 0) setStage({ phase: "practice", taskIdx: 0 });
      else setStage({ phase: "recap" });
      return;
    }
    if (stage.phase === "practice") {
      if (stage.taskIdx < tasks.length - 1) {
        setStage({ phase: "practice", taskIdx: stage.taskIdx + 1 });
      } else {
        setStage({ phase: "recap" });
      }
      return;
    }
    if (stage.phase === "recap") {
      markComplete(lesson.id);
      setStage({ phase: "done" });
    }
  };

  const isCurrentTaskSolved =
    stage.phase === "practice" ? solved[stage.taskIdx] : false;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-8 sm:py-12">
        {/* Top bar */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition hover:border-primary hover:text-primary"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex-1">
            <PhaseBar
              current={currentPhase}
              practiceProgress={
                tasks.length > 0
                  ? { solved: completedCount, total: tasks.length }
                  : undefined
              }
            />
          </div>
        </div>

        {/* Lesson title */}
        <div className="mb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Lesson {String(lesson.id).padStart(2, "0")} · {lesson.theme}
          </div>
          <h1 className="font-hanzi mt-1 text-3xl font-semibold tracking-tight">
            {lesson.title}{" "}
            <span className="ml-2 align-middle text-sm font-normal text-muted-foreground">
              {lesson.titleEn}
            </span>
          </h1>
        </div>

        {/* Stage content */}
        <AnimatePresence mode="wait">
          {stage.phase === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-8 text-center shadow-[var(--shadow-glow)]"
            >
              <PartyPopper className="mx-auto h-10 w-10 text-primary" />
              <h2 className="font-hanzi mt-4 text-3xl">完成！</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Lesson complete
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                You finished {lesson.title}. {lesson.id < 10 && "Lesson " + (lesson.id + 1) + " is unlocked next."}
              </p>
              <button
                onClick={() => navigate({ to: "/" })}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
              >
                Back to dashboard <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : stage.phase === "listen" ? (
            <motion.div
              key={`listen-${stage.dialogueIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8"
            >
              <DialogueScreen
                dialogue={dialogues[stage.dialogueIdx]}
                onContinue={goNext}
                ctaLabel="Continue to vocabulary →"
              />
            </motion.div>
          ) : stage.phase === "vocab" ? (
            <motion.div
              key={`vocab-${stage.vocabIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8"
            >
              <VocabDeck vocab={vocabSets[stage.vocabIdx]} onContinue={goNext} />
            </motion.div>
          ) : stage.phase === "practice" ? (
            <motion.div
              key={`task-${stage.taskIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  Phase 3 · Practice
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {stage.taskIdx + 1}/{tasks.length}
                </span>
              </div>
              <TaskEngine task={tasks[stage.taskIdx]} onSolved={onSolved} />
            </motion.div>
          ) : (
            <motion.div
              key="recap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8"
            >
              {lesson.recap ? (
                <RecapScreen
                  recap={lesson.recap}
                  bonusDialogue={dialogues[1]}
                  onFinish={goNext}
                />
              ) : (
                <div className="text-center">
                  <p>No recap available.</p>
                  <button
                    onClick={goNext}
                    className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Finish
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Practice next button */}
        <AnimatePresence>
          {stage.phase === "practice" && isCurrentTaskSolved && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex justify-end"
            >
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
              >
                {stage.taskIdx < tasks.length - 1 ? "Next task" : "To recap →"}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
