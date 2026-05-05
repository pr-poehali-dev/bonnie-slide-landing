import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

// ── scroll reveal ──────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".section-appear");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── FAQ accordion ──────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-vibe-dark3 bg-vibe-dark3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="font-oswald text-vibe-light text-sm">{q}</span>
        <Icon name={open ? "Minus" : "Plus"} size={16} className="text-vibe-red flex-shrink-0" />
      </button>
      {open && (
        <div className="px-6 pb-5 text-vibe-muted text-sm leading-relaxed border-t border-vibe-dark3 pt-4 animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}

// ── DATA ───────────────────────────────────────────────────────────────────────

const MYTHS = [
  {
    myth: '"Нейросети — это сложно"',
    fact: "На деле — всё сводится в формулировку задания",
    ok: true,
  },
  {
    myth: '"У меня не получится"',
    fact: "На деле — просто никто не показал, как делать результат управляемым",
    ok: true,
  },
  {
    myth: '"Получается ерунда"',
    fact: "На деле — потому что нет идеи и логики, а не из-за нейросетей",
    ok: true,
  },
  {
    myth: '"Нужно много времени"',
    fact: "На деле — первый результат можно сделать за 10–15 минут",
    ok: true,
  },
];

const FOR_WHO = [
  {
    icon: "Palette",
    title: "Дизайнер",
    sub: "Хочешь работать быстрее и не падать клиентам",
    bullets: [
      "от тебя ждут «быстро и дизайно»",
      "конкуренты уже используют нейросети",
      "надо как встроить ИИ в процесс",
    ],
  },
  {
    icon: "PenLine",
    title: "Контент-мейкер / SMM / блогер",
    sub: "Нужен нескончаемый поток контента",
    bullets: [
      "не хватает идей",
      "выгораешь от постоянного творчества",
      "сложно держать регулярность",
    ],
  },
  {
    icon: "TrendingUp",
    title: "Маркетолог",
    sub: "Много задач, мало времени",
    bullets: [
      "от тебя быстрые результаты",
      "конкурент уже использует AI",
      "нужно улучшить себя внутри команды",
    ],
  },
  {
    icon: "Sparkles",
    title: "Начинающий",
    sub: "Не знаешь, с чего начать",
    bullets: [
      "непонятно, с чего начать",
      "нет портфолио",
      "нет уверенности, что получится",
    ],
  },
];

const RESULTS = [
  { icon: "FileText", title: "Создашь свой первый контент", sub: "текст + визуал" },
  { icon: "Crosshair", title: "Поймёшь, от чего зависит результат", sub: "и как им управлять" },
  { icon: "BarChart2", title: "Научишься его улучшать", sub: "делать контент сильнее в точке" },
  { icon: "Shuffle", title: "Перестанешь «тыкать наугад»", sub: "будешь понимать, что и зачем делаешь" },
  { icon: "ArrowRight", title: "Увидишь, как работать с нейросетями дальше", sub: "получишь базу для роста и развития" },
];

const HOW = [
  { icon: "Play", title: "Короткие уроки", desc: "Только нужное и ничего лишнего. Без воды и академической теории." },
  { icon: "Zap", title: "Сразу практика", desc: "Будешь делать задание в нейросети сразу, в каждом уроке." },
  { icon: "Layout", title: "Простые шаблоны", desc: "Готовые решения, которые можно сразу использовать под любую задачу." },
  { icon: "TrendingUp", title: "Результат в процессе", desc: "Первый результат получишь ещё во время обучения, с 1-го урока." },
];

const FAQS = [
  {
    q: "Нужен ли опыт работы с нейросетями?",
    a: "Нет. Курс создан для тех, кто начинает с нуля. Мы объясняем всё с базы — без предположений об уровне знаний.",
  },
  {
    q: "Какие нейросети используются?",
    a: "ChatGPT, Midjourney и доступные русскоязычные альтернативы. Покажем, что делать, если нет доступа к некоторым сервисам.",
  },
  {
    q: "Как долго длится курс?",
    a: "4 урока по 60–90 минут. Можно пройти за один день или в удобном темпе — доступ навсегда.",
  },
  {
    q: "Когда открывается доступ?",
    a: "Сразу после оплаты. Никаких ожиданий — переходишь к первому уроку в ту же минуту.",
  },
  {
    q: "Есть ли обратная связь?",
    a: "Да — в рамках курса есть возможность задать вопросы и получить разбор своих работ в закрытом чате.",
  },
  {
    q: "Можно ли вернуть деньги?",
    a: "Да. Если в течение 14 дней почувствуешь, что курс тебе не подходит — вернём деньги без лишних вопросов.",
  },
];

// ── COMPONENT ──────────────────────────────────────────────────────────────────

export default function AICreator() {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const buyRef = useRef<HTMLElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Заявка принята! Мы свяжемся с вами.");
  }

  return (
    <div className="min-h-screen bg-vibe-dark font-golos overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-vibe-dark/95 backdrop-blur-sm border-b border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex flex-col gap-0.5 flex-shrink-0">
            <Logo width={110} height={13} />
            <span className="text-vibe-muted text-[10px] tracking-wide">AI-Creator</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-xs text-vibe-muted">
            <a href="#myths" className="hover:text-vibe-light transition-colors">О курсе</a>
            <a href="#for-who" className="hover:text-vibe-light transition-colors">Для кого</a>
            <a href="#results" className="hover:text-vibe-light transition-colors">Результат</a>
            <a href="#buy" className="hover:text-vibe-light transition-colors">Купить</a>
          </div>
          <a href="#buy"
            className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-red-700 transition-colors rounded-full flex-shrink-0">
            Начать за 490 ₽
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* bg grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)" }} />
        {/* glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-vibe-red/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-vibe-dark to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-28 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="font-oswald text-5xl md:text-7xl leading-[0.9] text-vibe-light mb-6">
              СДЕЛАЙ СВОЙ<br />ПЕРВЫЙ<br />
              <span className="text-vibe-red">ОСМЫСЛЕННЫЙ<br />КОНТЕНТ</span><br />
              С ПОМОЩЬЮ<br />НЕЙРОСЕТЕЙ
            </h1>
            <p className="text-vibe-muted text-base mb-8 leading-relaxed max-w-md">
              4 коротких урока, где ты сразу создаёшь результат и понимаешь, как им управлять
            </p>
            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-oswald text-5xl text-vibe-light">490 ₽</span>
              <span className="font-oswald text-2xl text-vibe-muted line-through">990 ₽</span>
              <span className="text-vibe-muted text-xs">разовый доступ навсегда</span>
            </div>
            <a href="#buy"
              className="inline-flex items-center gap-2 bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 text-lg hover:bg-red-700 transition-all animate-pulse-red rounded-full mb-4">
              Начать →
            </a>
            <div className="flex items-center gap-2 text-vibe-muted text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Доступ открывается <strong className="text-vibe-light ml-1">сразу после оплаты</strong>
            </div>
          </div>

          {/* Right — benefits */}
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: "Zap",    title: "Результат сразу",  desc: "Сделаешь первый контент уже в первом уроке" },
              { icon: "User",   title: "Без опыта",        desc: "Подойдёт, даже если ты никогда не работал с нейросетями" },
              { icon: "Target", title: "Практика",         desc: "Не смотришь — а делаешь" },
              { icon: "Clock",  title: "Быстро",           desc: "60–90 минут на весь формат" },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-4 bg-vibe-dark3/60 border border-vibe-dark3 p-4 hover:border-vibe-red/30 transition-colors">
                <div className="w-8 h-8 bg-vibe-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={b.icon} fallback="Star" size={15} className="text-vibe-red" />
                </div>
                <div>
                  <div className="font-oswald text-vibe-light text-sm mb-0.5">{b.title}</div>
                  <div className="text-vibe-muted text-xs leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MYTHS ── */}
      <section id="myths" className="py-20 bg-vibe-dark2 section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-3">
            <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Скорее всего,</span>
          </div>
          <h2 className="font-oswald text-5xl md:text-7xl text-vibe-light mb-12">
            ТЫ ДУМАЕШЬ ТАК:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MYTHS.map((m, i) => (
              <div key={i} className="bg-vibe-dark3 border border-vibe-dark3 p-6 hover:border-vibe-red/20 transition-colors"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-red-900/40 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="X" size={12} className="text-red-400" />
                  </div>
                  <p className="font-oswald text-vibe-light text-xl leading-tight">{m.myth}</p>
                </div>
                <div className="border-t border-vibe-dark3 pt-4 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-900/40 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={12} className="text-green-400" />
                  </div>
                  <div>
                    <span className="font-oswald text-green-400 text-xs uppercase tracking-wide block mb-1">На деле</span>
                    <p className="text-vibe-muted text-sm leading-relaxed">{m.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHO ── */}
      <section id="for-who" className="py-20 bg-vibe-dark section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-3">
            <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Для кого</span>
          </div>
          <h2 className="font-oswald text-5xl md:text-7xl text-vibe-light mb-3">
            ЭТО ПОДОЙДЁТ<br />ТЕБЕ, ЕСЛИ ТЫ:
          </h2>
          <p className="text-vibe-muted text-sm mb-2">
            Работаешь с контентом или хочешь начать,<br />
            но чувствуешь, что нейросети уже меняют рынок
          </p>
          <div className="flex items-center gap-2 mb-10 text-vibe-red text-sm font-oswald">
            <span>→</span>
            <span>и важно не отстать</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOR_WHO.map((f, i) => (
              <div key={i} className="bg-vibe-dark3 border border-vibe-dark3 p-5 hover:border-vibe-red/30 transition-colors group"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-9 h-9 bg-vibe-red/10 flex items-center justify-center mb-3">
                  <Icon name={f.icon} fallback="User" size={16} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-vibe-light text-base mb-1 group-hover:text-vibe-red transition-colors">{f.title}</h3>
                <p className="text-vibe-red text-xs mb-3">{f.sub}</p>
                <ul className="space-y-1.5">
                  {f.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-vibe-muted">
                      <span className="text-vibe-red mt-0.5 flex-shrink-0">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="results" className="py-20 bg-vibe-dark2 section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-3">
            <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Что получишь</span>
          </div>
          <h2 className="font-oswald text-5xl md:text-7xl text-vibe-light mb-12">
            ПОСЛЕ 4 УРОКОВ<br />ТЫ:
          </h2>
          <div className="space-y-3 max-w-2xl">
            {RESULTS.map((r, i) => (
              <div key={i} className="flex items-center gap-5 bg-vibe-dark3 border border-vibe-dark3 px-6 py-5 hover:border-vibe-red/30 transition-colors group"
                style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="w-10 h-10 bg-vibe-dark border border-vibe-dark3 flex items-center justify-center flex-shrink-0 group-hover:border-vibe-red/30 transition-colors">
                  <Icon name={r.icon} fallback="Check" size={16} className="text-vibe-red" />
                </div>
                <div>
                  <div className="font-oswald text-vibe-light text-base">{r.title}</div>
                  <div className="text-vibe-muted text-xs mt-0.5">{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ── */}
      <section className="py-20 bg-vibe-dark section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-3">
                <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Процесс обучения</span>
              </div>
              <h2 className="font-oswald text-5xl md:text-6xl text-vibe-light leading-none">
                КАК ЭТО<br />ПРОХОДИТ
              </h2>
              <p className="text-vibe-muted text-sm mt-4">Быстро, просто и сразу с результатом</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOW.map((h, i) => (
                <div key={i} className="bg-vibe-dark3 border border-vibe-dark3 p-5 hover:border-vibe-red/30 transition-colors group"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-9 h-9 bg-vibe-red/10 flex items-center justify-center mb-3">
                    <Icon name={h.icon} fallback="Star" size={16} className="text-vibe-red" />
                  </div>
                  <h3 className="font-oswald text-vibe-light text-sm mb-2 group-hover:text-vibe-red transition-colors">{h.title}</h3>
                  <p className="text-vibe-muted text-xs leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FIRST STEP ── */}
      <section className="py-20 bg-vibe-dark2 section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-3">
                <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Важно знать</span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light leading-tight mb-4">
                ЭТО ПЕРВЫЙ ШАГ<br />К СИСТЕМНОЙ РАБОТЕ<br />
                <span className="text-vibe-red">С НЕЙРОСЕТЯМИ</span>
              </h2>
              <p className="text-vibe-muted text-sm leading-relaxed">
                Здесь ты подбираешься к практике<br />и поймёшь, как управлять результатами.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: "CheckCircle", text: "Сделаешь свой первый результат", sub: "Контент в нейросети — это не магия и не удача. Здесь — это факт." },
                { icon: "CheckCircle", text: "Поймёшь, как это работает", sub: "Поймёшь, в чём разница между «получилось» и «умею делать результат»" },
                { icon: "CheckCircle", text: "Увидишь, что делать дальше", sub: "Поймёшь контекст и основы, которые дают понимание и готовность к системной работе" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-vibe-dark3 border border-vibe-dark3 hover:border-vibe-red/30 transition-colors">
                  <Icon name={item.icon} fallback="Check" size={18} className="text-vibe-red flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-oswald text-vibe-light text-sm mb-1">{item.text}</div>
                    <div className="text-vibe-muted text-xs leading-relaxed">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BUY ── */}
      <section id="buy" ref={buyRef as React.RefObject<HTMLElement>} className="py-24 bg-vibe-dark section-appear">
        <div className="max-w-xl mx-auto px-5 text-center">
          {/* Label */}
          <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-6">
            Старт
          </div>
          <h2 className="font-oswald text-5xl md:text-7xl text-vibe-light leading-none mb-4">
            НАЧНИ ПРЯМО<br />СЕЙЧАС
          </h2>
          <p className="text-vibe-muted text-sm mb-10">Доступ открывается сразу после оплаты</p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-10 text-left">
            {[
              "4 коротких урока",
              "Простые инструменты",
              "Практика с первого урока",
              "Результат в процессе",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-vibe-muted text-xs">
                <Icon name="Check" size={13} className="text-vibe-red flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 mb-6 text-left">
            <div>
              <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Имя</label>
              <input
                type="text" placeholder="Как тебя зовут?"
                value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
              />
            </div>
            <div>
              <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Email</label>
              <input
                type="email" placeholder="твой@email.ru"
                value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
              />
            </div>
            <div>
              <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Телефон</label>
              <input
                type="tel" placeholder="+7 ..."
                value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
              />
            </div>
            <button type="submit"
              className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-5 text-lg hover:bg-red-700 transition-all animate-pulse-red rounded-full">
              Начать за 490 ₽ →
            </button>
          </form>

          <p className="text-vibe-muted/60 text-xs leading-relaxed">
            Нажимая кнопку, ты соглашаешься с условиями публичной оферты и политикой конфиденциальности.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-vibe-dark2 section-appear">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light mb-10">ВОПРОСЫ</h2>
          <div className="space-y-1">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div className="mt-10 text-center">
            <p className="text-vibe-muted text-sm mb-4">Остались вопросы?</p>
            <a href="mailto:hello@bonnieslide.ru"
              className="inline-flex items-center gap-2 border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest text-sm px-6 py-3 hover:border-vibe-red/40 hover:text-vibe-light transition-colors rounded-full">
              <Icon name="Mail" size={14} />
              Написать нам
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(0,0,0,.3) 20px,rgba(0,0,0,.3) 21px)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">
          <h2 className="font-oswald text-4xl md:text-6xl text-white mb-4">ПОПРОБУЙ СЕЙЧАС</h2>
          <p className="text-white/80 mb-8">4 урока, первый результат, доступ навсегда — за 490 ₽</p>
          <a href="#buy"
            className="inline-flex items-center gap-2 bg-white text-vibe-red font-oswald uppercase tracking-widest px-10 py-4 text-lg hover:bg-gray-100 transition-colors rounded-full">
            Начать →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-vibe-dark3 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4 text-vibe-muted text-xs">
          <div className="flex flex-col gap-1 items-start">
            <Logo width={90} height={11} />
            <span>© 2026 ООО «Бонни энд Слайд». AI-Creator</span>
          </div>
          <div className="flex gap-5">
            <a href="/" className="hover:text-vibe-red transition-colors">Главная</a>
            <a href="/b2b" className="hover:text-vibe-red transition-colors">B2B</a>
            <a href="/order-presentation" className="hover:text-vibe-red transition-colors">Заказать презентацию</a>
            <a href="#" className="hover:text-vibe-red transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
