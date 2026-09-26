"use client";

import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { WORKOUTS_URL } from "@/lib/api";
import type { Workout } from "@/lib/types";
import WorkoutCard from "@/components/workouts/WorkoutCard";

const GRID_CLASSES = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; workouts: Workout[] };

export default function Library() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(WORKOUTS_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Workout[]>;
      })
      .then((workouts) => setState({ status: "ready", workouts }))
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          console.error("Failed to load workouts", err);
          setState({ status: "error" });
        }
      });
    return () => controller.abort();
  }, [attempt]);

  if (state.status === "loading") return <LibrarySkeleton />;

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-white/10 px-4 py-16 text-center">
        <p className="text-sm text-muted">Couldn&apos;t load the library. Check your connection and try again.</p>
        <button
          type="button"
          className="btn btn-outline btn-sm rounded-full border-line-strong text-white"
          onClick={() => {
            setState({ status: "loading" });
            setAttempt((n) => n + 1);
          }}
        >
          <FiRefreshCw aria-hidden /> Retry
        </button>
      </div>
    );
  }

  return (
    <ul className={GRID_CLASSES}>
      {state.workouts.map((workout, i) => (
        <li key={workout.id}>
          <WorkoutCard workout={workout} priority={i < 3} />
        </li>
      ))}
    </ul>
  );
}

function LibrarySkeleton() {
  return (
    <div role="status" aria-label="Loading workouts">
      <div className="mb-6 flex items-center gap-3 text-sm text-muted">
        <span className="loading loading-bars loading-md text-lime" aria-hidden />
        Loading workouts…
      </div>
      <div className={GRID_CLASSES}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="skeleton h-48 w-full rounded-none bg-[#1f232b]" />
            <div className="flex flex-col gap-3 p-6">
              <div className="skeleton h-5 w-24 rounded-full bg-[#1f232b]" />
              <div className="skeleton h-6 w-3/4 bg-[#1f232b]" />
              <div className="skeleton h-4 w-1/2 bg-[#1f232b]" />
              <div className="skeleton mt-4 h-4 w-full bg-[#1f232b]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
