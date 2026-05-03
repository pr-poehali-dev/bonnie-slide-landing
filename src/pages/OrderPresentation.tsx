import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

// ─── QUIZ CONFIG ──────────────────────────────────────────────────────────────

const TYPES = [
  { id: "sales",     icon: "TrendingUp",   label: "Продающая",       desc: "Для клиентов, партнёров и инвесторов" },
  { id: "report",    icon: "BarChart2",    label: "Отчётная",        desc: "Финансы, итоги, KPI, результаты" },
  { id: "pitch",     icon: "Rocket",       label: "Питч-дек",        desc: "Привлечение инвестиций и финансирования" },
  { id: "internal",  icon: "Users",        label: "Внутренняя",      desc: "Для команды, совещания, стратегия" },
  { id: "event",     icon: "Presentation", label: "Для выступления", desc: "Конференция, форум, публичное мероприятие" },
  { id: "product",   icon: "Package",      label: "Продуктовая",     desc: "Описание продукта, каталог, лукбук" },
  { id: "proposal",  icon: "FileText",     label: "Коммерческое предложение", desc: "КП, тендер, тендерная заявка" },
  { id: "other",     icon: "Shuffle",      label: "Другое",          desc: "Расскажите подробнее в форме" },
];

const SLIDE_COUNTS = [
  { id: "s10",  label: "до 10 слайдов",  price: 0,     mark: "" },
  { id: "s20",  label: "10–20 слайдов",  price: 0,     mark: "Самый популярный" },
  { id: "s40",  label: "20–40 слайдов",  price: 0,     mark: "" },
  { id: "s40p", label: "40+ слайдов",    price: 0,     mark: "" },
  { id: "sunk", label: "Не знаю",        price: 0,     mark: "" },
];

const STYLES = [
  { id: "corporate", label: "Корпоративный",  desc: "Строго, по брендбуку, деловой стиль" },
  { id: "creative",  label: "Креативный",     desc: "Яркий, нестандартный, запоминающийся" },
  { id: "minimal",   label: "Минималистичный",desc: "Чисто, просто, без лишнего" },
  { id: "data",      label: "Дата-ориентированный", desc: "Акцент на графиках, таблицах, цифрах" },
  { id: "story",     label: "Сторителлинг",   desc: "Нарратив, эмоции, история бренда" },
  { id: "notsure",   label: "Посоветуйте сам", desc: "Доверяю вашей экспертизе" },
];

const DEADLINES = [
  { id: "d3",   label: "Срочно — до 3 дней",     mark: "Доп. оплата" },
  { id: "d7",   label: "До 7 дней",               mark: "Стандарт" },
  { id: "d14",  label: "До 2 недель",              mark: "Оптимально" },
  { id: "d30",  label: "До месяца",               mark: "Без спешки" },
  { id: "dunk", label: "Дата ещё не определена",  mark: "" },
];

const EXTRAS = [
  { id: "content",   icon: "PenLine",      label: "Написание текстов",      desc: "Разработаем смысловую структуру и тексты с нуля" },
  { id: "infograph", icon: "PieChart",     label: "Инфографика",            desc: "Схемы, процессы, диаграммы под ваш контент" },
  { id: "animation", icon: "Play",         label: "Анимация",               desc: "Анимация элементов для живого восприятия" },
  { id: "video",     icon: "Video",        label: "Видеоролик",             desc: "Короткий промо или объясняющий видеоролик" },
  { id: "template",  icon: "Layout",       label: "Корпоративный шаблон",   desc: "Готовый шаблон для будущих презентаций команды" },
  { id: "branding",  icon: "Palette",      label: "Разработка брендинга",   desc: "Логотип, фирменный стиль, цвета, шрифты" },
];

