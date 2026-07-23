# MemoryOS Cinematic Hero Experience Specification
# Version 1.0

This document defines the layout and lighting architecture for the Hero Opening Experience. It prevents layout breaks across viewports (320px to ultrawide) and supports browser zoom configurations (80% to 150%).

---

## 📐 1. Architectural Philosophy: The Secret Library
The Hero scene is not a website page; it is a viewport into "The Memory Archive". The scene composition is anchored by a centered wooden desk holding the cotton envelope under warm volumetric sunlight.

---

## 🎬 2. The 7 Scenes Timeline

* **Scene 1 (Silence)**: Deep dark paper texture. Ambient particles. After 1s, golden god rays slowly project onto the center.
* **Scene 2 (The Reveal)**: The library backdrop fades in, camera performs a subtle 3D push forward (`translateZ`).
* **Scene 3 (The Vessel)**: Envelope receives volumetric light. Golden dust floats.
* **Scene 4 (Tactile Parallax)**: Cursor movement moves the envelope and background elements by 5-10px in 3D space.
* **Scene 5 (Breathe)**: Envelope performs a slow, harmonic vertical floating translation.
* **Scene 6 (Hover)**: Wax seal gains a soft golden glow. Deep shadows dynamically shift outward.
* **Scene 7 (The Ceremony)**: Click -> 200ms pause -> Camera zooms in -> Envelope opens -> Transition.

---

## 📐 3. The Smart Responsive Layout Engine
To fix envelope clipping and browser zoom issues, the layout engine uses fluid coordinates:
* **No hardcoded dimensions**: Envelope size calculated via `clamp(280px, 35vw, 480px)` and aspect-ratio.
* **Centered Composition**: Absolute centering using CSS Grid with auto-margins inside the safe zone.
* **Adaptive scaling**: Monitors viewport changes using `ResizeObserver` and dynamically updates CSS custom properties.
