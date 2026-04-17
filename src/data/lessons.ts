// Lesson data sourced from Digital Chinese (Lan & Chen, 2025, Routledge).
// Audio files live in /public/audio/.
//
// Pedagogical flow per lesson (4 phases):
//   1. listen   — full dialogue / narrative audio with hanzi + pinyin + translation
//   2. vocab    — Anki-style swipeable cards with per-word audio
//   3. practice — the 8-task engine (Speedrun → Synthesis)
//   4. recap    — key takeaways + bonus Text 2 listen
//
// Lessons 1 and 2 are fully built; lessons 3-10 are locked placeholders.

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
  blocks: string[];
  answer: string[];
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
  correctOrder: number[];
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
  required: string[];
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

export interface DialogueLine {
  speaker?: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface Dialogue {
  id: string;
  title: string;
  titleEn: string;
  audio: string;
  kind: "narrative" | "dialogue";
  lines: DialogueLine[];
}

export interface VocabItem {
  hanzi: string;
  pinyin: string;
  pos: string; // part of speech (N, V, A, …)
  meaning: string;
  audio?: string; // optional per-word audio (else falls back to vocab track)
}

export interface VocabSet {
  id: string;
  title: string; // e.g. "Text 1 vocabulary"
  audio: string; // full vocab audio track
  items: VocabItem[];
}

export interface Recap {
  takeaways: string[]; // 3-5 short bullet points
  keyWords: string[]; // 5-7 hanzi words student should now own
}

export interface Lesson {
  id: number;
  title: string;
  titleEn: string;
  theme: string;
  status: "available" | "locked";
  dialogues?: Dialogue[];      // [text1, text2] — text2 is the bonus challenge
  vocabulary?: VocabSet[];     // [vocab1, vocab2]
  tasks?: Task[];
  recap?: Recap;
}

// ───────────────────────────────────────────────────────────────────────────
// LESSON 1 — 电脑打中文 / Typing Chinese on Computers
// ───────────────────────────────────────────────────────────────────────────

const lesson1Dialogues: Dialogue[] = [
  {
    id: "l1-text1",
    title: "课文一",
    titleEn: "Text 1 — From brush to keyboard",
    audio: "/audio/lesson_1_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "在二十世纪以前，中国人主要用毛笔写汉字。",
        pinyin: "Zài èrshí shìjì yǐqián, Zhōngguó rén zhǔyào yòng máobǐ xiě hànzì.",
        translation: "Before the 20th century, Chinese people mainly used brushes to write characters.",
      },
      {
        hanzi: "后来，随着历史的发展，写汉字的工具慢慢地变成了铅笔、钢笔，但仍然离不开手写。",
        pinyin: "Hòulái, suízhe lìshǐ de fāzhǎn, xiě hànzì de gōngjù mànmàn de biàn chéng le qiānbǐ, gāngbǐ, dàn réngrán lí bù kāi shǒuxiě.",
        translation: "Later, as history developed, writing tools gradually became pencils and pens, but writing by hand remained essential.",
      },
      {
        hanzi: "到了数字化时代，电脑中文输入法成了写中文的主要方式。",
        pinyin: "Dào le shùzìhuà shídài, diànnǎo Zhōngwén shūrùfǎ chéng le xiě Zhōngwén de zhǔyào fāngshì.",
        translation: "In the digital age, computer Chinese input methods became the main way to write Chinese.",
      },
      {
        hanzi: "我们只需点击键盘，就能在电脑屏幕上又快又容易地输入中文。",
        pinyin: "Wǒmen zhǐ xū diǎnjī jiànpán, jiù néng zài diànnǎo píngmù shàng yòu kuài yòu róngyì de shūrù Zhōngwén.",
        translation: "We only need to tap the keyboard to type Chinese on screen, quickly and easily.",
      },
      {
        hanzi: "现在常用的中文输入法有拼音输入法、五笔输入法、手写输入法和语音输入法。",
        pinyin: "Xiànzài cháng yòng de Zhōngwén shūrùfǎ yǒu pīnyīn shūrùfǎ, wǔbǐ shūrùfǎ, shǒuxiě shūrùfǎ hé yǔyīn shūrùfǎ.",
        translation: "Common Chinese input methods today include pinyin, wubi (five-stroke), handwriting and voice input.",
      },
      {
        hanzi: "在数字化时代，中文输入法已成为沟通汉字和现代生活的重要工具。",
        pinyin: "Zài shùzìhuà shídài, Zhōngwén shūrùfǎ yǐ chéngwéi gōutōng hànzì hé xiàndài shēnghuó de zhòngyào gōngjù.",
        translation: "In the digital age, Chinese input methods have become a vital bridge between hanzi and modern life.",
      },
    ],
  },
  {
    id: "l1-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen sets up her new Lenovo",
    audio: "/audio/lesson_1_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "王钢", hanzi: "凯伦，这是你新买的联想电脑吗？真酷！", pinyin: "Kǎilún, zhè shì nǐ xīn mǎi de Liánxiǎng diànnǎo ma? Zhēn kù!", translation: "Karen, is this the Lenovo laptop you just bought? Cool!" },
      { speaker: "凯伦", hanzi: "没错儿，刚买的。对了，正想请你教我在电脑上打中文呢。", pinyin: "Méi cuòr, gāng mǎi de. Duì le, zhèng xiǎng qǐng nǐ jiāo wǒ zài diànnǎo shàng dǎ Zhōngwén ne.", translation: "Yes, just got it. By the way, I wanted to ask you to teach me how to type Chinese." },
      { speaker: "王钢", hanzi: "没问题。你得先安装中文字体和中文输入法。", pinyin: "Méi wèntí. Nǐ děi xiān ānzhuāng Zhōngwén zìtǐ hé Zhōngwén shūrùfǎ.", translation: "No problem. You need to install Chinese fonts and an input method first." },
      { speaker: "凯伦", hanzi: "怎么安装呢？", pinyin: "Zěnme ānzhuāng ne?", translation: "How do I install them?" },
      { speaker: "王钢", hanzi: "点击左下角的\"开始\"，然后选择\"设置\"，找到\"时间和语言\"，再添加\"中文（简体）\"。", pinyin: "Diǎnjī zuǒ xià jiǎo de \"kāishǐ\", ránhòu xuǎnzé \"shèzhì\", zhǎodào \"shíjiān hé yǔyán\", zài tiānjiā \"Zhōngwén (jiǎntǐ)\".", translation: "Click 'Start' in the bottom-left, choose 'Settings', find 'Time & Language', then add 'Chinese (Simplified)'." },
      { speaker: "凯伦", hanzi: "我已经添加中文了。现在怎么打中文呢？", pinyin: "Wǒ yǐjīng tiānjiā Zhōngwén le. Xiànzài zěnme dǎ Zhōngwén ne?", translation: "I've added Chinese. Now how do I type?" },
      { speaker: "王钢", hanzi: "任务栏右下角有输入法图标，点击它就可以切换输入法。", pinyin: "Rènwù lán yòu xià jiǎo yǒu shūrùfǎ túbiāo, diǎnjī tā jiù kěyǐ qiēhuàn shūrùfǎ.", translation: "There's an input-method icon in the bottom-right of the taskbar — click it to switch." },
      { speaker: "凯伦", hanzi: "太好了，谢谢！", pinyin: "Tài hǎo le, xièxiè!", translation: "Great, thanks!" },
    ],
  },
];

const lesson1Vocab: VocabSet[] = [
  {
    id: "l1-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_1_text_1_vocab.mp3",
    items: [
      { hanzi: "输入法", pinyin: "shūrùfǎ", pos: "N", meaning: "input method" },
      { hanzi: "键盘", pinyin: "jiànpán", pos: "N", meaning: "keyboard" },
      { hanzi: "屏幕", pinyin: "píngmù", pos: "N", meaning: "screen" },
      { hanzi: "数字化", pinyin: "shùzìhuà", pos: "A/V", meaning: "digital; to digitize" },
      { hanzi: "时代", pinyin: "shídài", pos: "N", meaning: "era; epoch" },
      { hanzi: "点击", pinyin: "diǎnjī", pos: "V", meaning: "to click; to tap" },
      { hanzi: "使用", pinyin: "shǐyòng", pos: "V", meaning: "to use" },
      { hanzi: "移动设备", pinyin: "yídòng shèbèi", pos: "NP", meaning: "mobile device" },
      { hanzi: "根据", pinyin: "gēnjù", pos: "Prep", meaning: "according to" },
      { hanzi: "适合", pinyin: "shìhé", pos: "V", meaning: "to suit; to fit" },
      { hanzi: "用户", pinyin: "yònghù", pos: "N", meaning: "user" },
      { hanzi: "结构", pinyin: "jiégòu", pos: "N", meaning: "structure" },
      { hanzi: "了解", pinyin: "liáojiě", pos: "V", meaning: "to understand" },
      { hanzi: "沟通", pinyin: "gōutōng", pos: "V", meaning: "to connect; to communicate" },
      { hanzi: "现代", pinyin: "xiàndài", pos: "A/N", meaning: "modern" },
    ],
  },
  {
    id: "l1-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_1_text_2_vocab.mp3",
    items: [
      { hanzi: "安装", pinyin: "ānzhuāng", pos: "V", meaning: "to install" },
      { hanzi: "字体", pinyin: "zìtǐ", pos: "N", meaning: "font" },
      { hanzi: "选择", pinyin: "xuǎnzé", pos: "V", meaning: "to choose" },
      { hanzi: "设置", pinyin: "shèzhì", pos: "N/V", meaning: "settings; to set up" },
      { hanzi: "选项", pinyin: "xuǎnxiàng", pos: "N", meaning: "option" },
      { hanzi: "添加", pinyin: "tiānjiā", pos: "V", meaning: "to add" },
      { hanzi: "简体", pinyin: "jiǎntǐ", pos: "N", meaning: "simplified Chinese" },
      { hanzi: "系统", pinyin: "xìtǒng", pos: "N", meaning: "system" },
      { hanzi: "下载", pinyin: "xiàzǎi", pos: "V", meaning: "to download" },
      { hanzi: "任务栏", pinyin: "rènwù lán", pos: "N", meaning: "taskbar" },
      { hanzi: "图标", pinyin: "túbiāo", pos: "N", meaning: "icon" },
      { hanzi: "切换", pinyin: "qiēhuàn", pos: "V", meaning: "to switch" },
      { hanzi: "打开", pinyin: "dǎkāi", pos: "V", meaning: "to open; to turn on" },
      { hanzi: "显示", pinyin: "xiǎnshì", pos: "V", meaning: "to display" },
    ],
  },
];

const lesson1Tasks: Task[] = [
  {
    id: "l1-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "shū rù fǎ",
    answer: "输入法",
    translation: "input method",
    audio: "/audio/lesson_1_text_1_vocab.mp3",
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
      { left: "⚙️", leftLabel: "Settings", right: "设置" },
      { left: "⌨️", leftLabel: "Keyboard", right: "键盘" },
      { left: "🔤", leftLabel: "Input method", right: "输入法" },
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
    correctOrder: [2, 1, 0, 3],
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
    required: ["键盘", "选择", "V + 出 (e.g. 写出, 说出)"],
    minSentences: 3,
  },
];

const lesson1Recap: Recap = {
  takeaways: [
    "汉字 → digital era: brush → pencil → keyboard.",
    "Pinyin input is easiest; wubi is fastest but harder.",
    "Voice & handwriting input fit mobile devices best.",
    "On Windows: Settings → Time & Language → add 中文 (简体).",
  ],
  keyWords: ["输入法", "键盘", "屏幕", "选择", "切换", "下载", "安装"],
};

// ───────────────────────────────────────────────────────────────────────────
// LESSON 2 — 电子邮件 / Email
// ───────────────────────────────────────────────────────────────────────────

const lesson2Dialogues: Dialogue[] = [
  {
    id: "l2-text1",
    title: "课文一",
    titleEn: "Text 1 — Wang Gang explains email in China",
    audio: "/audio/lesson_2_text_1.mp3",
    kind: "narrative",
    lines: [
      { hanzi: "大卫，你好！", pinyin: "Dàwèi, nǐ hǎo!", translation: "Hi David!" },
      { hanzi: "很高兴回答你有关在中国使用电子邮件的问题。", pinyin: "Hěn gāoxìng huídá nǐ yǒuguān zài Zhōngguó shǐyòng diànzǐ yóujiàn de wèntí.", translation: "Glad to answer your questions about using email in China." },
      { hanzi: "跟其他国家一样，在中国，电子邮件也是人们常常使用的一种联系方法。", pinyin: "Gēn qítā guójiā yīyàng, zài Zhōngguó, diànzǐ yóujiàn yě shì rénmen chángcháng shǐyòng de yī zhǒng liánxì fāngfǎ.", translation: "Like in other countries, email is a common way to stay in touch in China." },
      { hanzi: "中国的公司和政府机构也广泛使用电子邮件来处理事务。", pinyin: "Zhōngguó de gōngsī hé zhèngfǔ jīgòu yě guǎngfàn shǐyòng diànzǐ yóujiàn lái chǔlǐ shìwù.", translation: "Chinese companies and government bodies also use email widely to handle their work." },
      { hanzi: "据我所知，谷歌邮箱和雅虎邮箱在中国的使用受到限制，但微软的Outlook邮箱可以使用。", pinyin: "Jù wǒ suǒ zhī, Gǔgē yóuxiāng hé Yǎhǔ yóuxiāng zài Zhōngguó de shǐyòng shòudào xiànzhì, dàn Wēiruǎn de Outlook yóuxiāng kěyǐ shǐyòng.", translation: "As far as I know, Gmail and Yahoo Mail are restricted in China, but Microsoft's Outlook works." },
      { hanzi: "中国本土的大型IT公司也提供优质的电子邮箱服务，包括163邮箱、QQ邮箱、新浪邮箱和搜狐邮箱。", pinyin: "Zhōngguó běntǔ de dàxíng IT gōngsī yě tígōng yōuzhì de diànzǐ yóuxiāng fúwù, bāokuò 163 yóuxiāng, QQ yóuxiāng, Xīnlàng yóuxiāng hé Sōuhú yóuxiāng.", translation: "China's own major IT companies offer high-quality email — 163, QQ, Sina, Sohu mail." },
      { hanzi: "其中163邮箱和QQ邮箱在中国最受欢迎，各自的用户都高达数亿。", pinyin: "Qízhōng 163 yóuxiāng hé QQ yóuxiāng zài Zhōngguó zuì shòu huānyíng, gèzì de yònghù dōu gāo dá shù yì.", translation: "Among them, 163 and QQ Mail are the most popular, each with hundreds of millions of users." },
      { hanzi: "祝好！王钢", pinyin: "Zhù hǎo! Wáng Gāng", translation: "All the best — Wang Gang" },
    ],
  },
  {
    id: "l2-text2",
    title: "课文二",
    titleEn: "Text 2 — Email etiquette in Chinese",
    audio: "/audio/lesson_2_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "凯伦", hanzi: "王钢，我刚来中国，常常需要用电子邮件跟别人联系。你觉得我写邮件时有什么要注意的吗？", pinyin: "Wáng Gāng, wǒ gāng lái Zhōngguó, chángcháng xūyào yòng diànzǐ yóujiàn gēn biérén liánxì. Nǐ juéde wǒ xiě yóujiàn shí yǒu shénme yào zhùyì de ma?", translation: "Wang Gang, I just got to China and often need to email people. What should I keep in mind?" },
      { speaker: "王钢", hanzi: "嗯，首先，邮件开头要用礼貌用语，比如\"张女士\"或\"王经理\"。", pinyin: "Ēn, shǒuxiān, yóujiàn kāitóu yào yòng lǐmào yòngyǔ, bǐrú \"Zhāng nǚshì\" huò \"Wáng jīnglǐ\".", translation: "Hmm, first, open with a polite address — 'Ms. Zhang' or 'Manager Wang'." },
      { speaker: "凯伦", hanzi: "哦，我们写英文邮件开头常说\"Hi\"，或什么也不说，直接就开始。", pinyin: "Ò, wǒmen xiě Yīngwén yóujiàn kāitóu cháng shuō \"Hi\", huò shénme yě bù shuō, zhíjiē jiù kāishǐ.", translation: "Oh, in English we often just say 'Hi' or jump right in." },
      { speaker: "王钢", hanzi: "邮件的最后要致以问候，比如\"祝好！\"、\"祝你一切顺利！\"。", pinyin: "Yóujiàn de zuìhòu yào zhìyǐ wènhòu, bǐrú \"zhù hǎo!\", \"zhù nǐ yīqiè shùnlì!\".", translation: "Sign off with a greeting — 'All the best!' or 'Wishing you smooth sailing!'." },
      { speaker: "王钢", hanzi: "还有，邮件里尽量别说\"不行\"，因为这样会让对方觉得没面子。", pinyin: "Hái yǒu, yóujiàn lǐ jǐnliàng bié shuō \"bù xíng\", yīnwèi zhèyàng huì ràng duìfāng juéde méi miànzi.", translation: "Also, try not to say 'no' bluntly — it makes the other person lose face." },
      { speaker: "凯伦", hanzi: "知道了这些文化差异就不会发生误解，真的很有帮助！", pinyin: "Zhīdào le zhèxiē wénhuà chāyì jiù bù huì fāshēng wùjiě, zhēn de hěn yǒu bāngzhù!", translation: "Knowing these cultural differences avoids misunderstandings — really helpful!" },
    ],
  },
];

const lesson2Vocab: VocabSet[] = [
  {
    id: "l2-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_2_text_1_vocab.mp3",
    items: [
      { hanzi: "电子邮件", pinyin: "diànzǐ yóujiàn", pos: "NP", meaning: "email" },
      { hanzi: "回答", pinyin: "huídá", pos: "V", meaning: "to answer" },
      { hanzi: "有关", pinyin: "yǒuguān", pos: "A", meaning: "related to; concerning" },
      { hanzi: "联系", pinyin: "liánxì", pos: "V", meaning: "to contact" },
      { hanzi: "政府", pinyin: "zhèngfǔ", pos: "N", meaning: "government" },
      { hanzi: "机构", pinyin: "jīgòu", pos: "N", meaning: "institution" },
      { hanzi: "广泛", pinyin: "guǎngfàn", pos: "A/Adv", meaning: "widespread; widely" },
      { hanzi: "处理", pinyin: "chǔlǐ", pos: "V", meaning: "to deal with" },
      { hanzi: "事务", pinyin: "shìwù", pos: "N", meaning: "matters; affairs" },
      { hanzi: "邮箱", pinyin: "yóuxiāng", pos: "N", meaning: "mailbox" },
      { hanzi: "情况", pinyin: "qíngkuàng", pos: "N", meaning: "situation" },
      { hanzi: "据我所知", pinyin: "jù wǒ suǒ zhī", pos: "IE", meaning: "as far as I know" },
      { hanzi: "受到", pinyin: "shòudào", pos: "VC", meaning: "to receive; to be subject to" },
      { hanzi: "限制", pinyin: "xiànzhì", pos: "V", meaning: "to limit; restriction" },
      { hanzi: "提供", pinyin: "tígōng", pos: "V", meaning: "to provide" },
      { hanzi: "服务", pinyin: "fúwù", pos: "V", meaning: "service; to serve" },
      { hanzi: "包括", pinyin: "bāokuò", pos: "V", meaning: "to include" },
      { hanzi: "账户", pinyin: "zhànghù", pos: "N", meaning: "account" },
      { hanzi: "注册", pinyin: "zhùcè", pos: "V", meaning: "to register" },
      { hanzi: "验证", pinyin: "yànzhèng", pos: "V", meaning: "to verify" },
    ],
  },
  {
    id: "l2-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_2_text_2_vocab.mp3",
    items: [
      { hanzi: "开头", pinyin: "kāitóu", pos: "N", meaning: "beginning" },
      { hanzi: "礼貌", pinyin: "lǐmào", pos: "A", meaning: "polite" },
      { hanzi: "用语", pinyin: "yòngyǔ", pos: "N", meaning: "expression; terminology" },
      { hanzi: "直接", pinyin: "zhíjiē", pos: "A/Adv", meaning: "direct; directly" },
      { hanzi: "致以", pinyin: "zhìyǐ", pos: "V", meaning: "to extend; to offer" },
      { hanzi: "问候", pinyin: "wènhòu", pos: "N/V", meaning: "greeting" },
      { hanzi: "一切", pinyin: "yīqiè", pos: "Pr", meaning: "everything" },
      { hanzi: "顺利", pinyin: "shùnlì", pos: "A", meaning: "smooth" },
      { hanzi: "尽量", pinyin: "jǐnliàng", pos: "Adv", meaning: "to the best of one's ability" },
      { hanzi: "面子", pinyin: "miànzi", pos: "N", meaning: "face; reputation" },
      { hanzi: "提醒", pinyin: "tíxǐng", pos: "V", meaning: "to remind" },
      { hanzi: "差异", pinyin: "chāyì", pos: "N", meaning: "difference" },
      { hanzi: "误解", pinyin: "wùjiě", pos: "N/V", meaning: "misunderstanding" },
      { hanzi: "交流", pinyin: "jiāoliú", pos: "V", meaning: "to exchange; communicate" },
    ],
  },
];

const lesson2Tasks: Task[] = [
  {
    id: "l2-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "diàn zǐ yóu jiàn",
    answer: "电子邮件",
    translation: "email",
    audio: "/audio/lesson_2_text_1_vocab.mp3",
    hint: "diàn zǐ yóu jiàn — modern way to write a letter",
  },
  {
    id: "l2-t2",
    type: "battle",
    prompt: "Pick the correct word for the gap",
    sentenceBefore: "中国的公司和政府机构广泛",
    sentenceAfter: "电子邮件来处理事务。",
    options: [
      { hanzi: "使用", pinyin: "shǐyòng", meaning: "to use" },
      { hanzi: "服务", pinyin: "fúwù", meaning: "to serve" },
      { hanzi: "联系", pinyin: "liánxì", meaning: "to contact" },
    ],
    correctIndex: 0,
    translation: "Chinese companies and government bodies widely use email to handle work.",
    hint: "Which verb fits 'use email to do X'?",
  },
  {
    id: "l2-t3",
    type: "constructor",
    prompt: "Build the sentence",
    blocks: ["用", "电子邮件", "我", "联系", "朋友"],
    answer: ["我", "用", "电子邮件", "联系", "朋友"],
    pinyin: "Wǒ yòng diànzǐ yóujiàn liánxì péngyou.",
    translation: "I use email to contact my friends.",
  },
  {
    id: "l2-t4",
    type: "matching",
    prompt: "Match each Chinese email provider to what it is",
    pairs: [
      { left: "📧", leftLabel: "163 Mail", right: "网易" },
      { left: "💬", leftLabel: "QQ Mail", right: "QQ邮箱" },
      { left: "🔍", leftLabel: "Sina", right: "新浪" },
      { left: "🦊", leftLabel: "Sohu", right: "搜狐" },
    ],
  },
  {
    id: "l2-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 礼貌",
    word: "礼貌",
    translation: "polite",
    syllables: [
      { base: "li", correctTone: 3 },
      { base: "mao", correctTone: 4 },
    ],
  },
  {
    id: "l2-t6",
    type: "intuition",
    prompt: "Fix the word order — Chinese email opening",
    brokenSentence: ["用语", "开头", "礼貌", "要用"],
    correctOrder: [1, 3, 2, 0], // 开头 要用 礼貌 用语
    translation: "The opening should use polite expressions.",
    hint: "Topic — modal — adjective — noun.",
  },
  {
    id: "l2-t7",
    type: "simulation",
    prompt: "Karen asks if she can refuse an invitation bluntly. Reply naturally.",
    npcMessage: "我可以直接说\"不行\"吗？",
    npcPinyin: "Wǒ kěyǐ zhíjiē shuō \"bù xíng\" ma?",
    npcTranslation: "Can I just bluntly say 'no'?",
    options: [
      { hanzi: "尽量别这么说，对方会没面子。", pinyin: "Jǐnliàng bié zhème shuō, duìfāng huì méi miànzi.", correct: true, reply: "明白了，我会注意的。" },
      { hanzi: "可以，越直接越好。", pinyin: "Kěyǐ, yuè zhíjiē yuè hǎo.", correct: false },
      { hanzi: "不用回邮件了。", pinyin: "Bùyòng huí yóujiàn le.", correct: false },
    ],
  },
  {
    id: "l2-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences. Reuse Lesson 1 vocabulary where possible.",
    required: ["电子邮件", "礼貌用语", "据我所知"],
    minSentences: 3,
    retroWords: ["键盘", "选择", "下载", "切换"],
  },
];

