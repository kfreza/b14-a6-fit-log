import type { PlanItem } from "@/components/providers/PlanProvider";

export default function MetricsSummary({ items }: { items: PlanItem[] }) {
  const metrics = [
    { label: "Exercises", value: items.length, accent: true },
    { label: "Minutes", value: items.reduce((sum, w) => sum + w.duration, 0) },
    { label: "Calories", value: items.reduce((sum, w) => sum + w.caloriesBurned, 0) },
  ];

  return (
    <section
      aria-label="Today's plan summary"
      className="grid grid-cols-3 rounded-2xl border border-[#232732] bg-surface-2 px-4 pb-6 pt-7 sm:px-6 sm:pt-8"
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`flex flex-col gap-1 ${i > 0 ? "border-l border-[#232732]/60 pl-4 sm:pl-8" : "pr-4 sm:pr-6"}`}
        >
          <span className="text-xs leading-4 text-subtle">{m.label}</span>
          <span
            className={`font-display text-3xl font-bold leading-10 sm:text-4xl ${m.accent ? "text-accent" : "text-white"}`}
          >
            {m.value}
          </span>
        </div>
      ))}
    </section>
  );
}
