# DIGITAL MEMORIES
# PHASE 6
# IMPLEMENTATION STANDARDS

Version 1.0

---

# PURPOSE

Code quality is part of user experience.
Beautiful UI built on poor code is unacceptable.

---

# CODING STANDARDS

* **TypeScript Strict Mode**: Never use `any`. Always declare explicit interfaces and helper types.
* **Component Limits**: 300 lines maximum size. If larger, split the file.
* **Import Order**: External first -> Internal -> Features -> Shared -> Styles -> Types.
* **Performance Budget**: Target 60 FPS, lazy load maps/Spotify iframes, compress images, and use GPU accelerated properties (`transform`, `opacity`) for animations.
* **Accessibility**: Keyboard navigation, ARIA labels, focus states, and semantic HTML apply to every component without exception.
