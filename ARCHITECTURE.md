# Project Architecture & Conventions (Boat Brokers reference)

**Purpose of this file:** hand it to Claude at the start of a new project so it builds with the same **folder structure, MVC layering, naming, data-calling conventions and component-reuse patterns**.

**This file does NOT restrict the tech stack.**  Add whatever the new project needs (router, state manager, animation library, UI kit, ORM, test runner, auth library…). When you do, keep the *structure and conventions* below and slot the new library into the existing seams, for example:

- a store (Zustand/Redux/Context) → lives in `<area>/data/` next to the data hooks, and still talks to the server only through `<area>/lib/api.ts`
- an animation library (Framer Motion/GSAP) → shared animated wrappers go in `src/components/`, generic hooks in `src/hooks/`
- a router (React Router etc.) → replaces the `App.tsx` if-ladder, but pages, sections and URL conventions stay as described
- a different ORM/DB/validator → keep the routes → controllers → models → views → schemas split and file naming

Where the text says "MUST/NEVER", it applies to *conventions inside this structure* (e.g. "never `res.json` a raw DB row", "always go through the shared `Button`"). If a rule conflicts with something the new project genuinely needs, follow the project's needs and say so. Items under "Known debt" are things *not* to copy.

---

## 1. Stack another project happens to use (reference only, not a requirement)

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 (CSS-first config), oxlint. Hand-rolled routing and plain `useState` + module-level caches (no router/state library); no test suite. |
| Backend | Node + Express 5 + TypeScript, Prisma ORM, MySQL 8, Zod for validation, multer for uploads, Resend for email, helmet/cors/morgan |
| Infra | Docker Compose for local MySQL, PM2 on the server, GitHub Actions deploy, Vercel-style SPA rewrite for the frontend |

---

## 2. Repository layout (monorepo)

```
Project-Root/
├─ Frontend-Website/        React app (Vite)
├─ Backend/                 Express API (MVC)
├─ docker-compose.yml       local MySQL (host port 3307)
├─ package.json             npm workspaces: ["Frontend-Website", "Backend"]
├─ .github/workflows/       deploy pipeline (build FE + BE, ship artifacts, PM2 restart)
├─ <media folders>/         static assets served by the backend (product images, blog images)
└─ docs/                    specs / status notes
```

Dev: Vite runs on 5173 (auto-increments — read the real port from output) and **proxies `/api`, `/media`, `/uploads` to the backend on :4000**, so the browser only talks to one origin. All frontend API paths are therefore relative (`/api/...`).

---

## 3. Backend — MVC

```
Backend/
├─ prisma/
│  ├─ schema.prisma         single source of truth for data model
│  ├─ migrations/           generated SQL, timestamped (never hand-edit applied ones)
│  ├─ seed*.js, seed-data/  idempotent seed scripts + JSON source data (upsert by a natural key like slug)
├─ src/
│  ├─ index.ts              app bootstrap: middleware, router mounts, static mounts, error handlers
│  ├─ routes/               URL → controller wiring ONLY
│  ├─ controllers/          HTTP layer: parse/validate input, call models, shape response
│  ├─ models/               Prisma data access ONLY (no req/res, no business rules)
│  ├─ views/                serializers: DB row → JSON response shape
│  ├─ schemas/              Zod schemas + inferred input types
│  ├─ middleware/           errorHandler.ts (notFoundHandler + errorHandler)
│  └─ lib/                  shared helpers: prisma client, media URL mapping, upload (multer), password hashing, email, zodErrorMap
```

### One file per entity per layer — same name everywhere

For an entity `seller`:

| Layer | File | Exports |
|---|---|---|
| Route | `routes/sellers.ts` (plural) | `sellersRouter` |
| Controller | `controllers/seller.controller.ts` | `listSellers`, `getSeller`, `createSellerHandler`, `updateSellerHandler`, `deleteSellerHandler`, … |
| Model | `models/seller.model.ts` | `findAllSellers`, `findSellerById`, `findSellerByEmail`, `createSeller`, `updateSeller`, `deleteSeller` |
| View | `views/seller.view.ts` | `serializeSeller` |
| Schema | `schemas/seller.schema.ts` | `createSellerSchema`, `updateSellerSchema`, `…Input` types |

Naming: reads are `list*` / `get*`; writes are `create*Handler` / `update*Handler` / `delete*Handler`. Models use `find*` / `create*` / `update*` / `delete*`.

### Request flow

```
index.ts mounts  app.use("/api/sellers", sellersRouter)
  → routes/sellers.ts        sellersRouter.post("/", createSellerHandler)
  → controllers              Number(req.params.id) check → schema.safeParse(req.body)
                             → model call(s) → serialize → res.json / res.status(...)
  → models                   prisma.seller.create({ data })
  → views                    serializeSeller strips secrets (password), maps file paths → URLs
```

### Layer rules

