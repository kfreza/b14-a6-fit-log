import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pt-8 sm:px-6 sm:pt-12">
      <Hero />

      <section id="library" className="flex scroll-mt-28 flex-col gap-8">
        <Library />
      </section>
    </div>
  );
}
