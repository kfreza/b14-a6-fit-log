"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/components/providers/PlanProvider";

const NAV_LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/workouts");
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const links = NAV_LINKS.map((link) => {
    const active = isActive(pathname, link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`rounded-full px-4 py-1.5 text-xs leading-4 transition-colors ${
          active
            ? "bg-lime-soft font-semibold text-lime"
            : "font-medium text-muted hover:text-white"
        }`}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1f26] bg-ink/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="FitLog home">
          <Image src="/images/logo.svg" alt="" width={28} height={28} className="size-7" />
          <span className="font-display text-lg font-bold uppercase leading-7 tracking-[0.9px] text-white">
            FitLog
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links}
        </nav>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <Link href="/my-plan" className="group flex items-center gap-2" aria-label={`Plan: ${plan.length} workouts`}>
            <span className="text-xs font-medium text-[#d1d5db] group-hover:text-white">Plan</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-lime text-[11px] font-bold leading-4 text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan?tab=saved" className="group flex items-center gap-2" aria-label={`Saved: ${saved.length} workouts`}>
            <span className="text-xs font-medium text-muted group-hover:text-white">Saved</span>
            <span className="flex size-5 items-center justify-center rounded-full border border-[#2d313b] text-[11px] font-medium leading-4 text-[#d1d5db]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      <nav aria-label="Main mobile" className="flex items-center justify-center gap-1 border-t border-[#1c1f26] py-2 md:hidden">
        {links}
      </nav>
    </header>
  );
}
