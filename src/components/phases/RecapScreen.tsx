import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Trophy } from "lucide-react";
import type { Dialogue, Recap } from "@/data/lessons";
import { AudioPlayer } from "@/components/AudioPlayer";

interface Props {
  recap: Recap;
  bonusDialogue?: Dialogue;
  onFinish: () => void;
}

export function RecapScreen({ recap, bonusDialogue, onFinish }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          <Sparkles className="h-3 w-3" /> Phase 4 · Recap
        </div>
      <h2 className="font-hanzi mt-1 text-2xl font-semibold">你已经学会了</h2>
      </div>

      {/* takeaways */}
      <ul className="space-y-2">
        {recap.takeaways.map((t, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            <span className="text-sm leading-relaxed">{t}</span>
          </motion.li>
        ))}
      </ul>

      {/* key words */}
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Key words
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {recap.keyWords.map((w) => (
            <span
              key={w}
              className="font-hanzi rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-base text-primary"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* bonus dialogue */}
      {bonusDialogue && (
        <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
            <Trophy className="h-3 w-3" /> Bonus challenge
          </div>
          <h3 className="font-hanzi mt-1 text-lg font-semibold">{bonusDialogue.title}</h3>
          <p className="mb-3 text-xs text-muted-foreground">
            {bonusDialogue.titleEn} — listen without subtitles. Can you follow it now?
          </p>
          <AudioPlayer src={bonusDialogue.audio} label="Bonus listen" />
        </div>
      )}

      <div className="flex justify-end">
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onFinish}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
        >
          Finish lesson <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
