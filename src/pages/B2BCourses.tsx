import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────

type Category = "presentations" | "ai" | "data" | "design" | "oratory";

interface Course {
  id: number;
  title: string;
  desc: string;
  category: Category;
  duration: string;
  level: "базовый" | "продвинутый" | "для бизнеса";
  price: number;
  popular?: boolean;
  isNew?: boolean;
  tools?: string[];
}

interface Task {
  id: string;
  icon: string;
  title: string;
  desc: string;
  courseIds: number[];
}

const COURSES: Course[] = [
  { id: 1, category: "presentations", title: "Power of PowerPoint", desc: "Весь арсенал инструментов для создания убойно-красивых слайдов в PowerPoint от экспертов ведущей студии презентаций.", duration: "8 ч", level: "базовый", price: 18900, popular: true, tools: ["PowerPoint"] },
  { id: 2, category: "presentations", title: "Тройной удар по PowerPoint: цвета, шрифты, концепции", desc: "Визуализируйте диаграммы, огромные таблицы и многоступенчатые процессы понятно и красиво. Самые полезные фишки Excel в придачу.", duration: "6 ч", level: "продвинутый", price: 16900, tools: ["PowerPoint", "Excel"] },
  { id: 3, category: "design", title: "Шаблоны убойных слайдов", desc: "Сборник готовых визуальных решений на все случаи презентационной жизни. Стань ещё сильнее в дизайне и композиции слайдов!", duration: "5 ч", level: "продвинутый", price: 14900, tools: ["PowerPoint"] },
  { id: 4, category: "data", title: "Графики и таблицы", desc: "Визуализируйте диаграммы, огромные таблицы и многоступенчатые процессы. Освойте самые полезные фишки Excel.", duration: "5 ч", level: "базовый", price: 13900, tools: ["PowerPoint", "Excel"] },
  { id: 5, category: "presentations", title: "Убойная Анимация", desc: "Курс для тех, кто хочет усилить слайды с помощью анимации. Научитесь делать из своей презентации крутой видеоролик!", duration: "4 ч", level: "продвинутый", price: 12900, tools: ["PowerPoint"] },
  { id: 6, category: "ai", title: "ИИ-креатор: создание контента с нейросетями", desc: "Создавайте уникальный контент с помощью нейросетей и применяйте ИИ в работе.", duration: "6 ч", level: "для бизнеса", price: 19900, popular: true, tools: ["ChatGPT", "Midjourney", "Claude"] },
  { id: 7, category: "ai", title: "Вайбкодинг для автоматизации рабочих задач", desc: "Кратное ускорение рутинных процессов: сотрудники создают дашборды, порталы и AI-ассистентов сами — описывая задачу нейросети.", duration: "8 ч", level: "для бизнеса", price: 24900, isNew: true, tools: ["ChatGPT", "Claude", "Cursor"] },
  { id: 8, category: "ai", title: "Очный мастер-класс по нейросетям", desc: "Корпоративное обучение для тех, кто хочет внедрить нейросети в работу команды и выполнять задачи быстрее и дешевле.", duration: "6 ч", level: "для бизнеса", price: 22900, tools: ["ChatGPT", "Claude"] },
  { id: 9, category: "ai", title: "Нейросети для создания презентаций", desc: "От идеи до готовой презентации за час с помощью ИИ.", duration: "4 ч", level: "базовый", price: 14900, popular: true, tools: ["ChatGPT", "Gamma", "Deepseek"] },
  { id: 10, category: "ai", title: "Практикум: Нейросети для менеджеров", desc: "Научись оптимизировать и автоматизировать управленческие процессы с помощью нейросетей.", duration: "5 ч", level: "для бизнеса", price: 18900, tools: ["ChatGPT", "NotebookLM"] },
  { id: 11, category: "presentations", title: "Создание презентаций в Р7 Офис", desc: "Стильные, современные слайды в Р7-Презентациях — без сторонних сервисов. Подходит переходящим с PowerPoint на российское ПО.", duration: "5 ч", level: "базовый", price: 13900, tools: ["Р7 Офис"] },
  { id: 12, category: "data", title: "Аналитика данных без боли", desc: "Превращайте цифры и отчёты в ясные инсайты, выделяйте главное и создавайте профессиональные дашборды.", duration: "8 ч", level: "для бизнеса", price: 21900, tools: ["Excel", "PowerPoint"] },
  { id: 13, category: "data", title: "Графики, таблицы, много всего на слайде", desc: "Работа с большими объёмами данных, акценты на важном и красивое представление информации.", duration: "5 ч", level: "для бизнеса", price: 15900, tools: ["PowerPoint", "Excel"] },
  { id: 14, category: "design", title: "Продвинутый дизайн презентаций", desc: "Подбирайте шрифты под тематику слайдов, применяйте цвет и форму для мощной визуальной концепции.", duration: "6 ч", level: "продвинутый", price: 17900, tools: ["PowerPoint"] },
  { id: 15, category: "presentations", title: "Основы дизайна презентаций", desc: "Делайте слайды выше среднего при помощи инструментов PowerPoint. Подходит начинающим и продолжающим.", duration: "5 ч", level: "базовый", price: 12900, tools: ["PowerPoint"] },
  { id: 16, category: "design", title: "Шаблоны убойных слайдов для бизнеса", desc: "Создаём 76+ готовых шаблонов для быстрого создания слайдов: работаем с большим объёмом информации и делаем красиво.", duration: "7 ч", level: "для бизнеса", price: 19900, tools: ["PowerPoint"] },
  { id: 17, category: "data", title: "Excel для бизнеса", desc: "Управляйтесь с данными на уровне специалиста, делайте красивые графики и таблицы в связке с Excel.", duration: "6 ч", level: "для бизнеса", price: 16900, tools: ["Excel"] },
  { id: 18, category: "presentations", title: "Убойная анимация для бизнеса", desc: "Усильте слайды с помощью качественной анимации и сделайте презентацию запоминающейся.", duration: "4 ч", level: "для бизнеса", price: 14900, tools: ["PowerPoint"] },
  { id: 19, category: "design", title: "Photoshop для бизнеса", desc: "Когда PowerPoint не хватает. Базовая ретушь и создание картинок с нуля.", duration: "6 ч", level: "для бизнеса", price: 17900, tools: ["Photoshop"] },
  { id: 20, category: "ai", title: "Нейросети для бизнеса", desc: "Оптимизируйте рабочие процессы с помощью ИИ и делегируйте рутинные задачи нейросетям.", duration: "6 ч", level: "для бизнеса", price: 18900, tools: ["ChatGPT", "Claude"] },
  { id: 21, category: "design", title: "Дизайн в Figma для бизнеса", desc: "Осваивайте Figma с нуля и делайте эффектные слайды за пару минут. Всё, что необходимо в работе.", duration: "7 ч", level: "для бизнеса", price: 19900, tools: ["Figma"] },
  { id: 22, category: "oratory", title: "Ораторское мастерство для бизнеса", desc: "Выступайте уверенно перед клиентами, партнёрами и инвесторами: техники убеждения и управления вниманием аудитории.", duration: "6 ч", level: "для бизнеса", price: 21900, popular: true, tools: ["Публичные выступления"] },
  { id: 23, category: "presentations", title: "Структура презентации и сторителлинг", desc: "Прокачиваем навыки создания структуры, сторителлинга, работы с контентом и смыслом.", duration: "5 ч", level: "базовый", price: 14900, tools: ["PowerPoint", "Keynote"] },
  { id: 24, category: "ai", title: "Нейросети для маркетинга и контента", desc: "Автоматизируйте маркетинговые процессы и повышайте эффективность кампаний с помощью нейросетей.", duration: "6 ч", level: "для бизнеса", price: 19900, isNew: true, tools: ["ChatGPT", "Midjourney", "Claude"] },
  { id: 25, category: "presentations", title: "Слайды для выступления. Экспресс", desc: "Пошаговая инструкция по подготовке презентации и выступления на уровне BigTech с Bonnie&Slide.", duration: "3 ч", level: "базовый", price: 9900, tools: ["PowerPoint", "Keynote"] },
];

