# Sprint 3
# Task 10
# Viewer Synchronization

Priority: Critical
Estimated Time: 3-4 hours

---

## Goal
Implement a live synchronized viewport rendering logic in the Center Canvas editor.

---

## Pipeline Flow
`Editor Input -> Zustand State -> Live React Props -> Realtime Render Viewport`

---

## Features
* Dual-mode layout state (Edit Panel vs Sandbox Live Preview).
* Immediate local state update for zero latency.
* High frame rate (60 FPS) rendering during active properties changes.
