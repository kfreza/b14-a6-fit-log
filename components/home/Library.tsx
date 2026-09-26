"use client";

import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { WORKOUTS_URL } from "@/lib/api";
import { matchesQuery } from "@/lib/search";
import type { Workout } from "@/lib/types";
import SearchInput, { NoMatches } from "@/components/common/SearchInput";
import WorkoutCard from "@/components/workouts/WorkoutCard";

const GRID_CLASSES = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; workouts: Workout[] };

export default function Library() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");

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

  return (
    <>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-3xl font-bold uppercase leading-9 tracking-[-0.75px] text-white">
            The Library
          </h2>
          <p className="text-sm leading-5 text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <SearchInput
          value={query}
          onChange={setQuery}
          label="Search the library"
          disabled={state.status !== "ready"}
          className="w-full sm:w-64"
        />
      </header>

      <LibraryBody
        state={state}
        query={query}
        onClearQuery={() => setQuery("")}
        onRetry={() => {
          setState({ status: "loading" });
          setAttempt((n) => n + 1);
        }}
      />
    </>
  );
}

function LibraryBody({
  state,
  query,
  onClearQuery,
  onRetry,
}: {
  state: State;
  query: string;
  onClearQuery: () => void;
  onRetry: () => void;
}) {
  if (state.status === "loading") return <LibrarySkeleton />;

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-white/10 px-4 py-16 text-center">
        <p className="text-sm text-muted">Couldn&apos;t load the library. Check your connection and try again.</p>
        <button
          type="button"
          className="btn btn-outline btn-sm rounded-full border-line-strong text-white"
          onClick={onRetry}
        >
          <FiRefreshCw aria-hidden /> Retry
        </button>
      </div>
    );
  }

  const results = state.workouts.filter((w) => matchesQuery(w, query));
  if (results.length === 0) return <NoMatches query={query} onClear={onClearQuery} />;

  return (
    <ul className={GRID_CLASSES}>
      {results.map((workout, i) => (
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