const BUDGETS = [
  { id: "b50",   label: "до 50 000 ₽",       desc: "Небольшой проект до 15 слайдов" },
  { id: "b100",  label: "50 000 – 100 000 ₽", desc: "Стандартный проект с проработкой" },
  { id: "b200",  label: "100 000 – 200 000 ₽",desc: "Комплексный проект с анимацией" },
  { id: "b200p", label: "от 200 000 ₽",      desc: "Топ-уровень для серьёзных задач" },
  { id: "bunk",  label: "Не знаю",           desc: "Помогите определиться" },
];

// ─── PORTFOLIO ITEMS ──────────────────────────────────────────────────────────

const PORTFOLIO = [
  {
    title: "Pitch-дек для EdTech стартапа",
    slides: "18 слайдов",
    tags: ["Питч-дек", "Инфографика", "Анимация"],
    result: "Привлекли $2,5 млн на серии А",
    color: "from-blue-900/50",
    emoji: "🚀",
  },
  {
    title: "Годовой отчёт нефтяной компании",
    slides: "64 слайда",
    tags: ["Отчётная", "Данные", "Брендинг"],
    result: "Публичная презентация для акционеров",
    color: "from-amber-900/50",
    emoji: "📊",
  },
  {
    title: "КП для крупного ритейлера",
    slides: "24 слайда",
    tags: ["КП", "Продающая", "Сторителлинг"],
    result: "Конверсия встреч выросла на 40%",
    color: "from-green-900/50",
    emoji: "💼",
  },
  {
    title: "Продуктовая презентация SaaS",
    slides: "32 слайда",
    tags: ["Продуктовая", "Минимализм"],
    result: "Запуск на Product Hunt — топ-5 недели",
    color: "from-purple-900/50",
    emoji: "💎",
  },
  {
    title: "Стратегия для совета директоров",
    slides: "28 слайдов",
    tags: ["Внутренняя", "Корпоративный стиль"],
    result: "Принята стратегия роста на 3 года",
    color: "from-red-900/50",
    emoji: "🎯",
  },
  {
    title: "Форумная презентация для CEO",
    slides: "42 слайда",
    tags: ["Выступление", "Анимация", "Видео"],
    result: "ТОП-10 спикеров форума по оценкам",
    color: "from-teal-900/50",
    emoji: "🎤",
  },
];

const WHY = [
  { icon: "Award",       title: "Топ-1 студия",           desc: "По версии рейтинга Ruward и отзывам клиентов в открытых источниках" },
  { icon: "Users",       title: "80 000+ клиентов",       desc: "Частные и корпоративные клиенты по всей России и за рубежом" },
  { icon: "Shield",      title: "NDA на каждый проект",   desc: "Подписываем соглашение о неразглашении по вашей форме или нашей" },
  { icon: "Repeat",      title: "Правки включены",        desc: "До финального результата — без счётчика правок и дополнительных счетов" },
  { icon: "Clock",       title: "Соблюдаем дедлайны",     desc: "Берём проект только если уверены в сроке. Штраф 5% за каждый день просрочки" },
  { icon: "Sparkles",    title: "ИИ в процессе",          desc: "Используем нейросети для ускорения структуры и генерации визуалов" },
  { icon: "FileCheck",   title: "Исходники ваши",         desc: "Передаём полный пакет: PPTX, PDF, шрифты, изображения" },
  { icon: "Headphones",  title: "Поддержка после",        desc: "Ещё 2 недели отвечаем на вопросы и вносим небольшие правки бесплатно" },
];

const PROCESS = [
  { num: "01", title: "Заявка и бриф",       desc: "Заполняете форму → менеджер связывается в течение 2 часов → заполняем бриф по шаблону", icon: "FileText" },
  { num: "02", title: "Структура",           desc: "Разрабатываем логическую структуру и драфт текстов на согласование", icon: "Layers" },
  { num: "03", title: "Дизайн-концепция",    desc: "Показываем 2–3 варианта первого слайда, выбираете направление", icon: "Palette" },
  { num: "04", title: "Готовая презентация", desc: "Дизайним все слайды, вносим правки до финального «ОК»", icon: "CheckCircle" },
];

