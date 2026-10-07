import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Shuffle, X } from "lucide-react";
import { reviewWords } from "@/data/review";

const STORAGE_KEY = "dc-review-forgotten";

export const Route = createFileRoute("/review")({
  component: ReviewPage,
  head: () => ({
    meta: [
      { title: "Review · 复习 — Digital Chinese" },
      { name: "description", content: "Flashcards with the 300 most common words from the whole course." },
      { property: "og:title", content: "Review · 复习 — Digital Chinese" },
      { property: "og:description", content: "Flashcards with the 300 most common words from the whole course." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function loadForgotten(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function ReviewPage() {
  const [forgotten, setForgotten] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<"all" | "forgotten">("all");
  const [pos, setPos] = useState(0);
  const [shuffled, setShuffled] = useState<number[] | null>(null);
  const [flipped, setFlipped] = useState(false);

  // load persisted "don't remember" marks after hydration
  useEffect(() => {
    setForgotten(loadForgotten());
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(forgotten));
    } catch {
      /* ignore */
    }
  }, [forgotten]);

  const forgottenCount = Object.values(forgotten).filter(Boolean).length;

  const deck =
    mode === "all"
      ? reviewWords.map((_, i) => i)
      : reviewWords.map((_, i) => i).filter((i) => forgotten[reviewWords[i].hanzi]);

  const order = shuffled ?? deck;
  const total = order.length;

  const go = (d: number) => {
    setFlipped(false);
    setPos((p) => (total ? (p + d + total) % total : 0));
  };
  const shuffle = () => {
    const a = [...deck];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setShuffled(a);
    setPos(0);
    setFlipped(false);
  };

  const markForgotten = (hanzi: string) => {
    setForgotten((f) => ({ ...f, [hanzi]: true }));
  };
  const markKnown = (hanzi: string) => {
    setForgotten((f) => {
      const next = { ...f };
      delete next[hanzi];
      return next;
    });
    // deck shrinks by one in forgotten mode; clamp position
    setPos((p) => (total - 1 > 0 ? p % (total - 1) : 0));
    setFlipped(false);
  };

  const switchMode = (m: "all" | "forgotten") => {
    setMode(m);
    setShuffled(null);
    setPos(0);
    setFlipped(false);
  };

  const w = total ? reviewWords[order[Math.min(pos, total - 1)]] : null;

  return (
    <main className="grid-bg relative min-h-screen">
      <div className="mx-auto max-w-xl px-6 py-12 sm:py-20">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Назад
        </Link>
        <div className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">Review · 复习</div>
        <h1 className="font-hanzi mt-2 text-3xl font-bold">
          {mode === "all" ? "300 самых употребляемых слов" : "Повторение: не помню"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "all"
            ? "Посмотри на английское слово (и перевод), вспомни иероглифы и произношение, затем переверни карточку."
            : `Здесь только слова, отмеченные «не помню». Вспомнил слово — нажми «Знаю», и оно уйдёт из списка.`}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
          <span>{total ? `${Math.min(pos + 1, total)} / ${total}` : "0 / 0"}</span>
          <div className="flex items-center gap-3">
            {mode === "all" && forgottenCount > 0 && (
              <button
                onClick={() => switchMode("forgotten")}
                className="inline-flex items-center gap-1 rounded-full border border-destructive/50 px-3 py-1 text-destructive transition hover:bg-destructive/10"
              >
                не помню: {forgottenCount} · повторить
              </button>
            )}
            {mode === "forgotten" && (
              <button
                onClick={() => switchMode("all")}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 transition hover:border-primary hover:text-primary"
              >
                ← все слова
              </button>
            )}
            <button onClick={shuffle} className="inline-flex items-center gap-1 hover:text-primary">
              <Shuffle className="h-3.5 w-3.5" /> перемешать
            </button>
          </div>
        </div>
        <div className="mt-2 h-1 rounded-full bg-border">
          <div
            className="h-1 rounded-full bg-primary transition-all"
            style={{ width: total ? `${((Math.min(pos + 1, total)) / total) * 100}%` : "0%" }}
          />
        </div>

        <div className="relative mt-6 h-[320px]" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            {w ? (
              <motion.button
                key={order[Math.min(pos, total - 1)]}
                onClick={() => setFlipped((f) => !f)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, rotateY: flipped ? 180 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="absolute inset-0 w-full"
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-border bg-card p-6 text-center shadow-[var(--shadow-glow-soft)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">English</span>
                  <p className="mt-4 text-2xl font-semibold">{w.meaning}</p>
                  <p className="mt-2 text-lg text-primary">{w.ru}</p>
                  <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Нажми, чтобы перевернуть
                  </p>
                </div>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-primary/40 bg-card p-6 text-center shadow-[var(--shadow-glow-soft)]"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <p className="font-hanzi text-5xl tracking-wider text-glow sm:text-6xl">{w.hanzi}</p>
                  <p className="font-pinyin mt-3 text-xl text-primary">{w.pinyin}</p>
                  <p className="mt-4 text-sm text-primary">{w.ru}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{w.meaning}</p>
                  <p className="mt-3 font-mono text-[10px] text-muted-foreground">Урок {w.lesson}</p>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-success/40 bg-card p-6 text-center"
              >
                <p className="font-hanzi text-4xl text-glow">太棒了</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Отлично! Слов в категории «не помню» больше нет.
                </p>
                <button
                  onClick={() => switchMode("all")}
                  className="mt-6 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  Вернуться ко всем словам
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => go(-1)}
            disabled={!total}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-border bg-surface py-2.5 text-sm font-semibold transition hover:border-primary disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Назад
          </button>
          {mode === "all" ? (
            <button
              onClick={() => {
                if (!w) return;
                markForgotten(w.hanzi);
                setFlipped(false);
                setPos((p) => (total ? (p + 1) % total : 0));
              }}
              disabled={!total}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-destructive/40 bg-destructive/5 px-2 py-2.5 text-sm font-semibold text-destructive transition hover:bg-destructive/10 disabled:opacity-40"
            >
              <X className="h-4 w-4" /> Не помню
            </button>
          ) : (
            <button
              onClick={() => w && markKnown(w.hanzi)}
              disabled={!total}
              className="flex flex-1 items-center justify-center rounded-lg border-2 border-success/40 bg-success/5 py-2.5 text-sm font-semibold text-success transition hover:bg-success/10 disabled:opacity-40"
            >
              Знаю
            </button>
          )}
          <button
            onClick={() => go(1)}
            disabled={!total}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
          >
            Дальше <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
