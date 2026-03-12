# CLAUDE.md — Prova Codebase Guide

This document explains the codebase structure, development workflows, and conventions for AI assistants working in this repository.

---

## Project Overview

**Prova** is a musician hiring marketplace platform. It is a full-stack monorepo containing:
- A **React component library / design system** documented with Storybook
- An **Express + TypeScript backend** with SQLite, JWT auth, and a musician directory API

---

## Repository Structure

```
prova/
├── .storybook/              # Storybook config (main.js, preview.js)
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
├── DESIGN_SYSTEM_GUIDELINES.md  # Visual design rules and principles
├── package.json             # Frontend package (Storybook / design system)
└── CLAUDE.md                # This file
```

---

## Tech Stack

### Frontend
| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.2 | UI library |
| Storybook | 10 | Component dev & documentation |
| Vite | 5 | Build/dev server (via Storybook) |
| CSS Modules | — | Component-scoped styling |
| @fontsource/outfit | 5 | Primary typeface |

### Backend
| Tool | Version | Purpose |
|------|---------|---------|
| Express | 5 | HTTP server |
| TypeScript | 5.9 | Type safety |
| SQLite3 + sqlite | — | Local database |
| Prisma | — | ORM (schema defined; raw SQL also used) |
| JWT (jsonwebtoken) | 9 | Authentication tokens |
| bcryptjs | 3 | Password hashing |
| Zod | 4 | Request validation |
| tsx | 4 | TypeScript execution for dev |

---

## Development Workflows

### Start the frontend (Storybook)

```bash
# From repo root
npm install
npm run storybook        # Starts at http://localhost:6006
```

### Start the backend server

```bash
# From /server
cd server
npm install
npm run dev              # tsx watch mode — auto-reloads on changes
```

### Seed the database

```bash
cd server
npm run seed             # Populates SQLite with 12 musicians
```

### Prisma operations

```bash
cd server
npm run prisma:generate  # Regenerate Prisma client after schema changes
npm run prisma:migrate   # Apply pending migrations
```

### Build Storybook (static)

```bash
npm run build-storybook  # Output to storybook-static/
```

---

## API Endpoints

The backend runs on **`http://localhost:5001`**.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Health check |
| POST | `/api/auth/register` | No | Register user (email, password ≥8 chars) |
| POST | `/api/auth/login` | No | Login → returns JWT |
| GET | `/api/musicians` | No | List musicians (filterable, paginated) |
| GET | `/api/musicians/:id` | No | Single musician detail + services |
| GET | `/api/profile` | JWT | Get authenticated user's profile |
| POST | `/api/profile` | JWT | Create/update musician profile |

**Musicians list query params:** `q`, `genre`, `instrument`, `service`, `sortBy` (`featured`, `rating`, `price_asc`, `price_desc`, `reviews`), `page`, `limit`

---

## Component Conventions

### File Structure (per component)

```
src/components/ComponentName/
├── ComponentName.jsx        # Component implementation
├── ComponentName.module.css # Scoped styles
└── ComponentName.stories.jsx # Storybook stories
```

### Component Template

```jsx
export function ComponentName({
  prop1 = 'default',
  prop2,
  className = '',
  ...props
}) {
  return (
    <element
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    >
      {/* content */}
    </element>
  );
}

export default ComponentName;
```

Key patterns:
- Named export + default export on every component
- `className` prop always accepted and merged with internal styles
- Spread `...props` for HTML attribute passthrough
- Default parameter values (no PropTypes)
- Semantic HTML elements (`article`, `section`, `nav`, `form`)
- ARIA attributes where relevant (`aria-label`, `aria-hidden`, `aria-pressed`)
- Inline SVG icons (no icon library dependency)

### CSS Conventions

- CSS Modules (`.module.css`) — one file per component
- CSS custom properties for theming pulled from `src/tokens/tokens.css`
- `data-theme="dark"` attribute on `<html>` or wrapper for dark mode
- 8px spacing grid (spacing values: 4, 8, 12, 16, 24, 32, 48, 64, 80, 120px)
- Max content width: `1200px`
- Transitions: `200–300ms ease` for hover; `400–600ms ease-out` for entrance animations

---

## Design System Principles

Refer to `DESIGN_SYSTEM_GUIDELINES.md` for full detail. Key rules:

- **Typography:** Outfit (primary) / Inter (fallback). Scale: 56–64px display → 14px caption.
- **Colors:** Primary purple `#7928CA`, secondary pink `#D10068`, accent teal `#007B75`
- **Glassmorphism:** `backdrop-filter: blur(20px)` + semi-transparent backgrounds
- **Motion:** Purposeful, CSS-only. Avoid heavy JS animation libraries.
  - Entrance: `opacity 0→1` + `translateY(20px→0)` over `400–600ms`
  - Hover elevation: `translateY(-4px)` over `200–300ms`
  - Image zoom: `scale(1→1.03)`
- **Whitespace:** Generous — clarity over density
- **Accessibility:** WCAG-compliant contrast, keyboard-navigable, ARIA labels

---

## Backend Conventions

### TypeScript

- Strict mode enabled (`tsconfig.json`)
- ES module syntax (`"type": "module"` in package.json)
- Module resolution: `nodenext`

### Route Structure

```typescript
// server/src/routes/example.ts
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const schema = z.object({ field: z.string() });

router.post('/', async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  // ... handler logic
});

export default router;
```

### Database

- SQLite file at `server/prisma/dev.db` (gitignored)
- Raw SQL with parameterized queries (`?` placeholders) — not Prisma ORM queries
- JSON fields stored as serialized strings, parsed on read
- Bcrypt salt rounds: 10
- JWT expiry: 24 hours

### Auth Middleware

JWT token must be in `Authorization: Bearer <token>` header for protected routes.

---

## Important Notes for AI Assistants

1. **No test suite exists** — there are no unit/integration tests. Validate logic manually or via Storybook stories.
2. **No CI/CD pipeline** — changes are not auto-deployed or auto-tested.
3. **Prisma schema vs raw SQL** — Prisma schema is defined but routes use `sqlite` wrapper with raw SQL. Do not assume Prisma client queries work; check `db.ts` for the actual database API.
4. **API fallback** — `MusicianListingPage` has client-side filtering fallback when the backend is unavailable. Keep both paths in sync when changing filter logic.
5. **`src/index.js`** is the barrel file — add new component exports here.
6. **Environment variables** — backend reads from `.env` file. Required: `JWT_SECRET`. The `.env` file is gitignored.
7. **Port** — Backend expects port `5001`. Frontend (Storybook) uses `6006`.
8. **Database is local only** — `dev.db` is in `.gitignore`. Run `npm run seed` after cloning.
