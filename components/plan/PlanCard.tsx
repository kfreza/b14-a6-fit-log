"use client";

import Image from "next/image";
import Link from "next/link";
import type { ListName, PlanItem } from "@/components/providers/PlanProvider";
import WorkoutStats from "@/components/workouts/WorkoutStats";

type Props = {
  item: PlanItem;
  variant: ListName;
  onDone: () => void;
  onRemove: () => void;
};

export default function PlanCard({ item, variant, onDone, onRemove }: Props) {
  const done = variant === "plan" && item.done;

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-[#14171e] p-4 transition-colors sm:flex-row sm:items-center sm:justify-between ${
        done ? "border-lime/30" : "border-[#232732]"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-[#1f2937] sm:w-36">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="144px"
            className={`object-cover ${done ? "opacity-50" : ""}`}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase leading-6 tracking-[0.4px] text-white">
            <span className={done ? "line-through decoration-lime/70" : ""}>{item.name}</span>
            {done && (
              <span className="rounded-full bg-lime-soft px-2 py-0.5 font-sans text-[10px] font-semibold normal-case tracking-normal text-lime">
                Done
              </span>
            )}
          </h2>
          <p className="text-xs font-semibold leading-4 text-subtle">{item.equipment}</p>
          <WorkoutStats workout={item} tone="accent" className="pt-1.5" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href={`/workouts/${item.id}`}
          className="btn btn-outline h-8.5 min-h-0 rounded-full border-line-strong px-4 text-xs font-normal text-white hover:border-lime hover:bg-transparent"
        >
          View Details
        </Link>
        {variant === "plan" && (
          <button
            type="button"
            onClick={onDone}
            disabled={done}
            className="btn h-8 min-h-0 gap-1.5 rounded-full border-none bg-accent px-4 text-xs font-semibold text-black shadow-sm hover:bg-lime disabled:bg-lime-soft disabled:text-lime"
          >
            <Image src="/images/icon-check.svg" alt="" width={14} height={14} className={`size-3.5 ${done ? "hidden" : ""}`} />
            {done ? "Completed" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="btn btn-ghost btn-sm btn-circle hover:bg-white/5"
        >
          <Image src="/images/icon-x.svg" alt="" width={16} height={16} className="size-4" />
        </button>
      </div>
    </article>
  );
}
