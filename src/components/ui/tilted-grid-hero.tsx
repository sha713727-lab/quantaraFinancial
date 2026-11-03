"use client";

import * as React from "react";

import { requestScrollSync } from "@/features/landing/scroll-sync.client";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/* ── the curved row ──────────────────────────────────────────────
 * Cylinder band of image tiles. Never put opacity/mask/filter on the
 * perspective root — those flatten preserve-3d and shatter tiles into
 * vertical strips. Edge fades are overlays above the scene instead.
 * ─────────────────────────────────────────────────────────────── */

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;
const RESIZE_EPSILON_PX = 2;

function arc(bend: number) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

function measure(
  width: number,
  height: number,
  tile: number,
  aspect: number,
  gap: number,
  bend: number,
) {
  const h = Math.min(
    (tile / 100) * height,
    ((MAX_WIDTH / 100) * width) / aspect,
  );
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  }
  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const round = (n: number) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);
  return {
    columns,
    sweep,
    unit: round(unit),
    limit: round(Math.min(sweep, limit)),
  };
}

type Layout = ReturnType<typeof measure>;

function layoutsEqual(a: Layout, b: Layout): boolean {
  return (
    a.columns === b.columns &&
    a.sweep === b.sweep &&
    a.unit === b.unit &&
    a.limit === b.limit
  );
}

export type TiltedGridImage = {
  src: string;
  alt?: string;
};

export type TiltedGridHeroProps = {
  images: readonly TiltedGridImage[];
  /** Seconds for the row to advance by one tile. @default 4 */
  speed?: number;
  /** Tile height, as a percentage of the hero's height. @default 26 */
  tileHeight?: number;
  /** Tile width divided by tile height. @default 16 / 9 */
  aspectRatio?: number;
  /** Space between tiles, as a percentage of a tile's height. @default 6 */
  gap?: number;
  /** Vertical centre of the row, as a percentage of the hero's height. @default 56 */
  axis?: number;
  /** Arc bend at the frame edge, in degrees. @default 80 */
  curve?: number;
  /** Width of the fade at each end, as a percentage of width. @default 12 */
  fade?: number;
  children?: React.ReactNode;
  className?: string;
};

