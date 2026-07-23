# DIGITAL MEMORIES
# PHASE 2
# ENGINEERING ARCHITECTURE

Version 1.0

---

# OBJECTIVE

Stop building features.

Start building a platform.

This project must evolve from a collection of pages into a scalable software architecture.

Today's goal is not visual improvement.

Today's goal is technical excellence.

---

# ENGINEERING PHILOSOPHY

A beautiful product with bad architecture will eventually fail.

Good architecture creates:
* Consistency
* Scalability
* Maintainability
* Performance
* Developer Happiness
* Future AI Collaboration

Every decision should optimize long-term development.

---

# PROJECT STRUCTURE

Refactor into Feature-Based Architecture.
Example:
* `src/app/`
* `src/features/`
* `src/shared/`
* `src/services/`
* `src/lib/`

Every folder must have one responsibility.

---

# FEATURES

Each feature should become an isolated module: `hero`, `letter`, `gallery`, `timeline`, `counter`, `book`, `locket`, `music`, `future-letter`, `bucket-list`, `memory-engine`.

Every feature owns its components, hooks, animations, styles, and logic. No feature should directly depend on another feature.

---

# PLUGIN-BASED EDITOR PLATFORM

* **Editor Registry**: The core Editor framework does not hardcode any specific memory object. It acts as an orchestrator or registry.
* **Self-Contained Plugins**: Every object (Letter, Book, Locket, Film Roll, Scrapbook) must be designed as an independent plugin.
  * It defines its own **Canvas Component** (3D physics rendering).
  * It defines its own **Inspector Controls Component** (properties config sidebar).
  * It defines its own **Validation Schema & Context Structure**.
* **Zero Modification Expansion**: Registering a new object (e.g. Scrapbook) must only involve adding it to the Editor Registry config. The core Toolbar, Sidebar, and Canvas layouts must remain untouched.

---

# MAX COMPONENT SIZE

Preferred: < 200 lines.
Maximum: 300 lines. If larger, split the component.

---

# STATE MANAGEMENT

Separate Global State (Zustand) from Server Data (Supabase) and Local UI State (useState). Avoid prop drilling and unnecessary Context Providers.

---

# RESPONSIVE SYSTEM

Never use fixed width or fixed height. Use CSS fluid mathematical functions (`clamp()`, `min()`, `max()`), Flexbox, Grid, and Container Queries.
   - Safe Area: Desktop 48px, Tablet 32px, Mobile 20px.

---

# PERFORMANCE & ACCESSIBILITY

Target 60 FPS, zero layout shift, minimal re-renders, and lazy loading. Ensure WCAG AA minimum accessibility (keyboard navigation, ARIA labels, focus states, and reduced motion).
