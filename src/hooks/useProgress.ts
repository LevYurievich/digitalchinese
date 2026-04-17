import { useEffect, useState } from "react";

const KEY = "dc_completed_lessons_v1";

export function useProgress() {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setCompleted(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const markComplete = (lessonId: number) => {
    setCompleted((prev) => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const reset = () => {
    setCompleted([]);
    try {
      localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
  };

  return { completed, markComplete, reset };
}
