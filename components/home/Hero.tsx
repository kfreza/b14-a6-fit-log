import Image from "next/image";
import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-10 lg:flex-row lg:p-14">
      <div className="flex max-w-xl flex-col items-start gap-5">
        <p className="text-[11px] font-bold uppercase leading-[16.5px] tracking-[1.1px] text-lime">
          Workout Library
        </p>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-[-1px] text-white sm:text-5xl lg:text-6xl lg:leading-15 lg:tracking-[-1.5px]">
          Train with intent. Log every set.
        </h1>
        <p className="max-w-lg text-base leading-6 text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and
          watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="btn btn-primary mt-2 h-auto gap-2 rounded-md border-none px-6 py-3 text-xs font-bold uppercase leading-4 tracking-[0.3px] shadow-sm"
        >
          Browse Workouts
          <FiArrowDown size={14} aria-hidden />
        </a>
      </div>

      <div className="relative size-56 shrink-0 sm:size-72 lg:size-83.5">
        <Image
          src="/images/banner.png"
          alt="Anatomical figure training on a preacher curl machine"
          fill
          priority
          sizes="(min-width: 1024px) 334px, (min-width: 640px) 288px, 224px"
          className="object-contain"
        />
      </div>
    </section>
  );
}