- **Routes** contain no logic. Standard REST: `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`, plus sub-actions as `PATCH /:id/status`, `PUT /:id/password`, `POST /:id/avatar`. `/login` is registered before `/:id`.
- **Controllers** are plain `async function(req: Request, res: Response)`; no try/catch (Express 5 forwards rejected promises to the error handler). Fixed sequence:
  1. `const id = Number(req.params.id); if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid seller id" })`
  2. `const parsed = schema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })`
  3. existence check → `404 { error: "Seller not found" }`; uniqueness conflict → `409`; bad credentials → `401`
  4. call model, then `res.json(serializeX(row))`; create → `201`; delete → `204` with `.send()`
- **Models** are thin one-liners returning Prisma promises; use `Prisma.XCreateInput` / `XUpdateInput` types. Soft-delete filtering (`isDeleted: false`) lives here as the default.
- **Views** are the only place that decides what leaves the server: strip `password`, convert stored relative paths with `toMediaUrl()`, nest related entities via other serializers (`serializeBoat` calls `serializeSeller`). **NEVER `res.json(prismaRow)` directly.**
- **Schemas**: Zod. `updateXSchema = createXSchema.partial()`. Enums for statuses (`z.enum(["NEW","CONTACTED","LISTED","LOST"])`) and a dedicated `updateXStatusSchema` for status PATCHes. Export inferred types. `lib/zodErrorMap.ts` is imported once at the top of `index.ts` and replaces Zod's technical messages with user-friendly ones globally — don't write per-field messages.
- **Error shape is always `{ error: string }` or `{ error: <zod flatten()> }`.** The frontend relies on this (see §4.3).
- **Uploads** (`lib/upload.ts`): multer disk storage, UUID filenames, upload dirs created at startup (fail loudly), MIME filters, size limits. Routes wrap multer manually so upload errors return `400 { error }`:
  ```ts
  router.post("/:id/avatar", (req, res, next) => {
    uploadAvatar(req, res, (err) => {
      if (err) return res.status(400).json({ error: err instanceof Error ? err.message : "Upload failed" })
      handler(req, res).catch(next)
    })
  })
  ```
- **Media paths**: DB stores *relative* paths (`"folder/file.jpg"`) or `/uploads/...`; `lib/media.ts#toMediaUrl` turns them into `/media/...` URLs (passes through anything starting with `/`). Static mounts in `index.ts`: `/media`, `/media/blogs`, `/uploads`.
- **Config**: `dotenv/config` first import. `PORT`, `DATABASE_URL`, `CLIENT_ORIGIN` (comma-separated allowed origins), `RESEND_API_KEY`. Ship a `.env.example`.
- **Admin routes** are namespaced under `/api/admin/...`.

### Adding a backend entity (checklist)

1. Add model to `schema.prisma` → `npm run prisma:migrate` (name the migration descriptively: `add_leads_sales`).
2. `schemas/x.schema.ts` → `models/x.model.ts` → `views/x.view.ts` → `controllers/x.controller.ts` → `routes/xs.ts`.
3. Mount in `index.ts`: `app.use("/api/xs", xsRouter)` — **before** the `/api` `notFoundHandler`.
4. Add seed data if it has reference content.

> **Security note:** this codebase has *no auth middleware*. Login endpoints are stateless credential checks and the frontend keeps the returned user in localStorage; admin/seller routes are not server-protected. **Do not copy that for a new project that needs real auth** — add JWT/session middleware in `middleware/` and apply it per router.

---

## 4. Frontend — structure

```
Frontend-Website/
├─ index.html
├─ vite.config.ts           react + @tailwindcss/vite, dev proxy
├─ vercel.json              SPA rewrite → /index.html
├─ CLAUDE.md                design system rules (read before writing UI)
└─ src/
   ├─ main.tsx              StrictMode → ErrorBoundary → <App/>
   ├─ App.tsx               hand-rolled router (pathname if-ladder)
   ├─ index.css             Tailwind @theme tokens, @layer components (.section, .media-frame), font-faces
   ├─ assets/               images/fonts for the public site
   ├─ components/           shared PUBLIC-site components (Button, Navbar, Footer, PageHero, CtaBanner, Faq, Testimonials, ErrorBoundary…)
   ├─ hooks/                generic hooks (useInViewOnce)
   ├─ lib/api.ts            ALL HTTP calls + API types for the public site
   ├─ data/                 hooks that call lib/api and map API shapes → UI shapes (boats.ts, blogPosts.ts) + static content (jargon.ts)
   ├─ pages/                public pages
   ├─ seller-portal/        self-contained app area (own assets/components/data/lib/pages)
   └─ admin-portal/         self-contained app area (same shape)
```


### 4.1 Pages and sections (how pages are built from components)

Every page is a **thin composition file**; all real markup lives in **sections**.

```
pages/Contact/Contact.tsx
pages/Contact/sections/ContactForm/ContactForm.tsx
pages/Contact/sections/ContactForm/icons.tsx          ← optional per-section icon helpers
pages/AreasWeServe/Birmingham/Birmingham.tsx           ← sub-page = full page folder nested in parent
pages/AreasWeServe/Birmingham/sections/…
```

