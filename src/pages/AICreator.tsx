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

// ── Marquee ────────────────────────────────────────────────────────────────────
const AI_TOOLS = [
  "ChatGPT", "Midjourney", "Claude", "Stable Diffusion", "Sora",
  "Gemini", "DALL·E", "Runway", "Kling", "Grok", "Ideogram", "Perplexity",
];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...AI_TOOLS, ...AI_TOOLS];
  return (
    <div className="py-4 bg-vibe-dark overflow-hidden border-y border-vibe-dark3">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? "Rev" : ""} 28s linear infinite`,
          width: "max-content",
        }}
      >
        {[...items, ...items].map((name, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <span className="font-oswald text-sm uppercase tracking-widest text-vibe-muted/50 hover:text-vibe-red transition-colors cursor-default">
              {name}
            </span>
            <span className="text-vibe-red/30 text-xs">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

// ── FAQ accordion ──────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-vibe-dark3 ${open ? "bg-vibe-dark3/40" : ""} transition-colors`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between px-0 py-6 text-left gap-6 group"
      >
        <div className="flex items-start gap-4">
          <span className="font-oswald text-vibe-red/40 text-sm mt-0.5 w-6 flex-shrink-0 group-hover:text-vibe-red transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-oswald text-vibe-light text-lg group-hover:text-vibe-red transition-colors leading-tight">{q}</span>
        </div>
        <div className={`w-8 h-8 border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${open ? "border-vibe-red bg-vibe-red/10" : "border-vibe-dark3 group-hover:border-vibe-red/40"}`}>
          <Icon name={open ? "Minus" : "Plus"} size={14} className={open ? "text-vibe-red" : "text-vibe-muted"} />
        </div>
      </button>
      {open && (
        <div className="pl-10 pb-6 text-vibe-muted text-sm leading-relaxed animate-fade-in">
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
    fact: "всё упирается в формулировку задачи",
    ok: true,
  },
  {
    myth: '"У меня не получается"',
    fact: "просто никто не показал, как писать рабочие промпты",
    ok: true,
  },
  {
    myth: '"Получается ерунда"',
    fact: "потому что нет идеи и логики, а не из-за нейросети",
    ok: true,
  },
  {
    myth: '"Нужно много времени"',
    fact: "первый результат можно сделать за 10–15 минут",
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

function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [pd, setPd] = useState(false);
  const [ads, setAds] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Спасибо! Вы подписались на новости.");
    setEmail("");
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input type="email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)}
          className="flex-1 bg-vibe-dark3 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-vibe-red transition-colors min-w-0" />
        <button type="submit"
          className="bg-vibe-red text-white font-oswald uppercase tracking-wide px-4 py-2 text-xs rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0">
          Подписаться
        </button>
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" required checked={pd} onChange={e => setPd(e.target.checked)} className="mt-0.5 accent-vibe-red flex-shrink-0" />
        <span className="text-vibe-muted/60 text-[10px] leading-relaxed">
          Даю <a href={CONSENT_PD_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-vibe-muted">согласие на обработку</a> своих персональных данных в соответствии с <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-vibe-muted">политикой конфиденциальности</a>
        </span>
      </label>
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" checked={ads} onChange={e => setAds(e.target.checked)} className="mt-0.5 accent-vibe-red flex-shrink-0" />
        <span className="text-vibe-muted/60 text-[10px] leading-relaxed">Соглашаюсь на получение рекламно-информационных материалов</span>
      </label>
    </form>
  );
}

const RESULTS = [
  { icon: "FileText", title: "Создашь свой первый контент", sub: "Текст и визуал — прямо во время первого урока, не потом." },
  { icon: "Crosshair", title: "Освоишь логику рабочих промптов", sub: "Поймёшь, что и зачем писать — и перестанешь тыкать наугад." },
  { icon: "Settings2", title: "Адаптируешь нейросети под себя", sub: "Под любой формат, нишу и задачу — без шаблонных результатов." },
  { icon: "Zap", title: "Научишься делать контент быстро", sub: "Даже в условиях дедлайна — без потери качества." },
  { icon: "Lightbulb", title: "Узнаешь фишки нейросетей", sub: "То, о чём большинство пользователей даже не догадывается." },
  { icon: "TrendingUp", title: "Получишь базу для роста", sub: "Этот курс — старт. Дальше — система, скорость, результат." },
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
          <div className="relative z-10 w-full max-w-md bg-vibe-dark2 border border-vibe-dark3 p-8 rounded-2xl">
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
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors rounded-lg" />
              </div>
              <div>
                <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Email</label>
                <input type="email" placeholder="твой@email.ru" required
                  value={popupForm.email} onChange={e => setPopupForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors rounded-lg" />
              </div>
              <div>
                <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Телефон</label>
                <input type="tel" placeholder="+7 ..."
                  value={popupForm.phone} onChange={e => setPopupForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors rounded-lg" />
              </div>
              <FormCheckboxes pd={popupPd} setPd={setPopupPd} privacy={popupPrivacy} setPrivacy={setPopupPrivacy} ads={popupAds} setAds={setPopupAds} />
              <button type="submit"
                className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-4 text-base hover:opacity-85 transition-all rounded-full mt-2">
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
            className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-xs px-5 py-2.5 hover:opacity-85 transition-colors rounded-full flex-shrink-0">
            Начать за 490 ₽
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* purple glow top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(120,40,180,0.35) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-vibe-dark to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-28 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-vibe-light mb-6">
              НАУЧИМ ПРАВИЛЬНО СТАВИТЬ ЗАДАЧИ <span className="text-vibe-red">НЕЙРОСЕТЯМ</span> И ПОЛУЧАТЬ ВАУ-РЕЗУЛЬТАТ
            </h1>
            <p className="text-vibe-muted text-base mb-8 leading-relaxed max-w-md">
              4 урока о том, как писать промпты и собирать контент, который выглядит профессионально
            </p>
            <button onClick={() => setPopupOpen(true)}
              className="inline-flex items-center gap-3 bg-vibe-red text-white font-oswald uppercase tracking-wide px-8 py-4 text-base hover:opacity-90 transition-all animate-pulse-red rounded-full mb-4">
              Начать за 490 ₽ <span className="line-through opacity-60 font-normal normal-case tracking-normal">990 ₽</span> →
            </button>
            <div className="flex items-center gap-2 text-vibe-muted text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Доступ открывается <strong className="text-vibe-light ml-1">сразу после оплаты</strong>
            </div>
          </div>

          {/* Right — benefits */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "Zap",     title: "Результат сразу", desc: "Сделаешь первый контент уже в первом уроке",              gradient: "from-vibe-red/20 to-vibe-dark3" },
              { icon: "User",    title: "Без опыта",       desc: "Подойдёт, даже если ты никогда не работал с нейросетями", gradient: "from-purple-800/25 to-vibe-dark3" },
              { icon: "PenLine", title: "Практика",        desc: "Не смотришь — а делаешь",                                 gradient: "from-blue-800/25 to-vibe-dark3" },
              { icon: "Clock",   title: "Быстро",          desc: "60–90 минут на весь формат",                              gradient: "from-amber-800/25 to-vibe-dark3" },
            ].map((b) => (
              <div key={b.title}
                className={`flex flex-col justify-between bg-gradient-to-br ${b.gradient} border border-vibe-dark3/60 rounded-2xl p-6 min-h-[180px] hover:border-vibe-red/30 transition-colors`}>
                <div className="w-12 h-12 bg-vibe-red/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={b.icon} fallback="Star" size={20} className="text-vibe-red" />
                </div>
                <div>
                  <div className="font-oswald text-vibe-light text-xl leading-tight mb-1">{b.title}</div>
                  <div className="text-vibe-muted text-sm leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── MYTHS ── */}
      <section id="myths" className="py-20 bg-vibe-dark2 section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-oswald text-5xl md:text-7xl text-vibe-light mb-12">
            ЕСЛИ ТЫ ДУМАЕШЬ:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MYTHS.map((m, i) => (
              <div key={i} className="bg-vibe-dark3 border border-vibe-dark3 p-6 hover:border-vibe-red/20 transition-colors rounded-xl"
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
              <div key={i} className="bg-vibe-dark3 border border-vibe-dark3 p-5 hover:border-vibe-red/30 transition-colors group rounded-xl"
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

          {/* CTA block */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-vibe-red/20 to-vibe-dark3 border border-vibe-red/30 p-8 rounded-2xl">
            <div>
              <p className="font-oswald text-vibe-light text-2xl md:text-3xl leading-tight mb-1">
                Нейросети уже меняют рынок — начни использовать их первым.
              </p>
              <p className="text-vibe-muted text-sm">4 урока · доступ навсегда · результат с первого урока</p>
            </div>
            <button onClick={() => setPopupOpen(true)}
              className="flex-shrink-0 bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 text-base hover:opacity-85 transition-colors rounded-full whitespace-nowrap">
              Начать за 490 ₽ <span className="line-through opacity-60">990 ₽</span> →
            </button>
          </div>
        </div>
      </section>

      <Marquee reverse />

      {/* ── RESULTS ── */}
      <section id="results" className="py-20 bg-vibe-dark2 section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="mb-3">
                <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Что получишь</span>
              </div>
              <h2 className="font-oswald text-5xl md:text-7xl text-vibe-light leading-none">
                ПОСЛЕ 4 УРОКОВ<br />ТЫ:
              </h2>
            </div>
            <p className="text-vibe-muted text-sm max-w-xs md:text-right">
              Каждый урок даёт конкретный навык — не теорию, а умение, которое можно применить сразу
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESULTS.map((r, i) => (
              <div key={i}
                className="relative bg-vibe-dark3 border border-vibe-dark3 p-7 hover:border-vibe-red/40 transition-colors group overflow-hidden rounded-xl"
                style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="absolute top-4 right-5 font-oswald text-6xl text-vibe-light/5 group-hover:text-vibe-red/10 transition-colors select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-11 h-11 bg-vibe-red/10 border border-vibe-red/20 flex items-center justify-center mb-5">
                  <Icon name={r.icon} fallback="Check" size={18} className="text-vibe-red" />
                </div>
                <div className="font-oswald text-vibe-light text-xl leading-tight mb-2 group-hover:text-vibe-red transition-colors">{r.title}</div>
                <div className="text-vibe-muted text-sm leading-relaxed">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── HOW ── */}
      <section className="py-20 bg-vibe-dark section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-3">
            <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Процесс обучения</span>
          </div>
          <h2 className="font-oswald text-5xl md:text-6xl text-vibe-light leading-none mb-4">
            КАК ЭТО<br />ПРОХОДИТ
          </h2>
          <p className="text-vibe-muted text-sm mb-12">Быстро, просто и сразу с результатом</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-vibe-dark3">
            {HOW.map((h, i) => (
              <div key={i}
                className="relative flex flex-col p-8 border-r border-vibe-dark3 last:border-r-0 hover:bg-vibe-dark3/50 transition-colors group">
                <div className="text-vibe-dark3 font-oswald text-7xl font-bold absolute top-4 right-6 select-none opacity-30 group-hover:opacity-50 transition-opacity">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 bg-vibe-red/10 border border-vibe-red/20 flex items-center justify-center mb-6">
                  <Icon name={h.icon} fallback="Star" size={20} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-vibe-light text-xl mb-3 group-hover:text-vibe-red transition-colors leading-tight">{h.title}</h3>
                <p className="text-vibe-muted text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
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
                <div key={i} className="flex items-start gap-4 p-5 bg-vibe-dark3 border border-vibe-dark3 hover:border-vibe-red/30 transition-colors rounded-xl">
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

      {/* ── CTA AFTER FIRST STEP ── */}
      <section className="py-16 bg-vibe-dark2 section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="relative overflow-hidden border border-vibe-red/40 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl">
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px)" }} />
            <div className="absolute top-0 left-0 w-64 h-64 bg-vibe-red/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <p className="font-oswald text-vibe-red text-xs uppercase tracking-widest mb-2">Старт прямо сейчас</p>
              <h3 className="font-oswald text-3xl md:text-5xl text-vibe-light leading-tight mb-3">
                Сделай первый шаг<br />к результату сегодня
              </h3>
              <p className="text-vibe-muted text-sm max-w-md">
                Пока другие думают — ты уже умеешь. 4 урока, первый контент, понимание нейросетей — всё за 490 ₽.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3 flex-shrink-0">
              <button onClick={() => setPopupOpen(true)}
                className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-10 py-5 text-lg hover:opacity-85 transition-colors rounded-full whitespace-nowrap animate-pulse-red">
                Начать за 490 ₽ <span className="line-through opacity-60">990 ₽</span> →
              </button>
              <span className="text-vibe-muted text-xs">Доступ навсегда · без подписки</span>
            </div>
          </div>
        </div>
      </section>

      <Marquee reverse />

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
                  className="flex-shrink-0 w-[calc(33.333%-11px)] aspect-square overflow-hidden border border-vibe-dark3 hover:border-vibe-red/40 transition-colors group rounded-xl"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-vibe-dark3 border border-vibe-dark3 hover:border-vibe-red/40 flex items-center justify-center text-vibe-light hover:text-vibe-red transition-colors hidden md:flex rounded-xl"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={() => { const el = document.getElementById("student-gallery"); if (el) el.scrollBy({ left: 400, behavior: "smooth" }); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-vibe-dark3 border border-vibe-dark3 hover:border-vibe-red/40 flex items-center justify-center text-vibe-light hover:text-vibe-red transition-colors hidden md:flex rounded-xl"
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
          <div className="inline-block border border-vibe-red/40 text-vibe-red text-xs font-oswald uppercase tracking-widest px-3 py-1.5 mb-6 rounded-full">
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
                className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors rounded-lg"
              />
            </div>
            <div>
              <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Email</label>
              <input
                type="email" placeholder="твой@email.ru"
                value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors rounded-lg"
              />
            </div>
            <div>
              <label className="text-vibe-muted text-xs font-oswald uppercase tracking-wide block mb-1.5">Телефон</label>
              <input
                type="tel" placeholder="+7 ..."
                value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full bg-vibe-dark2 border border-vibe-dark3 text-vibe-light placeholder-vibe-muted/50 px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors rounded-lg"
              />
            </div>
            <FormCheckboxes pd={formPd} setPd={setFormPd} privacy={formPrivacy} setPrivacy={setFormPrivacy} ads={formAds} setAds={setFormAds} />
            <button type="submit"
              className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-5 text-lg hover:opacity-85 transition-all animate-pulse-red rounded-full mt-2">
              Начать за 490 ₽ <span className="line-through opacity-60 text-base">990 ₽</span> →
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-vibe-dark2 section-appear">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="md:sticky md:top-28">
              <div className="mb-3">
                <span className="text-vibe-muted text-xs font-oswald uppercase tracking-widest">Частые вопросы</span>
              </div>
              <h2 className="font-oswald text-5xl md:text-6xl text-vibe-light leading-none mb-6">
                ОСТАЛИСЬ<br />ВОПРОСЫ?
              </h2>
              <p className="text-vibe-muted text-sm leading-relaxed mb-8">
                Собрали ответы на самые частые. Если не нашёл своего — напиши нам напрямую.
              </p>
              <a href="mailto:hello@bonnieslide.ru"
                className="inline-flex items-center gap-2 border border-vibe-dark3 text-vibe-muted font-oswald uppercase tracking-widest text-xs px-5 py-3 hover:border-vibe-red/40 hover:text-vibe-light transition-colors rounded-full">
                <Icon name="Mail" size={13} />
                Написать нам
              </a>
            </div>
            <div className="border-t border-vibe-dark3">
              {FAQS.map((f, i) => <FAQItem key={i} index={i} q={f.q} a={f.a} />)}
            </div>
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
      <footer className="pt-14 pb-8 border-t border-vibe-dark3 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr_280px] gap-10 mb-10">

            {/* Col 1 — лого, соцсети, телефоны */}
            <div>
              <a href="/"><Logo width={110} height={13} /></a>
              <div className="flex gap-3 mt-5 mb-5">
                {/* ВКонтакте */}
                <a href="https://vk.com/bonnieandslide_official" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте"
                  className="w-9 h-9 rounded-full bg-vibe-red flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 35 35" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M28.4586 10.9722C28.6292 10.4239 28.4586 10.0253 27.7039 10.0253H25.1945C24.5615 10.0253 24.2692 10.3743 24.0986 10.7476C24.0986 10.7476 22.8078 13.9365 21.0051 16.004C20.4205 16.6019 20.1527 16.8012 19.836 16.8012C19.6654 16.8012 19.4459 16.6019 19.4459 16.054V10.9465C19.4459 10.299 19.2514 10 18.7152 10H14.7688C14.3787 10 14.1353 10.299 14.1353 10.5979C14.1353 11.2206 15.0366 11.3703 15.1339 13.114V16.9028C15.1339 17.7248 14.9901 17.875 14.671 17.875C13.8186 17.875 11.7481 14.6613 10.5061 10.9994C10.2646 10.2742 10.0193 10 9.3858 10H6.85244C6.12171 10 6 10.3485 6 10.7224C6 11.3951 6.85244 14.7828 9.97038 19.2667C12.0409 22.3292 14.9882 23.9752 17.6433 23.9752C19.2514 23.9752 19.4459 23.6014 19.4459 22.9787V20.6619C19.4459 19.9147 19.5921 19.7903 20.1038 19.7903C20.4689 19.7903 21.1268 19.9891 22.6127 21.4591C24.3176 23.2028 24.6099 24 25.5601 24H28.069C28.7997 24 29.1409 23.6262 28.9459 22.9038C28.7269 22.1815 27.8984 21.1353 26.8265 19.8899C26.2419 19.1928 25.3651 18.4204 25.0972 18.0466C24.7321 17.5483 24.8294 17.349 25.0972 16.9008C25.0728 16.9008 28.1423 12.4665 28.4586 10.9703" fill="white"/></svg>
                </a>
                {/* Telegram */}
                <a href="https://t.me/bonnieandslide" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                  className="w-9 h-9 rounded-full bg-vibe-red flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 35 35" fill="none"><path d="M24.9549 7.17658C24.9549 7.17658 27.1749 6.31087 26.9892 8.41315C26.9281 9.27886 26.3732 12.3091 25.9412 15.5863L24.4612 25.2948C24.4612 25.2948 24.3378 26.7171 23.2275 26.9645C22.1178 27.2114 20.4527 26.0988 20.1441 25.8514C19.8972 25.6656 15.519 22.8828 13.9773 21.5228C13.5453 21.1514 13.0516 20.4097 14.039 19.544L20.5138 13.36C21.2538 12.6183 21.9938 10.8869 18.9104 12.9891L10.2761 18.8634C10.2761 18.8634 9.28928 19.4822 7.43958 18.9257L3.43045 17.6885C3.43045 17.6885 1.95046 16.7611 4.47902 15.8337C10.6464 12.9274 18.2321 9.95943 24.9538 7.17658H24.9549Z" fill="white"/></svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@BonnieSlide" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-vibe-red flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 35 35" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18 8C18.9405 8 19.9052 8.02475 20.8402 8.06525L21.9446 8.11925L23.0017 8.18338L23.9917 8.252L24.8959 8.324C25.8772 8.40081 26.8005 8.82907 27.5035 9.53342C28.2065 10.2378 28.6441 11.1731 28.7393 12.1749L28.7833 12.653L28.8658 13.6767C28.9428 14.7376 29 15.8941 29 17C29 18.1059 28.9428 19.2624 28.8658 20.3233L28.7833 21.347C28.769 21.5113 28.7547 21.6699 28.7393 21.8251C28.644 22.8271 28.2063 23.7625 27.5031 24.4669C26.7999 25.1713 25.8763 25.5994 24.8948 25.676L23.9928 25.7469L23.0028 25.8166L21.9446 25.8807L20.8402 25.9347C19.894 25.9768 18.9471 25.9986 18 26C17.0529 25.9986 16.106 25.9768 15.1598 25.9347L14.0554 25.8807L12.9983 25.8166L12.0083 25.7469L11.1041 25.676C10.1228 25.5992 9.19951 25.1709 8.49652 24.4666C7.79353 23.7622 7.35593 22.8269 7.2607 21.8251L7.2167 21.347L7.1342 20.3233C7.05009 19.2175 7.00533 18.109 7 17C7 15.8941 7.0572 14.7376 7.1342 13.6767L7.2167 12.653C7.231 12.4887 7.2453 12.3301 7.2607 12.1749C7.35589 11.1733 7.79334 10.2381 8.4961 9.53376C9.19886 8.82943 10.1219 8.40107 11.103 8.324L12.0061 8.252L12.9961 8.18338L14.0543 8.11925L15.1587 8.06525C16.1053 8.02321 17.0526 8.00146 18 8ZM15.8 14.2719V19.7281C15.8 20.2479 16.35 20.5719 16.79 20.3131L21.41 17.585C21.5105 17.5258 21.594 17.4406 21.6521 17.3379C21.7102 17.2352 21.7407 17.1186 21.7407 17C21.7407 16.8814 21.7102 16.7648 21.6521 16.6621C21.594 16.5594 21.5105 16.4742 21.41 16.415L16.79 13.688C16.6896 13.6287 16.5758 13.5975 16.4599 13.5976C16.344 13.5976 16.2302 13.6288 16.1298 13.6881C16.0295 13.7474 15.9462 13.8327 15.8883 13.9353C15.8304 14.038 15.7999 14.1545 15.8 14.273V14.2719Z" fill="white"/></svg>
                </a>
              </div>
              <div className="space-y-3 text-xs text-vibe-muted">
                <div>
                  <div className="text-vibe-light text-xs mb-1">Открытые курсы:</div>
                  <a href="tel:+74951515206" className="block hover:text-vibe-red transition-colors">+7 (495) 15-15-206</a>
                  <a href="tel:+79311076332" className="block hover:text-vibe-red transition-colors">+7 (931) 107-63-32</a>
                </div>
                <div>
                  <div className="text-vibe-light text-xs mb-1">Корпоративное обучение:</div>
                  <a href="tel:+74951515306" className="block hover:text-vibe-red transition-colors">+7 (495) 15-15-306</a>
                  <a href="tel:+79311092892" className="block hover:text-vibe-red transition-colors">+7 (931) 109-28-92</a>
                </div>
              </div>
              <a href="https://bonnieandslide.com/wp-content/themes/bns/assets/documents/license_registry.pdf"
                target="_blank" rel="noopener noreferrer"
                className="block text-vibe-muted/50 text-xs mt-4 hover:text-vibe-muted transition-colors leading-relaxed">
                Государственная лицензия<br />Л035-01298-77/01635812
              </a>
            </div>

            {/* Col 2 — Обучение + Корп. обучение + Всё о дизайне */}
            <div className="space-y-5 text-xs">
              <div>
                <div className="text-vibe-light font-oswald text-sm mb-2">Обучение</div>
                {[["https://bonnieandslide.com/kursy", "Курсы"], ["https://bonnieandslide.com/pack-for-clients", "Пакетные предложения"], ["https://bonnieandslide.com/professions", "Профессии"], ["https://bonnieandslide.com/certificate", "Подарочные сертификаты"]].map(([href, label]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block text-vibe-muted mb-1.5 hover:text-vibe-red transition-colors">{label}</a>
                ))}
              </div>
              <div>
                <div className="text-vibe-light font-oswald text-sm mb-2">Корпоративное обучение</div>
                {[["https://bonnieandslide.com/corporate-edu", "Курсы для сотрудников"], ["/b2b", "Корп. предложения"]].map(([href, label]) => (
                  <a key={label} href={href} className="block text-vibe-muted mb-1.5 hover:text-vibe-red transition-colors">{label}</a>
                ))}
              </div>
              <div>
                <div className="text-vibe-light font-oswald text-sm mb-2">Всё о дизайне</div>
                {[["https://books.bonnieandslide.com/", "Учебник по презентациям"], ["https://bonnieandslide.com/bank", "Банк слайдов"], ["https://bonnieandslide.com/webinar", "Вебинары"], ["https://bonnieandslide.com/blog", "Блог"]].map(([href, label]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block text-vibe-muted mb-1.5 hover:text-vibe-red transition-colors">{label}</a>
                ))}
              </div>
              <a href="/order-presentation" className="block text-vibe-light font-oswald text-sm hover:text-vibe-red transition-colors">Заказать презентацию</a>
            </div>

            {/* Col 3 — О нас */}
            <div className="text-xs">
              <div className="text-vibe-light font-oswald text-sm mb-2">О нас</div>
              {[["https://bonnieandslide.com/about", "Об академии"], ["https://bonnieandslide.com/team", "Команда"], ["https://bonnieandslide.com/smi", "СМИ о нас"], ["https://bonnieandslide.com/info", "Сведения об образовательной организации"], ["https://bonnieandslide.com/cases", "Кейсы"], ["https://bonnieandslide.com/reviews", "Отзывы"], ["https://bonnieandslide.com/contacts", "Контакты"]].map(([href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block text-vibe-muted mb-1.5 hover:text-vibe-red transition-colors">{label}</a>
              ))}
            </div>

            {/* Col 4 — Новости + правовая */}
            <div className="text-xs">
              <div className="text-vibe-light font-oswald text-sm mb-1">Новости академии</div>
              <p className="text-vibe-muted mb-3 leading-relaxed">Подпишись, чтобы первым узнавать о новых курсах, скидках и промокодах</p>
              <FooterSubscribe />
              <div className="mt-5 space-y-1.5">
                {[[PRIVACY_URL, "Политика конфиденциальности"], [CONSENT_PD_URL, "Согласие на обработку ПД"], [PRIVACY_URL, "Рекомендательные технологии"], [PRIVACY_URL, "Файлы Cookie"]].map(([href, label]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block text-vibe-muted/60 hover:text-vibe-muted transition-colors">{label}</a>
                ))}
              </div>
              <div className="mt-4 text-vibe-light text-xs font-oswald">ОГРН 1237700606956<br />ИНН 9701259086</div>
              <div className="mt-2 text-vibe-muted/60 text-xs leading-relaxed">г. Москва, Муниципальный округ Басманный,<br />ул. Нижняя Красносельская, д. 35, стр. 2, 104</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-vibe-dark3 text-vibe-muted/50 text-xs">
            <span>© 2015–2026 Бонни и Слайд</span>
            <span>Обучающие курсы по презентациям и нейросетям</span>
          </div>
        </div>
      </footer>
    </div>
  );
}