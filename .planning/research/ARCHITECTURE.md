# Architecture Research

**Domain:** Design-led, multi-page personal portfolio / narrative site (static-friendly, motion-rich, solo-maintained)
**Researched:** 2026-06-26
**Confidence:** HIGH on stack mechanics (Astro content/image/transitions APIs verified against current official docs via Context7); MEDIUM on portfolio-specific organizational conventions (training knowledge — WebSearch was unavailable this session).

> Stack note: this document assumes an **Astro static-site** architecture (recommended in STACK.md) because it is the cleanest fit for "static-friendly, design-flexible, low-JS, multi-page, motion-rich, no backend." The *layering* below (tokens → primitives → shell → content → sections → motion → assets → deploy) is framework-agnostic and would hold equally for an Eleventy or Next-static build; only the API names change.

## Standard Architecture

A design-led portfolio is best understood as **eight stacked layers**, each depending only on the ones below it. The whole thing compiles to static HTML/CSS at build time; JavaScript is added back surgically (islands) only where motion or interactivity demands it.

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  DEPLOY            Git push → CI build (astro build) → static host │
│                    → custom domain (DNS + TLS)                     │
├──────────────────────────────────────────────────────────────────┤
│  ASSET PIPELINE    astro:assets <Image>/<Picture>/getImage,        │
│                    font subsetting, favicon/OG, /public passthrough│
├──────────────────────────────────────────────────────────────────┤
│  MOTION LAYER      CSS transitions + scroll-reveal (IntersectionO.)│
│   (progressive)    GSAP/ScrollTrigger islands, Astro ClientRouter  │
│                    (cross-page view transitions), prefers-reduced  │
├──────────────────────────────────────────────────────────────────┤
│  PAGES / SECTIONS  Hero·Manifesto │ Bets │ WorkIndex │ CaseStudy   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │  Hero   │ │  Bets   │ │  Work   │ │ About   │ │ Journey │      │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘      │
│       │ compose primitives, receive content as props  │           │
├───────┴───────────┴───────────┴───────────┴───────────┴──────────┤
│  LAYOUT SHELL      BaseLayout (html/head/SEO/meta), Nav, Footer,   │
│                    Container/Section wrappers, <slot/>             │
├──────────────────────────────────────────────────────────────────┤
│  CONTENT LAYER     Content collections (Zod-typed):                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐      │
│  │ projects │ │ timeline │ │  bets    │ │ site copy / data │      │
│  │ (md/mdx) │ │ (yaml)   │ │ (md/yaml)│ │  (ts constants)  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘      │
├──────────────────────────────────────────────────────────────────┤
│  DESIGN-SYSTEM     Primitives: Button, Tag, Prose, Heading, Eyebrow│
│  PRIMITIVES        Link, Marquee, MediaFrame — pure presentational │
├──────────────────────────────────────────────────────────────────┤
│  DESIGN TOKENS     CSS custom properties: type scale, color,       │
│  (foundation)      spacing, radii, z-index, motion (duration/ease) │
└──────────────────────────────────────────────────────────────────┘
```

Dependency arrows point **downward**: tokens know nothing about components; components know nothing about pages; content knows nothing about layout. This is what lets the design system be built and locked first, then everything above it consume it.

### Component Responsibilities

| Component / Layer | Responsibility (what it owns) | Typical Implementation |
|-------------------|-------------------------------|------------------------|
| **Design tokens** | The single source of truth for every visual constant — type scale, color ramps, spacing rhythm, radii, motion durations/easings, breakpoints. Owns *nothing visual itself*; defines the vocabulary everything else speaks. | `:root { --... }` CSS custom properties in a global stylesheet, optionally generated/mirrored into Tailwind v4 `@theme` so utilities and raw CSS share one source. |
| **Primitives (design system)** | Small, reusable, presentational building blocks with no business meaning: `Button`, `Tag`, `Eyebrow`, `Heading`, `Prose`, `Container`, `Section`, `MediaFrame`, `Marquee`. Consume tokens only. | `.astro` components, props for variants; zero or near-zero client JS. |
| **Content layer** | Owns the *words and project data*, decoupled from presentation. Type-safe schemas guarantee pages can't render malformed content. | Astro content collections in `src/content.config.ts` using `glob()` (markdown/mdx case studies) and `file()` (YAML timeline/bets), each with a Zod schema. |
| **Layout shell** | Page chrome and document head: `<html>`, SEO/meta/OG tags, nav, footer, skip-link, the `<ClientRouter />` mount point, and `<slot/>` for page content. | `BaseLayout.astro` + smaller `Head.astro`, `Nav.astro`, `Footer.astro`. |
| **Pages / sections** | Compose primitives + content into the actual screens. Pages fetch content (`getCollection`) and pass it down as props to dumb section components. | Route files in `src/pages/`; section components in `src/components/sections/`. |
| **Motion layer** | All animation: scroll-reveals, hero entrance, hover/micro-interactions, and *cross-page* transitions. Layered so the site is fully usable with JS disabled and respects `prefers-reduced-motion`. | CSS transitions/`@keyframes` for cheap effects; GSAP + ScrollTrigger islands (`client:visible`) for choreographed scenes; Astro `<ClientRouter />` for page-to-page view transitions. |
| **Asset pipeline** | Image optimization (responsive `srcset`, modern formats), font loading/subsetting, OG/social images, static passthrough. | `astro:assets` (`<Image>`, `<Picture>`, `getImage`); fonts via `astro:assets` Fonts API or self-hosted woff2; `/public` for already-final assets. |
| **Deploy** | Turn source into a hosted site on the custom domain, reproducibly, on every push. | Static host (Netlify / Cloudflare Pages / Vercel static) building `astro build` → `dist/`, DNS pointed at host, automatic TLS. |

## Recommended Project Structure

```
src/
├── styles/
│   ├── tokens.css         # design tokens — type scale, color, spacing, motion
│   ├── reset.css          # normalize / modern reset
│   └── global.css         # base element styles, imports tokens + reset
├── components/
│   ├── primitives/        # design-system atoms (Button, Tag, Heading, Prose…)
│   ├── sections/          # Hero, Bets, WorkIndex, AboutSkills, Journey…
│   └── motion/            # reusable motion wrappers (Reveal, ParallaxLayer…)
├── layouts/
│   ├── BaseLayout.astro   # html/head/SEO + Nav + Footer + ClientRouter + slot
│   └── CaseStudyLayout.astro  # per-project case-study chrome
├── content/
│   ├── projects/          # one .md/.mdx per case study (body = long-form)
│   ├── timeline/          # journey entries (yaml or md)
│   └── bets/              # the "bets" narrative blocks
├── content.config.ts      # defineCollection + Zod schemas + loaders
├── data/
│   └── site.ts            # global copy/config: name, manifesto, nav, socials
├── pages/
│   ├── index.astro        # home: hero/manifesto → bets → work teaser → journey
│   ├── work/
│   │   ├── index.astro     # work index (lists projects collection)
│   │   └── [slug].astro    # per-project case study (getStaticPaths)
│   ├── about.astro
│   └── 404.astro
├── assets/                # source images run THROUGH the pipeline (optimized)
└── lib/                   # tiny helpers (formatDate, animation presets, seo)
public/                    # passthrough: favicon, OG images, robots.txt, fonts
astro.config.mjs
```

### Structure Rationale

- **`styles/tokens.css` is physically first and standalone:** it is the foundation every other layer imports, so it lives apart from any component and changes to it ripple everywhere by design (the point of a token layer).
- **`components/` split into `primitives` / `sections` / `motion`:** enforces the dependency rule visually — primitives never import sections; sections compose primitives; motion wrappers decorate either. A reviewer can tell at a glance whether a component is reusable design-system kit or page-specific.
- **`content/` (collections) is separate from `data/` (TS constants):** long-form, schema-validated, file-per-entry material (case studies, timeline) belongs in collections; small singular global strings (the manifesto line, nav labels, social links) belong in a typed TS module. Mixing them is a common smell.
- **`assets/` vs `public/`:** anything in `src/assets/` is optimized by `astro:assets` at build; `public/` is byte-for-byte passthrough for things that must keep an exact path/name (favicon, OG image, fonts you self-host). Putting hero images in `public/` is the #1 way people accidentally ship 4 MB PNGs.
- **`work/[slug].astro` dynamic route:** case studies are data-driven from the `projects` collection via `getStaticPaths`, so adding a project is "drop a markdown file in," not "hand-write a page."

## Architectural Patterns

### Pattern 1: Tokens-as-CSS-custom-properties (single source of design truth)

**What:** Every visual constant is a CSS variable defined once in `:root`. Components reference `var(--…)` and never hardcode values. Optionally mirror tokens into Tailwind v4's `@theme` so utility classes and hand-written CSS draw from the same well.
**When to use:** Always, for a design-led site — it is the mechanism that makes "design-complete" enforceable and a later restyle a one-file change.
**Trade-offs:** Up-front discipline; you must resist inline magic numbers. Payoff is global, instant theming and a real audit surface for the design gate.

**Example:**
```css
:root {
  /* type scale (fluid, clamp-based) */
  --step-0: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --step-5: clamp(3rem, 2rem + 6vw, 6rem);
  /* color */
  --color-bg: #0b0b0f;  --color-ink: #f5f5f0;  --color-accent: #ff4d2e;
  /* spacing rhythm */
  --space-m: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  /* motion */
  --dur-base: 320ms; --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Pattern 2: Content collections with Zod schemas (typed content/presentation split)

**What:** Project case studies, timeline entries, and bets live as files loaded by Astro's content layer (`glob()` for md/mdx, `file()` for YAML), each validated against a Zod schema. Pages query them with `getCollection()`; the body renders via the collection's render entrypoint.
**When to use:** Any content that repeats (N projects, N timeline events) or is long-form. Keeps copy editable without touching layout and fails the build loudly if a schema field is missing.
**Trade-offs:** Slight ceremony for a one-off page (not worth it for a single About blurb — use `data/site.ts` for those). Verified against current Astro v6 docs: legacy "collections must live in `src/content`" is gone; the content layer now uses explicit loaders.

**Example:**
```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    year: z.coerce.number(),
    summary: z.string(),
    tags: z.array(z.string()),
    cover: z.string(),          // resolved through astro:assets in the page
    featured: z.boolean().default(false),
  }),
});

const timeline = defineCollection({
  loader: file('./src/content/timeline/entries.yaml'),
  schema: z.object({ date: z.string(), title: z.string(), kind: z.enum(['edu','win','build','role']) }),
});

export const collections = { projects, timeline };
```

### Pattern 3: Layered, progressive-enhancement motion (CSS → islands → view transitions)

**What:** Motion is built in three tiers. (1) Cheap, always-on effects (hover, fades, scroll-reveal via IntersectionObserver) in CSS/tiny vanilla JS. (2) Choreographed scroll scenes via a GSAP/ScrollTrigger island hydrated `client:visible` only on sections that need it. (3) Page-to-page transitions via Astro's `<ClientRouter />` mounted once in `BaseLayout`, using `transition:name`/`transition:persist` for shared-element continuity (e.g. project cover → case-study hero). Everything gated behind `prefers-reduced-motion`.
**When to use:** A bold/expressive, design-gated site — motion is part of the craft signal, but must not become the only way the page works.
**Trade-offs:** GSAP is now fully free (incl. former Club plugins, as of 2025) but it is client JS — keep it island-scoped, not global, to protect the low-JS goal. `<ClientRouter />` adds an SPA-router behavior; test it doesn't fight scroll-reveal re-init on navigation (re-run setup on `astro:page-load`).

**Example:**
```astro
---
import { ClientRouter } from 'astro:transitions';
---
<head> <ClientRouter /> </head>
<!-- shared element across pages -->
<img src={cover} transition:name={`cover-${slug}`} />
```
```js
// motion island re-inits after each view transition, respects reduced motion
const mq = matchMedia('(prefers-reduced-motion: reduce)');
document.addEventListener('astro:page-load', () => { if (!mq.matches) initScrollScenes(); });
```

### Pattern 4: Dumb sections, smart pages (content flows down as props)

**What:** Route files (`pages/*.astro`) are the only place that calls `getCollection()` / imports `site.ts`. They pass plain data into section components, which are pure presentational units. Sections never fetch.
**When to use:** Always — it keeps sections reusable and testable, and concentrates the (build-time) data wiring in one obvious place per page.
**Trade-offs:** A touch more prop-threading; in exchange the design system stays decoupled from content sourcing.

## Data Flow

### Build-time content flow (this is a static site — there is no request/response cycle)

```
Authoring                Validation            Query (page)         Render
──────────               ──────────            ────────────         ──────
src/content/projects/*.md  ─┐
src/content/timeline/*.yaml ─┼─► content.config.ts ─► getCollection() in
src/content/bets/*.md      ─┘    (Zod schema gate)     pages/*.astro
src/data/site.ts ───────────────────────────────────►  │
                                                        ▼
                                       props ──► <Section> components
                                                        │  (compose primitives,
                                                        ▼   read CSS var(--tokens))
                                              astro build ──► static HTML + CSS
                                                        │   + optimized assets
                                                        ▼
                                              dist/ ──► host ──► custom domain
```

### Token flow (orthogonal, via CSS cascade — not props)

```
styles/tokens.css (:root custom properties)
        │  (global stylesheet, cascades to every element)
        ▼
primitives  ─►  sections  ─►  rendered pages
        ▲
(optional) mirrored into Tailwind @theme so utilities + raw CSS share one source
```

### Motion flow (client-side, after HTML is delivered)

```
Static HTML delivered ─► browser parses
        │
        ├─ CSS transitions/@keyframes ............ run immediately (no JS)
        ├─ IntersectionObserver reveals .......... on scroll into view
        ├─ GSAP island (client:visible) .......... hydrates when section nears viewport
        └─ <ClientRouter /> ...................... intercepts nav → view transition
                                                   → fires astro:page-load → re-init motion
        (all of the above short-circuited if prefers-reduced-motion: reduce)
```

### Key Data Flows

1. **Add a project:** drop `src/content/projects/foo.md` with valid frontmatter → it appears in the work index (`getCollection('projects')`) and gets its own `/work/foo` page (`getStaticPaths`) automatically. No code change.
2. **Edit the manifesto / nav / socials:** change `src/data/site.ts` — one typed module, used across hero and footer.
3. **Restyle the whole site:** edit `styles/tokens.css` — color/type/spacing/motion change everywhere at once. This is the lever the design gate audits.

## Suggested Build Order (dependency-driven)

This ordering follows the dependency arrows bottom-up and front-loads design quality, matching the project's **design-complete-before-launch** constraint. Each step produces something committable.

1. **Design tokens + base styles** — `tokens.css`, reset, global. Nothing renders meaningfully yet, but the vocabulary exists. *Must precede everything visual.*
2. **Design-system primitives** — Button, Heading, Prose, Container, Section, Tag, MediaFrame. Build against tokens; preview in isolation (a `/styleguide` route is worth it). *Locks the look before any page is assembled.*
3. **Layout shell + routing** — `BaseLayout`, Nav, Footer, SEO/head, the page skeleton and route files (empty sections OK). Establishes the multi-page IA (home, /work, /work/[slug], /about).
4. **Content schemas + sample content** — `content.config.ts` with Zod schemas; a few real/placeholder projects + timeline entries so sections have data to consume. *Unblocks section work and surfaces schema gaps early.*
5. **Sections / pages (static, design-complete)** — Hero/manifesto, Bets, Work index, Case-study template, About+skills, Journey/timeline — composed from primitives, fed by content. **Build these to full visual fidelity, no motion yet.**
6. **Asset pipeline integration** — wire `astro:assets` `<Image>`/`<Picture>`, responsive `srcset`, fonts, OG image. Replace any placeholder/`public` images. *Do before motion so layout/CLS is final.*
7. **Motion polish** — layer in CSS reveals, GSAP scroll scenes, and `<ClientRouter />` view transitions; add `prefers-reduced-motion` fallbacks. *Last because it decorates a finished, correct layout — animating a moving target wastes effort.*
8. **── DESIGN-COMPLETE GATE ──** — full multi-page experience reviewed against reference sites; tokens/spacing/type/motion audited; reduced-motion + keyboard + responsive checked. **Launch is blocked until this passes** (per project constraint).
9. **Deploy to custom domain** — connect repo to host, configure `astro build`, point DNS, verify TLS, OG previews, 404, and Lighthouse. Only after the gate.

> The gate sits **between motion polish and deploy** (step 8). Steps 1–7 are "make it excellent"; step 9 is "make it live." Nothing ships until step 8 signs off — this is the architectural expression of "quality over speed."

## Scaling Considerations

This is a single-author, low-churn personal site. "Scale" here means **content and maintenance growth**, not traffic — a static site on a CDN serves effectively unlimited readers for free.

| Scale | Architecture adjustments |
|-------|--------------------------|
| 1–10 projects, solo | Current structure is ideal. Markdown collections + static build. Nothing to add. |
| 10–40 projects, occasional updates | Lean harder on collection `filter`/`featured` flags, tags, and a paginated/curated work index. Still no backend. |
| Frequent edits / non-technical editing later | *Only then* consider a git-based CMS layer (e.g. an editing UI over the same markdown). The content/presentation split already built makes this a drop-in, not a rewrite. |

### Scaling priorities (what to watch, not what to optimize prematurely)

1. **First "bottleneck" is image weight, not traffic:** unoptimized hero/case-study images blow up load time and CLS. Solved by disciplined `astro:assets` usage (step 6) — the reason it precedes motion.
2. **Second is motion JS creep:** if GSAP becomes global instead of island-scoped, the low-JS advantage erodes. Keep animation `client:visible`-scoped and audited at the design gate.

## Anti-Patterns

### Anti-Pattern 1: Hardcoded design values scattered through components

**What people do:** Inline `#ff4d2e`, `font-size: 48px`, `margin: 23px` directly in component styles.
**Why it's wrong:** Kills the design system's whole purpose — a restyle becomes a find-and-replace archaeology dig, and the design gate has nothing single to audit.
**Do this instead:** Every visual constant is a token (`var(--color-accent)`, `var(--step-5)`). Treat a raw hex/px in a component as a code-review failure.

### Anti-Pattern 2: Hardcoding content inside page markup

**What people do:** Type project titles, dates, and case-study copy straight into `.astro` files.
**Why it's wrong:** Couples copy to layout, makes the timeline/work-index un-iterable, and means content edits require touching presentation. Also blocks the "drop a file to add a project" flow.
**Do this instead:** Content collections for anything repeating or long-form; `data/site.ts` for singular global strings. Pages query, sections receive props.

### Anti-Pattern 3: Motion-first / motion-only

**What people do:** Build the scroll choreography before the layout is final, or make content *appear* only via JS animation with no static fallback.
**Why it's wrong:** Animating an unfinished layout is wasted rework; JS-gated content is invisible to no-JS, reduced-motion users, and crawlers. Undermines both the design gate and accessibility.
**Do this instead:** Layout complete and correct *first* (step 5–6), then enhance with motion (step 7). Content is in the HTML; motion only animates its entrance. Always honor `prefers-reduced-motion`.

### Anti-Pattern 4: Images in `/public` to "keep it simple"

**What people do:** Drop full-res PNG/JPG into `public/` and reference them directly.
**Why it's wrong:** `public/` is never optimized — you ship multi-megabyte originals, tank Lighthouse, and cause layout shift.
**Do this instead:** Source images live in `src/assets/` and go through `astro:assets` (`<Image>`/`<Picture>`) for responsive `srcset` + modern formats. Reserve `public/` for favicon, OG image, robots.txt, and self-hosted fonts.

### Anti-Pattern 5: Reaching for a backend/CMS prematurely

**What people do:** Stand up a database or headless CMS for a handful of personal projects.
**Why it's wrong:** Adds hosting cost, a moving part to maintain, and runtime failure modes for content that changes a few times a year — directly against the project's stated out-of-scope.
**Do this instead:** Markdown/YAML collections in git. The typed content split keeps a future CMS as an optional drop-in, not a prerequisite.

## Integration Points

### External Services

| Service | Integration pattern | Notes |
|---------|---------------------|-------|
| Static host (Netlify / Cloudflare Pages / Vercel) | Connect git repo; build command `astro build`, publish dir `dist/`. Push-to-deploy. | All three offer free static hosting + automatic TLS + global CDN. Cloudflare Pages and Netlify are the most "static-pure"; any is fine. |
| Custom domain / DNS | Point apex + `www` at the host (CNAME/ALIAS or nameservers); host provisions Let's Encrypt TLS. | Owner already has the domain. Decide apex vs `www` canonical and set a redirect. Verify cert + OG preview post-deploy. |
| Fonts | Self-host woff2 in `public/fonts` (or Astro Fonts API) with `font-display: swap` + preload. | Avoid blocking third-party font CDNs for a design/perf-led site; self-hosting also dodges layout shift on the big display type. |
| Analytics (optional) | Privacy-light, script-tag (e.g. Plausible/Cloudflare Web Analytics) if wanted. | Keep it minimal to protect the low-JS goal; not required for v1. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| tokens ↔ primitives | CSS cascade (`var(--…)`) | One-directional; primitives consume, never redefine tokens. |
| content collections ↔ pages | `getCollection()` / collection render at build | Pages are the only consumers; sections get plain props. |
| pages ↔ sections | Props (build-time) | Sections are presentational; no data fetching inside them. |
| layout ↔ pages | `<slot/>` + named slots | `BaseLayout` owns head/nav/footer/`ClientRouter`; pages fill the body. |
| motion islands ↔ DOM | Hydration directive + `astro:page-load` event | Re-init on view transitions; gated by `prefers-reduced-motion`. |

## Sources

- Astro — Content Collections (content layer, `glob()`/`file()` loaders, Zod schemas, `getCollection`), official docs verified via Context7 `/withastro/docs` — HIGH
- Astro — Images / `astro:assets` (`<Image>`, `<Picture>`, `getImage`, responsive `layout`), official docs via Context7 — HIGH
- Astro — View Transitions / `<ClientRouter />` (incl. v6 naming, `fallback`, `astro:page-load`), official docs via Context7 — HIGH
- GSAP v3 + ScrollTrigger/ScrollSmoother (now fully free incl. former Club plugins, 2025) and Motion (formerly Framer Motion; has a vanilla JS package), Context7 library resolution — HIGH (existence/capability), MEDIUM (exact licensing detail from training)
- Portfolio IA / layering conventions (tokens→primitives→shell→content→sections→motion) — training knowledge + general industry practice; WebSearch unavailable this session — MEDIUM

---
*Architecture research for: design-led multi-page personal portfolio (Astro static, motion-rich, no backend)*
*Researched: 2026-06-26*