Rules:
- One folder per component, **file name = folder name = default export** (`Button/Button.tsx` → `export default function Button`).
- Pages: PascalCase folder, `export default function PageName()`.
- Sections that are private to a page live in that page's `sections/`. Sections/components used by ≥2 pages go in `src/components/`. (Debt: `GetInTouch` was copy-pasted into three pages instead of promoted — promote on the second use.)
- Page-specific sub-pieces (cards, pagination) sit as sibling files next to the section (`BoatsListing/BoatListingCard.tsx`, `Pagination.tsx`).
- **Public page shell** (repeated per page — there is no layout component):
  ```tsx
  export default function Contact() {
    return (
      <main className="flex flex-col gap-6 px-6 pt-6 pb-20">
        <PageHero image={heroBg} activeLabel="Contact" title="Contact Us" body="One-line intro." />
        <ContactForm />
        <CtaBanner />
        <Footer />
      </main>
    )
  }
  ```
  `PageHero` renders `<Navbar/>` itself (never add both). `<Footer/>` is the last child of `<main>`. `CtaBanner` is second-to-last. `pb-20` is load-bearing (Footer's back-to-top button overhangs).
- **Portal page shell** — the page owns data + auth gating and passes props down to sections; the Shell supplies chrome:
  ```tsx
  export default function Dashboard() {
    const { seller, checkedSession } = useSellerSession()   // auth guard (redirects to login)
    const { listings, loading, error } = useBoatListings()   // data hook
    if (!checkedSession) return null                          // never flash protected content
    return (
      <SellerPortalShell>
        <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-8">
          <DashboardHeader name={seller?.name} />
          {error ? <ErrorBox/> : loading ? <SkeletonBox/> : (<><StatsOverview … /><BoatListingTable listings={…} /></>)}
        </div>
      </SellerPortalShell>
    )
  }
  ```
  Order inside the page: session hook → data hook → derived values → `if (!checkedSession) return null` → JSX with **error → loading (animate-pulse skeleton) → content** branches. Sections are presentational: they take typed props (`type XProps = {…}`) and own only local UI state (tabs, search, pagination, form fields).
- **Detail/list/form triplet per admin entity:** `Leads` (list page + `sections/LeadsTable`), `LeadDetail`, `LeadForm` (one component for create *and* edit: optional `leadId` prop → `isEdit`).

### 4.2 Routing

Here, `App.tsx` is a `window.location.pathname` if-ladder; links are plain `<a href>` (full page loads); `vercel.json` rewrites everything to `index.html`. (A new project can use a router library instead — the URL conventions, params-as-props idea, per-area not-found and "3 edits per page" below still apply.)

- **More-specific checks MUST precede parent-path checks** (`/x/new` and `/x/:id/edit` before `/x/:id` before `/x`). First match returns.
- Dynamic params are parsed from the pathname and passed as **props**, validated: `const id = Number(pathname.replace('/admin-portal/leads/', '')); if (Number.isInteger(id)) return <LeadDetail leadId={id} />`. Slugs are passed as `slug` props.
- Each area ends with a scoped not-found (`if (pathname.startsWith('/admin-portal/')) return <AdminPortalNotFound />`). Public catch-all returns `<Home />`.
- URL convention: `/area/entities` (list), `/area/entities/new`, `/area/entities/:id`, `/area/entities/:id/edit`.
- **Adding a page = 3 edits:** (1) the page folder, (2) a branch in `App.tsx`, (3) the nav link arrays (Navbar / Footer / Sidebar).

### 4.3 Data layer (API → hooks → UI)

Three tiers, always in this order:

1. **`<area>/lib/api.ts`** — the only place that calls `fetch`.
   - `const API_BASE = '/api'`; `fetchWithTimeout` (AbortController, 30s default, 60s for uploads, friendly timeout error).
   - `extractErrorMessage` handles both `{error: string}` and zod-flatten `{error:{fieldErrors,formErrors}}`; `readResponse<T>` throws `Error(message)` on non-2xx, returns `undefined` on 204.
   - Tiny verb helpers: `apiGet / apiPost / apiPut / apiPatch / apiDelete`, plus `apiPostFormData` (no JSON content-type so the browser sets the multipart boundary).
   - Exported API types are prefixed `Api…` (`ApiSeller`, `ApiBoat`) and mirror the backend serializer output; payload types are `CreateXPayload` / `UpdateXPayload = Partial<CreateXPayload>`.
   - One exported function per endpoint, grouped by `// Sellers`, `// Boats`… comments: `fetchSellers`, `fetchSeller(id)`, `createSeller`, `updateSeller`, `deleteSeller`, `loginSeller`.
2. **`<area>/data/use<Things>.ts`** — hooks returning `{ things, loading, error, refetch }`.
   - Module-level `let cache` + `let inflight` promise (dedupes concurrent loads), exported `invalidate<Things>Cache()`.
   - `useEffect` with a `cancelled` flag; error → `err instanceof Error ? err.message : 'Failed to load x'`.
   - Companion `use<Thing>ById(id)` for detail/edit pages.
   - Mutations: page calls the `api` function, then `invalidateXCache()` and `refetch()`.
3. **Public `src/data/*.ts`** additionally **maps API shapes → UI shapes** (`ApiBoat` → `BoatListing` with `slug`, parsed numbers, formatted price, `status: 'featured' | 'sold' | …`). Sections consume the UI type and often have a local `toCardBoat(boat)` adapter to the card's props. Components never see raw API objects when a UI type exists.

**Auth/session** (`<area>/lib/session.ts` + `data/use<Role>Session.ts`): localStorage key `'<area>:<role>'`, every access in try/catch; `useXSession()` returns `{ user, checkedSession }` and redirects to `/<area>/login` via `window.location.href` if none. Every protected page starts with it and `if (!checkedSession) return null`.

### 4.4 Component reuse patterns

- **Single source for primitives.** `Button` (variants `dark | light | outline-white | outline-dark`, renders `<a>` when `href` is given, `<button>` otherwise, arrow icon chosen centrally by variant — **NEVER add a per-instance icon override, NEVER hand-roll a button**). `PageHero` (props: `image`, `imageMobile`, `activeLabel`, `size`, `align`, `eyebrow`, `title`, `body`, `children`, `animateEntrance`, `scrollHint`). `StatusBadge` (props `label`, `tone: 'info'|'progress'|'success'|'danger'|'special'|'neutral'`) — every status pill in the admin goes through it; each table keeps a `statusLabels` and `statusTones` `Record<Status, …>` map next to it.
- **Variant maps over conditionals:** `Record<Variant, string>` of class strings, then `[base, variantClasses[variant], className].filter(Boolean).join(' ')`.
- **Props typing:** `type XProps = {…}` above the component; discriminated unions for "as button / as anchor" polymorphism; optional `className` passthrough.
- **Shells** wrap portal pages (`AdminShell`, `SellerPortalShell`: sidebar + mobile top bar + scrollable `<main>`; `AdminShell` also mounts the dialog host).
- **Imperative dialogs:** `confirmDialog(msg, opts) → Promise<boolean>` / `alertDialog(msg)` are plain functions backed by one host component mounted in the Shell — replace `window.confirm/alert`. Use: `if (!(await confirmDialog(...))) return`.
- **Form fields:** shared `TextField / TextareaField / SelectField / FieldRow` from `FormField`. Forms are controlled (`useState` per field), `handleSubmit(e: FormEvent<HTMLFormElement>)` with `saving` + `error` state; edit mode hydrates state once via an `initialized` flag; public forms may instead read `new FormData(form)`. Multi-step forms (AddBoat) = `StepIndicator` + one `…Form` section per step + `scoring.ts` for pure logic.
- **Tables** (`sections/XTable`): local state for `activeTab`, `search`, `page`, `pageSize`; `useMemo` filter; tabs array of `{label, status}`; `ActionButton`s with shared icons; delete callbacks passed *up* (`onDelete`) so the page owns confirm + API + refetch.
- **Icons:** inline SVG components in a sibling `icons.tsx` (per section or per component). An icon library is fine in a new project; keep one import pattern and don't mix several.
- **Pure helpers** go in `<area>/lib/` (`formatDate.ts`, `listingStats.ts` → `computeListingStats`), not inside components.
- **Animations:** here done with CSS/Tailwind plus the `useInViewOnce` hook (IntersectionObserver, fires once, respects `prefers-reduced-motion`). Any animation approach is fine; keep reusable ones in `src/hooks/` or `src/components/` and honour reduced-motion.
- **Error boundary** at the root in `main.tsx`.

### 4.5 Styling system (Tailwind v4 here; the principle is what carries over)

The transferable principle: **define design tokens once (colours, fonts, type scale, spacing, breakpoints) and never hardcode values that have a token.** The specifics below are how Boat Brokers does it with Tailwind v4; with another styling approach, keep the single-source-of-tokens idea.

- **Tailwind config: one source only.** If the project uses **Tailwind v4**, ALL configuration (tokens, breakpoints, variants) lives in `src/index.css` under `@theme` / `@custom-variant`, and you **MUST NEVER create `tailwind.config.js` / `.ts` / `.cjs`**. Not for tokens, not "just for a plugin". (If a project is on Tailwind v3, the reverse applies: use `tailwind.config.js` only and no `@theme`.) Never mix both.
- NEVER hardcode a value that has a token (`bg-navy-dark`, `text-text-body`, `text-h2`, `px-section-x`, `shadow-btn`). Custom breakpoints are named `--breakpoint-*` tokens (`xs sm md lg xl nav 2xl 3xl`); NEVER use arbitrary `max-[900px]:` breakpoints (they lose to base utilities and drift) — add a named token instead.
- Fluid type scale tokens (`text-h1…h6`, `text-body`, `text-label`, `text-caption`) each carry their own line-height/letter-spacing — don't add `leading-*`/`tracking-*`.
- Custom height variants: `short:` / `medium:` / `tall:` to compress spacing on laptops.
- `@layer components`: `.section` (min-height 100svh, centered flex column, fluid vertical padding) and `.media-frame` (aspect-ratio box + absolutely-positioned `object-cover` media).
- Mobile-first; in practice two breakpoints carry the layout: base → `sm:` → `lg:`. Hover effects are `lg:`-scoped and driven by a `group` class on the card.
- To override a component's base class from outside, use a **prefixed variant** (`lg:px-3`), not a bare utility (equal specificity ⇒ stylesheet order decides).
- Canonical section recipe:
  ```tsx
  <section className="section flex flex-col items-center gap-6 short:gap-4 px-section-x">
    <div className="flex max-w-[26.25rem] flex-col items-center gap-4 short:gap-2 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-badge-bg px-4 py-1.5 text-label font-medium text-badge-text uppercase">
        <span className="size-2 rounded-full bg-blue" />Section Label
      </span>
      <h2 className="font-display text-h2 text-ink capitalize">Heading</h2>
      <p className="text-body text-text-body">Body copy.</p>
    </div>
  </section>
  ```
- Portal UI uses a flatter slate palette (`#0f172a`, `#e2e8f0`, `#64748b`) with `bg-frost` main area — the admin/seller area is the app-style look, the public site is the marketing look.
- Images are ES-imported at the top of the file (`import heroBg from '../../assets/x.png'`) and passed as props.
- Link-target sections get `id="…"` + `scroll-mt-28`.

### 4.5a Global CSS (`src/index.css`) — anatomy and rules

`src/index.css` is the **only global stylesheet**, imported once in `main.tsx`. A new project gets its own `index.css` with the **same anatomy and ordering**, filled with that project's tokens (the values below are Boat Brokers' — copy the *structure*, not the colours). Page/section files never define global CSS; they only consume these tokens and classes.