const lesson2Recap: Recap = {
  takeaways: [
    "Email = 电子邮件; mailbox = 邮箱.",
    "Major Chinese providers: 163, QQ, 新浪, 搜狐. Gmail/Yahoo are restricted; Outlook works.",
    "Open with polite address (张女士/王经理), close with 祝好 / 祝你一切顺利.",
    "Avoid blunt 不行 — protect the reader's 面子.",
  ],
  keyWords: ["电子邮件", "邮箱", "联系", "礼貌", "问候", "面子", "据我所知"],
};

// ───────────────────────────────────────────────────────────────────────────
// LESSON 3 — 智能手机 / Smartphones
// ───────────────────────────────────────────────────────────────────────────

const lesson3Dialogues: Dialogue[] = [
  {
    id: "l3-text1",
    title: "课文一",
    titleEn: "Text 1 — A short history of smartphones",
    audio: "/audio/lesson_3_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "智能手机的历史始于上世纪九十年代，那时的智能手机只能打电话和发短信。",
        pinyin: "Zhìnéng shǒujī de lìshǐ shǐ yú shàng shìjì jiǔshí niándài, nà shí de zhìnéng shǒujī zhǐ néng dǎ diànhuà hé fā duǎnxìn.",
        translation: "The history of smartphones began in the 1990s, when they could only make calls and send texts.",
      },
      {
        hanzi: "到了二十一世纪初，随着科技的快速发展，智能手机拥有了更多、更强大的功能，如触摸屏、移动上网、高清摄像等。",
        pinyin: "Dào le èrshíyī shìjì chū, suízhe kējì de kuàisù fāzhǎn, zhìnéng shǒujī yōngyǒu le gèng duō, gèng qiángdà de gōngnéng, rú chùmō píng, yídòng shàng wǎng, gāoqīng shèxiàng děng.",
        translation: "By the early 21st century, with the rapid advance of technology, smartphones gained more powerful features — touch screens, mobile internet, HD cameras, and so on.",
      },
      {
        hanzi: "二零零七年苹果公司生产出了第一代苹果手机，使智能手机的发展进入了一个新时代。",
        pinyin: "Èr líng líng qī nián Píngguǒ Gōngsī shēngchǎn chū le dì yī dài Píngguǒ shǒujī, shǐ zhìnéng shǒujī de fāzhǎn jìnrù le yí gè xīn shídài.",
        translation: "In 2007 Apple produced the first iPhone, ushering smartphones into a new era.",
      },
      {
        hanzi: "现在市场上的智能手机主要有两种：一种是苹果手机，使用iOS操作系统；另一种使用谷歌公司开发的安卓系统，如三星、华为和小米等品牌。",
        pinyin: "Xiànzài shìchǎng shàng de zhìnéng shǒujī zhǔyào yǒu liǎng zhǒng: yì zhǒng shì Píngguǒ shǒujī, shǐyòng iOS cāozuò xìtǒng; lìng yì zhǒng shǐyòng Gǔgē Gōngsī kāifā de Ānzhuó xìtǒng, rú Sānxīng, Huáwéi hé Xiǎomǐ děng pǐnpái.",
        translation: "Today's market has two main kinds: iPhones running iOS, and phones from brands like Samsung, Huawei and Xiaomi running Google's Android.",
      },
      {
        hanzi: "苹果手机以功能强大、系统稳定而著称，而安卓手机则拥有灵活多样的应用。",
        pinyin: "Píngguǒ shǒujī yǐ gōngnéng qiángdà, xìtǒng wěndìng ér zhùchēng, ér Ānzhuó shǒujī zé yōngyǒu línghuó duōyàng de yìngyòng.",
        translation: "iPhones are known for powerful features and a stable system, while Android phones offer flexible and diverse apps.",
      },
      {
        hanzi: "智能手机已经走进了我们生活的每一个角落。除了通讯以外，它还可用于社交、学习、购物、娱乐、新闻等各个方面。",
        pinyin: "Zhìnéng shǒujī yǐjīng zǒu jìn le wǒmen shēnghuó de měi yí gè jiǎoluò. Chúle tōngxùn yǐwài, tā hái kě yòng yú shèjiāo, xuéxí, gòuwù, yúlè, xīnwén děng gège fāngmiàn.",
        translation: "Smartphones have entered every corner of our lives. Beyond communication, they're used for socializing, study, shopping, entertainment, news and more.",
      },
      {
        hanzi: "无论是在家庭、学校还是工作场所，智能手机都发挥着很重要的作用，不仅提高了我们的工作效率，也让我们的生活更方便。",
        pinyin: "Wúlùn shì zài jiātíng, xuéxiào háishì gōngzuò chǎngsuǒ, zhìnéng shǒujī dōu fāhuī zhe hěn zhòngyào de zuòyòng, bùjǐn tígāo le wǒmen de gōngzuò xiàolǜ, yě ràng wǒmen de shēnghuó gèng fāngbiàn.",
        translation: "Whether at home, in school or at work, smartphones play a vital role — boosting productivity and making life more convenient.",
      },
    ],
  },
  {
    id: "l3-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen picks a mobile carrier",
    audio: "/audio/lesson_3_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "凯伦", hanzi: "王钢，我现在的手机信号老是不稳定，想换个运营商。", pinyin: "Wáng Gāng, wǒ xiànzài de shǒujī xìnhào lǎoshì bù wěndìng, xiǎng huàn ge yùnyíng shāng.", translation: "Wang Gang, my phone signal is always unstable — I want to switch carrier." },
      { speaker: "王钢", hanzi: "学校附近有三家电话运营商：中国移动、中国联通和中国电信，都不错，你可以选一家。", pinyin: "Xuéxiào fùjìn yǒu sān jiā diànhuà yùnyíng shāng: Zhōngguó Yídòng, Zhōngguó Liántōng hé Zhōngguó Diànxìn, dōu bú cuò, nǐ kěyǐ xuǎn yì jiā.", translation: "There are three carriers near campus: China Mobile, China Unicom and China Telecom — all decent, pick one." },
      { speaker: "凯伦", hanzi: "你觉得哪家最好？", pinyin: "Nǐ juéde nǎ jiā zuì hǎo?", translation: "Which one do you think is best?" },
      { speaker: "王钢", hanzi: "对我们学校来说，联通的信号最好，而且联通对学生有优惠价。", pinyin: "Duì wǒmen xuéxiào lái shuō, Liántōng de xìnhào zuì hǎo, érqiě Liántōng duì xuéshēng yǒu yōuhuì jià.", translation: "For our campus, Unicom has the best signal, plus they have student discounts." },
      { speaker: "凯伦", hanzi: "我每天都要上网学习，还要跟在美国的家人视频通话，所以我需要很多流量。", pinyin: "Wǒ měi tiān dōu yào shàng wǎng xuéxí, hái yào gēn zài Měiguó de jiārén shìpín tōnghuà, suǒyǐ wǒ xūyào hěn duō liúliàng.", translation: "I study online every day and video-call my family in the US, so I need lots of data." },
      { speaker: "王钢", hanzi: "没问题，联通有各种套餐。有的套餐每个月提供很多流量，还有一些是不限制流量的。", pinyin: "Méi wèntí, Liántōng yǒu gè zhǒng tàocān. Yǒu de tàocān měi gè yuè tígōng hěn duō liúliàng, hái yǒu yì xiē shì bù xiànzhì liúliàng de.", translation: "No problem, Unicom has all sorts of plans — some give plenty of monthly data, some are unlimited." },
      { speaker: "凯伦", hanzi: "那太好了！这样我就不用担心流量不够用了。", pinyin: "Nà tài hǎo le! Zhèyàng wǒ jiù bú yòng dānxīn liúliàng bú gòu yòng le.", translation: "Great! Then I won't worry about running out of data." },
      { speaker: "王钢", hanzi: "你带上护照和学生证，到学校旁边的联通营业厅就可以开户了。", pinyin: "Nǐ dài shàng hùzhào hé xuésheng zhèng, dào xuéxiào pángbiān de Liántōng yíngyè tīng jiù kěyǐ kāi hù le.", translation: "Bring your passport and student ID, go to the Unicom office next to campus, and you can open an account." },
    ],
  },
];

const lesson3Vocab: VocabSet[] = [
  {
    id: "l3-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_3_text_1_vocab.mp3",
    items: [
      { hanzi: "智能手机", pinyin: "zhìnéng shǒujī", pos: "NP", meaning: "smartphone" },
      { hanzi: "始于", pinyin: "shǐ yú", pos: "VP", meaning: "to start from; date from" },
      { hanzi: "年代", pinyin: "niándài", pos: "N", meaning: "decade" },
      { hanzi: "科技", pinyin: "kējì", pos: "N", meaning: "science and technology" },
      { hanzi: "快速", pinyin: "kuàisù", pos: "A", meaning: "fast; rapid" },
      { hanzi: "拥有", pinyin: "yōngyǒu", pos: "V", meaning: "to possess; to own" },
      { hanzi: "强大", pinyin: "qiángdà", pos: "A", meaning: "strong; powerful" },
      { hanzi: "功能", pinyin: "gōngnéng", pos: "N", meaning: "function" },
      { hanzi: "触摸屏", pinyin: "chùmō píng", pos: "NP", meaning: "touch screen" },
      { hanzi: "高清摄像", pinyin: "gāoqīng shèxiàng", pos: "NP", meaning: "HD camera" },
      { hanzi: "生产", pinyin: "shēngchǎn", pos: "N/V", meaning: "production; to produce" },
      { hanzi: "代", pinyin: "dài", pos: "N", meaning: "generation" },
      { hanzi: "进入", pinyin: "jìnrù", pos: "V", meaning: "to enter" },
      { hanzi: "市场", pinyin: "shìchǎng", pos: "N", meaning: "market" },
      { hanzi: "开发", pinyin: "kāifā", pos: "V", meaning: "to develop" },
      { hanzi: "操作", pinyin: "cāozuò", pos: "N/V", meaning: "operation; to operate" },
      { hanzi: "知名", pinyin: "zhīmíng", pos: "A", meaning: "well known; famous" },
      { hanzi: "品牌", pinyin: "pǐnpái", pos: "N", meaning: "brand" },
      { hanzi: "特点", pinyin: "tèdiǎn", pos: "N", meaning: "feature; characteristic" },
      { hanzi: "稳定", pinyin: "wěndìng", pos: "A", meaning: "stable" },
      { hanzi: "著称", pinyin: "zhùchēng", pos: "A", meaning: "well known; famous (for)" },
      { hanzi: "灵活多样", pinyin: "línghuó duōyàng", pos: "AP", meaning: "flexible and diverse" },
      { hanzi: "应用", pinyin: "yìngyòng", pos: "N/V", meaning: "app; to apply" },
      { hanzi: "增加", pinyin: "zēngjiā", pos: "V", meaning: "to increase; to add" },
      { hanzi: "角落", pinyin: "jiǎoluò", pos: "N", meaning: "corner" },
      { hanzi: "通讯", pinyin: "tōngxùn", pos: "N", meaning: "communication" },
      { hanzi: "社交", pinyin: "shèjiāo", pos: "A/N", meaning: "social; social contact" },
      { hanzi: "娱乐", pinyin: "yúlè", pos: "N", meaning: "entertainment" },
      { hanzi: "新闻", pinyin: "xīnwén", pos: "N", meaning: "news" },
      { hanzi: "改变", pinyin: "gǎibiàn", pos: "N/V", meaning: "change; to change" },
      { hanzi: "场所", pinyin: "chángsuǒ", pos: "N", meaning: "place; site" },
      { hanzi: "效率", pinyin: "xiàolǜ", pos: "N", meaning: "efficiency" },
    ],
  },
  {
    id: "l3-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_3_text_2_vocab.mp3",
    items: [
      { hanzi: "信号", pinyin: "xìnhào", pos: "N", meaning: "signal" },
      { hanzi: "运营商", pinyin: "yùnyíng shāng", pos: "NP", meaning: "service provider; carrier" },
      { hanzi: "优惠价", pinyin: "yōuhuì jià", pos: "NP", meaning: "discount price" },
      { hanzi: "视频", pinyin: "shìpín", pos: "N", meaning: "video" },
      { hanzi: "通话", pinyin: "tōnghuà", pos: "V", meaning: "to call; to communicate by phone" },
      { hanzi: "流量", pinyin: "liúliàng", pos: "N", meaning: "mobile data" },
      { hanzi: "套餐", pinyin: "tàocān", pos: "N", meaning: "mobile plan; package" },
      { hanzi: "开户", pinyin: "kāi hù", pos: "VO", meaning: "to open an account" },
      { hanzi: "营业厅", pinyin: "yíngyè tīng", pos: "N", meaning: "service hall; business office" },
      { hanzi: "护照", pinyin: "hùzhào", pos: "N", meaning: "passport" },
      { hanzi: "学生证", pinyin: "xuésheng zhèng", pos: "N", meaning: "student ID" },
      { hanzi: "中国移动", pinyin: "Zhōngguó Yídòng", pos: "PN", meaning: "China Mobile" },
      { hanzi: "中国联通", pinyin: "Zhōngguó Liántōng", pos: "PN", meaning: "China Unicom" },
      { hanzi: "中国电信", pinyin: "Zhōngguó Diànxìn", pos: "PN", meaning: "China Telecom" },
    ],
  },
];

const lesson3Tasks: Task[] = [
  {
    id: "l3-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "zhì néng shǒu jī",
    answer: "智能手机",
    translation: "smartphone",
    audio: "/audio/lesson_3_text_1_vocab.mp3",
    hint: "zhì néng shǒu jī — pocket computer + phone",
  },
  {
    id: "l3-t2",
    type: "battle",
    prompt: "Pick the correct word for the gap",
    sentenceBefore: "苹果手机以功能强大、系统稳定",
    sentenceAfter: "著称。",
    options: [
      { hanzi: "而", pinyin: "ér", meaning: "(connector: for / and)" },
      { hanzi: "和", pinyin: "hé", meaning: "and" },
      { hanzi: "也", pinyin: "yě", meaning: "also" },
    ],
    correctIndex: 0,
    translation: "iPhones are well known for their powerful features and stable system.",
    hint: "Pattern: 以 X 而 著称 — 'famous for X'.",
  },
  {
    id: "l3-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'Our company developed a new operating system.'",
    blocks: ["开发出", "了", "我们公司", "一种", "新的", "操作系统"],
    answer: ["我们公司", "开发出", "了", "一种", "新的", "操作系统"],
    pinyin: "Wǒmen gōngsī kāifā chū le yì zhǒng xīn de cāozuò xìtǒng.",
    translation: "Our company has developed a new operating system.",
  },
  {
    id: "l3-t4",
    type: "matching",
    prompt: "Match each carrier / brand to its Chinese name",
    pairs: [
      { left: "📱", leftLabel: "China Mobile", right: "中国移动" },
      { left: "📶", leftLabel: "China Unicom", right: "中国联通" },
      { left: "☎️", leftLabel: "China Telecom", right: "中国电信" },
      { left: "🍎", leftLabel: "Apple Inc.", right: "苹果公司" },
    ],
  },
  {
    id: "l3-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 信号",
    word: "信号",
    translation: "signal",
    syllables: [
      { base: "xin", correctTone: 4 },
      { base: "hao", correctTone: 4 },
    ],
  },
  {
    id: "l3-t6",
    type: "intuition",
    prompt: "Fix the word order — 'Smartphones have entered every corner of our lives.'",
    brokenSentence: ["走进了", "每一个角落", "智能手机", "我们生活的"],
    correctOrder: [2, 0, 3, 1],
    translation: "Smartphones have entered every corner of our lives.",
    hint: "Subject — verb — possessive — object.",
  },
  {
    id: "l3-t7",
    type: "simulation",
    prompt: "Karen asks for advice. Reply naturally.",
    npcMessage: "我每天都要跟家人视频通话，需要很多流量。我应该选什么样的套餐？",
    npcPinyin: "Wǒ měi tiān dōu yào gēn jiārén shìpín tōnghuà, xūyào hěn duō liúliàng. Wǒ yīnggāi xuǎn shénme yàng de tàocān?",
    npcTranslation: "I video-call my family every day and need lots of data. What kind of plan should I pick?",
    options: [
      { hanzi: "选一个不限制流量的套餐吧。", pinyin: "Xuǎn yí gè bú xiànzhì liúliàng de tàocān ba.", correct: true, reply: "好主意，谢谢！" },
      { hanzi: "买一个新手机就行。", pinyin: "Mǎi yí gè xīn shǒujī jiù xíng.", correct: false },
      { hanzi: "别用智能手机了。", pinyin: "Bié yòng zhìnéng shǒujī le.", correct: false },
    ],
  },
  {
    id: "l3-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences using each item below. Reuse vocabulary from earlier lessons.",
    required: ["智能手机", "应用", "V + 出 (e.g. 开发出, 生产出)"],
    minSentences: 3,
    retroWords: ["输入法", "下载", "电子邮件", "联系", "据我所知"],
  },
];

const lesson3Recap: Recap = {
  takeaways: [
    "智能手机始于上世纪九十年代; 2007 — 第一代 iPhone.",
    "iOS = 苹果; 安卓 = 三星 / 华为 / 小米.",
    "Pattern: 以 X 而 著称 — 'famous for X'. 而 … 则 — contrasts two clauses.",
    "Carriers: 中国移动 / 中国联通 / 中国电信. 开户 needs 护照 + 学生证.",
  ],
  keyWords: ["智能手机", "操作系统", "应用", "套餐", "流量", "信号", "运营商"],
};

// ───────────────────────────────────────────────────────────────────────────
// LESSON 4 — 社交媒体 / Social Media
// ───────────────────────────────────────────────────────────────────────────

const lesson4Dialogues: Dialogue[] = [
  {
    id: "l4-text1",
    title: "课文一",
    titleEn: "Text 1 — A tour of Chinese social media",
    audio: "/audio/lesson_4_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "在今天的中国，很难想象有人从未接触过社交媒体。从看新闻、联系亲友，到购物、娱乐，人们越来越离不开社交媒体了。",
        pinyin: "Zài jīntiān de Zhōngguó, hěn nán xiǎngxiàng yǒu rén cóng wèi jiēchù guò shèjiāo méitǐ. Cóng kàn xīnwén, liánxì qīnyǒu, dào gòuwù, yúlè, rénmen yuè lái yuè lí bù kāi shèjiāo méitǐ le.",
        translation: "In today's China it is hard to imagine anyone who has never touched social media. From reading news and contacting friends and family, to shopping and entertainment, people rely on it more and more.",
      },
      {
        hanzi: "中国的社交媒体形式多样，功能丰富。微信和微博是两大主流社交平台。",
        pinyin: "Zhōngguó de shèjiāo méitǐ xíngshì duōyàng, gōngnéng fēngfù. Wēixìn hé Wēibó shì liǎng dà zhǔliú shèjiāo píngtái.",
        translation: "China's social media comes in many forms with rich features. WeChat and Weibo are the two mainstream platforms.",
      },
      {
        hanzi: "微信集社交、通讯、支付等功能于一体，是几乎每个中国人都必不可少的社交工具。",
        pinyin: "Wēixìn jí shèjiāo, tōngxùn, zhīfù děng gōngnéng yú yìtǐ, shì jīhū měi ge Zhōngguó rén dōu bì bù kě shǎo de shèjiāo gōngjù.",
        translation: "WeChat integrates social, messaging and payment features into one, and is an essential tool for almost every Chinese person.",
      },
      {
        hanzi: "微博很像美国的社交平台“X”，用户可以在上面发布文字、图片、视频等多媒体内容，也可以跟其他用户互动和交流。",
        pinyin: "Wēibó hěn xiàng Měiguó de shèjiāo píngtái “X”, yònghù kěyǐ zài shàngmian fābù wénzì, túpiàn, shìpín děng duōméitǐ nèiróng, yě kěyǐ gēn qítā yònghù hùdòng hé jiāoliú.",
        translation: "Weibo is much like America's “X”: users can post text, images and video, and interact with other users.",
      },
      {
        hanzi: "微博也是许多明星和网红集聚的地方。",
        pinyin: "Wēibó yě shì xǔduō míngxīng hé wǎnghóng jíjù de dìfang.",
        translation: "Weibo is also where many celebrities and influencers gather.",
      },
      {
        hanzi: "对于喜欢短视频的人来说，抖音和快手是他们的天堂。",
        pinyin: "Duìyú xǐhuan duǎn shìpín de rén lái shuō, Dǒuyīn hé Kuàishǒu shì tāmen de tiāntáng.",
        translation: "For people who love short videos, Douyin and Kuaishou are paradise.",
      },
      {
        hanzi: "小红书也很受年轻女性的欢迎，这是一个分享购物心得、美妆秘诀、旅行经验的社区。",
        pinyin: "Xiǎohóngshū yě hěn shòu niánqīng nǚxìng de huānyíng, zhè shì yí gè fēnxiǎng gòuwù xīndé, měi zhuāng mìjué, lǚxíng jīngyàn de shèqū.",
        translation: "Xiaohongshu is very popular with young women — a community for sharing shopping tips, beauty secrets, and travel experiences.",
      },
      {
        hanzi: "还有一个不得不说的平台叫知乎，是一个分享知识的地方。不管你有什么问题，都可以在这里找到答案。",
        pinyin: "Hái yǒu yí gè bùdébù shuō de píngtái jiào Zhīhū, shì yí gè fēnxiǎng zhīshi de dìfang. Bùguǎn nǐ yǒu shénme wèntí, dōu kěyǐ zài zhè lǐ zhǎodào dá’àn.",
        translation: "There's also a must-mention platform called Zhihu, a place for sharing knowledge. Whatever question you have, you can find an answer here.",
      },
      {
        hanzi: "它们改变了人们的生活方式，也为中国的社会和文化带来了新的活力。",
        pinyin: "Tāmen gǎibiàn le rénmen de shēnghuó fāngshì, yě wèi Zhōngguó de shèhuì hé wénhuà dài lái le xīn de huólì.",
        translation: "They have changed people's lifestyles and brought new vitality to Chinese society and culture.",
      },
    ],
  },
  {
    id: "l4-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen sets up a WeChat group",
    audio: "/audio/lesson_4_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "凯伦", hanzi: "王钢，我有个想法，我想建一个我们班同学的微信群，这样大家交流起来会更方便。你能帮帮我吗？", pinyin: "Wáng Gāng, wǒ yǒu ge xiǎngfǎ, wǒ xiǎng jiàn yí ge wǒmen bān tóngxué de Wēixìn qún, zhèyàng dàjiā jiāoliú qǐlái huì gèng fāngbiàn. Nǐ néng bāngbang wǒ ma?", translation: "Wang Gang, I have an idea — I want to start a WeChat group for our class so it's easier for everyone to chat. Can you help me?" },
      { speaker: "王钢", hanzi: "好啊！你得先在手机上安装微信应用。", pinyin: "Hǎo a! Nǐ děi xiān zài shǒujī shàng ānzhuāng Wēixìn yìngyòng.", translation: "Sure! First you need to install the WeChat app on your phone." },
      { speaker: "凯伦", hanzi: "微信我已经安装了，而且也注册过了。", pinyin: "Wēixìn wǒ yǐjīng ānzhuāng le, érqiě yě zhùcè guò le.", translation: "I've already installed WeChat and registered." },
      { speaker: "王钢", hanzi: "那你打开微信，点击右上角的加号，选择“发起群聊”，然后从通讯录里选择你要邀请的同学，点击“完成”就好了。", pinyin: "Nà nǐ dǎkāi Wēixìn, diǎnjī yòu shàng jiǎo de jiāhào, xuǎnzé “fāqǐ qún liáo”, ránhòu cóng tōngxùn lù lǐ xuǎnzé nǐ yào yāoqǐng de tóngxué, diǎnjī “wánchéng” jiù hǎo le.", translation: "Then open WeChat, tap the plus sign in the top-right, choose “Start group chat,” pick the classmates from your contacts, and tap “Done.”" },
      { speaker: "凯伦", hanzi: "我还想给这个群起个既好听又好记的名字，要怎么做呢？", pinyin: "Wǒ hái xiǎng gěi zhè ge qún qǐ ge jì hǎotīng yòu hǎo jì de míngzi, yào zěnme zuò ne?", translation: "I also want to give the group a name that sounds nice and is easy to remember — how do I do that?" },
      { speaker: "王钢", hanzi: "很简单，去群聊设置里就能改名。", pinyin: "Hěn jiǎndān, qù qún liáo shèzhì lǐ jiù néng gǎi míng.", translation: "Easy — just go into group chat settings and rename it." },
      { speaker: "凯伦", hanzi: "那建好群后，还有什么要注意的吗？", pinyin: "Nà jiàn hǎo qún hòu, hái yǒu shénme yào zhùyì de ma?", translation: "Once the group is set up, anything else I should watch out for?" },
      { speaker: "王钢", hanzi: "你作为群主，得给大家定群规，在群里告诉大家。", pinyin: "Nǐ zuòwéi qún zhǔ, děi gěi dàjiā dìng qún guī, zài qún lǐ gàosu dàjiā.", translation: "As the group owner, you need to set group rules and announce them in the group." },
      { speaker: "凯伦", hanzi: "群规都要写什么呢？", pinyin: "Qún guī dōu yào xiě shénme ne?", translation: "What should the rules cover?" },
      { speaker: "王钢", hanzi: "比如，不要在群里发不合适的内容，还有要尊重每个人的看法。只要大家都遵守群规，微信群就能成为我们愉快交流的好地方。", pinyin: "Bǐrú, bú yào zài qún lǐ fā bù héshì de nèiróng, hái yǒu yào zūnzhòng měi ge rén de kànfǎ. Zhǐyào dàjiā dōu zūnshǒu qún guī, Wēixìn qún jiù néng chéngwéi wǒmen yúkuài jiāoliú de hǎo dìfang.", translation: "For example: don't post inappropriate content, and respect everyone's views. As long as everyone follows the rules, the group will be a great place for friendly communication." },
      { speaker: "凯伦", hanzi: "你说得对，这太重要了。多谢你帮忙！", pinyin: "Nǐ shuō de duì, zhè tài zhòngyào le. Duōxiè nǐ bāngmáng!", translation: "You're right, that's really important. Thanks so much for the help!" },
    ],
  },
];

