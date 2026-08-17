import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <div
      className={`motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