**File order (top → bottom):**

1. `@import 'tailwindcss';` (+ any font `@import url(...)` for mono/code fonts)
2. `@custom-variant` height variants
3. `@theme { --breakpoint-* }`
4. `@font-face` declarations
5. `@theme { colours, fonts, type scale, shadows, section spacing }`
6. `@layer components { .section, .media-frame, .article-prose }`
7. `@layer base { html/body/#root/h1–h6/p/ul/a/button/img resets }`
8. `@keyframes` + `.animate-*` / `.reveal-*` / `.hero-reveal*` classes, each followed by a `prefers-reduced-motion` guard
9. `:root` custom properties used by animations (`--reveal-distance`)

#### Breakpoints (named tokens only)

| Token | Width | Purpose |
|---|---|---|
| `xs` | 480px | small phones |
| `sm` | 640px | phone → tablet; **main layout step #1** |
| `md` | 768px | tablets (use sparingly) |
| `lg` | 1024px | desktop; **main layout step #2**; all hover effects live here |
| `xl` | 1280px | |
| `nav` | 1440px | narrowest width the full desktop navbar fits (project-specific; define one like it if a component has a measured fit-point) |
| `2xl` / `3xl` | 1536 / 1920px | large screens |

Rules:
- Mobile-first: bare utility = all widths; `sm:` / `lg:` override upward. In practice ~95% of responsive styling uses only `sm:` and `lg:`; reach for other steps only after measuring a real problem.
- **NEVER** use arbitrary breakpoint variants (`max-[900px]:`, `min-[1101px]:`). If a new width is genuinely needed, add `--breakpoint-<name>` in the `@theme` block and use `<name>:` / `max-<name>:`. (Arbitrary `max-[...]` also lost to base utilities in testing; named ones work.)
- Raw `@media` in CSS uses the same widths, written as `(width >= 40rem)` / `(width < 40rem)` — keep them equal to a breakpoint token.
- Widths in `rem` (`30rem = 480px`), so breakpoints follow user font-size settings.