const TASKS: Task[] = [
  {
    id: "slow-slides",
    icon: "Clock",
    title: "Команда тратит слишком много времени на слайды",
    desc: "Каждая презентация проходит 5–7 правок, уходят часы на оформление вместо содержания.",
    courseIds: [1, 15, 3, 16],
  },
  {
    id: "bad-design",
    icon: "Palette",
    title: "Презентации выглядят непрофессионально",
    desc: "Слайды выглядят устаревшими, нет единого стиля, сложно воспринимать визуально.",
    courseIds: [2, 14, 3, 16, 19],
  },
  {
    id: "data-charts",
    icon: "BarChart2",
    title: "Сложно красиво показать данные и графики",
    desc: "Отчёты с огромными таблицами, диаграммами и цифрами выглядят перегруженно.",
    courseIds: [4, 12, 13, 17],
  },
  {
    id: "ai-adoption",
    icon: "Sparkles",
    title: "Руководство требует внедрить ИИ в работу",
    desc: "Сотрудники не знают, как применять нейросети. Нужна практика на реальных задачах.",
    courseIds: [6, 8, 20, 10, 7],
  },
  {
    id: "ai-presentations",
    icon: "Zap",
    title: "Хотим делать презентации быстрее с ИИ",
    desc: "Нужно сократить время на создание слайдов с помощью современных ИИ-инструментов.",
    courseIds: [9, 6, 1, 2],
  },
  {
    id: "public-speaking",
    icon: "Mic",
    title: "Сотрудники теряются на выступлениях",
    desc: "Слабая подача на переговорах, питчах и публичных защитах перед клиентами.",
    courseIds: [22, 23, 25],
  },
  {
    id: "new-standards",
    icon: "Award",
    title: "Нет единых стандартов оформления",
    desc: "У каждого отдела свой стиль, нет корпоративных шаблонов и правил оформления.",
    courseIds: [16, 3, 14, 1],
  },
  {
    id: "russian-soft",
    icon: "Flag",
    title: "Переходим на российское ПО",
    desc: "Компания мигрирует с Office на Р7 или другие отечественные решения.",
    courseIds: [11, 15, 4],
  },
  {
    id: "marketing-ai",
    icon: "TrendingUp",
    title: "Маркетинг хочет автоматизировать контент",
    desc: "Нужно ускорить создание постов, баннеров, текстов и рекламных материалов с ИИ.",
    courseIds: [24, 6, 20],
  },
  {
    id: "analytics",
    icon: "LineChart",
    title: "Аналитики хотят лучше доносить инсайты",
    desc: "Данные есть, но их сложно визуализировать так, чтобы решения принимались быстро.",
    courseIds: [12, 4, 13, 17],
  },
  {
    id: "automation",
    icon: "Bot",
    title: "Автоматизировать рутинные процессы",
    desc: "Хотим, чтобы сотрудники сами создавали инструменты — дашборды, боты, отчёты.",
    courseIds: [7, 10, 20],
  },
  {
    id: "managers",
    icon: "Briefcase",
    title: "Менеджеры хотят работать эффективнее с ИИ",
    desc: "Управленцы тратят время на рутину — нужно делегировать задачи нейросетям.",
    courseIds: [10, 20, 6, 8],
  },
];

