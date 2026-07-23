# DIGITAL MEMORIES
# PHASE 8.5
# DESIGN TOKENS

Version 1.0

---

# PURPOSE

This document defines the visual foundation of Digital Memories.

Every color.
Every spacing.
Every radius.
Every shadow.
Every animation.
Every component.
Must reference these tokens.

Never hardcode visual values.
The Design Token System is the single source of truth.

---

# PHILOSOPHY

Consistency creates trust.
Tokens create consistency.
Design should be programmable.
Changing one token should update the entire application.

---

# COLOR TOKENS

Do not write: `background: #ffffff`
Use:
* `surface-primary`
* `surface-secondary`
* `surface-tertiary`
* `paper`
* `paper-dark`
* `paper-aged`
* `glass`
* `glass-light`
* `glass-heavy`
* `text-primary`
* `text-secondary`
* `text-muted`
* `accent-love`
* `accent-nostalgia`
* `accent-hope`
* `accent-gold`
* `accent-autumn`
* `success`
* `warning`
* `danger`

---

# PAPER COLORS

The application is inspired by physical memories.
Paper should never be pure white.
Use warm ivory tones.
Paper should look touchable.

---

# TYPOGRAPHY TOKENS

* `display-xl`
* `display-lg`
* `heading-xl`
* `heading-lg`
* `heading-md`
* `heading-sm`
* `body-lg`
* `body-md`
* `body-sm`
* `caption`
* `quote`
* `letter`
* `signature`

---

# FONT SCALE

Use `clamp()` for every font.
Never fixed px.
Typography should scale naturally.

---

# SPACING TOKENS

* `space-1` (4px)
* `space-2` (8px)
* `space-3` (12px)
* `space-4` (16px)
* `space-6` (24px)
* `space-8` (32px)
* `space-10` (40px)
* `space-12` (48px)
* `space-16` (64px)
* `space-20` (80px)
* `space-24` (96px)

Never invent spacing.

---

# BORDER RADIUS

* `radius-xs` (2px)
* `radius-sm` (4px)
* `radius-md` (8px)
* `radius-lg` (12px)
* `radius-xl` (18px)
* `radius-2xl` (24px)

Usage guidelines:
* Paper: medium radius
* Buttons: large radius
* Dialogs: extra large radius

---

# SHADOW TOKENS

* `shadow-soft`
* `shadow-medium`
* `shadow-paper`
* `shadow-floating`
* `shadow-dialog`
* `shadow-premium`

Never black shadows. Use layered shadows.

---

# MOTION TOKENS

* `duration-fast` (150–250ms)
* `duration-normal` (250–450ms)
* `duration-slow` (450–600ms)
* `duration-cinematic` (600–1200ms)
* `ease-standard`
* `ease-spring`
* `ease-soft`
* `ease-paper`

Never hardcode transition durations.

---

# Z INDEX

* `background`
* `content`
* `floating`
* `modal`
* `overlay`
* `toast`

Never random z-index values.

---

# BREAKPOINTS

* `mobile` (320px - 480px)
* `tablet` (481px - 768px)
* `laptop` (769px - 1024px)
* `desktop` (1025px - 1440px)
* `ultrawide` (1441px+)

Use container queries where appropriate.

---

# GRID

* **Desktop**: 12 columns
* **Tablet**: 8 columns
* **Mobile**: 4 columns

Maintain consistent gutters.

---

# SAFE AREA

* **Desktop**: 48px
* **Tablet**: 32px
* **Mobile**: 20px

---

# OBJECT TOKENS

Objects: Envelope, Book, Letter, Film, Locket, Photo, Timeline, Music.

Each object should expose:
* `background`
* `shadow`
* `radius`
* `texture`
* `motion`
* `hover`
* `focus`

---

# ICON TOKENS

Use one icon library: **Lucide**.
Never mix icon styles.

---

# ANIMATION TOKENS

* `Fade`
* `Scale`
* `Depth`
* `Paper Fold`
* `Page Turn`
* `Object Lift`
* `Light Reveal`
* `Blur Reveal`

Every animation should be reusable.

---

# RESPONSIVE TOKENS

Use `clamp()`, `min()`, `max()`, `vw`, `rem`.
Never use fixed widths unless absolutely necessary.

---

# ACCESSIBILITY TOKENS

* Minimum font size
* Minimum touch target
* Minimum contrast
* Focus ring
* Reduced motion

Everything configurable.

---

# IMPLEMENTATION RULES

Every component must consume tokens.
* No magic numbers.
* No duplicated values.
* No inline colors.
* No inline spacing.
* No inline animation durations.

---

# AI RESPONSIBILITY

Whenever generating UI:
1. Read Design Tokens first.
2. If a required token does not exist, suggest adding it.
3. Never create ad-hoc values.

---

# FINAL PRINCIPLE

The Design Token System is the visual language of Digital Memories.
Every pixel begins here.
