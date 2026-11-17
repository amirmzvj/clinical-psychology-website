export type ToolId = "sdq" | "snap" | "scas";

export type Band = "low" | "moderate" | "high";

export type SubscaleStatus = "normal" | "borderline" | "clinical";

export type ScaleOption = {
  value: number;
  label: string;
  hint: string;
};

export type AssessmentQuestion = {
  id: number;
  subscale: string;
  text: string;
  /** اگر true باشد، گویه مثبت است و نمرهٔ آن معکوس محاسبه می‌شود (maxValue - raw). */
  reverse?: boolean;
  /** زیرگروه کمکی برای تحلیل دقیق‌تر روانشناس (مثلاً تفکیک بیش‌فعالی و تکانشگری در SNAP-IV). */
  tag?: string;
};

export type SubscaleDefinition = {
  key: string;
  label: string;
  shortDesc: string;
  maxScore: number;
  /** اگر true باشد، نمرهٔ بالاتر نشانهٔ توانمندی است (مثل رفتار اجتماعی مطلوب در SDQ). */
  isStrength?: boolean;
  normalRangeLabel: string;
  borderlineRangeLabel: string;
  clinicalRangeLabel: string;
};

export type AssessmentTool = {
  id: ToolId;
  title: string;
  shortTitle: string;
  englishCode: string;
  badge: string;
  icon: string;
  ageRange: string;
  minAge: number;
  maxAge: number;
  defaultAge: number;
  estimatedMinutes: number;
  timeframePrompt: string;
  scientificBasis: string;
  summary: string;
  whenToUse: string[];
  scale: ScaleOption[];
  subscales: SubscaleDefinition[];
  questions: AssessmentQuestion[];
};

export type ChildProfile = {
  childName: string;
  age: number;
  gender: "girl" | "boy" | "unspecified";
  respondent: "mother" | "father" | "guardian";
  parentNote: string;
  /** میزان اثرگذاری علائم بر زندگی روزمره کودک (۰ تا ۳) */
  impact: number;
};

export const IMPACT_OPTIONS: ScaleOption[] = [
  { value: 0, label: "اصلاً مشکلی ایجاد نکرده", hint: "عملکرد روزمره، خواب، درس و دوستی‌ها عادی است" },
  { value: 1, label: "فقط کمی", hint: "ناراحتی خفیف و گذرا بدون اختلال جدی در خانه یا مدرسه" },
  { value: 2, label: "تا حد قابل توجهی", hint: "باعث تنش محسوس در خانه، افت تمرکز/درس یا روابط با همسالان شده" },
  { value: 3, label: "بسیار زیاد", hint: "کودک را شدیداً آزار می‌دهد و روند عادی روزمره یا خانواده را مختل کرده" },
];

export const GENDER_LABELS: Record<ChildProfile["gender"], string> = {
  girl: "دختر",
  boy: "پسر",
  unspecified: "ثبت‌نشده",
};

export const RESPONDENT_LABELS: Record<ChildProfile["respondent"], string> = {
  mother: "مادر",
  father: "پدر",
  guardian: "سرپرست",
};

export const BAND_LABELS: Record<Band, string> = {
  low: "در محدودهٔ طبیعی",
  moderate: "محدودهٔ مرزی (نیازمند توجه)",
  high: "معنادار بالینی (نیازمند ارزیابی تخصصی)",
};

export type SubscaleScore = {
  key: string;
  label: string;
  score: number;
  maxScore: number;
  percent: number;
  status: SubscaleStatus;
  statusLabel: string;
  isStrength: boolean;
  normalRangeLabel: string;
  /** توضیح اضافه مثل میانگین یا شمارش علائم DSM-5 */
  meta?: string;
  interpretation: string;
};

export type ClinicianMetric = {
  label: string;
  value: string;
  note?: string;
};

export type ItemResponseDetail = {
  number: number;
  text: string;
  subscaleLabel: string;
  selectedLabel: string;
  rawValue: number;
  scoredValue: number;
  maxItemValue: number;
  reverse: boolean;
  isElevated: boolean;
};

export type FullAssessmentReport = {
  reportCode: string;
  completedAtIso: string;
  completedAtFa: string;
  toolId: ToolId;
  toolTitle: string;
  toolShortTitle: string;
  englishCode: string;
  scientificBasis: string;
  timeframePrompt: string;
  profile: ChildProfile;
  impactLabel: string;
  totalScore: number;
  totalMax: number;
  totalLabel: string;
  totalCutoffHint: string;
  gaugePercent: number;
  band: Band;
  bandLabel: string;
  headline: string;
  patternLabel: string;
  summaryParagraphs: string[];
  subscales: SubscaleScore[];
  clinicianMetrics: ClinicianMetric[];
  elevatedItems: ItemResponseDetail[];
  allItems: ItemResponseDetail[];
  parentSteps: string[];
  clinicianNote: string;
};

/* ========================================================================== */
/* ۱. پرسشنامهٔ نقاط قوت و دشواری‌ها (SDQ — فرم استاندارد ۲۵ گویه‌ای والدین)   */
/* ========================================================================== */
const SDQ_TOOL: AssessmentTool = {
  id: "sdq",
  title: "پرسشنامهٔ جامع نقاط قوت و دشواری‌ها (SDQ)",
  shortTitle: "غربالگری جامع رفتاری–هیجانی (SDQ)",
  englishCode: "SDQ — Parent Form (25 Items)",
  badge: "غربالگری جامع و استاندارد",
  icon: "🧩",
  ageRange: "۴ تا ۱۷ سال",
  minAge: 4,
  maxAge: 17,
  defaultAge: 8,
  estimatedMinutes: 5,
  timeframePrompt: "بر اساس رفتار فرزندتان در ۶ ماه گذشته (یا سال تحصیلی جاری) پاسخ دهید.",
  scientificBasis:
    "مبتنی بر پرسشنامهٔ نقاط قوت و دشواری‌های رابرت گودمن (Goodman, 1997 — SDQ فرم والدین) با ۵ زیرمقیاس استاندارد، ۵ گویهٔ نمره‌گذاری معکوس و نقاط برش سه‌سطحی بالینی.",
  summary:
    "شناخته‌شده‌ترین ابزار غربالگری اولیهٔ کودک و نوجوان در کلینیک‌های روانشناسی؛ هم‌زمان علائم هیجانی، مشکلات رفتاری، بیش‌فعالی/نقص توجه، روابط با همسالان و مهارت اجتماعی مثبت کودک را می‌سنجد.",
  whenToUse: [
    "وقتی می‌خواهید یک دید کلی و دقیق از وضعیت رفتاری و هیجانی کودک داشته باشید",
    "پیش از اولین جلسهٔ مراجعه به روانشناس کودک و نوجوان",
    "بررسی هم‌زمان خلق، لجبازی، تمرکز، دوستیابی و نقاط قوت اجتماعی",
  ],
  scale: [
    { value: 0, label: "درست نیست", hint: "در مورد فرزندم صدق نمی‌کند" },
    { value: 1, label: "تا حدی درست است", hint: "گاهی یا تا اندازه‌ای صدق می‌کند" },
    { value: 2, label: "کاملاً درست است", hint: "به‌طور مشخص و مکرر صدق می‌کند" },
  ],
  subscales: [
    {
      key: "emotional",
      label: "علائم هیجانی (اضطراب و خلق)",
      shortDesc: "نگرانی، ترس، غمگینی و شکایات بدنی ناشی از تنش",
      maxScore: 10,
      normalRangeLabel: "۰ تا ۳",
      borderlineRangeLabel: "۴",
      clinicalRangeLabel: "۵ تا ۱۰",
    },
    {
      key: "conduct",
      label: "مشکلات رفتاری و سلوک",
      shortDesc: "زودرنجی و قشقرق، نافرمانی، درگیری یا پنهان‌کاری",
      maxScore: 10,
      normalRangeLabel: "۰ تا ۲",
      borderlineRangeLabel: "۳",
      clinicalRangeLabel: "۴ تا ۱۰",
    },
    {
      key: "hyperactivity",
      label: "بیش‌فعالی و نقص توجه",
      shortDesc: "بی‌قراری حرکتی، حواس‌پرتی، شتاب‌زدگی و نیمه‌کاره گذاشتن کارها",
      maxScore: 10,
      normalRangeLabel: "۰ تا ۵",
      borderlineRangeLabel: "۶",
      clinicalRangeLabel: "۷ تا ۱۰",
    },
    {
      key: "peer",
      label: "مشکلات ارتباط با همسالان",
      shortDesc: "گوشه‌گیری، دشواری در دوست‌یابی یا مورد آزار همسالان قرار گرفتن",
      maxScore: 10,
      normalRangeLabel: "۰ تا ۲",
      borderlineRangeLabel: "۳",
      clinicalRangeLabel: "۴ تا ۱۰",
    },
    {
      key: "prosocial",
      label: "رفتار اجتماعی مطلوب (نقطهٔ قوت)",
      shortDesc: "همدلی، سهیم شدن، مهربانی و کمک داوطلبانه به دیگران",
      maxScore: 10,
      isStrength: true,
      normalRangeLabel: "۶ تا ۱۰ (مطلوب)",
      borderlineRangeLabel: "۵",
      clinicalRangeLabel: "۰ تا ۴ (نیازمند تقویت)",
    },
  ],
  questions: [
    { id: 1, subscale: "prosocial", text: "احساسات دیگران را درک و مراعات می‌کند." },
    { id: 2, subscale: "hyperactivity", text: "بی‌قرار و پرتحرک است و نمی‌تواند مدت طولانی آرام بنشیند." },
    { id: 3, subscale: "emotional", text: "اغلب از سردرد، دل‌درد یا حالت تهوع شکایت می‌کند." },
    { id: 4, subscale: "prosocial", text: "به‌راحتی خوراکی‌ها، اسباب‌بازی‌ها یا وسایلش را با بچه‌های دیگر شریک می‌شود." },
    { id: 5, subscale: "conduct", text: "اغلب از کوره در می‌رود، قشقرق به پا می‌کند یا زود عصبانی می‌شود." },
    { id: 6, subscale: "peer", text: "تا حدی گوشه‌گیر است و بیشتر ترجیح می‌دهد تنها بازی کند یا تنها باشد." },
    { id: 7, subscale: "conduct", reverse: true, text: "معمولاً حرف‌شنو است و کارهایی را که بزرگ‌ترها از او می‌خواهند انجام می‌دهد." },
    { id: 8, subscale: "emotional", text: "نگرانی‌های زیادی دارد و اغلب دلواپس و فکری به نظر می‌رسد." },
    { id: 9, subscale: "prosocial", text: "اگر کسی ناراحت، دلخور یا بیمار باشد، برای کمک و دلداری پیش‌قدم می‌شود." },
    { id: 10, subscale: "hyperactivity", text: "مدام وول می‌خورد، بی‌تابی می‌کند و دست‌وپایش را تکان می‌دهد." },
    { id: 11, subscale: "peer", reverse: true, text: "حداقل یک دوست خوب و صمیمی دارد." },
    { id: 12, subscale: "conduct", text: "اغلب با بچه‌های دیگر دعوا و جرّوبحث می‌کند یا به آن‌ها زور می‌گوید." },
    { id: 13, subscale: "emotional", text: "اغلب غمگین، پکر، بی‌حوصله یا آمادهٔ گریه کردن است." },
    { id: 14, subscale: "peer", reverse: true, text: "به‌طور کلی بچه‌های هم‌سن‌وسالش او را دوست دارند و می‌پذیرند." },
    { id: 15, subscale: "hyperactivity", text: "حواسش به‌راحتی پرت می‌شود و تمرکزش را زود از دست می‌دهد." },
    { id: 16, subscale: "emotional", text: "در موقعیت‌های جدید مضطرب یا چسبنده می‌شود و زود اعتمادبه‌نفسش را از دست می‌دهد." },
    { id: 17, subscale: "prosocial", text: "با بچه‌های کوچک‌تر از خودش مهربان و ملاحظه‌گر است." },
    { id: 18, subscale: "conduct", text: "اغلب دروغ می‌گوید، پنهان‌کاری می‌کند یا تقصیر را گردن دیگران می‌اندازد." },
    { id: 19, subscale: "peer", text: "مورد اذیت، مسخره شدن یا زورگویی بچه‌های دیگر قرار می‌گیرد." },
    { id: 20, subscale: "prosocial", text: "اغلب داوطلبانه به دیگران (والدین، معلم‌ها یا بچه‌ها) کمک می‌کند." },
    { id: 21, subscale: "hyperactivity", reverse: true, text: "قبل از انجام کارها فکر می‌کند و با عجله عمل نمی‌کند." },
    { id: 22, subscale: "conduct", text: "از خانه، مدرسه یا جاهای دیگر بدون اجازه چیزی برمی‌دارد." },
    { id: 23, subscale: "peer", text: "با بزرگ‌ترها راحت‌تر و بهتر از بچه‌های هم‌سن‌وسال خودش کنار می‌آید." },
    { id: 24, subscale: "emotional", text: "ترس‌های زیادی دارد و به‌راحتی دچار ترس و وحشت می‌شود." },
    { id: 25, subscale: "hyperactivity", reverse: true, text: "کارها را تا انتها به پایان می‌رساند و دامنهٔ توجه خوبی دارد." },
  ],
};

