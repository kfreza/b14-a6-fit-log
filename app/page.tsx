import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pt-8 sm:px-6 sm:pt-12">
      <Hero />

      <section id="library" className="flex scroll-mt-28 flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h2 className="font-display text-3xl font-bold uppercase leading-9 tracking-[-0.75px] text-white">
            The Library
          </h2>
          <p className="text-sm leading-5 text-muted">Twelve lifts covering every major muscle group.</p>
        </header>

        <Library />
      </section>
    </div>
  );
}
