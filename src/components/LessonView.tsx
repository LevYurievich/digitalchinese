import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, PartyPopper } from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { ProgressBar } from "./ProgressBar";
import { TaskEngine } from "./TaskEngine";
import { useProgress } from "@/hooks/useProgress";

interface Props {
  lesson: Lesson;
}

export function LessonView({ lesson }: Props) {
  const navigate = useNavigate();
  const { markComplete } = useProgress();
  const tasks = lesson.tasks ?? [];
  const [index, setIndex] = useState(0);
  const [solved, setSolved] = useState<boolean[]>(() => tasks.map(() => false));
  const [finished, setFinished] = useState(false);

  const current = tasks[index];
  const completedCount = solved.filter(Boolean).length;
  const isCurrentSolved = solved[index];

  const onSolved = () => {
    setSolved((s) => {
      if (s[index]) return s;
      const n = [...s];
      n[index] = true;
      return n;
    });
  };

  const next = () => {
    if (index < tasks.length - 1) {
      setIndex((i) => i + 1);
    } else {
      markComplete(lesson.id);
      setFinished(true);
    }
  };

  if (!current) return null;

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
            <ProgressBar total={tasks.length} current={index} completed={completedCount} />
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            {index + 1}/{tasks.length}
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

        {/* Task / Finished */}
        <AnimatePresence mode="wait">
          {finished ? (
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
                You finished all 8 tasks of {lesson.title}.
              </p>
              <button
                onClick={() => navigate({ to: "/" })}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
              >
                Back to dashboard <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8"
            >
              <TaskEngine task={current} onSolved={onSolved} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next */}
        <AnimatePresence>
          {!finished && isCurrentSolved && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex justify-end"
            >
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={next}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
              >
                {index < tasks.length - 1 ? "Next task" : "Finish lesson"}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
