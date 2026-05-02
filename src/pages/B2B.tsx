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

const problems = [
  { icon: "FileX", title: "Слайды без структуры", text: "Сотрудники делают презентации по наитию — нет единого стандарта, нет логики, нет результата" },
  { icon: "Clock", title: "Теряют время", text: "Часы уходят на оформление вместо содержания. Дедлайны срываются, качество падает" },
  { icon: "TrendingDown", title: "Проигрывают сделки", text: "Клиенты уходят к конкурентам — не потому что продукт хуже, а потому что презентация слабее" },
];

const formats = [
  {
    tag: "ФОРМАТ 01",
    title: "Корпоративный воркшоп",
    desc: "Однодневный интенсив для команды. Разбираем реальные задачи компании, создаём шаблоны под вашу специфику.",
    duration: "1 день",
    size: "до 20 человек",
    result: "Единый стандарт презентаций",
  },
  {
    tag: "ФОРМАТ 02",
    title: "Программа обучения",
    desc: "Серия занятий с практическими заданиями на реальных проектах команды. Глубокая проработка навыков.",
    duration: "4–8 недель",
    size: "до 15 человек",
    result: "Устойчивые навыки и культура",
  },
  {
    tag: "ФОРМАТ 03",
    title: "Обучение тренеров",
    desc: "Готовим внутренних тренеров компании, которые будут самостоятельно обучать новых сотрудников.",
    duration: "2 недели",
    size: "2–5 тренеров",
    result: "Независимость от внешних подрядчиков",
  },
];

const whyUs = [
  { icon: "Target", text: "Программа адаптируется под задачи вашей компании — не шаблонный курс" },
  { icon: "Users", text: "Обучаем на реальных кейсах вашей отрасли и конкретных проектах команды" },
  { icon: "Award", text: "Методология основана на 100 000+ студентов и практике топ-компаний" },
  { icon: "Repeat", text: "Поддержка после обучения: обратная связь по презентациям ещё 30 дней" },
  { icon: "BarChart2", text: "Замеряем результат до и после — вы видите конкретный прогресс команды" },
  { icon: "Globe", text: "Проводим офлайн и онлайн — для распределённых команд по всей России" },
];

const results = [
  { stat: "×3", label: "рост качества презентаций", sub: "по оценке менеджмента" },
  { stat: "86%", label: "сотрудников применяют", sub: "навыки сразу после курса" },
  { stat: "1 100+", label: "обученных специалистов", sub: "в корпоративных программах" },
  { stat: "3 000+", label: "компаний доверяют", sub: "Bonnie&Slide" },
];

const steps = [
  { num: "01", title: "Заявка и брифинг", text: "Оставляете заявку, мы связываемся в течение 24 часов. Обсуждаем задачи, состав команды, сроки." },
  { num: "02", title: "Диагностика", text: "Анализируем текущий уровень команды, изучаем специфику бизнеса и цели обучения." },
  { num: "03", title: "Программа под вас", text: "Разрабатываем индивидуальную программу с кейсами из вашей отрасли." },
  { num: "04", title: "Обучение", text: "Проводим занятия — офлайн или онлайн, в удобное для команды время." },
  { num: "05", title: "Результат и отчёт", text: "Предоставляем отчёт о прогрессе, рекомендации и план дальнейшего развития." },
];

const faqs = [
  { q: "Сколько человек можно обучить за раз?", a: "Оптимальный размер группы — до 20 человек для воркшопа и до 15 для полной программы. Для больших команд делим на параллельные потоки." },
  { q: "Можно ли провести обучение онлайн?", a: "Да, все форматы доступны в онлайн-режиме. Используем интерактивные инструменты, которые не уступают офлайну по вовлечённости." },
  { q: "Как быстро можно организовать обучение?", a: "Воркшоп можно запустить за 1–2 недели. Полная программа требует 2–3 недели на подготовку под специфику компании." },
  { q: "Есть ли отчётность для HR и руководства?", a: "Да. Предоставляем детальный отчёт: результаты до/после, индивидуальная обратная связь по каждому участнику, рекомендации." },
  { q: "Работаете ли вы с компаниями из регионов?", a: "Работаем по всей России и СНГ — онлайн без ограничений, офлайн по согласованию выезда тренера." },
];

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
      {open && (
        <p className="mt-3 text-vibe-muted font-golos leading-relaxed text-sm">{a}</p>
      )}
    </div>
  );
}

