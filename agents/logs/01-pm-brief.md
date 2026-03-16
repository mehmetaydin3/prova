# PROVA PRODUCT STATE — TODAY
**Date:** 2026-03-15
**Prepared by:** PM Audit Agent

---

## Active Routes

| Path | Component | Auth Required |
|---|---|---|
| `/` | `HomePage` | No |
| `/musicians` | `MusicianListingPage` | No |
| `/musicians/:id` | `MusicianDetailRoute` → `MusicianDetailPage` | No |
| `/auth` | `AuthPage` | No |
| `/dashboard` | `DashboardPage` | Yes |
| `/profile` | `ProfilePage` | Yes |
| `/my-bookings` | `ClientBookingsPage` | Yes |
| `*` (fallback) | Redirect to `/` | — |

**Note:** `LandingPage` is Storybook-only and intentionally NOT routed. It is purely a design showcase component.

---

## Buyer Flow Status

The complete buyer journey from discovery to booking confirmation:

1. **Landing (`/`)** — `HomePage` renders a `HeroBanner` with a search input. Searching navigates to `/musicians?q=<term>`. A `FeaturedMusicianRow` shows up to 6 musicians fetched from the API (falls back to mock data if API is unavailable). A `CategoryExplorer` allows clicking a category, which navigates to `/musicians?category=<id>`.

2. **Browse (`/musicians`)** — `MusicianListingPage` reads URL params (`?q=`, `?category=`, `?service=`) on mount to initialise filters. It attempts a live API fetch to `GET /api/musicians` with query params (vibe, genre, instrument, service, sortBy, limit=50). On API failure, it falls back silently to mock data. Results are rendered in a `MusicianGrid`.

3. **Profile (`/musicians/:id`)** — `MusicianDetailRoute` resolves the musician via `useMusicianById(id)` hook (API call). Shows loading and error states. On success, renders `MusicianDetailPage` with the musician data and up to 4 related musicians (always from mock data, not API).

4. **Booking Drawer** — On clicking "Book Now" or a service package, `BookingDrawer` opens. It is a 3-step flow:
   - **Step 0 (Details):** Select a service package, enter preferred date (free text), write a brief.
   - **Step 1 (Review):** Shows order summary — package name, price, 10% platform fee, total.
   - **Step 2 (Confirm):** Shows success state with booking reference ID and "What happens next" guidance.

5. **Submission** — `BookingDrawer` calls `POST /api/bookings` with `{ musicianId, serviceId, scheduledDate, brief }` and a `Bearer` token from `localStorage`. On 401, redirects to `/auth`. On success, advances to the Confirm step.

6. **Post-booking (`/my-bookings`)** — `ClientBookingsPage` (auth-guarded) calls `GET /api/bookings` and renders all bookings as cards showing package name, price, status, date, brief, and total with platform fee.

---

## What Works

- Full route structure is in place and functional.
- Dark/light theme toggle persists to `localStorage` and is threaded through all page components.
- `HomePage` fetches up to 12 featured musicians from the API on mount; gracefully degrades to mock data.
- `MusicianListingPage` has a rich, functional filter system: keyword search (debounced 300ms), genre, instrument, service type, location text, remote-only toggle, minimum rating, price range, and a sort dropdown (5 options). Filters are composable and independently removable via active filter chips.
- Category strip maps 19 categories to combinations of genre/skill/remote/rating filters and initialises from URL `?category=` param.
- `MusicianDetailRoute` handles loading and error states cleanly.
- `MusicianDetailPage` has a data normalisation adapter that bridges API field names (`headline`, `ratingAverage`, `ratingCount`, `completedJobs`, `audioSamples[]`) to mock field names (`tagline`, `rating`, `reviewCount`, `completedGigs`, `audioSample`).
- `BookingDrawer` is a complete 3-step booking flow with package selection, order review with platform fee calculation, and a confirmation state.
- On unauthenticated booking attempt, the drawer redirects to `/auth` correctly.
- Booking API (`POST /api/bookings`) validates with Zod, resolves musician and service from DB, calculates a 10% platform fee, and persists to SQLite.
- `GET /api/bookings` and `GET /api/bookings/incoming` are implemented for client and musician views respectively.
- `PATCH /api/bookings/:id/status` allows both the client and the musician to update booking status across 7 states: `pending`, `accepted`, `declined`, `in_progress`, `delivered`, `completed`, `cancelled`.
- `ClientBookingsPage` displays all bookings with status labels and correct currency symbols.
- Mock data is rich: 12 musicians with diverse genres, locations, and service types. Each has packages with pricing, features, and delivery times.

