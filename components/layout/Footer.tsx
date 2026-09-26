import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  
  return (
    <footer className="mt-16 border-t border-[#1a1d24] bg-[#090a0d]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-10 sm:flex-row sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
          <Image src="/images/logo-footer.svg" alt="" width={20} height={20} className="size-5" />
          <span className="font-display text-sm font-bold uppercase leading-5 tracking-[0.7px] text-white">
            FitLog
          </span>
        </Link>
        <p className="text-center text-xs leading-4 text-dim">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
