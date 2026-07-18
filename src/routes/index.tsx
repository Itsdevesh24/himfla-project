import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { ChatBot } from "@/components/ChatBot";
import { categories, type Category, type Product } from "@/data/products";
import { getProducts } from "@/services/productService";
import {
  Search,
  ShoppingBag,
  Home as HomeIcon,
  LayoutGrid,
  ClipboardList,
  User,
  Star,
  ChevronDown,
  Leaf,
} from "lucide-react";
import himflaLogo from "@/assets/himfla-logo.png";
import m1 from "@/assets/moment-1.jpg";
import m2 from "@/assets/moment-2.jpg";
import m3 from "@/assets/moment-3.jpg";
import m4 from "@/assets/moment-4.jpg";
import m5 from "@/assets/moment-5.jpg";
import m6 from "@/assets/moment-6.jpg";
import m7 from "@/assets/moment-7.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const heroVideos = ["/hero-a.mp4", "/hero-1.mp4", "/hero-2.mp4"];

const moments = [
  { src: m1, caption: "Hon’ble Leaders" },
  { src: m2, caption: "Organic Lifestyle" },
  { src: m3, caption: "Trusted Quality" },
  { src: m4, caption: "Excellence" },
  { src: m5, caption: "Local Communities" },
  { src: m6, caption: "Achievements" },
  { src: m7, caption: "Tradition & Impact" },
];

const catChips: { name: Category | "All"; emoji: string }[] = [
  { name: "All", emoji: "✨" },
  { name: "Flavoured Salt", emoji: "🧂" },
  { name: "Spices", emoji: "🌶️" },
  { name: "Herbs", emoji: "🌿" },
  { name: "Pulses", emoji: "🫘" },
  { name: "Millet & Rice", emoji: "🌾" },
];

const testimonials = [
  { name: "Karan Sahu", role: "Delhi", text: "Best organic salt I've tried — pure & authentic.", rating: 5 },
  { name: "Devesh Pathak.", role: "Haldwani", text: "Hemp seed salt is now a staple at home.", rating: 5 },
  { name: "Priya N.", role: "Dehradun", text: "Real taste of Uttarakhand. Unmatched.", rating: 5 },
  { name: "Sneha K.", role: "Bangalore", text: "Beautifully packaged & ethically sourced.", rating: 5 },
];

function Index() {
  useRevealOnScroll();
  const [activeCat, setActiveCat] = useState<Category | "All">("All");
  const [visible, setVisible] = useState(12);
  const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const suggestions =
  search.trim() === ""
    ? []
    : products
        .filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 6);
  const [storyOpen, setStoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [videoIdx, setVideoIdx] = useState(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  async function loadProducts() {
    const data = await getProducts();

    const formattedProducts: Product[] = data.map((item) => ({
      id: item.id,
      name: item.name,
      price: `₹${item.price}`,
      image: item.image_url,
      category: item.category as Category,
    }));
    console.log(formattedProducts);
    console.log("Total:", formattedProducts.length);
    setProducts(formattedProducts);
    setLoading(false);
  }

  loadProducts();
}, []);
  const filtered = products.filter((p) => {
  console.log("Search:", search);
  console.log("Product:", p.name);

  const matchesCategory =
    activeCat === "All" || p.category === activeCat;

  const matchesSearch =
    p.name.toLowerCase().includes(search.toLowerCase());

  console.log("Match:", matchesSearch);

  return matchesCategory && matchesSearch;
});

console.log("Filtered Products =", filtered);

