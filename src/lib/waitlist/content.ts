export type WaitlistLocale = 'en' | 'ko' | 'zh' | 'ja';

export type WaitlistCopy = {
  localeLabel: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  cta: string;
  ctaNote: string;
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  jumpToForm: string;
  submitting: string;
  success: string;
  error: string;
  duplicate: string;
  rateLimited: string;
  trust: string;
  stats: string[];
  socialProof: string;
  perksTitle: string;
  perks: string[];
  pillars: Array<{ title: string; body: string }>;
  stepsTitle: string;
  steps: Array<{ title: string; body: string }>;
  communityTitle: string;
  communityBody: string;
  showcaseTitle: string;
  showcaseBody: string;
  showcaseLabels: {
    voice: string;
    image: string;
    interpretation: string;
    calendar: string;
  };
  microCopy: {
    voice: string;
    image: string;
    interpretation: string;
    calendar: string;
  };
  showcaseDreamText: string;
  showcaseInterpretation: string;
};

export const waitlistLocaleOptions: Array<{ value: WaitlistLocale; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: '한국어' },
  { value: 'zh', label: '中文' },
  { value: 'ja', label: '日本語' },
];

export const waitlistCopyByLocale: Record<WaitlistLocale, WaitlistCopy> = {
  en: {
    localeLabel: 'Language',
    eyebrow: 'Voice-first dream journal, image studio, and interpretation companion',
    headline: 'Dreams fade.\nYours won\u2019t.',
    subheadline:
      'Half awake is enough. Whisper your dream right after you open your eyes, and Dream Gallery turns it into cinematic AI imagery, thoughtful interpretation, and a calendar you will actually revisit.',
    cta: 'Join the waitlist and get your first month of Premium free',
    ctaNote:
      'Early members get launch updates, priority access, and the first Premium month on us.',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    submit: 'Claim my launch perks',
    jumpToForm: 'Get launch perks',
    submitting: 'Saving your spot...',
    success: 'You are on the list. We will reach out before launch.',
    error: 'Something went wrong. Please try again.',
    duplicate: 'This email is already on the waitlist.',
    rateLimited: 'Too many requests. Please wait a moment and try again.',
    trust: 'No spam. Only launch news, early access, and product updates.',
    stats: ['Voice capture in seconds', 'AI dream art', 'Personalized interpretation', 'Calendar archive'],
    socialProof: 'Built for dreamers, journalers, artists, and curious minds from day one.',
    perksTitle: 'Founding member perks',
    perks: [
      'First month of Premium free after launch',
      'Priority access to new image styles and interpretation upgrades',
      'A lighter capture flow for those blurry just-woke-up moments',
    ],
    pillars: [
      {
        title: 'Just speak',
        body: 'No typing marathon. Capture fragile dream fragments with voice before they disappear.',
      },
      {
        title: 'Turn memory into imagery',
        body: 'Your dream text becomes atmospheric AI art that makes the scene feel tangible again.',
      },
      {
        title: 'Decode the pattern',
        body: 'Receive nuanced interpretation that helps connect recurring symbols, emotions, and timing.',
      },
    ],
    stepsTitle: 'How it works',
    steps: [
      { title: 'Wake up', body: 'Speak while the dream is still warm and unfinished.' },
      { title: 'Generate', body: 'AI builds a visual scene and extracts emotional signals.' },
      { title: 'Reflect', body: 'Your dream is saved on a calendar for patterns over time.' },
    ],
    communityTitle: 'Made to share across communities',
    communityBody:
      'The page supports English, Korean, Chinese, and Japanese so you can post the same launch link in Reddit and regional communities without sending people to a broken first impression.',
    showcaseTitle: 'A mobile-first flow for the moment right after waking up',
    showcaseBody:
      'The landing page mirrors the product pitch in a vertical rhythm: capture, visualize, interpret, and revisit. That makes it easier for mobile visitors from Reddit or social posts to understand the value in under ten seconds.',
    showcaseLabels: {
      voice: 'Voice Capture',
      image: 'Dream Image',
      interpretation: 'Interpretation',
      calendar: 'Calendar Trail',
    },
    microCopy: {
      voice: 'A floating mic lets users record before the dream fades.',
      image: 'AI art becomes the emotional proof that the dream was real.',
      interpretation: 'Short, reflective reading instead of generic fortune-cookie text.',
      calendar: 'Daily cards make recurring symbols and moods visible over time.',
    },
    showcaseDreamText: '\u201CWe walked into a cavern of glowing crystals, hand in hand\u2026\u201D',
    showcaseInterpretation: 'Exploring the unknown together may reflect a deep trust and longing for shared discovery.',
  },
  ko: {
    localeLabel: '언어',
    eyebrow: '음성 기록, 꿈 이미지 생성, 해몽, 캘린더 보관을 하나로',
    headline: '꿈은 사라집니다.\n말하면 남습니다.',
    subheadline:
      '눈 뜬 직후 한마디면 충분합니다.\nAI 이미지, 해몽, 캘린더 기록으로 남겨드립니다.',
    cta: '웨이트리스트 등록 — 첫 달 프리미엄 무료',
    ctaNote:
      '얼리 멤버는 출시 소식, 우선 접근 권한, 첫 프리미엄 한 달 무료 혜택을 받습니다.',
    emailLabel: '이메일 주소',
    emailPlaceholder: 'you@example.com',
    submit: '출시 혜택 받기',
    jumpToForm: '등록하기',
    submitting: '자리를 저장하는 중...',
    success: '등록되었습니다. 출시 전에 먼저 안내드릴게요.',
    error: '문제가 발생했습니다. 다시 시도해 주세요.',
    duplicate: '이미 웨이트리스트에 등록된 이메일입니다.',
    rateLimited: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
    trust: '스팸 없이 출시 소식, 얼리 액세스, 주요 업데이트만 전합니다.',
    stats: ['10초 음성 기록', 'AI 꿈 이미지', '맞춤 해몽', '캘린더 아카이브'],
    socialProof:
      '꿈을 자주 꾸는 사람, 기록을 좋아하는 사람, 창작자, 자기이해에 관심 있는 사람을 위해 만들고 있습니다.',
    perksTitle: '얼리 멤버 혜택',
    perks: [
      '출시 후 첫 달 프리미엄 무료',
      '신규 이미지 스타일과 해몽 기능 우선 체험',
      '막 깬 상태에서도 부담 없이 쓸 수 있는 간편 기록',
    ],
    pillars: [
      {
        title: '말하기만 하세요',
        body: '길게 타이핑하지 않아도 됩니다. 사라지기 쉬운 꿈 조각을 음성으로 빠르게 붙잡습니다.',
      },
      {
        title: '꿈 장면을 다시 보다',
        body: '텍스트로 남긴 꿈을 분위기 있는 AI 아트로 변환해 꿈속 장면을 시각적으로 되살립니다.',
      },
      {
        title: '무의식의 메시지 읽기',
        body: '상징, 감정, 반복 패턴을 연결해 오늘의 꿈이 던지는 의미를 더 깊이 해석합니다.',
      },
    ],
    stepsTitle: '이용 방식',
    steps: [
      { title: '깨어나자마자 말하기', body: '꿈이 흐려지기 전에 짧게 중얼거리듯 기록합니다.' },
      { title: 'AI가 시각화', body: '장면 이미지와 감정 단서를 함께 정리합니다.' },
      { title: '캘린더로 회고', body: '하루 단위로 저장해 꿈의 반복 패턴을 확인합니다.' },
    ],
    communityTitle: '전 세계 커뮤니티에서 공유',
    communityBody:
      '영어, 한국어, 중국어, 일본어를 지원합니다. 어느 커뮤니티에 링크를 올려도 첫인상이 깨지지 않습니다.',
    showcaseTitle: '잠에서 깨자마자 쓸 수 있는 흐름',
    showcaseBody:
      '말하기, 이미지 생성, 해몽, 캘린더 기록이 하나의 흐름으로 이어집니다.',
    showcaseLabels: {
      voice: '음성 입력',
      image: '꿈 이미지',
      interpretation: '해몽',
      calendar: '캘린더 기록',
    },
    microCopy: {
      voice: '꿈이 흐려지기 전에 바로 말할 수 있는 입력 경험입니다.',
      image: 'AI 이미지가 막연했던 장면을 다시 잡아줍니다.',
      interpretation: '가벼운 운세 문구가 아니라 감정과 상징 중심으로 읽어줍니다.',
      calendar: '쌓일수록 반복되는 상징과 기분 변화를 보기 쉬워집니다.',
    },
    showcaseDreamText: '\u201C빛나는 수정 동굴 속을 손잡고 걸어 들어갔어\u2026\u201D',
    showcaseInterpretation: '미지의 세계를 함께 탐험하는 꿈은 신뢰와 연결의 바람을 담고 있을 수 있습니다.',
  },
  zh: {
    localeLabel: '语言',
    eyebrow: '语音记录梦境，生成图像，解读含义，并按日历保存',
    headline: '把梦说出来，把画面和意义一起留下。',
    subheadline:
      '刚醒来、意识还模糊也没关系。只要轻声说出梦里的片段，Dream Gallery 就会把它变成富有氛围的 AI 图像，配上个性化解梦，并整理进你愿意反复回看的日历里。',
    cta: '加入等候名单，首月 Premium 免费',
    ctaNote: '抢先成员可获得上线通知、优先体验资格，以及首月 Premium 免费福利。',
    emailLabel: '邮箱地址',
    emailPlaceholder: 'you@example.com',
    submit: '领取上线福利',
    jumpToForm: '领取福利',
    submitting: '正在保留你的名额...',
    success: '已加入等候名单。上线前我们会先通知你。',
    error: '出了点问题，请重试。',
    duplicate: '这个邮箱已经加入等候名单。',
    rateLimited: '请求过多，请稍后再试。',
    trust: '不发垃圾邮件，只发送上线消息、抢先体验和产品更新。',
    stats: ['几秒语音记录', 'AI 梦境图像', '个性化解读', '日历归档'],
    socialProof: '为爱做梦的人、记录者、创作者和对潜意识好奇的人而设计。',
    perksTitle: '首发成员权益',
    perks: [
      '正式上线后首月 Premium 免费',
      '优先体验新的图像风格与解梦升级',
      '专为刚醒来时的模糊状态优化的轻量记录流程',
    ],
    pillars: [
      {
        title: '只要开口说',
        body: '不用费力打字，在梦还没散掉前用语音抓住关键画面。',
      },
      {
        title: '把记忆变成画面',
        body: '系统会把梦境文本转成有电影感的 AI 图像，让场景重新变得具体。',
      },
      {
        title: '理解潜意识线索',
        body: '结合情绪、象征与重复出现的主题，提供更贴近个人的解读。',
      },
    ],
    stepsTitle: '使用方式',
    steps: [
      { title: '醒来就说', body: '趁梦还热着，先把片段说出来。' },
      { title: 'AI 生成', body: '自动生成图像，并提取情绪与象征信号。' },
      { title: '日历回看', body: '按日期保存，长期观察梦的变化与重复。' },
    ],
    communityTitle: '适合社区传播的首屏体验',
    communityBody:
      '无论你把链接发到 Reddit 还是中文、日韩社区，访客都可以立刻切换到熟悉语言，不会在第一屏流失。',
    showcaseTitle: '移动端优先，适合刚醒来时的单手浏览',
    showcaseBody:
      '页面本身就按产品使用顺序讲故事：先录音，再看图，再理解，再回顾。对移动端访客来说，这比传统长篇功能介绍更容易转化。',
    showcaseLabels: {
      voice: '语音输入',
      image: '梦境图像',
      interpretation: '梦境解读',
      calendar: '日历记录',
    },
    microCopy: {
      voice: '在梦还没有消失前，先把它说出来。',
      image: 'AI 图像帮用户重新抓住朦胧场景。',
      interpretation: '不是模板化鸡汤，而是围绕情绪和象征来理解。',
      calendar: '记录越多，重复主题越容易被看见。',
    },
    showcaseDreamText: '\u201C我们手牵手走进了一个闪耀的水晶洞穴\u2026\u201D',
    showcaseInterpretation: '共同探索未知，或许映射着对信任与深层连接的渴望。',
  },
  ja: {
    localeLabel: '言語',
    eyebrow: '音声記録、夢画像生成、夢占い、カレンダー保存をひとつに',
    headline: '夢を話すと、映像と意味が残る。',
    subheadline:
      '目覚めた直後のぼんやりした状態でも大丈夫です。夢をひとこと話すだけで、Dream Gallery が印象的な AI イメージを描き出し、パーソナルな解釈と一緒に振り返りやすいカレンダーへ残します。',
    cta: 'ウェイトリスト登録で初月 Premium 無料',
    ctaNote: '先行メンバーには公開前のお知らせ、優先アクセス、初月 Premium 無料を案内します。',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'you@example.com',
    submit: '先行特典を受け取る',
    jumpToForm: '特典を受け取る',
    submitting: '席を確保しています...',
    success: '登録が完了しました。公開前に先にご連絡します。',
    error: '問題が発生しました。もう一度お試しください。',
    duplicate: 'このメールアドレスはすでに登録されています。',
    rateLimited: 'リクエストが多すぎます。しばらくしてから再度お試しください。',
    trust: 'スパムは送りません。公開情報、先行アクセス、重要な更新のみお送りします。',
    stats: ['数秒で音声記録', 'AI 夢イメージ', 'パーソナル解釈', '日次カレンダー保存'],
    socialProof: '夢をよく見る人、記録好き、クリエイター、無意識に興味がある人のための体験です。',
    perksTitle: '初期メンバー特典',
    perks: [
      '正式公開後の Premium 初月無料',
      '新しい画像スタイルや解釈機能を優先体験',
      '寝起きでも負担が少ない、軽い記録フロー',
    ],
    pillars: [
      {
        title: '話すだけでいい',
        body: '長く入力しなくても、消えやすい夢の断片を音声ですばやく残せます。',
      },
      {
        title: '夢をもう一度見る',
        body: '夢のテキストを空気感のある AI アートへ変え、場面を視覚的に呼び戻します。',
      },
      {
        title: '無意識のサインを読む',
        body: '感情や象徴、繰り返しのモチーフをつなぎながら、夢の意味を深く解釈します。',
      },
    ],
    stepsTitle: '使い方',
    steps: [
      { title: '起きたら話す', body: '夢が薄れる前に、短くつぶやくように残します。' },
      { title: 'AI が可視化', body: '情景イメージと感情の手がかりをまとめます。' },
      { title: 'カレンダーで振り返る', body: '日ごとに蓄積し、夢の傾向を見つけます。' },
    ],
    communityTitle: 'コミュニティ投稿を意識した導線',
    communityBody:
      'Reddit や各地域コミュニティに同じリンクを貼っても、最初の印象が崩れないよう英語・韓国語・中国語・日本語をすぐ切り替えられます。',
    showcaseTitle: '寝起きのモバイル利用を前提にした見せ方',
    showcaseBody:
      'ページ自体がプロダクトの流れをそのまま見せます。話す、見る、解釈する、振り返るの順で価値が伝わるため、モバイル流入でも短時間で理解されやすくなります。',
    showcaseLabels: {
      voice: '音声入力',
      image: '夢イメージ',
      interpretation: '解釈',
      calendar: 'カレンダー記録',
    },
    microCopy: {
      voice: '夢が消える前に、まずはひとこと残せます。',
      image: 'AI 画像がぼんやりした情景を引き戻します。',
      interpretation: 'ありきたりな占いではなく、感情と象徴から読み解きます。',
      calendar: '蓄積されるほど、繰り返し現れるサインが見えてきます。',
    },
    showcaseDreamText: '\u201C光る水晶の洞窟に、手をつないで足を踏み入れた\u2026\u201D',
    showcaseInterpretation: '未知の世界を共に探る夢は、信頼とつながりへの願いを映しているかもしれません。',
  },
};

export function normalizeWaitlistLocale(input?: string | null): WaitlistLocale {
  if (!input) return 'en';
  const normalized = input.toLowerCase();
  if (normalized.startsWith('ko')) return 'ko';
  if (normalized.startsWith('zh')) return 'zh';
  if (normalized.startsWith('ja')) return 'ja';
  return 'en';
}

export function detectWaitlistLocale(acceptLanguage?: string | null) {
  if (!acceptLanguage) return 'en' as WaitlistLocale;
  const firstMatch = acceptLanguage.split(',')[0]?.trim();
  return normalizeWaitlistLocale(firstMatch);
}
