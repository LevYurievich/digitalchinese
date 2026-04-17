interface Props {
  total: number;
  current: number; // index of current task
  completed: number; // count of solved
}

export function ProgressBar({ total, current, completed }: Props) {
  return (
    <div className="flex w-full gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < completed;
        const active = i === current;
        return (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              done
                ? "bg-primary shadow-[var(--shadow-glow-soft)]"
                : active
                  ? "bg-primary/40"
                  : "bg-border"
            }`}
          />
        );
      })}
    </div>
  );
}
