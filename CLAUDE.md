# CLAUDE.md --- Master Project Index & Guide

## Project Vision
**Global Musician Services Marketplace**
Transforming the way world-class talent is discovered and hired. We prioritize trust, creator-centricity, and an editorial, premium aesthetic.

---

## 🧭 Source of Truth Index

To maintain consistency, all implementations must reference these core documents:

### 🎨 [Design System](file:///Users/mehmetaydin/Desktop/musician-ds/docs/design-system/design-system-guidelines.md)
*   **Contents:** Visual language, Typography (8px grid), Motion rules, and Component Library.
*   **Focus:** Ensuring a high-end, cohesive look and feel.

### 📄 [Page Templates](file:///Users/mehmetaydin/Desktop/musician-ds/docs/templates/)
*   **[Musician PLP](file:///Users/mehmetaydin/Desktop/musician-ds/docs/templates/musician-plp-template.md):** Discovery and comparison strategy.
*   **[Musician PDP](file:///Users/mehmetaydin/Desktop/musician-ds/docs/templates/musician-pdp-template.md):** Conversion and trust-building structure.

### 3. Architecture & Data
**Path:** [/docs/architecture/](file:///Users/mehmetaydin/Desktop/musician-ds/docs/architecture/)
*   **[Data Schema](file:///Users/mehmetaydin/Desktop/musician-ds/docs/architecture/data-schema.md):** Core models for Musicians, Services (with tiered pricing), and platform growth.
*   **[Discovery & Search](file:///Users/mehmetaydin/Desktop/musician-ds/docs/architecture/discovery-and-search.md):** Ranking algorithms, search matching logic, and filtering rules.

### 4. Strategy & Trust
**Path:** [/docs/ux/trust-signals-and-conversion.md](file:///Users/mehmetaydin/Desktop/musician-ds/docs/ux/trust-signals-and-conversion.md)
*Focus:* Reducing hiring uncertainty and optimizing the booking funnel.

---

## 💎 UI Philosophy & Tone
*   **Editorial over Utility:** The interface should feel like a high-end portfolio, not a generic spreadsheet.
*   **Media-First:** Audio and video are the primary "proof" of quality.
*   **Generous Space:** Leverage whitespace to emphasize high-value content.
*   **Verification:** Prominently display trust signals (ratings, badges, response times).

---

## 🛠️ Implementation Guardrails
1.  **Check the Grid:** Always align with the 8px spacing system.
2.  **Typography first:** Use font weights and sizes to define hierarchy before borders or shadows.
3.  **Modular Logic:** Build for reusability without sacrificing the unique "editorial" feel of pages.
4.  **Async Excellence:** Use skeleton states for all data fetching.

---

## 🏗️ Repository Structure

```
prova/
├── .storybook/              # Storybook config (main.js, preview.js)
├── docs/                    # Centralized expert documentation
├── src/                     # Frontend – React design system components
│   ├── index.js             # Barrel export file for all components
│   ├── components/          # ~37 component directories (each with .jsx + .module.css)
│   ├── tokens/              # Design tokens (tokens.css — CSS custom properties)
│   └── mocks/               # Mock data used in Storybook stories
├── server/                  # Backend – Express REST API
│   ├── src/
│   │   ├── index.ts         # Server entry point (Express app setup)
│   │   ├── db.ts            # SQLite database initialization & schema
│   │   ├── seed.ts          # Database seeding script (12 musicians)
│   │   ├── middleware/      # Auth middleware (JWT verification)
│   │   ├── routes/          # API route handlers (auth, musicians, profile)
│   │   └── schemas/         # Zod validation schemas
│   ├── prisma/
│   │   ├── schema.prisma    # Prisma schema (User, MusicianProfile, Service)
│   │   └── migrations/      # Database migrations
│   ├── package.json
│   └── tsconfig.json
├── package.json             # Frontend package (Storybook / design system)
└── CLAUDE.md                # This file
```

---

## 🚀 Common Workflows

### Start the frontend (Storybook)
```bash
npm install
npm run storybook        # Starts at http://localhost:6006
```

### Start the backend server
```bash
cd server
npm install
npm run dev              # tsx watch mode
```

### Seed the database
```bash
cd server
npm run seed             # Populates SQLite with 12 musicians
```

---

## 📖 Component Conventions
*   **Named + Default Exports** on every component.
*   **CSS Modules** (`.module.css`) for scoping.
*   **Barrel Exports** in `src/index.js`.
*   **Props Spread** for HTML attribute passthrough.

---

## 🤖 Notes for AI Assistants
1. **No test suite exists** — validate logic manually via Storybook.
2. **Raw SQL over ORM** — routes use raw SQL parameterized queries in `db.ts`.
3. **API fallback** — listing pages have client-side filtering fallback.
4. **Ports** — Backend: `5001`, Storybook: `6006`.

---

## 🎯 North Star Metric
**Help buyers trust, compare, and hire the right musician quickly while helping musicians clearly package and present their craft.**