/* ========================================================================== */
/* ۲. مقیاس غربالگری نقص توجه و بیش‌فعالی (SNAP-IV — فرم ۱۸ گویه‌ای والدین)    */
/* ========================================================================== */
const SNAP_TOOL: AssessmentTool = {
  id: "snap",
  title: "غربالگری نقص توجه و بیش‌فعالی–تکانشگری (SNAP-IV)",
  shortTitle: "نقص توجه و بیش‌فعالی (SNAP-IV)",
  englishCode: "SNAP-IV 18-Item Parent Rating Scale (DSM-5)",
  badge: "تخصصی تمرکز و ADHD",
  icon: "⚡",
  ageRange: "۶ تا ۱۷ سال",
  minAge: 6,
  maxAge: 17,
  defaultAge: 9,
  estimatedMinutes: 4,
  timeframePrompt: "شدت هر رفتار را در ۶ ماه گذشته (در مقایسه با هم‌سن‌وسال‌های کودک) مشخص کنید.",
  scientificBasis:
    "مبتنی بر مقیاس استاندارد سوانسون، نولان و پلهام (SNAP-IV فرم کوتاه ۱۸ سؤالی والدین) منطبق با ۱۸ ملاک تشخیصی DSM-5؛ همراه با محاسبهٔ هم‌زمان میانگین زیرمقیاس و شمارش علائم بالینی.",
  summary:
    "ابزار تخصصی سنجش دو بُعد اصلی «نقص توجه و تمرکز» و «بیش‌فعالی–تکانشگری» برای تشخیص تفاوت شیطنت و بازیگوشی طبیعی از الگوی نیازمند ارزیابی تخصصی ADHD.",
  whenToUse: [
    "حواس‌پرتی مکرر سر درس و دیکته، جا گذاشتن وسایل یا نیمه‌کاره رها کردن تکالیف",
    "پرتحرکی مداوم، وول خوردن، پرحرفی یا وسط حرف دیگران پریدن",
    "وقتی معلم مدرسه دربارهٔ تمرکز یا بی‌قراری کودک در کلاس تذکر داده است",
  ],
  scale: [
    { value: 0, label: "اصلاً", hint: "هیچ‌وقت یا بسیار به‌ندرت" },
    { value: 1, label: "کمی", hint: "گاهی اوقات (در حد معمول سن)" },
    { value: 2, label: "نسبتاً زیاد", hint: "اغلب اوقات و محسوس‌تر از هم‌سن‌ها" },
    { value: 3, label: "خیلی زیاد", hint: "تقریباً همیشه و به شکل برجسته" },
  ],
  subscales: [
    {
      key: "inattention",
      label: "نقص توجه و تمرکز",
      shortDesc: "بی‌دقتی، حواس‌پرتی، فراموش‌کاری، دشواری در سازمان‌دهی و پیگیری تکالیف",
      maxScore: 27,
      normalRangeLabel: "۰ تا ۱۲ (میانگین ≤ ۱٫۳۳)",
      borderlineRangeLabel: "۱۳ تا ۱۷",
      clinicalRangeLabel: "۱۸ تا ۲۷ یا ≥ ۶ علامت بارز",
    },
    {
      key: "hyper_impulsive",
      label: "بیش‌فعالی و تکانشگری",
      shortDesc: "بی‌قراری بدنی، ترک صندلی، پرحرفی، عجولانه جواب دادن و ناتوانی در صبر کردن",
      maxScore: 27,
      normalRangeLabel: "۰ تا ۱۰ (میانگین ≤ ۱٫۱۱)",
      borderlineRangeLabel: "۱۱ تا ۱۴",
      clinicalRangeLabel: "۱۵ تا ۲۷ یا ≥ ۶ علامت بارز",
    },
  ],
  questions: [
    {
      id: 1,
      subscale: "inattention",
      text: "در توجه دقیق به جزئیات مشکل دارد یا در تکالیف مدرسه و کارها اشتباهات ناشی از بی‌دقتی می‌کند.",
    },
    {
      id: 2,
      subscale: "inattention",
      text: "در حفظ تمرکز پایدار روی تکالیف درسی، صحبت‌های طولانی یا بازی‌ها مشکل دارد.",
    },
    {
      id: 3,
      subscale: "inattention",
      text: "وقتی روبه‌رو و مستقیم با او صحبت می‌کنید، به نظر می‌رسد گوش نمی‌دهد یا حواسش جای دیگری است.",
    },
    {
      id: 4,
      subscale: "inattention",
      text: "دستورالعمل‌ها را تا آخر دنبال نمی‌کند و مشق‌ها یا کارهای روزمره را نیمه‌کاره رها می‌کند (نه از سر لجبازی).",
    },
    {
      id: 5,
      subscale: "inattention",
      text: "در نظم دادن به کارها، مدیریت زمان و مرتب نگه داشتن کیف، میز یا دفترهایش مشکل دارد.",
    },
    {
      id: 6,
      subscale: "inattention",
      text: "از کارهایی که نیاز به تمرکز فکری طولانی دارند (مثل مشق نوشتن یا مطالعه) طفره می‌رود و بیزاری نشان می‌دهد.",
    },
    {
      id: 7,
      subscale: "inattention",
      text: "وسایل لازم برای درس و فعالیت روزانه (مداد، پاک‌کن، دفتر، کتاب یا لباس) را مکرراً گم یا جا می‌گذارد.",
    },
    {
      id: 8,
      subscale: "inattention",
      text: "با کوچک‌ترین صدای اطراف یا اتفاق جانبی، حواسش از کاری که انجام می‌دهد پرت می‌شود.",
    },
    {
      id: 9,
      subscale: "inattention",
      text: "در کارهای روزمره و مسئولیت‌های تکراری فراموش‌کار است.",
    },
    {
      id: 10,
      subscale: "hyper_impulsive",
      tag: "hyperactivity",
      text: "هنگام نشستن مدام وول می‌خورد، با دست‌ها و وسایل بازی می‌کند یا پاهایش را تکان می‌دهد.",
    },
    {
      id: 11,
      subscale: "hyper_impulsive",
      tag: "hyperactivity",
      text: "در کلاس درس، سر سفره یا جاهایی که انتظار می‌رود نشسته بماند، مکرراً از جایش بلند می‌شود.",
    },
    {
      id: 12,
      subscale: "hyper_impulsive",
      tag: "hyperactivity",
      text: "در موقعیت‌های نامناسب زیاد می‌دود یا از وسایل بالا می‌رود (در نوجوانان: احساس بی‌قراری و کلافگی از نشستن).",
    },
    {
      id: 13,
      subscale: "hyper_impulsive",
      tag: "hyperactivity",
      text: "به‌سختی می‌تواند آرام و بی‌سروصدا بازی کند یا سرگرم فعالیت‌های آرام بماند.",
    },
    {
      id: 14,
      subscale: "hyper_impulsive",
      tag: "hyperactivity",
      text: "مدام در حال حرکت و جنب‌وجوش است، طوری که انگار موتوری روشن او را به حرکت وامی‌دارد.",
    },
    {
      id: 15,
      subscale: "hyper_impulsive",
      tag: "hyperactivity",
      text: "بیش‌ازحد و پشت‌سرهم صحبت می‌کند.",
    },
    {
      id: 16,
      subscale: "hyper_impulsive",
      tag: "impulsivity",
      text: "قبل از اینکه جمله یا سؤال طرف مقابل تمام شود، با عجله جواب را می‌پراند.",
    },
    {
      id: 17,
      subscale: "hyper_impulsive",
      tag: "impulsivity",
      text: "منتظر نوبت ماندن (در بازی، صف یا مکالمه) برایش بسیار دشوار است.",
    },
    {
      id: 18,
      subscale: "hyper_impulsive",
      tag: "impulsivity",
      text: "وسط حرف، کار یا بازی دیگران می‌پرد و بدون اجازه وارد کارشان می‌شود.",
    },
  ],
};

