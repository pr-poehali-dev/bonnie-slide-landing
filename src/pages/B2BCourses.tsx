import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

// ─── DATA ─────────────────────────────────────────────────────────────────────

type Category = "presentations" | "ai" | "data" | "design" | "oratory" | "other";

interface Course {
  id: number;
  title: string;
  desc: string;
  category: Category;
  duration: string;
  level: "базовый" | "продвинутый" | "для бизнеса";
  price: number;
  popular?: boolean;
  new?: boolean;
  tools?: string[];
}

const COURSES: Course[] = [
  {
    id: 1, category: "presentations",
    title: "Power of PowerPoint",
    desc: "Весь арсенал инструментов для создания убойно-красивых слайдов в PowerPoint от экспертов ведущей студии презентаций.",
    duration: "8 ч", level: "базовый", price: 18900, popular: true,
    tools: ["PowerPoint"],
  },
  {
    id: 2, category: "presentations",
    title: "Тройной удар по PowerPoint: цвета, шрифты, концепции",
    desc: "Визуализируйте диаграммы, огромные таблицы и многоступенчатые процессы понятно и красиво. Самые полезные фишки Excel в придачу.",
    duration: "6 ч", level: "продвинутый", price: 16900,
    tools: ["PowerPoint", "Excel"],
  },
  {
    id: 3, category: "design",
    title: "Шаблоны убойных слайдов",
    desc: "Сборник готовых визуальных решений на все случаи презентационной жизни. Стань ещё сильнее в дизайне и композиции слайдов!",
    duration: "5 ч", level: "продвинутый", price: 14900,
    tools: ["PowerPoint"],
  },
  {
    id: 4, category: "data",
    title: "Графики и таблицы",
    desc: "Визуализируйте диаграммы, огромные таблицы и многоступенчатые процессы. Освойте самые полезные фишки Excel.",
    duration: "5 ч", level: "базовый", price: 13900,
    tools: ["PowerPoint", "Excel"],
  },
  {
    id: 5, category: "presentations",
    title: "Убойная Анимация",
    desc: "Курс для тех, кто хочет усилить слайды с помощью анимации. Научитесь делать из своей презентации крутой видеоролик!",
    duration: "4 ч", level: "продвинутый", price: 12900,
    tools: ["PowerPoint"],
  },
  {
    id: 6, category: "ai",
    title: "ИИ-креатор: создание контента с нейросетями",
    desc: "Создавайте уникальный контент с помощью нейросетей и применяйте ИИ в работе.",
    duration: "6 ч", level: "для бизнеса", price: 19900, popular: true,
    tools: ["ChatGPT", "Midjourney", "Claude"],
  },
  {
    id: 7, category: "ai",
    title: "Вайбкодинг для автоматизации рабочих задач",
    desc: "Кратное ускорение рутинных процессов: сотрудники создают дашборды, порталы и AI-ассистентов сами — описывая задачу нейросети.",
    duration: "8 ч", level: "для бизнеса", price: 24900, new: true,
    tools: ["ChatGPT", "Claude", "Cursor"],
  },
  {
    id: 8, category: "ai",
    title: "Очный мастер-класс по нейросетям",
    desc: "Корпоративное обучение для тех, кто хочет внедрить нейросети в работу команды и выполнять задачи быстрее и дешевле.",
    duration: "6 ч", level: "для бизнеса", price: 22900,
    tools: ["ChatGPT", "Claude"],
  },
  {
    id: 9, category: "ai",
    title: "Нейросети для создания презентаций",
    desc: "От идеи до готовой презентации за час с помощью ИИ.",
    duration: "4 ч", level: "базовый", price: 14900, popular: true,
    tools: ["ChatGPT", "Gamma", "Deepseek"],
  },
  {
    id: 10, category: "ai",
    title: "Практикум: Нейросети для менеджеров",
    desc: "Научись оптимизировать и автоматизировать управленческие процессы с помощью нейросетей.",
    duration: "5 ч", level: "для бизнеса", price: 18900,
    tools: ["ChatGPT", "NotebookLM"],
  },
  {
    id: 11, category: "presentations",
    title: "Создание презентаций в Р7 Офис",
    desc: "Стильные, современные слайды в Р7-Презентациях — без сторонних сервисов. Подходит переходящим с PowerPoint на российское ПО.",
    duration: "5 ч", level: "базовый", price: 13900,
    tools: ["Р7 Офис"],
  },
  {
    id: 12, category: "data",
    title: "Аналитика данных без боли",
    desc: "Превращайте цифры и отчёты в ясные инсайты, выделяйте главное и создавайте профессиональные дашборды.",
    duration: "8 ч", level: "для бизнеса", price: 21900,
    tools: ["Excel", "PowerPoint"],
  },
  {
    id: 13, category: "data",
    title: "Графики, таблицы, много всего на слайде",
    desc: "Работа с большими объёмами данных, акценты на важном и красивое представление информации.",
    duration: "5 ч", level: "для бизнеса", price: 15900,
    tools: ["PowerPoint", "Excel"],
  },
  {
    id: 14, category: "design",
    title: "Продвинутый дизайн презентаций",
    desc: "Подбирайте шрифты под тематику слайдов, применяйте цвет и форму для мощной визуальной концепции.",
    duration: "6 ч", level: "продвинутый", price: 17900,
    tools: ["PowerPoint"],
  },
  {
    id: 15, category: "presentations",
    title: "Основы дизайна презентаций",
    desc: "Делайте слайды выше среднего при помощи инструментов PowerPoint. Подходит начинающим и продолжающим.",
    duration: "5 ч", level: "базовый", price: 12900,
    tools: ["PowerPoint"],
  },
  {
    id: 16, category: "design",
    title: "Шаблоны убойных слайдов для бизнеса",
    desc: "Создаём 76+ готовых шаблонов для быстрого создания слайдов: работаем с большим объёмом информации и «делаем красиво».",
    duration: "7 ч", level: "для бизнеса", price: 19900,
    tools: ["PowerPoint"],
  },
  {
    id: 17, category: "data",
    title: "Excel для бизнеса",
    desc: "Управляйтесь с данными на уровне специалиста, делайте красивые графики и таблицы в связке с Excel.",
    duration: "6 ч", level: "для бизнеса", price: 16900,
    tools: ["Excel"],
  },
  {
    id: 18, category: "presentations",
    title: "Убойная анимация для бизнеса",
    desc: "Усильте слайды с помощью качественной анимации и сделайте презентацию запоминающейся.",
    duration: "4 ч", level: "для бизнеса", price: 14900,
    tools: ["PowerPoint"],
  },
  {
    id: 19, category: "design",
    title: "Photoshop для бизнеса",
    desc: "Когда PowerPoint не хватает. Базовая ретушь и создание картинок с нуля.",
    duration: "6 ч", level: "для бизнеса", price: 17900,
    tools: ["Photoshop"],
  },
  {
    id: 20, category: "ai",
    title: "Нейросети для бизнеса",
    desc: "Оптимизируйте рабочие процессы с помощью ИИ и делегируйте рутинные задачи нейросетям.",
    duration: "6 ч", level: "для бизнеса", price: 18900,
    tools: ["ChatGPT", "Claude"],
  },
  {
    id: 21, category: "design",
    title: "Дизайн в Figma для бизнеса",
    desc: "Осваивайте Figma с нуля и делайте эффектные слайды за пару минут. Всё, что необходимо в работе.",
    duration: "7 ч", level: "для бизнеса", price: 19900,
    tools: ["Figma"],
  },
  {
    id: 22, category: "oratory",
    title: "Ораторское мастерство для бизнеса",
    desc: "Выступайте уверенно перед клиентами, партнёрами и инвесторами: техники убеждения и управления вниманием аудитории.",
    duration: "6 ч", level: "для бизнеса", price: 21900, popular: true,
    tools: ["Публичные выступления"],
  },
  {
    id: 23, category: "presentations",
    title: "Структура презентации и сторителлинг",
    desc: "Прокачиваем навыки создания структуры, сторителлинга, работы с контентом и смыслом.",
    duration: "5 ч", level: "базовый", price: 14900,
    tools: ["PowerPoint", "Keynote"],
  },
  {
    id: 24, category: "ai",
    title: "Нейросети для маркетинга и контента",
    desc: "Автоматизируйте маркетинговые процессы и повышайте эффективность кампаний с помощью нейросетей.",
    duration: "6 ч", level: "для бизнеса", price: 19900, new: true,
    tools: ["ChatGPT", "Midjourney", "Claude"],
  },
  {
    id: 25, category: "presentations",
    title: "Слайды для выступления. Экспресс",
    desc: "Пошаговая инструкция по подготовке презентации и выступления на уровне BigTech с Bonnie&Slide.",
    duration: "3 ч", level: "базовый", price: 9900,
    tools: ["PowerPoint", "Keynote"],
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
  const [search, setSearch] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [formSent, setFormSent] = useState(false);

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

  function clearAll() {
    setSelected(new Set());
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
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-vibe-muted" />
              <input
                type="text"
                placeholder="Найти курс..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/b2b" className="text-vibe-muted text-sm hover:text-vibe-light transition-colors hidden md:block">
              ← Назад к B2B
            </a>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* PAGE TITLE */}
        <div className="mb-10">
          <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">
            Конструктор программы
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl text-vibe-light leading-none mb-4">
            СОБЕРИТЕ<br />
            <span className="text-vibe-red">СВОЙ КУРС</span>
          </h1>
          <p className="text-vibe-muted text-sm leading-relaxed max-w-xl">
            Выберите курсы из каталога — мы соберём индивидуальную программу под задачи вашей команды. Можно брать отдельно или в комбинации.
          </p>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-vibe-muted" />
            <input
              type="text"
              placeholder="Найти курс..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-vibe-red transition-colors"
            />
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const count = cat.key === "all" ? COURSES.length : COURSES.filter((c) => c.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-oswald uppercase tracking-wide border transition-colors ${
                  activeCategory === cat.key
                    ? "bg-vibe-red border-vibe-red text-white"
                    : "border-vibe-dark3 text-vibe-muted hover:border-vibe-red/40 hover:text-vibe-light"
                }`}
              >
                <Icon name={cat.icon} fallback="Grid" size={14} />
                {cat.label}
                <span className={`text-xs ${activeCategory === cat.key ? "opacity-70" : "opacity-50"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* SELECTED MINI-BAR */}
        {selected.size > 0 && (
          <div className="mb-6 bg-vibe-dark3 border border-vibe-red/30 px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon name="CheckSquare" size={16} className="text-vibe-red" />
              <span className="text-vibe-light text-sm">
                Выбрано курсов: <span className="font-oswald text-vibe-red">{selected.size}</span>
              </span>
              <span className="text-vibe-muted text-xs hidden sm:inline">·</span>
              <span className="text-vibe-muted text-xs hidden sm:inline">{totalHours} ч обучения</span>
              <span className="text-vibe-muted text-xs hidden sm:inline">·</span>
              <span className="text-vibe-muted text-xs hidden sm:inline">{fmt(totalPrice)} (ориентировочно)</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={clearAll} className="text-vibe-muted text-xs hover:text-vibe-red transition-colors">
                Очистить
              </button>
              <button
                onClick={() => setShowSummary(true)}
                className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-4 py-2 hover:bg-red-700 transition-colors"
              >
                Собрать программу
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        <div className="text-vibe-muted text-xs mb-4">
          {filtered.length === 0 ? "Ничего не найдено" : `Показано ${filtered.length} из ${COURSES.length} курсов`}
        </div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => {
            const isSelected = selected.has(course.id);
            return (
              <div
                key={course.id}
                onClick={() => toggle(course.id)}
                className={`relative flex flex-col p-6 border cursor-pointer transition-all group ${
                  isSelected
                    ? "border-vibe-red bg-vibe-red/5"
                    : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/40"
                }`}
              >
                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {course.popular && (
                    <span className="bg-vibe-red text-white text-xs font-oswald px-2 py-0.5 uppercase">Хит</span>
                  )}
                  {course.new && (
                    <span className="bg-blue-600 text-white text-xs font-oswald px-2 py-0.5 uppercase">Новый</span>
                  )}
                </div>

                {/* Checkbox */}
                <div className={`absolute top-3 left-3 w-5 h-5 border flex items-center justify-center transition-colors ${
                  isSelected ? "bg-vibe-red border-vibe-red" : "border-vibe-dark3 bg-vibe-dark group-hover:border-vibe-red/50"
                }`}>
                  {isSelected && <Icon name="Check" size={12} className="text-white" />}
                </div>

                <div className="mt-6 flex-1">
                  {/* Category + level */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs border px-2 py-0.5 font-oswald uppercase ${LEVEL_COLORS[course.level]}`}>
                      {course.level}
                    </span>
                  </div>

                  <h3 className={`font-oswald text-base leading-tight mb-2 transition-colors ${
                    isSelected ? "text-vibe-red" : "text-vibe-light group-hover:text-vibe-red"
                  }`}>
                    {course.title}
                  </h3>
                  <p className="text-vibe-muted text-xs leading-relaxed mb-4 line-clamp-3">{course.desc}</p>

                  {/* Tools */}
                  {course.tools && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tools.map((t) => (
                        <span key={t} className="text-xs border border-vibe-dark3 text-vibe-muted/60 px-1.5 py-0.5">{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-vibe-dark3">
                  <div className="flex items-center gap-1.5 text-vibe-muted text-xs">
                    <Icon name="Clock" size={12} />
                    {course.duration}
                  </div>
                  <div className="font-oswald text-vibe-red text-sm">{fmt(course.price)}</div>
                </div>

                {/* Selected overlay */}
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vibe-red" />
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Icon name="SearchX" size={40} className="text-vibe-dark3 mx-auto mb-3" />
            <p className="text-vibe-muted">Ничего не нашли — попробуйте другой запрос или категорию</p>
          </div>
        )}

        {/* BOTTOM CTA */}
        {selected.size === 0 && (
          <div className="mt-12 bg-vibe-dark3 border border-vibe-dark3 p-8 text-center">
            <Icon name="MousePointerClick" size={32} className="text-vibe-red mx-auto mb-3" />
            <h3 className="font-oswald text-xl text-vibe-light mb-2">Выберите курсы — соберём программу</h3>
            <p className="text-vibe-muted text-sm">Нажимайте на карточки, чтобы добавить курс. Программу из нескольких курсов можно отправить одним запросом.</p>
          </div>
        )}
      </div>

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
                    <p className="text-vibe-muted text-sm">Пока не выбрано ни одного курса</p>
                    <button onClick={() => setShowSummary(false)} className="mt-4 text-vibe-red text-sm hover:underline">
                      Вернуться к каталогу
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Selected list */}
                    <div className="space-y-2 mb-5">
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

                    {/* Totals */}
                    <div className="bg-vibe-dark3 border border-vibe-dark3 p-4 mb-6">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="font-oswald text-xl text-vibe-red">{selected.size}</div>
                          <div className="text-vibe-muted text-xs">курсов</div>
                        </div>
                        <div>
                          <div className="font-oswald text-xl text-vibe-red">{totalHours} ч</div>
                          <div className="text-vibe-muted text-xs">обучения</div>
                        </div>
                        <div>
                          <div className="font-oswald text-lg text-vibe-red">{fmt(totalPrice)}</div>
                          <div className="text-vibe-muted text-xs">ориентировочно</div>
                        </div>
                      </div>
                    </div>

                    {/* Form */}
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

      {/* MOBILE STICKY CTA */}
      {selected.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-vibe-dark border-t border-vibe-dark3 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-vibe-muted text-xs">Выбрано курсов: {selected.size}</div>
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