#### Media / condition variants

| Variant | Definition | Use |
|---|---|---|
| `short:` | `max-height: 750px` | compress gaps and step headings down on laptop-height screens (`gap-6 short:gap-4`, `text-h1 short:text-h1-short`) |
| `medium:` | `751–899px` height | rarely needed |
| `tall:` | `min-height: 900px` | rarely needed |
| `lg:` for hover | width ≥ 1024 | **all** hover treatments are `lg:`-scoped (`lg:group-hover:…`) because touch devices have no hover; put `group` on the card root |
| `motion-safe:` / reduced-motion media query | user preference | every looping or entrance animation must have a `@media (prefers-reduced-motion: reduce)` guard in CSS (or use `motion-safe:`) |

Use `svh` (not `vh`) for full-height work (mobile browser chrome). Heroes are `min-h-[95svh]` so the next section peeks above the fold; `.section` is `min-height: 100svh`.

#### Fonts — convention and the "ask first" rule

**Fonts come from the Figma file.** Before writing any UI:

1. Read the typography styles in the project's Figma file (via the Figma MCP / `get_variable_defs` / `get_design_context`) and list every family + weight used.
2. Check each one exists in the codebase as an `@font-face` in `index.css` (or a Google Fonts `@import`) **and** that its font files are present in `src/assets/` (or the area's `assets/`).
3. **If any family/weight in Figma is missing from the project: STOP. Tell the user to install/add the font files first, and do not continue building anything until they confirm.** Name the missing font(s) and weight(s), where you looked, and the file type needed (`.woff2`/`.woff`/`.ttf`) and the folder to put it in. This is a hard stop, not a warning: **don't "move on and fix it later", don't build the rest of the page and leave a placeholder.** **NEVER silently substitute** a different font, a "close enough" system font, or a Google Font that wasn't in the design, and never fake a weight. Once the user adds the files, register them with `@font-face` in `index.css` and then resume.
4. A fallback stack in the token is only for graceful degradation after the real font (`'Gideon Roman', 'Playfair Display', Georgia, serif`) — the first family must be the Figma font.

Structure to copy:
- One `@font-face` per **family + weight** (`font-weight: 400/500/600`, `font-style: normal`), `src: url('./assets/…')` with the right `format()`. The `font-family` string in `@font-face` must **exactly match** the string in the `--font-*` token (a mismatched "decoy" family name silently falls back).
- Three semantic font tokens, used by role — never by font name — in components:
  - `--font-display` → headings (`font-display`)
  - `--font-accent` → alternate hero/FAQ/quote headings (`font-accent`)
  - `--font-body` → everything else (set on `body`)
  - optionally `--font-mono`
- `h1–h6` already get `font-family: var(--font-display); font-weight: 400; margin: 0` from the base layer — don't redeclare per heading.
- **Weight gotcha:** if a display font ships a single weight (Gideon Roman is 400 only) then `font-bold` on it does nothing, because `body` sets `font-synthesis: none` (no fake bold/italic). Only apply weight utilities to families that actually have those weights loaded. Body font weights 400/500/600 are loaded; don't use 300/700 unless you add the files. 
- **Need a specific weight whose file isn't loaded? Ask first.** If the design (or your code) calls for a weight with no `@font-face`/file (e.g. Figma shows Inter 700 but only 400/500/600 are loaded, or you'd want bold on a 400-only display font), **tell the user which family + weight you need and ask them to provide that file. Do not adjust on your own:** no `font-bold`/`font-synthesis` to fake it, no switching to the nearest loaded weight, no swapping the font, no changing the design to avoid it. Wait for the user's answer, then register the new `@font-face` and continue. (If the user explicitly says to use a nearby weight instead, do that and note it in a comment.)
- Don't leave unused/duplicate font CSS around (`assets/gideon-roman-webfont/style.css` is an unimported leftover — ignore it).