export function TiltedGridHero({
  images,
  speed = 4,
  tileHeight = 26,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 56,
  curve = 80,
  fade = 12,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & TiltedGridHeroProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const bandRef = React.useRef<HTMLDivElement>(null);
  const sizeRef = React.useRef({ width: 0, height: 0 });
  const imagesRef = React.useRef(images);
  const durationRef = React.useRef(1);
  const columnsRef = React.useRef(0);

  const reduceMotion = usePrefersReducedMotion();
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `tgh-o-${id}`;
  const tileClass = `tgh-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

  const [layout, setLayout] = React.useState<Layout | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) {
      return;
    }

    let frame = 0;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = Math.round(entry.contentRect.width);
        const height = Math.round(entry.contentRect.height);
        if (width < 1 || height < 1) {
          return;
        }

        const prev = sizeRef.current;
        if (
          Math.abs(prev.width - width) < RESIZE_EPSILON_PX &&
          Math.abs(prev.height - height) < RESIZE_EPSILON_PX
        ) {
          return;
        }

        sizeRef.current = { width, height };
        const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
        setLayout((current) => {
          if (current && layoutsEqual(current, next)) {
            return current;
          }
          requestScrollSync();
          return next;
        });
      });
    });

    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [tileHeight, aspectRatio, gap, bend]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    for (const image of images) {
      const preload = new window.Image();
      preload.src = image.src;
    }
  }, [images]);

  const { columns, sweep, unit, limit } = layout ?? {
    columns: 0,
    sweep: 0,
    unit: 0,
    limit: 0,
  };
  const duration = Math.max(columns, 1) * speed;

  React.useEffect(() => {
    durationRef.current = duration;
    columnsRef.current = columns;
  }, [duration, columns]);

  const playing = inView && reduceMotion === false && columns > 0;

  React.useEffect(() => {
    const band = bandRef.current;
    if (!band) {
      return;
    }
    const playState = playing ? "running" : "paused";
    band.querySelectorAll<HTMLElement>(`.${tileClass}`).forEach((node) => {
      node.style.animationPlayState = playState;
    });
  }, [playing, tileClass, columns]);

  const u = React.useCallback(
    (n: number) =>
      `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${(
        MAX_WIDTH / aspectRatio
      ).toFixed(4)}cqw))`,
    [tileHeight, aspectRatio],
  );

  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;
  const turn = React.useCallback(
    (deg: number) =>
      `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`,
    [radius],
  );

  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const css = React.useMemo(() => {
    if (!layout || columns < 1) {
      return "";
    }
    return (
      `@keyframes ${orbit}{` +
      `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
      `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
      `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}`
    );
  }, [layout, columns, orbit, turn, sweep, hide]);

  const share = aspectRatio / SLICES;
  const fadeWidth = `${Math.max(fade, 0)}%`;
  const imageCount = Math.max(images.length, 1);
  const ready = Boolean(layout && columns > 0);

  const onTileIteration = React.useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      const tileEl = event.currentTarget;
      const tileIndex = Number(tileEl.dataset.tileIndex);
      if (!Number.isFinite(tileIndex)) {
        return;
      }

      const list = imagesRef.current;
      if (list.length === 0) {
        return;
      }

      const lap = Math.round(event.elapsedTime / durationRef.current);
      const first = columnsRef.current - 1 - tileIndex;
      const nextIndex = (lap * columnsRef.current + first) % list.length;
      const next = list[nextIndex];
      if (!next) {
        return;
      }

      tileEl.querySelectorAll("img").forEach((img, sliceIndex) => {
        if (img.getAttribute("src") !== next.src) {
          img.setAttribute("src", next.src);
        }
        if (sliceIndex === 0) {
          img.setAttribute("alt", next.alt ?? "");
        }
      });
    },
    [],
  );

  return (
    <div
      ref={rootRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "size", ...props.style }}
    >
      {css ? <style>{css}</style> : null}

      {/*
        Perspective root must stay opacity:1 with no mask/filter.
        Those properties flatten preserve-3d and shatter tiles into strips.
      */}
      <div
        ref={bandRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          visibility: ready ? "visible" : "hidden",
        }}
      >
        {ready
          ? Array.from({ length: columns }, (_, t) => {
              const first = columns - 1 - t;
              const img = images[first % imageCount];
              return (
                <div
                  key={`${columns}-${t}`}
                  data-tile-index={t}
                  className={cn(tileClass, "absolute")}
                  style={{
                    left: `calc(50% - ${u(aspectRatio / 2)})`,
                    top: `calc(${axis}% - ${u(0.5)})`,
                    width: u(aspectRatio),
                    height: u(1),
                    transformStyle: "preserve-3d",
                    animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
                    animationPlayState: "paused",
                  }}
                  onAnimationIteration={onTileIteration}
                >
                  {Array.from({ length: SLICES }, (_, k) => (
                    <div
                      key={k}
                      className={cn(
                        "bg-muted absolute top-0 overflow-hidden",
                        k === 0 && "rounded-l-lg",
                        k === SLICES - 1 && "rounded-r-lg",
                      )}
                      style={{
                        left: u((aspectRatio - share) / 2),
                        width:
                          k === SLICES - 1
                            ? u(share)
                            : `calc(${u(share)} + 1px)`,
                        height: u(1),
                        transform: turn(
                          (aspectRatio / 2 - (k + 0.5) * share) * unit,
                        ),
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element -- sliced cylinder facets need absolute img positioning
                        <img
                          src={img.src}
                          alt={k === 0 ? (img.alt ?? "") : ""}
                          draggable={false}
                          className="absolute top-0 max-w-none object-cover"
                          style={{
                            left: u(-k * share),
                            width: u(aspectRatio),
                            height: u(1),
                          }}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              );
            })
          : null}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: fadeWidth,
          background:
            "linear-gradient(90deg, var(--color-brand-cream-soft, #ffffff) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: fadeWidth,
          background:
            "linear-gradient(270deg, var(--color-brand-cream-soft, #ffffff) 0%, transparent 100%)",
        }}
      />

      {children}
    </div>
  );
}

export default TiltedGridHero;
