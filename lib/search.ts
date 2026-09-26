import type { Workout } from "./types";

export function matchesQuery(workout: Pick<Workout, "name" | "muscleGroups">, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    workout.name.toLowerCase().includes(q) ||
    workout.muscleGroups.some((group) => group.toLowerCase().includes(q))
  );
}
