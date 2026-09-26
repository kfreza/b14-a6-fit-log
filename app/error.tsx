"use client";

import Link from "next/link";
import { FiRefreshCw } from "react-icons/fi";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl font-bold uppercase text-white">Something dropped the bar</h1>
      <p className="mt-4 max-w-md text-sm text-muted">We couldn&apos;t load this page. Try again in a moment.</p>
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={reset} className="btn btn-primary rounded-md gap-2">
          <FiRefreshCw aria-hidden /> Try again
        </button>
        <Link href="/" className="btn btn-outline rounded-md border-line-strong text-white">
          Go home
        </Link>
      </div>
    </div>
  );
}
