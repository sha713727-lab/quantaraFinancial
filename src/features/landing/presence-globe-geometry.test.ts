import assert from "node:assert/strict";
import { test } from "node:test";

import { createLandDots, isLand, latLngToXyz } from "./presence-globe-geometry";

test("treats UAE, UK, and USA coordinates as land", () => {
  assert.equal(isLand(25.2048, 55.2708), true);
  assert.equal(isLand(51.5074, -0.1278), true);
  assert.equal(isLand(40.7128, -74.006), true);
});

test("treats mid-ocean coordinates as water", () => {
  assert.equal(isLand(0, -150), false);
  assert.equal(isLand(30, -40), false);
});

test("maps lat/lng onto a unit sphere", () => {
  const [x, y, z] = latLngToXyz(0, 0, 1);
  const length = Math.hypot(x, y, z);
  assert.ok(Math.abs(length - 1) < 1e-10);
});

test("samples a dense set of land dots on the unit sphere", () => {
  const dots = createLandDots(4000);
  assert.ok(dots.length > 400);
  const sample = dots[0];
  assert.ok(sample !== undefined);
  assert.ok(Math.abs(Math.hypot(sample[0], sample[1], sample[2]) - 1) < 1e-10);
});
