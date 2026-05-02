import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

const HERO_BG = "https://cdn.poehali.dev/projects/70b2a877-599d-4d33-ad00-9094dfe27d22/files/6850137c-2931-48d7-9704-bb256c4013ca.jpg";
const RESULTS_BG = "https://cdn.poehali.dev/projects/70b2a877-599d-4d33-ad00-9094dfe27d22/files/4004ee3b-0247-4f2a-8cd9-849c05edf39c.jpg";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".b2b-appear");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── CALCULATOR LOGIC ────────────────────────────────────────────────────────
const calcRates: Record<string, Record<number, number>> = {
  presentations: { 2: 10000, 4: 15500, 6: 25000, 12: 50000 },
  ai:            { 2: 10000, 4: 15500, 6: 25000, 12: 50000 },
  combo:         { 2: 20000, 4: 31000, 6: 50000, 12: 100000 },
  oratory:       { 2: 24000, 4: 42000, 6: 66000, 12: 132000 },
};
function calcPrice(dir: string, dur: number, mult: number, format: string, people: number) {
  const rate = calcRates[dir]?.[dur] ?? 25000;
  const fotTrainer = rate / 0.94;
  const staffFixed = 42517;
  let min = (fotTrainer + staffFixed) / 0.1875;
  if (format === "offline") min *= 1.15;
  let rec = min * mult;
  min = Math.ceil(min / 10000) * 10000;
  rec = Math.ceil(rec / 10000) * 10000;
  const per = Math.round(rec / Math.max(1, people));
  return { min, rec, per };
}
function fmt(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const clients = ["МАРС", "САМСУНГ", "ВК", "ЛУКОЙЛ", "АЛЬФА-БАНК", "NESTLÉ", "ЯНДЕКС", "MASTERCARD", "LEROY MERLIN", "СКОЛКОВО"];

const problems = [
  { num: "01", tag: "Больно", title: "Презентации съедают\nрабочие недели", text: "Маркетинг, аналитика и PM тратят до 40% времени на слайды. Каждая проходит 5–10 правок. Цикл аналитика–визуализация–отчёт занимает ~41 час в неделю." },
  { num: "02", tag: "Не работает", title: "Команда не умеет\nработать с ИИ", text: "Руководство уже требует «использовать нейросети», но сотрудники не знают, как. Бесплатные курсы не дают системы. Нужен формат с практикой на реальных задачах." },
  { num: "03", tag: "Стыдно", title: "Люди теряются\nна выступлениях", text: "На питчах, защитах и продажах эксперты сливают содержание слабой подачей. Клиенты принимают решение по форме, а не по сути." },
];

const directions = [
  { icon: "Layout", title: "Презентации", desc: "Структура, сторилайн, визуал, работа с данными, графики и таблицы. Команда делает слайды за часы, а не за дни.", tools: ["PowerPoint", "Keynote", "Google Slides"], featured: false },
  { icon: "Sparkles", title: "Презы + ИИ", desc: "Хит продаж. Полный цикл: структура, визуал, нейросети для текста, графики и генерации изображений.", tools: ["ChatGPT", "Gamma", "Deepseek", "Midjourney"], featured: true },
  { icon: "Brain", title: "Нейросети в работе", desc: "Промпт-инжиниринг и ИИ-инструменты под задачи маркетинга, аналитики, продукта и HR. Только разрешённые у вас сервисы.", tools: ["ChatGPT", "Claude", "NotebookLM"], featured: false },
  { icon: "Mic", title: "Ораторское мастерство", desc: "Подача, работа с залом, управление энергией, ответы на сложные вопросы. Для публичных выступлений и внутренних защит.", tools: ["Публичные выступления", "Pitch"], featured: false },
];

const formats = [
  {
    title: "Интенсив", duration: "1 день · 6 часов", price: "от 350к",
    items: ["Базовые навыки за один рабочий день", "Группа до 10 человек", "Работа с реальными слайдами участников", "Чек-лист и шпаргалка после", "Онлайн · Офлайн у вас в офисе"],
    recommended: false,
  },
  {
    title: "Полный курс", duration: "2 дня · 12 часов", price: "от 490к",
    items: ["День 1 — презентации и визуал", "День 2 — нейросети и практикум", "Каждый переделывает свою реальную презу", "Персональная обратная связь", "Пост-материалы в стиле вашего бренда"],
    recommended: true,
  },
  {
    title: "Программа", duration: "Серия · 1–3 месяца", price: "от 1.2М",
    items: ["Несколько модулей и групп", "Диагностика навыков до старта", "Проектная работа между встречами", "Измерение эффекта до/после", "Для команд 20+ человек"],
    recommended: false,
  },
];

const timeline = [
  { time: "10:00", title: "Введение и план дня", desc: "Знакомство, разбор ожиданий команды, обзор программы.", isBreak: false },
  { time: "10:10", title: "Структура · ИИ-помощники", desc: "Универсальный скелет B&S, адаптация под отчётную презу, промпты для структуры.", isBreak: false },
  { time: "10:50", title: "Практика 1", desc: "Разрабатываем сторилайн рабочей презы через нейросети. Разбор и обратная связь.", isBreak: false },
  { time: "11:30", title: "Кофе-брейк", desc: "10 минут.", isBreak: true },
  { time: "11:40", title: "Дизайн и визуализация", desc: "3 ключевых принципа. Буллиты, карточки, таймлайны. Фокус и движение внимания.", isBreak: false },
  { time: "12:30", title: "Практика 2", desc: "Переделываем вместе 3 слайда из рабочей презы участников.", isBreak: false },
  { time: "13:00", title: "Большой перерыв", desc: "1 час.", isBreak: true },
  { time: "14:00", title: "Графики, таблицы, One Page", desc: "Что делать со сложными слайдами. Ошибки визуализации данных.", isBreak: false },
  { time: "14:30", title: "Практика 3", desc: "Перерисовываем нагруженные слайды из презентаций команды.", isBreak: false },
  { time: "15:10", title: "Практика 4 · самостоятельная работа", desc: "Каждый переделывает 1 свой слайд с консультацией тренера.", isBreak: false },
  { time: "15:45", title: "Разбор + доработка", desc: "Индивидуальная обратная связь тренера по каждому слайду.", isBreak: false },
  { time: "16:25", title: "ИИ для презентаций", desc: "Обзор зарубежных и российских инструментов для генерации слайдов.", isBreak: false },
  { time: "16:50", title: "Вопросы · дальнейшая практика", desc: "Как развиваться дальше, насмотренность, следующие шаги.", isBreak: false },
];

const levels = [
  { mult: "×1.0", title: "Стандарт", desc: "Готовая программа почти без изменений. Быстрый старт через 1–2 недели." },
  { mult: "×1.3", title: "Адаптация", desc: "Примеры под вашу отрасль, брендинг клиента, разрешённый у вас стек ИИ-инструментов." },
  { mult: "×1.6", title: "Глубокий кастом", desc: "Переработанная структура, новые задания на ваших реальных материалах, ваш корпоративный шаблон." },
  { mult: "×2.0", title: "С нуля", desc: "Программа с нуля под конкретную задачу. Для нестандартных запросов и уникальных ролей." },
];

const cases = [
  {
    logo: "MARS", name: "Mars", sub: "FMCG · 12 000 сотрудников в СНГ",
    quote: "«После тренинга время на подготовку квартального отчёта сократилось почти вдвое. Команда перестала бояться нейросетей и начала использовать их в повседневной работе.»",
    author: "HR-директор", authorSub: "Mars, направление обучения", initials: "АП",
    metrics: [{ num: "−45%", label: "времени на слайды" }, { num: "9,4/10", label: "NPS группы" }, { num: "48", label: "обучено за месяц" }],
  },
  {
    logo: "ВК", name: "ВКонтакте", sub: "Digital · маркетинг и продукт",
    quote: "«Заказывали формат «презы + ИИ» для маркетинга и PM. Через две недели после тренинга сами увидели — презентации стали проще и быстрее. Руководители тратят меньше времени на правки.»",
    author: "Head of Marketing", authorSub: "ВКонтакте", initials: "МК",
    metrics: [{ num: "−3", label: "итерации на презу" }, { num: "95%", label: "применяют ИИ" }, { num: "2 дня", label: "формат" }],
  },
  {
    logo: "SAM", name: "Samsung", sub: "Tech · региональный офис",
    quote: "«Нам нужно было, чтобы 30 человек в разных городах одинаково понимали принципы визуализации. B&S сделали два онлайн-потока с интеграцией в наш корпоративный шаблон.»",
    author: "L&D lead", authorSub: "Samsung", initials: "ЕС",
    metrics: [{ num: "30", label: "сотрудников" }, { num: "2 потока", label: "онлайн" }, { num: "100%", label: "доходимость" }],
  },
  {
    logo: "ЛУК", name: "Лукойл", sub: "Oil & Gas · офис в Москве",
    quote: "«Брали офлайн-интенсив + библиотеку из 50 слайдов в нашем корпоративном шаблоне. Теперь сотрудники собирают отчётные презентации из готовых блоков — стало стандартом.»",
    author: "Директор по коммуникациям", authorSub: "Лукойл", initials: "ДМ",
    metrics: [{ num: "50", label: "слайдов в библиотеке" }, { num: "24", label: "участника" }, { num: "1 день", label: "формат" }],
  },
];

const trainers = [
  { initials: "НП", name: "Николай Пере", role: "Основатель Bonnie&Slide", bio: "8+ лет в BBDO. 50+ телевизионных роликов. Преподаёт в Сколково. Ведёт корпоративные программы для Mars, VK, Samsung.", skills: ["Презентации", "Storytelling", "Pitch"] },
  { initials: "АК", name: "Анна Кошелева", role: "Lead-тренер по ИИ", bio: "Практик в области генеративных нейросетей. Внедряла ИИ-пайплайны для Альфа-Банка и Nestlé. Автор курса «Нейропрезентации».", skills: ["ChatGPT", "Claude", "Midjourney"] },
  { initials: "ИО", name: "Игорь Орлов", role: "Тренер по ораторике", bio: "Готовит топов к публичным выступлениям, IPO-роуд-шоу и защитам. 12 лет в коучинге первых лиц. Сколково, РЭУ им. Плеханова.", skills: ["Public Speaking", "Executive coaching"] },
];

const vsItems = [
  { them: "Записанные лекции, одни на всех", us: "Живой тренер работает с группой в моменте" },
  { them: "Большая группа — 50–500+ человек", us: "Группа до 10 человек — персональное внимание" },
  { them: "Абстрактные кейсы не из вашей отрасли", us: "Работа с реальными слайдами команды" },
  { them: "Сотрудник сам находит время, дохаживает 15–30%", us: "Встреча в рабочее время — доходимость 95%+" },
  { them: "Обратная связь от автопроверки или куратора", us: "Индивидуальная ОС тренера по каждой работе" },
  { them: "Ваш корпоративный шаблон — вне программы", us: "Работаем в вашем корпоративном шаблоне" },
];

const faqs = [
  { q: "У нас свой корпоративный шаблон — сможете работать в нём?", a: "Да, мы всегда работаем внутри корпоративного шаблона клиента. Ничего не переутверждаем и не ломаем глобальный брендинг. Все примеры, переделанные слайды, постматериалы и библиотека слайдов — строго в вашем шаблоне." },
  { q: "Сколько человек можно взять в группу?", a: "Оптимум — до 10 человек. Так тренер успевает дать персональную обратную связь каждому. Если команда больше — делаем 2–3 потока или рассчитываем формат «программы» с несколькими группами." },
  { q: "Как быстро выходим на тренинг от первого контакта?", a: "При стандартной адаптации (×1.0–×1.3) — 2–3 недели от подписания договора. При глубоком кастоме — 4–6 недель. При разработке программы с нуля — 6–10 недель." },
  { q: "Что с NDA и доступом к нашим реальным презентациям?", a: "Подписываем NDA по вашему шаблону. На тренинге участники работают со своими материалами локально — тренер не забирает файлы и не хранит их после окончания." },
  { q: "Работаете по договору с юрлицом? Закрывающие документы?", a: "Да, ООО «Бонни энд Слайд», договор с юрлицом клиента, счёт, акт, закрывающие документы по стандарту. Образовательная лицензия Л035-01298-77/01635812." },
  { q: "Что если часть команды не сможет быть вживую?", a: "Два варианта: гибридный формат (часть офлайн, часть онлайн) или два отдельных потока. Второй вариант рекомендуем для команд от 10 человек." },
  { q: "Можно ли заказать только постматериалы или библиотеку слайдов?", a: "Постматериалы идут только в паре с тренингом — их смысл в закреплении того, что команда прошла. Библиотеку слайдов можно заказать отдельно." },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-vibe-dark3 py-5 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-oswald text-base md:text-lg uppercase text-vibe-light">{q}</span>
        <span className="text-vibe-red flex-shrink-0">
          <Icon name={open ? "Minus" : "Plus"} size={20} />
        </span>
      </div>
      {open && <p className="mt-3 text-vibe-muted font-golos leading-relaxed text-sm">{a}</p>}
    </div>
  );
}