const lesson4Vocab: VocabSet[] = [
  {
    id: "l4-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_4_text_1_vocab.mp3",
    items: [
      { hanzi: "社交媒体", pinyin: "shèjiāo méitǐ", pos: "NP", meaning: "social media" },
      { hanzi: "想象", pinyin: "xiǎngxiàng", pos: "N/V", meaning: "imagination; to imagine" },
      { hanzi: "从未", pinyin: "cóng wèi", pos: "Adv", meaning: "never" },
      { hanzi: "接触", pinyin: "jiēchù", pos: "V", meaning: "to access; to get in touch with" },
      { hanzi: "形式", pinyin: "xíngshì", pos: "N", meaning: "form; structure" },
      { hanzi: "丰富", pinyin: "fēngfù", pos: "A", meaning: "rich; abundant" },
      { hanzi: "主流", pinyin: "zhǔliú", pos: "A/N", meaning: "mainstream" },
      { hanzi: "平台", pinyin: "píngtái", pos: "N", meaning: "platform" },
      { hanzi: "集", pinyin: "jí", pos: "V", meaning: "to gather; to integrate" },
      { hanzi: "支付", pinyin: "zhīfù", pos: "N/V", meaning: "payment; to pay" },
      { hanzi: "于", pinyin: "yú", pos: "Prep", meaning: "in; at" },
      { hanzi: "一体", pinyin: "yìtǐ", pos: "N", meaning: "an integral whole" },
      { hanzi: "必不可少", pinyin: "bì bù kě shǎo", pos: "AP", meaning: "indispensable; essential" },
      { hanzi: "发布", pinyin: "fābù", pos: "V", meaning: "to post; to publish" },
      { hanzi: "多媒体", pinyin: "duōméitǐ", pos: "N", meaning: "multimedia" },
      { hanzi: "内容", pinyin: "nèiróng", pos: "N", meaning: "content" },
      { hanzi: "进行", pinyin: "jìnxíng", pos: "V", meaning: "to proceed; to carry out" },
      { hanzi: "互动", pinyin: "hùdòng", pos: "N/V", meaning: "interaction; to interact" },
      { hanzi: "明星", pinyin: "míngxīng", pos: "N", meaning: "star; celebrity" },
      { hanzi: "网红", pinyin: "wǎnghóng", pos: "N", meaning: "influencer" },
      { hanzi: "集聚", pinyin: "jíjù", pos: "V", meaning: "to gather; to assemble" },
      { hanzi: "短", pinyin: "duǎn", pos: "A", meaning: "short" },
      { hanzi: "天堂", pinyin: "tiāntáng", pos: "N", meaning: "paradise; heaven" },
      { hanzi: "女性", pinyin: "nǚxìng", pos: "N", meaning: "female; woman" },
      { hanzi: "分享", pinyin: "fēnxiǎng", pos: "N/V", meaning: "share; to share" },
      { hanzi: "心得", pinyin: "xīndé", pos: "N", meaning: "insight" },
      { hanzi: "美妆秘诀", pinyin: "měi zhuāng mìjué", pos: "NP", meaning: "beauty / makeup tips" },
      { hanzi: "社区", pinyin: "shèqū", pos: "N", meaning: "community" },
      { hanzi: "答案", pinyin: "dá’àn", pos: "N", meaning: "answer" },
      { hanzi: "专家", pinyin: "zhuānjiā", pos: "N", meaning: "expert" },
      { hanzi: "活力", pinyin: "huólì", pos: "N", meaning: "vitality; energy" },
      { hanzi: "微信", pinyin: "Wēixìn", pos: "PN", meaning: "WeChat" },
      { hanzi: "微博", pinyin: "Wēibó", pos: "PN", meaning: "Weibo" },
      { hanzi: "抖音", pinyin: "Dǒuyīn", pos: "PN", meaning: "Douyin (TikTok CN)" },
      { hanzi: "快手", pinyin: "Kuàishǒu", pos: "PN", meaning: "Kuaishou" },
      { hanzi: "小红书", pinyin: "Xiǎohóngshū", pos: "PN", meaning: "Xiaohongshu (RED)" },
      { hanzi: "知乎", pinyin: "Zhīhū", pos: "PN", meaning: "Zhihu (Quora-like)" },
    ],
  },
  {
    id: "l4-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_4_text_2_vocab.mp3",
    items: [
      { hanzi: "建", pinyin: "jiàn", pos: "V", meaning: "to build; to set up" },
      { hanzi: "群", pinyin: "qún", pos: "N", meaning: "group; crowd" },
      { hanzi: "右上角", pinyin: "yòu shàng jiǎo", pos: "NP", meaning: "upper right corner" },
      { hanzi: "加号", pinyin: "jiāhào", pos: "N", meaning: "plus sign" },
      { hanzi: "发起", pinyin: "fāqǐ", pos: "V", meaning: "to initiate; to launch" },
      { hanzi: "通讯录", pinyin: "tōngxùn lù", pos: "NP", meaning: "address book; contacts" },
      { hanzi: "邀请", pinyin: "yāoqǐng", pos: "V", meaning: "to invite" },
      { hanzi: "改名", pinyin: "gǎi míng", pos: "VO", meaning: "to change name" },
      { hanzi: "群主", pinyin: "qún zhǔ", pos: "NP", meaning: "group owner; admin" },
      { hanzi: "群规", pinyin: "qún guī", pos: "NP", meaning: "group rules" },
      { hanzi: "尊重", pinyin: "zūnzhòng", pos: "V", meaning: "to respect" },
      { hanzi: "遵守", pinyin: "zūnshǒu", pos: "V", meaning: "to abide by; to comply with" },
      { hanzi: "安装", pinyin: "ānzhuāng", pos: "V", meaning: "to install" },
      { hanzi: "注册", pinyin: "zhùcè", pos: "V", meaning: "to register" },
      { hanzi: "点击", pinyin: "diǎnjī", pos: "V", meaning: "to click; to tap" },
      { hanzi: "选择", pinyin: "xuǎnzé", pos: "V", meaning: "to choose; to select" },
      { hanzi: "设置", pinyin: "shèzhì", pos: "N/V", meaning: "settings; to set" },
      { hanzi: "作为", pinyin: "zuòwéi", pos: "Prep", meaning: "as; being" },
    ],
  },
];

const lesson4Tasks: Task[] = [
  {
    id: "l4-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "shè jiāo méi tǐ",
    answer: "社交媒体",
    translation: "social media",
    audio: "/audio/lesson_4_text_1_vocab.mp3",
    hint: "shè jiāo méi tǐ — the umbrella term for WeChat, Weibo, Douyin…",
  },
  {
    id: "l4-t2",
    type: "battle",
    prompt: "Pick the correct word for the gap",
    sentenceBefore: "微信",
    sentenceAfter: "社交、通讯、支付等功能于一体。",
    options: [
      { hanzi: "集", pinyin: "jí", meaning: "to integrate" },
      { hanzi: "把", pinyin: "bǎ", meaning: "(disposal marker)" },
      { hanzi: "用", pinyin: "yòng", meaning: "to use" },
    ],
    correctIndex: 0,
    translation: "WeChat integrates social, messaging and payment features into one.",
    hint: "Pattern: 集 X 于一体 — 'integrate X into one'.",
  },
  {
    id: "l4-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'For people who love short videos, Douyin is paradise.'",
    blocks: ["对于", "喜欢短视频的人", "来说", "抖音", "是", "他们的天堂"],
    answer: ["对于", "喜欢短视频的人", "来说", "抖音", "是", "他们的天堂"],
    pinyin: "Duìyú xǐhuan duǎn shìpín de rén lái shuō, Dǒuyīn shì tāmen de tiāntáng.",
    translation: "For people who love short videos, Douyin is their paradise.",
    hint: "Pattern: 对于 … 来说 — 'as far as … is concerned'.",
  },
  {
    id: "l4-t4",
    type: "matching",
    prompt: "Match each Chinese platform to what it's known for",
    pairs: [
      { left: "💬", leftLabel: "WeChat", right: "微信" },
      { left: "📰", leftLabel: "Weibo", right: "微博" },
      { left: "🎵", leftLabel: "Douyin", right: "抖音" },
      { left: "💄", leftLabel: "Xiaohongshu", right: "小红书" },
      { left: "❓", leftLabel: "Zhihu", right: "知乎" },
    ],
  },
  {
    id: "l4-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 邀请",
    word: "邀请",
    translation: "to invite",
    syllables: [
      { base: "yao", correctTone: 1 },
      { base: "qing", correctTone: 3 },
    ],
  },
  {
    id: "l4-t6",
    type: "intuition",
    prompt: "Fix the word order — 'No matter what question you have, you can find an answer here.'",
    brokenSentence: ["不管", "找到答案", "你有什么问题", "都可以在这里"],
    correctOrder: [0, 2, 3, 1],
    translation: "No matter what question you have, you can find an answer here.",
    hint: "Pattern: 不管 … 都 — 'no matter …, would'.",
  },
  {
    id: "l4-t7",
    type: "simulation",
    prompt: "Karen wants to add you to a class WeChat group. Reply naturally.",
    npcMessage: "我想建一个我们班的微信群。你能帮我看看怎么发起群聊吗？",
    npcPinyin: "Wǒ xiǎng jiàn yí ge wǒmen bān de Wēixìn qún. Nǐ néng bāng wǒ kàn kàn zěnme fāqǐ qún liáo ma?",
    npcTranslation: "I want to set up a WeChat group for our class. Can you help me figure out how to start a group chat?",
    options: [
      { hanzi: "点击右上角的加号，选择“发起群聊”就行。", pinyin: "Diǎnjī yòu shàng jiǎo de jiāhào, xuǎnzé “fāqǐ qún liáo” jiù xíng.", correct: true, reply: "太好了，谢谢你！" },
      { hanzi: "你得先买一个新手机。", pinyin: "Nǐ děi xiān mǎi yí ge xīn shǒujī.", correct: false },
      { hanzi: "微信不能建群。", pinyin: "Wēixìn bù néng jiàn qún.", correct: false },
    ],
  },
  {
    id: "l4-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences describing a Chinese social platform you'd try, using each item below.",
    required: ["社交媒体", "对于…来说", "集…于一体"],
    minSentences: 3,
    retroWords: ["智能手机", "应用", "下载", "套餐", "流量"],
  },
];

const lesson4Recap: Recap = {
  takeaways: [
    "微信 = 社交 + 通讯 + 支付 集于一体. 微博 ≈ X / Twitter.",
    "抖音 / 快手 — 短视频; 小红书 — 美妆 & 购物心得; 知乎 — 知识问答.",
    "Pattern: 对于 … 来说 — 'as far as … is concerned'. 不管 … 都 — 'no matter …, still'.",
    "建微信群: 加号 → 发起群聊 → 通讯录 → 完成. 群主 sets 群规.",
  ],
  keyWords: ["社交媒体", "平台", "发布", "互动", "分享", "群", "群规"],
};

// ───────────────────────────────────────────────────────────────────────────
// LESSON 5 — 机器翻译 / Machine Translation
// ───────────────────────────────────────────────────────────────────────────

const lesson5Dialogues: Dialogue[] = [
  {
    id: "l5-text1",
    title: "课文一",
    titleEn: "Text 1 — A primer on machine translation",
    audio: "/audio/lesson_5_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "机器翻译就是利用电脑技术把一种语言转换成另一种语言。早在上世纪五十年代，科学家们就已经开始研发机器翻译了。",
        pinyin: "Jīqì fānyì jiù shì lìyòng diànnǎo jìshù bǎ yì zhǒng yǔyán zhuǎnhuàn chéng lìng yì zhǒng yǔyán. Zǎo zài shàng shìjì wǔshí niándài, kēxuéjiā men jiù yǐjīng kāishǐ yánfā jīqì fānyì le.",
        translation: "Machine translation uses computer technology to convert one language into another. As early as the 1950s, scientists had already started researching it.",
      },
      {
        hanzi: "自从那时以来，机器翻译已从最初的词对词翻译，发展到考虑整个句子的结构和上下文意义的翻译。",
        pinyin: "Zìcóng nà shí yǐlái, jīqì fānyì yǐ cóng zuìchū de cí duì cí fānyì, fāzhǎn dào kǎolǜ zhěnggè jùzi de jiégòu hé shàngxiàwén yìyì de fānyì.",
        translation: "Since then, MT has evolved from initial word-for-word translation to translation that considers full sentence structure and contextual meaning.",
      },
      {
        hanzi: "根据不同的方法和原理，机器翻译可以大致分为三种类型。第一种是基于规则的翻译，通过使用语言学的规则来进行翻译。",
        pinyin: "Gēnjù bù tóng de fāngfǎ hé yuánlǐ, jīqì fānyì kěyǐ dàzhì fēn wéi sān zhǒng lèixíng. Dì yī zhǒng shì jīyú guīzé de fānyì, tōngguò shǐyòng yǔyán xué de guīzé lái jìnxíng fānyì.",
        translation: "Based on different methods and principles, MT can be roughly divided into three types. The first is rule-based translation, which works by applying linguistic rules.",
      },
      {
        hanzi: "第二种是基于统计的翻译，通过分析大量的语言数据进行翻译。",
        pinyin: "Dì èr zhǒng shì jīyú tǒngjì de fānyì, tōngguò fēnxī dàliàng de yǔyán shùjù jìnxíng fānyì.",
        translation: "The second is statistics-based translation, which translates by analysing large amounts of language data.",
      },
      {
        hanzi: "第三种被称为神经机器翻译，它让电脑软件模仿人脑的神经网络，通过学习大量的语言材料来进行翻译。神经机器翻译是现在最新的翻译技术，已被各大机器翻译平台所采用。",
        pinyin: "Dì sān zhǒng bèi chēng wéi shénjīng jīqì fānyì, tā ràng diànnǎo ruǎnjiàn mófǎng rén nǎo de shénjīng wǎngluò, tōngguò xuéxí dàliàng de yǔyán cáiliào lái jìnxíng fānyì. Shénjīng jīqì fānyì shì xiànzài zuì xīn de fānyì jìshù, yǐ bèi gè dà jīqì fānyì píngtái suǒ cǎiyòng.",
        translation: "The third is called neural machine translation: software imitates the brain's neural network and learns from huge volumes of language material. NMT is the newest technology, adopted by all major MT platforms.",
      },
      {
        hanzi: "谈到平台，大家可能会想到谷歌翻译、微软翻译和 DeepL。其实，在中文互联网上也有不少非常优秀的翻译平台，如百度翻译、有道翻译、以及搜狗翻译等。",
        pinyin: "Tán dào píngtái, dàjiā kěnéng huì xiǎng dào Gǔgē Fānyì, Wēiruǎn Fānyì hé DeepL. Qíshí, zài Zhōngwén hùliánwǎng shàng yě yǒu bù shǎo fēicháng yōuxiù de fānyì píngtái, rú Bǎidù Fānyì, Yǒudào Fānyì, yǐjí Sōugǒu Fānyì děng.",
        translation: "Speaking of platforms, people may think of Google Translate, Microsoft Translator and DeepL. Actually, the Chinese internet has many excellent platforms too — Baidu, Youdao and Sogou Translate.",
      },
      {
        hanzi: "以上这些平台都支持多种语言的文本翻译，同时也提供语音和图片翻译。",
        pinyin: "Yǐshàng zhèxiē píngtái dōu zhīchí duō zhǒng yǔyán de wénběn fānyì, tóngshí yě tígōng yǔyīn hé túpiàn fānyì.",
        translation: "All these platforms support text translation in many languages, and also offer voice and image translation.",
      },
      {
        hanzi: "值得注意的是，这些平台都开发了用于手机的翻译应用，以便更好地满足人们对翻译的日常需求。",
        pinyin: "Zhídé zhùyì de shì, zhèxiē píngtái dōu kāifā le yòng yú shǒujī de fānyì yìngyòng, yǐbiàn gèng hǎo de mǎnzú rénmen duì fānyì de rìcháng xūqiú.",
        translation: "It is worth noting that all of them have developed mobile translation apps to better meet people's everyday translation needs.",
      },
    ],
  },
  {
    id: "l5-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen plans her translation report",
    audio: "/audio/lesson_5_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "凯伦", hanzi: "李老师，您今天的课太有意思了，我学到不少新东西。", pinyin: "Lǐ lǎoshī, nín jīntiān de kè tài yǒu yìsi le, wǒ xué dào bù shǎo xīn dōngxi.", translation: "Teacher Li, today's class was so interesting — I learned a lot of new things." },
      { speaker: "李老师", hanzi: "是吗，学到了什么新东西？", pinyin: "Shì ma, xué dào le shénme xīn dōngxi?", translation: "Really? What did you learn?" },
      { speaker: "凯伦", hanzi: "您说的有些翻译平台，我原来都不知道！这些平台对我学中文非常有用。", pinyin: "Nín shuō de yǒu xiē fānyì píngtái, wǒ yuánlái dōu bù zhīdào! Zhèxiē píngtái duì wǒ xué Zhōngwén fēicháng yǒu yòng.", translation: "Some of the translation platforms you mentioned — I had no idea they existed! They're very useful for my Chinese studies." },
      { speaker: "李老师", hanzi: "对了，下节课你们要做课堂报告，就是谈翻译平台。你想谈什么呢？", pinyin: "Duì le, xià jié kè nǐmen yào zuò kètáng bàogào, jiù shì tán fānyì píngtái. Nǐ xiǎng tán shénme ne?", translation: "By the way, next class you'll give a presentation about translation platforms. What do you want to talk about?" },
      { speaker: "凯伦", hanzi: "我对谷歌翻译和百度翻译都有兴趣，想谈谈这两个平台。", pinyin: "Wǒ duì Gǔgē Fānyì hé Bǎidù Fānyì dōu yǒu xìngqù, xiǎng tán tan zhè liǎng ge píngtái.", translation: "I'm interested in both Google Translate and Baidu Translate — I'd like to discuss these two." },
      { speaker: "李老师", hanzi: "你有什么具体计划吗？", pinyin: "Nǐ yǒu shénme jùtǐ jìhuà ma?", translation: "Do you have a concrete plan?" },
      { speaker: "凯伦", hanzi: "还没想好。想听听老师您的建议。", pinyin: "Hái méi xiǎng hǎo. Xiǎng tīng ting lǎoshī nín de jiànyì.", translation: "Not yet — I'd like to hear your suggestions." },
      { speaker: "李老师", hanzi: "我觉得你可以选一篇英语文章，在这两个平台翻译成中文，然后比较两个译文，看看它们有哪些相同和不相同的地方。", pinyin: "Wǒ juéde nǐ kěyǐ xuǎn yì piān Yīngyǔ wénzhāng, zài zhè liǎng ge píngtái fānyì chéng Zhōngwén, ránhòu bǐjiào liǎng ge yìwén, kàn kan tāmen yǒu nǎxiē xiāngtóng hé bù xiāngtóng de dìfang.", translation: "I think you could pick an English article, translate it into Chinese on both platforms, then compare the two translations and see what is similar and what is different." },
      { speaker: "凯伦", hanzi: "嗯，这听起来很不错。老师，我需要特别注意什么？", pinyin: "Èn, zhè tīng qǐlái hěn bú cuò. Lǎoshī, wǒ xūyào tèbié zhùyì shénme?", translation: "Mm, that sounds great. Teacher, what should I pay special attention to?" },
      { speaker: "李老师", hanzi: "在比较两个译文的时候，有两个关键方面需要注意，一个是译文的准确性，另一个是译文的可读性。", pinyin: "Zài bǐjiào liǎng ge yìwén de shíhou, yǒu liǎng ge guānjiàn fāngmiàn xūyào zhùyì, yí ge shì yìwén de zhǔnquèxìng, lìng yí ge shì yìwén de kědúxìng.", translation: "When comparing the two translations, there are two key aspects to watch: accuracy and readability." },
      { speaker: "凯伦", hanzi: "好的，谢谢老师的建议，我会好好准备的。", pinyin: "Hǎo de, xièxie lǎoshī de jiànyì, wǒ huì hǎohao zhǔnbèi de.", translation: "Got it — thank you for your advice, I'll prepare carefully." },
    ],
  },
];

