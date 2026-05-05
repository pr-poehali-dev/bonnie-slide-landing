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
    fact: "На деле — всё упирается в формулировку задачи",
    ok: true,
  },
  {
    myth: '"У меня не получается"',
    fact: "На деле — просто никто не показал, как писать рабочие промпты",
    ok: true,
  },
  {
    myth: '"Получается ерунда"',
    fact: "На деле — потому что нет идеи и логики, а не из-за нейросети",
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
    sub: "Хочешь работать быстрее и не отставать от рынка",
    bullets: [
      "от тебя ждут «быстро и дизайно»",
      "конкуренты уже используют нейросети",
      "нужно встроить ИИ в процесс",
    ],
  },
  {
    icon: "PenLine",
    title: "Контент-мейкер",
    sub: "Нужен стабильный поток идей и стильного контента",
    bullets: [
      "не хватает идей",
      "выгораешь от постоянного творчества",
      "сложно держать регулярность",
    ],
  },
  {
    icon: "TrendingUp",
    title: "Маркетолог",
    sub: "Хочешь делегировать задачи нейросетям",
    bullets: [
      "от тебя ждут быстрых результатов",
      "конкурент уже использует AI",
      "нужно усилить себя внутри команды",
    ],
  },
  {
    icon: "Sparkles",
    title: "Новичок",
    sub: "Не понимаешь, с чего начать",
    bullets: [
      "непонятно, с чего начать",
      "нет опыта работы с нейросетями",
      "нет уверенности, что получится",
    ],
  },
];

const RESULTS = [
  { icon: "FileText", title: "Создашь свой первый контент", sub: "текст + визуал" },
  { icon: "Crosshair", title: "Освоишь логику рабочих промптов", sub: "и будешь понимать, что и зачем делаешь" },
  { icon: "Settings2", title: "Поймёшь, как адаптировать нейросети под свои задачи", sub: "под любой формат и нишу" },
  { icon: "Zap", title: "Научишься делать контент быстро", sub: "даже в условиях дедлайна" },
  { icon: "Lightbulb", title: "Узнаешь фишки нейросетей", sub: "о которых большинство не знает" },
];

const HOW = [
  { icon: "Play", title: "Короткие уроки", desc: "Только нужное и ничего лишнего. Без воды и академической теории." },
  { icon: "Zap", title: "Много практики", desc: "Будешь делать задания в нейросети сразу, в каждом уроке." },
  { icon: "Layout", title: "Простые шаблоны", desc: "Готовые решения, которые можно сразу использовать под любую задачу." },
  { icon: "TrendingUp", title: "Результат прямо в процессе", desc: "Первый результат получишь ещё во время обучения, с 1-го урока." },
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

const CONSENT_PD_URL = "https://bonnieandslide.com/wp-content/themes/bns/assets/documents/%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5_%D0%BD%D0%B0_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85_bonnieandslide.pdf";
const PRIVACY_URL = "https://bonnieandslide.com/wp-content/themes/bns/assets/documents/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_bonnieandslide.pdf";

function FormCheckboxes({
  pd, setPd, privacy, setPrivacy, ads, setAds,
}: {
  pd: boolean; setPd: (v: boolean) => void;
  privacy: boolean; setPrivacy: (v: boolean) => void;
  ads: boolean; setAds: (v: boolean) => void;
}) {
  return (
    <div className="space-y-3 mt-4">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input type="checkbox" checked={pd} onChange={e => setPd(e.target.checked)} required
          className="mt-0.5 w-4 h-4 flex-shrink-0 accent-vibe-red" />
        <span className="text-vibe-muted text-xs leading-relaxed">
          Я согласен(а) на{" "}
          <a href={CONSENT_PD_URL} target="_blank" rel="noopener noreferrer" className="text-vibe-red underline hover:no-underline">
            обработку персональных данных
          </a>{" "}*
        </span>
      </label>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)} required
          className="mt-0.5 w-4 h-4 flex-shrink-0 accent-vibe-red" />
        <span className="text-vibe-muted text-xs leading-relaxed">
          Я принимаю{" "}
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-vibe-red underline hover:no-underline">
            политику конфиденциальности
          </a>{" "}*
        </span>
      </label>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input type="checkbox" checked={ads} onChange={e => setAds(e.target.checked)}
          className="mt-0.5 w-4 h-4 flex-shrink-0 accent-vibe-red" />
        <span className="text-vibe-muted text-xs leading-relaxed">
          Согласен(а) получать рекламно-информационные материалы
        </span>
      </label>
    </div>
  );
}

