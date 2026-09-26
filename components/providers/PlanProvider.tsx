"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { Workout } from "@/lib/types";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog:v1";

export type PlanItem = Workout & { done?: boolean };
export type ListName = "plan" | "saved";

type AddResult = "added" | "exists" | "full";

type PlanContextValue = {
  plan: PlanItem[];
  saved: PlanItem[];
  hydrated: boolean;
  planFull: boolean;
  addToPlan: (w: Workout) => AddResult;
  saveForLater: (w: Workout) => AddResult;
  markDone: (id: number) => void;
  remove: (list: ListName, id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextValue | null>(null);

type Stored = { plan: PlanItem[]; saved: PlanItem[] };

const EMPTY: Stored = { plan: [], saved: [] };

function readStorage(): Stored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return EMPTY;
  }
}

let current: Stored | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Stored {
  if (current === null) current = readStorage();
  return current;
}

function getServerSnapshot(): Stored {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    current = readStorage();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function update(change: (prev: Stored) => Stored) {
  current = change(getSnapshot());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    
  }
  listeners.forEach((listener) => listener());
}

const subscribeNoop = () => () => {};

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const { plan, saved } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const planFull = plan.filter((p) => !p.done).length >= PLAN_CAP;

  const addToPlan = useCallback(
    (w: Workout): AddResult => {
      if (plan.some((p) => p.id === w.id)) return "exists";
      if (planFull) return "full";
      update((prev) => ({ ...prev, plan: [...prev.plan, { ...w, done: false }] }));
      return "added";
    },
    [plan, planFull],
  );

  const saveForLater = useCallback(
    (w: Workout): AddResult => {
      if (saved.some((p) => p.id === w.id)) return "exists";
      update((prev) => ({ ...prev, saved: [...prev.saved, w] }));
      return "added";
    },
    [saved],
  );

  const markDone = useCallback((id: number) => {
    update((prev) => ({
      ...prev,
      plan: prev.plan.map((p) => (p.id === id ? { ...p, done: true } : p)),
    }));
  }, []);

  const remove = useCallback((list: ListName, id: number) => {
    update((prev) => ({ ...prev, [list]: prev[list].filter((p) => p.id !== id) }));
  }, []);

  const value = useMemo<PlanContextValue>(
    () => ({
      plan,
      saved,
      hydrated,
      planFull,
      addToPlan,
      saveForLater,
      markDone,
      remove,
      isInPlan: (id) => plan.some((p) => p.id === id),
      isSaved: (id) => saved.some((p) => p.id === id),
    }),
    [plan, saved, hydrated, planFull, addToPlan, saveForLater, markDone, remove],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