const lesson5Vocab: VocabSet[] = [
  {
    id: "l5-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_5_text_1_vocab.mp3",
    items: [
      { hanzi: "机器翻译", pinyin: "jīqì fānyì", pos: "NP", meaning: "machine translation" },
      { hanzi: "利用", pinyin: "lìyòng", pos: "V", meaning: "to utilize; to make use of" },
      { hanzi: "技术", pinyin: "jìshù", pos: "N", meaning: "technology; technique" },
      { hanzi: "转换", pinyin: "zhuǎnhuàn", pos: "V", meaning: "to change; to transform" },
      { hanzi: "科学家", pinyin: "kēxuéjiā", pos: "N", meaning: "scientist" },
      { hanzi: "研发", pinyin: "yánfā", pos: "V", meaning: "to research and develop" },
      { hanzi: "词对词", pinyin: "cí duì cí", pos: "NP", meaning: "word for word" },
      { hanzi: "考虑", pinyin: "kǎolǜ", pos: "N/V", meaning: "consideration; to consider" },
      { hanzi: "整个", pinyin: "zhěnggè", pos: "A", meaning: "entire; whole" },
      { hanzi: "上下文", pinyin: "shàngxiàwén", pos: "N", meaning: "context" },
      { hanzi: "方法", pinyin: "fāngfǎ", pos: "N", meaning: "method" },
      { hanzi: "原理", pinyin: "yuánlǐ", pos: "N", meaning: "principle; theory" },
      { hanzi: "大致", pinyin: "dàzhì", pos: "Adv", meaning: "approximately; roughly" },
      { hanzi: "分为", pinyin: "fēn wéi", pos: "VP", meaning: "to divide into" },
      { hanzi: "类型", pinyin: "lèixíng", pos: "N", meaning: "type; form" },
      { hanzi: "基于", pinyin: "jīyú", pos: "Prep", meaning: "on the basis of" },
      { hanzi: "规则", pinyin: "guīzé", pos: "N", meaning: "rule; regulation" },
      { hanzi: "统计", pinyin: "tǒngjì", pos: "N/V", meaning: "statistics; to count" },
      { hanzi: "分析", pinyin: "fēnxī", pos: "N/V", meaning: "analysis; to analyze" },
      { hanzi: "大量", pinyin: "dàliàng", pos: "A", meaning: "large amount of" },
      { hanzi: "数据", pinyin: "shùjù", pos: "N", meaning: "data" },
      { hanzi: "神经", pinyin: "shénjīng", pos: "N", meaning: "nerve; neural" },
      { hanzi: "网络", pinyin: "wǎngluò", pos: "N", meaning: "network; internet" },
      { hanzi: "模仿", pinyin: "mófǎng", pos: "N/V", meaning: "imitation; to imitate" },
      { hanzi: "人脑", pinyin: "rén nǎo", pos: "NP", meaning: "human brain" },
      { hanzi: "材料", pinyin: "cáiliào", pos: "N", meaning: "material" },
      { hanzi: "采用", pinyin: "cǎiyòng", pos: "V", meaning: "to adopt; to use" },
      { hanzi: "优秀", pinyin: "yōuxiù", pos: "A", meaning: "outstanding; excellent" },
      { hanzi: "互联网", pinyin: "hùliánwǎng", pos: "N", meaning: "internet" },
      { hanzi: "支持", pinyin: "zhīchí", pos: "N/V", meaning: "support; to support" },
      { hanzi: "文本", pinyin: "wénběn", pos: "N", meaning: "text" },
      { hanzi: "图片", pinyin: "túpiàn", pos: "N", meaning: "picture; image" },
      { hanzi: "值得", pinyin: "zhídé", pos: "V", meaning: "to deserve; to be worth" },
      { hanzi: "注意", pinyin: "zhùyì", pos: "N/V", meaning: "attention; to pay attention" },
      { hanzi: "以便", pinyin: "yǐbiàn", pos: "Conj", meaning: "so that; in order to" },
      { hanzi: "满足", pinyin: "mǎnzú", pos: "V", meaning: "to satisfy" },
      { hanzi: "需求", pinyin: "xūqiú", pos: "N", meaning: "needs; demand" },
      { hanzi: "谷歌翻译", pinyin: "Gǔgē Fānyì", pos: "PN", meaning: "Google Translate" },
      { hanzi: "微软翻译", pinyin: "Wēiruǎn Fānyì", pos: "PN", meaning: "Microsoft Translator" },
      { hanzi: "百度翻译", pinyin: "Bǎidù Fānyì", pos: "PN", meaning: "Baidu Translate" },
      { hanzi: "有道翻译", pinyin: "Yǒudào Fānyì", pos: "PN", meaning: "Youdao Translate" },
      { hanzi: "搜狗翻译", pinyin: "Sōugǒu Fānyì", pos: "PN", meaning: "Sogou Translate" },
    ],
  },
  {
    id: "l5-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_5_text_2_vocab.mp3",
    items: [
      { hanzi: "课堂报告", pinyin: "kètáng bàogào", pos: "NP", meaning: "class presentation" },
      { hanzi: "具体", pinyin: "jùtǐ", pos: "A", meaning: "concrete; specific" },
      { hanzi: "译文", pinyin: "yìwén", pos: "N", meaning: "translated text; translation" },
      { hanzi: "相同", pinyin: "xiāngtóng", pos: "A", meaning: "same; identical" },
      { hanzi: "关键", pinyin: "guānjiàn", pos: "A/N", meaning: "crucial; key point" },
      { hanzi: "准确性", pinyin: "zhǔnquèxìng", pos: "N", meaning: "accuracy; correctness" },
      { hanzi: "可读性", pinyin: "kědúxìng", pos: "N", meaning: "readability" },
      { hanzi: "建议", pinyin: "jiànyì", pos: "N/V", meaning: "suggestion; to suggest" },
      { hanzi: "比较", pinyin: "bǐjiào", pos: "V/Adv", meaning: "to compare; relatively" },
      { hanzi: "方面", pinyin: "fāngmiàn", pos: "N", meaning: "aspect; side" },
      { hanzi: "李老师", pinyin: "Lǐ lǎoshī", pos: "PN", meaning: "Teacher Li" },
    ],
  },
];

const lesson5Tasks: Task[] = [
  {
    id: "l5-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "jī qì fān yì",
    answer: "机器翻译",
    translation: "machine translation",
    audio: "/audio/lesson_5_text_1_vocab.mp3",
    hint: "jī qì fān yì — the central topic of this lesson.",
  },
  {
    id: "l5-t2",
    type: "battle",
    prompt: "Pick the correct word for the gap",
    sentenceBefore: "机器翻译可以",
    sentenceAfter: "规则的翻译、基于统计的翻译和神经机器翻译三种类型。",
    options: [
      { hanzi: "分为基于", pinyin: "fēn wéi jīyú", meaning: "be divided into … based on" },
      { hanzi: "属于", pinyin: "shǔyú", meaning: "to belong to" },
      { hanzi: "组成", pinyin: "zǔchéng", meaning: "to compose" },
    ],
    correctIndex: 0,
    translation: "MT can be divided into three types: rule-based, statistics-based, and neural MT.",
    hint: "Pattern: 分为 X — divide into X.",
  },
  {
    id: "l5-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'Machine translation uses computer technology to convert one language into another.'",
    blocks: ["机器翻译", "就是", "利用电脑技术", "把", "一种语言", "转换成", "另一种语言"],
    answer: ["机器翻译", "就是", "利用电脑技术", "把", "一种语言", "转换成", "另一种语言"],
    pinyin: "Jīqì fānyì jiù shì lìyòng diànnǎo jìshù bǎ yì zhǒng yǔyán zhuǎnhuàn chéng lìng yì zhǒng yǔyán.",
    translation: "Machine translation uses computer technology to convert one language into another.",
    hint: "Pattern: 把 X 转换成 Y.",
  },
  {
    id: "l5-t4",
    type: "matching",
    prompt: "Match each translation platform to its origin",
    pairs: [
      { left: "🇺🇸", leftLabel: "Google Translate", right: "谷歌翻译" },
      { left: "🪟", leftLabel: "Microsoft Translator", right: "微软翻译" },
      { left: "🐻", leftLabel: "Baidu Translate", right: "百度翻译" },
      { left: "📚", leftLabel: "Youdao Translate", right: "有道翻译" },
      { left: "🔎", leftLabel: "Sogou Translate", right: "搜狗翻译" },
    ],
  },
  {
    id: "l5-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 翻译",
    word: "翻译",
    translation: "to translate; translation",
    syllables: [
      { base: "fan", correctTone: 1 },
      { base: "yi", correctTone: 4 },
    ],
  },
  {
    id: "l5-t6",
    type: "intuition",
    prompt: "Fix the word order — 'Since then, MT has evolved to translation that considers full sentence structure.'",
    brokenSentence: ["机器翻译", "自从那时以来", "考虑整个句子结构的翻译", "已发展到"],
    correctOrder: [1, 0, 3, 2],
    translation: "Since then, machine translation has evolved into translation that considers the full sentence structure.",
    hint: "Pattern: 自从 … 以来, Subject 已 V 到 …",
  },
  {
    id: "l5-t7",
    type: "simulation",
    prompt: "Teacher Li asks Karen about her presentation. Reply naturally.",
    npcMessage: "下节课你要做课堂报告，谈翻译平台。你有什么具体计划吗？",
    npcPinyin: "Xià jié kè nǐ yào zuò kètáng bàogào, tán fānyì píngtái. Nǐ yǒu shénme jùtǐ jìhuà ma?",
    npcTranslation: "Next class you'll give a presentation about translation platforms. Do you have a concrete plan?",
    options: [
      { hanzi: "我想选一篇英语文章，在谷歌翻译和百度翻译上都翻译一次，再比较两个译文。", pinyin: "Wǒ xiǎng xuǎn yì piān Yīngyǔ wénzhāng, zài Gǔgē Fānyì hé Bǎidù Fānyì shàng dōu fānyì yí cì, zài bǐjiào liǎng ge yìwén.", correct: true, reply: "这个计划很好，注意准确性和可读性。" },
      { hanzi: "我打算只用手机翻译应用，不用电脑。", pinyin: "Wǒ dǎsuàn zhǐ yòng shǒujī fānyì yìngyòng, bú yòng diànnǎo.", correct: false },
      { hanzi: "我还没安装翻译软件呢。", pinyin: "Wǒ hái méi ānzhuāng fānyì ruǎnjiàn ne.", correct: false },
    ],
  },
  {
    id: "l5-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences about machine translation, using each item below.",
    required: ["机器翻译", "基于", "值得注意的是"],
    minSentences: 3,
    retroWords: ["社交媒体", "应用", "平台", "对于…来说", "下载"],
  },
];

const lesson5Recap: Recap = {
  takeaways: [
    "机器翻译 = 利用电脑技术 把 X 转换成 Y. 三种类型: 基于规则 / 基于统计 / 神经机器翻译.",
    "Pattern: 自从 … 以来 — since; 基于 — based on; 谈到 — speaking of.",
    "值得注意的是 … — worth noting that … 以便 + clause — so that …",
    "中文翻译平台: 百度翻译 · 有道翻译 · 搜狗翻译. 国际: 谷歌 · 微软 · DeepL.",
  ],
  keyWords: ["机器翻译", "转换", "基于", "神经网络", "译文", "准确性", "可读性"],
};

// ───────────────────────────── Lesson 6 — 电子商务 ─────────────────────────

const lesson6Dialogues: Dialogue[] = [
  {
    id: "l6-text1",
    title: "课文一",
    titleEn: "Text 1 — A primer on e-commerce",
    audio: "/audio/lesson_6_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "电子商务，简称为电商，是通过互联网进行的商业活动。它是二十世纪九十年代初出现的。最初的电子商务主要是在企业之间进行的，这种交易被称为 B2B。",
        pinyin: "Diànzǐ shāngwù, jiǎnchēng wéi diànshāng, shì tōngguò hùliánwǎng jìnxíng de shāngyè huódòng. Tā shì èrshí shìjì jiǔshí niándài chū chūxiàn de. Zuìchū de diànzǐ shāngwù zhǔyào shì zài qǐyè zhī jiān jìnxíng de, zhè zhǒng jiāoyì bèi chēng wéi B2B.",
        translation: "E-commerce, abbreviated 电商, is commerce conducted via the internet. It first emerged in the early 1990s. The earliest e-commerce was mainly between enterprises — these transactions are called B2B.",
      },
      {
        hanzi: "随着互联网的发展，电子商务逐渐走进普通人的家庭，成为人们日常生活的一部分。人们可以通过手机或电脑在电商平台上购买各种商品，如衣服、鞋子、书籍等。",
        pinyin: "Suízhe hùliánwǎng de fāzhǎn, diànzǐ shāngwù zhújiàn zǒu jìn pǔtōng rén de jiātíng, chéngwéi rénmen rìcháng shēnghuó de yí bùfēn. Rénmen kěyǐ tōngguò shǒujī huò diànnǎo zài diànshāng píngtái shàng gòumǎi gè zhǒng shāngpǐn, rú yīfu, xiézi, shūjí děng.",
        translation: "As the internet developed, e-commerce gradually entered ordinary households and became part of daily life. People can buy all kinds of goods via phone or computer on e-commerce platforms — clothes, shoes, books, and so on.",
      },
      {
        hanzi: "此外，还可以通过电商平台预订机票、旅馆、点餐等。这些都给人们的生活带来了极大的便利。",
        pinyin: "Cǐwài, hái kěyǐ tōngguò diànshāng píngtái yùdìng jīpiào, lǚguǎn, diǎn cān děng. Zhèxiē dōu gěi rénmen de shēnghuó dài lái le jí dà de biànlì.",
        translation: "In addition, you can book flights, hotels and order food through e-commerce platforms. All of this brings enormous convenience to people's lives.",
      },
      {
        hanzi: "电子商务没有了时空限制，人们可以随时随地进行交易。同时，电商平台上的商品种类繁多，满足了消费者多样化的需求。",
        pinyin: "Diànzǐ shāngwù méi yǒu le shíkōng xiànzhì, rénmen kěyǐ suíshí suídì jìnxíng jiāoyì. Tóngshí, diànshāng píngtái shàng de shāngpǐn zhǒnglèi fánduō, mǎnzú le xiāofèizhě duōyànghuà de xūqiú.",
        translation: "E-commerce has no time or space limits — people can transact anytime, anywhere. At the same time, the variety of goods on platforms is enormous, meeting consumers' diverse needs.",
      },
      {
        hanzi: "此外，商家还能够很快地了解消费者的喜好，实现个性化服务。通过电商平台，中小企业和个人都能参与国际市场竞争，同时也促进了物流、电子支付等相关行业的发展。",
        pinyin: "Cǐwài, shāngjiā hái nénggòu hěn kuài de liǎojiě xiāofèizhě de xǐhào, shíxiàn gèxìnghuà fúwù. Tōngguò diànshāng píngtái, zhōngxiǎo qǐyè hé gèrén dōu néng cānyù guójì shìchǎng jìngzhēng, tóngshí yě cùjìn le wùliú, diànzǐ zhīfù děng xiāngguān hángyè de fāzhǎn.",
        translation: "Merchants can also quickly understand consumer preferences and offer personalized service. Through these platforms, SMEs and individuals can join international competition, while also boosting logistics, e-payments and related industries.",
      },
      {
        hanzi: "电子支付方式如支付宝、微信支付等，既方便又安全，使交易更加便利。电子商务是一场商业革命，改变了人们的生活方式和消费习惯。",
        pinyin: "Diànzǐ zhīfù fāngshì rú Zhīfùbǎo, Wēixìn Zhīfù děng, jì fāngbiàn yòu ānquán, shǐ jiāoyì gèngjiā biànlì. Diànzǐ shāngwù shì yì chǎng shāngyè gémìng, gǎibiàn le rénmen de shēnghuó fāngshì hé xiāofèi xíguàn.",
        translation: "E-payment methods like Alipay and WeChat Pay are both convenient and secure, making transactions even easier. E-commerce is a commercial revolution that has transformed how people live and consume.",
      },
    ],
  },
  {
    id: "l6-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen's online shopping habits",
    audio: "/audio/lesson_6_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "王钢", hanzi: "凯伦，你常常在网上买东西吧？", pinyin: "Kǎilún, nǐ chángcháng zài wǎngshàng mǎi dōngxi ba?", translation: "Karen, you shop online a lot, right?" },
      { speaker: "凯伦", hanzi: "是啊。", pinyin: "Shì a.", translation: "Yeah." },
      { speaker: "王钢", hanzi: "你都在哪些购物平台买东西呢？", pinyin: "Nǐ dōu zài nǎxiē gòuwù píngtái mǎi dōngxi ne?", translation: "Which shopping platforms do you use?" },
      { speaker: "凯伦", hanzi: "在美国的时候，我常常在亚马逊上买东西。", pinyin: "Zài Měiguó de shíhou, wǒ chángcháng zài Yàmǎxùn shàng mǎi dōngxi.", translation: "When I was in the US I often bought things on Amazon." },
      { speaker: "王钢", hanzi: "那你选择购物平台时会考虑什么？", pinyin: "Nà nǐ xuǎnzé gòuwù píngtái shí huì kǎolǜ shénme?", translation: "What do you consider when choosing a platform?" },
      { speaker: "凯伦", hanzi: "会考虑平台和商家的信誉和商品种类。", pinyin: "Huì kǎolǜ píngtái hé shāngjiā de xìnyù hé shāngpǐn zhǒnglèi.", translation: "I look at the platform's and merchant's reputation, and the variety of goods." },
      { speaker: "王钢", hanzi: "是的，选择可靠的购物平台很重要。在中国你在哪个平台购物？", pinyin: "Shì de, xuǎnzé kěkào de gòuwù píngtái hěn zhòngyào. Zài Zhōngguó nǐ zài nǎ gè píngtái gòuwù?", translation: "Right, picking a reliable platform matters. Which platform do you use in China?" },
      { speaker: "凯伦", hanzi: "淘宝、京东、或拼多多。因为这三个平台都很大，商品很多，客服也很专业。", pinyin: "Táobǎo, Jīngdōng, huò Pīnduōduō. Yīnwèi zhè sān gè píngtái dōu hěn dà, shāngpǐn hěn duō, kèfú yě hěn zhuānyè.", translation: "Taobao, JD, or Pinduoduo — all three are big, with lots of goods and professional customer service." },
      { speaker: "王钢", hanzi: "对，这几大平台都是最受中国人欢迎的购物平台。你怎么下单呢？", pinyin: "Duì, zhè jǐ dà píngtái dōu shì zuì shòu Zhōngguó rén huānyíng de gòuwù píngtái. Nǐ zěnme xià dān ne?", translation: "Yes, those are the most popular platforms in China. How do you place an order?" },
      { speaker: "凯伦", hanzi: "我先在平台上找想买的东西，然后比较不同卖家的商品和评价，选好后放入购物车，最后填写收货地址和支付方式。", pinyin: "Wǒ xiān zài píngtái shàng zhǎo xiǎng mǎi de dōngxi, ránhòu bǐjiào bù tóng màijiā de shāngpǐn hé píngjià, xuǎn hǎo hòu fàng rù gòuwùchē, zuìhòu tiánxiě shōuhuò dìzhǐ hé zhīfù fāngshì.", translation: "I first search the platform, compare goods and reviews from different sellers, add to cart, then fill in the delivery address and payment method." },
      { speaker: "王钢", hanzi: "你用什么电子支付方式呢？", pinyin: "Nǐ yòng shénme diànzǐ zhīfù fāngshì ne?", translation: "Which e-payment method do you use?" },
      { speaker: "凯伦", hanzi: "我通常用支付宝或微信支付，既方便又安全，支付宝和微信支付也支持国际支付。", pinyin: "Wǒ tōngcháng yòng Zhīfùbǎo huò Wēixìn Zhīfù, jì fāngbiàn yòu ānquán, Zhīfùbǎo hé Wēixìn Zhīfù yě zhīchí guójì zhīfù.", translation: "Usually Alipay or WeChat Pay — both convenient and secure, and they also support international payments." },
      { speaker: "王钢", hanzi: "太好了。谢谢你分享对网上购物平台的看法和经验！", pinyin: "Tài hǎo le. Xièxie nǐ fēnxiǎng duì wǎngshàng gòuwù píngtái de kànfǎ hé jīngyàn!", translation: "Great. Thanks for sharing your views and experience about online shopping platforms!" },
      { speaker: "凯伦", hanzi: "不客气。", pinyin: "Bú kèqi.", translation: "You're welcome." },
    ],
  },
];

