import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  counterValueAt,
  formatImpactCounter,
  impactRootMarginBottom,
  isAboveTriggerLine,
  isImpactMobileViewport,
} from "@/features/landing/impact-stats-motion";

describe("impact stats motion helpers", () => {
  it("formats counters with two digits", () => {
    assert.equal(formatImpactCounter(0), "00");
    assert.equal(formatImpactCounter(6), "06");
    assert.equal(formatImpactCounter(3), "03");
  });

  it("eases counter to exact target at completion", () => {
    assert.equal(counterValueAt(6, 0, 720), 0);
    assert.equal(counterValueAt(6, 720, 720), 6);
    assert.equal(counterValueAt(6, 800, 720), 6);
    assert.ok(counterValueAt(6, 360, 720) < 6);
  });

  it("builds pixel root margins from viewport height", () => {
    assert.equal(impactRootMarginBottom(1000, 0.16), "0px 0px -160px 0px");
    assert.equal(impactRootMarginBottom(900, 0.1), "0px 0px -90px 0px");
  });

  it("detects elements above the trigger line", () => {
    assert.equal(isAboveTriggerLine(840, 1000, 0.16), true);
    assert.equal(isAboveTriggerLine(841, 1000, 0.16), false);
  });

  it("classifies mobile viewports at 767 and below", () => {
    assert.equal(isImpactMobileViewport(767), true);
    assert.equal(isImpactMobileViewport(768), false);
  });
});
