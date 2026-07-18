import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categories, products, type Category } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductShowcase() {
  const [active, setActive] = useState<Category | "All">("All");
  const { addToCart } = useCart();
  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="collection" className="relative px-6 py-24 md:py-32">
      <span id="best-sellers" className="block -mt-24 pt-24" aria-hidden />
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Our Collection
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Pure goodness, <span className="text-gradient-warm">crafted by nature</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Sourced directly from Himalayan farms — never blended, never adulterated.
          </p>
        </div>

        <div className="reveal mb-10 flex flex-wrap items-center justify-center gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`btn-premium-hover rounded-full border px-5 py-2 text-sm font-medium transition ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className="reveal product-card group overflow-hidden rounded-2xl border border-border bg-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
                  {p.category}
                </p>
                <h3 className="text-base font-semibold leading-tight line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{p.price}</span>
                  <Button
                   size="sm"
                   className="btn-premium-hover"
                   onClick={() => addToCart(p)}
           >
             Add to Cart
             </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
