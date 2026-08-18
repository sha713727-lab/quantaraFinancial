"use client";

import { useCallback, useEffect, useRef } from "react";

import { brandColors } from "@/constants/brand-colors";
import {
  createLandDots,
  latLngToXyz,
  practiceArcs,
  practiceMarkers,
  project,
  rotateX,
  rotateY,
} from "@/features/landing/presence-globe-geometry";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LAND_DOTS = createLandDots(7200);
const AUTO_ROTATE = 0.0024;
const TILT = 0.38;

function rgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

export function PresenceGlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const rotYRef = useRef(-0.55);
  const rotXRef = useRef(TILT);
  const timeRef = useRef(0);
  const frameRef = useRef(0);
  const visibleRef = useRef(true);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRotY: 0,
    startRotX: 0,
  });

  const paint = useCallback((animate: boolean) => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.46;
    const fov = Math.max(width, height) * 0.92;
    const drag = dragRef.current;

    if (animate && !drag.active) {
      rotYRef.current += AUTO_ROTATE;
      timeRef.current += 0.016;
    }

    const ry = rotYRef.current;
    const rx = rotXRef.current;
    const time = timeRef.current;

    const atmosphere = ctx.createRadialGradient(
      cx,
      cy,
      radius * 0.72,
      cx,
      cy,
      radius * 1.18,
    );
    atmosphere.addColorStop(0, rgba(brandColors.accent, 0.16));
    atmosphere.addColorStop(1, rgba(brandColors.accent, 0));
    ctx.fillStyle = atmosphere;
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = brandColors.navy;
    ctx.fill();
    ctx.strokeStyle = rgba(brandColors.cream, 0.18);
    ctx.lineWidth = 1.2;
    ctx.stroke();

    for (const dot of LAND_DOTS) {
      let [x, y, z] = dot;
      x *= radius;
      y *= radius;
      z *= radius;
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > 0) {
        continue;
      }

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depth = Math.max(0.18, 1 - (z + radius) / (2 * radius));
      ctx.beginPath();
      ctx.arc(sx, sy, 0.7 + depth * 0.9, 0, Math.PI * 2);
      ctx.globalAlpha = 0.28 + depth * 0.62;
      ctx.fillStyle = brandColors.cream;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    for (const arc of practiceArcs) {
      let [x1, y1, z1] = latLngToXyz(arc.from[0], arc.from[1], radius);
      let [x2, y2, z2] = latLngToXyz(arc.to[0], arc.to[1], radius);
      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);
      if (z1 > radius * 0.28 && z2 > radius * 0.28) {
        continue;
      }

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLen = Math.hypot(midX, midY, midZ) || 1;
      const [scx, scy] = project(
        (midX / midLen) * radius * 1.22,
        (midY / midLen) * radius * 1.22,
        (midZ / midLen) * radius * 1.22,
        cx,
        cy,
        fov,
      );

      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = rgba(brandColors.accent, 0.45);
      ctx.lineWidth = 1.15;
      ctx.stroke();

      if (animate) {
        const t = (Math.sin(time * 1.15 + arc.from[0] * 0.08) + 1) / 2;
        const tx =
          (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
        const ty =
          (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;
        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = brandColors.cream;
        ctx.fill();
      }
    }

    for (const marker of practiceMarkers) {
      let [x, y, z] = latLngToXyz(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > radius * 0.12) {
        continue;
      }

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const pulse = animate
        ? Math.sin(time * 2 + marker.lat) * 0.5 + 0.5
        : 0.35;

      ctx.beginPath();
      ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(brandColors.accent, 0.22 + pulse * 0.2);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx, sy, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = brandColors.cream;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.save();
    ctx.clip();
    const shade = ctx.createRadialGradient(
      cx - radius * 0.28,
      cy - radius * 0.32,
      radius * 0.12,
      cx,
      cy,
      radius,
    );
    shade.addColorStop(0, rgba(brandColors.cream, 0.08));
    shade.addColorStop(0.55, rgba(brandColors.navy, 0));
    shade.addColorStop(1, rgba(brandColors.deep, 0.42));
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null || reducedMotion === null) {
      return;
    }

    const animate = reducedMotion === false;

    const tick = () => {
      if (visibleRef.current) {
        paint(animate);
      }
      if (animate) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      paint(animate);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      visibleRef.current = entry?.isIntersecting ?? true;
    });
    intersectionObserver.observe(canvas);

    tick();

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [paint, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="size-full cursor-grab touch-none rounded-full active:cursor-grabbing"
      onPointerDown={(event) => {
        dragRef.current = {
          active: true,
          startX: event.clientX,
          startY: event.clientY,
          startRotY: rotYRef.current,
          startRotX: rotXRef.current,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag.active) {
          return;
        }
        rotYRef.current =
          drag.startRotY + (event.clientX - drag.startX) * 0.005;
        rotXRef.current = Math.max(
          -0.9,
          Math.min(0.9, drag.startRotX + (event.clientY - drag.startY) * 0.005),
        );
        paint(false);
      }}
      onPointerUp={() => {
        dragRef.current.active = false;
      }}
      onPointerCancel={() => {
        dragRef.current.active = false;
      }}
    />
  );
}
