import Image from "next/image";

import { cn } from "@/lib/utils";

type CpaArtworkProps = {
  readonly className?: string;
  readonly aspectClassName?: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly glowX?: number;
  readonly glowY?: number;
  readonly panelTitle?: string;
  readonly panelLabel?: string;
  readonly captionTitle?: string;
  readonly captionLabel?: string;
  readonly showCaptions?: boolean;
  readonly priority?: boolean;
};

export function CpaAbstractArtwork({
  className,
  aspectClassName = "aspect-[3/2]",
  imageSrc,
  imageAlt = "",
  glowX = 72,
  glowY = 40,
  panelTitle,
  panelLabel,
  captionTitle,
  captionLabel,
  showCaptions = true,
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
      <div className="absolute inset-0" aria-hidden="true">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1600px) 1600px, 100vw"
            className="object-cover"
          />
        ) : null}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(110,145,185,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,145,185,0.35) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
        {!imageSrc ? (
          <div
            className="absolute size-[min(70%,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              left: `${glowX}%`,
              top: `${glowY}%`,
              background:
                "radial-gradient(circle, rgba(110,145,185,0.55) 0%, rgba(110,145,185,0.12) 45%, transparent 70%)",
            }}
          />
        ) : null}
        <div
          className="border-brand-accent/35 absolute size-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ left: "76%", top: "29%" }}
        />
        <div
          className="border-brand-accent/25 absolute size-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ left: "79%", top: "33%" }}
        />
        <div className="from-brand-deep absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t to-transparent" />
        {imageSrc ? (
          <div className="absolute inset-0 bg-[rgba(2,7,18,0.28)]" />
        ) : null}
      </div>

      {showCaptions && panelTitle ? (
        <div className="absolute top-[63%] left-[8%] z-10 w-[min(37%,18rem)] rounded-[4px] bg-[rgba(7,20,38,0.72)] p-4 backdrop-blur-[2px] sm:p-5">
          {panelLabel ? (
            <p className="text-brand-accent text-[0.62rem] font-bold tracking-[0.2em] uppercase">
              {panelLabel}
            </p>
          ) : null}
          <p className="text-brand-cream mt-2 text-base font-semibold tracking-[-0.02em] sm:text-lg">
            {panelTitle}
          </p>
        </div>
      ) : null}

      {showCaptions && captionTitle ? (
        <div className="absolute bottom-4 left-[8%] z-10 rounded-[4px] bg-[rgba(2,7,18,0.78)] px-3 py-2 sm:bottom-5">
          <p className="text-brand-cream text-xs font-semibold tracking-[-0.01em]">
            {captionTitle}
          </p>
          {captionLabel ? (
            <p className="text-brand-accent mt-1 text-[0.58rem] font-bold tracking-[0.18em] uppercase">
              {captionLabel}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function CpaPortraitFigure({
  title,
  caption,
  meaning,
  imageSrc,
  glowX,
  glowY,
  className,
}: {
  readonly title: string;
  readonly caption: string;
  readonly meaning: string;
  readonly imageSrc: string;
  readonly glowX: number;
  readonly glowY: number;
  readonly className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <CpaAbstractArtwork
        aspectClassName="aspect-[2/3]"
        imageSrc={imageSrc}
        glowX={glowX}
        glowY={glowY}
        showCaptions={false}
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="max-w-[18rem] rounded-[4px] bg-[rgba(7,20,38,0.78)] p-4 backdrop-blur-[2px] sm:p-5">
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
    </figure>
  );
}
