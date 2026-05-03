import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CAR_IMG = "https://cdn.poehali.dev/projects/1dedfde7-f9bf-4483-9071-fbbd19a5cd26/files/fd4db5ef-a9de-4b71-b4b0-a5a337e0a943.jpg";
const AERO_IMG = "https://cdn.poehali.dev/projects/1dedfde7-f9bf-4483-9071-fbbd19a5cd26/files/523218b7-5a82-44a7-a17b-371b7daefa2a.jpg";
const FACTORY_IMG = "https://cdn.poehali.dev/projects/1dedfde7-f9bf-4483-9071-fbbd19a5cd26/files/c722d47d-bea0-4686-ae25-5e5f62c2129e.jpg";

const models = [
  {
    name: "Jesko Absolut",
    power: "1600 л.с.",
    speed: "330+ км/ч",
    engine: "5.0L Twin-Turbo V8",
    desc: "Самый быстрый серийный Koenigsegg в истории. Создан для абсолютного рекорда скорости.",
    tag: "РЕКОРДСМЕН",
  },
  {
    name: "Regera",
    power: "1500 л.с.",
    speed: "400+ км/ч",
    engine: "5.0L V8 + 3 электро",
    desc: "Гибридный мегакар с прямым приводом. Инновационная трансмиссия без традиционных передач.",
    tag: "ГИБРИД",
  },
  {
    name: "CC850",
    power: "1385 л.с.",
    speed: "300+ км/ч",
    engine: "5.0L Twin-Turbo V8",
    desc: "Дань уважения первому Koenigsegg CC8S. Ручная коробка передач в XXI веке.",
    tag: "НАСЛЕДИЕ",
  },
];

const techFeatures = [
  {
    icon: "Wind",
    title: "Активная аэродинамика",
    desc: "Динамически изменяемые поверхности адаптируются в реальном времени — прижимная сила до 800 кг при полной скорости.",
  },
  {
    icon: "Layers",
    title: "Карбоновый монокок",
    desc: "Ультралёгкий углеродный каркас весом менее 120 кг обеспечивает максимальную жёсткость при минимальной массе.",
  },
  {
    icon: "Zap",
    title: "KERS — рекуперация",
    desc: "Система кинетической рекуперации энергии заряжает батарею в зонах торможения и ускоряет в поворотах.",
  },
  {
    icon: "Shield",
    title: "Воздушный нож",
    desc: "Запатентованная система воздушных каналов под кузовом создаёт низкое давление, буквально «прижимая» автомобиль к дороге.",
  },
];

