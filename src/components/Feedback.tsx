import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Props {
  state: "idle" | "correct" | "wrong";
  message?: string;
}

export function Feedback({ state, message }: Props) {
  return (
    <AnimatePresence>
      {state !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium ${
            state === "correct"
              ? "border-success/40 bg-success/10 text-success"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {state === "correct" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {message ?? (state === "correct" ? "正确！" : "再试一次")}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
