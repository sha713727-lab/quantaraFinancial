"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => {
      setMatches(media.matches);
    };

    sync();
    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