const lesson6Vocab: VocabSet[] = [
  {
    id: "l6-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_6_text_1_vocab.mp3",
    items: [
      { hanzi: "电子商务", pinyin: "diànzǐ shāngwù", pos: "NP", meaning: "e-commerce" },
      { hanzi: "简称", pinyin: "jiǎnchēng", pos: "N/V", meaning: "abbreviation; to abbreviate" },
      { hanzi: "通过", pinyin: "tōngguò", pos: "Prep", meaning: "by means of; through; via" },
      { hanzi: "最初", pinyin: "zuìchū", pos: "A/Adv", meaning: "initial; initially; at first" },
      { hanzi: "商业", pinyin: "shāngyè", pos: "N", meaning: "business; trade; commerce" },
      { hanzi: "企业", pinyin: "qǐyè", pos: "N", meaning: "enterprise; corporation" },
      { hanzi: "交易", pinyin: "jiāoyì", pos: "N", meaning: "transaction; business deal" },
      { hanzi: "逐渐", pinyin: "zhújiàn", pos: "Adv", meaning: "gradually" },
      { hanzi: "商品", pinyin: "shāngpǐn", pos: "N", meaning: "commodity; goods" },
      { hanzi: "书籍", pinyin: "shūjí", pos: "N", meaning: "books" },
      { hanzi: "此外", pinyin: "cǐwài", pos: "Conj", meaning: "besides; in addition; moreover" },
      { hanzi: "预订", pinyin: "yùdìng", pos: "N/V", meaning: "reservation; to book" },
      { hanzi: "点餐", pinyin: "diǎn cān", pos: "VO", meaning: "to order food" },
      { hanzi: "极大的", pinyin: "jí dà de", pos: "AP", meaning: "enormous; maximum" },
      { hanzi: "便利", pinyin: "biànlì", pos: "A", meaning: "convenient; easy" },
      { hanzi: "时空", pinyin: "shíkōng", pos: "N", meaning: "time and space" },
      { hanzi: "随时随地", pinyin: "suíshí suídì", pos: "AdvP", meaning: "anytime and anywhere" },
      { hanzi: "种类繁多", pinyin: "zhǒnglèi fánduō", pos: "NP", meaning: "wide variety" },
      { hanzi: "消费者", pinyin: "xiāofèizhě", pos: "N", meaning: "consumer" },
      { hanzi: "多样化", pinyin: "duōyànghuà", pos: "A/N", meaning: "diverse; diversity" },
      { hanzi: "喜好", pinyin: "xǐhào", pos: "N/V", meaning: "preference; to prefer" },
      { hanzi: "实现", pinyin: "shíxiàn", pos: "V", meaning: "to achieve; to realize" },
      { hanzi: "个性化", pinyin: "gèxìnghuà", pos: "A/N", meaning: "personalized" },
      { hanzi: "参与", pinyin: "cānyù", pos: "V", meaning: "to take part in" },
      { hanzi: "市场竞争", pinyin: "shìchǎng jìngzhēng", pos: "NP", meaning: "market competition" },
      { hanzi: "促进", pinyin: "cùjìn", pos: "V", meaning: "to promote; to boost" },
      { hanzi: "物流", pinyin: "wùliú", pos: "N", meaning: "logistics" },
      { hanzi: "相关", pinyin: "xiāngguān", pos: "A", meaning: "related; relevant" },
      { hanzi: "行业", pinyin: "hángyè", pos: "N", meaning: "industry; sector" },
      { hanzi: "革命", pinyin: "gémìng", pos: "N", meaning: "revolution" },
      { hanzi: "消费", pinyin: "xiāofèi", pos: "V", meaning: "to consume; to spend" },
      { hanzi: "继续", pinyin: "jìxù", pos: "V", meaning: "to continue" },
      { hanzi: "支付宝", pinyin: "Zhīfùbǎo", pos: "PN", meaning: "Alipay" },
      { hanzi: "微信支付", pinyin: "Wēixìn Zhīfù", pos: "PN", meaning: "WeChat Pay" },
    ],
  },
  {
    id: "l6-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_6_text_2_vocab.mp3",
    items: [
      { hanzi: "信誉", pinyin: "xìnyù", pos: "N", meaning: "prestige; reputation" },
      { hanzi: "种类", pinyin: "zhǒnglèi", pos: "N", meaning: "type; kind; category" },
      { hanzi: "客服", pinyin: "kèfú", pos: "N", meaning: "customer service" },
      { hanzi: "专业", pinyin: "zhuānyè", pos: "A/N", meaning: "professional; specialty" },
      { hanzi: "下单", pinyin: "xià dān", pos: "VO", meaning: "to place an order" },
      { hanzi: "评价", pinyin: "píngjià", pos: "N/V", meaning: "evaluation; to evaluate" },
      { hanzi: "填写", pinyin: "tiánxiě", pos: "V", meaning: "to fill in" },
      { hanzi: "收货", pinyin: "shōu huò", pos: "VO", meaning: "to receive (goods)" },
      { hanzi: "国际", pinyin: "guójì", pos: "A", meaning: "international" },
      { hanzi: "亚马逊", pinyin: "Yàmǎxùn", pos: "PN", meaning: "Amazon" },
      { hanzi: "淘宝", pinyin: "Táobǎo", pos: "PN", meaning: "Taobao" },
      { hanzi: "京东", pinyin: "Jīngdōng", pos: "PN", meaning: "JD.com" },
      { hanzi: "拼多多", pinyin: "Pīnduōduō", pos: "PN", meaning: "Pinduoduo" },
    ],
  },
];

const lesson6Tasks: Task[] = [
  {
    id: "l6-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "diàn zǐ shāng wù",
    answer: "电子商务",
    translation: "e-commerce",
    audio: "/audio/lesson_6_text_1_vocab.mp3",
    hint: "diàn zǐ shāng wù — the central topic of this lesson.",
  },
  {
    id: "l6-t2",
    type: "battle",
    prompt: "Pick the correct phrase for the gap",
    sentenceBefore: "电子商务，",
    sentenceAfter: "电商，是通过互联网进行的商业活动。",
    options: [
      { hanzi: "简称为", pinyin: "jiǎnchēng wéi", meaning: "abbreviated as" },
      { hanzi: "称呼为", pinyin: "chēnghu wéi", meaning: "to address as" },
      { hanzi: "翻译成", pinyin: "fānyì chéng", meaning: "translated into" },
    ],
    correctIndex: 0,
    translation: "E-commerce, abbreviated 电商, is commerce conducted via the internet.",
    hint: "Pattern: X，简称为 Y — X, abbreviated as Y.",
  },
  {
    id: "l6-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'You can buy all kinds of goods on e-commerce platforms via phone or computer.'",
    blocks: ["人们", "可以", "通过手机或电脑", "在电商平台上", "购买", "各种商品"],
    answer: ["人们", "可以", "通过手机或电脑", "在电商平台上", "购买", "各种商品"],
    pinyin: "Rénmen kěyǐ tōngguò shǒujī huò diànnǎo zài diànshāng píngtái shàng gòumǎi gè zhǒng shāngpǐn.",
    translation: "People can buy all kinds of goods on e-commerce platforms via phone or computer.",
    hint: "Pattern: 通过 + tool + 在 + place + V + object.",
  },
  {
    id: "l6-t4",
    type: "matching",
    prompt: "Match each Chinese platform/payment to its English name",
    pairs: [
      { left: "🛒", leftLabel: "Taobao", right: "淘宝" },
      { left: "📦", leftLabel: "JD.com", right: "京东" },
      { left: "👥", leftLabel: "Pinduoduo", right: "拼多多" },
      { left: "📦", leftLabel: "Amazon", right: "亚马逊" },
      { left: "💳", leftLabel: "Alipay", right: "支付宝" },
      { left: "💬", leftLabel: "WeChat Pay", right: "微信支付" },
    ],
  },
  {
    id: "l6-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 商务",
    word: "商务",
    translation: "business; commerce",
    syllables: [
      { base: "shang", correctTone: 1 },
      { base: "wu", correctTone: 4 },
    ],
  },
  {
    id: "l6-t6",
    type: "intuition",
    prompt: "Fix the word order — 'Alipay and WeChat Pay are both convenient and secure.'",
    brokenSentence: ["既方便", "支付宝和微信支付", "又安全"],
    correctOrder: [1, 0, 2],
    translation: "Alipay and WeChat Pay are both convenient and secure.",
    hint: "Pattern: Subject 既 A 又 B — both A and B.",
  },
  {
    id: "l6-t7",
    type: "simulation",
    prompt: "Wang Gang asks Karen about her shopping habits. Reply naturally.",
    npcMessage: "你选择购物平台时会考虑什么？",
    npcPinyin: "Nǐ xuǎnzé gòuwù píngtái shí huì kǎolǜ shénme?",
    npcTranslation: "What do you consider when choosing a shopping platform?",
    options: [
      { hanzi: "我会考虑平台和商家的信誉，还有商品种类和客服。", pinyin: "Wǒ huì kǎolǜ píngtái hé shāngjiā de xìnyù, hái yǒu shāngpǐn zhǒnglèi hé kèfú.", correct: true, reply: "对，选择可靠的购物平台很重要。" },
      { hanzi: "我从来不在网上买东西。", pinyin: "Wǒ cónglái bú zài wǎngshàng mǎi dōngxi.", correct: false },
      { hanzi: "我只看商品的颜色。", pinyin: "Wǒ zhǐ kàn shāngpǐn de yánsè.", correct: false },
    ],
  },
  {
    id: "l6-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences about online shopping, using each item below.",
    required: ["电商平台", "随时随地", "既…又"],
    minSentences: 3,
    retroWords: ["下单", "支付宝", "信誉", "评价", "收货地址"],
  },
];

const lesson6Recap: Recap = {
  takeaways: [
    "电子商务 (电商) — commerce via internet. B2B = enterprise-to-enterprise.",
    "Pattern: X，简称为 Y — X, abbreviated as Y. 被称为 — to be called.",
    "通过 + tool / method — by means of, through. 此外 — in addition.",
    "随时随地 — anytime, anywhere. 既 A 又 B — both A and B.",
    "China platforms: 淘宝 · 京东 · 拼多多. Payments: 支付宝 · 微信支付.",
  ],
  keyWords: ["电子商务", "电商", "下单", "信誉", "支付宝", "微信支付", "随时随地"],
};

// ───────────────────────────────────────────────────────────────────────────
// Lesson 7 — 网络文学 / Internet Literature
// ───────────────────────────────────────────────────────────────────────────

const lesson7Dialogues: Dialogue[] = [
  {
    id: "l7-text1",
    title: "课文一",
    titleEn: "Text 1 — A primer on Chinese internet literature",
    audio: "/audio/lesson_7_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "中国的网络文学始于二十世纪九十年代，是一种新的文学形式。它以互联网为创作和传播平台，利用数字化及多媒体技术来展示文学作品。",
        pinyin: "Zhōngguó de wǎngluò wénxué shǐyú èrshí shìjì jiǔshí niándài, shì yì zhǒng xīn de wénxué xíngshì. Tā yǐ hùliánwǎng wéi chuàngzuò hé chuánbō píngtái, lìyòng shùzìhuà jí duōméitǐ jìshù lái zhǎnshì wénxué zuòpǐn.",
        translation: "China's internet literature began in the 1990s — a new literary form. It takes the internet as its platform for creation and dissemination, using digital and multimedia technology to showcase literary works.",
      },
      {
        hanzi: "中国网络文学的特点是题材广泛，形式多样，更新快速，互动性强。在内容上，网络文学作品有多种类型，如科幻、玄幻、武侠、都市、言情、历史等。",
        pinyin: "Zhōngguó wǎngluò wénxué de tèdiǎn shì tícái guǎngfàn, xíngshì duōyàng, gēngxīn kuàisù, hùdòngxìng qiáng. Zài nèiróng shàng, wǎngluò wénxué zuòpǐn yǒu duō zhǒng lèixíng, rú kēhuàn, xuánhuàn, wǔxiá, dūshì, yánqíng, lìshǐ děng.",
        translation: "Its features: wide subject matter, varied forms, fast updates, strong interactivity. In terms of content, works span many genres — sci-fi, fantasy, martial arts, urban, romance, history, and so on.",
      },
      {
        hanzi: "在形式上，作者主要采用连载的方式来发布自己的作品，而读者可以通过评论、点赞与作者进行互动，并以这样的方式影响作品的创作。",
        pinyin: "Zài xíngshì shàng, zuòzhě zhǔyào cǎiyòng liánzǎi de fāngshì lái fābù zìjǐ de zuòpǐn, ér dúzhě kěyǐ tōngguò pínglùn, diǎnzàn yǔ zuòzhě jìnxíng hùdòng, bìng yǐ zhèyàng de fāngshì yǐngxiǎng zuòpǐn de chuàngzuò.",
        translation: "Format-wise, authors mainly serialize their works, while readers interact with them via comments and likes — in this way influencing the creation itself.",
      },
      {
        hanzi: "中国有很多网络文学平台，其中知名的有起点中文网、纵横中文网、创世中文网、晋江文学城、以及潇湘书院等。这些网站各有特色，提供了大量的文学作品，满足了不同读者的阅读需求，同时也为网络文学作家提供了展示才华的舞台。",
        pinyin: "Zhōngguó yǒu hěn duō wǎngluò wénxué píngtái, qízhōng zhīmíng de yǒu Qǐdiǎn Zhōngwén Wǎng, Zònghéng Zhōngwén Wǎng, Chuàngshì Zhōngwén Wǎng, Jìnjiāng Wénxué Chéng, yǐjí Xiāoxiāng Shūyuàn děng. Zhèxiē wǎngzhàn gè yǒu tèsè, tígōng le dàliàng de wénxué zuòpǐn, mǎnzú le bùtóng dúzhě de yuèdú xūqiú, tóngshí yě wèi wǎngluò wénxué zuòjiā tígōng le zhǎnshì cáihuá de wǔtái.",
        translation: "China has many online literature platforms — well-known ones include Qidian, Zongheng, Chuangshi, Jinjiang Literature City, and Xiaoxiang Academy. Each has its own character, offering many works that meet diverse reading needs while giving authors a stage to showcase their talent.",
      },
      {
        hanzi: "在中国，网络文学已成为大众文化的重要组成部分，拥有庞大的读者群体和产业链。许多优秀的网络文学作品被改编成电影、电视剧以及动漫，进一步扩大了其影响力。总之，网络文学正在推动中国文学的创新和发展，为中国文学注入了新的活力。",
        pinyin: "Zài Zhōngguó, wǎngluò wénxué yǐ chéngwéi dàzhòng wénhuà de zhòngyào zǔchéng bùfèn, yōngyǒu pángdà de dúzhě qúntǐ hé chǎnyè liàn. Xǔduō yōuxiù de wǎngluò wénxué zuòpǐn bèi gǎibiān chéng diànyǐng, diànshìjù yǐjí dòngmàn, jìnyíbù kuòdà le qí yǐngxiǎnglì. Zǒngzhī, wǎngluò wénxué zhèngzài tuīdòng Zhōngguó wénxué de chuàngxīn hé fāzhǎn, wèi Zhōngguó wénxué zhùrù le xīn de huólì.",
        translation: "In China, internet literature has become a major part of mass culture, with a huge readership and industry chain. Many top works are adapted into films, TV dramas, and anime, further expanding their influence. In short, internet literature is driving innovation and growth in Chinese literature, injecting new vitality into it.",
      },
    ],
  },
  {
    id: "l7-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen asks for novel recommendations",
    audio: "/audio/lesson_7_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "凯伦", hanzi: "王钢，你能给我推荐一些文学作品吗？我想通过读书来提高我的中文阅读水平。", pinyin: "Wáng Gāng, nǐ néng gěi wǒ tuījiàn yìxiē wénxué zuòpǐn ma? Wǒ xiǎng tōngguò dúshū lái tígāo wǒ de Zhōngwén yuèdú shuǐpíng.", translation: "Wang Gang, can you recommend some literary works? I want to improve my Chinese reading through reading." },
      { speaker: "王钢", hanzi: "当然可以，凯伦。但我建议你看网络小说。", pinyin: "Dāngrán kěyǐ, Kǎilún. Dàn wǒ jiànyì nǐ kàn wǎngluò xiǎoshuō.", translation: "Of course, Karen. But I'd suggest reading web novels." },
      { speaker: "凯伦", hanzi: "网络小说？为什么呢？", pinyin: "Wǎngluò xiǎoshuō? Wèishénme ne?", translation: "Web novels? Why?" },
      { speaker: "王钢", hanzi: "网络小说比较通俗易懂，语言也接近口语，对学中文很有帮助。", pinyin: "Wǎngluò xiǎoshuō bǐjiào tōngsú yìdǒng, yǔyán yě jiējìn kǒuyǔ, duì xué Zhōngwén hěn yǒu bāngzhù.", translation: "Web novels are accessible, the language is close to spoken Chinese — very helpful for learning." },
      { speaker: "凯伦", hanzi: "哦，这样啊，那我应该去哪里找这些网络小说呢？", pinyin: "Ò, zhèyàng a, nà wǒ yīnggāi qù nǎlǐ zhǎo zhèxiē wǎngluò xiǎoshuō ne?", translation: "Oh, I see. So where should I find these web novels?" },
      { speaker: "王钢", hanzi: "网上有很多文学网站。如果你对科幻和历史小说感兴趣，可以去起点中文网，它是中国最大的网络文学平台。", pinyin: "Wǎng shàng yǒu hěn duō wénxué wǎngzhàn. Rúguǒ nǐ duì kēhuàn hé lìshǐ xiǎoshuō gǎn xìngqù, kěyǐ qù Qǐdiǎn Zhōngwén Wǎng, tā shì Zhōngguó zuì dà de wǎngluò wénxué píngtái.", translation: "There are many literature sites online. If you're into sci-fi and historical novels, try Qidian — China's largest online literature platform." },
      { speaker: "凯伦", hanzi: "但我更喜欢看都市言情小说，尤其是女作家写的。", pinyin: "Dàn wǒ gèng xǐhuān kàn dūshì yánqíng xiǎoshuō, yóuqí shì nǚ zuòjiā xiě de.", translation: "But I prefer urban romance novels, especially by female authors." },
      { speaker: "王钢", hanzi: "那你可以去晋江文学城或者潇湘书院，那里有很多女作家写的都市言情小说。", pinyin: "Nà nǐ kěyǐ qù Jìnjiāng Wénxué Chéng huòzhě Xiāoxiāng Shūyuàn, nàlǐ yǒu hěn duō nǚ zuòjiā xiě de dūshì yánqíng xiǎoshuō.", translation: "Then try Jinjiang Literature City or Xiaoxiang Academy — lots of urban romance by female authors there." },
      { speaker: "凯伦", hanzi: "太好了。网上有没有什么阅读工具可以帮助我更好地阅读网络小说呢？", pinyin: "Tài hǎo le. Wǎng shàng yǒu méi yǒu shénme yuèdú gōngjù kěyǐ bāngzhù wǒ gèng hǎo de yuèdú wǎngluò xiǎoshuō ne?", translation: "Great. Are there any online reading tools to help me read web novels better?" },
      { speaker: "王钢", hanzi: "当然有，你可以试试有道词典、金山词霸，还有百度翻译。这些工具都能帮你快速查找生词，理解句子的意思。", pinyin: "Dāngrán yǒu, nǐ kěyǐ shìshi Yǒudào Cídiǎn, Jīnshān Cíbà, hái yǒu Bǎidù Fānyì. Zhèxiē gōngjù dōu néng bāng nǐ kuàisù cházhǎo shēngcí, lǐjiě jùzi de yìsi.", translation: "Sure — try Youdao Dictionary, Kingsoft PowerWord, or Baidu Translate. They help you quickly look up new words and understand sentences." },
    ],
  },
];

const lesson7Vocab: VocabSet[] = [
  {
    id: "l7-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_7_text_1_vocab.mp3",
    items: [
      { hanzi: "网络文学", pinyin: "wǎngluò wénxué", pos: "NP", meaning: "internet literature; online literature" },
      { hanzi: "创作", pinyin: "chuàngzuò", pos: "V", meaning: "to create (literary works)" },
      { hanzi: "传播", pinyin: "chuánbō", pos: "V", meaning: "to disseminate; to spread" },
      { hanzi: "展示", pinyin: "zhǎnshì", pos: "V", meaning: "to display; to show" },
      { hanzi: "作品", pinyin: "zuòpǐn", pos: "N", meaning: "(literary/artistic) work" },
      { hanzi: "题材", pinyin: "tícái", pos: "N", meaning: "subject matter" },
      { hanzi: "更新", pinyin: "gēngxīn", pos: "V", meaning: "to renew; to update" },
      { hanzi: "科幻", pinyin: "kēhuàn", pos: "N", meaning: "science fiction" },
      { hanzi: "玄幻", pinyin: "xuánhuàn", pos: "N", meaning: "fantasy" },
      { hanzi: "武侠", pinyin: "wǔxiá", pos: "A/N", meaning: "martial arts (genre)" },
      { hanzi: "都市", pinyin: "dūshì", pos: "A/N", meaning: "urban; city" },
      { hanzi: "言情", pinyin: "yánqíng", pos: "N", meaning: "romance" },
      { hanzi: "连载", pinyin: "liánzǎi", pos: "V", meaning: "to serialize" },
      { hanzi: "影响", pinyin: "yǐngxiǎng", pos: "N/V", meaning: "influence; to influence" },
      { hanzi: "作者", pinyin: "zuòzhě", pos: "N", meaning: "author" },
      { hanzi: "读者", pinyin: "dúzhě", pos: "N", meaning: "reader" },
      { hanzi: "评论", pinyin: "pínglùn", pos: "N/V", meaning: "comment; to comment" },
      { hanzi: "点赞", pinyin: "diǎnzàn", pos: "V", meaning: "to like; to upvote" },
      { hanzi: "特色", pinyin: "tèsè", pos: "N", meaning: "characteristic; distinctive feature" },
      { hanzi: "网站", pinyin: "wǎngzhàn", pos: "N", meaning: "website" },
      { hanzi: "阅读", pinyin: "yuèdú", pos: "N/V", meaning: "reading; to read" },
      { hanzi: "才华", pinyin: "cáihuá", pos: "N", meaning: "talent" },
      { hanzi: "舞台", pinyin: "wǔtái", pos: "N", meaning: "stage" },
      { hanzi: "大众", pinyin: "dàzhòng", pos: "A/N", meaning: "popular; the masses" },
      { hanzi: "组成", pinyin: "zǔchéng", pos: "V", meaning: "to form; to constitute" },
      { hanzi: "部分", pinyin: "bùfen", pos: "N", meaning: "part" },
      { hanzi: "庞大", pinyin: "pángdà", pos: "A", meaning: "huge; enormous" },
      { hanzi: "群体", pinyin: "qúntǐ", pos: "N", meaning: "community; group" },
      { hanzi: "产业链", pinyin: "chǎnyè liàn", pos: "NP", meaning: "industry chain" },
      { hanzi: "改编", pinyin: "gǎibiān", pos: "N/V", meaning: "adaptation; to adapt" },
      { hanzi: "电视剧", pinyin: "diànshìjù", pos: "N", meaning: "TV drama" },
      { hanzi: "动漫", pinyin: "dòngmàn", pos: "N", meaning: "anime; animation and comics" },
      { hanzi: "进一步", pinyin: "jìnyíbù", pos: "Adv", meaning: "further" },
      { hanzi: "扩大", pinyin: "kuòdà", pos: "V", meaning: "to enlarge; to expand" },
      { hanzi: "总之", pinyin: "zǒngzhī", pos: "Adv", meaning: "in short; in summary" },
      { hanzi: "推动", pinyin: "tuīdòng", pos: "V", meaning: "to push forward; to promote" },
      { hanzi: "创新", pinyin: "chuàngxīn", pos: "N/V", meaning: "innovation; to innovate" },
      { hanzi: "注入", pinyin: "zhùrù", pos: "V", meaning: "to pour into; to inject" },
      { hanzi: "起点中文网", pinyin: "Qǐdiǎn Zhōngwén Wǎng", pos: "PN", meaning: "Qidian Chinese Net" },
      { hanzi: "晋江文学城", pinyin: "Jìnjiāng Wénxué Chéng", pos: "PN", meaning: "Jinjiang Literature City" },
      { hanzi: "潇湘书院", pinyin: "Xiāoxiāng Shūyuàn", pos: "PN", meaning: "Xiaoxiang Academy" },
    ],
  },
  {
    id: "l7-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_7_text_2_vocab.mp3",
    items: [
      { hanzi: "推荐", pinyin: "tuījiàn", pos: "V", meaning: "to recommend" },
      { hanzi: "小说", pinyin: "xiǎoshuō", pos: "N", meaning: "novel" },
      { hanzi: "通俗易懂", pinyin: "tōngsú yìdǒng", pos: "AP", meaning: "common and easy to understand" },
      { hanzi: "接近", pinyin: "jiējìn", pos: "V", meaning: "to approach; to get close to" },
      { hanzi: "查找", pinyin: "cházhǎo", pos: "V", meaning: "to search; to look up" },
      { hanzi: "理解", pinyin: "lǐjiě", pos: "N/V", meaning: "understanding; to understand" },
      { hanzi: "有道词典", pinyin: "Yǒudào Cídiǎn", pos: "PN", meaning: "Youdao Dictionary" },
      { hanzi: "金山词霸", pinyin: "Jīnshān Cíbà", pos: "PN", meaning: "Kingsoft PowerWord" },
      { hanzi: "百度翻译", pinyin: "Bǎidù Fānyì", pos: "PN", meaning: "Baidu Translate" },
    ],
  },
];