/* ========================================================================== */
/* ۳. مقیاس غربالگری اضطراب کودک و نوجوان اسپنس (SCAS-P / SCARED — فرم والد)  */
/* ========================================================================== */
const SCAS_TOOL: AssessmentTool = {
  id: "scas",
  title: "غربالگری تخصصی اضطراب کودک و نوجوان (اسپنس — SCAS-P)",
  shortTitle: "اضطراب کودک و نوجوان (SCAS-P)",
  englishCode: "SCAS-P / SCARED Short Parent Screening (16 Items)",
  badge: "تخصصی اضطراب و ترس",
  icon: "🌊",
  ageRange: "۵ تا ۱۶ سال",
  minAge: 5,
  maxAge: 16,
  defaultAge: 7,
  estimatedMinutes: 4,
  timeframePrompt: "مشخص کنید در ۱ تا ۳ ماه گذشته هر کدام از حالات زیر چقدر در فرزندتان دیده شده است.",
  scientificBasis:
    "مبتنی بر زیرمقیاس‌های اصلی مقیاس اضطراب کودک اسپنس (Spence, 1999 — SCAS فرم والدین) و ابزار غربالگری اختلالات اضطرابی کودک (SCARED-P) در ۴ بُعد بالینی مجزا.",
  summary:
    "نوع دقیق اضطراب کودک را تفکیک می‌کند: اضطراب جدایی (چسبندگی و ترس از مدرسه)، اضطراب اجتماعی (خجالت و ترس از جمع)، نگرانی فراگیر و کمال‌گرایی، و ترس‌های اختصاصی و علائم بدنی.",
  whenToUse: [
    "گریه، دل‌درد صبحگاهی یا مقاومت برای جدا شدن از والدین و رفتن به مدرسه یا خوابیدن تنها",
    "خجالت شدید در جمع، ترس از پاسخ دادن در کلاس یا نگرانی زیاد از قضاوت دیگران",
    "نگرانی‌های مکرر، سؤال‌پرسیدن‌های اطمینان‌جویانه، کمال‌گرایی یا ترس از تاریکی و تنهایی",
  ],
  scale: [
    { value: 0, label: "هرگز", hint: "اصلاً مشاهده نشده است" },
    { value: 1, label: "گاهی اوقات", hint: "به‌صورت پراکنده و خفیف" },
    { value: 2, label: "اغلب اوقات", hint: "بیشتر روزها یا در اکثر موقعیت‌های مشابه" },
    { value: 3, label: "همیشه", hint: "تقریباً هر بار و با شدت بالا" },
  ],
  subscales: [
    {
      key: "separation",
      label: "اضطراب جدایی",
      shortDesc: "بی‌قراری در دوری از والدین، مقاومت در خواب مستقل، نگرانی از آسیب دیدن خانواده",
      maxScore: 12,
      normalRangeLabel: "۰ تا ۳",
      borderlineRangeLabel: "۴ تا ۵",
      clinicalRangeLabel: "۶ تا ۱۲",
    },
    {
      key: "social",
      label: "اضطراب اجتماعی",
      shortDesc: "ترس از صحبت در جمع و کلاس، ترس از ارزیابی منفی، خجالت شدید در برابر غریبه‌ها",
      maxScore: 12,
      normalRangeLabel: "۰ تا ۳",
      borderlineRangeLabel: "۴ تا ۵",
      clinicalRangeLabel: "۶ تا ۱۲",
    },
    {
      key: "generalized",
      label: "اضطراب فراگیر و نگرانی مفرط",
      shortDesc: "دلشورهٔ مداوم، فکروخیال دربارهٔ آینده، کمال‌گرایی اضطرابی و شکایات بدنی هنگام استرس",
      maxScore: 12,
      normalRangeLabel: "۰ تا ۳",
      borderlineRangeLabel: "۴ تا ۵",
      clinicalRangeLabel: "۶ تا ۱۲",
    },
    {
      key: "fears_somatic",
      label: "ترس‌های اختصاصی و علائم بدنی هراس",
      shortDesc: "ترس شدید از محرک‌های خاص (تاریکی، تنهایی، آمپول/حیوان)، تپش قلب و رفتار اجتنابی",
      maxScore: 12,
      normalRangeLabel: "۰ تا ۳",
      borderlineRangeLabel: "۴ تا ۵",
      clinicalRangeLabel: "۶ تا ۱۲",
    },
  ],
  questions: [
    {
      id: 1,
      subscale: "separation",
      text: "وقتی قرار است از پدر یا مادر جدا شود (حتی برای مدت کوتاه)، مضطرب و بی‌قرار می‌شود.",
    },
    {
      id: 2,
      subscale: "separation",
      text: "از اینکه شب‌ها تنها در اتاق خودش بخوابد می‌ترسد یا نیمه‌شب سراغ والدین می‌آید.",
    },
    {
      id: 3,
      subscale: "separation",
      text: "مدام نگران است اتفاق بدی (بیماری، تصادف یا گم شدن) برای پدر، مادر یا خودش بیفتد.",
    },
    {
      id: 4,
      subscale: "separation",
      text: "موقع رفتن به مدرسه، مهد یا ماندن در خانهٔ آشنایان بدون والدین، گریه، چسبندگی یا دل‌درد پیدا می‌کند.",
    },
    {
      id: 5,
      subscale: "social",
      text: "از حرف زدن، روخوانی درس یا پاسخ دادن جلوی کلاس و جمع می‌ترسد، حتی وقتی جواب را بلد است.",
    },
    {
      id: 6,
      subscale: "social",
      text: "بیش‌ازحد نگران است هم‌کلاسی‌ها یا دیگران درباره‌اش چه فکری می‌کنند یا به او بخندند.",
    },
    {
      id: 7,
      subscale: "social",
      text: "در کنار بچه‌ها یا بزرگ‌ترهایی که زیاد با آن‌ها آشنا نیست، بسیار معذب، کم‌حرف و خجالتی می‌شود.",
    },
    {
      id: 8,
      subscale: "social",
      text: "از اشتباه کردن یا امتحان شفاهی وحشت دارد و از فعالیت‌های گروهی کناره‌گیری می‌کند.",
    },
    {
      id: 9,
      subscale: "generalized",
      text: "دربارهٔ اتفاقات آینده و مسائل روزمره بیش‌ازحد نگران است و به‌سختی می‌تواند فکرش را آرام کند.",
    },
    {
      id: 10,
      subscale: "generalized",
      tag: "somatic",
      text: "هنگام نگرانی، امتحان یا تغییرات برنامه دچار علائم بدنی مثل دل‌درد، سردرد یا تهوع می‌شود.",
    },
    {
      id: 11,
      subscale: "generalized",
      text: "دربارهٔ بی‌نقص انجام دادن تکالیف و کارها وسواس و نگرانی دارد و مکرراً از والدین اطمینان می‌خواهد («خوب شد؟ بد نشد؟»).",
    },
    {
      id: 12,
      subscale: "generalized",
      text: "حتی وقتی مشکل خاصی در جریان نیست، دلشوره، تنش عضلانی یا بی‌قراری درونی دارد.",
    },
    {
      id: 13,
      subscale: "fears_somatic",
      text: "ترس شدید و نامتناسب با سن از موقعیت‌های خاص (مثل تاریکی، تنها ماندن در اتاق، حیوانات، آمپول یا بلندی) دارد.",
    },
    {
      id: 14,
      subscale: "fears_somatic",
      tag: "somatic",
      text: "هنگام ترس یا فشار روانی به‌طور ناگهانی دچار تپش قلب، تند شدن تنفس یا احساس تنگی نفس می‌شود.",
    },
    {
      id: 15,
      subscale: "fears_somatic",
      tag: "somatic",
      text: "در رویارویی با استرس یا ترس دچار لرزش، عرق کردن دست‌ها، رنگ‌پریدگی یا سرگیجه می‌شود.",
    },
    {
      id: 16,
      subscale: "fears_somatic",
      text: "به خاطر ترس‌ها و نگرانی‌هایش، از جاها، بازی‌ها یا فعالیت‌های عادی هم‌سن‌وسال‌هایش به‌شدت دوری (اجتناب) می‌کند.",
    },
  ],
};

export const ASSESSMENT_TOOLS: AssessmentTool[] = [SDQ_TOOL, SNAP_TOOL, SCAS_TOOL];

export function getToolById(id: ToolId): AssessmentTool {
  return ASSESSMENT_TOOLS.find((tool) => tool.id === id) ?? SDQ_TOOL;
}

