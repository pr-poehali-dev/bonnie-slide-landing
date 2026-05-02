import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

const HERO_BG = "https://cdn.poehali.dev/projects/70b2a877-599d-4d33-ad00-9094dfe27d22/files/6850137c-2931-48d7-9704-bb256c4013ca.jpg";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Category = "presentations" | "ai" | "data" | "design" | "oratory";
type CourseTag = "практика" | "с нуля" | "для команды" | "быстрый старт" | "углублённый" | "ИИ-инструменты" | "российское ПО" | "живой тренинг" | "аналитика" | "визуализация" | "автоматизация" | "выступления";

interface Course {
  id: number; title: string; desc: string; category: Category;
  duration: string; tag: CourseTag; price: number;
  popular?: boolean; isNew?: boolean; tools?: string[];
}

// ─── COURSES DATA ─────────────────────────────────────────────────────────────

const COURSES: Course[] = [
  { id: 1,  category: "presentations", title: "Power of PowerPoint",                               desc: "Весь арсенал инструментов для создания убойно-красивых слайдов от экспертов ведущей студии презентаций.",                             duration: "8 ч", tag: "с нуля",         price: 18900, popular: true, tools: ["PowerPoint"] },
  { id: 2,  category: "presentations", title: "Тройной удар по PowerPoint: цвета, шрифты, концепции", desc: "Визуализируйте диаграммы, огромные таблицы и процессы понятно и красиво. Самые полезные фишки Excel в придачу.",              duration: "6 ч", tag: "углублённый",    price: 16900,              tools: ["PowerPoint", "Excel"] },
  { id: 3,  category: "design",        title: "Шаблоны убойных слайдов",                            desc: "Сборник готовых визуальных решений на все случаи презентационной жизни. Стань ещё сильнее в дизайне слайдов!",                     duration: "5 ч", tag: "практика",       price: 14900,              tools: ["PowerPoint"] },
  { id: 4,  category: "data",          title: "Графики и таблицы",                                  desc: "Визуализируйте диаграммы, огромные таблицы и процессы. Освойте самые полезные фишки Excel.",                                        duration: "5 ч", tag: "визуализация",   price: 13900,              tools: ["PowerPoint", "Excel"] },
  { id: 5,  category: "presentations", title: "Убойная Анимация",                                   desc: "Курс для тех, кто хочет усилить слайды анимацией. Научитесь делать из презентации крутой видеоролик!",                             duration: "4 ч", tag: "углублённый",    price: 12900,              tools: ["PowerPoint"] },
  { id: 6,  category: "ai",            title: "ИИ-креатор: создание контента с нейросетями",        desc: "Создавайте уникальный контент с помощью нейросетей и применяйте ИИ в работе.",                                                     duration: "6 ч", tag: "ИИ-инструменты", price: 19900, popular: true, tools: ["ChatGPT", "Midjourney", "Claude"] },
  { id: 7,  category: "ai",            title: "Вайбкодинг для автоматизации рабочих задач",         desc: "Сотрудники создают дашборды, порталы и AI-ассистентов сами — описывая задачу нейросети вместо задачи в IT.",                        duration: "8 ч", tag: "автоматизация",  price: 24900, isNew: true,   tools: ["ChatGPT", "Claude", "Cursor"] },
  { id: 8,  category: "ai",            title: "Очный мастер-класс по нейросетям",                   desc: "Корпоративное обучение: внедрите нейросети в работу команды и выполняйте задачи быстрее и дешевле.",                                duration: "6 ч", tag: "живой тренинг",  price: 22900,              tools: ["ChatGPT", "Claude"] },
  { id: 9,  category: "ai",            title: "Нейросети для создания презентаций",                  desc: "От идеи до готовой презентации за час с помощью ИИ.",                                                                                duration: "4 ч", tag: "быстрый старт",  price: 14900, popular: true, tools: ["ChatGPT", "Gamma", "Deepseek"] },
  { id: 10, category: "ai",            title: "Практикум: Нейросети для менеджеров",                desc: "Оптимизируйте и автоматизируйте управленческие процессы с помощью нейросетей.",                                                     duration: "5 ч", tag: "практика",       price: 18900,              tools: ["ChatGPT", "NotebookLM"] },
  { id: 11, category: "presentations", title: "Создание презентаций в Р7 Офис",                     desc: "Стильные слайды в Р7-Презентациях без сторонних сервисов. Подходит переходящим с PowerPoint на российское ПО.",                     duration: "5 ч", tag: "российское ПО",  price: 13900,              tools: ["Р7 Офис"] },
  { id: 12, category: "data",          title: "Аналитика данных без боли",                          desc: "Превращайте цифры и отчёты в ясные инсайты, создавайте профессиональные дашборды.",                                                duration: "8 ч", tag: "аналитика",      price: 21900,              tools: ["Excel", "PowerPoint"] },
  { id: 13, category: "data",          title: "Графики, таблицы, много всего на слайде",            desc: "Работа с большими объёмами данных, акценты на важном и красивое представление информации.",                                        duration: "5 ч", tag: "визуализация",   price: 15900,              tools: ["PowerPoint", "Excel"] },
  { id: 14, category: "design",        title: "Продвинутый дизайн презентаций",                     desc: "Шрифты, цвет и форма для мощной визуальной концепции слайдов.",                                                                     duration: "6 ч", tag: "углублённый",    price: 17900,              tools: ["PowerPoint"] },
  { id: 15, category: "presentations", title: "Основы дизайна презентаций",                         desc: "Слайды выше среднего при помощи инструментов PowerPoint. Подходит начинающим и продолжающим.",                                     duration: "5 ч", tag: "с нуля",         price: 12900,              tools: ["PowerPoint"] },
  { id: 16, category: "design",        title: "Шаблоны убойных слайдов для бизнеса",                desc: "76+ готовых шаблонов для быстрого создания слайдов с большим объёмом информации.",                                                 duration: "7 ч", tag: "для команды",    price: 19900,              tools: ["PowerPoint"] },
  { id: 17, category: "data",          title: "Excel для бизнеса",                                  desc: "Управляйтесь с данными на уровне специалиста, делайте красивые графики и таблицы.",                                                duration: "6 ч", tag: "аналитика",      price: 16900,              tools: ["Excel"] },
  { id: 18, category: "presentations", title: "Убойная анимация для бизнеса",                       desc: "Усильте слайды анимацией и сделайте презентацию запоминающейся.",                                                                  duration: "4 ч", tag: "практика",       price: 14900,              tools: ["PowerPoint"] },
  { id: 19, category: "design",        title: "Photoshop для бизнеса",                              desc: "Когда PowerPoint не хватает. Базовая ретушь и создание картинок с нуля.",                                                           duration: "6 ч", tag: "углублённый",    price: 17900,              tools: ["Photoshop"] },
  { id: 20, category: "ai",            title: "Нейросети для бизнеса",                              desc: "Оптимизируйте рабочие процессы и делегируйте рутинные задачи нейросетям.",                                                         duration: "6 ч", tag: "автоматизация",  price: 18900,              tools: ["ChatGPT", "Claude"] },
  { id: 21, category: "design",        title: "Дизайн в Figma для бизнеса",                         desc: "Figma с нуля: эффектные слайды за пару минут. Всё, что необходимо в работе.",                                                       duration: "7 ч", tag: "с нуля",         price: 19900,              tools: ["Figma"] },
  { id: 22, category: "oratory",       title: "Ораторское мастерство для бизнеса",                  desc: "Уверенные выступления перед клиентами, партнёрами и инвесторами: убеждение и управление вниманием.",                               duration: "6 ч", tag: "выступления",    price: 21900, popular: true, tools: ["Публичные выступления"] },
  { id: 23, category: "presentations", title: "Структура презентации и сторителлинг",               desc: "Структура, сторителлинг, работа с контентом и смыслом.",                                                                           duration: "5 ч", tag: "с нуля",         price: 14900,              tools: ["PowerPoint", "Keynote"] },
  { id: 24, category: "ai",            title: "Нейросети для маркетинга и контента",                desc: "Автоматизируйте маркетинговые процессы и повышайте эффективность кампаний с ИИ.",                                                  duration: "6 ч", tag: "ИИ-инструменты", price: 19900, isNew: true,   tools: ["ChatGPT", "Midjourney", "Claude"] },
  { id: 25, category: "presentations", title: "Слайды для выступления. Экспресс",                   desc: "Пошаговая инструкция по подготовке презентации и выступления на уровне BigTech.",                                                  duration: "3 ч", tag: "быстрый старт",  price: 9900,               tools: ["PowerPoint", "Keynote"] },
];

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────

