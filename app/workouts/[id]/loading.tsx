export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12" role="status" aria-label="Loading workout">
      <div className="mb-6 h-4 w-28 skeleton bg-[#1f232b]" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="skeleton aspect-[4/5] w-full rounded-2xl bg-[#171a21]" />
        <div className="flex flex-col gap-4">
          <div className="skeleton h-10 w-3/4 bg-[#1f232b]" />
          <div className="skeleton h-12 w-full bg-[#1f232b]" />
          <div className="skeleton h-6 w-32 rounded-full bg-[#1f232b]" />
          <div className="skeleton h-80 w-full rounded-2xl bg-[#1f232b]" />
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="loading loading-bars loading-md text-lime" aria-hidden />
            Loading workout…
          </div>
        </div>
      </div>
    </div>
  );
}
