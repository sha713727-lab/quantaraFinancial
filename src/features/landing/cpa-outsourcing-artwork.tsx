import Image from "next/image";

import { cn } from "@/lib/utils";

type CpaArtworkProps = {
  readonly className?: string;
  readonly aspectClassName?: string;
  readonly imageClassName?: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly priority?: boolean;
};

export function CpaAbstractArtwork({
  className,
  aspectClassName = "aspect-[3/4]",
  imageClassName,
  imageSrc,
  imageAlt = "",
  priority = false,
}: CpaArtworkProps) {
  return (
    <div
      className={cn(
        "bg-brand-deep relative w-full overflow-hidden rounded-[4px]",
        aspectClassName,
        className,
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1600px) 1600px, 100vw"
          className={cn("object-cover object-top", imageClassName)}
        />
      ) : null}
    </div>
  );
}

export function CpaPortraitFigure({
  title,
  caption,
  meaning,
  imageSrc,
  className,
}: {
  readonly title: string;
  readonly caption: string;
  readonly meaning: string;
  readonly imageSrc: string;
  readonly glowX?: number;
  readonly glowY?: number;
  readonly className?: string;
}) {
  return (
    <figure
      className={cn("relative overflow-visible pb-14 sm:pb-16", className)}
    >
      <div className="relative">
        <CpaAbstractArtwork
          aspectClassName="aspect-[3/4]"
          imageSrc={imageSrc}
          imageAlt={title}
        />
        <figcaption className="pointer-events-none absolute bottom-0 left-0 z-10 w-[min(100%,18rem)] -translate-x-3 translate-y-[32%] sm:-translate-x-4">
          <div className="rounded-[4px] bg-[rgba(7,20,38,0.78)] p-4 backdrop-blur-[2px] sm:p-5">
            <p className="text-brand-cream text-lg font-semibold tracking-[-0.02em] sm:text-xl">
              {title}
            </p>
            <p className="text-brand-accent mt-2 text-[0.62rem] font-bold tracking-[0.18em] uppercase">
              {caption}
            </p>
            <p className="text-brand-cream/90 mt-3 text-xs leading-5 sm:text-sm sm:leading-6">
              {meaning}
            </p>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
