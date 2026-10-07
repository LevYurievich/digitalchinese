import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { reviewWords } from "@/data/review";

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

function ReviewPage() {
  const [order, setOrder] = useState(() => reviewWords.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const total = order.length;
  const w = reviewWords[order[pos]];

  const go = (d: number) => {
    setFlipped(false);
    setPos((p) => (p + d + total) % total);
  };
  const shuffle = () => {
    const a = [...order];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setOrder(a);
    setPos(0);
    setFlipped(false);
  };

  return (
    <main className="grid-bg relative min-h-screen">
      <div className="mx-auto max-w-xl px-6 py-12 sm:py-20">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Назад
        </Link>
        <div className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">Review · 复习</div>
        <h1 className="font-hanzi mt-2 text-3xl font-bold">300 самых употребляемых слов</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Посмотри на английское слово, вспомни иероглифы и произношение, затем переверни карточку.
        </p>

        <div className="mt-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>{pos + 1} / {total}</span>
          <button onClick={shuffle} className="inline-flex items-center gap-1 hover:text-primary">
            <Shuffle className="h-3.5 w-3.5" /> перемешать
          </button>
        </div>
        <div className="mt-2 h-1 rounded-full bg-border">
          <div className="h-1 rounded-full bg-primary transition-all" style={{ width: `${((pos + 1) / total) * 100}%` }} />
        </div>

        <div className="relative mt-6 h-[320px]" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            <motion.button
              key={pos}
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
                <p className="mt-4 text-3xl font-semibold">{w.meaning}</p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Нажми, чтобы перевернуть
                </p>
              </div>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-primary/40 bg-card p-6 text-center shadow-[var(--shadow-glow-soft)]"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="font-hanzi text-6xl tracking-wider text-glow">{w.hanzi}</p>
                <p className="font-pinyin mt-4 text-2xl text-primary">{w.pinyin}</p>
                <p className="mt-4 text-sm text-muted-foreground">{w.meaning}</p>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">Урок {w.lesson}</p>
              </div>
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => go(-1)} className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-border bg-surface py-2.5 text-sm font-semibold transition hover:border-primary">
            <ChevronLeft className="h-4 w-4" /> Назад
          </button>
          <button onClick={() => go(1)} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
            Дальше <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