---

## What Is Broken or Missing

### Critical Gaps (block the core loop)

1. **BookingDrawer sends mock `serviceId` (package `id`) but the API requires a real `services` table row.** Mock musicians use `packages` arrays with ids like `pkg-m1-0`. The API validates `serviceId` against the `services` table (`WHERE id = ? AND musicianId = ?`). If mock `id` values are not seeded into the database, every booking submission from a mock-data musician will return 404 "Service not found". This is the most likely breakage point in the booking flow.

2. **`BookingDrawer` for mock-data musicians sends `serviceId: undefined` in some cases.** The drawer logic converts `musician.services` (an object in mock shape, not an array) to an empty `rawServices` array, then falls back to `musician.packages`. Mock packages do have `id` fields, but those IDs are not present in the DB — so the POST will always fail for mock musicians unless the DB is seeded with matching service records.

3. **No musician dashboard / accept-decline UI exists.** The `GET /api/bookings/incoming` endpoint is implemented, but there is no frontend page where a musician can see incoming requests and accept or decline them. The `/dashboard` route exists but its implementation was not audited — it is likely incomplete for the musician side of the loop.

4. **"Message" button is a dead end.** In `MusicianDetailPage`, the sticky bar's "Message" button calls `() => {}` — an empty no-op. There is no messaging system, which is acceptable per CLAUDE.md, but the dead button could confuse buyers.

5. **`onContact` prop on `MusicianListingPage` is never wired.** Passed in from `App.jsx` as undefined; the grid passes it through but it has no effect.

### Secondary Gaps

6. **Related musicians on the detail page always come from mock data**, regardless of whether the API returned a real musician. This means the "You might also like" row will show musicians with mock IDs (`m1`–`m12`) that may not match any real API record.

7. **Price filter (`priceRange`) is applied only client-side against `startingPrice`.** Mock musicians use a top-level `startingPrice` field; API musicians may or may not expose this field at the list level depending on the API response shape. If the API response omits `startingPrice`, price filtering will silently show all results.

8. **`scheduledDate` in the booking drawer is a free-text field** (e.g., "Week of 15 April"). The API accepts `scheduledDate` as an arbitrary string (`z.string().max(200).nullable()`), so there is no structured date — future calendar or availability features will require a migration.

9. **No booking confirmation email or notification.** After a booking is created, the musician has no way to know about it other than visiting a dashboard.

10. **`ProfilePage` and `DashboardPage` were not fully audited** in this pass. They are auth-guarded but their feature completeness for the musician self-serve flow (setting up a profile, adding services) is unknown.

11. **`remoteAvailable` field exists in the DB musician schema but is not reliably present on all mock musicians.** The listing page checks `m.remoteAvailable === true || m.remoteAvailable === 1` to handle both boolean and SQLite integer representations, which is a sign of inconsistency between data sources.

---

## Priority Order for Today

### Priority 1 — Close the booking loop end-to-end

The single most impactful fix is ensuring a buyer can successfully submit a booking against a real API musician. This requires:
- Verifying the seed script populates the `services` table with valid rows tied to musician IDs.
- Confirming the `BookingDrawer` sends a valid `serviceId` that exists in the DB.
- Testing the full path: browse → profile → select package → submit → see confirmation → view in `/my-bookings`.

This is the core marketplace loop. Nothing else matters if this is broken.

### Priority 2 — Musician accept/decline UI

