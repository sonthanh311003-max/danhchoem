# DIGITAL MEMORIES
# API ARCHITECTURE

Version 1.0

---

# PURPOSE

This document defines the backend architecture services.
The frontend should never communicate directly with the database.
Every operation must pass through a service layer.

---

# DATA FLOW CONTRACT

`Client UI -> Hooks -> Services -> Server Actions / API -> Supabase DB`

---

# BUSINESS SERVICES

Create isolated modules for REST endpoints and Server Actions:
* `memory.service.ts`
* `letter.service.ts`
* `gallery.service.ts`
* `share.service.ts`
* `theme.service.ts`
* `music.service.ts`

---

# INPUT VALIDATION

Use Zod Schemas on every server entry point to validate data constraints (UUID formatting, regex dates, string lengths) before DB execution.
