import { useState } from "react";
import { Button } from "@/components/ui/button";
import { products, categories, type Product, type Category } from "@/data/products";

type Step = 0 | 1 | 2 | 3;

interface Answers {
  category?: Category;
  budget?: "under100" | "100-200" | "200plus";
  use?: "cooking" | "salad-snack" | "wellness";
}

export function RecommendationWizard() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>({});

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const recs: Product[] = (() => {
    if (step !== 3) return [];
    return products
      .filter((p) => {
        if (answers.category && p.category !== answers.category) return false;
        const num = parseFloat(p.price.replace(/[^\d.]/g, ""));
        if (answers.budget === "under100" && num >= 100) return false;
        if (answers.budget === "100-200" && (num < 100 || num > 200)) return false;
        if (answers.budget === "200plus" && num < 200) return false;
        if (answers.use === "salad-snack" && p.category !== "Flavoured Salt") return false;
        if (answers.use === "wellness" && p.category !== "Herbs") return false;
        return true;
      })
      .slice(0, 3);
  })();

  return (
    <section id="recommend" className="relative bg-warm-drift px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="reveal mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Personal assistant
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">Find Your Perfect Product</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A few quick questions and we'll suggest what's right for you.
          </p>
        </div>

        <div className="reveal rounded-3xl border border-border bg-card/80 p-8 shadow-[var(--shadow-card)] backdrop-blur md:p-10">
          {step === 0 && (
            <Step
              title="What are you looking for?"
              options={categories}
              onSelect={(v) => {
                setAnswers({ ...answers, category: v as Category });
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <Step
              title="How will you use it?"
              options={["cooking", "salad-snack", "wellness"]}
              labels={["Everyday cooking", "Salads & snacks", "Wellness & health"]}
              onSelect={(v) => {
                setAnswers({ ...answers, use: v as Answers["use"] });
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <Step
              title="Budget per pack?"
              options={["under100", "100-200", "200plus"]}
              labels={["Under ₹100", "₹100 – ₹200", "₹200+"]}
              onSelect={(v) => {
                setAnswers({ ...answers, budget: v as Answers["budget"] });
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="mb-2 text-2xl font-bold">Our recommendations for you</h3>
              <p className="mb-6 text-muted-foreground">Based on your taste & needs.</p>
              {recs.length === 0 ? (
                <p className="text-muted-foreground">
                  No exact match — try different answers.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-3">
                  {recs.map((p) => (
                    <div
                      key={p.id}
                      className="product-card overflow-hidden rounded-xl border border-border bg-card"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                      />
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-wider text-accent">
                          {p.category}
                        </p>
                        <h4 className="mt-1 text-sm font-semibold line-clamp-2">{p.name}</h4>
                        <p className="mt-1 font-bold text-primary">{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-center">
                <Button variant="outline" onClick={reset} className="btn-premium-hover">
                  Start over
                </Button>
              </div>
            </div>
          )}

          {step < 3 && (
            <div className="mt-8 flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i <= step ? "w-8 bg-primary" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Step({
  title,
  options,
  labels,
  onSelect,
  onBack,
}: {
  title: string;
  options: readonly string[] | string[];
  labels?: string[];
  onSelect: (v: string) => void;
  onBack?: () => void;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="mb-6 text-center text-2xl font-bold">{title}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="btn-premium-hover rounded-xl border-2 border-border bg-background p-5 text-center font-medium capitalize transition hover:border-primary hover:bg-primary/5"
          >
            {labels?.[i] ?? opt}
          </button>
        ))}
      </div>
      {onBack && (
        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
