# Sprint 6 Specs: AI Memory Engine & Emma Companion
Priority: Critical

This sprint establishes the decentralized AI architecture that drives the emotional companion, suggestions, theme/music recommendation, and pre-publish reviews.

---

## 🏛️ AI Architecture (Task 10)
Instead of one massive AI utility file, AI services are split into modular, single-responsibility services:
1. **AI Gateway** (`ai.gateway.js`): Coordinates and proxies requests, handles rate limits, fallbacks, and retry mechanisms.
2. **Story Service** (`story.service.js`): Parses raw moments to organize chronological timelines.
3. **Theme Service** (`theme.service.js`): Computes visual themes matching photo/text sentiment analysis.
4. **Music Service** (`music.service.js`): Recommends melodies and processes 5s previews.
5. **Letter Service** (`letter.service.js`): Gentle suggestions, toning, and rewriting without replacing the user's voice.
6. **Review Service** (`review.service.js`): Analyzes keepsakes for missing descriptions/selections before final saving.