interface QuizOption { id: string; label: string; icon: string; courseIds: number[] }
interface QuizStep { id: string; question: string; subtitle: string; multiple: boolean; options: QuizOption[] }

const QUIZ_STEPS: QuizStep[] = [
  {
    id: "role",
    question: "Кто будет проходить обучение?",
    subtitle: "Выберите одну или несколько ролей — подберём программу точнее",
    multiple: true,
    options: [
      { id: "marketing",  label: "Маркетинг и контент",     icon: "TrendingUp",  courseIds: [6, 24, 9, 3, 16] },
      { id: "analysts",   label: "Аналитика и данные",       icon: "BarChart2",   courseIds: [4, 12, 13, 17] },
      { id: "managers",   label: "Менеджеры и руководители", icon: "Briefcase",   courseIds: [10, 20, 1, 23] },
      { id: "sales",      label: "Продажи и переговоры",     icon: "Handshake",   courseIds: [22, 25, 23, 1] },
      { id: "it",         label: "IT и разработка",          icon: "Code",        courseIds: [7, 20, 6] },
      { id: "hr",         label: "HR и обучение",            icon: "Users",       courseIds: [10, 8, 23] },
      { id: "design",     label: "Дизайн и визуал",          icon: "Palette",     courseIds: [14, 19, 21, 3] },
      { id: "all",        label: "Вся команда сразу",        icon: "Building",    courseIds: [1, 6, 22, 12, 16] },
    ],
  },
  {
    id: "problem",
    question: "Какую задачу хотите решить?",
    subtitle: "Можно выбрать несколько — соберём комплексную программу",
    multiple: true,
    options: [
      { id: "slow",       label: "Слайды делаются слишком долго",        icon: "Clock",       courseIds: [1, 15, 3, 16] },
      { id: "ugly",       label: "Презентации выглядят непрофессионально", icon: "Eye",        courseIds: [2, 14, 3, 16] },
      { id: "data",       label: "Сложно красиво показать данные",        icon: "PieChart",    courseIds: [4, 12, 13, 17] },
      { id: "ai",         label: "Нужно внедрить ИИ в работу команды",    icon: "Sparkles",    courseIds: [6, 8, 20, 10, 7] },
      { id: "speaking",   label: "Сотрудники теряются на выступлениях",   icon: "Mic",         courseIds: [22, 25, 23] },
      { id: "standards",  label: "Нет единого стандарта оформления",      icon: "Layout",      courseIds: [16, 3, 1, 14] },
      { id: "migration",  label: "Переходим на российское ПО",            icon: "Flag",        courseIds: [11, 15, 4] },
      { id: "automate",   label: "Хотим автоматизировать рутину",         icon: "Zap",         courseIds: [7, 10, 20] },
    ],
  },
  {
    id: "result",
    question: "Какой результат важнее всего?",
    subtitle: "Выберите главный приоритет",
    multiple: false,
    options: [
      { id: "speed",      label: "Делать быстрее — экономить часы команды",  icon: "Timer",       courseIds: [1, 9, 15, 18] },
      { id: "quality",    label: "Делать лучше — профессиональный уровень",  icon: "Award",       courseIds: [2, 14, 22, 23] },
      { id: "ai-skills",  label: "Освоить ИИ — новые инструменты в работу",  icon: "Brain",       courseIds: [6, 7, 24, 9] },
      { id: "standard",   label: "Единый стандарт для всей компании",        icon: "CheckSquare", courseIds: [16, 3, 11] },
      { id: "growth",     label: "Уверенность на переговорах и презентациях",icon: "TrendingUp",  courseIds: [22, 25, 23, 8] },
    ],
  },
  {
    id: "format",
    question: "В каком формате удобнее?",
    subtitle: "Это поможет подобрать подходящий тип обучения",
    multiple: false,
    options: [
      { id: "offline",    label: "Офлайн у нас в офисе",       icon: "Building2",   courseIds: [8, 22, 1] },
      { id: "online",     label: "Онлайн — всё дистанционно",  icon: "Monitor",     courseIds: [6, 9, 10] },
      { id: "intensive",  label: "Интенсив за 1–2 дня",        icon: "Zap",         courseIds: [1, 8, 22] },
      { id: "program",    label: "Программа на 1–3 месяца",    icon: "CalendarDays",courseIds: [12, 6, 22] },
      { id: "flexible",   label: "Гибко — обсудим варианты",   icon: "Shuffle",     courseIds: [] },
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  "с нуля":         "bg-blue-950/80 text-blue-400 border-blue-500/30",
  "углублённый":    "bg-purple-950/80 text-purple-400 border-purple-500/30",
  "практика":       "bg-amber-950/80 text-amber-400 border-amber-500/30",
  "быстрый старт":  "bg-green-950/80 text-green-400 border-green-500/30",
  "для команды":    "bg-teal-950/80 text-teal-400 border-teal-500/30",
  "ИИ-инструменты": "bg-pink-950/80 text-pink-400 border-pink-500/30",
  "российское ПО":  "bg-red-950/80 text-red-400 border-red-500/30",
  "живой тренинг":  "bg-orange-950/80 text-orange-400 border-orange-500/30",
  "аналитика":      "bg-cyan-950/80 text-cyan-400 border-cyan-500/30",
  "визуализация":   "bg-indigo-950/80 text-indigo-400 border-indigo-500/30",
  "автоматизация":  "bg-violet-950/80 text-violet-400 border-violet-500/30",
  "выступления":    "bg-rose-950/80 text-rose-400 border-rose-500/30",
};

function fmt(n: number) { return n.toLocaleString("ru-RU") + " ₽"; }

const WHY_US = [
  { icon: "Target",     text: "Программа адаптируется под задачи вашей компании — не шаблонный курс" },
  { icon: "Users",      text: "Обучаем на реальных кейсах вашей отрасли и конкретных проектах команды" },
  { icon: "Award",      text: "Методология основана на 100 000+ студентов и практике топ-компаний" },
  { icon: "Repeat",     text: "Поддержка после обучения: обратная связь по презентациям ещё 30 дней" },
  { icon: "BarChart2",  text: "Замеряем результат до и после — вы видите конкретный прогресс команды" },
  { icon: "Globe",      text: "Офлайн и онлайн — для распределённых команд по всей России" },
];

const BENEFITS = [
  { icon: "Sliders",      title: "Точно под вас",        desc: "Программа учитывает ваши инструменты, отрасль и корпоративный шаблон" },
  { icon: "Clock",        title: "Экономия времени",     desc: "Не платите за лишние модули — берёте только то, что нужно команде" },
  { icon: "TrendingUp",   title: "Измеримый результат",  desc: "Диагностика до и после. Руководство видит конкретный прогресс" },
  { icon: "Users",        title: "Группа до 10 чел.",    desc: "Тренер успевает дать обратную связь каждому участнику" },
  { icon: "FileCheck",    title: "В вашем шаблоне",      desc: "Работаем внутри корпоративного брендинга — ничего не ломаем" },
  { icon: "Shield",       title: "NDA и безопасность",   desc: "Подписываем NDA по вашему шаблону. Файлы не хранятся после занятий" },
  { icon: "Layers",       title: "Модульность",          desc: "Любой набор курсов компонуется в единую программу с общей логикой" },
  { icon: "Headphones",   title: "Поддержка 30 дней",    desc: "После обучения — чат с тренером для вопросов и обратной связи" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function B2BCourses() {
  const [quizStep, setQuizStep] = useState(0);                 // current quiz step index
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState<"program" | "call" | null>(null);
  const [formSent, setFormSent] = useState(false);

  // Collect all selected courseIds from answers
  const recommendedIds = useMemo(() => {
    const counts: Record<number, number> = {};
    Object.entries(answers).forEach(([stepId, selected]) => {
      const step = QUIZ_STEPS.find((s) => s.id === stepId);
      selected.forEach((optId) => {
        const opt = step?.options.find((o) => o.id === optId);
        opt?.courseIds.forEach((id) => { counts[id] = (counts[id] ?? 0) + 1; });
      });
    });
    // Sort by frequency, take top-10
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => Number(id));
  }, [answers]);

  const recommendedCourses = useMemo(() => {
    const ids = new Set(recommendedIds);
    const ordered = recommendedIds.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean) as Course[];
    const rest = COURSES.filter((c) => !ids.has(c.id));
    return showAll ? [...ordered, ...rest] : ordered.slice(0, 8);
  }, [recommendedIds, showAll]);

  const totalPrice = recommendedCourses.slice(0, recommendedIds.length).reduce((s, c) => s + c.price, 0);
  const totalHours = recommendedCourses.slice(0, recommendedIds.length).reduce((s, c) => s + parseInt(c.duration), 0);

  const step = QUIZ_STEPS[quizStep];
  const stepAnswers = answers[step?.id] ?? [];

  function toggleOption(optId: string) {
    setAnswers((prev) => {
      const cur = prev[step.id] ?? [];
      if (step.multiple) {
        const next = cur.includes(optId) ? cur.filter((x) => x !== optId) : [...cur, optId];
        return { ...prev, [step.id]: next };
      } else {
        return { ...prev, [step.id]: [optId] };
      }
    });
  }

  function nextStep() {
    if (quizStep < QUIZ_STEPS.length - 1) {
      setQuizStep((s) => s + 1);
    } else {
      setQuizDone(true);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }

  function resetQuiz() {
    setAnswers({});
    setQuizStep(0);
    setQuizDone(false);
    setShowAll(false);
  }

  const progress = ((quizStep + (stepAnswers.length > 0 ? 1 : 0)) / QUIZ_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-vibe-dark font-golos overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-vibe-dark/95 backdrop-blur-sm border-b border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex flex-col gap-0.5 flex-shrink-0">
            <Logo width={110} height={13} />
            <span className="text-vibe-muted text-xs">для бизнеса</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-vibe-muted">
            <a href="/b2b" className="hover:text-vibe-red transition-colors">← B2B обучение</a>
            <a href="#quiz" className="hover:text-vibe-light transition-colors">Конструктор</a>
            <a href="#why" className="hover:text-vibe-light transition-colors">Почему мы</a>
          </nav>
          <button
            onClick={() => { setShowModal("call"); setFormSent(false); }}
            className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-5 py-2.5 hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon name="Phone" size={14} />
            <span className="hidden sm:inline">Быстрый звонок</span>
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-vibe-dark via-vibe-dark/90 to-vibe-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-vibe-dark via-transparent to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-vibe-red/40 px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-vibe-red rounded-full animate-pulse" />
              <span className="text-vibe-red text-xs font-oswald uppercase tracking-widest">Конструктор программы</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl text-vibe-light leading-none mb-6">
              ПРОГРАММА<br />
              <span className="text-vibe-red">ТОЧНО ПОД</span><br />
              ВАШУ КОМАНДУ
            </h1>
            <p className="text-vibe-muted text-lg leading-relaxed mb-8 max-w-lg">
              Ответьте на 4 вопроса — за 2 минуты подберём курсы под задачи вашего бизнеса. Без лишнего, только нужное.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#quiz"
                className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 text-lg hover:bg-red-700 transition-all flex items-center gap-2 animate-pulse-red">
                Собрать программу
                <Icon name="ArrowRight" size={18} />
              </a>
              <button
                onClick={() => { setShowModal("call"); setFormSent(false); }}
                className="border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest px-7 py-4 hover:border-vibe-red/50 hover:text-vibe-light transition-colors flex items-center gap-2">
                <Icon name="Phone" size={16} />
                Быстрая консультация
              </button>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { num: "26", label: "курсов в каталоге" },
                { num: "200+", label: "компаний обучились" },
                { num: "4,9/5", label: "NPS клиентов" },
              ].map((s) => (
                <div key={s.num}>
                  <div className="font-oswald text-3xl text-vibe-red">{s.num}</div>
                  <div className="text-vibe-muted text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="hidden lg:block">
            <div className="bg-vibe-dark3/90 backdrop-blur border border-vibe-dark3 p-8 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />
              <div className="font-oswald text-xs text-vibe-red tracking-widest mb-5">ПОЧЕМУ ИНДИВИДУАЛЬНАЯ ПРОГРАММА?</div>
              <ul className="space-y-4">
                {[
                  { icon: "Sliders",    text: "Только нужные курсы — без лишнего контента" },
                  { icon: "Users",      text: "Группа до 10 человек, персональная обратная связь" },
                  { icon: "FileCheck",  text: "Работаем в вашем корпоративном шаблоне" },
                  { icon: "BarChart2",  text: "Измеримый результат до и после обучения" },
                  { icon: "Headphones", text: "Поддержка тренера 30 дней после программы" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-vibe-red/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} fallback="Check" size={15} className="text-vibe-red" />
                    </div>
                    <span className="text-vibe-muted text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-vibe-dark3">
                <div className="text-vibe-muted text-xs mb-1">Стоимость программы от</div>
                <div className="font-oswald text-3xl text-vibe-red">350 000 ₽</div>
                <div className="text-vibe-muted text-xs mt-1">в зависимости от состава и формата</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section id="quiz" className="py-20 bg-vibe-dark2">
        <div className="max-w-4xl mx-auto px-6">

          {!quizDone ? (
            <>
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5">
                    Шаг {quizStep + 1} из {QUIZ_STEPS.length}
                  </div>
                  {quizStep > 0 && (
                    <button onClick={() => setQuizStep((s) => s - 1)}
                      className="text-vibe-muted text-sm flex items-center gap-1 hover:text-vibe-light transition-colors">
                      <Icon name="ChevronLeft" size={16} />
                      Назад
                    </button>
                  )}
                </div>
                <div className="h-1 bg-vibe-dark3 w-full">
                  <div className="h-full bg-vibe-red transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="font-oswald text-3xl md:text-5xl text-vibe-light mb-3">{step.question}</h2>
                <p className="text-vibe-muted text-sm">{step.subtitle}</p>
                {step.multiple && <p className="text-vibe-muted/50 text-xs mt-1">Можно выбрать несколько</p>}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {step.options.map((opt) => {
                  const isSelected = stepAnswers.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      className={`flex items-center gap-4 p-5 border text-left transition-all group ${
                        isSelected
                          ? "border-vibe-red bg-vibe-red/8"
                          : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/50"
                      }`}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? "bg-vibe-red" : "bg-vibe-dark border border-vibe-dark3 group-hover:border-vibe-red/40"
                      }`}>
                        {isSelected
                          ? <Icon name="Check" size={18} className="text-white" />
                          : <Icon name={opt.icon} fallback="Star" size={18} className="text-vibe-muted group-hover:text-vibe-light" />
                        }
                      </div>
                      <span className={`font-oswald text-sm uppercase tracking-wide transition-colors ${
                        isSelected ? "text-vibe-red" : "text-vibe-light"
                      }`}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => { setAnswers({}); setQuizStep(0); }}
                  className="text-vibe-muted text-sm hover:text-vibe-red transition-colors"
                >
                  Начать заново
                </button>
                <button
                  onClick={nextStep}
                  disabled={stepAnswers.length === 0}
                  className={`font-oswald uppercase tracking-widest px-8 py-4 transition-all flex items-center gap-2 ${
                    stepAnswers.length > 0
                      ? "bg-vibe-red text-white hover:bg-red-700"
                      : "bg-vibe-dark3 text-vibe-muted cursor-not-allowed"
                  }`}
                >
                  {quizStep < QUIZ_STEPS.length - 1 ? "Следующий шаг" : "Показать программу"}
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </>
          ) : (
            /* ─── RESULTS ─── */
            <div id="results">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-3">
                    Программа готова
                  </div>
                  <h2 className="font-oswald text-3xl md:text-5xl text-vibe-light">
                    Ваша <span className="text-vibe-red">подборка</span>
                  </h2>
                  <p className="text-vibe-muted text-sm mt-2">
                    На основе ваших ответов подобрано {recommendedIds.length} курсов
                  </p>
                </div>
                <button onClick={resetQuiz} className="text-vibe-muted text-sm hover:text-vibe-red transition-colors flex items-center gap-1.5">
                  <Icon name="RefreshCw" size={14} />
                  Пройти заново
                </button>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-3 gap-4 mb-8 bg-vibe-dark3 border border-vibe-red/20 p-5">
                <div className="text-center">
                  <div className="font-oswald text-3xl text-vibe-red">{recommendedIds.length}</div>
                  <div className="text-vibe-muted text-xs mt-0.5">курсов</div>
                </div>
                <div className="text-center border-x border-vibe-dark3">
                  <div className="font-oswald text-3xl text-vibe-red">{totalHours} ч</div>
                  <div className="text-vibe-muted text-xs mt-0.5">обучения</div>
                </div>
                <div className="text-center">
                  <div className="font-oswald text-2xl text-vibe-red">{fmt(totalPrice)}</div>
                  <div className="text-vibe-muted text-xs mt-0.5">ориентировочно</div>
                </div>
              </div>

              {/* CTA banner */}
              <div className="mb-8 bg-vibe-red p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="font-oswald text-white text-lg mb-1">Готово! Отправьте программу — получите КП за 2 часа</div>
                  <p className="text-white/70 text-xs">Менеджер свяжется, уточнит детали и предложит точную цену</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button onClick={() => { setShowModal("program"); setFormSent(false); }}
                    className="bg-white text-vibe-red font-oswald uppercase tracking-widest text-sm px-6 py-3 hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Получить КП
                  </button>
                  <button onClick={() => { setShowModal("call"); setFormSent(false); }}
                    className="border border-white/40 text-white font-oswald uppercase tracking-widest text-sm px-5 py-3 hover:bg-white/10 transition-colors flex items-center gap-2 whitespace-nowrap">
                    <Icon name="Phone" size={14} />
                    Позвонить
                  </button>
                </div>
              </div>

              {/* Courses list */}
              <div className="space-y-3 mb-6">
                {recommendedCourses.map((course, i) => {
                  const isTop = i < recommendedIds.length;
                  return (
                    <div key={course.id} className={`flex items-start gap-4 p-4 border transition-colors ${
                      isTop ? "border-vibe-dark3 bg-vibe-dark3" : "border-vibe-dark3/50 bg-vibe-dark opacity-60"
                    }`}>
                      <div className="w-7 h-7 bg-vibe-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="font-oswald text-vibe-red text-xs">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs border px-1.5 py-0.5 font-oswald uppercase ${TAG_COLORS[course.tag] ?? ""}`}>
                            {course.tag}
                          </span>
                          {course.popular && <span className="bg-vibe-red text-white text-xs font-oswald px-1.5 py-0.5 uppercase">Хит</span>}
                          {course.isNew && <span className="bg-blue-600 text-white text-xs font-oswald px-1.5 py-0.5 uppercase">New</span>}
                        </div>
                        <div className="font-oswald text-vibe-light text-sm leading-tight">{course.title}</div>
                        <div className="text-vibe-muted text-xs mt-0.5 line-clamp-1">{course.desc}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-oswald text-vibe-red text-sm">{fmt(course.price)}</div>
                        <div className="text-vibe-muted text-xs">{course.duration}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {!showAll && (
                  <button onClick={() => setShowAll(true)}
                    className="border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest text-sm px-6 py-3 hover:border-vibe-red/40 hover:text-vibe-light transition-colors flex items-center gap-2">
                    <Icon name="LayoutGrid" size={14} />
                    Посмотреть весь каталог
                  </button>
                )}
                <button onClick={() => { setShowModal("program"); setFormSent(false); }}
                  className="flex-1 bg-vibe-red text-white font-oswald uppercase tracking-widest py-3 hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  Отправить программу и получить КП
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">
              Преимущества
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Зачем собирать<br /><span className="text-vibe-red">индивидуальную программу?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-vibe-dark3 border border-vibe-dark3 p-6 hover:border-vibe-red/30 transition-colors group">
                <div className="w-10 h-10 bg-vibe-red/10 flex items-center justify-center mb-4">
                  <Icon name={b.icon} fallback="Star" size={18} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-vibe-light text-base mb-2 group-hover:text-vibe-red transition-colors">{b.title}</h3>
                <p className="text-vibe-muted text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why" className="py-20 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-5">
                Почему выбирают нас
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light mb-8">
                МЫ НЕ ПРОСТО<br />
                <span className="text-vibe-red">ЧИТАЕМ ЛЕКЦИИ</span>
              </h2>
              <div className="space-y-5">
                {WHY_US.map((w, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-vibe-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={w.icon} fallback="Check" size={15} className="text-vibe-red" />
                    </div>
                    <p className="text-vibe-muted text-sm leading-relaxed">{w.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "10 лет", label: "на рынке" },
                  { num: "80 000+", label: "выпускников курсов" },
                  { num: "200+", label: "b2b-клиентов" },
                  { num: "4,9/5", label: "средний NPS" },
                ].map((s) => (
                  <div key={s.num} className="bg-vibe-dark3 border border-vibe-dark3 p-5">
                    <div className="font-oswald text-3xl text-vibe-red">{s.num}</div>
                    <div className="text-vibe-muted text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Consultation card */}
              <div className="bg-vibe-dark3 border border-vibe-red/20 p-6 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-vibe-red/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={20} className="text-vibe-red" />
                  </div>
                  <div>
                    <div className="font-oswald text-vibe-light text-lg mb-1">Быстрая консультация — 15 минут</div>
                    <p className="text-vibe-muted text-xs leading-relaxed mb-4">
                      Расскажите о задаче — эксперт поможет выбрать формат и ответит на вопросы. Без давления и обязательств.
                    </p>
                    <button
                      onClick={() => { setShowModal("call"); setFormSent(false); }}
                      className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-5 py-2.5 hover:bg-red-700 transition-colors"
                    >
                      Заказать звонок
                    </button>
                  </div>
                </div>
              </div>

              {/* License */}
              <div className="text-vibe-muted/50 text-xs">
                Образовательная лицензия Л035-01298-77/01635812. Расходы проводятся через бюджет на обучение персонала.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="py-10 bg-vibe-dark3 border-y border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-vibe-muted text-xs uppercase tracking-widest font-oswald mb-6">
            Нам доверяют обучение своих команд
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {["МАРС", "САМСУНГ", "ВК", "ЛУКОЙЛ", "АЛЬФА-БАНК", "NESTLÉ", "ЯНДЕКС", "MASTERCARD", "LEROY MERLIN", "СКОЛКОВО"].map((c) => (
              <span key={c} className="font-oswald text-sm text-vibe-muted/50 tracking-widest hover:text-vibe-muted transition-colors">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 21px)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-oswald text-4xl md:text-6xl text-white mb-4 leading-none">
            НЕ ЗНАЕТЕ<br />С ЧЕГО НАЧАТЬ?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Пройдите квиз выше — за 2 минуты получите готовую подборку. Или позвоните — разберёмся вместе за 15 минут.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#quiz"
              className="bg-white text-vibe-red font-oswald uppercase tracking-widest px-8 py-4 text-lg hover:bg-gray-100 transition-colors">
              Пройти квиз
            </a>
            <button
              onClick={() => { setShowModal("call"); setFormSent(false); }}
              className="border border-white/40 text-white font-oswald uppercase tracking-widest px-7 py-4 hover:bg-white/10 transition-colors flex items-center gap-2">
              <Icon name="Phone" size={16} />
              Заказать звонок
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-vibe-dark3 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <a href="/"><Logo width={100} height={12} /></a>
              <p className="text-vibe-muted text-xs mt-3 leading-relaxed">Корпоративные тренинги, онлайн-курсы, дизайн-студия презентаций.</p>
              <p className="text-vibe-muted/50 text-xs mt-2">Лицензия Л035-01298-77/01635812</p>
            </div>
            <div>
              <h4 className="font-oswald text-vibe-light text-sm mb-3">Обучение</h4>
              {[["#quiz", "Конструктор программы"], ["/b2b#directions", "Направления"], ["/b2b#formats", "Форматы"], ["/b2b#cases", "Кейсы"]].map(([href, label]) => (
                <a key={href} href={href} className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">{label}</a>
              ))}
            </div>
            <div>
              <h4 className="font-oswald text-vibe-light text-sm mb-3">Bonnie&amp;Slide</h4>
              {["О компании", "Онлайн-курсы", "Дизайн-студия", "Блог"].map((label) => (
                <a key={label} href="#" className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">{label}</a>
              ))}
            </div>
            <div>
              <h4 className="font-oswald text-vibe-light text-sm mb-3">Связаться</h4>
              <a href="tel:+74950000000" className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">+7 (495) 000 00 00</a>
              <a href="mailto:b2b@bonnieslide.ru" className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">b2b@bonnieslide.ru</a>
              <a href="#" className="block text-vibe-muted text-xs hover:text-vibe-red transition-colors">Telegram</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-vibe-dark3 text-vibe-muted text-xs">
            <div>© 2026 ООО «Бонни энд Слайд». Все права защищены.</div>
            <div className="flex gap-4">
              <a href="/" className="hover:text-vibe-red transition-colors">Для частных лиц</a>
              <a href="/b2b" className="hover:text-vibe-red transition-colors">Для бизнеса</a>
              <a href="#" className="hover:text-vibe-red transition-colors">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setShowModal(null)} />
          <div className="relative z-10 bg-vibe-dark border border-vibe-dark3 w-full md:max-w-md overflow-y-auto max-h-[90vh]">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />

            {!formSent ? (
              <div className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-oswald text-2xl text-vibe-light">
                      {showModal === "call" ? "Быстрая консультация" : "Запросить КП"}
                    </h2>
                    <p className="text-vibe-muted text-xs mt-1">
                      {showModal === "call"
                        ? "Перезвоним в течение 30 минут в рабочее время"
                        : "Подготовим персональное предложение за 2 часа"}
                    </p>
                  </div>
                  <button onClick={() => setShowModal(null)}>
                    <Icon name="X" size={20} className="text-vibe-muted hover:text-vibe-light transition-colors" />
                  </button>
                </div>

                {showModal === "call" ? (
                  /* Call form */
                  <div className="space-y-3">
                    <input type="text" placeholder="Ваше имя"
                      className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                    <input type="tel" placeholder="Телефон"
                      className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                    <input type="text" placeholder="Компания"
                      className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                    <select className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors">
                      <option value="">Удобное время для звонка</option>
                      <option>Утром (9:00–12:00)</option>
                      <option>Днём (12:00–15:00)</option>
                      <option>После обеда (15:00–18:00)</option>
                    </select>
                    <button onClick={() => setFormSent(true)}
                      className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-4 hover:bg-red-700 transition-colors">
                      Заказать звонок
                    </button>
                    <p className="text-vibe-muted text-xs text-center">Без навязывания и долгих переговоров</p>
                  </div>
                ) : (
                  /* Program form */
                  <div className="space-y-3">
                    {quizDone && recommendedIds.length > 0 && (
                      <div className="bg-vibe-dark3 border border-vibe-red/20 p-4 mb-2">
                        <div className="text-vibe-red text-xs font-oswald uppercase tracking-widest mb-2">Ваша подборка</div>
                        <div className="text-vibe-muted text-xs">{recommendedIds.length} курсов · {totalHours} ч · {fmt(totalPrice)}</div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Имя"
                        className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-3 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                      <input type="tel" placeholder="Телефон"
                        className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-3 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                    </div>
                    <input type="email" placeholder="Корпоративная почта"
                      className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                    <input type="text" placeholder="Компания"
                      className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                    <select className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors">
                      <option value="">Размер команды</option>
                      <option>до 10</option><option>10–30</option><option>30–50</option><option>50–100</option><option>100+</option>
                    </select>
                    <button onClick={() => setFormSent(true)}
                      className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-4 hover:bg-red-700 transition-colors">
                      Отправить и получить КП
                    </button>
                    <p className="text-vibe-muted text-xs text-center">Ответим в течение 2 часов в рабочее время</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-vibe-red/10 flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-vibe-red" />
                </div>
                <h2 className="font-oswald text-2xl text-vibe-light mb-3">
                  {showModal === "call" ? "Ждите звонка!" : "Заявка отправлена!"}
                </h2>
                <p className="text-vibe-muted text-sm mb-6 leading-relaxed">
                  {showModal === "call"
                    ? "Перезвоним в течение 30 минут в рабочее время. Подготовим варианты программы заранее."
                    : "Менеджер подготовит КП с учётом вашей подборки и свяжется в течение 2 часов."}
                </p>
                <button onClick={() => setShowModal(null)}
                  className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-6 py-3 hover:bg-red-700 transition-colors">
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE STICKY ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-vibe-dark border-t border-vibe-dark3 px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-vibe-muted text-xs">Индивидуальная программа</div>
          <div className="font-oswald text-vibe-light text-sm">от 350 000 ₽</div>
        </div>
        <a href="#quiz" className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-5 py-3 hover:bg-red-700 transition-colors">
          Собрать →
        </a>
      </div>
    </div>
  );
}
