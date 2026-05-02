import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";

const HERO_BG = "https://cdn.poehali.dev/projects/70b2a877-599d-4d33-ad00-9094dfe27d22/files/490d0bd5-1c50-4535-bc4a-a1e382543e4e.jpg";
const STUDENT_IMG = "https://cdn.poehali.dev/projects/70b2a877-599d-4d33-ad00-9094dfe27d22/files/25d78737-b670-43c0-8ad1-52454ffc42a7.jpg";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".section-appear");
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

const benefits = [
  { icon: "Zap", title: "Без кода", text: "Создавай сайты и приложения на русском языке — ИИ пишет код за тебя" },
  { icon: "Clock", title: "За несколько часов", text: "От идеи до рабочего сайта — за одно утро, а не за несколько месяцев" },
  { icon: "TrendingUp", title: "Реальные проекты", text: "Не учебные задания, а настоящие продукты, которые можно сразу запустить" },
  { icon: "Shield", title: "Без посредников", text: "Сам управляй своим сайтом — не зависи от разработчиков и агентств" },
];

const lessons = [
  { num: "01", title: "Что такое вайбкодинг", text: "Разберёмся с концепцией: как общаться с ИИ, чтобы получать нужный результат с первого раза" },
  { num: "02", title: "Первый сайт с нуля", text: "Запускаем лендинг с нуля — от идеи до публикации в интернете за один урок" },
  { num: "03", title: "Дизайн под себя", text: "Учимся задавать стиль, цвета, шрифты и атмосферу — без Figma и дизайнеров" },
  { num: "04", title: "База данных и формы", text: "Добавляем сбор заявок, хранение данных, отправку на почту — всё через ИИ" },
  { num: "05", title: "Автоматизация и интеграции", text: "Подключаем оплату, CRM, Telegram-уведомления и другие сервисы" },
  { num: "06", title: "Финальный проект", text: "Делаем полноценный продукт и публикуем его с собственным доменом" },
];

const results = [
  { stat: "6+", label: "рабочих проектов", sub: "запустишь за курс" },
  { stat: "80%", label: "экономия бюджета", sub: "по сравнению с разработчиком" },
  { stat: "×10", label: "быстрее реализации", sub: "от идеи до сайта" },
  { stat: "0 ₽", label: "на старте", sub: "не нужны платные инструменты" },
];

const reviews = [
  { name: "Анна К.", role: "Владелец магазина", text: "Запустила интернет-магазин за выходные. Раньше мне это казалось нереальным — теперь сама обновляю каталог и меняю цены.", stars: 5 },
  { name: "Михаил Р.", role: "Консультант по финансам", text: "Сделал лендинг для своих услуг без единой строчки кода. Клиенты думают, что нанял профессиональную студию.", stars: 5 },
  { name: "Елена В.", role: "HR-специалист", text: "Создала корпоративный портал для команды. Коллеги в восторге, руководство одобрило. Никто не верит, что я сделала это сама.", stars: 5 },
  { name: "Дмитрий Н.", role: "Предприниматель", text: "Сэкономил 150 000 рублей на разработке. Сайт работает лучше, чем то, что делали подрядчики за полгода.", stars: 5 },
];

const faqs = [
  { q: "Нужны ли знания программирования?", a: "Нет. Курс создан специально для тех, кто никогда не писал код. Ты будешь общаться с ИИ на русском языке — он делает всё техническое." },
  { q: "Какие инструменты нужны?", a: "Только компьютер и браузер. Все сервисы, которые мы используем, имеют бесплатный тариф для старта." },
  { q: "Сколько времени займёт курс?", a: "6 уроков по 40–60 минут. Можно пройти за неделю или растянуть на месяц — материалы доступны бессрочно." },
  { q: "Будет ли поддержка после курса?", a: "Да. Ты получишь доступ в закрытый Telegram-чат, где можно задавать вопросы и делиться проектами." },
  { q: "Что если у меня не получится?", a: "Мы даём 14 дней на возврат средств без объяснения причин. Риск нулевой." },
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
        <p className="mt-3 text-vibe-muted font-golos leading-relaxed text-sm animate-fade-in">{a}</p>
      )}
    </div>
  );
}

