"use client";

import { FiSearch, FiX } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  label,
  placeholder = "Search by name or tag",
  disabled = false,
  className = "",
}: Props) {
  return (
    <label
      className={`input h-8.5 gap-2 rounded-[9px] border-[#232732] bg-surface-2 px-3 text-xs text-white focus-within:border-lime/60 focus-within:outline-none ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >
      <FiSearch className="shrink-0 text-subtle" size={14} aria-hidden />
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onChange("");
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="grow placeholder:text-subtle [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="shrink-0 cursor-pointer text-subtle hover:text-white"
        >
          <FiX size={14} aria-hidden />
        </button>
      )}
    </label>
  );
}

export function NoMatches({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-white/10 bg-[#111317]/50 px-4 py-16 text-center">
      <p className="text-sm text-muted">
        No lifts match <span className="font-semibold text-white">&ldquo;{query.trim()}&rdquo;</span>
      </p>
      <button
        type="button"
        onClick={onClear}
        className="btn btn-outline btn-sm rounded-full border-line-strong font-normal text-white hover:border-lime hover:bg-transparent"
      >
        Clear search
      </button>
    </div>
  );
}
