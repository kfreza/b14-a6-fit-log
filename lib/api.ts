import type { Workout } from "./types";

export const WORKOUTS_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(WORKOUTS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to load workouts (HTTP ${res.status})`);
  return res.json();
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0 || String(num) !== id) return null;
  const res = await fetch(`${WORKOUTS_URL}/${id}`, { next: { revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load workout ${id} (HTTP ${res.status})`);
  return res.json();
}
