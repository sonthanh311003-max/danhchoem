# DIGITAL MEMORIES
# PHASE 6
# IMPLEMENTATION STANDARDS

Version 1.0

---

# PURPOSE

This document defines how code should be written.

Every implementation must follow these rules.

Code quality is part of user experience.

Beautiful UI built on poor code is unacceptable.

---

# CORE PRINCIPLE

Always optimize for:

* Readability
* Maintainability
* Scalability
* Performance
* Developer Experience

Never optimize for writing fewer lines.
Optimize for long-term quality.

---

# TECHNOLOGY STACK

* **Framework**: Next.js (App Router)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS
* **Animation**: Framer Motion, GSAP
* **State**: Zustand
* **Database**: Supabase
* **Images**: Cloudinary
* **Analytics**: PostHog
* **Error Tracking**: Sentry
* **Deployment**: Vercel
* **CDN**: Cloudflare

---

# TYPESCRIPT

Always use strict mode.
Never use `any`.

If unknown: `unknown`.
If optional: `?`.

Create proper interfaces.
Export reusable types.
Avoid duplicated types.

---

# COMPONENT STRUCTURE

Every component should follow:
* `Component.tsx`
* `Component.types.ts`
* `Component.styles.ts`
* `Component.motion.ts`
* `Component.hooks.ts`
* `index.ts`

Never place everything inside one file.

---

# COMPONENT RESPONSIBILITY

One component. One purpose.
Never create "God Components".

If larger than 300 lines: **Split**.

---

# FEATURE STRUCTURE

Every feature owns:
* Components
* Hooks
* Animations
* Types
* Utils
* Assets
* Tests

Nothing else.

---

# STATE MANAGEMENT

* **Local UI State**: `useState`
* **Feature State**: Feature Hook
* **Global State**: Zustand
* **Server Data**: Supabase

Never store server data inside global state.

---

# DATA FLOW

User
↓
UI
↓
Hook
↓
Service
↓
Supabase
↓
Return

Never fetch inside random components.

---

# SERVICES

Every API call belongs inside `services/`.
Examples:
* `letter.service.ts`
* `gallery.service.ts`
* `music.service.ts`
* `memory.service.ts`

Never mix fetch logic inside components.

---

# CUSTOM HOOKS

Every repeated logic should be extracted to a hook.
Examples:
* `useViewport()`
* `useResponsive()`
* `useMusic()`
* `useScroll()`
* `usePageTurn()`
* `useMemory()`
* `useAnimation()`

---

# STYLING

Never hardcode spacing.
Never hardcode colors.
Never hardcode radius.

Everything comes from Design Tokens.

---

# RESPONSIVE

Desktop First
↓
Tablet
↓
Mobile

Every component must support viewports:
* 320px, 375px, 390px, 768px, 1024px, 1280px, 1440px, 1920px

Never assume viewport.

---

# SAFE AREA

* **Desktop**: 48px
* **Tablet**: 32px
* **Mobile**: 20px

Maintain breathing room.

---

# IMAGES

* Always `Next/Image`.
* Lazy Load.
* Responsive sizing.
* Blur Placeholder.
* Cloudinary.
* Never use `img` unless absolutely necessary.

---

# MOTION

Never animate `width`, `height`, `left`, `top`.
Prefer `opacity`, `transform` (`scale`, `translate`).
GPU accelerated only.

---

# ANIMATION TOOLS

* **Framer Motion**: Micro Interactions (Hover, Buttons, Cards, Fade, Scale, Spring)
* **GSAP**: Page Turn, Camera, Scroll, Timeline, Complex sequences

---

# PERFORMANCE

* Always Lazy Load
* Dynamic Import
* Memoization
* Image Compression
* Code Splitting
* Tree Shaking
* Minimize Hydration
* Avoid unnecessary Client Components.

---

# ACCESSIBILITY

Every component must support:
* Keyboard navigation
* ARIA labels
* Focus states
* Reduced Motion
* Screen Readers
* Semantic HTML

Accessibility is never optional.

---

# SEO

* Metadata
* Open Graph
* Twitter Card
* Structured Data
* Semantic HTML
* Readable URLs
* Optimized Images

---

# ERROR HANDLING

Every async action must have:
* Loading
* Success
* Error
* Retry
* Offline

Never silently fail.

---

# LOGGING

Development: Debug, Warning, Error, Analytics.
Never leave `console.log()` inside production.

---

# FILE NAMING

* **PascalCase**: Components
* **camelCase**: Hooks
* **kebab-case**: Routes

Never mix naming conventions.

---

# IMPORT ORDER

External
↓
Internal
↓
Components
↓
Hooks
↓
Utils
↓
Styles
↓
Types

Consistent imports improve readability.

---

# COMMENTS

Do not comment obvious code.
Comment **Why**, not **What**.

*Good:*
```javascript
// This animation delays intentionally
// to create anticipation.
```

*Bad:*
```javascript
// Increase x by 10
```

---

# REFACTORING

Every implementation should leave the project better than before.
* Remove duplication.
* Extract reusable logic.
* Improve naming.
* Simplify code.

---

# TESTING

Every feature should be testable:
* Unit
* Integration
* Visual Regression
* End to End

Even if tests are added later.

---

# SECURITY

* Never trust client input.
* Validate server side.
* Escape user content.
* Protect secrets.
* Never expose API keys.

---

# GIT

* Small commits.
* Clear commit messages.
* One logical change per commit.

---

# CODE REVIEW

Before every commit ask:
* Is this readable?
* Is this reusable?
* Is this responsive?
* Is this accessible?
* Is this performant?
* Is this beautiful?
* Would another developer understand this?

If not: **Improve**.

---

# AI RESPONSIBILITIES

Before writing code:
Review: Product Manifesto
↓
Design System
↓
UX Bible
↓
Component Bible
↓
Implementation Standards
↓
Existing Code
↓
Then Implement.

Never skip these steps.

---

# FINAL PRINCIPLE

Write code that another developer will enjoy maintaining five years from now.
Not code that only works today.
