import { useMemo } from "react";

/** Soft floating spice-dust particles. Pure CSS, GPU-friendly. */
export function Particles({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 5;
        const left = Math.random() * 100;
        const delay = Math.random() * 18;
        const duration = 18 + Math.random() * 22;
        const hues = [
          "oklch(0.65 0.18 50)",
          "oklch(0.7 0.16 80)",
          "oklch(0.55 0.12 130)",
          "oklch(0.6 0.2 30)",
        ];
        const color = hues[i % hues.length];
        return { size, left, delay, duration, color, id: i };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background: p.color,
            opacity: 0.5,
            filter: "blur(0.5px)",
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