/* ========================================================================== */
/* توابع نمره‌گذاری و تحلیل بالینی واقعی                                       */
/* ========================================================================== */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
function fa(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

function statusLabelFor(status: SubscaleStatus, isStrength = false): string {
  if (isStrength) {
    if (status === "normal") return "مطلوب (نقطهٔ قوت)";
    if (status === "borderline") return "مرزی";
    return "پایین (نیازمند تقویت)";
  }
  if (status === "normal") return "در محدودهٔ طبیعی";
  if (status === "borderline") return "محدودهٔ مرزی";
  return "معنادار بالینی";
}

function makeReportCode(toolId: ToolId): string {
  const prefix = toolId.toUpperCase();
  const now = new Date();
  const stamp = `${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(
    now.getHours(),
  ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
  return `${prefix}-${stamp}`;
}

function buildItemDetails(tool: AssessmentTool, answers: number[]): ItemResponseDetail[] {
  const maxItemValue = tool.scale[tool.scale.length - 1]?.value ?? 2;
  const subscaleMap = new Map(tool.subscales.map((s) => [s.key, s]));

  return tool.questions.map((question, idx) => {
    const raw = Math.max(0, Math.min(maxItemValue, answers[idx] ?? 0));
    const scored = question.reverse ? maxItemValue - raw : raw;
    const option = tool.scale.find((opt) => opt.value === raw) ?? tool.scale[0];
    const sub = subscaleMap.get(question.subscale);
    const isStrength = Boolean(sub?.isStrength);
    // گویه برجسته بالینی: برای زیرمقیاس‌های مشکل، نمرهٔ بالا؛ برای نقطهٔ قوت، نمرهٔ صفر (ضعف همدلی/مشارکت)
    const isElevated = isStrength
      ? raw === 0
      : maxItemValue === 2
        ? scored === 2
        : scored >= 2;

    return {
      number: question.id,
      text: question.text,
      subscaleLabel: sub?.label ?? question.subscale,
      selectedLabel: option.label,
      rawValue: raw,
      scoredValue: scored,
      maxItemValue,
      reverse: Boolean(question.reverse),
      isElevated,
    };
  });
}

/* ------------------------------ تحلیل SDQ --------------------------------- */
function evaluateSdq(answers: number[], profile: ChildProfile): FullAssessmentReport {
  const tool = SDQ_TOOL;
  const allItems = buildItemDetails(tool, answers);

  const sums: Record<string, number> = {
    emotional: 0,
    conduct: 0,
    hyperactivity: 0,
    peer: 0,
    prosocial: 0,
  };

  tool.questions.forEach((q, i) => {
    sums[q.subscale] += allItems[i].scoredValue;
  });

  const classify = (key: string, s: number): SubscaleStatus => {
    if (key === "emotional") return s <= 3 ? "normal" : s === 4 ? "borderline" : "clinical";
    if (key === "conduct") return s <= 2 ? "normal" : s === 3 ? "borderline" : "clinical";
    if (key === "hyperactivity") return s <= 5 ? "normal" : s === 6 ? "borderline" : "clinical";
    if (key === "peer") return s <= 2 ? "normal" : s === 3 ? "borderline" : "clinical";
    // prosocial (higher is better)
    return s >= 6 ? "normal" : s === 5 ? "borderline" : "clinical";
  };

  const subInterpretations: Record<string, Record<SubscaleStatus, string>> = {
    emotional: {
      normal: "نشانه‌های اضطراب، ترس، غمگینی و شکایات بدنی در حد معمول سن گزارش شده است.",
      borderline: "نگرانی، حساسیت هیجانی یا شکایات بدنی خفیف تا متوسط دیده می‌شود که نیازمند توجه و پیگیری است.",
      clinical: "علائم هیجانی (نگرانی، ترس، افت خلق یا دردهای بدنی مرتبط با استرس) بالاتر از محدودهٔ هنجار است و ارزیابی بالینی توصیه می‌شود.",
    },
    conduct: {
      normal: "مدیریت خشم، پذیرش قوانین و تعامل رفتاری کودک در محدودهٔ طبیعی قرار دارد.",
      borderline: "مقداری زودرنجی، نافرمانی یا چالش رفتاری دیده می‌شود؛ بازنگری در شیوهٔ مرزگذاری مفید است.",
      clinical: "دشواری‌های رفتاری (از کوره در رفتن، نافرمانی یا درگیری) برجسته است و بررسی تخصصی همراه با آموزش والدین پیشنهاد می‌شود.",
    },
    hyperactivity: {
      normal: "سطح تحرک، خودمهارگری و پایداری توجه متناسب با انتظار سنی گزارش شده است.",
      borderline: "بی‌قراری یا حواس‌پرتی در سطح مرزی است؛ در صورت مشاهدهٔ مشابه در مدرسه، بررسی تخصصی (یا تکمیل فرم SNAP-IV) مفید است.",
      clinical: "نشانه‌های بی‌قراری حرکتی، تکانشگری یا نقص توجه بالاتر از هنجار است؛ تکمیل ارزیابی تخصصی توجه و بررسی عملکرد در مدرسه توصیه می‌شود.",
    },
    peer: {
      normal: "ارتباط با هم‌سن‌وسال‌ها، پذیرش در گروه و دوست‌یابی مطلوب به نظر می‌رسد.",
      borderline: "کودک در دوست‌یابی یا تعامل با همسالان تا حدی چالش یا کناره‌گیری نشان می‌دهد.",
      clinical: "مشکلات معناداری در رابطه با همسالان (تنهایی، دشواری در دوست‌یابی یا آزار دیدن از بچه‌ها) گزارش شده که نیازمند توجه بالینی است.",
    },
    prosocial: {
      normal: "همدلی، مشارکت و مهربانی کودک در سطح خوب است و یک سرمایهٔ مهم برای رشد و درمان محسوب می‌شود.",
      borderline: "رفتارهای مشارکتی و همدلانه در حد متوسط است و با تمرین‌های تعاملی قابل تقویت است.",
      clinical: "نمرهٔ رفتار اجتماعی مطلوب پایین‌تر از حد انتظار است؛ بررسی علت (خجالت، خشم، ناکامی یا ضعف مهارت اجتماعی) در جلسه مفید خواهد بود.",
    },
  };

  const subscales: SubscaleScore[] = tool.subscales.map((def) => {
    const score = sums[def.key];
    const status = classify(def.key, score);
    return {
      key: def.key,
      label: def.label,
      score,
      maxScore: def.maxScore,
      percent: Math.round((score / def.maxScore) * 100),
      status,
      statusLabel: statusLabelFor(status, def.isStrength),
      isStrength: Boolean(def.isStrength),
      normalRangeLabel: def.normalRangeLabel,
      interpretation: subInterpretations[def.key][status],
    };
  });

  // طبق دستورالعمل رسمی SDQ، نمره کل دشواری‌ها فقط جمع ۴ زیرمقیاس اول است (از ۴۰)
  const totalDifficulties = sums.emotional + sums.conduct + sums.hyperactivity + sums.peer;
  const internalizing = sums.emotional + sums.peer;
  const externalizing = sums.conduct + sums.hyperactivity;

  const difficultySubs = subscales.filter((s) => !s.isStrength);
  const clinicalDiffSubs = difficultySubs.filter((s) => s.status === "clinical");
  const borderlineDiffSubs = difficultySubs.filter((s) => s.status === "borderline");
  const prosocialSub = subscales.find((s) => s.key === "prosocial")!;

  let totalBand: Band =
    totalDifficulties <= 13 ? "low" : totalDifficulties <= 16 ? "moderate" : "high";

  // تحلیل هوشمند بالینی: اگر نمره کل پایین باشد ولی یک زیرمقیاس به‌تنهایی بالینی باشد، نتیجه نباید به اشتباه «کاملاً طبیعی» اعلام شود
  let band: Band = totalBand;
  if (totalBand === "low" && clinicalDiffSubs.length >= 2) {
    band = "high";
  } else if (totalBand === "low" && (clinicalDiffSubs.length === 1 || prosocialSub.status === "clinical" || profile.impact >= 2)) {
    band = "moderate";
  } else if (totalBand === "moderate" && clinicalDiffSubs.length >= 2 && profile.impact >= 2) {
    band = "high";
  }

  let patternLabel = "نیمرخ متعادل در محدودهٔ طبیعی";
  if (clinicalDiffSubs.length > 0) {
    patternLabel = `برجستگی در: ${clinicalDiffSubs.map((s) => s.label.split(" (")[0]).join("، ")}`;
  } else if (borderlineDiffSubs.length > 0) {
    patternLabel = `نشانه‌های مرزی در: ${borderlineDiffSubs.map((s) => s.label.split(" (")[0]).join("، ")}`;
  } else if (prosocialSub.status === "clinical") {
    patternLabel = "دشواری کلی پایین، اما نیازمند تقویت مهارت‌های اجتماعی–همدلی";
  }

  let headline = "وضعیت کلی رفتاری و هیجانی در محدودهٔ طبیعی";
  if (totalBand === "high") {
    headline = "نمرهٔ کل دشواری‌ها در محدودهٔ بالینی (ارزیابی تخصصی توصیه می‌شود)";
  } else if (totalBand === "moderate") {
    headline = "نمرهٔ کل دشواری‌ها در محدودهٔ مرزی (نیازمند توجه و بررسی)";
  } else if (clinicalDiffSubs.length > 0) {
    headline = `نمرهٔ کل طبیعی، اما افزایش مشخص در «${clinicalDiffSubs[0].label.split(" (")[0]}»`;
  } else if (borderlineDiffSubs.length > 0 || prosocialSub.status !== "normal" || profile.impact >= 2) {
    headline = "نمرهٔ کل طبیعی همراه با چند نشانهٔ قابل توجه برای پیگیری";
  }

  const paragraphs: string[] = [];
  if (totalBand === "low" && clinicalDiffSubs.length === 0 && borderlineDiffSubs.length === 0) {
    paragraphs.push(
      `نمرهٔ کل دشواری‌ها ${fa(totalDifficulties)} از ۴۰ است (محدودهٔ طبیعی فرم والدین SDQ: ۰ تا ۱۳) و هر چهار زیرمقیاس هیجانی، رفتاری، توجه/تحرک و ارتباط با همسالان در دامنهٔ متناسب با سن (${fa(profile.age)} سال) قرار دارند.`,
    );
  } else if (totalBand === "low" && clinicalDiffSubs.length > 0) {
    paragraphs.push(
      `هرچند جمع کل دشواری‌ها (${fa(totalDifficulties)} از ۴۰) پایین‌تر از نقطهٔ برش کلی (۱۷) است، اما در بررسی دقیق زیرمقیاس‌ها، حوزهٔ «${clinicalDiffSubs.map((s) => s.label).join(" و ")}» از حد نرمال فراتر رفته است. در کار بالینی، بالا بودن اختصاصی یک زیرمقیاس اهمیت بیشتری از نمرهٔ کل دارد و بررسی حضوری در همین زمینه پیشنهاد می‌شود.`,
    );
  } else if (totalBand === "moderate") {
    paragraphs.push(
      `نمرهٔ کل دشواری‌ها ${fa(totalDifficulties)} از ۴۰ است که در محدودهٔ مرزی (۱۴ تا ۱۶) قرار می‌گیرد. این الگو نشان می‌دهد کودک در برخی موقعیت‌ها فشار هیجانی یا چالش رفتاری قابل توجهی را تجربه می‌کند و مداخلهٔ زودهنگام می‌تواند از تثبیت مشکل جلوگیری کند.`,
    );
  } else if (totalBand === "high") {
    paragraphs.push(
      `نمرهٔ کل دشواری‌ها ${fa(totalDifficulties)} از ۴۰ است که بالاتر از نقطهٔ برش بالینی SDQ (۱۷ به بالا) قرار دارد. بیشترین سهم مربوط به ${
        internalizing > externalizing + 2
          ? `علائم درون‌ریزی (اضطراب، خلق و روابط همسالان: ${fa(internalizing)} از ۲۰)`
          : externalizing > internalizing + 2
            ? `علائم برون‌ریزی (بیش‌فعالی/نقص توجه و رفتار: ${fa(externalizing)} از ۲۰)`
            : `ترکیب علائم درون‌ریزی (${fa(internalizing)} از ۲۰) و برون‌ریزی (${fa(externalizing)} از ۲۰)`
      } است و ارزیابی حضوری توسط روانشناس کودک و نوجوان توصیه می‌شود.`,
    );
  } else {
    paragraphs.push(
      `نمرهٔ کل دشواری‌ها ${fa(totalDifficulties)} از ۴۰ در محدودهٔ طبیعی است، اما زیرمقیاس «${borderlineDiffSubs.map((s) => s.label).join(" و ")}» در مرز توجه قرار دارد و خوب است در هفته‌های آینده زیر نظر گرفته شود.`,
    );
  }

  // توضیح نقطهٔ قوت اجتماعی و میزان اثرگذاری
  if (prosocialSub.status === "normal") {
    paragraphs.push(
      `در بخش نقاط قوت، نمرهٔ رفتار اجتماعی مطلوب ${fa(sums.prosocial)} از ۱۰ (مطلوب) است؛ یعنی همدلی و تمایل به ارتباط مثبت در کودک حفظ شده که نشانهٔ بسیار امیدوارکننده‌ای است.`,
    );
  } else {
    paragraphs.push(
      `نمرهٔ رفتار اجتماعی مطلوب ${fa(sums.prosocial)} از ۱۰ است (محدودهٔ مطلوب: ۶ تا ۱۰)؛ تقویت مهارت‌های همدلی، نوبت‌گیری و بازی مشارکتی به بهبود روابط کودک کمک می‌کند.`,
    );
  }

  const impactOption = IMPACT_OPTIONS[profile.impact] ?? IMPACT_OPTIONS[0];
  if (profile.impact >= 2) {
    paragraphs.push(
      `از نگاه تکمیل‌کنندهٔ فرم، این موارد «${impactOption.label}» بر زندگی روزمرهٔ کودک اثر گذاشته است؛ در ارزیابی بالینی، وجود افت عملکرد یا رنج روزمره یکی از مهم‌ترین دلایل توصیه به جلسهٔ ارزیابی است.`,
    );
  }

  // توصیه‌های اختصاصی بر اساس زیرمقیاس‌های بالا رفته
  const steps: string[] = [];
  if (sums.emotional >= 4) {
    steps.push(
      "برای علائم هیجانی: به جای جملاتی مثل «ترس نداره»، احساس کودک را نام‌گذاری و تأیید کنید و در صورت تداوم دل‌درد/سردرد یا ترس‌ها، از بازی‌درمانی یا CBT کودک کمک بگیرید.",
    );
  }
  if (sums.conduct >= 3) {
    steps.push(
      "برای چالش‌های رفتاری: قوانین خانه را کوتاه، ثابت و قابل پیش‌بینی نگه دارید، هنگام اوج عصبانیت وارد بحث طولانی نشوید و رفتارهای آرام و همکارانه را بلافاصله تشویق مشخص کنید.",
    );
  }
  if (sums.hyperactivity >= 6) {
    steps.push(
      "برای توجه و بی‌قراری: تکالیف را به بخش‌های کوتاه ۱۵ تا ۲۰ دقیقه‌ای با استراحت حرکتی تقسیم کنید و برای بررسی دقیق‌تر، «غربالگری SNAP-IV» را نیز تکمیل کرده و بازخورد معلم را جویا شوید.",
    );
  }
  if (sums.peer >= 3 || sums.prosocial <= 5) {
    steps.push(
      "برای روابط با همسالان: موقعیت‌های بازی دونفرهٔ کوتاه و کم‌فشار با یک هم‌سال آرام فراهم کنید و در صورت احتمال آزاردیدگی در مدرسه، موضوع را با آرامش و بدون سرزنش با کودک و مشاور مدرسه بررسی کنید.",
    );
  }
  if (steps.length === 0) {
    steps.push(
      "برنامهٔ منظم خواب، تغذیه، فعالیت بدنی و ۲۰ دقیقه زمان اختصاصی روزانهٔ والد و کودک (بدون موبایل و نصیحت) را ادامه دهید.",
      "در مواجهه با تغییرات مهم (شروع سال تحصیلی، امتحانات، جابه‌جایی یا تولد فرزند جدید) گفت‌وگوی آرام دربارهٔ احساسات روزانه را حفظ کنید.",
    );
  }
  steps.push(
    "برگهٔ گزارش این ارزیابی را دانلود کنید تا در صورت مراجعهٔ حضوری، روانشناس ریز نمرات هر ۵ زیرمقیاس و پاسخ‌ها را بررسی کند.",
  );

  const clinicianMetrics: ClinicianMetric[] = [
    {
      label: "نمرهٔ کل دشواری‌ها (Total Difficulties)",
      value: `${fa(totalDifficulties)} از ${fa(40)}`,
      note: "برش والدین: ۰–۱۳ طبیعی | ۱۴–۱۶ مرزی | ۱۷–۴۰ بالینی",
    },
    {
      label: "نیمرخ درون‌ریزی (هیجانی + همسالان)",
      value: `${fa(internalizing)} از ${fa(20)}`,
      note: `هیجانی ${fa(sums.emotional)} + همسالان ${fa(sums.peer)}`,
    },
    {
      label: "نیمرخ برون‌ریزی (سلوک + بیش‌فعالی)",
      value: `${fa(externalizing)} از ${fa(20)}`,
      note: `سلوک ${fa(sums.conduct)} + بیش‌فعالی ${fa(sums.hyperactivity)}`,
    },
    {
      label: "شاخص رفتار جامعه‌پسند (Prosocial)",
      value: `${fa(sums.prosocial)} از ${fa(10)}`,
      note: "از جمع دشواری‌ها جداست؛ ۶–۱۰ مطلوب | ۵ مرزی | ۰–۴ پایین",
    },
    {
      label: "اثرگذاری عملکردی گزارش‌شده (Impact)",
      value: impactOption.label,
      note: `نمرهٔ اثرگذاری: ${fa(profile.impact)} از ${fa(3)}`,
    },
  ];

  const now = new Date();
  return {
    reportCode: makeReportCode("sdq"),
    completedAtIso: now.toISOString(),
    completedAtFa: new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(now),
    toolId: tool.id,
    toolTitle: tool.title,
    toolShortTitle: tool.shortTitle,
    englishCode: tool.englishCode,
    scientificBasis: tool.scientificBasis,
    timeframePrompt: tool.timeframePrompt,
    profile,
    impactLabel: impactOption.label,
    totalScore: totalDifficulties,
    totalMax: 40,
    totalLabel: "نمرهٔ کل دشواری‌ها",
    totalCutoffHint: "طبیعی: ۰–۱۳ | مرزی: ۱۴–۱۶ | بالینی: ۱۷–۴۰",
    gaugePercent: Math.round((totalDifficulties / 40) * 100),
    band,
    bandLabel: BAND_LABELS[band],
    headline,
    patternLabel,
    summaryParagraphs: paragraphs,
    subscales,
    clinicianMetrics,
    elevatedItems: allItems.filter((item) => item.isElevated),
    allItems,
    parentSteps: steps,
    clinicianNote:
      "یادداشت روش‌شناختی ویژهٔ درمانگر: گویه‌های ۷، ۱۱، ۱۴، ۲۱ و ۲۵ مطابق دستورالعمل استاندارد SDQ (Goodman, 1997) به‌صورت معکوس (۲→۰ و ۰→۲) نمره‌گذاری شده‌اند و زیرمقیاس رفتار جامعه‌پسند در جمع کل دشواری‌ها لحاظ نشده است. برای تکمیل تشخیص، تطبیق با فرم معلم و مصاحبهٔ بالینی پیشنهاد می‌شود.",
  };
}

/* ----------------------------- تحلیل SNAP-IV ------------------------------ */
function evaluateSnap(answers: number[], profile: ChildProfile): FullAssessmentReport {
  const tool = SNAP_TOOL;
  const allItems = buildItemDetails(tool, answers);

  const inattItems = allItems.slice(0, 9);
  const hiItems = allItems.slice(9, 18);
  const hyperOnlyItems = allItems.slice(9, 15);
  const impOnlyItems = allItems.slice(15, 18);

  const sumOf = (list: ItemResponseDetail[]) => list.reduce((acc, it) => acc + it.scoredValue, 0);
  const countClinical = (list: ItemResponseDetail[]) =>
    list.filter((it) => it.scoredValue >= 2).length;

  const inattSum = sumOf(inattItems);
  const hiSum = sumOf(hiItems);
  const hyperOnlySum = sumOf(hyperOnlyItems);
  const impOnlySum = sumOf(impOnlyItems);
  const totalSum = inattSum + hiSum;

  const inattMean = inattSum / 9;
  const hiMean = hiSum / 9;
  const totalMean = totalSum / 18;

  const inattSymptoms = countClinical(inattItems);
  const hiSymptoms = countClinical(hiItems);
  // طبق DSM-5 برای سنین تا ۱۶ سال حداقل ۶ از ۹ علامت و برای ۱۷ سال به بالا حداقل ۵ از ۹ علامت
  const dsmThreshold = profile.age >= 17 ? 5 : 6;
  const inattMeetsDsm = inattSymptoms >= dsmThreshold;
  const hiMeetsDsm = hiSymptoms >= dsmThreshold;

  const inattStatus: SubscaleStatus =
    inattMeetsDsm || inattSum >= 18
      ? "clinical"
      : inattSum >= 13 || inattSymptoms >= 4
        ? "borderline"
        : "normal";

  const hiStatus: SubscaleStatus =
    hiMeetsDsm || hiSum >= 15
      ? "clinical"
      : hiSum >= 11 || hiSymptoms >= 4
        ? "borderline"
        : "normal";

  const formatAvg = (n: number) => fa(n.toFixed(2).replace(".", "٫"));

  const subscales: SubscaleScore[] = [
    {
      key: "inattention",
      label: "نقص توجه و تمرکز (گویه‌های ۱ تا ۹)",
      score: inattSum,
      maxScore: 27,
      percent: Math.round((inattSum / 27) * 100),
      status: inattStatus,
      statusLabel: statusLabelFor(inattStatus),
      isStrength: false,
      normalRangeLabel: "۰ تا ۱۲ (میانگین ≤ ۱٫۳۳)",
      meta: `میانگین: ${formatAvg(inattMean)} از ۳ | علائم بارز (۲ یا ۳): ${fa(inattSymptoms)} از ${fa(9)}`,
      interpretation:
        inattStatus === "clinical"
          ? inattSum >= 23
            ? "نشانه‌های نقص توجه، حواس‌پرتی و دشواری در سازمان‌دهی در سطح شدید گزارش شده و از آستانهٔ غربالگری عبور کرده است."
            : "نشانه‌های نقص توجه در محدودهٔ معنادار بالینی است و ارزیابی تخصصی تمرکز و کارکردهای اجرایی توصیه می‌شود."
          : inattStatus === "borderline"
            ? "نشانه‌های خفیف تا مرزی در تمرکز و پیگیری تکالیف دیده می‌شود؛ مقایسهٔ وضعیت خانه با کلاس درس اهمیت زیادی دارد."
            : "دامنهٔ توجه، دقت و پیگیری کارها در خانه در محدودهٔ مورد انتظار سنی گزارش شده است.",
    },
    {
      key: "hyper_impulsive",
      label: "بیش‌فعالی و تکانشگری (گویه‌های ۱۰ تا ۱۸)",
      score: hiSum,
      maxScore: 27,
      percent: Math.round((hiSum / 27) * 100),
      status: hiStatus,
      statusLabel: statusLabelFor(hiStatus),
      isStrength: false,
      normalRangeLabel: "۰ تا ۱۰ (میانگین ≤ ۱٫۱۱)",
      meta: `میانگین: ${formatAvg(hiMean)} از ۳ | علائم بارز (۲ یا ۳): ${fa(hiSymptoms)} از ${fa(9)}`,
      interpretation:
        hiStatus === "clinical"
          ? hiSum >= 21
            ? "بی‌قراری حرکتی و رفتارهای تکانشی (عجله و قطع صحبت دیگران) در سطح بالا گزارش شده و نیازمند ارزیابی تخصصی است."
            : "نشانه‌های بیش‌فعالی–تکانشگری بالاتر از حد معمول سن گزارش شده و بررسی بالینی پیشنهاد می‌شود."
          : hiStatus === "borderline"
            ? "پرتحرکی یا بی‌صبری در سطح مرزی است؛ تفکیک انرژی طبیعی کودکی از تکانشگری بالینی در جلسهٔ ارزیابی مفید خواهد بود."
            : "سطح تحرک بدنی، نوبت‌گیری و مهار تکانه در محدودهٔ طبیعی گزارش شده است.",
    },
  ];

  let band: Band = "low";
  if (inattStatus === "clinical" || hiStatus === "clinical") {
    band = "high";
  } else if (inattStatus === "borderline" || hiStatus === "borderline" || profile.impact >= 2) {
    band = "moderate";
  }

  let patternLabel = "بدون الگوی بالینی برجسته در توجه و تحرک";
  let headline = "نشانه‌های توجه و تحرک در محدودهٔ طبیعی";

  if (inattStatus === "clinical" && hiStatus === "clinical") {
    patternLabel = "نیمرخ ترکیبی (نقص توجه + بیش‌فعالی/تکانشگری)";
    headline = "نشانه‌های معنادار در هر دو بُعد نقص توجه و بیش‌فعالی–تکانشگری";
  } else if (inattStatus === "clinical") {
    patternLabel = "نیمرخ با غلبهٔ نشانه‌های نقص توجه";
    headline = "نشانه‌های معنادار در بُعد نقص توجه و تمرکز (نیازمند ارزیابی تخصصی)";
  } else if (hiStatus === "clinical") {
    patternLabel = "نیمرخ با غلبهٔ نشانه‌های بیش‌فعالی و تکانشگری";
    headline = "نشانه‌های معنادار در بُعد بیش‌فعالی–تکانشگری (نیازمند ارزیابی تخصصی)";
  } else if (band === "moderate") {
    patternLabel = "نشانه‌های مرزی / تحت‌آستانه‌ای";
    headline = "برخی نشانه‌های توجه یا بی‌قراری در محدودهٔ مرزی قرار دارند";
  }

  const impactOption = IMPACT_OPTIONS[profile.impact] ?? IMPACT_OPTIONS[0];
  const paragraphs: string[] = [];

  paragraphs.push(
    `در بُعد نقص توجه نمرهٔ ${fa(inattSum)} از ۲۷ (میانگین ${formatAvg(inattMean)}؛ ${fa(inattSymptoms)} علامت بارز از ۹) و در بُعد بیش‌فعالی–تکانشگری نمرهٔ ${fa(hiSum)} از ۲۷ (میانگین ${formatAvg(hiMean)}؛ ${fa(hiSymptoms)} علامت بارز از ۹) ثبت شده است. مطابق ملاک‌های DSM-5 برای سن ${fa(profile.age)} سال، حضور حداقل ${fa(dsmThreshold)} علامت با شدت «نسبتاً زیاد» یا «خیلی زیاد» در هر بُعد از نظر غربالگری معنادار است.`,
  );

  if (band === "high") {
    paragraphs.push(
      `الگوی پاسخ‌ها با «${patternLabel}» هم‌خوانی دارد. با این حال توجه داشته باشید که صرفاً بالا بودن نمرهٔ پرسشنامه به معنای تشخیص قطعی ADHD نیست؛ طبق استانداردهای بالینی، علائم باید حداقل ۶ ماه تداوم داشته باشند، در دو محیط مستقل (مثل خانه و مدرسه) دیده شوند و عواملی مثل کم‌خوابی، اضطراب، اختلال یادگیری یا فشارهای هیجانی نیز توسط روانشناس بررسی گردند.`,
    );
  } else if (band === "moderate") {
    paragraphs.push(
      `علائم به حدنصاب کامل بالینی نرسیده‌اند اما بالاتر از میانگین عادی هستند. این حالت گاهی در کودکان پرانرژی، خسته، مضطرب یا دارای چالش در مهارت‌های مطالعه دیده می‌شود و یک جلسهٔ مشورتی و مقایسه با نظر معلم تصویر دقیقی به دست می‌دهد.`,
    );
  } else {
    paragraphs.push(
      `شدت و فراوانی رفتارهای مرتبط با حواس‌پرتی و بی‌قراری از دید والد در دامنهٔ طبیعی سن قرار دارد. اگر این رفتارها فقط در کلاس درس یا فقط سر یک درس خاص (مثلاً دیکته یا ریاضی) دیده می‌شوند، بررسی جداگانهٔ محیط کلاس یا مهارت‌های یادگیری کمک‌کننده است.`,
    );
  }

  if (profile.impact >= 2) {
    paragraphs.push(
      `میزان اثرگذاری این موارد بر زندگی روزمره و تحصیل کودک «${impactOption.label}» گزارش شده که اهمیت ارزیابی حضوری را دوچندان می‌کند.`,
    );
  }

  const steps: string[] = [];
  if (inattStatus !== "normal") {
    steps.push(
      "محیط انجام تکالیف را خلوت و کم‌محرک کنید، دستورالعمل‌ها را یک‌به‌یک (نه چند کار با هم) با تماس چشمی بگویید و زمان مطالعه را به بازه‌های کوتاه همراه با استراحت ۵ دقیقه‌ای بشکنید.",
      "از برچسب‌هایی مثل «تنبل»، «بی‌دقت» یا «حواس‌پرت» پرهیز کنید؛ نقص توجه یک تفاوت عصب‌رشدی در خودتنظیمی است، نه کم‌کاری عمدی.",
    );
  }
  if (hiStatus !== "normal") {
    steps.push(
      "پیش از تکالیف فکری، فرصت تخلیهٔ حرکتی سالم (بازی بدنی، پیاده‌روی یا ورزش) فراهم کنید و به جای تذکر مداوم، هر بار که منتظر نوبت ماند یا آرام کار کرد بلافاصله تحسینش کنید.",
    );
  }
  if (band !== "low") {
    steps.push(
      "از معلم فرزندتان نیز بخواهید به‌طور خلاصه وضعیت تمرکز، تکمیل تکالیف و نشستن در کلاس را توضیح دهد و همراه با برگهٔ دانلودشدهٔ این آزمون به جلسهٔ ارزیابی بیاورید.",
    );
  } else {
    steps.push(
      "خواب کافی شبانه، زمان محدود و مشخص برای صفحه‌نمایش و روتین ثابت عصرگاهی را حفظ کنید تا تمرکز و خودتنظیمی کودک همچنان مطلوب بماند.",
      "در صورت تمایل، می‌توانید برگهٔ نتیجه را دانلود و نگهداری کنید تا در مراجعات یا مقایسهٔ ماه‌های بعد در دسترس باشد.",
    );
  }

  const clinicianMetrics: ClinicianMetric[] = [
    {
      label: "جمع و میانگین کل SNAP-IV (۱۸ گویه)",
      value: `${fa(totalSum)} از ${fa(54)} (میانگین ${formatAvg(totalMean)})`,
      note: `نیمرخ غالب: ${patternLabel}`,
    },
    {
      label: "علائم بارز نقص توجه (نمرهٔ ۲ یا ۳)",
      value: `${fa(inattSymptoms)} از ${fa(9)} علامت`,
      note: `آستانهٔ سنی DSM-5: ≥ ${fa(dsmThreshold)} علامت | میانگین: ${formatAvg(inattMean)}`,
    },
    {
      label: "علائم بارز بیش‌فعالی–تکانشگری (نمرهٔ ۲ یا ۳)",
      value: `${fa(hiSymptoms)} از ${fa(9)} علامت`,
      note: `آستانهٔ سنی DSM-5: ≥ ${fa(dsmThreshold)} علامت | میانگین: ${formatAvg(hiMean)}`,
    },
    {
      label: "تفکیک درونی بیش‌فعالی / تکانشگری",
      value: `بیش‌فعالی ${fa(hyperOnlySum)}/۱۸ | تکانشگری ${fa(impOnlySum)}/۹`,
      note: "گویه‌های ۱۰–۱۵ بیش‌فعالی حرکتی، گویه‌های ۱۶–۱۸ تکانشگری",
    },
    {
      label: "اثرگذاری بر عملکرد روزمره (ملاک D)",
      value: impactOption.label,
      note: "نیازمند بررسی حضور علائم در محیط دوم (مدرسه)",
    },
  ];

  const now = new Date();
  return {
    reportCode: makeReportCode("snap"),
    completedAtIso: now.toISOString(),
    completedAtFa: new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(now),
    toolId: tool.id,
    toolTitle: tool.title,
    toolShortTitle: tool.shortTitle,
    englishCode: tool.englishCode,
    scientificBasis: tool.scientificBasis,
    timeframePrompt: tool.timeframePrompt,
    profile,
    impactLabel: impactOption.label,
    totalScore: totalSum,
    totalMax: 54,
    totalLabel: "نمرهٔ کل SNAP-IV",
    totalCutoffHint: `میانگین کل: ${formatAvg(totalMean)} از ۳ | نقص توجه: ${fa(inattSymptoms)}/۹، بیش‌فعالی: ${fa(hiSymptoms)}/۹ علامت بارز`,
    gaugePercent: Math.round((totalSum / 54) * 100),
    band,
    bandLabel: BAND_LABELS[band],
    headline,
    patternLabel,
    summaryParagraphs: paragraphs,
    subscales,
    clinicianMetrics,
    elevatedItems: allItems.filter((item) => item.isElevated),
    allItems,
    parentSteps: steps,
    clinicianNote:
      "یادداشت روش‌شناختی ویژهٔ درمانگر: نمره‌گذاری بر اساس فرم کوتاه ۱۸ گویه‌ای SNAP-IV والدین (لیکرت ۰ تا ۳) و شمارش هم‌زمان گویه‌های با نمرهٔ ۲ و ۳ مطابق ملاک A اختلال ADHD در DSM-5 انجام شده است. احراز ملاک‌های B (شروع پیش از ۱۲ سالگی)، C (حضور در حداقل دو محیط خانه و مدرسه)، D (افت کارکرد) و تشخیص افتراقی در مصاحبهٔ بالینی ضروری است.",
  };
}

/* ----------------------------- تحلیل SCAS-P ------------------------------- */
function evaluateScas(answers: number[], profile: ChildProfile): FullAssessmentReport {
  const tool = SCAS_TOOL;
  const allItems = buildItemDetails(tool, answers);

  const sums: Record<string, number> = {
    separation: 0,
    social: 0,
    generalized: 0,
    fears_somatic: 0,
  };

  let somaticCount = 0;
  tool.questions.forEach((q, i) => {
    sums[q.subscale] += allItems[i].scoredValue;
    if (q.tag === "somatic" && allItems[i].scoredValue >= 2) {
      somaticCount += 1;
    }
  });

  const classifySub = (s: number): SubscaleStatus =>
    s <= 3 ? "normal" : s <= 5 ? "borderline" : "clinical";

  const subInterpretations: Record<string, Record<SubscaleStatus, string>> = {
    separation: {
      normal: "توانایی جدا شدن از والدین و استقلال متناسب با سن در سطح طبیعی گزارش شده است.",
      borderline: "حساسیت و نگرانی خفیف تا متوسط هنگام جدایی یا خواب مستقل دیده می‌شود.",
      clinical:
        sums.separation >= 9
          ? "نشانه‌های اضطراب جدایی (چسبندگی، مقاومت در خواب تنها یا رفتن به مدرسه و نگرانی دربارهٔ والدین) در سطح شدید است."
          : "اضطراب جدایی بالاتر از محدودهٔ معمول سن گزارش شده و بررسی بالینی توصیه می‌شود.",
    },
    social: {
      normal: "راحتی کودک در جمع، کلاس و تعامل با دیگران در محدودهٔ طبیعی است.",
      borderline: "مقداری کم‌رویی یا نگرانی از ارزیابی در جمع دیده می‌شود که با حمایت تدریجی قابل بهبود است.",
      clinical:
        sums.social >= 9
          ? "ترس قابل توجه از ارزیابی منفی، صحبت در جمع و موقعیت‌های اجتماعی گزارش شده است."
          : "نشانه‌های اضطراب اجتماعی معنادار است و مداخلهٔ شناختی–رفتاری یا بازی‌درمانی می‌تواند بسیار کمک‌کننده باشد.",
    },
    generalized: {
      normal: "میزان نگرانی روزمره و واکنش به تغییرات در حد متعادل و طبیعی قرار دارد.",
      borderline: "گرایش به فکروخیال، کمال‌گرایی یا اطمینان‌خواهی در سطح مرزی مشاهده می‌شود.",
      clinical:
        sums.generalized >= 9
          ? "نگرانی مفرط، دلشورهٔ پیوسته و نیاز شدید به اطمینان‌گیری در سطح بالا گزارش شده است."
          : "علائم اضطراب فراگیر و نگرانی بیش‌ازحد بالاتر از هنجار است و آموزش مهارت‌های تنظیم اضطراب توصیه می‌شود.",
    },
    fears_somatic: {
      normal: "ترس‌های اختصاصی و واکنش‌های بدنی ترس در محدودهٔ طبیعی رشد است.",
      borderline: "ترس‌های موقعیتی یا علائم بدنی خفیف هنگام استرس گزارش شده است.",
      clinical:
        sums.fears_somatic >= 9
          ? "ترس‌های شدید همراه با علائم بدنی برانگیختگی (تپش قلب، لرزش یا اجتناب بارز) گزارش شده است."
          : "ترس‌های اختصاصی یا واکنش‌های بدنی اضطراب قابل توجه است و مواجههٔ تدریجی درمانی کمک‌کننده خواهد بود.",
    },
  };

  const subscales: SubscaleScore[] = tool.subscales.map((def) => {
    const score = sums[def.key];
    const status = classifySub(score);
    return {
      key: def.key,
      label: def.label,
      score,
      maxScore: def.maxScore,
      percent: Math.round((score / def.maxScore) * 100),
      status,
      statusLabel: statusLabelFor(status),
      isStrength: false,
      normalRangeLabel: def.normalRangeLabel,
      interpretation: subInterpretations[def.key][status],
    };
  });

  const totalScore = sums.separation + sums.social + sums.generalized + sums.fears_somatic;
  const clinicalSubs = subscales.filter((s) => s.status === "clinical");
  const severeSubs = subscales.filter((s) => s.score >= 9);
  const borderlineSubs = subscales.filter((s) => s.status === "borderline");

  let totalBand: Band = totalScore <= 13 ? "low" : totalScore <= 22 ? "moderate" : "high";
  let band: Band = totalBand;

  // اگر فقط یک نوع اضطراب (مثلاً اضطراب جدایی ۱۰ از ۱۲) خیلی بالا باشد، حتی با نمره کل پایین باید دقیق شناسایی شود
  if (severeSubs.length >= 1 || clinicalSubs.length >= 2) {
    band = "high";
  } else if (totalBand === "low" && (clinicalSubs.length === 1 || profile.impact >= 2)) {
    band = "moderate";
  }

  let patternLabel = "سطح اضطراب در محدودهٔ طبیعی رشد";
  let headline = "نشانه‌های اضطراب در محدودهٔ طبیعی گزارش شده است";

  if (clinicalSubs.length > 0) {
    const names = clinicalSubs.map((s) => s.label).join("، ");
    patternLabel = `کانون اصلی اضطراب: ${names}`;
    headline =
      band === "high"
        ? `نشانه‌های معنادار اضطراب (به‌ویژه در ${clinicalSubs[0].label})`
        : `نمرهٔ کل خفیف، اما افزایش مشخص در «${clinicalSubs[0].label}»`;
  } else if (borderlineSubs.length > 0 || band === "moderate") {
    patternLabel =
      borderlineSubs.length > 0
        ? `حساسیت اضطرابی مرزی در: ${borderlineSubs.map((s) => s.label).join("، ")}`
        : "نشانه‌های خفیف و پراکندهٔ اضطرابی";
    headline = "نشانه‌های اضطرابی در محدودهٔ مرزی (نیازمند توجه حمایتی)";
  }

  const impactOption = IMPACT_OPTIONS[profile.impact] ?? IMPACT_OPTIONS[0];
  const paragraphs: string[] = [];

  if (clinicalSubs.length === 0 && totalBand === "low") {
    paragraphs.push(
      `نمرهٔ کل اضطراب ${fa(totalScore)} از ۴۸ است (محدودهٔ طبیعی: ۰ تا ۱۳) و هیچ‌یک از چهار زیرمقیاس اضطراب جدایی، اجتماعی، فراگیر و ترس‌های اختصاصی در محدودهٔ بالینی قرار نگرفته‌اند.`,
    );
  } else if (totalBand === "low" && clinicalSubs.length > 0) {
    paragraphs.push(
      `با اینکه جمع کل نمرات (${fa(totalScore)} از ۴۸) پایین است، اما اضطراب کودک به‌صورت متمرکز در بُعد «${clinicalSubs.map((s) => s.label).join(" و ")}» بالا رفته است. بسیاری از کودکان فقط یک نوع خاص از اضطراب (مثلاً فقط اضطراب جدایی یا فقط اضطراب اجتماعی) دارند و شناسایی دقیق همین کانون به درمان هدفمند و کوتاه‌تر کمک می‌کند.`,
    );
  } else {
    paragraphs.push(
      `نمرهٔ کل اضطراب ${fa(totalScore)} از ۴۸ ثبت شده و بیشترین نشانه‌ها در ${
        clinicalSubs.length > 0
          ? `«${clinicalSubs.map((s) => `${s.label} (${fa(s.score)} از ۱۲)`).join("، ")}»`
          : `«${borderlineSubs.map((s) => `${s.label} (${fa(s.score)} از ۱۲)`).join("، ")}»`
      } دیده می‌شود.`,
    );
  }

  if (somaticCount > 0) {
    paragraphs.push(
      `در پاسخ‌های شما ${fa(somaticCount)} نشانهٔ بدنی بارز مرتبط با اضطراب (مثل دل‌درد/سردرد، تپش قلب یا لرزش) دیده می‌شود. در کودکان و نوجوانان، اضطراب اغلب خود را از طریق بدن نشان می‌دهد و پس از اطمینان از سلامت جسمی، تمرین‌های آرام‌سازی بدنی بسیار مؤثر است.`,
    );
  }

  if (profile.age <= 6 && (sums.separation >= 4 || sums.fears_somatic >= 4)) {
    paragraphs.push(
      `توجه تحولی: در سن ${fa(profile.age)} سال، بخشی از ترس از تاریکی یا دلتنگی هنگام جدایی می‌تواند رنگ‌وبوی رشدی داشته باشد؛ معیار اصلی نیاز به درمان، شدت بی‌قراری و میزان اختلال در مهد/پیش‌دبستانی، خواب و آرامش خانواده است (اثرگذاری گزارش‌شده: «${impactOption.label}»).`,
    );
  } else if (profile.impact >= 2) {
    paragraphs.push(
      `اثرگذاری این علائم بر زندگی روزمره، خواب، مدرسه یا روابط کودک «${impactOption.label}» گزارش شده است؛ بنابراین مراجعه برای ارزیابی حضوری توصیه می‌شود.`,
    );
  }

  const steps: string[] = [];
  if (sums.separation >= 4) {
    steps.push(
      "برای اضطراب جدایی: خداحافظی‌ها را کوتاه، گرم، قابل پیش‌بینی و بدون پنهانی رفتن انجام دهید و گام‌های کوچک استقلال (مثل خوابیدن مستقل) را پله‌پله و با تشویق پیش ببرید.",
    );
  }
  if (sums.social >= 4) {
    steps.push(
      "برای اضطراب اجتماعی: از هل دادن ناگهانی کودک به صحبت در جمع یا برچسب «خجالتی» در حضور دیگران پرهیز کنید و در عین حال به جای او هم همیشه پاسخ ندهید؛ فرصت‌های کوچک و موفق تعامل بسازید.",
    );
  }
  if (sums.generalized >= 4) {
    steps.push(
      "برای نگرانی و کمال‌گرایی: تلاش کودک را به‌جای نتیجهٔ بی‌نقص تحسین کنید و در برابر سؤال‌های تکراری اطمینان‌جویانه، پس از یک پاسخ آرام و روشن، به کودک کمک کنید خودش احتمال واقعی را بسنجد.",
    );
  }
  if (sums.fears_somatic >= 4 || somaticCount > 0) {
    steps.push(
      "برای ترس‌ها و علائم بدنی: تنفس آرام شکمی (دم آرام از بینی و بازدم طولانی‌تر از دهان) را در زمان‌های آرامش به‌شکل بازی تمرین کنید و از اجتناب کامل یا اجبار ناگهانی پرهیز نمایید.",
    );
  }
  if (steps.length === 0) {
    steps.push(
      "فضای گفت‌وگوی باز دربارهٔ احساسات روزانه، خواب منظم و تشویق استقلال متناسب با سن کودک را ادامه دهید.",
    );
  }
  steps.push(
    "گزارش کامل زیرمقیاس‌ها و ریز پاسخ‌ها را از دکمه‌های پایین صفحه دانلود کنید تا در جلسهٔ حضوری در اختیار روانشناس قرار گیرد.",
  );

  const avoidanceElevated = (allItems[15]?.scoredValue ?? 0) >= 2;
  const clinicianMetrics: ClinicianMetric[] = [
    {
      label: "نمرهٔ کل غربالگری اضطراب (۱۶ گویه)",
      value: `${fa(totalScore)} از ${fa(48)}`,
      note: "۰–۱۳ طبیعی | ۱۴–۲۲ مرزی | ۲۳–۴۸ بالینی",
    },
    {
      label: "تعداد زیرمقیاس‌های در محدودهٔ بالینی (≥ ۶)",
      value: `${fa(clinicalSubs.length)} از ${fa(4)} بُعد`,
      note: clinicalSubs.length > 0 ? clinicalSubs.map((s) => s.label).join("، ") : "هیچ بُعدی بالای برش نیست",
    },
    {
      label: "علائم بدنی برانگیختگی (Somatic)",
      value: `${fa(somaticCount)} از ${fa(3)} گویه بارز`,
      note: "گویه‌های ۱۰ (گوارشی/سردرد)، ۱۴ (قلبی–تنفسی)، ۱۵ (لرزش/تعریق)",
    },
    {
      label: "رفتار اجتنابی بارز (گویهٔ ۱۶)",
      value: avoidanceElevated ? "بله (گزارش‌شده)" : "خیر / خفیف",
      note: `پاسخ ثبت‌شده: ${allItems[15]?.selectedLabel ?? "—"}`,
    },
    {
      label: "اثرگذاری بر عملکرد روزمره",
      value: impactOption.label,
      note: `سن کودک: ${fa(profile.age)} سال`,
    },
  ];

  const now = new Date();
  return {
    reportCode: makeReportCode("scas"),
    completedAtIso: now.toISOString(),
    completedAtFa: new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(now),
    toolId: tool.id,
    toolTitle: tool.title,
    toolShortTitle: tool.shortTitle,
    englishCode: tool.englishCode,
    scientificBasis: tool.scientificBasis,
    timeframePrompt: tool.timeframePrompt,
    profile,
    impactLabel: impactOption.label,
    totalScore,
    totalMax: 48,
    totalLabel: "نمرهٔ کل اضطراب",
    totalCutoffHint: "طبیعی: ۰–۱۳ | مرزی: ۱۴–۲۲ | بالینی: ۲۳–۴۸ (برش هر بُعد: ≥ ۶)",
    gaugePercent: Math.round((totalScore / 48) * 100),
    band,
    bandLabel: BAND_LABELS[band],
    headline,
    patternLabel,
    summaryParagraphs: paragraphs,
    subscales,
    clinicianMetrics,
    elevatedItems: allItems.filter((item) => item.isElevated),
    allItems,
    parentSteps: steps,
    clinicianNote:
      "یادداشت روش‌شناختی ویژهٔ درمانگر: این فرم کوتاه والدین چهار قلمرو اضطراب جدایی، اضطراب اجتماعی، اضطراب فراگیر و ترس‌های اختصاصی/علائم بدنی را بر پایهٔ سازه‌های SCAS-P (Spence, 1999) و SCARED-P در مقیاس لیکرت ۰ تا ۳ ارزیابی می‌کند. هم‌پوشانی علائم درونی اضطراب با گزارش خود کودک/نوجوان در مصاحبهٔ بالینی بررسی گردد.",
  };
}

export function evaluateAssessment(
  toolId: ToolId,
  answers: number[],
  profile: ChildProfile,
): FullAssessmentReport {
  if (toolId === "snap") return evaluateSnap(answers, profile);
  if (toolId === "scas") return evaluateScas(answers, profile);
  return evaluateSdq(answers, profile);
}
