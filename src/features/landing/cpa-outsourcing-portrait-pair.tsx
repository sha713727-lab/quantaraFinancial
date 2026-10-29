import { CpaPortraitFigure } from "@/features/landing/cpa-outsourcing-artwork";
import type { CpaPortraitFigure as Figure } from "@/features/landing/cpa-outsourcing-content";
import { cn } from "@/lib/utils";

export function CpaPortraitPair({
  left,
  right,
  variant,
}: {
  readonly left: Figure;
  readonly right: Figure;
  readonly variant: "a" | "b";
}) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1100px] gap-6 px-[clamp(1.25rem,3vw,4rem)] max-[767px]:grid-cols-1 max-[767px]:gap-6 min-[768px]:gap-[10%]",
        variant === "a"
          ? "min-[768px]:grid-cols-[1fr_0.8fr]"
          : "min-[768px]:grid-cols-[1.08fr_0.72fr]",
      )}
    >
      <CpaPortraitFigure
        title={left.title}
        caption={left.caption}
        meaning={left.meaning}
        imageSrc={left.imageSrc}
        glowX={left.glowX}
        glowY={left.glowY}
      />
      <CpaPortraitFigure
        title={right.title}
        caption={right.caption}
        meaning={right.meaning}
        imageSrc={right.imageSrc}
        glowX={right.glowX}
        glowY={right.glowY}
        className={cn(
          "max-[767px]:mt-0 max-[767px]:ml-auto max-[767px]:w-[86%]",
          "min-[768px]:max-[899px]:mt-[clamp(3.5rem,8vw,6rem)]",
          "min-[900px]:mt-[clamp(5rem,12vw,13rem)]",
        )}
      />
    </div>
  );
}
