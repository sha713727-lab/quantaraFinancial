"use client";

import Link from "next/link";
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function MagneticLink({
  href,
  className,
  children,
}: {
  readonly href: string;
  readonly className: string;
  readonly children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const reset = () => {
    const node = ref.current;

    if (node) {
      node.style.transform = "translate3d(0,0,0)";
    }
  };

  const follow = (event: MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;

    if (reduceMotion === true || !node) {
      return;
    }

    const box = node.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    node.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onMouseMove={follow}
      onMouseLeave={reset}
      onBlur={reset}
    >
      {children}
    </Link>
  );
}
