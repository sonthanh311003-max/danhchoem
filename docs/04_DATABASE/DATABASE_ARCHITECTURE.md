# DIGITAL MEMORIES
# PHASE 8
# DATABASE ARCHITECTURE

Version 1.0

---

# PURPOSE

This document defines the complete data architecture for Digital Memories.
The database must be scalable, secure, and optimized for future SaaS growth.

---

# DATABASE SPECIFICATION

* **Normalized Entities**: Users, Couples, Projects, Memories (Events), MemoryAssets, Letters, Themes, Music, Shares, Comments.
* **RLS (Row Level Security)**: Enabled on all tables. Users only read/write their own data; guests read public visibility items.
* **Soft Delete**: Uses `deleted_at` timestamp.
* **Indexes**: Slug, project_id, memory_id, and date indices to optimize lookup queries.
