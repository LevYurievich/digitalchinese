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
  { id: 7, title: "网络文学", titleEn: "Internet Literature", theme: "Online fiction", status: "locked" },
  { id: 8, title: "人工智能聊天机器人", titleEn: "AI Chatbot", theme: "Conversational AI", status: "locked" },
  { id: 9, title: "网络视频", titleEn: "Online Videos", theme: "Streaming culture", status: "locked" },
  { id: 10, title: "网络游戏", titleEn: "Online Gaming", theme: "Gaming worlds", status: "locked" },
];
