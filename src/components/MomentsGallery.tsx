import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import m1 from "@/assets/moment-1.jpg";
import m2 from "@/assets/moment-2.jpg";
import m3 from "@/assets/moment-3.jpg";
import m4 from "@/assets/moment-4.jpg";
import m5 from "@/assets/moment-5.jpg";
import m6 from "@/assets/moment-6.jpg";
import m7 from "@/assets/moment-7.jpg";

const moments = [
  { src: m1, caption: "Hon’ble Leaders Supporting Natural Living" },
  { src: m2, caption: "Encouraging Organic Lifestyle" },
  { src: m3, caption: "Building Trust Through Quality" },
  { src: m4, caption: "Recognized for Excellence" },
  { src: m5, caption: "Empowering Local Communities" },
  { src: m6, caption: "Celebrating Achievements & Recognition" },
  { src: m7, caption: "Connecting Tradition with Modern Impact" },
];

export function MomentsGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const next = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % moments.length));
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + moments.length) % moments.length,
    );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex]);

  return (
    <section
      id="trust"
      className="relative px-4 py-24 md:px-6 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #faf5ec 0%, #f5ecdc 55%, #f1e6d1 100%)",
      }}
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
            Proud Moments
          </p>
          <h2 className="text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
            Trusted by leaders,{" "}
            <span className="italic text-amber-700">loved by families</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-stone-700/80 md:text-lg">
            Meaningful moments from our journey — recognition, milestones, and
            memories that shape the story of our brand.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moments.map((m, i) => (
            <figure
              key={i}
              onClick={() => setActiveIndex(i)}
              className="reveal group relative cursor-zoom-in overflow-hidden rounded-3xl border border-amber-900/10 bg-white shadow-[0_10px_40px_-15px_rgba(120,70,20,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(120,70,20,0.55)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={m.src}
                  alt={m.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-base font-semibold leading-snug drop-shadow md:text-lg">
                  {m.caption}
                </h3>
                <span className="mt-3 block h-0.5 w-10 origin-left scale-x-0 bg-amber-400 transition-transform duration-500 group-hover:scale-x-100" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-300"
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <figure
            key={activeIndex}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto flex max-h-[90vh] max-w-6xl flex-col items-center animate-in zoom-in-95 fade-in duration-300"
          >
            <img
              src={moments[activeIndex].src}
              alt={moments[activeIndex].caption}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold md:text-2xl">
                {moments[activeIndex].caption}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                {activeIndex + 1} / {moments.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
