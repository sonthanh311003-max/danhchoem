# Sprint 4
# Task 06
# Cinematic Camera System

Priority: High
Estimated Time: 5-8 hours

---

## Goal
Design and build the dynamic Cinematic Camera System for smooth, interactive 3D perspective spatial transforms.

---

## Camera Actions Mapping
* **Letter Scene**: Zoom In (Focus coordinates on paper, high z-depth, minimal rotation).
* **Gallery Scene**: Pan Left/Right (Center viewport shifts, stagger parallax background).
* **Timeline Scene**: Pull Back / Wide Angle (Low z-depth, wide perspective reveal).
* **Ending Scene**: Tilt Up (Slow rotation towards the night sky stars background).

---

## Technical Features
* Smooth interpolation (Linear Interpolation - Lerp or GSAP spring eases).
* CSS 3D Perspective & Depth of Field (realtime focal blur filters).
* Layout-shift prevention (Transforms are computed relative to a fixed viewport container).
* Zero sudden or abrupt jumps in camera movement.

---

## Deliverables
Before coding:
1. Explain camera transform mathematical interpolation (Lerp).
2. Explain CSS 3D Perspective & Depth of Field (blur) implementation.
3. Explain camera positions mapping schema.

After approval:
* Implement.
