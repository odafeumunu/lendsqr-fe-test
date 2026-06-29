# Lendsqr Frontend Assessment

A user management dashboard built with **React**, **TypeScript**, and **SCSS**, covering the four required screens — Login, Dashboard, Users, and User Details — against the Lendsqr Figma design.

**Live app:** https://umunu-odafe-peter-lendsqr-fe-test.vercel.app

## Demo login

There's no real backend/registration in this assessment — login is checked against one fixed credential pair:

```
Email:    lendsqr@gmail.com
Password: Admin123
```

## Tech stack

- **React + TypeScript + Vite**
- **SCSS** (7-1-style partials: abstracts, base, components)
- **TanStack Table** + **TanStack Query** — table pagination/sorting/filtering and data fetching
- **Axios** — HTTP client
- **Zustand** (with `persist` middleware) — auth state
- **React Hook Form + Zod** — form validation
- **Lucide React** — icons
- **React Helmet Async** — document head/title management

## Getting started

```bash
git clone https://github.com/odafeumunu/lendsqr-fe-test.git
cd lendsqr-fe-test
npm install
```

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=https://lendsqr-mock-api.vercel.app
```

Then run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Pages

| Route | Page | Notes |
|---|---|---|
| `/` | Login | Empty initial fields, Zod validation, simulated async auth with loading/error states |
| `/dashboard` | Dashboard / Users | One route serves both — see [Architecture decisions](#architecture-decisions) |
| `/userdetail/:id` | User Details | Fetched by id, cached in `localStorage`, tabbed sections |
| `*` | Not Found | Catch-all for genuinely unmatched routes only |

## Data

The brief asks for 500 generated records served from a mock endpoint, naming mockapi.io, json-generator.com, and mocky.io as examples.

The dataset was generated locally with `@faker-js/faker`, shaped from the fields visible across the Figma screens. mockapi.io's free tier caps total stored records at 100, which can't hold the full dataset — rather than submit a partial dataset, the 500 records are served from a small self-hosted serverless function (same spirit as the suggested tools, just self-hosted):

```
GET https://lendsqr-mock-api.vercel.app/api/users            → all 500 records
GET https://lendsqr-mock-api.vercel.app/api/users?id=42      → single user by id
GET https://lendsqr-mock-api.vercel.app/api/users?page=1&limit=50 → paginated slice
```

## Architecture decisions

A few choices worth explaining, since several requirements in the brief were deliberately left open-ended:

**Zustand over Context for auth state.** Context re-renders every consumer on any state change; Zustand lets components subscribe to only the slice they read. With just `isAuthenticated` this barely matters on its own, but it's the better default once other state (filters, search) sits alongside it, and it removes a provider-wrapping layer from `App.tsx`.

**localStorage over cookies.** There's no real backend session here, so cookies — which earn their value from `HttpOnly` flags and server-driven expiry — don't add anything. Auth state and user-detail caching use the same mechanism for consistency, and because the brief names localStorage/IndexedDB as the expected pattern for persisting user details.

**Pagination instead of virtualization.** With pagination, the table never renders more than one page's worth of rows at a time, so virtualization would add complexity (scroll containers, fixed row heights) without solving a bottleneck pagination has already solved. Virtualization would make sense if the design called for an infinite-scroll feed instead of paged results — that's the case where DOM node count becomes the actual problem.

**Dashboard and Users share one route.** Comparing the Figma screens for "Dashboard" and "Users — showing filters," the only difference is whether the filter panel is open — the stat cards and table are identical. Both sidebar links point to `/dashboard`; a Filter button toggles the same panel. One data source, one set of loading/empty/error states, less surface area to test.

**Search and filters live in the URL**, not local component state — so a filtered/searched view survives a refresh and can be shared as a link.

**Sidebar items outside the assessment's four pages** (Guarantors, Loans, Karma, Organisation, and others visible in the full Lendsqr product) are rendered as visibly disabled, non-interactive items — not linked to `/` (which would incorrectly send a logged-in user back to Login) and not built out as fake pages. Logout is implemented for real, both in the sidebar and the header profile menu.

**Dropdowns and popovers use `position: fixed` with JS-computed coordinates**, not `position: absolute`. Several of these UI elements (profile menu, filter panel, row action menu) live inside scrollable or overflow-clipped containers, where `position: absolute` gets visually clipped by an ancestor. Computing the trigger's position via `getBoundingClientRect()` and rendering with `position: fixed` avoids that regardless of ancestor overflow.

## States

Every data-driven view handles loading, empty, and error states, not just the happy path:
- **Loading** — skeleton placeholders for stat cards and table rows
- **Empty** — distinct messaging for "no data at all" vs. "no results for this search/filter," with an option to clear filters
- **Error** — a retry action backed by React Query's `refetch`

## Project structure

```
src/
├── api/              # axios calls
├── components/        # shared UI components (table, action menu, status badge, filter panel...)
├── hooks/             # React Query hooks
├── pages/             # route-level pages
├── store/             # Zustand stores
├── styles/            # SCSS abstracts, base, and shared partials
├── types/             # shared TypeScript types
└── utils/             # pure functions (filtering, stat derivation)
```

## Author

**Odafe Umunu** — [GitHub](https://github.com/odafeumunu)