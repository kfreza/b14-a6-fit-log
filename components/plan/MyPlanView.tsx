"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type ListName, usePlan } from "@/components/providers/PlanProvider";
import { useToast } from "@/components/providers/ToastProvider";
import MetricsSummary from "./MetricsSummary";
import PlanCard from "./PlanCard";
import SortDropdown, { type SortKey, sortWorkouts } from "./SortDropdown";

const TABS: { key: ListName; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

export default function MyPlanView({ initialTab }: { initialTab: ListName }) {
  const { plan, saved, hydrated, markDone, remove } = usePlan();
  const toast = useToast();
  const [tab, setTab] = useState<ListName>(initialTab);
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const items = useMemo(
    () => sortWorkouts(tab === "plan" ? plan : saved, sortKey),
    [tab, plan, saved, sortKey],
  );

  return (
    <>
      <MetricsSummary items={plan} />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Plan lists" className="tabs tabs-box w-fit gap-1 rounded-xl border border-[#232732] bg-[#151921] p-[5px]">
          {TABS.map((t) => {
            const active = tab === t.key;
            const count = t.key === "plan" ? plan.length : saved.length;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className={`tab h-auto rounded-lg px-4 py-1.5 text-xs leading-4 ${
                  active
                    ? "tab-active border border-[#2b303d] !bg-[#1f242d] font-bold text-white shadow-sm"
                    : "border border-transparent font-normal text-subtle hover:text-white"
                }`}
              >
                {t.label}
                {hydrated && count > 0 && <span className="ml-1.5 text-[11px] text-subtle">({count})</span>}
              </button>
            );
          })}
        </div>

        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      <section aria-live="polite" className="flex flex-col gap-4">
        {!hydrated ? (
          <div role="status" className="flex items-center justify-center gap-3 rounded-2xl border border-[#232732] bg-[#14171e] py-16 text-sm text-subtle">
            <span className="loading loading-spinner loading-md text-lime" aria-hidden />
            Loading workouts…
          </div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          items.map((item) => (
            <PlanCard
              key={item.id}
              item={item}
              variant={tab}
              onDone={() => {
                markDone(item.id);
                toast(`Nice work — ${item.name} marked as done`);
              }}
              onRemove={() => {
                remove(tab, item.id);
                toast(`${item.name} removed from ${tab === "plan" ? "today's plan" : "saved"}`, "info");
              }}
            />
          ))
        )}
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#111317]/50 px-4 py-20 text-center">
      <h2 className="pb-2 font-display text-xl font-bold uppercase leading-5 tracking-[0.7px] text-white">
        Nothing here yet
      </h2>
      <p className="max-w-sm pb-6 text-xs leading-4 text-[#a1a1aa]">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="btn h-auto rounded-full border-none bg-[#c2f10d] px-6 py-2.5 text-xs font-semibold leading-4 tracking-[-0.3px] text-black shadow-lg shadow-[#c2f10d]/10 hover:bg-lime"
      >
        Go to workouts
      </Link>
    </div>
  );
}
