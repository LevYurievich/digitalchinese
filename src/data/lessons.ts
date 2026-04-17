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
  { id: 3, title: "智能手机", titleEn: "Smartphones", theme: "Mobile life", status: "locked" },
  { id: 4, title: "社交媒体", titleEn: "Social Media", theme: "Networks & feeds", status: "locked" },
  { id: 5, title: "机器翻译", titleEn: "Machine Translation", theme: "MT & AI", status: "locked" },
  { id: 6, title: "电子商务", titleEn: "E-Commerce", theme: "Online shopping", status: "locked" },
  { id: 7, title: "网络文学", titleEn: "Internet Literature", theme: "Online fiction", status: "locked" },
  { id: 8, title: "人工智能聊天机器人", titleEn: "AI Chatbot", theme: "Conversational AI", status: "locked" },
  { id: 9, title: "网络视频", titleEn: "Online Videos", theme: "Streaming culture", status: "locked" },
  { id: 10, title: "网络游戏", titleEn: "Online Gaming", theme: "Gaming worlds", status: "locked" },
];
