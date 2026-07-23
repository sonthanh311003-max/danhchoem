# DIGITAL MEMORIES
# API ARCHITECTURE

Version 1.0

---

# PURPOSE

This document defines the backend architecture.

The frontend should never communicate directly with the database.

Every operation must pass through a service layer.

The backend exists to protect data integrity.

---

# ARCHITECTURE

Client
↓
UI Components
↓
Custom Hooks
↓
Services
↓
Server Actions / API
↓
Supabase
↓
Database

Never bypass this flow.

---

# BACKEND PHILOSOPHY

The backend should be:
* Predictable
* Secure
* Reusable
* Typed
* Maintainable

Every request should have one clear responsibility.

---

# SERVER ACTIONS

Prefer Next.js Server Actions.
Only use REST endpoints when necessary.

Every Server Action must:
* Validate input
* Authorize user
* Execute business logic
* Return typed response
* Handle errors
* Log important events

---

# VALIDATION

All input must be validated.
Never trust the client.
Use Zod schemas.

Every request has:
Input Schema
↓
Validation
↓
Transformation
↓
Execution
↓
Typed Response

Reject invalid data immediately.

---

# RESPONSE FORMAT

Every API response follows:
* `success` (boolean)
* `data`
* `error`
* `metadata`

Example:
```json
{
  "success": true,
  "data": {},
  "error": null,
  "metadata": {}
}
```

Never return inconsistent structures.

---

# ERROR HANDLING

Define standard error codes:
* `UNAUTHORIZED`
* `FORBIDDEN`
* `NOT_FOUND`
* `VALIDATION_ERROR`
* `CONFLICT`
* `RATE_LIMIT`
* `INTERNAL_ERROR`

Every error should include:
* Code
* Message
* Suggested Action

---

# AUTHORIZATION

Every request checks:
Authentication
↓
Project Access
↓
Resource Ownership
↓
Permission
↓
Execution

Never expose another user's data.

---

# BUSINESS SERVICES

Create dedicated services:
* `memory.service.ts`
* `letter.service.ts`
* `gallery.service.ts`
* `share.service.ts`
* `theme.service.ts`
* `music.service.ts`
* `analytics.service.ts`
* `notification.service.ts`

Services own business logic. Components never do.

---

# CACHING

Cache:
* Themes
* Templates
* Public Pages
* Images
* Metadata

Avoid caching private content.

---

# FILE UPLOAD

Uploads go through:
Validation
↓
Virus Check (future-ready)
↓
Compression
↓
Cloudinary
↓
Metadata saved to database

Never upload directly to storage without validation.

---

# SHARE LINKS

Generate secure tokens.
Support:
* Password protection
* Expiration
* Read-only mode
* Single-use links
* Analytics tracking

---

# ANALYTICS

Track:
* Page View
* Memory Open
* Letter Read
* Gallery View
* Music Play
* Timeline Scroll
* Share Click
* Session Duration

Never store sensitive personal content.

---

# NOTIFICATIONS

Future support:
* Invitation Accepted
* Memory Added
* Theme Changed
* Project Published
* Anniversary Reminder

Email and in-app notifications should use the same event system.

---

# RATE LIMITING

Protect:
* Login
* Share Links
* Uploads
* Invitations
* AI Generation

Prevent abuse.

---

# LOGGING

Every important action creates an activity log: Create Project, Delete Memory, Publish Website, Download PDF, Share Link.

Logs should include:
* User
* Action
* Timestamp
* Target Resource

---

# SECURITY

* Never expose secrets.
* Never expose service keys.
* Use environment variables.
* Sanitize all user content.
* Escape HTML where necessary.
* Prevent XSS.
* Prevent CSRF.
* Prevent SQL Injection.

---

# BACKUP

Every critical operation should support recovery.
* Soft delete first.
* Permanent delete only after confirmation.
* Support future undo.

---

# API VERSIONING

Prepare for future versions (`v1`, `v2`).
Do not break existing clients.

---

# OBSERVABILITY

Integrate:
* Sentry
* PostHog
* Performance Metrics
* Error Tracking
* User Journey Analysis

---

# AI RESPONSIBILITY

Before creating a new endpoint ask:
* Can an existing service handle this?
* Can it be reused?
* Does it respect architecture?

If not: **refactor first**.

---

# FINAL PRINCIPLE

APIs are contracts.
Once published, they should remain stable, predictable, and trustworthy.
