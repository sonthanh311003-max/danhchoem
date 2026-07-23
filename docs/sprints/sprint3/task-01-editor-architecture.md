# Sprint 3
# Task 01
# Editor Architecture

Priority: Critical
Estimated Time: 5-8 hours

---

## Goal
Design the MemoryOS Experience Editor.

## Philosophy
This editor is NOT Canva, Figma, or Notion.
It is an Experience Editor.
Users edit memories, not layouts.

---

## Layout Structure
* **Left Sidebar**: Navigation, assets library, memory event list.
* **Center Canvas**: Interactive 3D preview render of the active keepsake object.
* **Right Inspector**: Emotional metadata controls (title, date, emotional tone, tags).
* **Bottom Timeline**: Chronological event list, transition timeline.
* **Top Toolbar**: Save status, preview toggle, publish action.

---

## Plugin Registry Architecture
The core Editor contains NO hardcoded memory object logic.
Everything is dynamically resolved through a central **Plugin Registry Config**:
```typescript
interface ObjectPlugin {
  id: string; // e.g. 'letter', 'book', 'locket'
  CanvasComponent: React.ComponentType<any>;
  InspectorComponent: React.ComponentType<any>;
  schema: z.ZodSchema;
  defaultData: any;
}
```
Adding new experiences (Locket, Scrapbook, Memory Box) in the future requires registering a new plugin config object, keeping the core Editor codebase untouched.

---

## Design Rules
* Never use floating windows.
* Keep everything clean, minimal, and premium (Apple-level polish).

---

## Deliverables
Before coding:
1. Explain editor layout & component tree.
2. Explain realtime preview syncing mechanism.
3. Explain workspace state management.

After approval:
* Implement.