export default function Index() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-vibe-dark font-golos overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-vibe-dark/90 backdrop-blur-sm border-b border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo width={120} height={14} />
          <nav className="hidden md:flex items-center gap-8 text-sm text-vibe-muted">
            <a href="#benefits" className="hover:text-vibe-red transition-colors">Преимущества</a>
            <a href="#lessons" className="hover:text-vibe-red transition-colors">Программа</a>
            <a href="#reviews" className="hover:text-vibe-red transition-colors">Отзывы</a>
            <a href="#faq" className="hover:text-vibe-red transition-colors">FAQ</a>
          </nav>
          <a href="#buy" className="bg-vibe-red text-white font-oswald uppercase tracking-widest text-sm px-5 py-2.5 hover:bg-red-700 transition-colors">
            Записаться
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-vibe-dark via-vibe-dark/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-vibe-dark via-transparent to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="inline-block bg-vibe-red px-3 py-1 mb-6">
              <span className="font-oswald text-sm tracking-widest text-white uppercase">Онлайн-курс</span>
            </div>
            <h1 className="font-oswald text-6xl md:text-8xl font-bold text-vibe-light leading-none mb-6">
              САЙТЫ<br />
              <span className="text-vibe-red">С ИИ</span><br />
              БЕЗ КОДА
            </h1>
            <p className="text-vibe-muted text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Научись создавать профессиональные сайты и приложения на русском языке — с помощью искусственного интеллекта. Без программирования, дизайнеров и агентств.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#buy" className="bg-vibe-red text-white font-oswald uppercase tracking-widest px-8 py-4 text-lg hover:bg-red-700 transition-all animate-pulse-red">
                Начать обучение
              </a>
              <a href="#lessons" className="text-vibe-muted text-sm flex items-center gap-2 hover:text-vibe-light transition-colors">
                <Icon name="Play" size={16} />
                Смотреть программу
              </a>
            </div>
            <div className="flex flex-wrap gap-8 text-sm">
              {[
                { val: "6 уроков", label: "видеоматериалов" },
                { val: "~5 часов", label: "практики" },
                { val: "Навсегда", label: "доступ к материалам" },
              ].map((item) => (
                <div key={item.val}>
                  <div className="font-oswald text-2xl text-vibe-red">{item.val}</div>
                  <div className="text-vibe-muted text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-appear mb-16">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              ПОЧЕМУ<br /><span className="text-vibe-red">ВАЙБКОДИНГ</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="section-appear bg-vibe-dark3 p-6 hover-lift border border-vibe-dark3 hover:border-vibe-red/30 transition-colors" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-vibe-red/10 flex items-center justify-center mb-4">
                  <Icon name={b.icon} fallback="Star" size={20} className="text-vibe-red" />
                </div>
                <h3 className="font-oswald text-xl text-vibe-light mb-2">{b.title}</h3>
                <p className="text-vibe-muted text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LESSONS */}
      <section id="lessons" className="py-24 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-appear mb-16">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              ЧТО ВНУТРИ<br /><span className="text-vibe-red">КУРСА</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {lessons.map((l, i) => (
              <div key={i} className="section-appear relative p-8 border border-vibe-dark3 hover:border-vibe-red/40 hover:bg-vibe-dark3/50 transition-all group overflow-hidden" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="number-badge">{l.num}</span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-oswald text-vibe-red text-sm">{l.num}</span>
                    <div className="h-px bg-vibe-dark3 flex-1" />
                  </div>
                  <h3 className="font-oswald text-xl text-vibe-light mb-2 group-hover:text-vibe-red transition-colors">{l.title}</h3>
                  <p className="text-vibe-muted text-sm leading-relaxed">{l.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-24 bg-vibe-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)"
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="section-appear mb-16 text-center">
            <h2 className="font-oswald text-4xl md:text-5xl text-white">
              РЕЗУЛЬТАТЫ<br />УЧЕНИКОВ
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {results.map((r, i) => (
              <div key={i} className="section-appear text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-oswald text-5xl md:text-6xl font-bold text-white mb-1">{r.stat}</div>
                <div className="font-oswald text-sm text-white/80 uppercase tracking-wider mb-1">{r.label}</div>
                <div className="text-white/60 text-xs">{r.sub}</div>
              </div>
            ))}
          </div>
          <div className="section-appear flex flex-col md:flex-row items-center gap-8">
            <img src={STUDENT_IMG} alt="Студент" className="w-full md:w-72 h-48 object-cover" />
            <div>
              <blockquote className="font-oswald text-2xl md:text-3xl text-white leading-snug mb-4">
                "Я запустила свой первый сайт за 4 часа. До курса думала, что это займёт месяцы."
              </blockquote>
              <cite className="text-white/70 text-sm not-italic">— Ольга М., участница курса</cite>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-vibe-dark2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-appear mb-16">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              ОТЗЫВЫ<br /><span className="text-vibe-red">И РЕЦЕНЗИИ</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="section-appear bg-vibe-dark3 p-6 border border-vibe-dark3 hover:border-vibe-red/30 transition-colors hover-lift" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-vibe-red text-sm">★</span>
                  ))}
                </div>
                <p className="text-vibe-light text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-vibe-red/20 flex items-center justify-center">
                    <Icon name="User" size={16} className="text-vibe-red" />
                  </div>
                  <div>
                    <div className="font-oswald text-vibe-light text-sm">{r.name}</div>
                    <div className="text-vibe-muted text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="py-24 bg-vibe-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="section-appear mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-vibe-red" />
            </div>
            <h2 className="font-oswald text-4xl md:text-6xl text-vibe-light mb-4">НАЧНИ СЕГОДНЯ</h2>
            <p className="text-vibe-muted text-lg mb-8">Один раз научись — используй навык всю жизнь</p>
          </div>
          <div className="section-appear bg-vibe-dark3 border border-vibe-dark3 p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-vibe-red" />
            <div className="mb-6">
              <div className="text-vibe-muted text-sm line-through mb-1">7 000 ₽</div>
              <div className="font-oswald text-6xl text-vibe-red">3 500 ₽</div>
              <div className="text-vibe-muted text-sm mt-1">единоразово · доступ навсегда</div>
            </div>
            <ul className="text-left mb-8 space-y-3">
              {[
                "6 видеоуроков с практическими заданиями",
                "Закрытый Telegram-чат для участников",
                "Финальный проект с обратной связью",
                "14 дней — гарантия возврата",
                "Бесплатные обновления курса",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-vibe-muted">
                  <Icon name="Check" size={16} className="text-vibe-red flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest text-lg py-5 hover:bg-red-700 transition-all animate-pulse-red">
              Купить курс за 3 500 ₽
            </button>
            <p className="text-vibe-muted text-xs mt-4">Безопасная оплата · 14 дней возврат без вопросов</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-vibe-dark2">
        <div className="max-w-3xl mx-auto px-6">
          <div className="section-appear mb-12">
            <div className="red-line" />
            <h2 className="font-oswald text-4xl md:text-5xl text-vibe-light">
              ЧАСТЫЕ<br /><span className="text-vibe-red">ВОПРОСЫ</span>
            </h2>
          </div>
          <div className="section-appear">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-vibe-dark border-t border-vibe-dark3">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="section-appear">
              <div className="red-line" />
              <h2 className="font-oswald text-4xl text-vibe-light mb-4">КОНТАКТЫ</h2>
              <p className="text-vibe-muted text-sm leading-relaxed mb-6">
                Есть вопросы перед покупкой? Напишите нам — ответим в течение часа в рабочее время.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Mail", label: "hello@vibecode.ru", sub: "Общие вопросы" },
                  { icon: "MessageCircle", label: "Telegram-чат", sub: "Сообщество учеников" },
                  { icon: "Instagram", label: "@vibecode", sub: "Кейсы и обновления" },
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
            </div>
            <div className="section-appear bg-vibe-dark3 p-8 border border-vibe-dark3">
              <h3 className="font-oswald text-xl text-vibe-light mb-5">Напишите нам</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors"
                />
                <textarea
                  placeholder="Ваш вопрос"
                  rows={4}
                  className="w-full bg-vibe-dark border border-vibe-dark3 text-vibe-light placeholder-vibe-muted px-4 py-3 text-sm focus:outline-none focus:border-vibe-red transition-colors resize-none"
                />
                <button className="w-full bg-vibe-red text-white font-oswald uppercase tracking-widest py-3 hover:bg-red-700 transition-colors">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-vibe-dark3 bg-vibe-dark">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-vibe-muted text-xs">
          <Logo width={100} height={12} />
          <div>© 2025 Вайбкодинг. Все права защищены.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-vibe-red transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-vibe-red transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
