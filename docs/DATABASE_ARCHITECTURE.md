# DIGITAL MEMORIES
# PHASE 8
# DATABASE ARCHITECTURE

Version 1.0

---

# PURPOSE

This document defines the complete data architecture for Digital Memories.

The database must be scalable, secure, extensible, and optimized for future SaaS growth.

Every table should have a single responsibility.

Every relationship should be explicit.

Never duplicate data.

---

# DATABASE PRINCIPLES

* Normalize data where appropriate.
* Avoid unnecessary joins.
* Prefer UUID primary keys.
* Use timestamps everywhere.
* Support soft deletion (deleted_at).
* Design for future scalability.
* Every table must support Row Level Security (RLS).

---

# PRIMARY ENTITIES

* Users
* Projects
* Couples
* Memories
* MemoryAssets
* Letters
* Themes
* Music
* Templates
* Shares
* Invitations
* Bookmarks
* Notifications
* Subscriptions
* AnalyticsEvents
* ActivityLogs
* Comments

---

# USERS

Represents a registered account.

* `id` (uuid, PK)
* `email`
* `display_name`
* `avatar_url`
* `language`
* `timezone`
* `created_at`
* `updated_at`
* `deleted_at`

---

# COUPLES

Represents two users connected together.

* `id` (uuid, PK)
* `owner_id` (uuid, FK -> Users)
* `partner_id` (uuid, FK -> Users)
* `anniversary`
* `status`
* `relationship_title`
* `created_at`
* `updated_at`

Rules:
* One user may belong to multiple projects.
* One project belongs to one couple.

---

# PROJECTS

Represents one Digital Memories website.

* `id` (uuid, PK)
* `couple_id` (uuid, FK -> Couples)
* `slug` (unique)
* `title`
* `description`
* `cover_image`
* `theme_id` (uuid, FK -> Themes)
* `visibility`
* `password_hash`
* `status`
* `published_at`
* `created_at`
* `updated_at`

---

# MEMORIES

Core entity of the platform.

* `id` (uuid, PK)
* `project_id` (uuid, FK -> Projects)
* `title`
* `story` (text)
* `emotion` (enum)
* `date` (date)
* `location`
* `latitude`
* `longitude`
* `weather`
* `cover_asset` (text)
* `favorite` (boolean)
* `order` (integer)
* `created_at`
* `updated_at`
* `deleted_at`

Never hardcode timeline order. Always support reordering.

---

# MEMORY ASSETS

Stores media.

* `id` (uuid, PK)
* `memory_id` (uuid, FK -> Memories)
* `type` (photo / video / audio / document)
* `url`
* `thumbnail`
* `duration`
* `size`
* `width`
* `height`
* `cloudinary_public_id`
* `created_at`

---

# LETTERS

Represents every handwritten letter.

* `id` (uuid, PK)
* `project_id` (uuid, FK -> Projects)
* `title`
* `content` (text)
* `font_style`
* `paper_style`
* `signature`
* `locked`
* `created_at`
* `updated_at`

---

# THEMES

Theme metadata.

* `id` (uuid, PK)
* `name`
* `palette` (json)
* `font` (json)
* `background` (text)
* `motion_profile` (json)
* `texture` (text)
* `soundscape` (text)
* `preview_image`

---

# MUSIC

* `id` (uuid, PK)
* `title`
* `artist`
* `source`
* `duration`
* `cover`
* `loop` (boolean)
* `volume` (float)
* `fade_in` (integer)
* `fade_out` (integer)

---

# SHARES

Shareable links.

* `id` (uuid, PK)
* `project_id` (uuid, FK -> Projects)
* `token` (unique)
* `expires_at`
* `password`
* `allow_download`
* `allow_comments`
* `created_at`

---

# INVITATIONS

Invite partner.

* `id` (uuid, PK)
* `project_id` (uuid, FK -> Projects)
* `email`
* `status`
* `accepted_at`
* `created_at`

---

# COMMENTS

Optional guestbook.

* `id` (uuid, PK)
* `project_id` (uuid, FK -> Projects)
* `author`
* `content`
* `created_at`

---

# BOOKMARKS

Allows saving favorite memories.

* `id` (uuid, PK)
* `user_id` (uuid, FK -> Users)
* `memory_id` (uuid, FK -> Memories)
* `created_at`

---

# NOTIFICATIONS

* `id` (uuid, PK)
* `user_id` (uuid, FK -> Users)
* `type`
* `payload` (json)
* `read` (boolean)
* `created_at`

---

# ANALYTICS EVENTS

Track interactions.

* `id` (uuid, PK)
* `project_id` (uuid, FK -> Projects)
* `event` (Letter Open / Book Open / Gallery Open / Music Play / Timeline Scroll / Share Click / Completion)
* `page`
* `metadata` (json)
* `device`
* `browser`
* `country`
* `created_at`

Never track personal story content. Only interaction metrics.

---

# ACTIVITY LOG

Track important actions: Create Memory, Delete Memory, Publish, Share, Invite, Theme Change, Music Change.

---

# SUBSCRIPTIONS

Future SaaS billing.

* `id` (uuid, PK)
* `user_id` (uuid, FK -> Users)
* `plan`
* `status`
* `renewal_date`
* `stripe_customer`
* `created_at`

---

# RELATIONSHIPS

User
↓
Couple
↓
Project
↓
Memory
↓
Memory Asset

Every relation must use foreign keys. Never store duplicated references.

---

# ROW LEVEL SECURITY

Every table must enable RLS.
* Users can only read their own projects.
* Partners can read shared projects.
* Guests only read published data.
* Private memories remain hidden.

---

# STORAGE

* **Cloudinary**: Photos, Videos, Thumbnails
* **Supabase Storage**: Letters, Attachments, Exports, Backups

---

# INDEXES

Index on:
* `slug`
* `project_id`
* `memory_id`
* `date`
* `emotion`
* `created_at`
* `visibility`

Optimize search.

---

# SEARCH

Support searching by:
* Emotion, Title, Story, Location, People, Date, Tags, Year, Favorites

---

# SOFT DELETE

Never permanently delete immediately.
* `deleted_at` timestamp.
* Background cleanup later.

---

# BACKUP STRATEGY

* Daily database backup.
* Weekly storage snapshot.
* Monthly archive.
* Support project restore.

---

# MIGRATION RULES

* Every schema change must use migrations.
* Never edit production tables manually.
* Version every migration.

---

# SECURITY

* Validate all input.
* Never trust the client.
* Use Supabase Auth.
* Use signed URLs for private assets.
* Hash passwords.
* Encrypt sensitive values.

---

# PERFORMANCE

* Paginate large datasets.
* Lazy load media.
* Optimize queries.
* Avoid N+1 queries.
* Cache frequently accessed data.

---

# FUTURE EXTENSIONS

The schema must support:
* Family Memories, Travel Journals, Wedding Albums, Pet Memories, Graduation, Business Portfolio, Marketplace, Creator Templates, AI Generated Projects without redesigning the database.

---

# AI RESPONSIBILITIES

* Never bypass the schema.
* Never create undocumented tables.
* Always follow entity relationships.
* Suggest schema improvements only through migrations.
* The database is the single source of truth.

---

# FINAL PRINCIPLE

A memory lasts forever.
The database should be designed with the same mindset.
