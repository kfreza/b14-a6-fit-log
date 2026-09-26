"use client";

import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import type { Workout } from "@/lib/types";

export type SortKey = "duration" | "calories" | "rating";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

const FIELD: Record<SortKey, (w: Workout) => number> = {
  duration: (w) => w.duration,
  calories: (w) => w.caloriesBurned,
  rating: (w) => w.rating,
};

export function sortWorkouts<T extends Workout>(items: T[], key: SortKey): T[] {
  const get = FIELD[key];
  return [...items].sort((a, b) => get(b) - get(a));
}

export default function SortDropdown({ value, onChange }: { value: SortKey; onChange: (key: SortKey) => void }) {
  const current = OPTIONS.find((o) => o.key === value)!;

  return (
    <div className="flex items-center gap-3 self-end sm:self-auto">
      <span className="text-xs leading-4 text-subtle">Sort By</span>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          aria-haspopup="listbox"
          aria-label={`Sort by ${current.label}`}
          className="flex h-8.5 min-w-23.25 cursor-pointer items-center justify-between gap-1.5 rounded-[9px] border border-[#232732] bg-surface-2 px-3 text-xs leading-4 text-white hover:border-line-strong"
        >
          {current.label}
          <Image src="/images/icon-chevron-down.svg" alt="" width={14} height={14} className="size-3.5" />
        </div>
        <ul
          tabIndex={-1}
          role="listbox"
          className="menu dropdown-content z-20 mt-2 w-36 rounded-xl border border-[#232732] bg-surface-2 p-1 shadow-lg shadow-black/40"
        >
          {OPTIONS.map((o) => (
            <li key={o.key} role="option" aria-selected={o.key === value}>
              <button
                type="button"
                className={`flex justify-between text-xs ${o.key === value ? "text-lime" : "text-white"}`}
                onClick={() => {
                  onChange(o.key);
                  (document.activeElement as HTMLElement | null)?.blur();
                }}
              >
                {o.label}
                {o.key === value && <FiCheck aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
