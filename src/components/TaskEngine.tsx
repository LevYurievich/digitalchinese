import type { Task } from "@/data/lessons";
import { SpeedrunCard } from "./tasks/SpeedrunCard";
import { BattleCard } from "./tasks/BattleCard";
import { ConstructorCard } from "./tasks/ConstructorCard";
import { MatchingCard } from "./tasks/MatchingCard";
import { ToneCard } from "./tasks/ToneCard";
import { IntuitionCard } from "./tasks/IntuitionCard";
import { SimulationCard } from "./tasks/SimulationCard";
import { SynthesisCard } from "./tasks/SynthesisCard";

interface Props {
  task: Task;
  onSolved: () => void;
}

const TYPE_LABELS: Record<Task["type"], string> = {
  speedrun: "Speedrun",
  battle: "Battle",
  constructor: "Constructor",
  matching: "UI · Matching",
  tone: "Tone Dictation",
  intuition: "Intuition Test",
  simulation: "Simulation",
  synthesis: "Synthesis & Retro",
};

export function TaskEngine({ task, onSolved }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          {TYPE_LABELS[task.type]}
        </span>
      </div>
      {task.type === "speedrun" && <SpeedrunCard task={task} onSolved={onSolved} />}
      {task.type === "battle" && <BattleCard task={task} onSolved={onSolved} />}
      {task.type === "constructor" && <ConstructorCard task={task} onSolved={onSolved} />}
      {task.type === "matching" && <MatchingCard task={task} onSolved={onSolved} />}
      {task.type === "tone" && <ToneCard task={task} onSolved={onSolved} />}
      {task.type === "intuition" && <IntuitionCard task={task} onSolved={onSolved} />}
      {task.type === "simulation" && <SimulationCard task={task} onSolved={onSolved} />}
      {task.type === "synthesis" && <SynthesisCard task={task} onSolved={onSolved} />}
    </div>
  );
}
