# 💪 FitLog — Workout Library

**Train with intent. Log every set.**

FitLog is a dark, no-nonsense gym companion. Browse a library of twelve lifts, open any one for specs and step-by-step instructions, lock up to five into today's plan, and watch your minutes and calories add up.

**Live site:** https://b14-a6-fit-log-pi.vercel.app/

---

## 🛠️ Technologies

| Technology                                               | Purpose                                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Next.js 16](https://nextjs.org) (App Router)            | Routing, server rendering, image optimization                                          |
| [React 19](https://react.dev)                            | UI and client state (Context API)                                                      |
| [TypeScript](https://www.typescriptlang.org)             | Type safety across API data and components                                             |
| [Tailwind CSS v4](https://tailwindcss.com)               | Utility-first styling and responsive layout                                            |
| [DaisyUI 5](https://daisyui.com)                         | Custom `fitlog` theme, buttons, tabs, dropdown, toast, skeleton and loading components |
| [React Icons](https://react-icons.github.io/react-icons) | UI icons (arrows, check, info, refresh, search)                                        |

Data comes from the FitLog API: `https://api.abcz.workers.dev/api/fitlog`.

---

## ✨ Features

1. **Workout library.** All 12 workouts in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile). Each card shows tags, equipment, duration, calories and rating, and a loading animation plays while the data is fetched.
2. **Detailed workout pages.** A two-column layout with a large image, a key specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions.
3. **Today's Plan and Saved lists.** "Add to today's plan" and "Save for later" update the navbar badge counts right away and show a toast.
4. **Live plan metrics.** The My Plan page totals exercises, minutes and calories as you add, finish or remove lifts.
5. **Mark as done and remove.** Each planned lift can be completed or removed, and both actions show a toast.
6. **Sort by Duration, Calories or Rating.** A dropdown re-sorts the current list.
7. **Search by name or tag.** Filter the library, Today's Plan or Saved list as you type, for example "squat" or "core".
8. **Saved between visits.** The plan and saved lists are stored in `localStorage`, so they survive a page reload.
9. **Five-lift cap.** "Add to today's plan" is disabled when five unfinished lifts are already planned.
10. **Responsive layout, 404 page and error handling.** Works on mobile, tablet and desktop. Unknown routes and unknown workout IDs show a 404 page.

---

## 📁 Project structure

```
app/
  page.tsx                 Home: hero + library
  workouts/[id]/page.tsx   Workout detail (server-rendered)
  my-plan/page.tsx         My Plan: metrics, tabs, sort, list
  not-found.tsx            404 page
components/
  layout/                  Navbar, Footer
  home/                    Hero, Library
  workouts/                WorkoutCard, WorkoutStats, DetailActions
  plan/                    MyPlanView, PlanCard, MetricsSummary, SortDropdown
  providers/               PlanProvider (plan/saved state), ToastProvider
lib/                       API client and types
```

---

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
