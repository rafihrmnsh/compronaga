import type { ReactNode } from "react";

export default function Section({
  id, eyebrow, title, intro, children, tone = "white",
}: { id?: string; eyebrow?: string; title: string; intro?: string; children: ReactNode; tone?: "white" | "mist" | "navy" }) {
  const bg = tone === "mist" ? "bg-mist" : tone === "navy" ? "bg-navy-900 text-white" : "bg-white";
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`${bg} py-16 sm:py-20`}>
      <div className="container-x">
        <div className="max-w-2xl" data-reveal>
          {eyebrow && (
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
              <span aria-hidden="true" className="h-0.5 w-8 bg-brand-600" />{eyebrow}
            </p>
          )}
          <h2 id={id ? `${id}-title` : undefined} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className={`mt-4 text-base leading-relaxed ${tone === "navy" ? "text-slate-300" : "text-slate-600"}`}>{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