Once a booking can be submitted, the musician needs to see it and respond. The backend already supports this (`GET /api/bookings/incoming`, `PATCH /api/bookings/:id/status`). A minimal musician dashboard page that lists incoming bookings and allows Accept / Decline actions would complete the round-trip loop and make the product demonstrably functional.

### Priority 3 — Remove or replace dead-end CTAs

The "Message" button in the sticky bar currently does nothing. This erodes trust on the most conversion-critical page. It should either be hidden until messaging is built, or replaced with a fallback action (e.g., "Request via booking form" that triggers the booking drawer). Similarly, auditing `ProfilePage` and `DashboardPage` to surface any other dead-end states would prevent buyer and musician confusion during any alpha demo or user test.

---

## Data Contracts

### Musician shape (mock, `src/mocks/musicians.js`)

```
{
  id: string,                    // e.g. 'm1'
  name: string,
  tagline: string,
  bio: string,
  avatarSrc: string (URL),
  coverSrc: string (URL),
  location: string,
  online: boolean,
  tier: 'pro' | 'verified' | 'none',
  badges: string[],              // 'pro', 'topRated', 'fastResponder', 'new', 'verified'
  genres: string[],
  skills: string[],
  ensembleType: 'solo' | 'duo' | 'quartet',
  languages: string[],
  rating: number,
  reviewCount: number,
  responseTime: string,
  completedGigs: number,
  startingPrice: number,
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD',
  audioSample: { src: string, duration: string, title: string } | null,
  services: { tracks: boolean, teach: boolean, inPerson: boolean, wedding: boolean, online: boolean },
  packages: Array<{
    id: string,                  // e.g. 'pkg-m1-0'
    name: string,
    price: number,
    delivery: string,
    revisions: number | 'Unlimited' | null,
    features: string[],
  }>,
  reviews: Array<{ id, author, avatar, rating, date, text }>,
  friends: string[],             // array of musician IDs
}
```

### Musician shape (API, `musicians` DB table — normalised field names)

```
{
  id: string (UUID),
  name: string,
  headline: string,              // maps to tagline in UI adapter
  bio: string,
  location: string,
  remoteAvailable: 0 | 1,
  ratingAverage: number,         // maps to rating in UI adapter
  ratingCount: number,           // maps to reviewCount in UI adapter
  completedJobs: number,         // maps to completedGigs in UI adapter
  currency: string,
  avatarSrc: string,
  audioSamples: Array<{ src, title, duration }>,  // first item maps to audioSample
  services: Array<ServiceShape>,
}
```

### Service shape (API, `services` DB table — Zod schema)

```
{
  id: string (UUID),
  musicianId: string,
  serviceType: 'remote' | 'in-person' | 'both',
  title: string,                 // maps to name in BookingDrawer
  description: string,
  deliverables: string[],        // maps to features in UI
  startingPrice: number,         // maps to price in UI
  priceType: 'fixed' | 'hourly' | 'per-project',
  turnaroundTime: string,        // maps to delivery in UI
  revisionsIncluded: number,
  tags: string[],
  deliveryMode: 'remote' | 'in-person' | 'both',
}
```

### Booking shape (API, `bookings` DB table)

```
{
  id: string (UUID),
  customerId: string,            // FK → users
  musicianId: string,            // FK → musicians
  serviceId: string,             // FK → services
  status: 'pending' | 'accepted' | 'declined' | 'in_progress' | 'delivered' | 'completed' | 'cancelled',
  packageName: string,           // denormalised from service.title at creation time
  packagePrice: number,          // denormalised from service.startingPrice
  platformFee: number,           // 10% of packagePrice, rounded
  totalPrice: number,            // packagePrice + platformFee
  currency: string,
  scheduledDate: string | null,  // free-text, not a structured date
  brief: string | null,
  createdAt: ISO string,
  updatedAt: ISO string,
}
```

### Booking POST request body (from client)

```
{
  musicianId: string (required),
  serviceId: string (required),
  scheduledDate: string | null (optional, max 200 chars),
  brief: string | null (optional, max 2000 chars),
}
```
Authentication: `Authorization: Bearer <JWT>` header required.

---

PM-BRIEF-COMPLETE
