// Lesson data sourced from Digital Chinese (Lan & Chen, 2025, Routledge)
// Audio files live on Google Drive; placeholder paths kept for later swap.

export type TaskType =
  | "speedrun"
  | "battle"
  | "constructor"
  | "matching"
  | "tone"
  | "intuition"
  | "simulation"
  | "synthesis";

export interface BaseTask {
  id: string;
  type: TaskType;
  prompt: string;
  hint?: string;
  audio?: string;
}

export interface SpeedrunTask extends BaseTask {
  type: "speedrun";
  mode: "pinyin-to-hanzi" | "audio-to-hanzi";
  pinyin?: string;
  answer: string;
  translation: string;
}

export interface BattleTask extends BaseTask {
  type: "battle";
  sentenceBefore: string;
  sentenceAfter: string;
  options: { hanzi: string; pinyin: string; meaning: string }[];
  correctIndex: number;
  translation: string;
}

export interface ConstructorTask extends BaseTask {
  type: "constructor";
  blocks: string[]; // shuffled in component
  answer: string[]; // ordered tokens
  pinyin: string;
  translation: string;
}

export interface MatchingTask extends BaseTask {
  type: "matching";
  pairs: { left: string; right: string; leftLabel?: string }[];
}

export interface ToneTask extends BaseTask {
  type: "tone";
  word: string;
  syllables: { base: string; correctTone: 1 | 2 | 3 | 4 }[];
  translation: string;
}

export interface IntuitionTask extends BaseTask {
  type: "intuition";
  brokenSentence: string[];
  correctOrder: number[]; // indices into brokenSentence
  translation: string;
}

export interface SimulationTask extends BaseTask {
  type: "simulation";
  npcMessage: string;
  npcPinyin: string;
  npcTranslation: string;
  options: { hanzi: string; pinyin: string; correct: boolean; reply?: string }[];
}

export interface SynthesisTask extends BaseTask {
  type: "synthesis";
  required: string[]; // tokens / patterns that must appear
  minSentences: number;
  retroWords?: string[]; // from previous lessons (Lesson 2+)
}

export type Task =
  | SpeedrunTask
  | BattleTask
  | ConstructorTask
  | MatchingTask
  | ToneTask
  | IntuitionTask
  | SimulationTask
  | SynthesisTask;

export interface Lesson {
  id: number;
  title: string;
  titleEn: string;
  theme: string;
  status: "available" | "locked";
  tasks?: Task[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "电脑打中文",
    titleEn: "Typing Chinese on Computers",
    theme: "Input Methods",
    status: "available",
    tasks: [
      {
        id: "l1-t1",
        type: "speedrun",
        mode: "audio-to-hanzi",
        prompt: "Listen and type the word you hear",
        pinyin: "shū rù fǎ",
        answer: "输入法",
        translation: "input method",
        audio: "/audio/l1_t1.mp3",
        hint: "shū rù fǎ — the way you type characters",
      },
      {
        id: "l1-t2",
        type: "battle",
        prompt: "Pick the correct character for the gap",
        sentenceBefore: "中文输入法的发明",
        sentenceAfter: "一件大事。",
        options: [
          { hanzi: "是", pinyin: "shì", meaning: "to be" },
          { hanzi: "事", pinyin: "shì", meaning: "matter, affair" },
          { hanzi: "市", pinyin: "shì", meaning: "city, market" },
        ],
        correctIndex: 0,
        translation: "The invention of Chinese input methods is a big deal.",
        hint: "Three homophones — context decides.",
      },
      {
        id: "l1-t3",
        type: "constructor",
        prompt: "Drag the blocks to build the sentence",
        blocks: ["我", "写出", "了", "这个", "字"],
        answer: ["我", "写出", "了", "这个", "字"],
        pinyin: "Wǒ xiě chū le zhè ge zì.",
        translation: "I wrote out this character.",
      },
      {
        id: "l1-t4",
        type: "matching",
        prompt: "Match each interface element to its Chinese term",
        pairs: [
          { left: "⚙️", leftLabel: "Settings", right: "输入法设置" },
          { left: "⌨️", leftLabel: "Keyboard", right: "键盘" },
          { left: "🔤", leftLabel: "Layout", right: "布局" },
          { left: "🖥️", leftLabel: "Screen", right: "屏幕" },
        ],
      },
      {
        id: "l1-t5",
        type: "tone",
        prompt: "Tap the correct tone for each syllable",
        word: "键盘",
        translation: "keyboard",
        syllables: [
          { base: "jian", correctTone: 4 },
          { base: "pan", correctTone: 2 },
        ],
      },
      {
        id: "l1-t6",
        type: "intuition",
        prompt: "Fix the word order",
        brokenSentence: ["电脑", "用", "我", "输入"],
        correctOrder: [2, 1, 0, 3], // 我 用 电脑 输入
        translation: "I use a computer to type.",
        hint: "Subject — instrument — verb.",
      },
      {
        id: "l1-t7",
        type: "simulation",
        prompt: "Reply naturally in the chat",
        npcMessage: "我想换一下键盘布局，怎么做？",
        npcPinyin: "Wǒ xiǎng huàn yīxià jiànpán bùjú, zěnme zuò?",
        npcTranslation: "I want to switch keyboard layout — how?",
        options: [
          { hanzi: "点击切换", pinyin: "Diǎnjī qiēhuàn", correct: true, reply: "明白了，谢谢！" },
          { hanzi: "买新电脑", pinyin: "Mǎi xīn diànnǎo", correct: false },
          { hanzi: "关机重启", pinyin: "Guānjī chóngqǐ", correct: false },
        ],
      },
      {
        id: "l1-t8",
        type: "synthesis",
        prompt: "Write 3 sentences using each item below at least once",
        required: ["键盘", "选择", "V + 出 (e.g., 写出, 说出)"],
        minSentences: 3,
      },
    ],
  },
  {
    id: 2,
    title: "电子邮件",
    titleEn: "Email",
    theme: "Digital correspondence",
    status: "locked",
  },
  {
    id: 3,
    title: "智能手机",
    titleEn: "Smartphones",
    theme: "Mobile life",
    status: "locked",
  },
  {
    id: 4,
    title: "社交媒体",
    titleEn: "Social Media",
    theme: "Networks & feeds",
    status: "locked",
  },
  {
    id: 5,
    title: "机器翻译",
    titleEn: "Machine Translation",
    theme: "MT & AI",
    status: "locked",
  },
  {
    id: 6,
    title: "电子商务",
    titleEn: "E-Commerce",
    theme: "Online shopping",
    status: "locked",
  },
  {
    id: 7,
    title: "网络文学",
    titleEn: "Internet Literature",
    theme: "Online fiction",
    status: "locked",
  },
  {
    id: 8,
    title: "人工智能聊天机器人",
    titleEn: "AI Chatbot",
    theme: "Conversational AI",
    status: "locked",
  },
  {
    id: 9,
    title: "网络视频",
    titleEn: "Online Videos",
    theme: "Streaming culture",
    status: "locked",
  },
  {
    id: 10,
    title: "网络游戏",
    titleEn: "Online Gaming",
    theme: "Gaming worlds",
    status: "locked",
  },
];
