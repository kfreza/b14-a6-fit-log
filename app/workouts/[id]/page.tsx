import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { getWorkout } from "@/lib/api";
import DetailActions from "@/components/workouts/DetailActions";

export async function generateMetadata(props: PageProps<"/workouts/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const workout = await getWorkout(id);
  return workout
    ? { title: workout.name, description: workout.description }
    : { title: "Workout not found" };
}

export default async function WorkoutDetailPage(props: PageProps<"/workouts/[id]">) {
  const { id } = await props.params;
  const workout = await getWorkout(id);
  if (!workout) notFound();

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating.toFixed(1) },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
      <Link
        href="/#library"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-lime"
      >
        <FiArrowLeft aria-hidden /> Back to library
      </Link>

      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] shadow-2xl shadow-black/25 lg:sticky lg:top-28 lg:self-start">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="pb-3 font-display text-3xl font-bold uppercase leading-10 tracking-[-0.9px] text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="max-w-xl pb-5 text-base leading-6 text-muted">{workout.description}</p>

          <ul className="flex flex-wrap gap-2.5 pb-7">
            {workout.muscleGroups.map((group) => (
              <li key={group} className="rounded-full bg-accent px-3.5 py-1 text-xs font-semibold leading-4 text-[#0f1115]">
                {group}
              </li>
            ))}
          </ul>

          <dl className="mb-8 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between gap-4 px-6 py-3.5 ${i > 0 ? "border-t border-[#1e2330]" : ""}`}
              >
                <dt className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-muted">{spec.label}</dt>
                <dd className="text-right text-sm font-medium leading-5 text-[#e5e7eb]">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <section className="flex flex-col gap-4 pb-9">
            <h2 className="text-base font-extrabold uppercase leading-6 tracking-[0.8px] text-white">Instructions</h2>
            <ol className="flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-[22.75px]">
                  <span className="shrink-0 text-muted">{i + 1}.</span>
                  <span className="text-[#d1d5db]">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <DetailActions workout={workout} />
        </div>
      </article>
    </div>
  );
}
