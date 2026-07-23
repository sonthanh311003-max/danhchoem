# Sprint 2 Refactor
# Memory Companion & Conversation Flow

Priority: Critical (P0 & P1 & P2 Refinements)

---

## 🎯 Architectural Shift: From Wizard to Companion
We are moving away from the transaction-oriented "Question-Answer" form model. MemoryOS is a **keepsake builder**, so the creation flow must feel like a cozy, intimate conversation with a supportive friend:
`Conversation -> Story -> Emotion -> Creation`

---

## 📋 P0 Features
1. **Interactive Conversations**: Differentiate between AI prompting and user choice. AI reacts immediately to choices (e.g. "That's beautiful. Let's make something unforgettable.") before transitioning.
2. **Micro Transitions (300-500ms)**: Scale 0.98 -> Fade -> Slide out -> Slide in next card.
3. **Journey Indicator**:
   `❤️ (Recipient) ─── 📖 (Occasion) ─── 📸 (Photos) ─── 🎵 (Music) ─── ✨ (Creation)`

---

## 📋 P1 Features
1. **AI Assistant Avatar**: Dynamic assistant bubbles (`Emma` / `Luna`) visible in the bottom-left corner with supportive prompts.
2. **AI Thinking States (Step 8)**: Cycle through evocative phrases every 2 seconds during draft generation.

---

## 📋 P2 Features
1. **Cinematic Preview Entry**: Camera zoom scaling on keepsake click to enter the experience.
2. **Theme Music Preview (5s)**: Auto-plays 5s music preview during Step 4 Theme Selection.
3. **Structured Polaroid Layout**: Dynamic CSS z-index and rotation depending on photo priority (cover in center, secondary tilted, background behind).
