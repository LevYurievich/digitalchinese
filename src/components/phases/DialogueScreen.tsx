import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Languages } from "lucide-react";
import type { Dialogue } from "@/data/lessons";
import { AudioPlayer } from "@/components/AudioPlayer";

type Visibility = "hanzi" | "pinyin" | "translation";

interface Props {
  dialogue: Dialogue;
  onContinue: () => void;
  ctaLabel?: string;
}

export function DialogueScreen({ dialogue, onContinue, ctaLabel = "I've listened — continue" }: Props) {
  const [show, setShow] = useState<Record<Visibility, boolean>>({
    hanzi: true,
    pinyin: true,
    translation: false,
  });

  const toggle = (k: Visibility) => setShow((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Phase 1 · Listen
          </div>
          <h2 className="font-hanzi mt-1 text-2xl font-semibold">
            {dialogue.title}
            <span className="ml-2 text-sm font-normal text-muted-foreground">{dialogue.titleEn}</span>
          </h2>
        </div>
        <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {dialogue.kind}
        </span>
      </div>

      <AudioPlayer src={dialogue.audio} label={`Full audio · ${dialogue.lines.length} lines`} />

      <div className="flex flex-wrap items-center gap-2">
        {(["hanzi", "pinyin", "translation"] as Visibility[]).map((k) => (
          <button
            key={k}
            onClick={() => toggle(k)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition ${
              show[k]
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border bg-surface text-muted-foreground hover:border-primary/30"
            }`}
          >
            {show[k] ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            {k === "hanzi" ? "汉字" : k}
          </button>
        ))}
      </div>

      <ol className="space-y-3">
        {dialogue.lines.map((line, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border bg-surface p-4"
          >
            {line.speaker && (
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                {line.speaker}
              </div>
            )}
            {show.hanzi && (
              <p className="font-hanzi text-lg leading-relaxed tracking-wide">{line.hanzi}</p>
            )}
            {show.pinyin && (
              <p className="font-pinyin mt-1 text-sm text-muted-foreground">{line.pinyin}</p>
            )}
            {show.translation && (
              <p className="mt-2 flex gap-2 text-sm text-foreground/80">
                <Languages className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{line.translation}</span>
              </p>
            )}
          </motion.li>
        ))}
      </ol>

      <div className="flex justify-end">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
        >
          {ctaLabel}
        </motion.button>
      </div>
    </div>
  );
}