export default function AICreator() {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [formPd, setFormPd] = useState(false);
  const [formPrivacy, setFormPrivacy] = useState(false);
  const [formAds, setFormAds] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupForm, setPopupForm] = useState({ name: "", email: "", phone: "" });
  const [popupPd, setPopupPd] = useState(false);
  const [popupPrivacy, setPopupPrivacy] = useState(false);
  const [popupAds, setPopupAds] = useState(false);
  const buyRef = useRef<HTMLElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Заявка принята! Мы свяжемся с вами.");
  }

  function handlePopupSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Заявка принята! Мы свяжемся с вами.");
    setPopupOpen(false);
  }

  return (
    <div className="min-h-screen bg-vibe-dark font-golos overflow-x-hidden">

      {/* ── POPUP ── */}
      {popupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setPopupOpen(false); }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md bg-vibe-dark2 border border-vibe-dark3 p-8">
            <button onClick={() => setPopupOpen(false)}
              className="absolute top-4 right-4 text-vibe-muted hover:text-vibe-light transition-colors">
              <Icon name="X" size={20} />
            </button>
            <div className="mb-6">
              <div className="text-vibe-muted text-xs font-oswald uppercase tracking-widest mb-2">Старт</div>
              <h3 className="font-oswald text-3xl text-vibe-light leading-tight">НАЧНИ ПРЯМО СЕЙЧАС</h3>
              <p className="text-vibe-muted text-sm mt-2">Доступ открывается сразу после оплаты</p>
            </div>
            <form onSubmit={handlePopupSubmit} className="space-y-3">
              <div>
                <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Имя</label>
                <input type="text" placeholder="Как тебя зовут?" required
                  value={popupForm.name} onChange={e => setPopupForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
              </div>
              <div>
                <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Email</label>
                <input type="email" placeholder="твой@email.ru" required
                  value={popupForm.email} onChange={e => setPopupForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
              </div>
              <div>
                <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Телефон</label>
                <input type="tel" placeholder="+7 ..."
                  value={popupForm.phone} onChange={e => setPopupForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors" />
              </div>
              <FormCheckboxes pd={popupPd} setPd={setPopupPd} privacy={popupPrivacy} setPrivacy={setPopupPrivacy} ads={popupAds} setAds={setPopupAds} />
              <button type="submit"
                className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-4 text-base hover:bg-red-700 transition-all rounded-full mt-2">
                Начать за 490 ₽ <span className="line-through opacity-60">990 ₽</span> →
              </button>
            </form>
          </div>
        </div>
      )}

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
            <a href="#student-works" className="hover:text-vibe-light transition-colors">Работы учеников</a>
            <a href="#buy" className="hover:text-vibe-light transition-colors">Купить</a>
          </div>
          <button onClick={() => setPopupOpen(true)}
            className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-red-700 transition-colors rounded-full flex-shrink-0">
            Начать за 490 ₽
          </button>
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
              КАК СТАВИТЬ ЗАДАЧИ<br />
              <span className="text-vibe-red">НЕЙРОСЕТЯМ</span><br />
              И ПОЛУЧАТЬ ВАУ-РЕЗУЛЬТАТ
            </h1>
            <p className="text-vibe-muted text-base mb-8 leading-relaxed max-w-md">
              4 урока о том, как писать промпты и собирать контент, который выглядит профессионально
            </p>
            <button onClick={() => setPopupOpen(true)}
              className="inline-flex items-center gap-2 bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 text-lg hover:bg-red-700 transition-all animate-pulse-red rounded-full mb-4">
              Начать за 490 ₽ <span className="line-through opacity-60 text-base">990 ₽</span> →
            </button>
            <div className="flex items-center gap-2 text-vibe-muted text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Доступ открывается <strong className="text-vibe-light ml-1">сразу после оплаты</strong>
            </div>
          </div>

          {/* Right — benefits */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "Zap",    title: "Результат сразу",  desc: "Сделаешь первый контент уже в первом уроке", gradient: "from-vibe-red/20 via-vibe-dark3 to-vibe-dark3" },
              { icon: "User",   title: "Без опыта",        desc: "Подойдёт, даже если ты никогда не работал с нейросетями", gradient: "from-purple-900/30 via-vibe-dark3 to-vibe-dark3" },
              { icon: "Target", title: "Практика",         desc: "Не смотришь — а делаешь", gradient: "from-blue-900/30 via-vibe-dark3 to-vibe-dark3" },
              { icon: "Clock",  title: "Быстро",           desc: "60–90 минут на весь формат", gradient: "from-amber-900/30 via-vibe-dark3 to-vibe-dark3" },
            ].map((b) => (
              <div key={b.title}
                className={`relative flex flex-col justify-between p-6 border border-vibe-dark3 hover:border-vibe-red/40 transition-colors overflow-hidden min-h-[clamp(180px,30vh,260px)] bg-gradient-to-br ${b.gradient}`}>
                <div className="w-10 h-10 bg-vibe-red/10 border border-vibe-red/20 flex items-center justify-center mb-4">
                  <Icon name={b.icon} fallback="Star" size={18} className="text-vibe-red" />
                </div>
                <div>
                  <div className="font-oswald text-vibe-light text-xl md:text-2xl mb-2 leading-tight">{b.title}</div>
                  <div className="text-vibe-muted text-sm leading-relaxed">{b.desc}</div>
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
            Хочешь, чтобы нейросеть стала твоим помощником,<br />
            который работает 24/7
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
                Здесь ты попробуешь формат и поймёшь, как управлять нейросетями,<br />чтобы получать качественный результат.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: "CheckCircle", text: "Попробуешь формат на практике", sub: "Сделаешь реальный контент — текст и визуал — прямо во время обучения." },
                { icon: "CheckCircle", text: "Поймёшь, как управлять нейросетями", sub: "Освоишь логику промптов и перестанешь тыкать наугад." },
                { icon: "CheckCircle", text: "Получишь базу для роста", sub: "Этот курс — первый шаг к системной, уверенной работе с ИИ." },
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

      {/* ── STUDENT WORKS ── */}
      <section id="student-works" className="py-20 bg-vibe-dark section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-3">
            <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Примеры</span>
          </div>
          <h2 className="font-oswald text-5xl md:text-7xl text-vibe-light mb-10">
            РАБОТЫ НАШИХ<br />УЧЕНИКОВ
          </h2>
          <div className="relative">
            <div
              id="student-gallery"
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {[
                { url: "https://cdn.poehali.dev/files/cb8c884a-8d9c-44ee-8cbc-95a0c61b971c.png", alt: "Работа ученика 1" },
                { url: "https://cdn.poehali.dev/files/dd097e16-dd79-41b6-b901-e8e23b13c62a.png", alt: "Работа ученика 2" },
                { url: "https://cdn.poehali.dev/files/ec767809-1c2d-4557-b5ba-ebbcac2bddba.png", alt: "Работа ученика 3" },
                { url: "https://cdn.poehali.dev/files/4f1582f5-fbf2-4cf4-afb8-2e85e902a098.png", alt: "Работа ученика 4" },
                { url: "https://cdn.poehali.dev/files/9efecd25-8e7f-4855-9052-fff1d3708584.png", alt: "Работа ученика 5" },
                { url: "https://cdn.poehali.dev/files/cb8c884a-8d9c-44ee-8cbc-95a0c61b971c.png", alt: "Работа ученика 6" },
              ].map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[calc(33.333%-11px)] aspect-square overflow-hidden border border-vibe-dark3 hover:border-vibe-red/40 transition-colors group"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            {/* scroll buttons */}
            <button
              onClick={() => { const el = document.getElementById("student-gallery"); if (el) el.scrollBy({ left: -400, behavior: "smooth" }); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-vibe-dark3 border border-vibe-dark3 hover:border-vibe-red/40 flex items-center justify-center text-vibe-light hover:text-vibe-red transition-colors hidden md:flex"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={() => { const el = document.getElementById("student-gallery"); if (el) el.scrollBy({ left: 400, behavior: "smooth" }); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-vibe-dark3 border border-vibe-dark3 hover:border-vibe-red/40 flex items-center justify-center text-vibe-light hover:text-vibe-red transition-colors hidden md:flex"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
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
            <FormCheckboxes pd={formPd} setPd={setFormPd} privacy={formPrivacy} setPrivacy={setFormPrivacy} ads={formAds} setAds={setFormAds} />
            <button type="submit"
              className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-5 text-lg hover:bg-red-700 transition-all animate-pulse-red rounded-full mt-2">
              Начать за 490 ₽ <span className="line-through opacity-60 text-base">990 ₽</span> →
            </button>
          </form>
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
          <button onClick={() => setPopupOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-vibe-red font-oswald uppercase tracking-widest px-10 py-4 text-lg hover:bg-gray-100 transition-colors rounded-full">
            Начать за 490 ₽ →
          </button>
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