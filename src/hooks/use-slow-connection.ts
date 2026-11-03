"use client";

import { useEffect, useState } from "react";

type NetworkInformationLike = {
  readonly saveData?: boolean;
  readonly effectiveType?: string;
  readonly addEventListener?: (type: "change", listener: () => void) => void;
  readonly removeEventListener?: (type: "change", listener: () => void) => void;
};

function readIsSlow(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  const connection = (
    navigator as Navigator & {
      connection?: NetworkInformationLike;
      mozConnection?: NetworkInformationLike;
      webkitConnection?: NetworkInformationLike;
    }
  ).connection;

  if (!connection) {
    return false;
  }

  if (connection.saveData === true) {
    return true;
  }

  const type = connection.effectiveType;
  return type === "slow-2g" || type === "2g" || type === "3g";
}

/** True when Save-Data is on or effectiveType is 3g / 2g / slow-2g. */
export function useSlowConnection(): boolean | null {
  const [slow, setSlow] = useState<boolean | null>(null);

  useEffect(() => {
    const sync = () => {
      setSlow(readIsSlow());
    };

    sync();

    const connection = (
      navigator as Navigator & {
        connection?: NetworkInformationLike;
      }
    ).connection;

    connection?.addEventListener?.("change", sync);

    return () => {
      connection?.removeEventListener?.("change", sync);
    };
  }, []);

  return slow;
}
