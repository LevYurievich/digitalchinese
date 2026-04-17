import type { TaskType } from "@/data/lessons";

const INSTRUCTIONS: Record<TaskType, { title: string; body: string }> = {
  speedrun: {
    title: "Спидран",
    body: "Послушай аудио (или прочитай пиньинь) и впиши соответствующие иероглифы в поле. Нажми Check, чтобы проверить.",
  },
  battle: {
    title: "Бой за слово",
    body: "Прочитай предложение с пропуском и выбери из трёх вариантов то слово, которое подходит по смыслу.",
  },
  constructor: {
    title: "Конструктор предложения",
    body: "Перетаскивай (тапай) блоки снизу в верхнюю область так, чтобы получилось правильное предложение по пиньиню и переводу. Тап по блоку в верхней области возвращает его обратно.",
  },
  matching: {
    title: "Сопоставление",
    body: "Выбери элемент в левой колонке, затем подходящую пару в правой. Соедини все пары без ошибок.",
  },
  tone: {
    title: "Тоны",
    body: "Для каждого слога выбери правильный тон (1–4). Когда отметишь все слоги, нажми Check tones.",
  },
  intuition: {
    title: "Интуиция · порядок слов",
    body: "Сломанное предложение показано сверху. Используй стрелки ◀ ▶ под каждым блоком, чтобы переставить слова в правильный порядок.",
  },
  simulation: {
    title: "Симуляция диалога",
    body: "Прочитай сообщение собеседника и выбери уместный ответ из трёх вариантов.",
  },
  synthesis: {
    title: "Синтез · собственные предложения",
    body: "Напиши свои предложения, используя ВСЕ указанные слова/конструкции. Нужно минимум указанное число предложений (разделяй точкой 。 или . ).",
  },
};

export function TaskInstructions({ type }: { type: TaskType }) {
  const info = INSTRUCTIONS[type];
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80">
        Как выполнять · {info.title}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{info.body}</p>
    </div>
  );
}