function Calculator() {
  const [dir, setDir] = useState("combo");
  const [dur, setDur] = useState(6);
  const [mult, setMult] = useState(1.3);
  const [format, setFormat] = useState("offline");
  const [people, setPeople] = useState(10);

  const { min, rec, per } = calcPrice(dir, dur, mult, format, people);

  const dirOpts = [
    { val: "presentations", label: "Презентации" },
    { val: "combo", label: "Презы + ИИ" },
    { val: "ai", label: "Нейросети" },
    { val: "oratory", label: "Ораторское" },
  ];
  const durOpts = [
    { val: 2, label: "2 часа" },
    { val: 4, label: "4 часа" },
    { val: 6, label: "6 ч · 1 день" },
    { val: 12, label: "12 ч · 2 дня" },
  ];
  const multOpts = [
    { val: 1, label: "×1.0 Стандарт" },
    { val: 1.3, label: "×1.3 Адаптация" },
    { val: 1.6, label: "×1.6 Глубокий" },
    { val: 2, label: "×2.0 С нуля" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Direction */}
        <div>
          <div className="text-vibe-muted text-xs uppercase tracking-widest mb-3 font-oswald">Направление</div>
          <div className="flex flex-wrap gap-2">
            {dirOpts.map((o) => (
              <button key={o.val} onClick={() => setDir(o.val)}
                className={`px-4 py-2 text-sm font-oswald uppercase tracking-wide transition-colors border ${dir === o.val ? "bg-vibe-red border-vibe-red text-white" : "border-vibe-dark3 text-vibe-muted hover:border-vibe-red/40 hover:text-vibe-light"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        {/* Format */}
        <div>
          <div className="text-vibe-muted text-xs uppercase tracking-widest mb-3 font-oswald">Формат</div>
          <div className="flex gap-2">
            {[{ val: "online", label: "Онлайн" }, { val: "offline", label: "Офлайн" }].map((o) => (
              <button key={o.val} onClick={() => setFormat(o.val)}
                className={`px-4 py-2 text-sm font-oswald uppercase tracking-wide transition-colors border ${format === o.val ? "bg-vibe-red border-vibe-red text-white" : "border-vibe-dark3 text-vibe-muted hover:border-vibe-red/40"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        {/* Duration */}
        <div>
          <div className="text-vibe-muted text-xs uppercase tracking-widest mb-3 font-oswald">Длительность</div>
          <div className="flex flex-wrap gap-2">
            {durOpts.map((o) => (
              <button key={o.val} onClick={() => setDur(o.val)}
                className={`px-4 py-2 text-sm font-oswald uppercase tracking-wide transition-colors border ${dur === o.val ? "bg-vibe-red border-vibe-red text-white" : "border-vibe-dark3 text-vibe-muted hover:border-vibe-red/40"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        {/* Customization */}
        <div>
          <div className="text-vibe-muted text-xs uppercase tracking-widest mb-3 font-oswald">Уровень кастомизации</div>
          <div className="flex flex-wrap gap-2">
            {multOpts.map((o) => (
              <button key={o.val} onClick={() => setMult(o.val)}
                className={`px-4 py-2 text-sm font-oswald uppercase tracking-wide transition-colors border ${mult === o.val ? "bg-vibe-red border-vibe-red text-white" : "border-vibe-dark3 text-vibe-muted hover:border-vibe-red/40"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        {/* People */}
        <div>
          <div className="text-vibe-muted text-xs uppercase tracking-widest mb-3 font-oswald">
            Количество участников: <span className="text-vibe-red">{people}</span>
          </div>
          <input type="range" min={1} max={50} value={people} onChange={(e) => setPeople(+e.target.value)}
            className="w-full accent-vibe-red" />
          <div className="flex justify-between text-xs text-vibe-muted mt-1"><span>1</span><span>50</span></div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-vibe-dark3 border border-vibe-dark3 p-8 relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />
        <div className="text-vibe-muted text-xs uppercase tracking-widest font-oswald mb-3">Рекомендуемая цена</div>
        <div className="font-oswald text-5xl text-vibe-red mb-1">{fmt(rec)}</div>
        <div className="text-vibe-muted text-sm mb-6">Минимальная: <span className="text-vibe-light">{fmt(min)}</span></div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-vibe-dark p-4 border border-vibe-dark3">
            <div className="font-oswald text-2xl text-vibe-red">{fmt(per)}</div>
            <div className="text-vibe-muted text-xs mt-1">на участника</div>
          </div>
          <div className="bg-vibe-dark p-4 border border-vibe-dark3">
            <div className="font-oswald text-2xl text-vibe-red">{dur} ч</div>
            <div className="text-vibe-muted text-xs mt-1">длительность</div>
          </div>
        </div>
        <a href="#form" className="block w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-4 text-center hover:bg-red-700 transition-colors">
          Запросить КП с этим расчётом
        </a>
        <p className="text-vibe-muted text-xs text-center mt-3">Без обязательств и звонка с менеджером</p>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function B2B() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-vibe-dark font-golos overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-vibe-dark/90 backdrop-blur-sm border-b border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex flex-col gap-0.5">
            <Logo width={120} height={14} />
            <span className="text-vibe-muted text-xs font-golos tracking-wide">для бизнеса</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-vibe-muted">
            <a href="#directions" className="hover:text-vibe-red transition-colors">Направления</a>
            <a href="#formats" className="hover:text-vibe-red transition-colors">Форматы</a>
            <a href="/b2b/courses" className="text-vibe-red hover:text-red-400 transition-colors font-oswald uppercase tracking-wide text-xs border border-vibe-red/40 px-3 py-1">Конструктор</a>
            <a href="#calc" className="hover:text-vibe-red transition-colors">Калькулятор</a>
            <a href="#cases" className="hover:text-vibe-red transition-colors">Кейсы</a>
            <a href="#faq" className="hover:text-vibe-red transition-colors">FAQ</a>
          </nav>
          <a href="#form" className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-5 py-2.5 hover:bg-red-700 transition-colors">
            Заказать тренинг
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-vibe-dark via-vibe-dark/85 to-vibe-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-vibe-dark via-transparent to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-vibe-dark3 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 bg-vibe-red rounded-full animate-pulse" />
                <span className="text-vibe-muted text-xs font-golos">Корпоративные тренинги · с 2015 года</span>
              </div>
              <h1 className="font-oswald text-5xl md:text-7xl font-bold text-vibe-light leading-none mb-6">
                ПРЕЗЕНТАЦИИ<br />
                И ИИ — <span className="text-vibe-red">НА ДРУГОМ</span><br />
                УРОВНЕ.
              </h1>
              <p className="text-vibe-muted text-lg leading-relaxed mb-8 max-w-lg">
                Тренинги для команд Марса, Самсунга, ВК, Лукойла и ещё 200+ компаний. За 1–2 дня команда учится делать презентации, за которые не стыдно, и использовать нейросети в работе. На материалах вашей команды.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#calc" className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-7 py-4 hover:bg-red-700 transition-colors flex items-center gap-2">
                  Рассчитать стоимость
                  <Icon name="ArrowRight" size={16} />
                </a>
                <a href="#form" className="border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest px-7 py-4 hover:border-vibe-red/50 hover:text-vibe-light transition-colors">
                  Запросить программу
                </a>
              </div>
              <div className="flex flex-wrap gap-8">
                {[
                  { num: "200+", label: "компаний обучили команды с нами" },
                  { num: "10 лет", label: "опыт в презентациях и визуале" },
                  { num: "4,9/5", label: "средний NPS корпоративных клиентов" },
                ].map((s) => (
                  <div key={s.num}>
                    <div className="font-oswald text-3xl text-vibe-red">{s.num}</div>
                    <div className="text-vibe-muted text-xs mt-0.5 max-w-[120px] leading-relaxed">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="hidden lg:block relative">
              <div className="absolute -top-4 -right-4 bg-vibe-red text-white font-oswald px-4 py-3 text-sm z-10">
                Старт через<br /><span className="text-xl font-bold">2 недели</span>
              </div>
              <div className="bg-vibe-dark3 border border-vibe-dark3 p-8 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />
                <div className="font-oswald text-xs text-vibe-muted tracking-widest mb-4">ПОЛНЫЙ КУРС · 2 ДНЯ</div>
                <div className="font-oswald text-6xl text-vibe-red mb-6">12 ч</div>
                <ul className="space-y-3 mb-8">
                  {["День 1 — презентации и визуал", "День 2 — нейросети и практикум", "Группа до 10 человек", "Работа с реальными презами"].map((i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-vibe-muted">
                      <Icon name="Check" size={14} className="text-vibe-red flex-shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-vibe-dark3 pt-5">
                  <div className="text-vibe-muted text-xs">от</div>
                  <div className="font-oswald text-3xl text-vibe-light">490 000 ₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO BAR */}
      <section className="py-10 bg-vibe-dark3 border-y border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-vibe-muted text-xs uppercase tracking-widest font-oswald mb-6">
            Нам доверяют обучение своих команд
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {clients.map((c) => (
              <span key={c} className="font-oswald text-sm text-vibe-muted/60 tracking-widest hover:text-vibe-muted transition-colors">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Зачем вам это</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Три боли, с которыми<br />к нам <span className="text-vibe-red">приходят</span>
            </h2>
            <p className="text-vibe-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Если команда тратит на слайды дни вместо часов, а результат всё равно идёт на пятую правку — вы узнаете одну из историй ниже.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="b2b-appear bg-vibe-dark3 p-7 relative group hover:border-vibe-red/30 border border-vibe-dark3 transition-colors" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-vibe-red" />
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-oswald text-4xl text-vibe-red/15 leading-none">{p.num}</span>
                  <span className="border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase px-2 py-0.5">{p.tag}</span>
                </div>
                <h3 className="font-oswald text-xl text-vibe-light mb-3 whitespace-pre-line">{p.title}</h3>
                <p className="text-vibe-muted text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="directions" className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Направления обучения</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Четыре программы — <span className="text-vibe-red">под любую задачу</span>
            </h2>
            <p className="text-vibe-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Базовые направления, которые можно брать отдельно или в комбинации. Каждое адаптируется под отрасль, инструменты и уровень команды.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-vibe-dark3">
            {directions.map((d, i) => (
              <div key={i} className={`b2b-appear relative p-7 border-r border-vibe-dark3 last:border-r-0 group transition-colors ${d.featured ? "bg-vibe-red/5 border-t-2 border-t-vibe-red" : "hover:bg-vibe-dark3/40"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                {d.featured && <div className="absolute top-3 right-3 bg-vibe-red text-white text-xs font-oswald px-2 py-0.5 uppercase">Хит</div>}
                <div className="w-10 h-10 bg-vibe-red/10 flex items-center justify-center mb-5">
                  <Icon name={d.icon} fallback="Star" size={18} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-xl text-vibe-light mb-3 group-hover:text-vibe-red transition-colors">{d.title}</h3>
                <p className="text-vibe-muted text-xs leading-relaxed mb-5">{d.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-vibe-dark3">
                  {d.tools.map((t) => (
                    <span key={t} className="text-xs text-vibe-muted/70 border border-vibe-dark3 px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section id="formats" className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Форматы</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Три формата — <span className="text-vibe-red">от интенсива до программы</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formats.map((f, i) => (
              <div key={i} className={`b2b-appear relative flex flex-col p-7 border transition-colors ${f.recommended ? "border-vibe-red bg-vibe-dark3" : "border-vibe-dark3 bg-vibe-dark3 hover:border-vibe-red/30"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                {f.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-vibe-red text-white text-xs font-oswald uppercase px-3 py-1">Рекомендуем</div>}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-oswald text-2xl text-vibe-light">{f.title}</h3>
                    <div className="text-vibe-muted text-xs mt-1">{f.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-vibe-muted text-xs">от</div>
                    <div className="font-oswald text-2xl text-vibe-red">{f.price}</div>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {f.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-vibe-muted">
                      <Icon name="Check" size={14} className="text-vibe-red flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#form" className={`block text-center font-oswald uppercase tracking-widest py-3 text-sm transition-colors ${f.recommended ? "bg-vibe-red text-white hover:bg-red-700" : "border border-vibe-dark3 text-vibe-muted hover:border-vibe-red hover:text-vibe-light"}`}>
                  Выбрать формат
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Как проходит день</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Это не запись курса.<br /><span className="text-vibe-red">Это живой тренинг.</span>
            </h2>
            <p className="text-vibe-muted mt-4 max-w-xl text-sm leading-relaxed">
              В день 4 блока практики, 2 кофе-брейка и большой обед. Каждый участник к концу дня имеет переработанные слайды своей реальной презентации.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-0">
              {timeline.map((t, i) => (
                <div key={i} className={`b2b-appear flex gap-5 p-4 border-b border-vibe-dark3 ${t.isBreak ? "opacity-50" : "hover:bg-vibe-dark3/30"} transition-colors`} style={{ transitionDelay: `${i * 40}ms` }}>
                  <div className="font-oswald text-vibe-red text-sm w-12 flex-shrink-0 pt-0.5">{t.time}</div>
                  <div>
                    <div className={`font-oswald text-sm ${t.isBreak ? "text-vibe-muted" : "text-vibe-light"}`}>{t.title}</div>
                    <div className="text-vibe-muted text-xs mt-0.5">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="b2b-appear">
              <div className="bg-vibe-dark3 border border-vibe-dark3 p-7 sticky top-24">
                <h3 className="font-oswald text-2xl text-vibe-light mb-3">Один день —<br />четыре практики</h3>
                <p className="text-vibe-muted text-sm mb-6 leading-relaxed">После каждого блока — практика на реальных слайдах команды с обратной связью тренера.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: "4", label: "практики с разбором" },
                    { num: "10", label: "человек в группе" },
                    { num: "100%", label: "работа с вашим контентом" },
                    { num: "0", label: "шаблонных примеров" },
                  ].map((m) => (
                    <div key={m.num} className="bg-vibe-dark p-4 border border-vibe-dark3">
                      <div className="font-oswald text-2xl text-vibe-red">{m.num}</div>
                      <div className="text-vibe-muted text-xs mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Уровни кастомизации</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              От стандарта <span className="text-vibe-red">до разработки с нуля</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-vibe-dark3">
            {levels.map((l, i) => (
              <div key={i} className="b2b-appear p-7 border-r border-vibe-dark3 last:border-r-0 hover:bg-vibe-dark3/50 transition-colors group" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="font-oswald text-3xl text-vibe-red/40 group-hover:text-vibe-red transition-colors mb-4">{l.mult}</div>
                <h4 className="font-oswald text-lg text-vibe-light mb-2">{l.title}</h4>
                <p className="text-vibe-muted text-sm leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Калькулятор</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Посчитайте стоимость <span className="text-vibe-red">за 30 секунд</span>
            </h2>
            <p className="text-vibe-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Выберите параметры — покажем минимальную и рекомендуемую цену. Без обязательств и звонка с менеджером.
            </p>
          </div>
          <div className="b2b-appear">
            <Calculator />
          </div>
        </div>
      </section>

      {/* COMPANY */}
      <section className="py-24 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="b2b-appear">
              <div className="inline-block border border-white/30 text-white text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-5">О Bonnie&amp;Slide</div>
              <h2 className="font-oswald text-4xl md:text-5xl text-white mb-4">
                Мы не просто школа —<br />мы работающая<br />дизайн-студия
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                10 лет делаем слайды и визуал для крупнейших брендов страны и учим этому их команды. Наши тренеры — не теоретики, а практики, которые каждый день работают с реальными клиентскими задачами.
              </p>
              <p className="text-white/50 text-xs">Образовательная лицензия Л035-01298-77/01635812</p>
            </div>
            <div className="b2b-appear grid grid-cols-2 gap-4">
              {[
                { num: "10 лет", label: "на рынке" },
                { num: "80 000+", label: "выпускников курсов" },
                { num: "3 000+", label: "слайдов для брендов" },
                { num: "200+", label: "b2b-клиентов" },
              ].map((s) => (
                <div key={s.num} className="bg-white/10 p-6 border border-white/20">
                  <div className="font-oswald text-3xl text-white">{s.num}</div>
                  <div className="text-white/70 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Кейсы</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Компании, которые уже <span className="text-vibe-red">обучились с нами</span>
            </h2>
            <p className="text-vibe-muted mt-4 max-w-xl mx-auto text-sm">Реальные проекты с крупными клиентами. Детали по NDA, но цифры и обратную связь показываем.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c, i) => (
              <div key={i} className="b2b-appear bg-vibe-dark3 p-7 border border-vibe-dark3 hover:border-vibe-red/30 transition-colors" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-vibe-red/10 flex items-center justify-center font-oswald text-vibe-red text-sm flex-shrink-0">
                    {c.logo}
                  </div>
                  <div>
                    <div className="font-oswald text-vibe-light">{c.name}</div>
                    <div className="text-vibe-muted text-xs">{c.sub}</div>
                  </div>
                </div>
                <p className="text-vibe-muted text-sm leading-relaxed italic mb-5">{c.quote}</p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-vibe-red/20 flex items-center justify-center font-oswald text-vibe-red text-xs">{c.initials}</div>
                  <div>
                    <div className="font-oswald text-vibe-light text-sm">{c.author}</div>
                    <div className="text-vibe-muted text-xs">{c.authorSub}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-vibe-dark3">
                  {c.metrics.map((m) => (
                    <div key={m.num}>
                      <div className="font-oswald text-xl text-vibe-red">{m.num}</div>
                      <div className="text-vibe-muted text-xs mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Тренеры</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Практики, <span className="text-vibe-red">не теоретики</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainers.map((t, i) => (
              <div key={i} className="b2b-appear bg-vibe-dark3 p-7 border border-vibe-dark3 hover:border-vibe-red/30 transition-colors" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 bg-vibe-red/10 border border-vibe-red/20 flex items-center justify-center font-oswald text-vibe-red text-lg mb-4">{t.initials}</div>
                <h4 className="font-oswald text-xl text-vibe-light mb-1">{t.name}</h4>
                <div className="text-vibe-red text-xs font-oswald mb-3">{t.role}</div>
                <p className="text-vibe-muted text-sm leading-relaxed mb-5">{t.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.skills.map((s) => (
                    <span key={s} className="text-xs border border-vibe-dark3 text-vibe-muted px-2 py-0.5">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VS */}
      <section className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">Чем мы отличаемся</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Не онлайн-школа. <span className="text-vibe-red">Не подписка.</span> Живой тренинг.
            </h2>
          </div>
          <div className="b2b-appear grid grid-cols-1 md:grid-cols-2 gap-0 border border-vibe-dark3">
            <div className="p-8 border-r border-vibe-dark3">
              <div className="text-vibe-muted text-xs uppercase tracking-widest font-oswald mb-3">Онлайн-школа / подписка</div>
              <h3 className="font-oswald text-2xl text-vibe-muted mb-6">Библиотека курсов</h3>
              <ul className="space-y-3">
                {vsItems.map((v) => (
                  <li key={v.them} className="flex items-start gap-3 text-sm text-vibe-muted/70">
                    <Icon name="X" size={14} className="text-vibe-muted/40 flex-shrink-0 mt-0.5" />
                    {v.them}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-vibe-dark3 relative">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-vibe-red" />
              <div className="text-vibe-red text-xs uppercase tracking-widest font-oswald mb-3">Bonnie&amp;Slide Кастом</div>
              <h3 className="font-oswald text-2xl text-vibe-light mb-6">Живой тренинг</h3>
              <ul className="space-y-3">
                {vsItems.map((v) => (
                  <li key={v.us} className="flex items-start gap-3 text-sm text-vibe-light">
                    <Icon name="Check" size={14} className="text-vibe-red flex-shrink-0 mt-0.5" />
                    {v.us}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* POST MATERIALS */}
      <section className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear text-center mb-14">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">После тренинга</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Закрепляем результат. <span className="text-vibe-red">Навык остаётся.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: "ClipboardCheck",
                title: "Чек-лист проверки презентации",
                desc: "Рабочий инструмент на 1 лист A4. Сотрудник прогоняет презентацию перед отправкой руководителю — и сокращает количество итераций.",
                items: ["Блок «Структура и логика» — 4 пункта", "Блок «Визуал и читаемость» — 4 пункта", "Блок «Данные и графики» — 3 пункта", "Блок «Финальная проверка» — 3 пункта", "В стиле вашего бренда"],
              },
              {
                icon: "BookOpen",
                title: "Шпаргалка с промптами и приёмами",
                desc: "Справочник на 2–3 страницы. Открыть, вспомнить приём, скопировать промпт, сделать слайд лучше. Именно те промпты, что давались на тренинге.",
                items: ["Универсальный скелет презентации B&S", "3 пары слайдов «до / после» из вашей команды", "5–7 промптов для ChatGPT / Claude", "Список разрешённых у вас нейросетей", "10+ горячих клавиш PowerPoint"],
              },
            ].map((pm, i) => (
              <div key={i} className="b2b-appear bg-vibe-dark3 p-7 border border-vibe-dark3" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-vibe-red/10 flex items-center justify-center mb-5">
                  <Icon name={pm.icon} fallback="File" size={18} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-xl text-vibe-light mb-3">{pm.title}</h3>
                <p className="text-vibe-muted text-sm leading-relaxed mb-5">{pm.desc}</p>
                <ul className="space-y-2">
                  {pm.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-vibe-muted">
                      <Icon name="Check" size={12} className="text-vibe-red flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Addon */}
          <div className="b2b-appear bg-vibe-dark3 border border-vibe-dark3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 border-r border-vibe-dark3">
                <div className="text-vibe-red text-xs font-oswald uppercase tracking-widest mb-3">А ещё…</div>
                <h2 className="font-oswald text-3xl text-vibe-light mb-4">Библиотека готовых<br />слайдов в вашем шаблоне</h2>
                <p className="text-vibe-muted text-sm leading-relaxed mb-5">Набор готовых визуальных решений в PowerPoint, собранных в вашем корпоративном шаблоне. Сотрудник открывает нужный слайд, подставляет данные — и презентация готова.</p>
                <ul className="space-y-2">
                  {["Работает внутри утверждённого корпоративного шаблона", "Закрепляет принципы тренинга на уровне макета", "Снижает количество правок от руководителя", "Опционально: гайд по использованию и аналитика"].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-vibe-muted">
                      <Icon name="Check" size={12} className="text-vibe-red flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 space-y-4">
                {[
                  { title: "Пакет · 30 слайдов", desc: "Основные типы слайдов: титулы, буллиты, графики, таблицы, таймлайны, сравнения.", price: "135 000 ₽" },
                  { title: "Пакет · 50 слайдов", desc: "Полная библиотека + продвинутые графики, матрицы, инфографика, альтернативные компоновки.", price: "200 000 ₽" },
                  { title: "Аналитика + гайд", desc: "Разбор существующих презентаций клиента + инструкция по использованию библиотеки.", price: "от 15 000 ₽" },
                ].map((pack) => (
                  <div key={pack.title} className="flex items-center justify-between gap-4 p-4 bg-vibe-dark border border-vibe-dark3">
                    <div>
                      <div className="font-oswald text-vibe-light text-sm">{pack.title}</div>
                      <div className="text-vibe-muted text-xs mt-0.5">{pack.desc}</div>
                    </div>
                    <div className="font-oswald text-vibe-red text-sm flex-shrink-0">{pack.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="py-24 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 21px)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block border border-white/30 text-white text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-5">Начнём</div>
              <h2 className="font-oswald text-4xl md:text-5xl text-white mb-4">
                Обсудим формат под вашу команду
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-7">
                Оставьте заявку — менеджер свяжется в течение 30 минут в рабочее время и подготовит персональное предложение.
              </p>
              <ul className="space-y-3 mb-8">
                {["Короткий бриф — 15 минут по звонку", "Персональное КП за 2 рабочих дня", "Пример программы в вашем шаблоне", "Бесплатно и без обязательств"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <Icon name="Check" size={16} className="text-white/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <img src={RESULTS_BG} alt="" className="w-full h-44 object-cover opacity-70" />
            </div>

            <div className="bg-vibe-dark p-8 border border-vibe-dark3">
              <h3 className="font-oswald text-2xl text-vibe-light mb-2">Запросить предложение</h3>
              <p className="text-vibe-muted text-xs mb-6">Все поля обязательны. Это помогает нам подготовить точное предложение.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Имя" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                  <input type="tel" placeholder="Телефон" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                </div>
                <input type="email" placeholder="Корпоративная почта" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Компания" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                  <input type="text" placeholder="Должность" className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors">
                    <option value="">Команда, чел.</option>
                    <option>до 10</option><option>10–30</option><option>30–50</option><option>50–100</option><option>100+</option>
                  </select>
                  <select className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors">
                    <option value="">Направление</option>
                    <option>Презентации</option><option>Презы + ИИ</option><option>Нейросети</option><option>Ораторское</option><option>Ещё не решили</option>
                  </select>
                </div>
                <button className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-4 hover:bg-red-700 transition-colors">
                  Отправить заявку
                </button>
                <p className="text-vibe-muted text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой обработки данных.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-vibe-dark2">
        <div className="max-w-3xl mx-auto px-6">
          <div className="b2b-appear text-center mb-12">
            <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-4">FAQ</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              Отвечаем <span className="text-vibe-red">на типовые вопросы</span>
            </h2>
          </div>
          <div className="b2b-appear">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
              {["#directions", "#formats", "#calc", "#cases"].map((href, i) => (
                <a key={href} href={href} className="block text-vibe-muted text-xs mb-2 hover:text-vibe-red transition-colors">
                  {["Направления", "Форматы", "Калькулятор", "Кейсы"][i]}
                </a>
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
              <a href="#" className="hover:text-vibe-red transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-vibe-red transition-colors">Договор-оферта</a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-vibe-dark border-t border-vibe-dark3 px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-vibe-muted text-xs">Интенсив · 1 день</div>
          <div className="font-oswald text-vibe-light text-sm">от 350 000 ₽</div>
        </div>
        <a href="#form" className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-5 py-3 hover:bg-red-700 transition-colors">
          Заказать
        </a>
      </div>
    </div>
  );
}