#### Type scale tokens

Fluid `clamp()` tokens; each has its own `--text-*--line-height` and `--text-*--letter-spacing`, so **`text-h2` alone is complete** — never add `leading-*` / `tracking-*` beside it.

`text-h1` · `text-h1-short` (paired: `text-h1 short:text-h1-short`) · `text-h2` · `text-h3` · `text-h4` · `text-h6` (no h5) · `text-body` · `text-body-sm` · `text-label` · `text-caption` · `text-accent` · `text-cta`.

New projects: derive the scale from Figma's text styles into this same token set (same naming pattern `--text-<name>` + `--line-height` + `--letter-spacing`), don't invent sizes in components. If Figma has a text style with no token, add the token to the `@theme` block (and tell the user) rather than hardcoding `text-[34px]`.

#### Colour, shadow and spacing tokens

- Colours are `--color-<name>` in `@theme` → utilities `bg-<name>`, `text-<name>`, `border-<name>`. Name by **role/semantic** where possible (`ink`, `text-body`, `text-muted`, `border`, `badge-bg`) and by hue for brand palette steps (`navy-dark`, `blue-light`). Take values from Figma variables; if Figma has a colour with no token, add it — don't use `bg-[#abc123]`.
- Shadows: `--shadow-<name>` (`shadow-btn`, `shadow-badge`). Effects from Figma (e.g. the "Glass" card) are written once and reused verbatim.
- Section insets: `--spacing-section-x` / `--spacing-section-y` (fluid `clamp()`), used as `px-section-x`, `py-section-y`, `inset-x-section-x`… on every section-level wrapper.
- Single light theme; no `dark:` variants unless the project adds a dark theme (then define dark values as tokens, not per-component overrides).

#### Component classes (`@layer components`)

- `.section` — full-viewport section: flex column, centered, `min-height: 100svh`, `padding-block: var(--spacing-section-y)`. Opt out for banners with `min-h-0`.
- `.media-frame` — wrapper for `<img>`/`<video>`: `position: relative; overflow: hidden`; direct `img`/`video` children are absolutely positioned, `object-fit: cover`. The frame sets size (`aspect-[…]` or % width); the media never sets its own height.
- `.article-prose` — styles raw CMS/HTML content injected with `dangerouslySetInnerHTML` (h2–h4, p, lists, links, blockquote, hr, img, tables that become stacked cards below `sm`). Put it **only** on the injected-HTML element. It lives in `@layer components` on purpose so it beats the base-layer resets by layer order, not specificity.
- Put a rule in `@layer components` when it must override base resets or style markup you can't add classes to; otherwise use utilities in JSX. Don't add new global classes for one-off styling.