const lesson7Tasks: Task[] = [
  {
    id: "l7-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "wǎng luò wén xué",
    answer: "网络文学",
    translation: "internet literature",
    audio: "/audio/lesson_7_text_1_vocab.mp3",
    hint: "wǎng luò wén xué — the central topic of this lesson.",
  },
  {
    id: "l7-t2",
    type: "battle",
    prompt: "Pick the correct phrase for the gap",
    sentenceBefore: "它",
    sentenceAfter: "互联网为创作和传播平台。",
    options: [
      { hanzi: "以", pinyin: "yǐ", meaning: "with; using; to take" },
      { hanzi: "把", pinyin: "bǎ", meaning: "(disposal marker)" },
      { hanzi: "对", pinyin: "duì", meaning: "toward; to" },
    ],
    correctIndex: 0,
    translation: "It takes the internet as its platform for creation and dissemination.",
    hint: "Pattern: 以 X 为 Y — to take X as Y.",
  },
  {
    id: "l7-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'Readers can interact with the author through comments and likes.'",
    blocks: ["读者", "可以", "通过评论、点赞", "与作者", "进行", "互动"],
    answer: ["读者", "可以", "通过评论、点赞", "与作者", "进行", "互动"],
    pinyin: "Dúzhě kěyǐ tōngguò pínglùn, diǎnzàn yǔ zuòzhě jìnxíng hùdòng.",
    translation: "Readers can interact with the author through comments and likes.",
    hint: "Pattern: 通过 + means + 与 X + 进行 + disyllabic verb.",
  },
  {
    id: "l7-t4",
    type: "matching",
    prompt: "Match each platform/tool to its short description",
    pairs: [
      { left: "📚", leftLabel: "Qidian", right: "起点中文网" },
      { left: "🏛", leftLabel: "Jinjiang Lit. City", right: "晋江文学城" },
      { left: "🎓", leftLabel: "Xiaoxiang Academy", right: "潇湘书院" },
      { left: "📖", leftLabel: "Youdao Dict.", right: "有道词典" },
      { left: "⚔️", leftLabel: "Kingsoft PowerWord", right: "金山词霸" },
      { left: "🌐", leftLabel: "Baidu Translate", right: "百度翻译" },
    ],
  },
  {
    id: "l7-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 网络",
    word: "网络",
    translation: "network; internet",
    syllables: [
      { base: "wang", correctTone: 3 },
      { base: "luo", correctTone: 4 },
    ],
  },
  {
    id: "l7-t6",
    type: "intuition",
    prompt: "Fix the word order — 'I want to improve my Chinese reading through reading books.'",
    brokenSentence: ["提高我的中文阅读水平", "我想", "通过读书来"],
    correctOrder: [1, 2, 0],
    translation: "I want to improve my Chinese reading through reading books.",
    hint: "Pattern: Subject + 通过 + means + 来 + Verb-Phrase (purpose).",
  },
  {
    id: "l7-t7",
    type: "simulation",
    prompt: "Karen asks Wang Gang for novel recommendations. Reply naturally.",
    npcMessage: "我更喜欢看都市言情小说，尤其是女作家写的。",
    npcPinyin: "Wǒ gèng xǐhuān kàn dūshì yánqíng xiǎoshuō, yóuqí shì nǚ zuòjiā xiě de.",
    npcTranslation: "I prefer urban romance novels, especially by female authors.",
    options: [
      { hanzi: "那你可以去晋江文学城或者潇湘书院。", pinyin: "Nà nǐ kěyǐ qù Jìnjiāng Wénxué Chéng huòzhě Xiāoxiāng Shūyuàn.", correct: true, reply: "好的，谢谢你的推荐！" },
      { hanzi: "你应该去起点中文网看科幻小说。", pinyin: "Nǐ yīnggāi qù Qǐdiǎn Zhōngwén Wǎng kàn kēhuàn xiǎoshuō.", correct: false },
      { hanzi: "我不喜欢小说。", pinyin: "Wǒ bù xǐhuān xiǎoshuō.", correct: false },
    ],
  },
  {
    id: "l7-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences about online novels, using each item below.",
    required: ["网络小说", "通过…来", "以…为"],
    minSentences: 3,
    retroWords: ["连载", "点赞", "评论", "改编", "通俗易懂"],
  },
];

const lesson7Recap: Recap = {
  takeaways: [
    "网络文学 — internet literature: serialized works (连载), comments and likes shape creation.",
    "Pattern: 以 X 为 Y — to take X as Y. 通过 + means + 来 + V — for the purpose of.",
    "…性 turns adj/verb into a noun (互动性, 可行性). …化 forms verbs/adjs (数字化, 现代化).",
    "在…上 — in terms of / with regard to. 进行 + disyllabic V (进行互动, 进行讨论).",
    "Platforms: 起点中文网 · 晋江文学城 · 潇湘书院. Tools: 有道词典 · 金山词霸 · 百度翻译.",
  ],
  keyWords: ["网络文学", "连载", "点赞", "改编", "起点中文网", "晋江文学城", "通俗易懂"],
};

// ───────────────────────────────────────────────────────────────────────────
// Lesson 8 — 人工智能聊天机器人 / AI Chatbot
// ───────────────────────────────────────────────────────────────────────────

const lesson8Dialogues: Dialogue[] = [
  {
    id: "l8-text1",
    title: "课文一",
    titleEn: "Text 1 — AI chatbots in our daily lives",
    audio: "/audio/lesson_8_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "在日常生活中，我们总是希望身边有一个随时随地可以回答我们的问题，并且能帮助我们解决问题的伙伴。而现代科技的杰作之一——人工智能聊天机器人，正是这种愿景在数字化时代的产物。",
        pinyin: "Zài rìcháng shēnghuó zhōng, wǒmen zǒngshì xīwàng shēnbiān yǒu yí gè suíshí suídì kěyǐ huídá wǒmen de wèntí, bìngqiě néng bāngzhù wǒmen jiějué wèntí de huǒbàn. Ér xiàndài kējì de jiézuò zhīyī — réngōng zhìnéng liáotiān jīqì rén, zhèngshì zhè zhǒng yuànjǐng zài shùzìhuà shídài de chǎnwù.",
        translation: "In daily life, we always wish for a companion at our side who can answer our questions anytime, anywhere, and help us solve them. AI chatbots — one of modern tech's masterpieces — are precisely the product of this vision in the digital era.",
      },
      {
        hanzi: "近年来，人工智能技术快速发展，聊天机器人也逐渐走进我们的生活。现在网络上的聊天机器人平台可不少。大家熟悉的有OpenAI的ChatGPT，百度的文心一言，谷歌的Gemini，以及微软的Copilot等。",
        pinyin: "Jìnnián lái, réngōng zhìnéng jìshù kuàisù fāzhǎn, liáotiān jīqì rén yě zhújiàn zǒu jìn wǒmen de shēnghuó. Xiànzài wǎngluò shàng de liáotiān jīqì rén píngtái kě bù shǎo. Dàjiā shúxī de yǒu OpenAI de ChatGPT, Bǎidù de Wénxīn Yìyán, Gǔgē de Gemini, yǐjí Wēiruǎn de Copilot děng.",
        translation: "In recent years, AI tech has developed rapidly, and chatbots are gradually entering our lives. There are quite a few chatbot platforms online — well-known ones include OpenAI's ChatGPT, Baidu's Wenxin Yiyan (Ernie Bot), Google's Gemini, and Microsoft's Copilot.",
      },
      {
        hanzi: "这些基于大型语言模型打造出来的聊天机器人，不仅拥有优秀的语言理解能力和强大的文本生成功能，还支持多种语言的交流。另外，它们各自也因其独特的互动方式和丰富的表达方式，而受到不同用户的喜爱。",
        pinyin: "Zhèxiē jīyú dàxíng yǔyán móxíng dǎzào chūlái de liáotiān jīqì rén, bùjǐn yōngyǒu yōuxiù de yǔyán lǐjiě nénglì hé qiángdà de wénběn shēngchéng gōngnéng, hái zhīchí duō zhǒng yǔyán de jiāoliú. Lìngwài, tāmen gèzì yě yīn qí dútè de hùdòng fāngshì hé fēngfù de biǎodá fāngshì, ér shòu dào bù tóng yònghù de xǐ'ài.",
        translation: "These chatbots — built on large language models — have excellent language understanding and powerful text generation, and support multilingual conversation. They are also each loved by different users because of their unique interaction styles and rich forms of expression.",
      },
      {
        hanzi: "聊天机器人的用途广泛。它可以提供各种信息查询服务，如天气预报和查找学术资料。它也可以完成如订票、订餐这种简单任务。它还可以提供休闲娱乐服务，如玩游戏、讲故事。",
        pinyin: "Liáotiān jīqì rén de yòngtú guǎngfàn. Tā kěyǐ tígōng gè zhǒng xìnxī cháxún fúwù, rú tiānqì yùbào hé cházhǎo xuéshù zīliào. Tā yě kěyǐ wánchéng rú dìng piào, dìng cān zhè zhǒng jiǎndān rènwù. Tā hái kěyǐ tígōng xiūxián yúlè fúwù, rú wán yóuxì, jiǎng gùshi.",
        translation: "Chatbots have wide uses: information lookup (weather, academic materials), simple tasks (booking tickets, ordering food), and leisure services (playing games, telling stories).",
      },
      {
        hanzi: "而且，它还能提供情感交流服务，如耐心倾听用户的心声，提供心理健康信息和建议。可以预见，聊天机器人将会越来越智能化、人性化，成为我们生活中的好帮手。",
        pinyin: "Érqiě, tā hái néng tígōng qínggǎn jiāoliú fúwù, rú nàixīn qīngtīng yònghù de xīnshēng, tígōng xīnlǐ jiànkāng xìnxī hé jiànyì. Kěyǐ yùjiàn, liáotiān jīqì rén jiāng huì yuè lái yuè zhìnénghuà, rénxìnghuà, chéngwéi wǒmen shēnghuó zhōng de hǎo bāngshǒu.",
        translation: "They can also provide emotional support — patiently listening to users' inner voices and offering mental health info and suggestions. We can foresee chatbots becoming ever more intelligent and humanized — great helpers in our lives.",
      },
    ],
  },
  {
    id: "l8-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen teaches David how to use ChatGPT",
    audio: "/audio/lesson_8_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "大卫", hanzi: "凯伦，听说你是使用ChatGPT的行家，能教我一下怎么用吗？", pinyin: "Kǎilún, tīngshuō nǐ shì shǐyòng ChatGPT de hángjiā, néng jiāo wǒ yíxià zěnme yòng ma?", translation: "Karen, I hear you're an expert at using ChatGPT — can you teach me how?" },
      { speaker: "凯伦", hanzi: "当然可以。首先，你得去ChatGPT的网站注册一个账户，可以选择免费或付费账户。付费账户会有更多功能。", pinyin: "Dāngrán kěyǐ. Shǒuxiān, nǐ děi qù ChatGPT de wǎngzhàn zhùcè yí gè zhànghù, kěyǐ xuǎnzé miǎnfèi huò fùfèi zhànghù. Fùfèi zhànghù huì yǒu gèng duō gōngnéng.", translation: "Of course. First, register an account on the ChatGPT site — free or paid. Paid accounts have more features." },
      { speaker: "大卫", hanzi: "然后呢？", pinyin: "Ránhòu ne?", translation: "And then?" },
      { speaker: "凯伦", hanzi: "接下来，你就可以在ChatGPT的对话框里输入提示语，说出你的问题和需求。它会按照你的提示语生成你需要的文本或图片。", pinyin: "Jiē xià lái, nǐ jiù kěyǐ zài ChatGPT de duìhuà kuàng lǐ shūrù tíshì yǔ, shuō chū nǐ de wèntí hé xūqiú. Tā huì ànzhào nǐ de tíshì yǔ shēngchéng nǐ xūyào de wénběn huò túpiàn.", translation: "Next, type prompts into the ChatGPT dialog box, stating your question or need. It will generate the text or images you need according to your prompt." },
      { speaker: "大卫", hanzi: "怎么写提示语呢？", pinyin: "Zěnme xiě tíshì yǔ ne?", translation: "How do I write a prompt?" },
      { speaker: "凯伦", hanzi: "用简单而又准确的语言提出你的问题。比如，\"请用通俗易懂的语言解释一下机器翻译的工作原理\"。", pinyin: "Yòng jiǎndān ér yòu zhǔnquè de yǔyán tíchū nǐ de wèntí. Bǐrú, \"qǐng yòng tōngsú yìdǒng de yǔyán jiěshì yíxià jīqì fānyì de gōngzuò yuánlǐ\".", translation: "Use simple but precise language to ask your question. For example: \"Please explain how machine translation works in plain language.\"" },
      { speaker: "大卫", hanzi: "哦，我明白了。那怎么制作图片呢？", pinyin: "Ò, wǒ míngbai le. Nà zěnme zhìzuò túpiàn ne?", translation: "Oh, I see. How about making images?" },
      { speaker: "凯伦", hanzi: "那你就在提示语里描述你想要什么样的画儿以及风格。比如，\"请画一幅冬天里的万里长城的水彩画\"。", pinyin: "Nà nǐ jiù zài tíshì yǔ lǐ miáoshù nǐ xiǎng yào shénme yàng de huàr yǐjí fēnggé. Bǐrú, \"qǐng huà yì fú dōngtiān lǐ de Wànlǐ Chángchéng de shuǐcǎihuà\".", translation: "Describe what kind of picture and style you want in the prompt. For example: \"Please paint a watercolor of the Great Wall in winter.\"" },
      { speaker: "大卫", hanzi: "还有，我怎么用它来帮助写作呢？", pinyin: "Hái yǒu, wǒ zěnme yòng tā lái bāngzhù xiězuò ne?", translation: "Also, how do I use it to help with writing?" },
      { speaker: "凯伦", hanzi: "你可以告诉它你需要写什么样的文章，比如，课堂报告或邮件，并且告诉它主题，它就会帮你构思和撰写。", pinyin: "Nǐ kěyǐ gàosu tā nǐ xūyào xiě shénme yàng de wénzhāng, bǐrú, kètáng bàogào huò yóujiàn, bìngqiě gàosu tā zhǔtí, tā jiù huì bāng nǐ gòusī hé zhuànxiě.", translation: "Tell it what kind of article you need — like a class report or email — and the topic, and it will help you brainstorm and write." },
      { speaker: "大卫", hanzi: "太棒了，我回去就试试。谢谢！", pinyin: "Tài bàng le, wǒ huíqù jiù shìshi. Xièxie!", translation: "Awesome — I'll try it when I get back. Thanks!" },
    ],
  },
];

const lesson8Vocab: VocabSet[] = [
  {
    id: "l8-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_8_text_1_vocab.mp3",
    items: [
      { hanzi: "人工智能", pinyin: "réngōng zhìnéng", pos: "NP", meaning: "artificial intelligence" },
      { hanzi: "机器", pinyin: "jīqì", pos: "N", meaning: "machine" },
      { hanzi: "伙伴", pinyin: "huǒbàn", pos: "N", meaning: "partner; companion" },
      { hanzi: "杰作", pinyin: "jiézuò", pos: "N", meaning: "masterpiece" },
      { hanzi: "正是", pinyin: "zhèngshì", pos: "VP", meaning: "precisely is; exactly is" },
      { hanzi: "愿景", pinyin: "yuànjǐng", pos: "N", meaning: "vision; aspiration" },
      { hanzi: "产物", pinyin: "chǎnwù", pos: "N", meaning: "product; outcome; result" },
      { hanzi: "熟悉", pinyin: "shúxī", pos: "V", meaning: "to be familiar with" },
      { hanzi: "模型", pinyin: "móxíng", pos: "N", meaning: "model" },
      { hanzi: "打造", pinyin: "dǎzào", pos: "V", meaning: "to forge; to create; to build" },
      { hanzi: "生成", pinyin: "shēngchéng", pos: "V", meaning: "to generate; to produce" },
      { hanzi: "各自", pinyin: "gèzì", pos: "Adv", meaning: "each; respectively" },
      { hanzi: "其", pinyin: "qí", pos: "Pr", meaning: "his; her; its; their" },
      { hanzi: "独特", pinyin: "dútè", pos: "A", meaning: "unique; distinctive" },
      { hanzi: "表达", pinyin: "biǎodá", pos: "N/V", meaning: "expression; to express" },
      { hanzi: "用途", pinyin: "yòngtú", pos: "N", meaning: "use; application" },
      { hanzi: "信息", pinyin: "xìnxī", pos: "N", meaning: "information" },
      { hanzi: "查询", pinyin: "cháxún", pos: "V", meaning: "to query; to search" },
      { hanzi: "学术", pinyin: "xuéshù", pos: "N", meaning: "academic learning" },
      { hanzi: "资料", pinyin: "zīliào", pos: "N", meaning: "material; data; information" },
      { hanzi: "任务", pinyin: "rènwù", pos: "N", meaning: "task; assignment" },
      { hanzi: "休闲", pinyin: "xiūxián", pos: "N", meaning: "leisure; recreation" },
      { hanzi: "耐心", pinyin: "nàixīn", pos: "A/N", meaning: "patient; patience" },
      { hanzi: "倾听", pinyin: "qīngtīng", pos: "V", meaning: "to listen attentively" },
      { hanzi: "心声", pinyin: "xīnshēng", pos: "N", meaning: "inner voice; heartfelt words" },
      { hanzi: "心理健康", pinyin: "xīnlǐ jiànkāng", pos: "NP", meaning: "mental health" },
      { hanzi: "预见", pinyin: "yùjiàn", pos: "V", meaning: "to foresee; to predict" },
      { hanzi: "智能化", pinyin: "zhìnénghuà", pos: "A/V", meaning: "intelligent; to make intelligent" },
      { hanzi: "人性化", pinyin: "rénxìnghuà", pos: "A/V", meaning: "humanized; to humanize" },
      { hanzi: "百度", pinyin: "Bǎidù", pos: "PN", meaning: "Baidu (Chinese tech company)" },
      { hanzi: "文心一言", pinyin: "Wénxīn Yìyán", pos: "PN", meaning: "Ernie Bot (Baidu's AI chatbot)" },
    ],
  },
  {
    id: "l8-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_8_text_2_vocab.mp3",
    items: [
      { hanzi: "行家", pinyin: "hángjiā", pos: "N", meaning: "expert" },
      { hanzi: "接下来", pinyin: "jiē xià lái", pos: "AdvP", meaning: "next; following" },
      { hanzi: "对话框", pinyin: "duìhuà kuàng", pos: "NP", meaning: "dialog box" },
      { hanzi: "提示语", pinyin: "tíshì yǔ", pos: "NP", meaning: "prompt" },
      { hanzi: "按照", pinyin: "ànzhào", pos: "Prep", meaning: "according to; in the light of" },
      { hanzi: "准确", pinyin: "zhǔnquè", pos: "A", meaning: "accurate; precise" },
      { hanzi: "制作", pinyin: "zhìzuò", pos: "V", meaning: "to make; to produce" },
      { hanzi: "描述", pinyin: "miáoshù", pos: "V", meaning: "to describe" },
      { hanzi: "风格", pinyin: "fēnggé", pos: "N", meaning: "style" },
      { hanzi: "幅", pinyin: "fú", pos: "M", meaning: "measure word for paintings" },
      { hanzi: "水彩画", pinyin: "shuǐcǎihuà", pos: "N", meaning: "watercolor painting" },
      { hanzi: "构思", pinyin: "gòusī", pos: "V", meaning: "to conceive; to conceptualize" },
      { hanzi: "撰写", pinyin: "zhuànxiě", pos: "V", meaning: "to write; to compose" },
    ],
  },
];

const lesson8Tasks: Task[] = [
  {
    id: "l8-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "rén gōng zhì néng",
    answer: "人工智能",
    translation: "artificial intelligence",
    audio: "/audio/lesson_8_text_1_vocab.mp3",
    hint: "rén gōng zhì néng — the central topic of this lesson.",
  },
  {
    id: "l8-t2",
    type: "battle",
    prompt: "Pick the correct phrase for the gap",
    sentenceBefore: "它们各自也",
    sentenceAfter: "其独特的互动方式而受到不同用户的喜爱。",
    options: [
      { hanzi: "因…而", pinyin: "yīn … ér", meaning: "because of … therefore" },
      { hanzi: "为…而", pinyin: "wèi … ér", meaning: "for the sake of …" },
      { hanzi: "把…而", pinyin: "bǎ … ér", meaning: "(disposal — wrong here)" },
    ],
    correctIndex: 0,
    translation: "Each is loved by different users because of its unique interaction style.",
    hint: "Pattern: 因 + reason + 而 + result.",
  },
  {
    id: "l8-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'It will generate the text you need according to your prompt.'",
    blocks: ["它", "会", "按照你的提示语", "生成", "你需要的文本"],
    answer: ["它", "会", "按照你的提示语", "生成", "你需要的文本"],
    pinyin: "Tā huì ànzhào nǐ de tíshì yǔ shēngchéng nǐ xūyào de wénběn.",
    translation: "It will generate the text you need according to your prompt.",
    hint: "Pattern: Subject + 按照 + criteria + Verb + Object.",
  },
  {
    id: "l8-t4",
    type: "matching",
    prompt: "Match each chatbot/company to its Chinese name",
    pairs: [
      { left: "🤖", leftLabel: "ChatGPT", right: "OpenAI" },
      { left: "📚", leftLabel: "Ernie Bot", right: "文心一言" },
      { left: "🔍", leftLabel: "Baidu", right: "百度" },
      { left: "💎", leftLabel: "Gemini", right: "谷歌" },
      { left: "🪟", leftLabel: "Copilot", right: "微软" },
      { left: "💬", leftLabel: "dialog box", right: "对话框" },
    ],
  },
  {
    id: "l8-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 智能",
    word: "智能",
    translation: "intelligence; intelligent",
    syllables: [
      { base: "zhi", correctTone: 4 },
      { base: "neng", correctTone: 2 },
    ],
  },
  {
    id: "l8-t6",
    type: "intuition",
    prompt: "Fix the word order — 'Wang Gang runs every day, and that is precisely the reason for his good health.'",
    brokenSentence: ["他身体健康的原因", "王钢每天坚持跑步", "而这正是"],
    correctOrder: [1, 2, 0],
    translation: "Wang Gang runs every day, and that is precisely the reason for his good health.",
    hint: "Pattern: Clause-1 + 而 + 这 + 正是 + Clause-2.",
  },
  {
    id: "l8-t7",
    type: "simulation",
    prompt: "David asks Karen for help with ChatGPT. Reply naturally.",
    npcMessage: "凯伦，我怎么让ChatGPT帮我制作图片呢？",
    npcPinyin: "Kǎilún, wǒ zěnme ràng ChatGPT bāng wǒ zhìzuò túpiàn ne?",
    npcTranslation: "Karen, how do I get ChatGPT to make images for me?",
    options: [
      { hanzi: "你只要在提示语里描述你想要的画儿和风格，它就会按照你的提示语生成图片。", pinyin: "Nǐ zhǐyào zài tíshì yǔ lǐ miáoshù nǐ xiǎng yào de huàr hé fēnggé, tā jiù huì ànzhào nǐ de tíshì yǔ shēngchéng túpiàn.", correct: true, reply: "太棒了，我回去就试试。谢谢！" },
      { hanzi: "你得先去注册一个账户，然后才能用。", pinyin: "Nǐ děi xiān qù zhùcè yí gè zhànghù, ránhòu cái néng yòng.", correct: false },
      { hanzi: "ChatGPT不能制作图片。", pinyin: "ChatGPT bù néng zhìzuò túpiàn.", correct: false },
    ],
  },
  {
    id: "l8-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences about AI chatbots, using each item below.",
    required: ["人工智能", "按照", "因…而"],
    minSentences: 3,
    retroWords: ["对话框", "提示语", "生成", "构思", "撰写", "智能化"],
  },
];

