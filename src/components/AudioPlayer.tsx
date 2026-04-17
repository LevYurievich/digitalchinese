import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface Props {
  src?: string;
  label?: string;
}

export function AudioPlayer({ src, label }: Props) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el || !src) {
      setError(true);
      return;
    }
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setError(true));
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow-soft)] transition hover:brightness-110"
        aria-label={playing ? "Pause audio" : "Play audio"}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
      </motion.button>
      <div className="flex flex-col">
        <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
          <Volume2 className="h-3 w-3" />
          {label ?? "Audio"}
        </span>
        <span className="font-mono text-xs text-muted-foreground/80">
          {error ? "audio unavailable — placeholder" : (src ?? "no source")}
        </span>
      </div>
      {src && (
        <audio ref={ref} src={src} onEnded={() => setPlaying(false)} preload="none" />
      )}
    </div>
  );
}