#### Base layer

Resets only: `html, body` zero margin; `body` = 16px/1.5 `var(--font-body)`, `color: var(--color-ink)`, white background, `color-scheme: light`, `font-synthesis: none`, antialiasing; `#root` = `min-height: 100svh; overflow-x: clip` (prevents horizontal scroll); `h1–h6`, `p`, `ul`, `a`, `button`, `img` normalised (`ul` has no bullets, `a` has no underline and inherits colour, `img` is `display:block; max-width:100%`). Because of these resets, lists/links inside prose need `.article-prose` to look right.

#### Animation classes

| Class | Kind | Notes |
|---|---|---|
| `.animate-marquee` | infinite loop (28s linear) | logo strips; duplicated content, translates −50% |
| `.animate-fade-up`, `.animate-pop-in` | one-shot on mount | cubic-bezier easings |
| `.reveal-left` / `.reveal-right` + `.is-visible` | scroll-triggered | add `.is-visible` from `useInViewOnce`; `.reveal-delay-1/2` stagger |
| `.hero-reveal` + `.hero-reveal-delay-1/2/3` | above-the-fold on load | pure CSS, no JS |

- `--reveal-distance` (72px, 30px below `sm`) is the shared slide distance.
- **Every animation class has a `prefers-reduced-motion: reduce` guard** that sets final state (`opacity: 1; transform: none; animation: none`). Any new animation must add one.
- New animations: define `@keyframes` + a class in section 8 of the file, name it `animate-<name>` / `reveal-<name>`, with easing from the existing `cubic-bezier(0.16, 1, 0.3, 1)` family unless Figma specifies otherwise. (An animation library is allowed in new projects; if used, still honour reduced-motion.)

#### Editing `index.css` — rules for Claude

1. Tokens first: if a value isn't a token yet and appears in Figma, add it to `@theme` in the right group, then use the generated utility.
2. Keep the file order above; add to the matching section, not the bottom.
3. Tailwind v4: never create `tailwind.config.*`; all config stays in `index.css`.
4. Comment the *why* above any non-obvious rule (the existing file does — e.g. why `.article-prose` is in `@layer components`).
5. Don't remove or rename a token without grepping its utilities across `src/`.

### 4.5b Building UI from Figma links (required workflow)

When the user gives a Figma link, **design values come from Figma, never from guesswork.** Follow these steps in order. Use the Figma MCP tools and the Figma skills available in the session (load `figma-design-to-code` before calling `get_design_context`).

**Step 1: Read the design first (no code yet)**
- `get_design_context` for the frame/node (structure, layout, text, styles), `get_screenshot` for the visual reference, `get_variable_defs` for the file's variables, `get_metadata` if you need the node tree.
- Extract and list: **fonts** (family + weight), **colours**, **text styles** (size, line-height, letter-spacing), **spacing/radii**, **shadows/effects**, **breakpoint frames** (mobile/tablet/desktop), and **assets** (images/icons to download via `download_assets`).

**Step 2: Fonts gate (hard stop)**
- Check every font family + weight against `index.css` `@font-face` **and** the font files in `assets/`.
- Anything missing → **stop and tell the user to install/add it first. Do not continue** (see §4.5a Fonts for the exact rule).

