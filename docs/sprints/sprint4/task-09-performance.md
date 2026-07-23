# Sprint 4
# Task 09
# Performance Optimization

Priority: Critical
Estimated Time: 4-6 hours

---

## Goal
Optimize the Experience Player loading and rendering flows to hit Lighthouse > 90.

---

## Core Targets
* **60 FPS Rendering**: No long JavaScript tasks, offload computations.
* **Zero Layout Shift (CLS < 0.1)**: Pre-allocated viewport bounds for keepsakes.
* **Lazy Loading**: Code split non-critical components.
* **Image Preloading**: Cache images for the next scene in the background before the transition triggers.
* **Animation Queue**: Structured frame callbacks instead of concurrent independent updates.