const FAQ = [
  {
    q: "Нужен ли мне контент или вы пишете сами?",
    a: "Оба варианта. Если контент есть — берём за основу и адаптируем. Если нет — дополнительно разработаем структуру и тексты. Это указывается в брифе.",
  },
  {
    q: "Сколько времени займёт разработка?",
    a: "Стандартный срок — 7–14 дней. Срочные проекты (3–5 дней) возможны с доп. коэффициентом. Точный срок фиксируется в договоре.",
  },
  {
    q: "В каком формате получу файл?",
    a: "PPTX (PowerPoint), PDF для рассылки, и по запросу — Keynote или Google Slides. Исходники и шрифты всегда в комплекте.",
  },
  {
    q: "Сколько правок включено?",
    a: "Правки включены до финального результата. Мы не считаем итерации — работаем пока не получите то, что нужно.",
  },
  {
    q: "Можете работать в нашем корпоративном шаблоне?",
    a: "Да, это стандартная практика. Присылаете шаблон и брендбук — работаем строго внутри гайдлайнов.",
  },
  {
    q: "Есть ли договор и официальные документы?",
    a: "Да. Договор, счёт, акт, закрывающие документы — всё официально. Работаем с юрлицами и самозанятыми.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function OrderPresentation() {
  const [step, setStep] = useState(0); // 0 = quiz, 1 = contact form, 2 = done
  const [quizStep, setQuizStep] = useState(0); // 0..4
  const [answers, setAnswers] = useState({
    type: "" as string,
    slides: "" as string,
    style: "" as string,
    deadline: "" as string,
    extras: [] as string[],
    budget: "" as string,
  });
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", comment: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const TOTAL_QUIZ = 5; // type, slides, style, deadline, budget
  const progress = Math.round(((quizStep) / TOTAL_QUIZ) * 100);

  // Scroll to quiz when step changes
  useEffect(() => {
    if (quizStep > 0 || step > 0) {
      document.getElementById("order-quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [quizStep, step]);

  function canNext() {
    if (quizStep === 0) return !!answers.type;
    if (quizStep === 1) return !!answers.slides;
    if (quizStep === 2) return !!answers.style;
    if (quizStep === 3) return !!answers.deadline;
    if (quizStep === 4) return !!answers.budget;
    return false;
  }

  function nextQuiz() {
    if (quizStep < TOTAL_QUIZ - 1) setQuizStep((s) => s + 1);
    else setStep(1); // go to contact form
  }

  function toggleExtra(id: string) {
    setAnswers((prev) => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter((x) => x !== id) : [...prev.extras, id],
    }));
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  // Summary labels
  const typeLabel = TYPES.find((t) => t.id === answers.type)?.label ?? "";
  const slidesLabel = SLIDE_COUNTS.find((s) => s.id === answers.slides)?.label ?? "";
  const deadlineLabel = DEADLINES.find((d) => d.id === answers.deadline)?.label ?? "";
  const budgetLabel = BUDGETS.find((b) => b.id === answers.budget)?.label ?? "";
  const extraLabels = answers.extras.map((id) => EXTRAS.find((e) => e.id === id)?.label).filter(Boolean);

  return (
    <div className="min-h-screen bg-vibe-dark font-golos overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-vibe-dark/95 backdrop-blur-sm border-b border-vibe-dark3">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex flex-col gap-0.5 flex-shrink-0">
            <Logo width={110} height={13} />
            <span className="text-vibe-muted text-[10px] tracking-wide">дизайн-студия</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-xs text-vibe-muted">
            <a href="#why" className="hover:text-vibe-light transition-colors">Почему мы</a>
            <a href="#portfolio" className="hover:text-vibe-light transition-colors">Портфолио</a>
            <a href="#process" className="hover:text-vibe-light transition-colors">Процесс</a>
            <a href="#faq" className="hover:text-vibe-light transition-colors">FAQ</a>
          </div>
          <a href="#order-quiz"
            className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-5 py-2.5 hover:bg-red-700 transition-colors flex items-center gap-2">
            <Icon name="ArrowRight" size={14} />
            Заказать
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Bg grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-vibe-dark to-transparent" />
        {/* Red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-vibe-red/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 border border-vibe-red/40 px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 bg-vibe-red rounded-full animate-pulse" />
            <span className="text-vibe-red text-xs font-oswald uppercase tracking-widest">Дизайн-студия презентаций</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-8xl text-vibe-light leading-[0.9] mb-6">
            СДЕЛАЕМ<br />
            <span className="text-vibe-red">ПРЕЗЕНТАЦИЮ</span><br />
            ЗА ВАС
          </h1>
          <p className="text-vibe-muted text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Профессиональный дизайн, сильная структура и тексты. От брифа до финального файла.
          </p>

          {/* Social proof bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { num: "10 лет", label: "на рынке" },
              { num: "3 000+", label: "проектов" },
              { num: "200+", label: "компаний в портфеле" },
              { num: "4,9/5", label: "средняя оценка" },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <div className="font-oswald text-2xl text-vibe-red">{s.num}</div>
                <div className="text-vibe-muted text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          <a href="#order-quiz"
            className="inline-flex items-center gap-3 bg-vibe-red text-white font-oswald uppercase tracking-widest px-10 py-5 text-xl hover:bg-red-700 transition-all group">
            Оставить заявку
            <Icon name="ArrowDown" size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <p className="text-vibe-muted text-xs mt-4">Ответим в течение 2 часов в рабочее время</p>
        </div>
      </section>

      {/* ── ORDER QUIZ / FORM / DONE ── */}
      <section id="order-quiz" className="py-20 bg-vibe-dark2 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-5">

          {step === 0 && (
            /* ─── QUIZ ─── */
            <>
              <div className="text-center mb-10">
                <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">
                  Заполните бриф — это займёт 2 минуты
                </div>
                <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
                  Расскажите о задаче
                </h2>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-vibe-muted text-xs font-oswald">Шаг {quizStep + 1} из {TOTAL_QUIZ}</span>
                  {quizStep > 0 && (
                    <button onClick={() => setQuizStep((s) => s - 1)}
                      className="text-vibe-muted text-xs flex items-center gap-1 hover:text-vibe-red transition-colors">
                      <Icon name="ChevronLeft" size={13} /> Назад
                    </button>
                  )}
                </div>
                <div className="h-0.5 bg-vibe-dark3">
                  <div className="h-full bg-vibe-red transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Step 0: Type */}
              {quizStep === 0 && (
                <div>
                  <h3 className="font-oswald text-2xl md:text-3xl text-vibe-light mb-6">
                    Какой тип презентации нужен?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {TYPES.map((t) => (
                      <button key={t.id} onClick={() => setAnswers((a) => ({ ...a, type: t.id }))}
                        className={`flex items-center gap-4 p-4 border text-left transition-all group ${
                          answers.type === t.id
                            ? "border-vibe-red bg-vibe-red/8"
                            : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                        }`}>
                        <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${
                          answers.type === t.id ? "bg-vibe-red" : "bg-vibe-dark"
                        }`}>
                          {answers.type === t.id
                            ? <Icon name="Check" size={16} className="text-white" />
                            : <Icon name={t.icon} fallback="File" size={16} className="text-vibe-muted" />}
                        </div>
                        <div>
                          <div className={`font-oswald text-sm uppercase tracking-wide ${answers.type === t.id ? "text-vibe-red" : "text-vibe-light"}`}>{t.label}</div>
                          <div className="text-vibe-muted text-xs mt-0.5">{t.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Slides */}
              {quizStep === 1 && (
                <div>
                  <h3 className="font-oswald text-2xl md:text-3xl text-vibe-light mb-6">
                    Сколько примерно слайдов?
                  </h3>
                  <div className="space-y-3 mb-8">
                    {SLIDE_COUNTS.map((s) => (
                      <button key={s.id} onClick={() => setAnswers((a) => ({ ...a, slides: s.id }))}
                        className={`w-full flex items-center justify-between px-5 py-4 border text-left transition-all ${
                          answers.slides === s.id
                            ? "border-vibe-red bg-vibe-red/8"
                            : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            answers.slides === s.id ? "border-vibe-red" : "border-vibe-muted/40"
                          }`}>
                            {answers.slides === s.id && <div className="w-2 h-2 bg-vibe-red rounded-full" />}
                          </div>
                          <span className={`font-oswald text-sm uppercase tracking-wide ${answers.slides === s.id ? "text-vibe-red" : "text-vibe-light"}`}>{s.label}</span>
                        </div>
                        {s.mark && (
                          <span className="text-xs border border-vibe-red/30 text-vibe-red px-2 py-0.5 font-oswald">{s.mark}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Style */}
              {quizStep === 2 && (
                <div>
                  <h3 className="font-oswald text-2xl md:text-3xl text-vibe-light mb-6">
                    Какой стиль оформления?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {STYLES.map((s) => (
                      <button key={s.id} onClick={() => setAnswers((a) => ({ ...a, style: s.id }))}
                        className={`p-5 border text-left transition-all ${
                          answers.style === s.id
                            ? "border-vibe-red bg-vibe-red/8"
                            : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                        }`}>
                        <div className={`font-oswald text-sm uppercase tracking-wide mb-1 ${answers.style === s.id ? "text-vibe-red" : "text-vibe-light"}`}>{s.label}</div>
                        <div className="text-vibe-muted text-xs">{s.desc}</div>
                        {answers.style === s.id && (
                          <div className="mt-2 flex items-center gap-1">
                            <Icon name="Check" size={13} className="text-vibe-red" />
                            <span className="text-vibe-red text-xs font-oswald uppercase">Выбрано</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Deadline */}
              {quizStep === 3 && (
                <div>
                  <h3 className="font-oswald text-2xl md:text-3xl text-vibe-light mb-6">
                    В какие сроки нужна презентация?
                  </h3>
                  <div className="space-y-3 mb-8">
                    {DEADLINES.map((d) => (
                      <button key={d.id} onClick={() => setAnswers((a) => ({ ...a, deadline: d.id }))}
                        className={`w-full flex items-center justify-between px-5 py-4 border text-left transition-all ${
                          answers.deadline === d.id
                            ? "border-vibe-red bg-vibe-red/8"
                            : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            answers.deadline === d.id ? "border-vibe-red" : "border-vibe-muted/40"
                          }`}>
                            {answers.deadline === d.id && <div className="w-2 h-2 bg-vibe-red rounded-full" />}
                          </div>
                          <span className={`font-oswald text-sm uppercase tracking-wide ${answers.deadline === d.id ? "text-vibe-red" : "text-vibe-light"}`}>{d.label}</span>
                        </div>
                        {d.mark && (
                          <span className={`text-xs px-2 py-0.5 font-oswald border ${
                            d.mark === "Доп. оплата"
                              ? "border-amber-500/30 text-amber-400"
                              : d.mark === "Стандарт"
                              ? "border-vibe-dark3 text-vibe-muted"
                              : "border-green-500/30 text-green-400"
                          }`}>{d.mark}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Budget */}
              {quizStep === 4 && (
                <div>
                  <h3 className="font-oswald text-2xl md:text-3xl text-vibe-light mb-2">
                    Предполагаемый бюджет?
                  </h3>
                  <p className="text-vibe-muted text-sm mb-6">Это поможет подобрать оптимальный состав работ</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {BUDGETS.map((b) => (
                      <button key={b.id} onClick={() => setAnswers((a) => ({ ...a, budget: b.id }))}
                        className={`p-5 border text-left transition-all ${
                          answers.budget === b.id
                            ? "border-vibe-red bg-vibe-red/8"
                            : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                        }`}>
                        <div className={`font-oswald text-base mb-1 ${answers.budget === b.id ? "text-vibe-red" : "text-vibe-light"}`}>{b.label}</div>
                        <div className="text-vibe-muted text-xs">{b.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Extras (optional) */}
                  <div className="border-t border-vibe-dark3 pt-6 mb-8">
                    <p className="text-vibe-muted text-sm mb-4">Дополнительные услуги (необязательно):</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {EXTRAS.map((ex) => (
                        <button key={ex.id} onClick={() => toggleExtra(ex.id)}
                          className={`flex items-center gap-3 p-3 border text-left transition-all ${
                            answers.extras.includes(ex.id)
                              ? "border-vibe-red/50 bg-vibe-red/5"
                              : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/30"
                          }`}>
                          <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 ${
                            answers.extras.includes(ex.id) ? "bg-vibe-red border-vibe-red" : "border-vibe-muted/30"
                          }`}>
                            {answers.extras.includes(ex.id) && <Icon name="Check" size={11} className="text-white" />}
                          </div>
                          <div>
                            <div className={`text-xs font-oswald uppercase tracking-wide ${answers.extras.includes(ex.id) ? "text-vibe-red" : "text-vibe-light"}`}>{ex.label}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Nav button */}
              <button onClick={nextQuiz} disabled={!canNext()}
                className={`w-full font-oswald uppercase tracking-widest py-4 text-lg transition-all flex items-center justify-center gap-2 ${
                  canNext()
                    ? "bg-vibe-red text-white hover:bg-red-700"
                    : "bg-vibe-dark3 text-vibe-muted cursor-not-allowed"
                }`}>
                {quizStep < TOTAL_QUIZ - 1 ? "Далее" : "Перейти к оформлению заявки"}
                <Icon name="ArrowRight" size={16} />
              </button>
              <p className="text-vibe-muted text-xs text-center mt-3">Без обязательств — просто узнаём детали</p>
            </>
          )}

          {step === 1 && (
            /* ─── CONTACT FORM ─── */
            <div>
              <div className="text-center mb-8">
                <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">
                  Последний шаг
                </div>
                <h2 className="font-oswald text-4xl text-vibe-light">Как с вами связаться?</h2>
                <p className="text-vibe-muted text-sm mt-2">Ответим в течение 2 часов и обсудим детали</p>
              </div>

              {/* Brief summary */}
              {(typeLabel || slidesLabel) && (
                <div className="bg-vibe-dark3 border border-vibe-dark3 p-5 mb-6">
                  <div className="text-vibe-red text-xs font-oswald uppercase tracking-widest mb-3">Ваш бриф</div>
                  <div className="flex flex-wrap gap-2">
                    {typeLabel && <span className="text-xs border border-vibe-dark3 text-vibe-muted px-2 py-1">{typeLabel}</span>}
                    {slidesLabel && <span className="text-xs border border-vibe-dark3 text-vibe-muted px-2 py-1">{slidesLabel}</span>}
                    {deadlineLabel && <span className="text-xs border border-vibe-dark3 text-vibe-muted px-2 py-1">{deadlineLabel}</span>}
                    {budgetLabel && <span className="text-xs border border-vibe-dark3 text-vibe-muted px-2 py-1">{budgetLabel}</span>}
                    {extraLabels.map((l) => <span key={l} className="text-xs border border-vibe-red/30 text-vibe-red px-2 py-1">+ {l}</span>)}
                  </div>
                </div>
              )}

              <form onSubmit={submitForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Имя *</label>
                    <input required type="text" placeholder="Иван Иванов"
                      value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                  </div>
                  <div>
                    <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Телефон *</label>
                    <input required type="tel" placeholder="+7 (999) 000-00-00"
                      value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Email *</label>
                  <input required type="email" placeholder="ivan@company.ru"
                    value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                </div>
                <div>
                  <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Компания</label>
                  <input type="text" placeholder="Название вашей компании"
                    value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                </div>
                <div>
                  <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Комментарий</label>
                  <textarea rows={3} placeholder="Расскажите подробнее о задаче — что хотите донести, для кого, есть ли материалы..."
                    value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                    className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-5 text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  Отправить заявку
                  <Icon name="ArrowRight" size={18} />
                </button>
                <p className="text-vibe-muted text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>

              <button onClick={() => { setStep(0); setQuizStep(4); }}
                className="mt-4 text-vibe-muted text-xs hover:text-vibe-red transition-colors flex items-center gap-1">
                <Icon name="ChevronLeft" size={13} /> Вернуться к брифу
              </button>
            </div>
          )}

          {step === 2 && (
            /* ─── SUCCESS ─── */
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-vibe-red/10 border border-vibe-red/20 flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} className="text-vibe-red" />
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light mb-4">
                Заявка принята!
              </h2>
              <p className="text-vibe-muted text-base leading-relaxed max-w-md mx-auto mb-8">
                Менеджер изучит бриф и свяжется с вами в течение <strong className="text-vibe-light">2 часов</strong> в рабочее время. Подготовим оценку и обсудим детали.
              </p>
              <div className="bg-vibe-dark3 border border-vibe-dark3 p-6 max-w-sm mx-auto mb-8 text-left">
                <div className="text-vibe-red text-xs font-oswald uppercase tracking-widest mb-3">Что дальше</div>
                <ul className="space-y-3">
                  {["Менеджер изучит бриф", "Позвоним / напишем для уточнений", "Пришлём оценку стоимости и сроков", "Подпишем договор и начнём работу"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-vibe-muted">
                      <span className="font-oswald text-vibe-red text-xs w-5">0{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/" className="border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest text-sm px-6 py-3 hover:border-vibe-red/40 hover:text-vibe-light transition-colors">
                  На главную
                </a>
                <a href="/b2b" className="border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest text-sm px-6 py-3 hover:border-vibe-red/40 hover:text-vibe-light transition-colors">
                  Корпоративное обучение
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why" className="py-20 bg-vibe-dark">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Почему Bonnie&amp;Slide</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Не просто красивые слайды.<br /><span className="text-vibe-red">Результат.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY.map((w, i) => (
              <div key={i} className="bg-vibe-dark3 border border-vibe-dark3 p-5 hover:border-vibe-red/30 transition-colors group">
                <div className="w-9 h-9 bg-vibe-red/10 flex items-center justify-center mb-4">
                  <Icon name={w.icon} fallback="Star" size={16} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-vibe-light text-sm mb-1.5 group-hover:text-vibe-red transition-colors">{w.title}</h3>
                <p className="text-vibe-muted text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-20 bg-vibe-dark2">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Портфолио</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Несколько примеров<br /><span className="text-vibe-red">из нашей практики</span>
            </h2>
            <p className="text-vibe-muted text-sm mt-3">Детали по NDA — показываем обезличенно, но с реальными результатами</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className={`bg-gradient-to-br ${p.color} to-vibe-dark3 border border-vibe-dark3 p-6 hover:border-vibe-red/30 transition-colors`}>
                <div className="text-3xl mb-4">{p.emoji}</div>
                <h3 className="font-oswald text-vibe-light text-base mb-2">{p.title}</h3>
                <div className="text-vibe-muted text-xs mb-3">{p.slides}</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs border border-vibe-dark3 text-vibe-muted px-2 py-0.5">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-vibe-dark3">
                  <Icon name="TrendingUp" size={13} className="text-vibe-red flex-shrink-0" />
                  <span className="text-vibe-muted text-xs">{p.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-20 bg-vibe-dark">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Как мы работаем</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Процесс без<br /><span className="text-vibe-red">сюрпризов</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={i} className="relative">
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-vibe-dark3 z-0" style={{ width: "calc(100% - 3rem)" }} />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-vibe-dark3 border border-vibe-dark3 flex items-center justify-center mb-4 relative">
                    <span className="font-oswald text-vibe-red text-xl">{p.num}</span>
                    <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-vibe-red" />
                  </div>
                  <h3 className="font-oswald text-vibe-light text-base mb-2">{p.title}</h3>
                  <p className="text-vibe-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="#order-quiz"
              className="inline-flex items-center gap-2 bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 hover:bg-red-700 transition-colors">
              Начать — это бесплатно
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-vibe-dark2">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">FAQ</div>
            <h2 className="font-oswald text-4xl text-vibe-light">Частые вопросы</h2>
          </div>
          <div className="space-y-1">
            {FAQ.map((f, i) => (
              <div key={i} className="border border-vibe-dark3 bg-vibe-dark3">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className="font-oswald text-vibe-light text-sm">{f.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-vibe-red flex-shrink-0 transition-transform"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-vibe-muted text-sm leading-relaxed border-t border-vibe-dark3 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(0,0,0,.3) 20px,rgba(0,0,0,.3) 21px)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-oswald text-5xl md:text-7xl text-white leading-none mb-4">
            ГОТОВЫ<br />НАЧАТЬ?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
            Заполните бриф — ответим в течение 2 часов и назовём стоимость
          </p>
          <a href="#order-quiz"
            className="inline-flex items-center gap-2 bg-white text-vibe-red font-oswald uppercase tracking-widest px-10 py-5 text-xl hover:bg-gray-100 transition-colors">
            Оставить заявку
            <Icon name="ArrowRight" size={18} />
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-vibe-dark3 bg-vibe-dark">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <a href="/"><Logo width={100} height={12} /></a>
              <p className="text-vibe-muted text-xs mt-3 leading-relaxed">Дизайн-студия и корпоративные тренинги по презентациям.</p>
              <p className="text-vibe-muted/50 text-xs mt-2">Лицензия Л035-01298-77/01635812</p>
            </div>
            <div>
              <h4 className="font-oswald text-vibe-light text-sm mb-3">Услуги</h4>
              {[["#order-quiz", "Заказать презентацию"], ["/b2b", "Корпоративное обучение"], ["/b2b/courses", "Конструктор программы"], ["#portfolio", "Портфолио"]].map(([href, label]) => (
                <a key={label} href={href} className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">{label}</a>
              ))}
            </div>
            <div>
              <h4 className="font-oswald text-vibe-light text-sm mb-3">Bonnie&amp;Slide</h4>
              {["О компании", "Онлайн-курсы", "Блог", "Отзывы"].map((label) => (
                <a key={label} href="#" className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">{label}</a>
              ))}
            </div>
            <div>
              <h4 className="font-oswald text-vibe-light text-sm mb-3">Связаться</h4>
              <a href="tel:+74950000000" className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">+7 (495) 000 00 00</a>
              <a href="mailto:studio@bonnieslide.ru" className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">studio@bonnieslide.ru</a>
              <a href="#" className="block text-vibe-muted text-xs hover:text-vibe-red transition-colors">Telegram</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-vibe-dark3 text-vibe-muted text-xs">
            <div>© 2026 ООО «Бонни энд Слайд». Все права защищены.</div>
            <div className="flex gap-4">
              <a href="/" className="hover:text-vibe-red transition-colors">Главная</a>
              <a href="#" className="hover:text-vibe-red transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-vibe-red transition-colors">Договор-оферта</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ── */}
      {step === 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-vibe-dark border-t border-vibe-dark3 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-vibe-muted text-xs">Дизайн-студия Bonnie&amp;Slide</div>
            <div className="font-oswald text-vibe-light text-sm">Ответим за 2 часа</div>
          </div>
          <a href="#order-quiz" className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-5 py-3">
            Заказать →
          </a>
        </div>
      )}
    </div>
  );
}