const timeline = [
  { year: "1994", event: "Кристиан фон Кёнигсег основывает компанию в Ängelholm, Швеция. Мечта о шведском суперкаре." },
  { year: "2002", event: "CC8S — первый серийный Koenigsegg. Мировой рекорд мощности на литр для серийного авто." },
  { year: "2005", event: "CCR устанавливает мировой рекорд скорости — 387,87 км/ч. Bugatti Veyron ещё не вышел." },
  { year: "2014", event: "One:1 — первый в мире мегакар 1:1 (л.с. к кг). 1341 л.с., 1341 кг." },
  { year: "2017", event: "Agera RS достигает 457,49 км/ч на дороге общего пользования в Неваде. Мировой рекорд." },
  { year: "2024", event: "Jesko Absolut. Расчётная скорость 330+ км/ч. Новая глава шведской легенды." },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Главная" },
    { id: "models", label: "Модели" },
    { id: "history", label: "История" },
    { id: "tech", label: "Технологии" },
  ];

  return (
    <div className="bg-kg-black text-kg-white font-montserrat overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 60 ? "bg-kg-black/95 backdrop-blur-sm border-b border-kg-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 border-kg-orange rotate-45 group-hover:bg-kg-orange transition-colors duration-300" />
            <span className="font-bebas text-2xl tracking-widest text-kg-white">KOENIGSEGG</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium tracking-widest uppercase text-kg-gray hover:text-kg-orange transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-kg-orange group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-kg-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-transform origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-current transition-transform origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-kg-dark border-t border-kg-border px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm font-medium tracking-widest uppercase text-kg-gray hover:text-kg-orange transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <img src={CAR_IMG} alt="Koenigsegg" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-kg-black/70 via-kg-black/40 to-kg-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-kg-black/80 via-transparent to-kg-black/40" />
        </div>

        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,69,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,69,0,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 opacity-0" style={{ animation: "fade-up 0.8s ease-out 0.2s forwards" }}>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-orange border border-kg-orange/50 px-4 py-2">
                Швеция · Основан в 1994
              </span>
            </div>

            <h1
              className="font-bebas leading-none tracking-wide text-kg-white opacity-0 mb-4"
              style={{
                fontSize: "clamp(4rem, 12vw, 10rem)",
                animation: "fade-up 0.8s ease-out 0.4s forwards",
              }}
            >
              МАСТЕРА
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kg-orange to-kg-amber">
                СКОРОСТИ
              </span>
            </h1>

            <p
              className="text-lg text-kg-gray max-w-xl leading-relaxed opacity-0 mb-10"
              style={{ animation: "fade-up 0.8s ease-out 0.6s forwards" }}
            >
              Каждый Koenigsegg — это 30 лет инженерного безумия, сжатых в углерод и сталь. Не просто автомобиль — квинтэссенция скорости.
            </p>

            <div
              className="flex flex-wrap gap-4 opacity-0"
              style={{ animation: "fade-up 0.8s ease-out 0.8s forwards" }}
            >
              <button
                onClick={() => scrollTo("models")}
                className="group relative px-8 py-4 bg-kg-orange text-white font-semibold tracking-widest uppercase text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,69,0,0.6)]"
              >
                <span className="relative z-10">Смотреть модели</span>
                <div className="absolute inset-0 bg-kg-amber translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollTo("tech")}
                className="px-8 py-4 border border-white/30 text-kg-white font-semibold tracking-widest uppercase text-sm hover:border-kg-orange hover:text-kg-orange transition-all duration-300"
              >
                Технологии
              </button>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-kg-border/40 bg-kg-black/60 backdrop-blur-sm opacity-0"
          style={{ animation: "fade-in 1s ease-out 1.2s forwards" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "1600", unit: " л.с.", label: "Максимальная мощность" },
              { val: "457", unit: " км/ч", label: "Мировой рекорд скорости" },
              { val: "30+", unit: " лет", label: "Опыт разработки" },
              { val: "<1c", unit: "", label: "0–100 км/ч у Regera" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-bebas text-3xl md:text-4xl text-kg-orange">
                  {s.val}<span className="text-xl text-kg-amber">{s.unit}</span>
                </div>
                <div className="text-xs text-kg-gray tracking-wider uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="py-32 px-6 bg-kg-dark">
        <div className="max-w-7xl mx-auto">
          <AnimSection>
            <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-orange mb-3">Линейка</p>
                <h2
                  className="font-bebas leading-none text-kg-white"
                  style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                >
                  НАШИ МОДЕЛИ
                </h2>
              </div>
              <div className="w-32 h-px bg-gradient-to-r from-kg-orange to-transparent" />
            </div>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((model, i) => (
              <AnimSection key={model.name}>
                <div
                  className="group relative bg-kg-card border border-kg-border overflow-hidden cursor-pointer hover:border-kg-orange/50 transition-all duration-500"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-kg-orange to-kg-amber transition-all duration-700" />
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold tracking-[0.25em] text-kg-orange uppercase border border-kg-orange/30 px-3 py-1">
                        {model.tag}
                      </span>
                      <Icon name="ChevronRight" size={20} className="text-kg-border group-hover:text-kg-orange group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <h3 className="font-bebas text-4xl text-kg-white mb-2 tracking-wide">{model.name}</h3>
                    <p className="text-xs text-kg-gray uppercase tracking-widest mb-6">{model.engine}</p>
                    <p className="text-sm text-kg-gray leading-relaxed mb-8">{model.desc}</p>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-kg-border">
                      <div>
                        <div className="font-bebas text-3xl text-kg-orange">{model.power}</div>
                        <div className="text-xs text-kg-gray uppercase tracking-wider">Мощность</div>
                      </div>
                      <div>
                        <div className="font-bebas text-3xl text-kg-white">{model.speed}</div>
                        <div className="text-xs text-kg-gray uppercase tracking-wider">Макс. скорость</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,69,0,0.08) 0%, transparent 70%)" }}
                  />
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={FACTORY_IMG} alt="Factory" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-kg-black via-transparent to-kg-black" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimSection>
            <div className="text-center mb-20">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-orange mb-3">Наследие</p>
              <h2
                className="font-bebas leading-none text-kg-white"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                ИСТОРИЯ ПОБЕД
              </h2>
            </div>
          </AnimSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-kg-orange/80 via-kg-orange/30 to-transparent hidden md:block" />
            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <AnimSection key={item.year}>
                  <div className={`flex items-center gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-row`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-left`}>
                      <div className="font-bebas text-6xl text-kg-orange/20 leading-none mb-1">{item.year}</div>
                      <p className="text-sm text-kg-gray leading-relaxed max-w-sm">{item.event}</p>
                    </div>
                    <div className="hidden md:flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 bg-kg-orange rounded-full shadow-[0_0_20px_rgba(255,69,0,0.8)]" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="py-32 px-6 bg-kg-dark">
        <div className="max-w-7xl mx-auto">
          <AnimSection>
            <div className="text-center mb-20">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-orange mb-3">Инновации</p>
              <h2
                className="font-bebas leading-none text-kg-white"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                ТЕХНОЛОГИИ
              </h2>
              <p className="text-kg-gray mt-4 max-w-2xl mx-auto">
                Каждый элемент аэродинамической системы Koenigsegg — результат тысяч часов симуляций и испытаний в аэродинамической трубе.
              </p>
            </div>
          </AnimSection>

          <AnimSection className="mb-20">
            <div className="relative overflow-hidden">
              <img src={AERO_IMG} alt="Aerodynamics" className="w-full h-80 md:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-kg-dark via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-block bg-kg-orange/90 backdrop-blur-sm px-6 py-3">
                  <span className="font-bebas text-xl tracking-widest text-white">АЭРОДИНАМИЧЕСКИЙ ТОННЕЛЬ · СИМУЛЯЦИЯ CFD</span>
                </div>
              </div>
            </div>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techFeatures.map((feat, i) => (
              <AnimSection key={feat.title}>
                <div
                  className="group flex gap-6 p-8 bg-kg-card border border-kg-border hover:border-kg-orange/40 transition-all duration-500 relative overflow-hidden"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 border border-kg-orange/40 flex items-center justify-center group-hover:bg-kg-orange/10 group-hover:border-kg-orange transition-all duration-300">
                      <Icon name={feat.icon} fallback="Wind" size={24} className="text-kg-orange" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-kg-white tracking-wide mb-3">{feat.title}</h3>
                    <p className="text-sm text-kg-gray leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-kg-orange/20 group-hover:border-t-kg-orange/50 transition-colors duration-300" />
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection className="mt-24 text-center">
            <div className="border border-kg-border p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-kg-orange/5 via-transparent to-transparent" />
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-gray mb-4 relative z-10">Прижимная сила при 300 км/ч</p>
              <div
                className="font-bebas leading-none text-transparent bg-clip-text bg-gradient-to-r from-kg-orange via-kg-amber to-kg-orange relative z-10"
                style={{ fontSize: "clamp(5rem, 20vw, 16rem)" }}
              >
                800 КГ
              </div>
              <p className="text-kg-gray mt-4 max-w-lg mx-auto text-sm relative z-10">
                Активные аэродинамические элементы Koenigsegg реагируют за 20 миллисекунд — быстрее, чем моргает человеческий глаз.
              </p>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-kg-border bg-kg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-kg-orange rotate-45" />
            <span className="font-bebas text-xl tracking-widest text-kg-white">KOENIGSEGG</span>
          </div>
          <p className="text-xs text-kg-gray tracking-wider">ÄNGELHOLM, SWEDEN · С 1994 ГОДА</p>
          <div className="flex gap-6 flex-wrap justify-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs text-kg-gray hover:text-kg-orange transition-colors tracking-widest uppercase"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}