const lesson8Recap: Recap = {
  takeaways: [
    "人工智能聊天机器人 — AI chatbots: built on 大型语言模型 (large language models).",
    "Pattern: 而…正是 — connects two clauses, 正是 emphasizes 'precisely is'.",
    "Pattern: 因…而 — because of X, therefore Y. 因其独特 而 受到喜爱.",
    "以及 — formal 'and' for lists with 3+ items. 各自 — each / respectively.",
    "受到 + N — passive: to be subject to / received. 按照 + criteria — according to.",
    "接下来 — next; following. Use to chain steps in instructions.",
    "Platforms: ChatGPT · 文心一言 (Wénxīn Yìyán) · Gemini · Copilot.",
  ],
  keyWords: ["人工智能", "聊天机器人", "对话框", "提示语", "生成", "按照", "因…而", "文心一言"],
};

// ───────────────────────────────────────────────────────────────────────────
// Lesson 9 — 网络视频 / Online Videos
// ───────────────────────────────────────────────────────────────────────────

const lesson9Dialogues: Dialogue[] = [
  {
    id: "l9-text1",
    title: "课文一",
    titleEn: "Text 1 — Online video in China",
    audio: "/audio/lesson_9_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "中国的网络视频虽然起步有点晚，但是发展很快。二零零五年左右，中国的视频网站开始出现，其中优酷和土豆最为人们所熟知，为观众带来了大量的中国和外国的视频内容。自那以后，随着智能手机的普及，短视频应用也很快火起来了。",
        pinyin: "Zhōngguó de wǎngluò shìpín suīrán qǐbù yǒu diǎn wǎn, dànshì fāzhǎn hěn kuài. Èr líng líng wǔ nián zuǒyòu, Zhōngguó de shìpín wǎngzhàn kāishǐ chūxiàn, qízhōng Yōukù hé Tǔdòu zuì wéi rénmen suǒ shúzhī, wèi guānzhòng dài lái le dàliàng de Zhōngguó hé wàiguó de shìpín nèiróng. Zì nà yǐhòu, suízhe zhìnéng shǒujī de pǔjí, duǎn shìpín yìngyòng yě hěn kuài huǒ qǐlái le.",
        translation: "China's online video industry started a bit late but grew fast. Around 2005, video sites began to appear — Youku and Tudou were the best known, bringing audiences large amounts of Chinese and foreign content. Since then, with the spread of smartphones, short-video apps also quickly caught fire.",
      },
      {
        hanzi: "现在，中国网络视频市场由几家大平台主导，包括爱奇艺、腾讯视频和优酷，主打电影、电视剧和综艺节目；而B站、抖音、快手等中、短视频平台，则以活泼多样的内容见长，尤其受到年轻人追捧。",
        pinyin: "Xiànzài, Zhōngguó wǎngluò shìpín shìchǎng yóu jǐ jiā dà píngtái zhǔdǎo, bāokuò Àiqíyì, Téngxùn Shìpín hé Yōukù, zhǔdǎ diànyǐng, diànshìjù hé zōngyì jiémù; ér B Zhàn, Dǒuyīn, Kuàishǒu děng zhōng, duǎn shìpín píngtái, zé yǐ huópō duōyàng de nèiróng jiàncháng, yóuqí shòu dào niánqīng rén zhuīpěng.",
        translation: "Now China's online video market is led by a few big platforms — iQIYI, Tencent Video, and Youku — featuring films, TV dramas, and variety shows; while medium- and short-video platforms like Bilibili, Douyin, and Kuaishou are known for lively, varied content, especially loved by young people.",
      },
      {
        hanzi: "网络视频已经在中国的经济和文化中占据了一席之地。它不仅吸引了大量投资，为创作者提供了一个新的赚钱渠道，还丰富了人们的娱乐生活。同时，短视频的盛行推动了许多网红的快速崛起。他们通过视频传播自己的价值观，对社会产生了一定的影响。",
        pinyin: "Wǎngluò shìpín yǐjīng zài Zhōngguó de jīngjì hé wénhuà zhōng zhànjù le yì xí zhī dì. Tā bùjǐn xīyǐn le dàliàng tóuzī, wèi chuàngzuòzhě tígōng le yí gè xīn de zhuànqián qúdào, hái fēngfù le rénmen de yúlè shēnghuó. Tóngshí, duǎn shìpín de shèngxíng tuīdòng le xǔduō wǎnghóng de kuàisù juéqǐ. Tāmen tōngguò shìpín chuánbō zìjǐ de jiàzhí guān, duì shèhuì chǎnshēng le yídìng de yǐngxiǎng.",
        translation: "Online video has carved out its place in China's economy and culture. It attracts huge investment, opens a new income channel for creators, and enriches people's entertainment. Meanwhile, the boom of short video has driven the rapid rise of many influencers — who spread their values through video and have had a definite impact on society.",
      },
      {
        hanzi: "网络视频突破了传统媒体的限制，为大众提供了展示自我的舞台。其内容的多样化不仅满足了人们的娱乐需求，也为思想的交流提供了场所。然而，如何确保网络视频内容的健康，防止不良信息的传播，是这个行业需要面对和解决的问题。",
        pinyin: "Wǎngluò shìpín tūpò le chuántǒng méitǐ de xiànzhì, wèi dàzhòng tígōng le zhǎnshì zìwǒ de wǔtái. Qí nèiróng de duōyànghuà bùjǐn mǎnzú le rénmen de yúlè xūqiú, yě wèi sīxiǎng de jiāoliú tígōng le chǎngsuǒ. Rán'ér, rúhé quèbǎo wǎngluò shìpín nèiróng de jiànkāng, fángzhǐ bùliáng xìnxī de chuánbō, shì zhè ge hángyè xūyào miànduì hé jiějué de wèntí.",
        translation: "Online video has broken through the limits of traditional media, giving the public a stage for self-expression. Its diverse content satisfies entertainment needs and provides a venue for the exchange of ideas. However, ensuring healthy content and preventing the spread of harmful information is a problem this industry must face and solve.",
      },
    ],
  },
  {
    id: "l9-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen and David talk about web dramas",
    audio: "/audio/lesson_9_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "凯伦", hanzi: "大卫，你的中文说得越来越流利了，怎么突然进步这么快？", pinyin: "Dàwèi, nǐ de Zhōngwén shuō de yuè lái yuè liúlì le, zěnme tūrán jìnbù zhème kuài?", translation: "David, your Chinese is getting more fluent — how did you suddenly improve so fast?" },
      { speaker: "大卫", hanzi: "谢谢夸奖。其实我最近一直在看中文网剧，觉得对提高我的中文水平很有帮助。", pinyin: "Xièxie kuājiǎng. Qíshí wǒ zuìjìn yìzhí zài kàn Zhōngwén wǎng jù, juéde duì tígāo wǒ de Zhōngwén shuǐpíng hěn yǒu bāngzhù.", translation: "Thanks for the compliment. Actually I've been watching Chinese web dramas — they really help improve my Chinese." },
      { speaker: "凯伦", hanzi: "真的吗？你都看些什么网剧？", pinyin: "Zhēn de ma? Nǐ dōu kàn xiē shénme wǎng jù?", translation: "Really? What kind of web dramas do you watch?" },
      { speaker: "大卫", hanzi: "我喜欢武侠剧，剧情很吸引人，而且有很多武打场面，特别好看。另外，剧中的台词也很地道，可以学到很多日常用语。", pinyin: "Wǒ xǐhuān wǔxiá jù, jùqíng hěn xīyǐn rén, érqiě yǒu hěn duō wǔdǎ chǎngmiàn, tèbié hǎokàn. Lìngwài, jù zhōng de táicí yě hěn dìdào, kěyǐ xué dào hěn duō rìcháng yòngyǔ.", translation: "I love martial arts dramas — the plots are gripping with lots of fight scenes. The lines are authentic too, so you learn lots of everyday speech." },
      { speaker: "凯伦", hanzi: "我也想试试看。你有没有什么好推荐的？", pinyin: "Wǒ yě xiǎng shìshi kàn. Nǐ yǒu méi yǒu shénme hǎo tuījiàn de?", translation: "I'd like to try too. Any recommendations?" },
      { speaker: "大卫", hanzi: "你喜欢看哪一类的？现代的还是古代的？", pinyin: "Nǐ xǐhuān kàn nǎ yí lèi de? Xiàndài de háishi gǔdài de?", translation: "What genre do you like — modern or historical?" },
      { speaker: "凯伦", hanzi: "我想看都市言情剧。哪儿有？", pinyin: "Wǒ xiǎng kàn dūshì yánqíng jù. Nǎr yǒu?", translation: "I want urban romance dramas. Where can I find them?" },
      { speaker: "大卫", hanzi: "腾讯视频和爱奇艺都有。不过我更推荐腾讯。它的网剧更新快，画面质量也很好。", pinyin: "Téngxùn Shìpín hé Àiqíyì dōu yǒu. Búguò wǒ gèng tuījiàn Téngxùn. Tā de wǎng jù gēngxīn kuài, huàmiàn zhìliàng yě hěn hǎo.", translation: "Tencent Video and iQIYI both have them. I'd recommend Tencent — fast updates and great picture quality." },
      { speaker: "凯伦", hanzi: "那要付费吗？", pinyin: "Nà yào fùfèi ma?", translation: "Do I have to pay?" },
      { speaker: "大卫", hanzi: "你可以注册一个学生账户，一个月只要十来块钱，就能看到没有广告的高清视频了。", pinyin: "Nǐ kěyǐ zhùcè yí gè xuéshēng zhànghù, yí gè yuè zhǐ yào shí lái kuài qián, jiù néng kàn dào méi yǒu guǎnggào de gāoqīng shìpín le.", translation: "You can register a student account — only about ten kuai a month, and you get HD video with no ads." },
      { speaker: "凯伦", hanzi: "哇，还真划算！可以在手机上看吗？", pinyin: "Wā, hái zhēn huásuàn! Kěyǐ zài shǒujī shàng kàn ma?", translation: "Wow, that's a great deal! Can I watch on my phone?" },
      { speaker: "大卫", hanzi: "当然可以，只要下载了腾讯视频的手机应用，就可以随时随地看网剧了。", pinyin: "Dāngrán kěyǐ, zhǐyào xiàzài le Téngxùn Shìpín de shǒujī yìngyòng, jiù kěyǐ suíshí suídì kàn wǎng jù le.", translation: "Of course — just download the Tencent Video app and you can watch anytime, anywhere." },
    ],
  },
];

const lesson9Vocab: VocabSet[] = [
  {
    id: "l9-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_9_text_1_vocab.mp3",
    items: [
      { hanzi: "起步", pinyin: "qǐbù", pos: "V", meaning: "to start" },
      { hanzi: "左右", pinyin: "zuǒyòu", pos: "Adv", meaning: "about; more or less" },
      { hanzi: "熟知", pinyin: "shúzhī", pos: "V", meaning: "to know well; to be familiar with" },
      { hanzi: "观众", pinyin: "guānzhòng", pos: "N", meaning: "audience" },
      { hanzi: "普及", pinyin: "pǔjí", pos: "N/V", meaning: "widespread adoption; to popularize" },
      { hanzi: "火", pinyin: "huǒ", pos: "A/N", meaning: "hot; popular; fire" },
      { hanzi: "由", pinyin: "yóu", pos: "Prep", meaning: "by; through" },
      { hanzi: "主导", pinyin: "zhǔdǎo", pos: "V", meaning: "to lead; to dominate" },
      { hanzi: "主打", pinyin: "zhǔdǎ", pos: "V", meaning: "to feature; to specialize in" },
      { hanzi: "综艺节目", pinyin: "zōngyì jiémù", pos: "NP", meaning: "variety show" },
      { hanzi: "活泼", pinyin: "huópō", pos: "A", meaning: "lively; active" },
      { hanzi: "见长", pinyin: "jiàncháng", pos: "V", meaning: "to be good at; to be known for" },
      { hanzi: "尤其", pinyin: "yóuqí", pos: "Adv", meaning: "especially; particularly" },
      { hanzi: "追捧", pinyin: "zhuīpěng", pos: "V", meaning: "to chase after; to adore" },
      { hanzi: "占据", pinyin: "zhànjù", pos: "V", meaning: "to occupy" },
      { hanzi: "一席之地", pinyin: "yì xí zhī dì", pos: "IE", meaning: "a place; a niche" },
      { hanzi: "吸引", pinyin: "xīyǐn", pos: "V", meaning: "to attract" },
      { hanzi: "渠道", pinyin: "qúdào", pos: "N", meaning: "channel; means" },
      { hanzi: "投资", pinyin: "tóuzī", pos: "N/V", meaning: "investment; to invest" },
      { hanzi: "盛行", pinyin: "shèngxíng", pos: "V", meaning: "to be in vogue; to be prevalent" },
      { hanzi: "崛起", pinyin: "juéqǐ", pos: "N/V", meaning: "emergence; to emerge" },
      { hanzi: "价值观", pinyin: "jiàzhí guān", pos: "N", meaning: "values" },
      { hanzi: "产生", pinyin: "chǎnshēng", pos: "V", meaning: "to produce; to engender" },
      { hanzi: "传统", pinyin: "chuántǒng", pos: "A/N", meaning: "traditional; tradition" },
      { hanzi: "自我", pinyin: "zìwǒ", pos: "Pr", meaning: "self; selfhood" },
      { hanzi: "思想", pinyin: "sīxiǎng", pos: "N", meaning: "thought; ideology" },
      { hanzi: "然而", pinyin: "rán'ér", pos: "Conj", meaning: "however; nevertheless" },
      { hanzi: "如何", pinyin: "rúhé", pos: "QPr", meaning: "how; what" },
      { hanzi: "确保", pinyin: "quèbǎo", pos: "V", meaning: "to ensure; to guarantee" },
      { hanzi: "防止", pinyin: "fángzhǐ", pos: "V", meaning: "to prevent; to guard against" },
      { hanzi: "不良", pinyin: "bùliáng", pos: "A", meaning: "bad; harmful; unhealthy" },
      { hanzi: "面对", pinyin: "miànduì", pos: "V", meaning: "to face; to confront" },
      { hanzi: "优酷", pinyin: "Yōukù", pos: "PN", meaning: "Youku" },
      { hanzi: "土豆", pinyin: "Tǔdòu", pos: "PN", meaning: "Tudou" },
      { hanzi: "爱奇艺", pinyin: "Àiqíyì", pos: "PN", meaning: "iQIYI" },
      { hanzi: "腾讯视频", pinyin: "Téngxùn Shìpín", pos: "PN", meaning: "Tencent Video" },
      { hanzi: "B站", pinyin: "B Zhàn", pos: "PN", meaning: "Bilibili" },
    ],
  },
  {
    id: "l9-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_9_text_2_vocab.mp3",
    items: [
      { hanzi: "流利", pinyin: "liúlì", pos: "A", meaning: "fluent" },
      { hanzi: "进步", pinyin: "jìnbù", pos: "V", meaning: "to improve; to progress" },
      { hanzi: "夸奖", pinyin: "kuājiǎng", pos: "V", meaning: "to praise" },
      { hanzi: "网剧", pinyin: "wǎng jù", pos: "NP", meaning: "web drama" },
      { hanzi: "剧情", pinyin: "jùqíng", pos: "N", meaning: "plot; storyline" },
      { hanzi: "武打", pinyin: "wǔdǎ", pos: "N", meaning: "martial arts action" },
      { hanzi: "场面", pinyin: "chǎngmiàn", pos: "N", meaning: "scene" },
      { hanzi: "台词", pinyin: "táicí", pos: "N", meaning: "actor's lines" },
      { hanzi: "地道", pinyin: "dìdào", pos: "A", meaning: "authentic" },
      { hanzi: "日常用语", pinyin: "rìcháng yòngyǔ", pos: "NP", meaning: "daily language; everyday speech" },
      { hanzi: "古代", pinyin: "gǔdài", pos: "N", meaning: "ancient times" },
      { hanzi: "画面", pinyin: "huàmiàn", pos: "N", meaning: "picture; image" },
      { hanzi: "广告", pinyin: "guǎnggào", pos: "N", meaning: "advertisement" },
      { hanzi: "高清视频", pinyin: "gāoqīng shìpín", pos: "NP", meaning: "HD video" },
      { hanzi: "划算", pinyin: "huásuàn", pos: "A", meaning: "worth it; a good deal" },
    ],
  },
];

const lesson9Tasks: Task[] = [
  {
    id: "l9-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "wǎng luò shì pín",
    answer: "网络视频",
    translation: "online video",
    audio: "/audio/lesson_9_text_1_vocab.mp3",
    hint: "wǎng luò shì pín — the central topic of this lesson.",
  },
  {
    id: "l9-t2",
    type: "battle",
    prompt: "Pick the correct phrase for the gap",
    sentenceBefore: "中国网络视频市场",
    sentenceAfter: "几家大平台主导。",
    options: [
      { hanzi: "由", pinyin: "yóu", meaning: "by; through (agent marker)" },
      { hanzi: "把", pinyin: "bǎ", meaning: "(disposal marker)" },
      { hanzi: "对", pinyin: "duì", meaning: "toward; to" },
    ],
    correctIndex: 0,
    translation: "China's online video market is led by a few big platforms.",
    hint: "Pattern: Subject + 由 + Agent + Verb — passive 'by'.",
  },
  {
    id: "l9-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'Short-video apps also quickly caught fire.'",
    blocks: ["短视频应用", "也", "很快", "火", "起来了"],
    answer: ["短视频应用", "也", "很快", "火", "起来了"],
    pinyin: "Duǎn shìpín yìngyòng yě hěn kuài huǒ qǐlái le.",
    translation: "Short-video apps also quickly caught fire.",
    hint: "Pattern: A + 起来 — initiation of a state. 火起来 = to become popular.",
  },
  {
    id: "l9-t4",
    type: "matching",
    prompt: "Match each platform to its English name",
    pairs: [
      { left: "🎬", leftLabel: "iQIYI", right: "爱奇艺" },
      { left: "📺", leftLabel: "Tencent Video", right: "腾讯视频" },
      { left: "🥔", leftLabel: "Tudou", right: "土豆" },
      { left: "🎭", leftLabel: "Youku", right: "优酷" },
      { left: "🅱️", leftLabel: "Bilibili", right: "B站" },
      { left: "📱", leftLabel: "Douyin", right: "抖音" },
    ],
  },
  {
    id: "l9-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 视频",
    word: "视频",
    translation: "video",
    syllables: [
      { base: "shi", correctTone: 4 },
      { base: "pin", correctTone: 2 },
    ],
  },
  {
    id: "l9-t6",
    type: "intuition",
    prompt: "Fix the word order — 'I like singing, especially pop songs.'",
    brokenSentence: ["爱唱流行歌曲", "我喜欢唱歌", "尤其"],
    correctOrder: [1, 2, 0],
    translation: "I like singing, especially pop songs.",
    hint: "Pattern: General statement + 尤其 + specific case.",
  },
  {
    id: "l9-t7",
    type: "simulation",
    prompt: "Karen wants to watch web dramas. Reply naturally as David.",
    npcMessage: "我想看都市言情剧。哪儿有？要付费吗？",
    npcPinyin: "Wǒ xiǎng kàn dūshì yánqíng jù. Nǎr yǒu? Yào fùfèi ma?",
    npcTranslation: "I want to watch urban romance dramas. Where can I find them? Do I have to pay?",
    options: [
      { hanzi: "腾讯视频和爱奇艺都有。注册一个学生账户，一个月十来块钱就能看高清视频。", pinyin: "Téngxùn Shìpín hé Àiqíyì dōu yǒu. Zhùcè yí gè xuéshēng zhànghù, yí gè yuè shí lái kuài qián jiù néng kàn gāoqīng shìpín.", correct: true, reply: "哇，还真划算！" },
      { hanzi: "你应该看武侠剧，剧情很吸引人。", pinyin: "Nǐ yīnggāi kàn wǔxiá jù, jùqíng hěn xīyǐn rén.", correct: false },
      { hanzi: "网剧不好看，看电影吧。", pinyin: "Wǎng jù bù hǎokàn, kàn diànyǐng ba.", correct: false },
    ],
  },
  {
    id: "l9-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences about online video, using each item below.",
    required: ["网络视频", "由…主导", "尤其"],
    minSentences: 3,
    retroWords: ["短视频", "网剧", "追捧", "划算", "高清视频", "然而"],
  },
];

const lesson9Recap: Recap = {
  takeaways: [
    "网络视频 — online video: market 由 big platforms 主导 (led by).",
    "Pattern: 左右 — after a number = 'about; more or less'. 二零零五年左右.",
    "Pattern: A + 起来 — initiation of a state. 火起来 (to catch fire / become popular).",
    "Pattern: 由 + Agent + V — passive marker 'by'. 由几家大平台主导.",
    "尤其 — especially; singles out a case within a broader statement.",
    "对…产生影响 — to have an impact on. 然而 — however (formal contrast). 其实 — actually.",
    "Platforms: 爱奇艺 · 腾讯视频 · 优酷 · B站 · 抖音 · 快手.",
  ],
  keyWords: ["网络视频", "短视频", "网剧", "追捧", "由…主导", "起来", "尤其", "腾讯视频"],
};

// ───────────────────────────────────────────────────────────────────────────
// Lesson 10 — 网络游戏 / Online Gaming

