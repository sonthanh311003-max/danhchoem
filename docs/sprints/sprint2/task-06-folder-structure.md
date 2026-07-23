# Sprint 2
# Task 06
# Folder Structure Standardization

Priority: Critical
Estimated Time: 1-2 hours

---

## Goal
Standardize the project's folder structure inside `src/` to ensure maintainability and clean boundaries.

---

## Directory Schema
```
src/
├── app/                  # Next.js App Router pages & APIs
├── components/           # Shared UI components (Button, Modal, Input)
├── features/             # Feature-based modular containers
│   ├── auth/             # Login, signup, reset password logic
│   ├── projects/         # Project listing, card management
│   ├── wizard/           # Guided Creation Flow steps
│   ├── viewer/           # Keepsake physical view experiences
│   └── editor/           # Keepsake minor tweaking/editor panel
├── services/             # Pure business services (auth, project, letter)
├── hooks/                # Global custom React hooks
├── lib/                  # Initializations (Supabase client, Cloudinary)
├── types/                # Strict TypeScript declaration types
├── stores/               # Zustand global state stores
└── styles/               # Design tokens, CSS variables, global styles
```

---

## Deliverables
Before coding:
1. Explain folder mapping and migration of existing files.

After approval:
* Implement.
