"use client";

import { useEffect, useState, type ReactNode } from "react";

import { useSlowConnection } from "@/hooks/use-slow-connection";

/**
 * Defers Ads / Analytics / Clarity until the main thread is idle.
 * On slow connections, waits for first interaction (or a long timeout).
 */
export function DeferredMarketing({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const slow = useSlowConnection();

  useEffect(() => {
    if (ready || slow === null) {
      return;
    }

    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;

    const enable = () => {
      if (!cancelled) {
        setReady(true);
      }
    };

    if (slow) {
      const onInteract = () => {
        enable();
      };

      window.addEventListener("pointerdown", onInteract, {
        once: true,
        passive: true,
      });
      window.addEventListener("keydown", onInteract, { once: true });
      window.addEventListener("scroll", onInteract, {
        once: true,
        passive: true,
      });
      timeoutId = window.setTimeout(enable, 15000);

      return () => {
        cancelled = true;
        window.clearTimeout(timeoutId);
        window.removeEventListener("pointerdown", onInteract);
        window.removeEventListener("keydown", onInteract);
        window.removeEventListener("scroll", onInteract);
      };
    }

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? () => {
            idleId = window.requestIdleCallback(enable, { timeout: 3500 });
          }
        : () => {
            timeoutId = window.setTimeout(enable, 2200);
          };

    schedule();

    return () => {
      cancelled = true;
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(timeoutId);
    };
  }, [ready, slow]);

  if (!ready) {
    return null;
  }

  return children;
}
