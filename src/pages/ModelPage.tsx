import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { models } from "@/data/models";
import Icon from "@/components/ui/icon";

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

export default function ModelPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const model = models.find((m) => m.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  if (!model) {
    return (
      <div className="min-h-screen bg-kg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-bebas text-6xl text-kg-orange mb-4">404</p>
          <p className="text-kg-gray mb-8">Модель не найдена</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-kg-orange text-white font-semibold tracking-widest uppercase text-sm"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = models.findIndex((m) => m.id === id);
  const prevModel = models[currentIndex - 1];
  const nextModel = models[currentIndex + 1];

  return (
    <div className="bg-kg-black text-kg-white font-montserrat overflow-x-hidden min-h-screen">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 60 ? "bg-kg-black/95 backdrop-blur-sm border-b border-kg-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 border-kg-orange rotate-45 group-hover:bg-kg-orange transition-colors duration-300" />
            <span className="font-bebas text-2xl tracking-widest text-kg-white">KOENIGSEGG</span>
          </button>
          <button
            onClick={() => navigate("/#models")}
            className="flex items-center gap-2 text-sm text-kg-gray hover:text-kg-orange transition-colors tracking-widest uppercase"
          >
            <Icon name="ArrowLeft" size={16} />
            Все модели
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <img
            src={model.image}
            alt={model.name}
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kg-black via-kg-black/50 to-kg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-kg-black/60 via-transparent to-transparent" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,69,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,69,0,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="opacity-0" style={{ animation: "fade-up 0.6s ease-out 0.1s forwards" }}>
            <span className="text-xs font-bold tracking-[0.3em] text-kg-orange border border-kg-orange/40 px-4 py-2 uppercase">
              {model.tag}
            </span>
          </div>
          <h1
            className="font-bebas leading-none text-kg-white mt-4 opacity-0"
            style={{
              fontSize: "clamp(4rem, 12vw, 9rem)",
              animation: "fade-up 0.7s ease-out 0.25s forwards",
            }}
          >
            {model.name}
          </h1>
          <div
            className="flex flex-wrap gap-6 mt-4 opacity-0"
            style={{ animation: "fade-up 0.7s ease-out 0.4s forwards" }}
          >
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={14} className="text-kg-orange" />
              <span className="text-sm text-kg-gray">{model.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={14} className="text-kg-orange" />
              <span className="text-sm text-kg-gray">{model.power}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Gauge" size={14} className="text-kg-orange" />
              <span className="text-sm text-kg-gray">{model.speed}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Settings" size={14} className="text-kg-orange" />
              <span className="text-sm text-kg-gray">{model.engine}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left — History */}
          <div className="lg:col-span-2">
            <AnimSection>
              <div className="mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-orange mb-4">История создания</p>
                <div className="w-16 h-px bg-kg-orange mb-6" />
                <p className="text-kg-gray leading-relaxed text-base">{model.history}</p>
              </div>
            </AnimSection>

            {/* Features */}
            <AnimSection>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-orange mb-6">Ключевые особенности</p>
              <div className="flex flex-col gap-6">
                {model.features.map((feat, i) => (
                  <div
                    key={feat.title}
                    className="group flex gap-6 p-6 bg-kg-card border border-kg-border hover:border-kg-orange/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-kg-orange/40 group-hover:border-kg-orange group-hover:bg-kg-orange/10 transition-all duration-300">
                      <span className="font-bebas text-xl text-kg-orange">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="font-bebas text-xl text-kg-white tracking-wide mb-2">{feat.title}</h3>
                      <p className="text-sm text-kg-gray leading-relaxed">{feat.desc}</p>
                    </div>
                    <div className="absolute top-0 left-0 w-0 group-hover:w-1 h-full bg-kg-orange transition-all duration-500" />
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>

          {/* Right — Specs */}
          <div>
            <AnimSection>
              <div className="sticky top-28">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-kg-orange mb-6">Технические характеристики</p>
                <div className="bg-kg-card border border-kg-border overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-kg-orange to-kg-amber" />
                  <div className="divide-y divide-kg-border">
                    {model.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between px-6 py-4 hover:bg-kg-orange/5 transition-colors">
                        <span className="text-xs text-kg-gray uppercase tracking-wider">{spec.label}</span>
                        <span className="font-bebas text-lg text-kg-white tracking-wide">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-kg-card border border-kg-border p-4 text-center">
                    <div className="font-bebas text-3xl text-kg-orange">{model.power}</div>
                    <div className="text-xs text-kg-gray uppercase tracking-wider mt-1">Мощность</div>
                  </div>
                  <div className="bg-kg-card border border-kg-border p-4 text-center">
                    <div className="font-bebas text-3xl text-kg-white">{model.speed}</div>
                    <div className="text-xs text-kg-gray uppercase tracking-wider mt-1">Макс. скорость</div>
                  </div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* NAVIGATION BETWEEN MODELS */}
      <section className="border-t border-kg-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {prevModel ? (
            <button
              onClick={() => navigate(`/model/${prevModel.id}`)}
              className="group flex items-center gap-4 p-4 border border-kg-border hover:border-kg-orange/50 transition-all duration-300 flex-1 max-w-xs"
            >
              <Icon name="ArrowLeft" size={20} className="text-kg-gray group-hover:text-kg-orange transition-colors flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs text-kg-gray uppercase tracking-wider mb-1">Предыдущая</div>
                <div className="font-bebas text-xl text-kg-white group-hover:text-kg-orange transition-colors">{prevModel.name}</div>
              </div>
            </button>
          ) : <div className="flex-1 max-w-xs" />}

          <button
            onClick={() => navigate("/#models")}
            className="px-6 py-3 border border-kg-orange/40 text-kg-orange font-semibold tracking-widest uppercase text-xs hover:bg-kg-orange hover:text-white transition-all duration-300"
          >
            Все модели
          </button>

          {nextModel ? (
            <button
              onClick={() => navigate(`/model/${nextModel.id}`)}
              className="group flex items-center gap-4 p-4 border border-kg-border hover:border-kg-orange/50 transition-all duration-300 flex-1 max-w-xs justify-end"
            >
              <div className="text-right">
                <div className="text-xs text-kg-gray uppercase tracking-wider mb-1">Следующая</div>
                <div className="font-bebas text-xl text-kg-white group-hover:text-kg-orange transition-colors">{nextModel.name}</div>
              </div>
              <Icon name="ArrowRight" size={20} className="text-kg-gray group-hover:text-kg-orange transition-colors flex-shrink-0" />
            </button>
          ) : <div className="flex-1 max-w-xs" />}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-kg-border bg-kg-black py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-kg-orange rotate-45" />
            <span className="font-bebas text-lg tracking-widest text-kg-white">KOENIGSEGG</span>
          </div>
          <p className="text-xs text-kg-gray tracking-wider">ÄNGELHOLM, SWEDEN · С 1994 ГОДА</p>
        </div>
      </footer>
    </div>
  );
}