const shown = filtered.slice(0, visible);

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + 8, filtered.length));
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  useEffect(() => {
    setVisible(12);
  }, [activeCat]);

  // Auto-rotate hero videos with fade
  useEffect(() => {
    const id = setInterval(() => {
      setVideoIdx((i) => (i + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fbf6ec] pb-24">
      {/* APP HEADER */}
      <header className="sticky top-0 z-40 border-b border-amber-900/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-3 py-2.5">
          <a href="#top" className="shrink-0">
            <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-amber-700/40 bg-amber-50 shadow-md shadow-amber-900/10 ring-1 ring-amber-200/60">
              <img
                src={himflaLogo}
                alt="HIMFLA"
                className="h-11 w-11 rounded-full object-contain"
              />
            </span>
          </a>
          <label className="relative flex flex-1 items-center gap-2 rounded-full border border-amber-900/15 bg-amber-50/60 px-3 py-2 text-sm text-stone-700 focus-within:border-amber-600">
            <Search className="h-4 w-4 text-amber-700" />
            <input
               type="search"
               placeholder="Search HIMFLA products..."
                value={search}
                onChange={(e) => {
                 console.log(e.target.value);
                 setSearch(e.target.value);
}}
                className="w-full bg-transparent text-sm outline-none placeholder:text-stone-500"
              />
          </label>
          {suggestions.length > 0 && (
  <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-amber-200 bg-white shadow-xl">
    {suggestions.map((item) => (
     <button
  key={item.id}
  onClick={() => setSearch(item.name)}
  className="flex w-full items-center gap-3 border-b border-amber-100 px-4 py-3 hover:bg-amber-50 last:border-b-0"
>
  <img
    src={item.image}
    alt={item.name}
    className="h-10 w-10 rounded-lg object-cover border"
  />

  <div className="flex-1 text-left">
    <p className="text-sm font-medium text-stone-800">
      {item.name}
    </p>

    <p className="text-xs text-amber-700 font-semibold">
      {item.price}
    </p>
  </div>
</button>
    ))}
  </div>
)}
        </div>
      </header>

      {/* HERO VIDEO — cinematic crossfade slideshow */}
      <section id="top" className="relative h-[88vh] min-h-[520px] w-full overflow-hidden bg-stone-950">
        {heroVideos.map((src, i) => (
          <video
            key={src}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === videoIdx ? 1 : 0 }}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ))}
        {/* cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/30 to-stone-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 px-8 py-10">
            <h1 className="font-himfla text-6xl font-black tracking-[0.18em] drop-shadow-2xl md:text-8xl">
              HIMFLA
            </h1>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.4em] text-amber-200/95 md:text-xs">
              Since 2013 · Devbhoomi Uttarakhand
            </p>
            <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
            <p className="font-tagline mx-auto mt-5 max-w-md text-lg italic leading-relaxed text-white/95 md:text-2xl">
              From the heart of the Himalayas, to the soul of your home.
            </p>
            <button
              type="button"
              className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-300/60 bg-gradient-to-r from-emerald-500/90 via-emerald-400/90 to-teal-500/90 px-8 py-3 text-sm font-extrabold uppercase tracking-[0.3em] text-white shadow-[0_0_45px_rgba(52,211,153,0.65)] transition-all hover:scale-105 hover:shadow-[0_0_70px_rgba(52,211,153,0.9)] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Leaf className="h-4 w-4 animate-pulse" />
              Save the Glaciers
            </button>
          </div>
        </div>

        {/* slideshow dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroVideos.map((_, i) => (
            <button
              key={i}
              onClick={() => setVideoIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === videoIdx ? "w-8 bg-amber-300" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORY SCROLL */}
      <section className="sticky top-[64px] z-30 border-b border-amber-900/10 bg-[#fbf6ec]/95 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-3xl gap-2 overflow-x-auto px-3 py-3">
          {catChips.map((c) => {
            const active = activeCat === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCat(c.name as Category | "All")}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                  active
                    ? "border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-900/30"
                    : "border-amber-900/15 bg-white text-stone-700"
                }`}
              >
                <span className="text-base">{c.emoji}</span>
                {c.name}
              </button>
            );
          })}
        </div>
      </section>


       <section id="collection" className="mx-auto max-w-3xl px-3 pt-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-base font-bold text-stone-900">
            {activeCat === "All" ? "Explore HIMFLA" : activeCat}
          </h2>
          <span className="text-xs text-stone-500">{filtered.length} items</span>
        </div>
{loading && (
  <p className="text-center text-stone-500">
    Loading products...
  </p>
)}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition active:scale-[0.98]"
            >
              <div className="aspect-square overflow-hidden bg-amber-50">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5">
                <p className="line-clamp-2 min-h-[2.2rem] text-[12px] leading-tight text-stone-700">
                  {p.name}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-700">{p.price}</span>
                  <button className="rounded-full bg-amber-600 p-1.5 text-white active:scale-95">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible < filtered.length && (
          <div ref={sentinelRef} className="flex justify-center py-6 text-sm text-stone-500">
            Loading more…
          </div>
        )}
      </section>

      {/* TRUST STORIES (horizontal) */}
      <section className="mx-auto max-w-3xl px-3 pt-5">
        <h2 className="mb-3 text-base font-bold text-stone-900">Trusted Moments</h2>
        <div className="no-scrollbar -mx-3 flex gap-3 overflow-x-auto px-3 pb-2">
          {moments.map((m, i) => (
            <figure
              key={i}
              className="group relative shrink-0 overflow-hidden rounded-2xl shadow-md"
              style={{ width: "140px" }}
            >
              <div className="aspect-[3/4] w-[140px] overflow-hidden bg-amber-100">
                <img
                  src={m.src}
                  alt={m.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-active:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-2.5 text-[11px] font-semibold leading-tight text-white">
                {m.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CINEMATIC VIDEO SHOWCASE */}
      {/* <section className="mx-auto mt-8 max-w-3xl px-3">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-base font-bold text-stone-900">Cinematic Himalayas</h2>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700">
            Devbhoomi · Uttarakhand
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { src: "/hero-a.mp4", label: "Sacred Peaks", className: "sm:col-span-2 aspect-[16/9]" },
            { src: "/hero-1.mp4", label: "Pure Heritage", className: "aspect-[4/5]" },
            { src: "/hero-2.mp4", label: "Living Traditions", className: "aspect-[4/5]" },
          ].map((v) => (
            <figure
              key={v.src}
              className={`group relative overflow-hidden rounded-2xl border border-amber-900/10 bg-stone-900 shadow-md ${v.className}`}
            >
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out [will-change:opacity]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200/90">
                  Himfla Stories
                </p>
                <p className="font-himfla text-sm font-bold tracking-[0.15em] text-white">
                  {v.label}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section> */}

      {/* <section id="collection" className="mx-auto max-w-3xl px-3 pt-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-base font-bold text-stone-900">
            {activeCat === "All" ? "Explore HIMFLA" : activeCat}
          </h2>
          <span className="text-xs text-stone-500">{filtered.length} items</span>
        </div>
{loading && (
  <p className="text-center text-stone-500">
    Loading products...
  </p>
)}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition active:scale-[0.98]"
            >
              <div className="aspect-square overflow-hidden bg-amber-50">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5">
                <p className="line-clamp-2 min-h-[2.2rem] text-[12px] leading-tight text-stone-700">
                  {p.name}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-700">{p.price}</span>
                  <button className="rounded-full bg-amber-600 p-1.5 text-white active:scale-95">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible < filtered.length && (
          <div ref={sentinelRef} className="flex justify-center py-6 text-sm text-stone-500">
            Loading more…
          </div>
        )}
      </section> */}

      {/* STORY (minimal expandable) */}
      <section id="story" className="mx-auto mt-8 max-w-3xl px-3">
        <div className="rounded-2xl border border-amber-900/10 bg-white p-4 shadow-sm">
          <button
            onClick={() => setStoryOpen((v) => !v)}
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700">
                Our Story
              </p>
              <h3 className="mt-1 text-base font-bold text-stone-900">
                Purity from Devbhoomi Uttarakhand
              </h3>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-amber-700 transition-transform ${storyOpen ? "rotate-180" : ""}`}
            />
          </button>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            We bring the purity of the Himalayas to your home — sourced directly from local farmers
            of Uttarakhand since 2013.
          </p>
          {storyOpen && (
            <p className="mt-3 text-sm leading-relaxed text-stone-600 animate-in fade-in slide-in-from-top-2 duration-300">
              Every jar carries a story — of women rising, of mountains protected, of heritage kept
              alive. Stone-ground in silbatta, never adulterated, always authentic.
            </p>
          )}
        </div>
      </section>

      {/* TESTIMONIALS (horizontal swipe) */}
      <section className="mx-auto mt-8 max-w-3xl px-3">
        <h2 className="mb-3 text-base font-bold text-stone-900">Loved by Customers</h2>
        <div className="no-scrollbar -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="snap-start shrink-0 rounded-2xl border border-amber-900/10 bg-white p-4 shadow-sm"
              style={{ width: "260px" }}
            >
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-2 text-sm leading-relaxed text-stone-700">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-3 border-t border-amber-900/10 pt-2 text-xs">
                <span className="font-bold text-stone-900">{t.name}</span>
                <span className="text-stone-500"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="mx-auto mt-10 max-w-3xl px-4 pb-6 text-center">
        <img
          src={himflaLogo}
          alt="HIMFLA"
          className="mx-auto h-20 w-20 rounded-full object-contain shadow-md"
        />
        <p className="font-tagline mt-3 text-base italic text-amber-800">
          Jai Himal · Jai Himfla
        </p>
        <p className="mt-2 font-tagline text-xs italic text-amber-700/80">
          Save the Glaciers
        </p>
        <p className="mt-2 text-[10px] text-stone-500">
          © 2023 HIMFLA · Devbhoomi Uttarakhand
        </p>
      </footer>

      {/* BOTTOM NAV */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-amber-900/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          {[
            { icon: HomeIcon, label: "Home", href: "#top" },
            { icon: LayoutGrid, label: "Categories", href: "#collection" },
            { icon: ShoppingBag, label: "Cart", href: "#cart" },
            { icon: ClipboardList, label: "My Orders", href: "#orders" },
            { icon: User, label: "Profile", href: "#profile" },
          ].map((it) => {
            const Icon = it.icon;
            const active = activeTab === it.label;
            return (
              <a
                key={it.label}
                href={it.href}
                onClick={() => setActiveTab(it.label)}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition active:scale-95 ${
                  active ? "text-amber-700" : "text-stone-500"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                    active ? "bg-amber-100" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                {it.label}
              </a>
            );
          })}
        </div>
      </nav>

      <ChatBot />
    </div>
  );
}
