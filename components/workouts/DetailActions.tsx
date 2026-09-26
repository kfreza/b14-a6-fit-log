"use client";

import Image from "next/image";
import { PLAN_CAP, usePlan } from "@/components/providers/PlanProvider";
import { useToast } from "@/components/providers/ToastProvider";
import type { Workout } from "@/lib/types";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, isSaved, planFull: capReached, hydrated } = usePlan();
  const toast = useToast();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planFull = !inPlan && capReached;

  function handleAdd() {
    const result = addToPlan(workout);
    if (result === "added") toast(`${workout.name} added to today's plan`);
    else if (result === "exists") toast(`${workout.name} is already in today's plan`, "info");
    else toast(`Today's plan is capped at ${PLAN_CAP} lifts — finish some first`, "error");
  }

  function handleSave() {
    const result = saveForLater(workout);
    if (result === "added") toast(`${workout.name} saved for later`);
    else toast(`${workout.name} is already saved`, "info");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!hydrated || inPlan || planFull}
          className="btn h-auto gap-2 rounded-xl border-none bg-accent px-6 py-3 text-sm font-semibold leading-5 text-[#0f1115] shadow-sm hover:bg-lime disabled:bg-accent/40 disabled:text-[#0f1115]/70"
        >
          <Image src="/images/icon-calendar-plus.svg" alt="" width={16} height={16} className="size-4" />
          {inPlan ? "In today's plan" : "Add to today's plan"}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!hydrated || saved}
          className="btn btn-outline h-auto gap-2 rounded-xl border-line-strong px-6 py-3 text-sm font-medium leading-5 text-[#e5e7eb] hover:border-lime hover:bg-transparent hover:text-white disabled:border-line-strong/60 disabled:bg-transparent disabled:text-[#e5e7eb]/60"
        >
          <Image src="/images/icon-bookmark.svg" alt="" width={16} height={16} className="size-4" />
          {saved ? "Saved" : "Save for later"}
        </button>
      </div>
      {planFull && (
        <p className="text-xs text-muted">
          Today&apos;s plan is full ({PLAN_CAP}/{PLAN_CAP} lifts). Mark one as done or remove it to add more.
        </p>
      )}
    </div>
  );
}