**Step 3: Define tokens in `index.css` before using them**
- Compare extracted colours, type styles, shadows, spacing, breakpoints against the existing `@theme` tokens.
- **Reuse** a token when the value already exists (same colour → same token; don't create near-duplicates). **Add** a new token only for genuinely new values, in the right group and file position (§4.5a), named by role (`--color-text-muted`, `--text-h2`, `--shadow-btn`).
- Tell the user which tokens you added.
- Only after this step may components be written.

**Step 4: Build with the project's structure**
- Page = thin composition in `pages/<Name>/<Name>.tsx`; each Figma section = `sections/<Section>/<Section>.tsx` (§4.1).
- **Reuse existing shared components first** (`Button`, `PageHero`, `StatusBadge`, `FormField`, shells…). A Figma element that matches an existing component uses it; don't rebuild it. If the same new element appears in ≥2 places, create it once in `components/`.
- Style only with tokens and utilities (`bg-navy-dark`, `text-h2`, `px-section-x`). **No hardcoded hex, px font sizes, or arbitrary values** when a token exists or should exist; add the token instead (Step 3).
- Implement the responsive behaviour from the Figma breakpoint frames using the named breakpoints (§4.5a). If Figma shows only one size, ask or follow the existing mobile-first pattern and say what you assumed.
- Images/icons: download with the Figma tools into the area's `assets/`, then ES-import them.

**Step 5: Verify against Figma**
- Run the dev server, compare with the Figma screenshot at the breakpoints (§7), and fix visual differences (spacing, sizes, weights, colours).
- State plainly what you verified and what you couldn't.

**Later Figma links in the same project:** the tokens already exist. Run Steps 1-3 again but only add what's new; never duplicate or re-define existing tokens, and never restyle existing components unless the user asks.

### 4.6 Code style (frontend)

- 2-space indent, single quotes, **no semicolons** (backend: double quotes, semicolons). No Prettier/ESLint on the frontend — match surrounding code by hand (a new project may add a formatter; then let it decide).
- Relative imports here (no path aliases; aliases are fine in a new project if configured). `verbatimModuleSyntax` → `import type { X }` for types. `noUnusedLocals/Parameters` on (unused import fails the build).
- Comments explain *why* (constraints, past bugs, gotchas), not what. Put them above the code they justify.
- Error text pattern: `err instanceof Error ? err.message : 'Fallback message.'`.
- `&rsquo;` for apostrophes in JSX text.

---

## 4.7 Local database setup (Docker)

**Locally the database always runs in Docker**, never as a native install, so every developer gets the same version and credentials. A new project should ship its own `docker-compose.yml` with a `db` service.

`docker-compose.yml` (Boat Brokers values; rename for the new project):
- image `mysql:8.4`, container `boat-brokers-db`, `restart: unless-stopped`
- env: `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE=boat_brokers`, `MYSQL_USER` / `MYSQL_PASSWORD`
- port `3307:3306`: **host port 3307**, so it doesn't clash with a MySQL already on 3306
- named volume `db_data` so data survives `docker compose down`
- a `healthcheck` (`mysqladmin ping`) so tools can wait for the DB to be ready

`Backend/.env` (copied from the committed `.env.example`):
```
DATABASE_URL="mysql://root:rootpassword@localhost:3307/boat_brokers"
PORT=4000
CLIENT_ORIGIN="http://localhost:5173"
```
- Uses the **`root`** user on purpose: `prisma migrate dev` needs permission to create a temporary *shadow database*, which the app-scoped user lacks. The app user can be used for plain runtime queries.
- Never commit real secrets; `.env` is gitignored, `.env.example` is committed.

**First-time setup order** (from the repo root):
1. `npm install`
2. `npm run db:up`: start MySQL in Docker (needs Docker Desktop running)
3. `cp Backend/.env.example Backend/.env`
4. `npm run prisma:migrate`: create tables from `schema.prisma`
5. `node prisma/seed.js` (from `Backend/`): optional seed data
6. `npm run dev` in `Backend/` (port 4000) and in `Frontend-Website/` (Vite proxies `/api` to it)

Daily: `npm run db:up` / `npm run db:down`. Browse data with `npx prisma studio` (from `Backend/`). **Production does not use this compose file**: it uses a managed/server MySQL configured through `Backend/.env` on the server.

If the project uses a different database (Postgres etc.), keep the same shape: compose service, non-default host port, named volume, healthcheck, `.env.example`, and the same setup order.

---

## 5. Commands

| Where | Command | Does |
|---|---|---|
| root | `npm install` | installs both workspaces |
| root | `npm run db:up` / `db:down` | start/stop MySQL container |
| root | `npm run prisma:migrate` / `prisma:generate` | migrate dev / regenerate client |
| Backend | `npm run dev` | `tsx watch src/index.ts` (port 4000) |
| Backend | `npm run build` / `start` | `tsc` → `dist/`, `node dist/index.js` |
| Backend | `node prisma/seed.js` | idempotent seeds |
| Frontend | `npm run dev` / `build` / `lint` | Vite / `tsc -b && vite build` / oxlint |

## 6. Deployment shape

GitHub Actions on push to `main`: build frontend (`dist`), build backend (`tsc` + `prisma generate`), upload artifacts, ship to server; backend `node_modules` installed on the server (native deps like bcrypt), run under PM2 (`ecosystem.config.cjs`, `pm2 startOrRestart`), secrets in `Backend/.env` on the server. Frontend is a static SPA with a catch-all rewrite.

## 7. Verification expectations

- UI work isn't done until rendered: run the dev server, screenshot at 375 / 480 / 640 / 768 / 1024 / 1280 / 1440 / 1536 / 1920 (plus either side of any breakpoint touched), check hover states, and **measure** overflow numerically rather than eyeballing.
- Type errors fail the build; run `npm run build` before declaring done.
- If something wasn't verified, say so plainly.

## 8. Known debt — don't copy

- Two styling dialects: legacy sections hardcode `px-6 py-14 sm:px-16` and raw hex. New code uses tokens (`px-section-x`, `text-h2`, `bg-badge-bg`).
- Copy-pasted sections (`GetInTouch` ×3); `Faq` hand-rolls a button; `Home` uses `pb-0` instead of `pb-20`.
- `fetchWithTimeout` / `extractErrorMessage` / `readResponse` are duplicated verbatim across each area's `api.ts` — in a new project extract once into a shared `src/lib/http.ts`.
- No server-side auth (see §3 note); sessions are client-side localStorage only.
- Some portal components still use hardcoded hex colours instead of tokens.
- Root README references keep docs in sync with real folder names.

---

