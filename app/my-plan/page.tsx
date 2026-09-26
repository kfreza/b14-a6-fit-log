import type { Metadata } from "next";
import MyPlanView from "@/components/plan/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan",
  description: "Today's plan and saved lifts.",
};

export default async function MyPlanPage(props: PageProps<"/my-plan">) {
  const { tab } = await props.searchParams;
  const initialTab = tab === "saved" ? "saved" : "plan";

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-8 sm:px-6 sm:pt-10 lg:px-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold uppercase leading-9 tracking-[-0.75px] text-white">My Plan</h1>
        <p className="text-sm leading-5 text-subtle">Cap of five lifts for today. Finish them, then load more.</p>
      </header>

      <MyPlanView key={initialTab} initialTab={initialTab} />
    </div>
  );
}
