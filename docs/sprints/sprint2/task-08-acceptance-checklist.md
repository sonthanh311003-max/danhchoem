# Sprint 2
# Task 08
# Acceptance Checklist

Priority: Critical
Estimated Time: 2-3 hours

---

## Goal
Verify all features implemented in Sprint 2 function correctly without defects.

---

## Acceptance Criteria
1. **Authentication**: Users can sign up, log in, verification email works, and logout redirects cleanly.
2. **Onboarding Wizard**: Guided creation flow correctly asks 8 questions, supports back button, and preserves inputs.
3. **Database Insertion**: Submitting the wizard correctly writes a new Project and Couple relationship with UUIDs into the Supabase PostgreSQL database.
4. **Preview Generation**: The `/preview/[id]` page renders: Envelope (open animations) -> Letter -> Gallery -> Timeline -> Ending.
5. **Responsive**: Fully optimized for mobile and desktop screens.
6. **Error Budget**: Lighthouse scores above 90 (performance & accessibility), zero console errors.

---

## Verification Plan
1. Test auth flow manually using test accounts.
2. Complete onboarding step-by-step and inspect database records.
3. Check responsive layouts using Chrome DevTools emulator.
4. Run Lighthouse audits on production builds.
