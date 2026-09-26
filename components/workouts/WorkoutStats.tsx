import Image from "next/image";
import type { Workout } from "@/lib/types";

type Props = {
  workout: Pick<Workout, "duration" | "caloriesBurned" | "rating">;
  tone?: "muted" | "accent";
  className?: string;
};

export default function WorkoutStats({ workout, tone = "muted", className = "" }: Props) {
  const suffix = tone === "accent" ? "-accent" : "";
  const stats = [
    { icon: "clock", label: `${workout.duration} min`, sr: "Duration" },
    { icon: "flame", label: `${workout.caloriesBurned} kcal`, sr: "Calories" },
    { icon: "star", label: workout.rating.toFixed(1), sr: "Rating" },
  ];

  return (
    <ul className={`flex flex-wrap items-center ${tone === "accent" ? "gap-3" : "gap-4"} ${className}`}>
      {stats.map((s) => (
        <li key={s.icon} className="flex items-center gap-1.5">
          <Image src={`/images/icon-${s.icon}${suffix}.svg`} alt="" width={14} height={14} className="size-3.5" />
          <span className="sr-only">{s.sr}: </span>
          <span className={`text-xs leading-4 ${tone === "accent" ? "text-[#d1d5db]" : "text-muted"}`}>
            {s.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
