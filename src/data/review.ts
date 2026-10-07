import type { VocabItem } from "./lessons";

// 300 most frequent words across all lessons, ordered by frequency
export const reviewWords: (Pick<VocabItem, "hanzi" | "pinyin" | "meaning"> & { ru: string; lesson: number })[] = [
 {
  "hanzi": "其",
  "pinyin": "qí",
  "meaning": "his; her; its; their",
  "ru": "его; её; их",
  "lesson": 8
 },
 {
  "hanzi": "于",
  "pinyin": "yú",
  "meaning": "in; at",
  "ru": "в; на (о времени и месте)",
  "lesson": 4
 },
 {
  "hanzi": "通过",
  "pinyin": "tōngguò",
  "meaning": "by means of; through; via",
  "ru": "через; посредством",
  "lesson": 6
 },
 {
  "hanzi": "进行",
  "pinyin": "jìnxíng",
  "meaning": "to proceed; to carry out",
  "ru": "проводить; осуществлять",
  "lesson": 4
 },
 {
  "hanzi": "提供",
  "pinyin": "tígōng",
  "meaning": "to provide",
  "ru": "предоставлять",
  "lesson": 2
 },
 {
  "hanzi": "用户",
  "pinyin": "yònghù",
  "meaning": "user",
  "ru": "пользователь",
  "lesson": 1
 },
 {
  "hanzi": "内容",
  "pinyin": "nèiróng",
  "meaning": "content",
  "ru": "содержание; контент",
  "lesson": 4
 },
 {
  "hanzi": "服务",
  "pinyin": "fúwù",
  "meaning": "service; to serve",
  "ru": "услуга; обслуживать",
  "lesson": 2
 },
 {
  "hanzi": "企业",
  "pinyin": "qǐyè",
  "meaning": "enterprise; corporation",
  "ru": "компания; предприятие",
  "lesson": 6
 },
 {
  "hanzi": "丰富",
  "pinyin": "fēngfù",
  "meaning": "rich; abundant",
  "ru": "богатый; обильный",
  "lesson": 4
 },
 {
  "hanzi": "方面",
  "pinyin": "fāngmiàn",
  "meaning": "aspect; side",
  "ru": "аспект; сторона",
  "lesson": 5
 },
 {
  "hanzi": "技术",
  "pinyin": "jìshù",
  "meaning": "technology; technique",
  "ru": "технология; техника",
  "lesson": 5
 },
 {
  "hanzi": "市场",
  "pinyin": "shìchǎng",
  "meaning": "market",
  "ru": "рынок",
  "lesson": 3
 },
 {
  "hanzi": "平台",
  "pinyin": "píngtái",
  "meaning": "platform",
  "ru": "платформа",
  "lesson": 4
 },
 {
  "hanzi": "改变",
  "pinyin": "gǎibiàn",
  "meaning": "change; to change",
  "ru": "изменение; изменять",
  "lesson": 3
 },
 {
  "hanzi": "功能",
  "pinyin": "gōngnéng",
  "meaning": "function",
  "ru": "функция",
  "lesson": 3
 },
 {
  "hanzi": "应用",
  "pinyin": "yìngyòng",
  "meaning": "app; to apply",
  "ru": "приложение; применять",
  "lesson": 3
 },
 {
  "hanzi": "传统",
  "pinyin": "chuántǒng",
  "meaning": "traditional; tradition",
  "ru": "традиция; традиционный",
  "lesson": 9
 },
 {
  "hanzi": "产品",
  "pinyin": "chǎnpǐn",
  "meaning": "product",
  "ru": "продукт; товар",
  "lesson": 10
 },
 {
  "hanzi": "尤其",
  "pinyin": "yóuqí",
  "meaning": "especially; particularly",
  "ru": "особенно",
  "lesson": 9
 },
 {
  "hanzi": "信息",
  "pinyin": "xìnxī",
  "meaning": "information",
  "ru": "информация",
  "lesson": 8
 },
 {
  "hanzi": "支持",
  "pinyin": "zhīchí",
  "meaning": "support; to support",
  "ru": "поддержка; поддерживать",
  "lesson": 5
 },
 {
  "hanzi": "发布",
  "pinyin": "fābù",
  "meaning": "to post; to publish",
  "ru": "публиковать; размещать",
  "lesson": 4
 },
 {
  "hanzi": "创新",
  "pinyin": "chuàngxīn",
  "meaning": "innovation; to innovate",
  "ru": "инновация; внедрять новое",
  "lesson": 7
 },
 {
  "hanzi": "消费",
  "pinyin": "xiāofèi",
  "meaning": "to consume; to spend",
  "ru": "потребление; расходовать",
  "lesson": 6
 },
 {
  "hanzi": "系统",
  "pinyin": "xìtǒng",
  "meaning": "system",
  "ru": "система",
  "lesson": 1
 },
 {
  "hanzi": "互动",
  "pinyin": "hùdòng",
  "meaning": "interaction; to interact",
  "ru": "взаимодействие",
  "lesson": 4
 },
 {
  "hanzi": "行业",
  "pinyin": "hángyè",
  "meaning": "industry; sector",
  "ru": "отрасль; сфера",
  "lesson": 6
 },
 {
  "hanzi": "影响",
  "pinyin": "yǐngxiǎng",
  "meaning": "influence; to influence",
  "ru": "влияние; влиять",
  "lesson": 7
 },
 {
  "hanzi": "交流",
  "pinyin": "jiāoliú",
  "meaning": "to exchange; communicate",
  "ru": "общаться; обмениваться",
  "lesson": 2
 },
 {
  "hanzi": "数据",
  "pinyin": "shùjù",
  "meaning": "data",
  "ru": "данные",
  "lesson": 5
 },
 {
  "hanzi": "互联网",
  "pinyin": "hùliánwǎng",
  "meaning": "internet",
  "ru": "интернет",
  "lesson": 5
 },
 {
  "hanzi": "特点",
  "pinyin": "tèdiǎn",
  "meaning": "feature; characteristic",
  "ru": "особенность",
  "lesson": 3
 },
 {
  "hanzi": "打造",
  "pinyin": "dǎzào",
  "meaning": "to forge; to create; to build",
  "ru": "создавать; выстраивать",
  "lesson": 8
 },
 {
  "hanzi": "理解",
  "pinyin": "lǐjiě",
  "meaning": "understanding; to understand",
  "ru": "понимание; понимать",
  "lesson": 7
 },
 {
  "hanzi": "获得",
  "pinyin": "huòdé",
  "meaning": "to acquire; to obtain",
  "ru": "получать; приобретать",
  "lesson": 10
 },
 {
  "hanzi": "合作",
  "pinyin": "hézuò",
  "meaning": "cooperation; to cooperate",
  "ru": "сотрудничество",
  "lesson": 10
 },
 {
  "hanzi": "普及",
  "pinyin": "pǔjí",
  "meaning": "widespread adoption; to popularize",
  "ru": "распространение; делать общедоступным",
  "lesson": 9
 },
 {
  "hanzi": "时代",
  "pinyin": "shídài",
  "meaning": "era; epoch",
  "ru": "эпоха; время",
  "lesson": 1
 },
 {
  "hanzi": "连接",
  "pinyin": "liánjiē",
  "meaning": "to connect",
  "ru": "соединять; подключать",
  "lesson": 10
 },
 {
  "hanzi": "类型",
  "pinyin": "lèixíng",
  "meaning": "type; form",
  "ru": "тип; вид",
  "lesson": 5
 },
 {
  "hanzi": "显示",
  "pinyin": "xiǎnshì",
  "meaning": "to display",
  "ru": "отображать; показывать",
  "lesson": 1
 },
 {
  "hanzi": "选择",
  "pinyin": "xuǎnzé",
  "meaning": "to choose",
  "ru": "выбирать; выбор",
  "lesson": 1
 },
 {
  "hanzi": "视频",
  "pinyin": "shìpín",
  "meaning": "video",
  "ru": "видео",
  "lesson": 3
 },
 {
  "hanzi": "分享",
  "pinyin": "fēnxiǎng",
  "meaning": "share; to share",
  "ru": "делиться",
  "lesson": 4
 },
 {
  "hanzi": "娱乐",
  "pinyin": "yúlè",
  "meaning": "entertainment",
  "ru": "развлечения",
  "lesson": 3
 },
 {
  "hanzi": "社交",
  "pinyin": "shèjiāo",
  "meaning": "social; social contact",
  "ru": "социальный; общение",
  "lesson": 3
 },
 {
  "hanzi": "在线",
  "pinyin": "zàixiàn",
  "meaning": "online",
  "ru": "онлайн; в сети",
  "lesson": 10
 },
 {
  "hanzi": "支付",
  "pinyin": "zhīfù",
  "meaning": "payment; to pay",
  "ru": "оплата; платить",
  "lesson": 4
 },
 {
  "hanzi": "物流",
  "pinyin": "wùliú",
  "meaning": "logistics",
  "ru": "логистика",
  "lesson": 6
 },
 {
  "hanzi": "效率",
  "pinyin": "xiàolǜ",
  "meaning": "efficiency",
  "ru": "эффективность",
  "lesson": 3
 },
 {
  "hanzi": "创作",
  "pinyin": "chuàngzuò",
  "meaning": "to create (literary works)",
  "ru": "создавать (произведения)",
  "lesson": 7
 },
 {
  "hanzi": "作者",
  "pinyin": "zuòzhě",
  "meaning": "author",
  "ru": "автор",
  "lesson": 7
 },
 {
  "hanzi": "读者",
  "pinyin": "dúzhě",
  "meaning": "reader",
  "ru": "читатель",
  "lesson": 7
 },
 {
  "hanzi": "评论",
  "pinyin": "pínglùn",
  "meaning": "comment; to comment",
  "ru": "комментарий; комментировать",
  "lesson": 7
 },
 {
  "hanzi": "传播",
  "pinyin": "chuánbō",
  "meaning": "to disseminate; to spread",
  "ru": "распространять",
  "lesson": 7
 },
 {
  "hanzi": "明星",
  "pinyin": "míngxīng",
  "meaning": "star; celebrity",
  "ru": "звезда; знаменитость",
  "lesson": 4
 },
 {
  "hanzi": "观众",
  "pinyin": "guānzhòng",
  "meaning": "audience",
  "ru": "зрители; аудитория",
  "lesson": 9
 },
 {
  "hanzi": "制作",
  "pinyin": "zhìzuò",
  "meaning": "to make; to produce",
  "ru": "производить; создавать",
  "lesson": 8
 },
 {
  "hanzi": "角色",
  "pinyin": "juésè",
  "meaning": "role; character",
  "ru": "роль; персонаж",
  "lesson": 10
 },
 {
  "hanzi": "剧情",
  "pinyin": "jùqíng",
  "meaning": "plot; storyline",
  "ru": "сюжет",
  "lesson": 9
 },
 {
  "hanzi": "经典",
  "pinyin": "jīngdiǎn",
  "meaning": "classic; classics",
  "ru": "классика; классический",
  "lesson": 10
 },
 {
  "hanzi": "作品",
  "pinyin": "zuòpǐn",
  "meaning": "(literary/artistic) work",
  "ru": "произведение",
  "lesson": 7
 },
 {
  "hanzi": "研发",
  "pinyin": "yánfā",
  "meaning": "to research and develop",
  "ru": "разрабатывать; НИОКР",
  "lesson": 5
 },
 {
  "hanzi": "分析",
  "pinyin": "fēnxī",
  "meaning": "analysis; to analyze",
  "ru": "анализ; анализировать",
  "lesson": 5
 },
 {
  "hanzi": "模型",
  "pinyin": "móxíng",
  "meaning": "model",
  "ru": "модель",
  "lesson": 8
 },
 {
  "hanzi": "网络",
  "pinyin": "wǎngluò",
  "meaning": "network; internet",
  "ru": "сеть",
  "lesson": 5
 },
 {
  "hanzi": "政府",
  "pinyin": "zhèngfǔ",
  "meaning": "government",
  "ru": "правительство",
  "lesson": 2
 },
 {
  "hanzi": "机构",
  "pinyin": "jīgòu",
  "meaning": "institution",
  "ru": "организация; учреждение",
  "lesson": 2
 },
 {
  "hanzi": "投资",
  "pinyin": "tóuzī",
  "meaning": "investment; to invest",
  "ru": "инвестиции; инвестировать",
  "lesson": 9
 },
 {
  "hanzi": "沟通",
  "pinyin": "gōutōng",
  "meaning": "to connect; to communicate",
  "ru": "общаться; налаживать контакт",
  "lesson": 1
 },
 {
  "hanzi": "表达",
  "pinyin": "biǎodá",
  "meaning": "expression; to express",
  "ru": "выражать; выражение",
  "lesson": 8
 },
 {
  "hanzi": "处理",
  "pinyin": "chǔlǐ",
  "meaning": "to deal with",
  "ru": "обрабатывать; разбираться",
  "lesson": 2
 },
 {
  "hanzi": "事务",
  "pinyin": "shìwù",
  "meaning": "matters; affairs",
  "ru": "дела; вопросы",
  "lesson": 2
 },
 {
  "hanzi": "查找",
  "pinyin": "cházhǎo",
  "meaning": "to search; to look up",
  "ru": "искать; находить",
  "lesson": 7
 },
 {
  "hanzi": "通话",
  "pinyin": "tōnghuà",
  "meaning": "to call; to communicate by phone",
  "ru": "звонок; разговор по телефону",
  "lesson": 3
 },
 {
  "hanzi": "屏幕",
  "pinyin": "píngmù",
  "meaning": "screen",
  "ru": "экран",
  "lesson": 1
 },
 {
  "hanzi": "键盘",
  "pinyin": "jiànpán",
  "meaning": "keyboard",
  "ru": "клавиатура",
  "lesson": 1
 },
 {
  "hanzi": "点击",
  "pinyin": "diǎnjī",
  "meaning": "to click; to tap",
  "ru": "нажимать; кликать",
  "lesson": 1
 },
 {
  "hanzi": "打开",
  "pinyin": "dǎkāi",
  "meaning": "to open; to turn on",
  "ru": "открывать; включать",
  "lesson": 1
 },
 {
  "hanzi": "设置",
  "pinyin": "shèzhì",
  "meaning": "settings; to set up",
  "ru": "настройки; устанавливать",
  "lesson": 1
 },
 {
  "hanzi": "选项",
  "pinyin": "xuǎnxiàng",
  "meaning": "option",
  "ru": "вариант; опция",
  "lesson": 1
 },
 {
  "hanzi": "安装",
  "pinyin": "ānzhuāng",
  "meaning": "to install",
  "ru": "устанавливать",
  "lesson": 1
 },
 {
  "hanzi": "下载",
  "pinyin": "xiàzǎi",
  "meaning": "to download",
  "ru": "скачивать",
  "lesson": 1
 },
 {
  "hanzi": "更新",
  "pinyin": "gēngxīn",
  "meaning": "to renew; to update",
  "ru": "обновлять",
  "lesson": 7
 },
 {
  "hanzi": "切换",
  "pinyin": "qiēhuàn",
  "meaning": "to switch",
  "ru": "переключать",
  "lesson": 1
 },
 {
  "hanzi": "添加",
  "pinyin": "tiānjiā",
  "meaning": "to add",
  "ru": "добавлять",
  "lesson": 1
 },
 {
  "hanzi": "比较",
  "pinyin": "bǐjiào",
  "meaning": "to compare; relatively",
  "ru": "сравнивать; сравнительно",
  "lesson": 5
 },
 {
  "hanzi": "建议",
  "pinyin": "jiànyì",
  "meaning": "suggestion; to suggest",
  "ru": "совет; предлагать",
  "lesson": 5
 },
 {
  "hanzi": "需求",
  "pinyin": "xūqiú",
  "meaning": "needs; demand",
  "ru": "потребности; спрос",
  "lesson": 5
 },
 {
  "hanzi": "继续",
  "pinyin": "jìxù",
  "meaning": "to continue",
  "ru": "продолжать",
  "lesson": 6
 },
 {
  "hanzi": "愿景",
  "pinyin": "yuànjǐng",
  "meaning": "vision; aspiration",
  "ru": "видение; устремление",
  "lesson": 8
 },
 {
  "hanzi": "规则",
  "pinyin": "guīzé",
  "meaning": "rule; regulation",
  "ru": "правило",
  "lesson": 5
 },
 {
  "hanzi": "结构",
  "pinyin": "jiégòu",
  "meaning": "structure",
  "ru": "структура",
  "lesson": 1
 },
 {
  "hanzi": "组成",
  "pinyin": "zǔchéng",
  "meaning": "to form; to constitute",
  "ru": "составлять; образовывать",
  "lesson": 7
 },
 {
  "hanzi": "部分",
  "pinyin": "bùfen",
  "meaning": "part",
  "ru": "часть",
  "lesson": 7
 },
 {
  "hanzi": "种类",
  "pinyin": "zhǒnglèi",
  "meaning": "type; kind; category",
  "ru": "вид; категория",
  "lesson": 6
 },
 {
  "hanzi": "稳定",
  "pinyin": "wěndìng",
  "meaning": "stable",
  "ru": "стабильный",
  "lesson": 3
 },
 {
  "hanzi": "相关",
  "pinyin": "xiāngguān",
  "meaning": "related; relevant",
  "ru": "связанный; относящийся к делу",
  "lesson": 6
 },
 {
  "hanzi": "差异",
  "pinyin": "chāyì",
  "meaning": "difference",
  "ru": "различие; разница",
  "lesson": 2
 },
 {
  "hanzi": "独特",
  "pinyin": "dútè",
  "meaning": "unique; distinctive",
  "ru": "уникальный",
  "lesson": 8
 },
 {
  "hanzi": "群体",
  "pinyin": "qúntǐ",
  "meaning": "community; group",
  "ru": "группа; сообщество",
  "lesson": 7
 },
 {
  "hanzi": "团队",
  "pinyin": "tuánduì",
  "meaning": "team",
  "ru": "команда",
  "lesson": 10
 },
 {
  "hanzi": "伙伴",
  "pinyin": "huǒbàn",
  "meaning": "partner; companion",
  "ru": "партнёр; напарник",
  "lesson": 8
 },
 {
  "hanzi": "国际",
  "pinyin": "guójì",
  "meaning": "international",
  "ru": "международный",
  "lesson": 6
 },
 {
  "hanzi": "材料",
  "pinyin": "cáiliào",
  "meaning": "material",
  "ru": "материал",
  "lesson": 5
 },
 {
  "hanzi": "商品",
  "pinyin": "shāngpǐn",
  "meaning": "commodity; goods",
  "ru": "товар",
  "lesson": 6
 },
 {
  "hanzi": "交易",
  "pinyin": "jiāoyì",
  "meaning": "transaction; business deal",
  "ru": "сделка; торговая операция",
  "lesson": 6
 },
 {
  "hanzi": "商业",
  "pinyin": "shāngyè",
  "meaning": "business; trade; commerce",
  "ru": "бизнес; торговля",
  "lesson": 6
 },
 {
  "hanzi": "品牌",
  "pinyin": "pǐnpái",
  "meaning": "brand",
  "ru": "бренд; марка",
  "lesson": 3
 },
 {
  "hanzi": "渠道",
  "pinyin": "qúdào",
  "meaning": "channel; means",
  "ru": "канал",
  "lesson": 9
 },
 {
  "hanzi": "生产",
  "pinyin": "shēngchǎn",
  "meaning": "production; to produce",
  "ru": "производство; производить",
  "lesson": 3
 },
 {
  "hanzi": "输入法",
  "pinyin": "shūrùfǎ",
  "meaning": "input method",
  "ru": "способ ввода иероглифов",
  "lesson": 1
 },
 {
  "hanzi": "数字化",
  "pinyin": "shùzìhuà",
  "meaning": "digital; to digitize",
  "ru": "цифровизация; оцифровывать",
  "lesson": 1
 },
 {
  "hanzi": "使用",
  "pinyin": "shǐyòng",
  "meaning": "to use",
  "ru": "использовать",
  "lesson": 1
 },
 {
  "hanzi": "移动设备",
  "pinyin": "yídòng shèbèi",
  "meaning": "mobile device",
  "ru": "мобильное устройство",
  "lesson": 1
 },
 {
  "hanzi": "根据",
  "pinyin": "gēnjù",
  "meaning": "according to",
  "ru": "согласно; в соответствии с",
  "lesson": 1
 },
 {
  "hanzi": "适合",
  "pinyin": "shìhé",
  "meaning": "to suit; to fit",
  "ru": "подходить",
  "lesson": 1
 },
 {
  "hanzi": "了解",
  "pinyin": "liáojiě",
  "meaning": "to understand",
  "ru": "узнавать; понимать",
  "lesson": 1
 },
 {
  "hanzi": "现代",
  "pinyin": "xiàndài",
  "meaning": "modern",
  "ru": "современный",
  "lesson": 1
 },
 {
  "hanzi": "字体",
  "pinyin": "zìtǐ",
  "meaning": "font",
  "ru": "шрифт",
  "lesson": 1
 },
 {
  "hanzi": "简体",
  "pinyin": "jiǎntǐ",
  "meaning": "simplified Chinese",
  "ru": "упрощённые иероглифы",
  "lesson": 1
 },
 {
  "hanzi": "任务栏",
  "pinyin": "rènwù lán",
  "meaning": "taskbar",
  "ru": "панель задач",
  "lesson": 1
 },
 {
  "hanzi": "图标",
  "pinyin": "túbiāo",
  "meaning": "icon",
  "ru": "значок; иконка",
  "lesson": 1
 },
 {
  "hanzi": "电子邮件",
  "pinyin": "diànzǐ yóujiàn",
  "meaning": "email",
  "ru": "электронная почта",
  "lesson": 2
 },
 {
  "hanzi": "回答",
  "pinyin": "huídá",
  "meaning": "to answer",
  "ru": "отвечать; ответ",
  "lesson": 2
 },
 {
  "hanzi": "有关",
  "pinyin": "yǒuguān",
  "meaning": "related to; concerning",
  "ru": "касающийся; относящийся к",
  "lesson": 2
 },
 {
  "hanzi": "联系",
  "pinyin": "liánxì",
  "meaning": "to contact",
  "ru": "связываться; контакт",
  "lesson": 2
 },
 {
  "hanzi": "广泛",
  "pinyin": "guǎngfàn",
  "meaning": "widespread; widely",
  "ru": "широкий; широко",
  "lesson": 2
 },
 {
  "hanzi": "邮箱",
  "pinyin": "yóuxiāng",
  "meaning": "mailbox",
  "ru": "почтовый ящик",
  "lesson": 2
 },
 {
  "hanzi": "情况",
  "pinyin": "qíngkuàng",
  "meaning": "situation",
  "ru": "ситуация; обстоятельства",
  "lesson": 2
 },
 {
  "hanzi": "据我所知",
  "pinyin": "jù wǒ suǒ zhī",
  "meaning": "as far as I know",
  "ru": "насколько я знаю",
  "lesson": 2
 },
 {
  "hanzi": "受到",
  "pinyin": "shòudào",
  "meaning": "to receive; to be subject to",
  "ru": "подвергаться; получать",
  "lesson": 2
 },
 {
  "hanzi": "限制",
  "pinyin": "xiànzhì",
  "meaning": "to limit; restriction",
  "ru": "ограничивать; ограничение",
  "lesson": 2
 },
 {
  "hanzi": "包括",
  "pinyin": "bāokuò",
  "meaning": "to include",
  "ru": "включать (в себя)",
  "lesson": 2
 },
 {
  "hanzi": "账户",
  "pinyin": "zhànghù",
  "meaning": "account",
  "ru": "аккаунт; счёт",
  "lesson": 2
 },
 {
  "hanzi": "注册",
  "pinyin": "zhùcè",
  "meaning": "to register",
  "ru": "регистрироваться",
  "lesson": 2
 },
 {
  "hanzi": "验证",
  "pinyin": "yànzhèng",
  "meaning": "to verify",
  "ru": "подтверждать; проверять",
  "lesson": 2
 },
 {
  "hanzi": "开头",
  "pinyin": "kāitóu",
  "meaning": "beginning",
  "ru": "начало",
  "lesson": 2
 },
 {
  "hanzi": "礼貌",
  "pinyin": "lǐmào",
  "meaning": "polite",
  "ru": "вежливый; вежливость",
  "lesson": 2
 },
 {
  "hanzi": "用语",
  "pinyin": "yòngyǔ",
  "meaning": "expression; terminology",
  "ru": "выражение; терминология",
  "lesson": 2
 },
 {
  "hanzi": "直接",
  "pinyin": "zhíjiē",
  "meaning": "direct; directly",
  "ru": "прямой; напрямую",
  "lesson": 2
 },
 {
  "hanzi": "致以",
  "pinyin": "zhìyǐ",
  "meaning": "to extend; to offer",
  "ru": "выражать; адресовать",
  "lesson": 2
 },
 {
  "hanzi": "问候",
  "pinyin": "wènhòu",
  "meaning": "greeting",
  "ru": "приветствие; приветствовать",
  "lesson": 2
 },
 {
  "hanzi": "一切",
  "pinyin": "yīqiè",
  "meaning": "everything",
  "ru": "всё",
  "lesson": 2
 },
 {
  "hanzi": "顺利",
  "pinyin": "shùnlì",
  "meaning": "smooth",
  "ru": "гладко; успешно",
  "lesson": 2
 },
 {
  "hanzi": "尽量",
  "pinyin": "jǐnliàng",
  "meaning": "to the best of one's ability",
  "ru": "по возможности",
  "lesson": 2
 },
 {
  "hanzi": "面子",
  "pinyin": "miànzi",
  "meaning": "face; reputation",
  "ru": "лицо; репутация",
  "lesson": 2
 },
 {
  "hanzi": "提醒",
  "pinyin": "tíxǐng",
  "meaning": "to remind",
  "ru": "напоминать",
  "lesson": 2
 },
 {
  "hanzi": "误解",
  "pinyin": "wùjiě",
  "meaning": "misunderstanding",
  "ru": "недоразумение; неверно понять",
  "lesson": 2
 },
 {
  "hanzi": "智能手机",
  "pinyin": "zhìnéng shǒujī",
  "meaning": "smartphone",
  "ru": "смартфон",
  "lesson": 3
 },
 {
  "hanzi": "始于",
  "pinyin": "shǐ yú",
  "meaning": "to start from; date from",
  "ru": "начинаться с; восходить к",
  "lesson": 3
 },
 {
  "hanzi": "年代",
  "pinyin": "niándài",
  "meaning": "decade",
  "ru": "десятилетие; годы",
  "lesson": 3
 },
 {
  "hanzi": "科技",
  "pinyin": "kējì",
  "meaning": "science and technology",
  "ru": "наука и техника",
  "lesson": 3
 },
 {
  "hanzi": "快速",
  "pinyin": "kuàisù",
  "meaning": "fast; rapid",
  "ru": "быстрый; быстро",
  "lesson": 3
 },
 {
  "hanzi": "拥有",
  "pinyin": "yōngyǒu",
  "meaning": "to possess; to own",
  "ru": "владеть; иметь",
  "lesson": 3
 },
 {
  "hanzi": "强大",
  "pinyin": "qiángdà",
  "meaning": "strong; powerful",
  "ru": "мощный; сильный",
  "lesson": 3
 },
 {
  "hanzi": "触摸屏",
  "pinyin": "chùmō píng",
  "meaning": "touch screen",
  "ru": "сенсорный экран",
  "lesson": 3
 },
 {
  "hanzi": "高清摄像",
  "pinyin": "gāoqīng shèxiàng",
  "meaning": "HD camera",
  "ru": "камера высокого разрешения",
  "lesson": 3
 },
 {
  "hanzi": "代",
  "pinyin": "dài",
  "meaning": "generation",
  "ru": "поколение",
  "lesson": 3
 },
 {
  "hanzi": "进入",
  "pinyin": "jìnrù",
  "meaning": "to enter",
  "ru": "входить; проникать",
  "lesson": 3
 },
 {
  "hanzi": "开发",
  "pinyin": "kāifā",
  "meaning": "to develop",
  "ru": "разрабатывать; развивать",
  "lesson": 3
 },
 {
  "hanzi": "操作",
  "pinyin": "cāozuò",
  "meaning": "operation; to operate",
  "ru": "управлять; операция",
  "lesson": 3
 },
 {
  "hanzi": "知名",
  "pinyin": "zhīmíng",
  "meaning": "well known; famous",
  "ru": "известный",
  "lesson": 3
 },
 {
  "hanzi": "著称",
  "pinyin": "zhùchēng",
  "meaning": "well known; famous (for)",
  "ru": "славиться; быть известным",
  "lesson": 3
 },
 {
  "hanzi": "灵活多样",
  "pinyin": "línghuó duōyàng",
  "meaning": "flexible and diverse",
  "ru": "гибкий и разнообразный",
  "lesson": 3
 },
 {
  "hanzi": "增加",
  "pinyin": "zēngjiā",
  "meaning": "to increase; to add",
  "ru": "увеличивать; прибавлять",
  "lesson": 3
 },
 {
  "hanzi": "角落",
  "pinyin": "jiǎoluò",
  "meaning": "corner",
  "ru": "угол",
  "lesson": 3
 },
 {
  "hanzi": "通讯",
  "pinyin": "tōngxùn",
  "meaning": "communication",
  "ru": "связь; коммуникация",
  "lesson": 3
 },
 {
  "hanzi": "新闻",
  "pinyin": "xīnwén",
  "meaning": "news",
  "ru": "новости",
  "lesson": 3
 },
 {
  "hanzi": "场所",
  "pinyin": "chángsuǒ",
  "meaning": "place; site",
  "ru": "место; заведение",
  "lesson": 3
 },
 {
  "hanzi": "信号",
  "pinyin": "xìnhào",
  "meaning": "signal",
  "ru": "сигнал",
  "lesson": 3
 },
 {
  "hanzi": "运营商",
  "pinyin": "yùnyíng shāng",
  "meaning": "service provider; carrier",
  "ru": "оператор связи",
  "lesson": 3
 },
 {
  "hanzi": "优惠价",
  "pinyin": "yōuhuì jià",
  "meaning": "discount price",
  "ru": "льготная цена",
  "lesson": 3
 },
 {
  "hanzi": "流量",
  "pinyin": "liúliàng",
  "meaning": "mobile data",
  "ru": "мобильный трафик",
  "lesson": 3
 },
 {
  "hanzi": "套餐",
  "pinyin": "tàocān",
  "meaning": "mobile plan; package",
  "ru": "тарифный план; пакет",
  "lesson": 3
 },
 {
  "hanzi": "开户",
  "pinyin": "kāi hù",
  "meaning": "to open an account",
  "ru": "открывать счёт",
  "lesson": 3
 },
 {
  "hanzi": "营业厅",
  "pinyin": "yíngyè tīng",
  "meaning": "service hall; business office",
  "ru": "салон оператора связи",
  "lesson": 3
 },
 {
  "hanzi": "护照",
  "pinyin": "hùzhào",
  "meaning": "passport",
  "ru": "паспорт",
  "lesson": 3
 },
 {
  "hanzi": "学生证",
  "pinyin": "xuésheng zhèng",
  "meaning": "student ID",
  "ru": "студенческий билет",
  "lesson": 3
 },
 {
  "hanzi": "中国移动",
  "pinyin": "Zhōngguó Yídòng",
  "meaning": "China Mobile",
  "ru": "China Mobile («Китай мобайл»)",
  "lesson": 3
 },
 {
  "hanzi": "中国联通",
  "pinyin": "Zhōngguó Liántōng",
  "meaning": "China Unicom",
  "ru": "China Unicom («Китай юником»)",
  "lesson": 3
 },
 {
  "hanzi": "中国电信",
  "pinyin": "Zhōngguó Diànxìn",
  "meaning": "China Telecom",
  "ru": "China Telecom («Китай телеком»)",
  "lesson": 3
 },
 {
  "hanzi": "社交媒体",
  "pinyin": "shèjiāo méitǐ",
  "meaning": "social media",
  "ru": "социальные сети",
  "lesson": 4
 },
 {
  "hanzi": "想象",
  "pinyin": "xiǎngxiàng",
  "meaning": "imagination; to imagine",
  "ru": "воображение; представлять",
  "lesson": 4
 },
 {
  "hanzi": "从未",
  "pinyin": "cóng wèi",
  "meaning": "never",
  "ru": "никогда",
  "lesson": 4
 },
 {
  "hanzi": "接触",
  "pinyin": "jiēchù",
  "meaning": "to access; to get in touch with",
  "ru": "соприкасаться; контактировать",
  "lesson": 4
 },
 {
  "hanzi": "形式",
  "pinyin": "xíngshì",
  "meaning": "form; structure",
  "ru": "форма",
  "lesson": 4
 },
 {
  "hanzi": "主流",
  "pinyin": "zhǔliú",
  "meaning": "mainstream",
  "ru": "мейнстрим; основной поток",
  "lesson": 4
 },
 {
  "hanzi": "集",
  "pinyin": "jí",
  "meaning": "to gather; to integrate",
  "ru": "собирать; объединять",
  "lesson": 4
 },
 {
  "hanzi": "一体",
  "pinyin": "yìtǐ",
  "meaning": "an integral whole",
  "ru": "единое целое",
  "lesson": 4
 },
 {
  "hanzi": "必不可少",
  "pinyin": "bì bù kě shǎo",
  "meaning": "indispensable; essential",
  "ru": "незаменимый; необходимый",
  "lesson": 4
 },
 {
  "hanzi": "多媒体",
  "pinyin": "duōméitǐ",
  "meaning": "multimedia",
  "ru": "мультимедиа",
  "lesson": 4
 },
 {
  "hanzi": "网红",
  "pinyin": "wǎnghóng",
  "meaning": "influencer",
  "ru": "инфлюенсер; веб-знаменитость",
  "lesson": 4
 },
 {
  "hanzi": "集聚",
  "pinyin": "jíjù",
  "meaning": "to gather; to assemble",
  "ru": "собираться; скапливаться",
  "lesson": 4
 },
 {
  "hanzi": "短",
  "pinyin": "duǎn",
  "meaning": "short",
  "ru": "короткий",
  "lesson": 4
 },
 {
  "hanzi": "天堂",
  "pinyin": "tiāntáng",
  "meaning": "paradise; heaven",
  "ru": "рай",
  "lesson": 4
 },
 {
  "hanzi": "女性",
  "pinyin": "nǚxìng",
  "meaning": "female; woman",
  "ru": "женщина; женский",
  "lesson": 4
 },
 {
  "hanzi": "心得",
  "pinyin": "xīndé",
  "meaning": "insight",
  "ru": "наблюдения; личный опыт",
  "lesson": 4
 },
 {
  "hanzi": "美妆秘诀",
  "pinyin": "měi zhuāng mìjué",
  "meaning": "beauty / makeup tips",
  "ru": "секреты макияжа",
  "lesson": 4
 },
 {
  "hanzi": "社区",
  "pinyin": "shèqū",
  "meaning": "community",
  "ru": "сообщество",
  "lesson": 4
 },
 {
  "hanzi": "答案",
  "pinyin": "dá’àn",
  "meaning": "answer",
  "ru": "ответ",
  "lesson": 4
 },
 {
  "hanzi": "专家",
  "pinyin": "zhuānjiā",
  "meaning": "expert",
  "ru": "эксперт; специалист",
  "lesson": 4
 },
 {
  "hanzi": "活力",
  "pinyin": "huólì",
  "meaning": "vitality; energy",
  "ru": "жизненная энергия; бодрость",
  "lesson": 4
 },
 {
  "hanzi": "微信",
  "pinyin": "Wēixìn",
  "meaning": "WeChat",
  "ru": "WeChat («Вэйсинь»)",
  "lesson": 4
 },
 {
  "hanzi": "微博",
  "pinyin": "Wēibó",
  "meaning": "Weibo",
  "ru": "Weibo («Вэйбо»)",
  "lesson": 4
 },
 {
  "hanzi": "抖音",
  "pinyin": "Dǒuyīn",
  "meaning": "Douyin (TikTok CN)",
  "ru": "Доуинь (китайский TikTok)",
  "lesson": 4
 },
 {
  "hanzi": "快手",
  "pinyin": "Kuàishǒu",
  "meaning": "Kuaishou",
  "ru": "Куайшоу",
  "lesson": 4
 },
 {
  "hanzi": "小红书",
  "pinyin": "Xiǎohóngshū",
  "meaning": "Xiaohongshu (RED)",
  "ru": "Сяохуншу (RED)",
  "lesson": 4
 },
 {
  "hanzi": "知乎",
  "pinyin": "Zhīhū",
  "meaning": "Zhihu (Quora-like)",
  "ru": "Чжиху (аналог Quora)",
  "lesson": 4
 },
 {
  "hanzi": "建",
  "pinyin": "jiàn",
  "meaning": "to build; to set up",
  "ru": "создавать; основывать",
  "lesson": 4
 },
 {
  "hanzi": "群",
  "pinyin": "qún",
  "meaning": "group; crowd",
  "ru": "группа (чат)",
  "lesson": 4
 },
 {
  "hanzi": "右上角",
  "pinyin": "yòu shàng jiǎo",
  "meaning": "upper right corner",
  "ru": "правый верхний угол",
  "lesson": 4
 },
 {
  "hanzi": "加号",
  "pinyin": "jiāhào",
  "meaning": "plus sign",
  "ru": "знак «плюс»",
  "lesson": 4
 },
 {
  "hanzi": "发起",
  "pinyin": "fāqǐ",
  "meaning": "to initiate; to launch",
  "ru": "инициировать; запускать",
  "lesson": 4
 },
 {
  "hanzi": "通讯录",
  "pinyin": "tōngxùn lù",
  "meaning": "address book; contacts",
  "ru": "список контактов",
  "lesson": 4
 },
 {
  "hanzi": "邀请",
  "pinyin": "yāoqǐng",
  "meaning": "to invite",
  "ru": "приглашать; приглашение",
  "lesson": 4
 },
 {
  "hanzi": "改名",
  "pinyin": "gǎi míng",
  "meaning": "to change name",
  "ru": "переименовать",
  "lesson": 4
 },
 {
  "hanzi": "群主",
  "pinyin": "qún zhǔ",
  "meaning": "group owner; admin",
  "ru": "владелец группы; админ",
  "lesson": 4
 },
 {
  "hanzi": "群规",
  "pinyin": "qún guī",
  "meaning": "group rules",
  "ru": "правила группы",
  "lesson": 4
 },
 {
  "hanzi": "尊重",
  "pinyin": "zūnzhòng",
  "meaning": "to respect",
  "ru": "уважать",
  "lesson": 4
 },
 {
  "hanzi": "遵守",
  "pinyin": "zūnshǒu",
  "meaning": "to abide by; to comply with",
  "ru": "соблюдать",
  "lesson": 4
 },
 {
  "hanzi": "作为",
  "pinyin": "zuòwéi",
  "meaning": "as; being",
  "ru": "в качестве; являясь",
  "lesson": 4
 },
 {
  "hanzi": "机器翻译",
  "pinyin": "jīqì fānyì",
  "meaning": "machine translation",
  "ru": "машинный перевод",
  "lesson": 5
 },
 {
  "hanzi": "利用",
  "pinyin": "lìyòng",
  "meaning": "to utilize; to make use of",
  "ru": "использовать; задействовать",
  "lesson": 5
 },
 {
  "hanzi": "转换",
  "pinyin": "zhuǎnhuàn",
  "meaning": "to change; to transform",
  "ru": "преобразовывать; конвертировать",
  "lesson": 5
 },
 {
  "hanzi": "科学家",
  "pinyin": "kēxuéjiā",
  "meaning": "scientist",
  "ru": "учёный",
  "lesson": 5
 },
 {
  "hanzi": "词对词",
  "pinyin": "cí duì cí",
  "meaning": "word for word",
  "ru": "слово в слово",
  "lesson": 5
 },
 {
  "hanzi": "考虑",
  "pinyin": "kǎolǜ",
  "meaning": "consideration; to consider",
  "ru": "обдумывать; учитывать",
  "lesson": 5
 },
 {
  "hanzi": "整个",
  "pinyin": "zhěnggè",
  "meaning": "entire; whole",
  "ru": "весь; целый",
  "lesson": 5
 },
 {
  "hanzi": "上下文",
  "pinyin": "shàngxiàwén",
  "meaning": "context",
  "ru": "контекст",
  "lesson": 5
 },
 {
  "hanzi": "方法",
  "pinyin": "fāngfǎ",
  "meaning": "method",
  "ru": "метод; способ",
  "lesson": 5
 },
 {
  "hanzi": "原理",
  "pinyin": "yuánlǐ",
  "meaning": "principle; theory",
  "ru": "принцип",
  "lesson": 5
 },
 {
  "hanzi": "大致",
  "pinyin": "dàzhì",
  "meaning": "approximately; roughly",
  "ru": "примерно; приблизительно",
  "lesson": 5
 },
 {
  "hanzi": "分为",
  "pinyin": "fēn wéi",
  "meaning": "to divide into",
  "ru": "делиться на",
  "lesson": 5
 },
 {
  "hanzi": "基于",
  "pinyin": "jīyú",
  "meaning": "on the basis of",
  "ru": "на основе; на базе",
  "lesson": 5
 },
 {
  "hanzi": "统计",
  "pinyin": "tǒngjì",
  "meaning": "statistics; to count",
  "ru": "статистика; подсчитывать",
  "lesson": 5
 },
 {
  "hanzi": "大量",
  "pinyin": "dàliàng",
  "meaning": "large amount of",
  "ru": "большое количество",
  "lesson": 5
 },
 {
  "hanzi": "神经",
  "pinyin": "shénjīng",
  "meaning": "nerve; neural",
  "ru": "нервный; нерв",
  "lesson": 5
 },
 {
  "hanzi": "模仿",
  "pinyin": "mófǎng",
  "meaning": "imitation; to imitate",
  "ru": "подражать; имитация",
  "lesson": 5
 },
 {
  "hanzi": "人脑",
  "pinyin": "rén nǎo",
  "meaning": "human brain",
  "ru": "человеческий мозг",
  "lesson": 5
 },
 {
  "hanzi": "采用",
  "pinyin": "cǎiyòng",
  "meaning": "to adopt; to use",
  "ru": "принимать; использовать",
  "lesson": 5
 },
 {
  "hanzi": "优秀",
  "pinyin": "yōuxiù",
  "meaning": "outstanding; excellent",
  "ru": "отличный; превосходный",
  "lesson": 5
 },
 {
  "hanzi": "文本",
  "pinyin": "wénběn",
  "meaning": "text",
  "ru": "текст",
  "lesson": 5
 },
 {
  "hanzi": "图片",
  "pinyin": "túpiàn",
  "meaning": "picture; image",
  "ru": "картинка; изображение",
  "lesson": 5
 },
 {
  "hanzi": "值得",
  "pinyin": "zhídé",
  "meaning": "to deserve; to be worth",
  "ru": "стоить; заслуживать",
  "lesson": 5
 },
 {
  "hanzi": "注意",
  "pinyin": "zhùyì",
  "meaning": "attention; to pay attention",
  "ru": "внимание; обращать внимание",
  "lesson": 5
 },
 {
  "hanzi": "以便",
  "pinyin": "yǐbiàn",
  "meaning": "so that; in order to",
  "ru": "чтобы; для того чтобы",
  "lesson": 5
 },
 {
  "hanzi": "满足",
  "pinyin": "mǎnzú",
  "meaning": "to satisfy",
  "ru": "удовлетворять",
  "lesson": 5
 },
 {
  "hanzi": "谷歌翻译",
  "pinyin": "Gǔgē Fānyì",
  "meaning": "Google Translate",
  "ru": "Google Переводчик",
  "lesson": 5
 },
 {
  "hanzi": "微软翻译",
  "pinyin": "Wēiruǎn Fānyì",
  "meaning": "Microsoft Translator",
  "ru": "Microsoft Translator",
  "lesson": 5
 },
 {
  "hanzi": "百度翻译",
  "pinyin": "Bǎidù Fānyì",
  "meaning": "Baidu Translate",
  "ru": "Baidu Translate («Байду фаньи»)",
  "lesson": 5
 },
 {
  "hanzi": "有道翻译",
  "pinyin": "Yǒudào Fānyì",
  "meaning": "Youdao Translate",
  "ru": "Youdao Translate («Юдао фаньи»)",
  "lesson": 5
 },
 {
  "hanzi": "搜狗翻译",
  "pinyin": "Sōugǒu Fānyì",
  "meaning": "Sogou Translate",
  "ru": "Sogou Translate («Соугу фаньи»)",
  "lesson": 5
 },
 {
  "hanzi": "课堂报告",
  "pinyin": "kètáng bàogào",
  "meaning": "class presentation",
  "ru": "доклад на занятии",
  "lesson": 5
 },
 {
  "hanzi": "具体",
  "pinyin": "jùtǐ",
  "meaning": "concrete; specific",
  "ru": "конкретный; точный",
  "lesson": 5
 },
 {
  "hanzi": "译文",
  "pinyin": "yìwén",
  "meaning": "translated text; translation",
  "ru": "перевод (текст)",
  "lesson": 5
 },
 {
  "hanzi": "相同",
  "pinyin": "xiāngtóng",
  "meaning": "same; identical",
  "ru": "одинаковый; тот же",
  "lesson": 5
 },
 {
  "hanzi": "关键",
  "pinyin": "guānjiàn",
  "meaning": "crucial; key point",
  "ru": "ключевой; ключ",
  "lesson": 5
 },
 {
  "hanzi": "准确性",
  "pinyin": "zhǔnquèxìng",
  "meaning": "accuracy; correctness",
  "ru": "точность; правильность",
  "lesson": 5
 },
 {
  "hanzi": "可读性",
  "pinyin": "kědúxìng",
  "meaning": "readability",
  "ru": "читаемость; удобочитаемость",
  "lesson": 5
 },
 {
  "hanzi": "李老师",
  "pinyin": "Lǐ lǎoshī",
  "meaning": "Teacher Li",
  "ru": "учитель Ли",
  "lesson": 5
 },
 {
  "hanzi": "电子商务",
  "pinyin": "diànzǐ shāngwù",
  "meaning": "e-commerce",
  "ru": "электронная коммерция",
  "lesson": 6
 },
 {
  "hanzi": "简称",
  "pinyin": "jiǎnchēng",
  "meaning": "abbreviation; to abbreviate",
  "ru": "сокращение; для краткости",
  "lesson": 6
 },
 {
  "hanzi": "最初",
  "pinyin": "zuìchū",
  "meaning": "initial; initially; at first",
  "ru": "изначально; поначалу",
  "lesson": 6
 },
 {
  "hanzi": "逐渐",
  "pinyin": "zhújiàn",
  "meaning": "gradually",
  "ru": "постепенно",
  "lesson": 6
 },
 {
  "hanzi": "书籍",
  "pinyin": "shūjí",
  "meaning": "books",
  "ru": "книги",
  "lesson": 6
 },
 {
  "hanzi": "此外",
  "pinyin": "cǐwài",
  "meaning": "besides; in addition; moreover",
  "ru": "кроме того; к тому же",
  "lesson": 6
 },
 {
  "hanzi": "预订",
  "pinyin": "yùdìng",
  "meaning": "reservation; to book",
  "ru": "бронировать; заказывать",
  "lesson": 6
 },
 {
  "hanzi": "点餐",
  "pinyin": "diǎn cān",
  "meaning": "to order food",
  "ru": "заказывать еду",
  "lesson": 6
 },
 {
  "hanzi": "极大的",
  "pinyin": "jí dà de",
  "meaning": "enormous; maximum",
  "ru": "огромный; максимальный",
  "lesson": 6
 },
 {
  "hanzi": "便利",
  "pinyin": "biànlì",
  "meaning": "convenient; easy",
  "ru": "удобство; удобный",
  "lesson": 6
 },
 {
  "hanzi": "时空",
  "pinyin": "shíkōng",
  "meaning": "time and space",
  "ru": "пространство и время",
  "lesson": 6
 },
 {
  "hanzi": "随时随地",
  "pinyin": "suíshí suídì",
  "meaning": "anytime and anywhere",
  "ru": "в любое время и в любом месте",
  "lesson": 6
 },
 {
  "hanzi": "种类繁多",
  "pinyin": "zhǒnglèi fánduō",
  "meaning": "wide variety",
  "ru": "огромное разнообразие",
  "lesson": 6
 },
 {
  "hanzi": "消费者",
  "pinyin": "xiāofèizhě",
  "meaning": "consumer",
  "ru": "потребитель",
  "lesson": 6
 },
 {
  "hanzi": "多样化",
  "pinyin": "duōyànghuà",
  "meaning": "diverse; diversity",
  "ru": "разнообразие; делать разнообразным",
  "lesson": 6
 },
 {
  "hanzi": "喜好",
  "pinyin": "xǐhào",
  "meaning": "preference; to prefer",
  "ru": "предпочтение; симпатии",
  "lesson": 6
 },
 {
  "hanzi": "实现",
  "pinyin": "shíxiàn",
  "meaning": "to achieve; to realize",
  "ru": "осуществлять; реализовывать",
  "lesson": 6
 },
 {
  "hanzi": "个性化",
  "pinyin": "gèxìnghuà",
  "meaning": "personalized",
  "ru": "персонализация; индивидуальный",
  "lesson": 6
 },
 {
  "hanzi": "参与",
  "pinyin": "cānyù",
  "meaning": "to take part in",
  "ru": "участвовать",
  "lesson": 6
 },
 {
  "hanzi": "市场竞争",
  "pinyin": "shìchǎng jìngzhēng",
  "meaning": "market competition",
  "ru": "рыночная конкуренция",
  "lesson": 6
 },
 {
  "hanzi": "促进",
  "pinyin": "cùjìn",
  "meaning": "to promote; to boost",
  "ru": "способствовать; содействовать",
  "lesson": 6
 },
 {
  "hanzi": "革命",
  "pinyin": "gémìng",
  "meaning": "revolution",
  "ru": "революция",
  "lesson": 6
 },
 {
  "hanzi": "支付宝",
  "pinyin": "Zhīfùbǎo",
  "meaning": "Alipay",
  "ru": "Alipay («Чжифубао»)",
  "lesson": 6
 },
 {
  "hanzi": "微信支付",
  "pinyin": "Wēixìn Zhīfù",
  "meaning": "WeChat Pay",
  "ru": "WeChat Pay",
  "lesson": 6
 },
 {
  "hanzi": "信誉",
  "pinyin": "xìnyù",
  "meaning": "prestige; reputation",
  "ru": "репутация; доверие",
  "lesson": 6
 },
 {
  "hanzi": "客服",
  "pinyin": "kèfú",
  "meaning": "customer service",
  "ru": "служба поддержки клиентов",
  "lesson": 6
 },
 {
  "hanzi": "专业",
  "pinyin": "zhuānyè",
  "meaning": "professional; specialty",
  "ru": "профессиональный; специальность",
  "lesson": 6
 },
 {
  "hanzi": "下单",
  "pinyin": "xià dān",
  "meaning": "to place an order",
  "ru": "оформлять заказ",
  "lesson": 6
 },
 {
  "hanzi": "评价",
  "pinyin": "píngjià",
  "meaning": "evaluation; to evaluate",
  "ru": "оценка; оценивать",
  "lesson": 6
 },
 {
  "hanzi": "填写",
  "pinyin": "tiánxiě",
  "meaning": "to fill in",
  "ru": "заполнять",
  "lesson": 6
 },
 {
  "hanzi": "收货",
  "pinyin": "shōu huò",
  "meaning": "to receive (goods)",
  "ru": "получать (товар)",
  "lesson": 6
 },
 {
  "hanzi": "亚马逊",
  "pinyin": "Yàmǎxùn",
  "meaning": "Amazon",
  "ru": "Amazon",
  "lesson": 6
 },
 {
  "hanzi": "淘宝",
  "pinyin": "Táobǎo",
  "meaning": "Taobao",
  "ru": "Taobao («Таобао»)",
  "lesson": 6
 },
 {
  "hanzi": "京东",
  "pinyin": "Jīngdōng",
  "meaning": "JD.com",
  "ru": "JD.com («Цзиндун»)",
  "lesson": 6
 },
 {
  "hanzi": "拼多多",
  "pinyin": "Pīnduōduō",
  "meaning": "Pinduoduo",
  "ru": "Pinduoduo («Пиньдуодуо»)",
  "lesson": 6
 },
 {
  "hanzi": "网络文学",
  "pinyin": "wǎngluò wénxué",
  "meaning": "internet literature; online literature",
  "ru": "интернет-литература",
  "lesson": 7
 },
 {
  "hanzi": "展示",
  "pinyin": "zhǎnshì",
  "meaning": "to display; to show",
  "ru": "показывать; демонстрировать",
  "lesson": 7
 },
 {
  "hanzi": "题材",
  "pinyin": "tícái",
  "meaning": "subject matter",
  "ru": "тема; сюжетный материал",
  "lesson": 7
 }
];