const CATEGORIES: { key: Category | "all"; label: string; icon: string }[] = [
  { key: "all", label: "Все курсы", icon: "LayoutGrid" },
  { key: "presentations", label: "Презентации", icon: "Layout" },
  { key: "ai", label: "Нейросети и ИИ", icon: "Sparkles" },
  { key: "data", label: "Данные и аналитика", icon: "BarChart2" },
  { key: "design", label: "Дизайн", icon: "Palette" },
  { key: "oratory", label: "Ораторика", icon: "Mic" },
];

const LEVEL_COLORS: Record<string, string> = {
  "базовый": "border-blue-500/40 text-blue-400",
  "продвинутый": "border-purple-500/40 text-purple-400",
  "для бизнеса": "border-vibe-red/40 text-vibe-red",
};

function fmt(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function B2BCourses() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [activeStep, setActiveStep] = useState<"tasks" | "courses">("tasks");

  // Courses recommended by selected tasks
  const recommendedIds = useMemo(() => {
    const ids = new Set<number>();
    selectedTasks.forEach((taskId) => {
      const task = TASKS.find((t) => t.id === taskId);
      task?.courseIds.forEach((id) => ids.add(id));
    });
    return ids;
  }, [selectedTasks]);

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const matchCat = activeCategory === "all" || c.category === activeCategory;
      const matchSearch = search === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const selectedCourses = COURSES.filter((c) => selected.has(c.id));
  const totalPrice = selectedCourses.reduce((sum, c) => sum + c.price, 0);
  const totalHours = selectedCourses.reduce((sum, c) => sum + parseInt(c.duration), 0);

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTask(id: string) {
    setSelectedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function applyRecommended() {
    setSelected((prev) => {
      const next = new Set(prev);
      recommendedIds.forEach((id) => next.add(id));
      return next;
    });
    setActiveStep("courses");
    setTimeout(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <div className="min-h-screen bg-vibe-dark font-golos">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-vibe-dark/95 backdrop-blur-sm border-b border-vibe-dark3">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex flex-col gap-0.5 flex-shrink-0">
            <Logo width={110} height={13} />
            <span className="text-vibe-muted text-xs">для бизнеса</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm text-vibe-muted">
            <a href="/b2b" className="hover:text-vibe-red transition-colors">← B2B обучение</a>
            <a href="#tasks" className="hover:text-vibe-light transition-colors">Задачи бизнеса</a>
            <a href="#catalog" className="hover:text-vibe-light transition-colors">Каталог курсов</a>
          </div>
          <button
            onClick={() => setShowSummary(true)}
            className="relative bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-4 py-2.5 hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon name="ShoppingCart" size={16} />
            <span className="hidden sm:inline">Программа</span>
            {selected.size > 0 && (
              <span className="w-5 h-5 bg-white text-vibe-red text-xs font-bold rounded-full flex items-center justify-center">
                {selected.size}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-vibe-dark3">
        <div className="absolute inset-0 bg-gradient-to-br from-vibe-dark via-vibe-dark to-vibe-dark2" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-vibe-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-vibe-red/3 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-vibe-red/40 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 bg-vibe-red rounded-full animate-pulse" />
                <span className="text-vibe-red text-xs font-oswald uppercase tracking-widest">Конструктор программы</span>
              </div>
              <h1 className="font-oswald text-5xl md:text-7xl text-vibe-light leading-none mb-5">
                СОБЕРИТЕ<br />
                <span className="text-vibe-red">ПРОГРАММУ</span><br />
                ПОД КОМАНДУ
              </h1>
              <p className="text-vibe-muted text-lg leading-relaxed mb-8 max-w-lg">
                Выберите задачи вашего бизнеса — мы подберём курсы автоматически. Или сразу идите в каталог и собирайте программу вручную.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#tasks" className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-7 py-4 hover:bg-red-700 transition-colors flex items-center gap-2">
                  Выбрать по задачам
                  <Icon name="ArrowDown" size={16} />
                </a>
                <a href="#catalog" className="border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest px-7 py-4 hover:border-vibe-red/40 hover:text-vibe-light transition-colors">
                  Смотреть каталог
                </a>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {[
                { num: "26", label: "курсов в каталоге" },
                { num: "12", label: "бизнес-задач для подбора" },
                { num: "200+", label: "компаний уже обучились" },
                { num: "4,9/5", label: "средний NPS клиентов" },
              ].map((s) => (
                <div key={s.num} className="bg-vibe-dark3 border border-vibe-dark3 p-5">
                  <div className="font-oswald text-3xl text-vibe-red">{s.num}</div>
                  <div className="text-vibe-muted text-xs mt-1 leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 bg-vibe-dark2 border-b border-vibe-dark3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-vibe-dark3">
            {[
              { step: "01", icon: "Target", title: "Выберите задачи", desc: "Отметьте, что хотите улучшить в команде — мы покажем подходящие курсы" },
              { step: "02", icon: "Package", title: "Соберите программу", desc: "Добавьте курсы в корзину вручную или возьмите готовую подборку по задачам" },
              { step: "03", icon: "Send", title: "Получите КП", desc: "Отправьте заявку — менеджер подготовит персональное предложение за 2 часа" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-5 p-7 border-r border-vibe-dark3 last:border-r-0">
                <div className="flex-shrink-0">
                  <div className="font-oswald text-3xl text-vibe-red/20 leading-none">{s.step}</div>
                </div>
                <div>
                  <div className="w-8 h-8 bg-vibe-red/10 flex items-center justify-center mb-3">
                    <Icon name={s.icon} fallback="Star" size={16} className="text-vibe-red" />
                  </div>
                  <h3 className="font-oswald text-lg text-vibe-light mb-1">{s.title}</h3>
                  <p className="text-vibe-muted text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TASKS */}
      <section id="tasks" className="py-20 bg-vibe-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">
              Шаг 1 — Задачи бизнеса
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-oswald text-3xl md:text-5xl text-vibe-light leading-none">
                  ЧТО ХОТИТЕ<br />
                  <span className="text-vibe-red">УЛУЧШИТЬ?</span>
                </h2>
                <p className="text-vibe-muted text-sm mt-3 max-w-lg leading-relaxed">
                  Выберите одну или несколько задач — мы автоматически подберём курсы. Можно пропустить и перейти к каталогу.
                </p>
              </div>
              {selectedTasks.size > 0 && (
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-vibe-muted text-sm">
                    Выбрано задач: <span className="text-vibe-red font-oswald">{selectedTasks.size}</span>
                    {" · "}подобрано курсов: <span className="text-vibe-red font-oswald">{recommendedIds.size}</span>
                  </span>
                  <button
                    onClick={applyRecommended}
                    className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-5 py-3 hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    Применить подборку
                    <Icon name="ArrowDown" size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TASKS.map((task) => {
              const isActive = selectedTasks.has(task.id);
              const coursesCount = task.courseIds.length;
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`relative flex items-start gap-4 p-5 border cursor-pointer transition-all group ${
                    isActive
                      ? "border-vibe-red bg-vibe-red/5"
                      : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                  }`}
                >
                  <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isActive ? "bg-vibe-red border-vibe-red" : "border-vibe-dark3 bg-vibe-dark group-hover:border-vibe-red/50"
                  }`}>
                    {isActive && <Icon name="Check" size={12} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon name={task.icon} fallback="Target" size={14} className={isActive ? "text-vibe-red" : "text-vibe-muted"} />
                      <h3 className={`font-oswald text-sm leading-tight transition-colors ${isActive ? "text-vibe-red" : "text-vibe-light group-hover:text-vibe-red"}`}>
                        {task.title}
                      </h3>
                    </div>
                    <p className="text-vibe-muted text-xs leading-relaxed mb-2">{task.desc}</p>
                    <div className="text-vibe-muted/60 text-xs">
                      {coursesCount} {coursesCount === 1 ? "курс" : coursesCount < 5 ? "курса" : "курсов"}
                    </div>
                  </div>
                  {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vibe-red" />}
                </div>
              );
            })}
          </div>

          {selectedTasks.size > 0 && (
            <div className="mt-8 bg-vibe-dark3 border border-vibe-red/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <div className="font-oswald text-vibe-light mb-1">
                  По вашим задачам подобрано <span className="text-vibe-red">{recommendedIds.size} курсов</span>
                </div>
                <p className="text-vibe-muted text-xs">Нажмите «Применить» — курсы добавятся в программу. Потом сможете скорректировать вручную.</p>
              </div>
              <button
                onClick={applyRecommended}
                className="flex-shrink-0 bg-vibe-red text-white font-oswald uppercase tracking-widest px-6 py-3.5 hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                Применить подборку
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 bg-vibe-dark2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">
              Шаг 2 — Каталог курсов
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-oswald text-3xl md:text-5xl text-vibe-light leading-none">
                  ВЫБЕРИТЕ<br />
                  <span className="text-vibe-red">КУРСЫ</span>
                </h2>
                <p className="text-vibe-muted text-sm mt-2 max-w-lg">
                  Кликайте на карточку — курс добавляется в программу
                  {recommendedIds.size > 0 && <span className="text-vibe-red"> · рекомендованные отмечены звёздочкой</span>}
                </p>
              </div>
              {/* Search */}
              <div className="relative w-full md:w-64 flex-shrink-0">
                <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-vibe-muted" />
                <input
                  type="text"
                  placeholder="Поиск по курсам..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Selected mini-bar */}
          {selected.size > 0 && (
            <div className="mb-6 bg-vibe-dark3 border border-vibe-red/30 px-5 py-3 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-vibe-light text-sm">
                  Выбрано: <span className="font-oswald text-vibe-red">{selected.size}</span>
                </span>
                <span className="text-vibe-muted text-xs">{totalHours} ч</span>
                <span className="text-vibe-muted text-xs">{fmt(totalPrice)} ориентировочно</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button onClick={() => setSelected(new Set())} className="text-vibe-muted text-xs hover:text-vibe-red transition-colors">
                  Очистить
                </button>
                <button
                  onClick={() => setShowSummary(true)}
                  className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-4 py-2 hover:bg-red-700 transition-colors"
                >
                  Собрать программу →
                </button>
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((cat) => {
              const count = cat.key === "all" ? COURSES.length : COURSES.filter((c) => c.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-oswald uppercase tracking-wide border transition-colors ${
                    activeCategory === cat.key
                      ? "bg-vibe-red border-vibe-red text-white"
                      : "border-vibe-dark3 text-vibe-muted bg-vibe-dark hover:border-vibe-red/40 hover:text-vibe-light"
                  }`}
                >
                  <Icon name={cat.icon} fallback="Grid" size={14} />
                  {cat.label}
                  <span className={`text-xs ${activeCategory === cat.key ? "opacity-70" : "opacity-50"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="text-vibe-muted text-xs mb-5">
            {filtered.length === 0 ? "Ничего не найдено" : `Показано ${filtered.length} из ${COURSES.length} курсов`}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((course) => {
              const isSelected = selected.has(course.id);
              const isRecommended = recommendedIds.has(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => toggle(course.id)}
                  className={`relative flex flex-col p-5 border cursor-pointer transition-all group ${
                    isSelected
                      ? "border-vibe-red bg-vibe-red/5"
                      : isRecommended
                      ? "border-vibe-red/30 bg-vibe-dark3 hover:border-vibe-red"
                      : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                  }`}
                >
                  {/* Top badges */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    {isRecommended && !isSelected && (
                      <span className="text-vibe-red" title="Рекомендован под ваши задачи">
                        <Icon name="Star" size={12} className="fill-vibe-red" />
                      </span>
                    )}
                    {course.popular && (
                      <span className="bg-vibe-red text-white text-xs font-oswald px-1.5 py-0.5 uppercase leading-tight">Хит</span>
                    )}
                    {course.isNew && (
                      <span className="bg-blue-600 text-white text-xs font-oswald px-1.5 py-0.5 uppercase leading-tight">New</span>
                    )}
                  </div>

                  {/* Checkbox */}
                  <div className={`absolute top-3 left-3 w-5 h-5 border flex items-center justify-center transition-colors ${
                    isSelected ? "bg-vibe-red border-vibe-red" : "border-vibe-dark3 bg-vibe-dark group-hover:border-vibe-red/50"
                  }`}>
                    {isSelected && <Icon name="Check" size={12} className="text-white" />}
                  </div>

                  <div className="mt-5 flex-1">
                    <span className={`inline-block text-xs border px-2 py-0.5 font-oswald uppercase mb-3 ${LEVEL_COLORS[course.level]}`}>
                      {course.level}
                    </span>
                    <h3 className={`font-oswald text-sm leading-tight mb-2 transition-colors ${
                      isSelected ? "text-vibe-red" : "text-vibe-light group-hover:text-vibe-red"
                    }`}>
                      {course.title}
                    </h3>
                    <p className="text-vibe-muted text-xs leading-relaxed mb-3 line-clamp-2">{course.desc}</p>
                    {course.tools && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {course.tools.slice(0, 3).map((t) => (
                          <span key={t} className="text-xs border border-vibe-dark3 text-vibe-muted/50 px-1.5 py-0.5">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-vibe-dark3">
                    <div className="flex items-center gap-1 text-vibe-muted text-xs">
                      <Icon name="Clock" size={11} />
                      {course.duration}
                    </div>
                    <div className="font-oswald text-vibe-red text-sm">{fmt(course.price)}</div>
                  </div>

                  {isSelected && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vibe-red" />}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Icon name="SearchX" size={36} className="text-vibe-dark3 mx-auto mb-3" />
              <p className="text-vibe-muted text-sm">Ничего не найдено — попробуйте другой запрос или категорию</p>
            </div>
          )}
        </div>
      </section>

      {/* WHY CUSTOM */}
      <section className="py-16 bg-vibe-dark border-t border-vibe-dark3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "Target", title: "Под ваши задачи", desc: "Не шаблонный курс — адаптируем программу под специфику бизнеса и команды" },
              { icon: "Users", title: "Группы до 10 чел.", desc: "Каждый участник получает персональную обратную связь от тренера" },
              { icon: "FileCheck", title: "Корп. шаблон", desc: "Работаем в вашем корпоративном шаблоне, ничего не ломаем" },
              { icon: "Award", title: "Гарантия результата", desc: "Замеряем эффект до и после. Образовательная лицензия Л035-01298-77/01635812" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-vibe-red/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} fallback="Star" size={16} className="text-vibe-red" />
                </div>
                <div>
                  <h3 className="font-oswald text-vibe-light text-sm mb-1">{item.title}</h3>
                  <p className="text-vibe-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      {selected.size === 0 && (
        <section className="py-16 bg-vibe-dark3 border-t border-vibe-dark3">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Icon name="MousePointerClick" size={32} className="text-vibe-red mx-auto mb-4" />
            <h3 className="font-oswald text-2xl text-vibe-light mb-2">Выберите курсы — соберём программу</h3>
            <p className="text-vibe-muted text-sm mb-5">Нажмите на задачу выше — мы подберём курсы. Или кликайте на карточки в каталоге.</p>
            <a href="#tasks" className="inline-block bg-vibe-red text-white font-oswald uppercase tracking-widest px-6 py-3 hover:bg-red-700 transition-colors">
              Выбрать задачи
            </a>
          </div>
        </section>
      )}

      {/* SUMMARY MODAL */}
      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSummary(false)} />
          <div className="relative z-10 bg-vibe-dark border border-vibe-dark3 w-full md:max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />
            {!formSent ? (
              <div className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-oswald text-2xl text-vibe-light">Ваша программа</h2>
                  <button onClick={() => setShowSummary(false)}>
                    <Icon name="X" size={20} className="text-vibe-muted hover:text-vibe-light transition-colors" />
                  </button>
                </div>

                {selected.size === 0 ? (
                  <div className="text-center py-10">
                    <Icon name="ShoppingCart" size={32} className="text-vibe-dark3 mx-auto mb-3" />
                    <p className="text-vibe-muted text-sm mb-4">Пока не добавлено ни одного курса</p>
                    <button onClick={() => setShowSummary(false)} className="text-vibe-red text-sm hover:underline">
                      Вернуться к каталогу
                    </button>
                  </div>
                ) : (
                  <>
                    {selectedTasks.size > 0 && (
                      <div className="mb-4 p-3 bg-vibe-dark3 border border-vibe-dark3">
                        <div className="text-vibe-muted text-xs mb-2 font-oswald uppercase tracking-widest">Выбранные задачи</div>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from(selectedTasks).map((taskId) => {
                            const task = TASKS.find((t) => t.id === taskId);
                            return task ? (
                              <span key={taskId} className="text-xs border border-vibe-red/30 text-vibe-red px-2 py-0.5">{task.title}</span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      {selectedCourses.map((c) => (
                        <div key={c.id} className="flex items-start justify-between gap-3 p-3 bg-vibe-dark3 border border-vibe-dark3">
                          <div className="flex-1 min-w-0">
                            <div className="font-oswald text-sm text-vibe-light leading-tight">{c.title}</div>
                            <div className="text-vibe-muted text-xs mt-0.5">{c.duration} · {c.level}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-oswald text-vibe-red text-sm">{fmt(c.price)}</span>
                            <button onClick={(e) => { e.stopPropagation(); toggle(c.id); }}>
                              <Icon name="X" size={14} className="text-vibe-muted hover:text-vibe-red transition-colors" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3 bg-vibe-dark3 border border-vibe-dark3 p-4 mb-6 text-center">
                      <div>
                        <div className="font-oswald text-xl text-vibe-red">{selected.size}</div>
                        <div className="text-vibe-muted text-xs">курсов</div>
                      </div>
                      <div>
                        <div className="font-oswald text-xl text-vibe-red">{totalHours} ч</div>
                        <div className="text-vibe-muted text-xs">обучения</div>
                      </div>
                      <div>
                        <div className="font-oswald text-base text-vibe-red">{fmt(totalPrice)}</div>
                        <div className="text-vibe-muted text-xs">ориентировочно</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-oswald text-lg text-vibe-light">Запросить предложение</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Имя" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-3 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                        <input type="tel" placeholder="Телефон" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-3 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                      </div>
                      <input type="email" placeholder="Корпоративная почта" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-3 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                      <input type="text" placeholder="Компания" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-3 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                      <select className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-muted px-3 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors">
                        <option value="">Размер команды</option>
                        <option>до 10</option><option>10–30</option><option>30–50</option><option>50–100</option><option>100+</option>
                      </select>
                      <textarea placeholder="Комментарий (необязательно)" rows={2} className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-3 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors resize-none" />
                      <button
                        onClick={() => setFormSent(true)}
                        className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-3.5 hover:bg-red-700 transition-colors"
                      >
                        Отправить программу
                      </button>
                      <p className="text-vibe-muted text-xs text-center">Ответим в течение 30 минут в рабочее время</p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-vibe-red/10 flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-vibe-red" />
                </div>
                <h2 className="font-oswald text-2xl text-vibe-light mb-3">Заявка отправлена!</h2>
                <p className="text-vibe-muted text-sm mb-6 leading-relaxed">
                  Менеджер получил вашу программу из {selected.size} курсов и свяжется в течение 30 минут в рабочее время.
                </p>
                <button
                  onClick={() => { setShowSummary(false); setFormSent(false); }}
                  className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-6 py-3 hover:bg-red-700 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE STICKY */}
      {selected.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-vibe-dark border-t border-vibe-dark3 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-vibe-muted text-xs">Выбрано: {selected.size} курсов</div>
            <div className="font-oswald text-vibe-light text-sm">{fmt(totalPrice)}</div>
          </div>
          <button
            onClick={() => setShowSummary(true)}
            className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-5 py-3 hover:bg-red-700 transition-colors"
          >
            Собрать программу
          </button>
        </div>
      )}
    </div>
  );
}
