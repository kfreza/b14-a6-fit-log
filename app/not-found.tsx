import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-[11px] font-bold uppercase tracking-[1.1px] text-lime">Error 404</p>
      <h1 className="mt-4 font-display text-7xl font-bold uppercase leading-none tracking-[-1.5px] text-white sm:text-9xl">
        Missed rep
      </h1>
      <p className="mt-6 max-w-md text-base leading-6 text-muted">
        That page isn&apos;t in the library. It may have moved, or the link has a typo.
      </p>
      <Link
        href="/"
        className="btn btn-primary mt-8 h-auto gap-2 rounded-md border-none px-6 py-3 text-xs font-bold uppercase tracking-[0.3px]"
      >
        <FiArrowLeft aria-hidden /> Back to workouts
      </Link>
    </div>
  );
}