const lesson10Dialogues: Dialogue[] = [
  {
    id: "l10-text1",
    title: "课文一",
    titleEn: "Text 1 — Online gaming in China",
    audio: "/audio/lesson_10_text_1.mp3",
    kind: "narrative",
    lines: [
      {
        hanzi: "网络游戏，也叫\"在线游戏\"或\"网游\"，是通过网络把游戏公司的服务器和我们自己的电脑或手机连接起来玩的电子游戏。网络游戏让许多爱玩游戏的人同时连线进行游戏、娱乐、交流，并在虚拟世界中获得成就感，是一种休闲娱乐活动。",
        pinyin: "Wǎngluò yóuxì, yě jiào \"zàixiàn yóuxì\" huò \"wǎng yóu\", shì tōngguò wǎngluò bǎ yóuxì gōngsī de fúwùqì hé wǒmen zìjǐ de diànnǎo huò shǒujī liánjiē qǐlái wán de diànzǐ yóuxì. Wǎngluò yóuxì ràng xǔduō ài wán yóuxì de rén tóngshí liánxiàn jìnxíng yóuxì, yúlè, jiāoliú, bìng zài xūnǐ shìjiè zhōng huòdé chéngjiù gǎn, shì yì zhǒng xiūxián yúlè huódòng.",
        translation: "Online games — also called 'online gaming' or 'net games' — are electronic games played by connecting our own computer or phone to a game company's server through the internet. They let many gaming fans connect at the same time to play, relax, and chat, and gain a sense of achievement in a virtual world — a form of leisure entertainment.",
      },
      {
        hanzi: "网络游戏在中国始于上世纪九十年代。经过多年的发展，中国现在已成为全世界最大的网络游戏市场之一。中国拥有快速发展的游戏产业，其中腾讯游戏、网易游戏、完美世界和盛趣游戏等，都是全国领先的游戏开发和运营企业。它们分别推出的《王者荣耀》、《和平精英》、《梦幻西游》和《诛仙》等产品，都已成为人们爱不释手的经典游戏。",
        pinyin: "Wǎngluò yóuxì zài Zhōngguó shǐ yú shàng shìjì jiǔshí niándài. Jīngguò duō nián de fāzhǎn, Zhōngguó xiànzài yǐ chéngwéi quán shìjiè zuì dà de wǎngluò yóuxì shìchǎng zhī yī. Zhōngguó yōngyǒu kuàisù fāzhǎn de yóuxì chǎnyè, qízhōng Téngxùn Yóuxì, Wǎngyì Yóuxì, Wánměi Shìjiè hé Shèngqù Yóuxì děng, dōu shì quánguó lǐngxiān de yóuxì kāifā hé yùnyíng qǐyè. Tāmen fēnbié tuīchū de 《Wángzhě Róngyào》、《Hépíng Jīngyīng》、《Mènghuàn Xīyóu》 hé 《Zhūxiān》 děng chǎnpǐn, dōu yǐ chéngwéi rénmen ài bú shì shǒu de jīngdiǎn yóuxì.",
        translation: "Online gaming in China began in the 1990s. After many years of development, China is now one of the largest online gaming markets in the world. China has a fast-growing gaming industry — Tencent Games, NetEase Games, Perfect World, and Shengqu Games are all leading game development and operation companies. The titles they have released — Honor of Kings, Game for Peace, Fantasy Westward Journey, and Jade Dynasty — have all become beloved classics.",
      },
      {
        hanzi: "中国网游的类型非常丰富，包括角色扮演游戏、动作游戏、策略游戏、体育游戏、休闲游戏、以及团队竞技游戏等。这些游戏类型各有各的特色和玩法，不仅深受中国玩家喜爱，也吸引了不少外国玩家。另外，随着智能手机的普及，移动端游戏在中国得到快速发展，扩大了网络游戏市场，同时也成为中国数字经济发展的新动力。",
        pinyin: "Zhōngguó wǎng yóu de lèixíng fēicháng fēngfù, bāokuò juésè bànyǎn yóuxì, dòngzuò yóuxì, cèlüè yóuxì, tǐyù yóuxì, xiūxián yóuxì, yǐjí tuánduì jìngjì yóuxì děng. Zhèxiē yóuxì lèixíng gè yǒu gè de tèsè hé wánfǎ, bùjǐn shēn shòu Zhōngguó wánjiā xǐ'ài, yě xīyǐn le bù shǎo wàiguó wánjiā. Lìngwài, suízhe zhìnéng shǒujī de pǔjí, yídòng duān yóuxì zài Zhōngguó dédào kuàisù fāzhǎn, kuòdà le wǎngluò yóuxì shìchǎng, tóngshí yě chéngwéi Zhōngguó shùzì jīngjì fāzhǎn de xīn dònglì.",
        translation: "Chinese online games come in many types — role-playing, action, strategy, sports, casual, and team competitive games. Each type has its own features and gameplay; they are loved not only by Chinese players but also attract many foreign players. In addition, as smartphones spread, mobile games have developed rapidly in China, expanding the online gaming market and becoming a new driver of China's digital economy.",
      },
    ],
  },
  {
    id: "l10-text2",
    title: "课文二",
    titleEn: "Text 2 — Karen and teacher Li discuss gaming and youth",
    audio: "/audio/lesson_10_text_2.mp3",
    kind: "dialogue",
    lines: [
      { speaker: "凯伦", hanzi: "李老师，昨天我们上课的内容是中国的网游。我想听听您对网游的看法。", pinyin: "Lǐ lǎoshī, zuótiān wǒmen shàng kè de nèiróng shì Zhōngguó de wǎng yóu. Wǒ xiǎng tīng ting nín duì wǎng yóu de kànfǎ.", translation: "Teacher Li, yesterday's lesson was about Chinese online games. I'd love to hear your view on them." },
      { speaker: "李老师", hanzi: "嗯，你这个话题有点儿大。能具体点儿吗？", pinyin: "Èn, nǐ zhè ge huàtí yǒu diǎnr dà. Néng jùtǐ diǎnr ma?", translation: "Hmm, that topic is a bit broad. Can you be more specific?" },
      { speaker: "凯伦", hanzi: "哦，我感兴趣的是网游对青少年的影响。", pinyin: "Ò, wǒ gǎn xìngqu de shì wǎng yóu duì qīngshàonián de yǐngxiǎng.", translation: "Oh, I'm interested in the influence of online games on youth." },
      { speaker: "李老师", hanzi: "对于青少年来说，网络游戏既有好的影响也有不好的影响，关键在于如何引导。", pinyin: "Duìyú qīngshàonián láishuō, wǎngluò yóuxì jì yǒu hǎo de yǐngxiǎng yě yǒu bù hǎo de yǐngxiǎng, guānjiàn zài yú rúhé yǐndǎo.", translation: "For young people, online games have both good and bad effects. The key lies in how you guide them." },
      { speaker: "凯伦", hanzi: "什么是好的影响呢？", pinyin: "Shénme shì hǎo de yǐngxiǎng ne?", translation: "What are the good effects?" },
      { speaker: "李老师", hanzi: "比如说，网游能提供娱乐，帮助青少年放松，甚至还能提高他们的反应能力和团队合作意识。", pinyin: "Bǐrú shuō, wǎng yóu néng tígōng yúlè, bāngzhù qīngshàonián fàngsōng, shènzhì hái néng tígāo tāmen de fǎnyìng nénglì hé tuánduì hézuò yìshi.", translation: "For example, they offer entertainment, help young people relax, and can even improve their reaction ability and team cooperation awareness." },
      { speaker: "凯伦", hanzi: "那不好的影响呢？", pinyin: "Nà bù hǎo de yǐngxiǎng ne?", translation: "And the bad effects?" },
      { speaker: "李老师", hanzi: "网游容易让青少年上瘾，影响他们的学习和生活。而且，有些游戏内容可能不适合青少年。", pinyin: "Wǎng yóu róngyi ràng qīngshàonián shàngyǐn, yǐngxiǎng tāmen de xuéxí hé shēnghuó. Érqiě, yǒu xiē yóuxì nèiróng kěnéng bú shìhé qīngshàonián.", translation: "Online games easily make young people addicted, affecting their study and life. And some game content may be unsuitable for them." },
      { speaker: "凯伦", hanzi: "什么样的内容？", pinyin: "Shénme yàng de nèiróng?", translation: "What kind of content?" },
      { speaker: "李老师", hanzi: "比如暴力，这对他们的成长是没有好处的。", pinyin: "Bǐrú bàolì, zhè duì tāmen de chéngzhǎng shì méiyǒu hǎochù de.", translation: "Violence, for instance — that's no good for their growth." },
      { speaker: "凯伦", hanzi: "那老师和家长应该怎么做呢？", pinyin: "Nà lǎoshī hé jiāzhǎng yīnggāi zěnme zuò ne?", translation: "Then what should teachers and parents do?" },
      { speaker: "李老师", hanzi: "老师和家长应该注意孩子的游戏行为，引导他们合理安排游戏时间，选择健康的游戏内容，帮助他们养成良好的网络使用习惯。", pinyin: "Lǎoshī hé jiāzhǎng yīnggāi zhùyì háizi de yóuxì xíngwéi, yǐndǎo tāmen hélǐ ānpái yóuxì shíjiān, xuǎnzé jiànkāng de yóuxì nèiróng, bāngzhù tāmen yǎngchéng liánghǎo de wǎngluò shǐyòng xíguàn.", translation: "They should pay attention to children's gaming behavior, guide them to arrange gaming time reasonably, choose healthy content, and help them develop good internet habits." },
      { speaker: "凯伦", hanzi: "说得太好了。谢谢老师！", pinyin: "Shuō dé tài hǎo le. Xièxie lǎoshī!", translation: "Wonderfully said. Thank you, teacher!" },
    ],
  },
];

const lesson10Vocab: VocabSet[] = [
  {
    id: "l10-vocab1",
    title: "Text 1 vocabulary",
    audio: "/audio/lesson_10_text_1_vocab.mp3",
    items: [
      { hanzi: "在线", pinyin: "zàixiàn", pos: "A", meaning: "online" },
      { hanzi: "服务器", pinyin: "fúwùqì", pos: "NP", meaning: "server" },
      { hanzi: "连接", pinyin: "liánjiē", pos: "V", meaning: "to connect" },
      { hanzi: "连线", pinyin: "liánxiàn", pos: "V", meaning: "to be online; to connect" },
      { hanzi: "虚拟", pinyin: "xūnǐ", pos: "A", meaning: "virtual" },
      { hanzi: "获得", pinyin: "huòdé", pos: "V", meaning: "to acquire; to obtain" },
      { hanzi: "成就感", pinyin: "chéngjiù gǎn", pos: "NP", meaning: "sense of achievement" },
      { hanzi: "经过", pinyin: "jīngguò", pos: "Prep/V", meaning: "through; to go through" },
      { hanzi: "之一", pinyin: "zhī yī", pos: "NP", meaning: "one of" },
      { hanzi: "领先", pinyin: "lǐngxiān", pos: "V", meaning: "to lead" },
      { hanzi: "推出", pinyin: "tuīchū", pos: "V", meaning: "to release; to launch" },
      { hanzi: "产品", pinyin: "chǎnpǐn", pos: "N", meaning: "product" },
      { hanzi: "爱不释手", pinyin: "ài bú shì shǒu", pos: "IE", meaning: "to love too much to part with it" },
      { hanzi: "经典", pinyin: "jīngdiǎn", pos: "A/N", meaning: "classic; classics" },
      { hanzi: "角色", pinyin: "juésè", pos: "N", meaning: "role; character" },
      { hanzi: "扮演", pinyin: "bànyǎn", pos: "V", meaning: "to play the role of; to portray" },
      { hanzi: "动作", pinyin: "dòngzuò", pos: "N", meaning: "action; movement" },
      { hanzi: "策略", pinyin: "cèlüè", pos: "N", meaning: "strategy" },
      { hanzi: "体育", pinyin: "tǐyù", pos: "N", meaning: "sports; physical education" },
      { hanzi: "团队", pinyin: "tuánduì", pos: "N", meaning: "team" },
      { hanzi: "竞技", pinyin: "jìngjì", pos: "N", meaning: "competition; athletic contest" },
      { hanzi: "玩家", pinyin: "wánjiā", pos: "N", meaning: "player (of video games)" },
      { hanzi: "移动端", pinyin: "yídòng duān", pos: "NP", meaning: "mobile terminal; mobile end" },
      { hanzi: "动力", pinyin: "dònglì", pos: "N", meaning: "power; dynamics" },
      { hanzi: "腾讯游戏", pinyin: "Téngxùn Yóuxì", pos: "PN", meaning: "Tencent Games" },
      { hanzi: "网易游戏", pinyin: "Wǎngyì Yóuxì", pos: "PN", meaning: "NetEase Games" },
      { hanzi: "完美世界", pinyin: "Wánměi Shìjiè", pos: "PN", meaning: "Perfect World" },
      { hanzi: "王者荣耀", pinyin: "Wángzhě Róngyào", pos: "PN", meaning: "Honor of Kings" },
      { hanzi: "和平精英", pinyin: "Hépíng Jīngyīng", pos: "PN", meaning: "Game for Peace" },
    ],
  },
  {
    id: "l10-vocab2",
    title: "Text 2 vocabulary",
    audio: "/audio/lesson_10_text_2_vocab.mp3",
    items: [
      { hanzi: "话题", pinyin: "huàtí", pos: "N", meaning: "(conversation) topic" },
      { hanzi: "青少年", pinyin: "qīngshàonián", pos: "N", meaning: "youth; teenager" },
      { hanzi: "在于", pinyin: "zài yú", pos: "VP", meaning: "to lie in; to depend on" },
      { hanzi: "引导", pinyin: "yǐndǎo", pos: "N/V", meaning: "guidance; to guide; to lead" },
      { hanzi: "放松", pinyin: "fàngsōng", pos: "V", meaning: "to relax" },
      { hanzi: "甚至", pinyin: "shènzhì", pos: "Adv", meaning: "even; to the extent that" },
      { hanzi: "反应", pinyin: "fǎnyìng", pos: "N/V", meaning: "reaction; to react" },
      { hanzi: "合作", pinyin: "hézuò", pos: "N/V", meaning: "cooperation; to cooperate" },
      { hanzi: "意识", pinyin: "yìshi", pos: "N", meaning: "consciousness; awareness" },
      { hanzi: "上瘾", pinyin: "shàngyǐn", pos: "V", meaning: "to become addicted" },
      { hanzi: "暴力", pinyin: "bàolì", pos: "A/N", meaning: "violent; violence" },
      { hanzi: "成长", pinyin: "chéngzhǎng", pos: "N/V", meaning: "growth; to grow" },
      { hanzi: "行为", pinyin: "xíngwéi", pos: "N", meaning: "behavior" },
      { hanzi: "合理", pinyin: "hélǐ", pos: "A", meaning: "reasonable" },
      { hanzi: "安排", pinyin: "ānpái", pos: "N/V", meaning: "arrangement; to arrange" },
      { hanzi: "养成", pinyin: "yǎngchéng", pos: "V", meaning: "to cultivate" },
      { hanzi: "良好", pinyin: "liánghǎo", pos: "A", meaning: "good; fine" },
    ],
  },
];

const lesson10Tasks: Task[] = [
  {
    id: "l10-t1",
    type: "speedrun",
    mode: "audio-to-hanzi",
    prompt: "Listen and type the word you hear",
    pinyin: "wǎng luò yóu xì",
    answer: "网络游戏",
    translation: "online games",
    audio: "/audio/lesson_10_text_1_vocab.mp3",
    hint: "wǎng luò yóu xì — the central topic of this lesson.",
  },
  {
    id: "l10-t2",
    type: "battle",
    prompt: "Pick the correct word for the gap",
    sentenceBefore: "对于青少年来说，关键",
    sentenceAfter: "如何引导。",
    options: [
      { hanzi: "在于", pinyin: "zài yú", meaning: "lies in; depends on" },
      { hanzi: "因为", pinyin: "yīnwèi", meaning: "because" },
      { hanzi: "由于", pinyin: "yóuyú", meaning: "due to" },
    ],
    correctIndex: 0,
    translation: "For young people, the key lies in how you guide them.",
    hint: "Pattern: 关键在于… — 'the key lies in…'. Formal/written register.",
  },
  {
    id: "l10-t3",
    type: "constructor",
    prompt: "Drag the blocks — 'After many years of development, China has become one of the largest online gaming markets.'",
    blocks: ["经过", "多年的发展", "中国", "已成为", "最大的网络游戏市场之一"],
    answer: ["经过", "多年的发展", "中国", "已成为", "最大的网络游戏市场之一"],
    pinyin: "Jīngguò duō nián de fāzhǎn, Zhōngguó yǐ chéngwéi zuì dà de wǎngluò yóuxì shìchǎng zhī yī.",
    translation: "After many years of development, China has become one of the largest online gaming markets.",
    hint: "Pattern: 经过 + duration + 的 + N — 'after a process of…'. 之一 = 'one of'.",
  },
  {
    id: "l10-t4",
    type: "matching",
    prompt: "Match each game/company to its English name",
    pairs: [
      { left: "👑", leftLabel: "Honor of Kings", right: "王者荣耀" },
      { left: "🪖", leftLabel: "Game for Peace", right: "和平精英" },
      { left: "🐉", leftLabel: "Jade Dynasty", right: "诛仙" },
      { left: "🎮", leftLabel: "Tencent Games", right: "腾讯游戏" },
      { left: "🕸️", leftLabel: "NetEase Games", right: "网易游戏" },
      { left: "🌏", leftLabel: "Perfect World", right: "完美世界" },
    ],
  },
  {
    id: "l10-t5",
    type: "tone",
    prompt: "Tap the correct tone for each syllable of 虚拟",
    word: "虚拟",
    translation: "virtual",
    syllables: [
      { base: "xu", correctTone: 1 },
      { base: "ni", correctTone: 3 },
    ],
  },
  {
    id: "l10-t6",
    type: "intuition",
    prompt: "Fix the word order — 'These game types each have their own features.'",
    brokenSentence: ["各有各的特色", "这些游戏类型", "和玩法"],
    correctOrder: [1, 0, 2],
    translation: "These game types each have their own features and gameplay.",
    hint: "Pattern: Subject + 各有各的 + N — 'each has its own…'.",
  },
  {
    id: "l10-t7",
    type: "simulation",
    prompt: "Karen asks about the bad effects of gaming. Reply naturally as teacher Li.",
    npcMessage: "那网游对青少年不好的影响是什么呢？",
    npcPinyin: "Nà wǎng yóu duì qīngshàonián bù hǎo de yǐngxiǎng shì shénme ne?",
    npcTranslation: "So what are the bad effects of online games on young people?",
    options: [
      { hanzi: "网游容易让青少年上瘾，影响他们的学习和生活。而且，有些游戏内容有暴力，对成长没有好处。", pinyin: "Wǎng yóu róngyi ràng qīngshàonián shàngyǐn, yǐngxiǎng tāmen de xuéxí hé shēnghuó. Érqiě, yǒu xiē yóuxì nèiróng yǒu bàolì, duì chéngzhǎng méiyǒu hǎochù.", correct: true, reply: "原来如此，谢谢老师！" },
      { hanzi: "网游能提高反应能力和团队合作意识。", pinyin: "Wǎng yóu néng tígāo fǎnyìng nénglì hé tuánduì hézuò yìshi.", correct: false },
      { hanzi: "中国是最大的网络游戏市场之一。", pinyin: "Zhōngguó shì zuì dà de wǎngluò yóuxì shìchǎng zhī yī.", correct: false },
    ],
  },
  {
    id: "l10-t8",
    type: "synthesis",
    prompt: "Write 3+ sentences about online gaming, using each item below.",
    required: ["网络游戏", "关键在于", "经过…的发展"],
    minSentences: 3,
    retroWords: ["虚拟世界", "玩家", "上瘾", "团队合作", "引导", "甚至"],
  },
];

const lesson10Recap: Recap = {
  takeaways: [
    "网络游戏 — online games: connect 服务器 (server) via 网络, play in 虚拟世界 with 成就感.",
    "Pattern: 经过 + duration/process + 的 + N — 'after / through…'. 经过多年的发展.",
    "Pattern: …之一 — 'one of…'. 最大的市场之一.",
    "Pattern: 各有各的 + N — 'each has its own…'. 各有各的特色和玩法.",
    "Pattern: 关键在于… — formal 'the key lies in…'. 关键在于如何引导.",
    "甚至 — even; to the extent that. Used after a stronger case in a series.",
    "另外 — in addition (paired with 也/还). 以及 — as well as (formal list connector).",
    "Companies & games: 腾讯游戏 · 网易游戏 · 完美世界 · 王者荣耀 · 和平精英 · 诛仙.",
  ],
  keyWords: ["网络游戏", "虚拟世界", "玩家", "经过…的发展", "之一", "关键在于", "各有各的", "甚至"],
};

// ───────────────────────────────────────────────────────────────────────────

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "电脑打中文",
    titleEn: "Typing Chinese on Computers",
    theme: "Input Methods",
    status: "available",
    dialogues: lesson1Dialogues,
    vocabulary: lesson1Vocab,
    tasks: lesson1Tasks,
    recap: lesson1Recap,
  },
  {
    id: 2,
    title: "电子邮件",
    titleEn: "Email",
    theme: "Digital correspondence",
    status: "available",
    dialogues: lesson2Dialogues,
    vocabulary: lesson2Vocab,
    tasks: lesson2Tasks,
    recap: lesson2Recap,
  },
  {
    id: 3,
    title: "智能手机",
    titleEn: "Smartphones",
    theme: "Mobile life",
    status: "available",
    dialogues: lesson3Dialogues,
    vocabulary: lesson3Vocab,
    tasks: lesson3Tasks,
    recap: lesson3Recap,
  },
  {
    id: 4,
    title: "社交媒体",
    titleEn: "Social Media",
    theme: "Networks & feeds",
    status: "available",
    dialogues: lesson4Dialogues,
    vocabulary: lesson4Vocab,
    tasks: lesson4Tasks,
    recap: lesson4Recap,
  },
  {
    id: 5,
    title: "机器翻译",
    titleEn: "Machine Translation",
    theme: "MT & AI",
    status: "available",
    dialogues: lesson5Dialogues,
    vocabulary: lesson5Vocab,
    tasks: lesson5Tasks,
    recap: lesson5Recap,
  },
  {
    id: 6,
    title: "电子商务",
    titleEn: "E-Commerce",
    theme: "Online shopping",
    status: "available",
    dialogues: lesson6Dialogues,
    vocabulary: lesson6Vocab,
    tasks: lesson6Tasks,
    recap: lesson6Recap,
  },
  {
    id: 7,
    title: "网络文学",
    titleEn: "Internet Literature",
    theme: "Online fiction",
    status: "available",
    dialogues: lesson7Dialogues,
    vocabulary: lesson7Vocab,
    tasks: lesson7Tasks,
    recap: lesson7Recap,
  },
  {
    id: 8,
    title: "人工智能聊天机器人",
    titleEn: "AI Chatbot",
    theme: "Conversational AI",
    status: "available",
    dialogues: lesson8Dialogues,
    vocabulary: lesson8Vocab,
    tasks: lesson8Tasks,
    recap: lesson8Recap,
  },
  {
    id: 9,
    title: "网络视频",
    titleEn: "Online Videos",
    theme: "Streaming culture",
    status: "available",
    dialogues: lesson9Dialogues,
    vocabulary: lesson9Vocab,
    tasks: lesson9Tasks,
    recap: lesson9Recap,
  },
  {
    id: 10,
    title: "网络游戏",
    titleEn: "Online Gaming",
    theme: "Gaming worlds",
    status: "available",
    dialogues: lesson10Dialogues,
    vocabulary: lesson10Vocab,
    tasks: lesson10Tasks,
    recap: lesson10Recap,
  },
];