export default function B2B() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-vibe-dark font-golos overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-vibe-dark/90 backdrop-blur-sm border-b border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <Logo width={120} height={14} />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-vibe-muted">
            <a href="#formats" className="hover:text-vibe-red transition-colors">Форматы</a>
            <a href="#why" className="hover:text-vibe-red transition-colors">Почему мы</a>
            <a href="#process" className="hover:text-vibe-red transition-colors">Как работаем</a>
            <a href="#faq" className="hover:text-vibe-red transition-colors">FAQ</a>
          </nav>
          <a href="#contact" className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-5 py-2.5 hover:bg-red-700 transition-colors">
            Оставить заявку
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-vibe-dark via-vibe-dark/80 to-vibe-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-vibe-dark via-transparent to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-block bg-vibe-red px-3 py-1">
                <span className="font-oswald text-sm tracking-widest text-white uppercase">Для бизнеса</span>
              </div>
              <div className="h-px bg-vibe-red/40 w-16" />
              <span className="text-vibe-muted text-sm">Bonnie&amp;Slide B2B</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-vibe-light leading-none mb-6">
              ПРЕЗЕНТАЦИИ —<br />
              <span className="text-vibe-red">НА ДРУГОМ</span><br />
              УРОВНЕ
            </h1>
            <p className="text-vibe-muted text-lg md:text-xl leading-relaxed mb-4 max-w-xl">
              Корпоративное обучение для команд, которые хотят говорить убедительно, выигрывать переговоры и закрывать сделки.
            </p>
            <p className="text-vibe-muted/70 text-sm mb-10 max-w-lg">
              Программа разрабатывается под задачи вашей компании — не шаблонный курс, а точечная работа с командой.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a href="#contact" className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 text-lg hover:bg-red-700 transition-all animate-pulse-red">
                Обсудить программу
              </a>
              <a href="#formats" className="text-vibe-muted text-sm flex items-center gap-2 hover:text-vibe-light transition-colors border border-vibe-dark3 px-5 py-4 hover:border-vibe-red/40">
                <Icon name="ChevronDown" size={16} />
                Форматы обучения
              </a>
            </div>
            <div className="flex flex-wrap gap-10">
              {[
                { val: "1 100+", label: "обученных сотрудников" },
                { val: "3 000+", label: "компаний-клиентов" },
                { val: "86%", label: "применяют навыки сразу" },
              ].map((item) => (
                <div key={item.val}>
                  <div className="font-oswald text-3xl text-vibe-red">{item.val}</div>
                  <div className="text-vibe-muted text-xs mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear mb-14">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              ТРИ БОЛИ, С КОТОРЫМИ<br /><span className="text-vibe-red">К НАМ ПРИХОДЯТ</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="b2b-appear bg-vibe-dark3 p-7 border-l-2 border-vibe-red" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-vibe-red/10 flex items-center justify-center mb-5">
                  <Icon name={p.icon} fallback="AlertCircle" size={20} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-xl text-vibe-light mb-3">{p.title}</h3>
                <p className="text-vibe-muted text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section id="formats" className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear mb-16">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              ФОРМАТЫ<br /><span className="text-vibe-red">ОБУЧЕНИЯ</span>
            </h2>
            <p className="text-vibe-muted mt-4 max-w-lg text-sm leading-relaxed">
              Выбираем формат вместе — исходя из задач, состава команды и временных ограничений
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-vibe-dark3">
            {formats.map((f, i) => (
              <div key={i} className="b2b-appear relative p-8 border-r border-vibe-dark3 last:border-r-0 hover:bg-vibe-dark3/40 transition-colors group" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-oswald text-xs text-vibe-red tracking-widest mb-4">{f.tag}</div>
                <h3 className="font-oswald text-2xl text-vibe-light mb-4 group-hover:text-vibe-red transition-colors">{f.title}</h3>
                <p className="text-vibe-muted text-sm leading-relaxed mb-6">{f.desc}</p>
                <div className="space-y-2 pt-5 border-t border-vibe-dark3">
                  {[
                    { label: "Длительность", val: f.duration },
                    { label: "Группа", val: f.size },
                    { label: "Результат", val: f.result },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-xs">
                      <span className="text-vibe-muted">{row.label}</span>
                      <span className="text-vibe-light font-oswald">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="b2b-appear mt-8 flex justify-center">
            <a href="#contact" className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 hover:bg-red-700 transition-colors">
              Подобрать формат
            </a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="b2b-appear mb-10">
                <div className="red-line" />
                <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
                  ПОЧЕМУ<br /><span className="text-vibe-red">ВЫБИРАЮТ НАС</span>
                </h2>
              </div>
              <div className="space-y-5">
                {whyUs.map((w, i) => (
                  <div key={i} className="b2b-appear flex items-start gap-4" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="w-8 h-8 bg-vibe-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={w.icon} fallback="Check" size={16} className="text-vibe-red" />
                    </div>
                    <p className="text-vibe-muted text-sm leading-relaxed">{w.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="b2b-appear">
              <div className="bg-vibe-dark3 border border-vibe-dark3 p-8 relative">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-vibe-red" />
                <div className="font-oswald text-xs text-vibe-red tracking-widest mb-6">МЫ НЕ ПРОСТО ЧИТАЕМ ЛЕКЦИИ</div>
                <h3 className="font-oswald text-2xl text-vibe-light mb-5 leading-snug">
                  Каждое занятие — это работа с реальными задачами вашей команды
                </h3>
                <p className="text-vibe-muted text-sm leading-relaxed mb-6">
                  Забудьте об абстрактных упражнениях. Ваши сотрудники будут создавать, улучшать и защищать свои реальные презентации — под наблюдением эксперта.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "100 000+", label: "студентов обучено" },
                    { val: "86%", label: "применяют сразу" },
                    { val: "1 100+", label: "корп. участников" },
                    { val: "3 000+", label: "компаний-клиентов" },
                  ].map((s, i) => (
                    <div key={i} className="bg-vibe-dark p-4 border border-vibe-dark3">
                      <div className="font-oswald text-2xl text-vibe-red">{s.val}</div>
                      <div className="text-vibe-muted text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-24 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)"
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="b2b-appear mb-16 text-center">
            <h2 className="font-oswald text-4xl md:text-5xl text-white">
              ИЗМЕРИМЫЕ<br />РЕЗУЛЬТАТЫ
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {results.map((r, i) => (
              <div key={i} className="b2b-appear text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-oswald text-5xl md:text-6xl font-bold text-white mb-1">{r.stat}</div>
                <div className="font-oswald text-sm text-white/80 uppercase tracking-wider mb-1">{r.label}</div>
                <div className="text-white/60 text-xs">{r.sub}</div>
              </div>
            ))}
          </div>
          <div className="b2b-appear flex flex-col md:flex-row items-center gap-8">
            <img src={RESULTS_BG} alt="Результаты команды" className="w-full md:w-80 h-52 object-cover" />
            <div>
              <blockquote className="font-oswald text-2xl md:text-3xl text-white leading-snug mb-4">
                "После корпоративного обучения наши менеджеры стали закрывать сделки на 30% быстрее."
              </blockquote>
              <cite className="text-white/70 text-sm not-italic">— Директор по продажам, крупная IT-компания</cite>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b2b-appear mb-16">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              КАК МЫ<br /><span className="text-vibe-red">РАБОТАЕМ</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-vibe-dark3 hidden md:block" />
            <div className="space-y-0">
              {steps.map((s, i) => (
                <div key={i} className="b2b-appear relative flex gap-8 md:gap-12 p-6 md:p-8 border-b border-vibe-dark3 hover:bg-vibe-dark3/30 transition-colors group" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-vibe-dark border-2 border-vibe-dark3 group-hover:border-vibe-red flex items-center justify-center transition-colors">
                      <span className="font-oswald text-vibe-red text-sm">{s.num}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-oswald text-xl text-vibe-light mb-2 group-hover:text-vibe-red transition-colors">{s.title}</h3>
                    <p className="text-vibe-muted text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="b2b-appear mb-8">
                <div className="red-line" />
                <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light mb-4">
                  ОБСУДИМ<br /><span className="text-vibe-red">ВАШУ ЗАДАЧУ</span>
                </h2>
                <p className="text-vibe-muted text-sm leading-relaxed">
                  Оставьте заявку — мы свяжемся в течение 24 часов, зададим несколько вопросов и предложим оптимальный формат обучения для вашей команды.
                </p>
              </div>
              <div className="b2b-appear space-y-4">
                {[
                  { icon: "Phone", label: "+7 (800) 000-00-00", sub: "Звонок бесплатный" },
                  { icon: "Mail", label: "b2b@bonnieslide.ru", sub: "Корпоративные запросы" },
                  { icon: "MessageCircle", label: "Telegram", sub: "Быстрый ответ" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-vibe-red/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} fallback="Star" size={18} className="text-vibe-red" />
                    </div>
                    <div>
                      <div className="font-oswald text-vibe-light text-sm">{c.label}</div>
                      <div className="text-vibe-muted text-xs">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="b2b-appear mt-8 bg-vibe-dark3 p-6 border-l-2 border-vibe-red">
                <p className="font-oswald text-vibe-light text-sm mb-1">БЕСПЛАТНАЯ ДИАГНОСТИКА</p>
                <p className="text-vibe-muted text-xs leading-relaxed">
                  Для компаний от 10 человек — проводим бесплатный разбор одной презентации команды и даём рекомендации.
                </p>
              </div>
            </div>

            <div className="b2b-appear bg-vibe-dark3 p-8 border border-vibe-dark3 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-vibe-red" />
              <h3 className="font-oswald text-2xl text-vibe-light mb-6">Заявка на обучение</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Должность"
                    className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Название компании"
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                  />
                </div>
                <select className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors appearance-none">
                  <option value="">Количество сотрудников</option>
                  <option value="5-10">5–10 человек</option>
                  <option value="11-20">11–20 человек</option>
                  <option value="21-50">21–50 человек</option>
                  <option value="50+">Более 50 человек</option>
                </select>
                <textarea
                  placeholder="Расскажите о задаче — что хотите улучшить в команде?"
                  rows={4}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors resize-none"
                />
                <button className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-4 hover:bg-red-700 transition-colors text-base">
                  Отправить заявку
                </button>
                <p className="text-vibe-muted text-xs text-center">Ответим в течение 24 часов · Без спама</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-vibe-dark">
        <div className="max-w-3xl mx-auto px-6">
          <div className="b2b-appear mb-12">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              ЧАСТЫЕ<br /><span className="text-vibe-red">ВОПРОСЫ</span>
            </h2>
          </div>
          <div className="b2b-appear">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 21px)"
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="b2b-appear">
            <h2 className="font-oswald text-4xl md:text-6xl text-white mb-4 leading-none">
              НАЧНИТЕ МЕНЯТЬ<br />КОМАНДУ СЕГОДНЯ
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              Первый шаг — бесплатная консультация. Мы разберём задачи и предложим программу.
            </p>
            <a href="#contact" className="inline-block bg-white text-vibe-red font-oswald uppercase tracking-widest px-10 py-5 text-lg hover:bg-vibe-light transition-colors">
              Получить программу
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-vibe-dark3 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-vibe-muted text-xs">
          <a href="/"><Logo width={100} height={12} /></a>
          <div>© 2025 Bonnie&amp;Slide. Все права защищены.</div>
          <div className="flex gap-4">
            <a href="/" className="hover:text-vibe-red transition-colors">Для частных лиц</a>
            <a href="#" className="hover:text-vibe-red transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
