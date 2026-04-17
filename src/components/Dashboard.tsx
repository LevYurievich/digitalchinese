import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";

export function Dashboard() {
  const { completed, reset } = useProgress();

  return (
    <main className="grid-bg relative min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                · Digital Chinese
              </span>
            </div>
            <h1 className="font-hanzi mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              数字化语境中学中文
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Интерактивный учебник для цифровой эпохи.{" "}
              <span className="font-mono text-primary">10 уроков</span> · адаптивный движок из 8 заданий ·
              обучение через контекст.
            </p>
          </div>
          <div className="hidden text-right sm:block">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              progress
            </div>
            <div className="font-mono text-3xl text-primary text-glow">
              {completed.length}/{lessons.length}
            </div>
            {completed.length > 0 && (
              <button
                onClick={reset}
                className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" /> reset
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {lessons.map((l, idx) => {
            const isLocked = l.status === "locked";
            const isDone = completed.includes(l.id);
            const card = (
              <motion.div
                whileHover={!isLocked ? { y: -4 } : undefined}
                whileTap={!isLocked ? { scale: 0.98 } : undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={`group relative flex h-full min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl border-2 bg-surface p-5 transition ${
                  isLocked
                    ? "border-border opacity-60"
                    : "border-primary/30 hover:border-primary hover:shadow-[var(--shadow-glow)]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    L{String(l.id).padStart(2, "0")}
                  </span>
                  {isLocked ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : isDone ? (
                    <Sparkles className="h-4 w-4 text-primary" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  )}
                </div>
                <div>
                  <div className="font-hanzi text-2xl font-semibold tracking-tight">
                    {l.title}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {l.titleEn}
                  </div>
                  <div className="mt-2 font-mono text-[10px] text-primary/70">{l.theme}</div>
                </div>
                {!isLocked && (
                  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                )}
              </motion.div>
            );
            return isLocked ? (
              <div key={l.id}>{card}</div>
            ) : (
              <Link key={l.id} to="/lesson/$lessonId" params={{ lessonId: String(l.id) }}>
                {card}
              </Link>
            );
          })}
        </div>

        <p className="mt-12 font-mono text-xs text-muted-foreground">
          Каждый урок:{" "}
          <span className="text-primary">Listen → Vocab → Practice → Recap</span>.
        </p>
      </div>
    </main>
  );
}
