import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/lib/types";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout, priority = false }: { workout: Workout; priority?: boolean }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-200 hover:-translate-y-1 hover:border-lime/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[#1f232b]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex flex-col gap-1">
          <ul className="flex flex-wrap items-center gap-2">
            {workout.muscleGroups.map((group) => (
              <li
                key={group}
                className="rounded-full bg-lime px-2.5 py-0.5 text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-black"
              >
                {group}
              </li>
            ))}
          </ul>
          <h3 className="pt-2 font-display text-lg font-bold uppercase leading-7 tracking-[0.45px] text-white">
            {workout.name}
          </h3>
          <p className="text-xs leading-4 text-muted">{workout.equipment}</p>
        </div>

        <WorkoutStats workout={workout} className="mt-4 border-t border-line-soft pt-3.25" />
      </div>
    </Link>
  );
}
