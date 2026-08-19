"use client";

export default function ErrorBoundary({
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <main className="bg-brand-white flex min-h-screen flex-col items-center justify-center px-5 py-24 text-center font-sans md:px-8">
      <h1 className="text-brand-navy text-[clamp(1.6rem,3.8vw,2.6rem)] font-bold tracking-[-0.03em] uppercase italic">
        Something went wrong
      </h1>
      <p className="text-brand-muted mt-4 max-w-md text-sm leading-7">
        The page could not be loaded. Try again, or return to the Quantara
        Financial home page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-brand-navy text-brand-cream focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white mt-8 inline-flex min-h-12 items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        Try again
      </button>
    </main>
  );
}
