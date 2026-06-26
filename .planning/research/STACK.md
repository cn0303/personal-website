# Stack Research

**Domain:** Design-led, motion-rich, multi-page personal portfolio (engineer/researcher; bold/expressive aesthetic; low-backend; solo-maintained; Windows 11 dev; custom-domain deploy)
**Researched:** 2026-06-26
**Confidence:** HIGH (framework + library choices and versions verified via npm registry + Context7 docs; hosting policy specifics MEDIUM — web verification was unavailable this session)

---

## Primary Recommendation (the short version)

Build it as a **static Astro 7 site** styled with **Tailwind CSS v4** (plus Astro scoped `<style>` for bespoke sections), animated with **GSAP 3.15** (now fully free, incl. ScrollTrigger + SplitText) and **Lenis** for smooth scroll, with **Astro's built-in View Transitions** (`<ClientRouter />`) for animated page-to-page navigation. Author case studies as **MDX content collections** (no CMS). Self-host fonts via **Astro's built-in Fonts API**. Deploy as a static build to **Cloudflare Pages** (or Netlify — equally fine) on the owner's custom domain.

This stack is purpose-built for exactly this profile: content-focused multi-page sites that ship near-zero JavaScript by default but let you drop heavy interactive/motion "islands" precisely where the design demands them — maximizing both craft and performance, which a design-gated launch needs.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Astro** | `7.0.x` | Site framework / build tool | Built for content-driven, multi-page sites. Ships **zero JS by default** (great Lighthouse/first-impression scores), MPA architecture with **islands** so you add interactivity only where needed. First-class **Content Collections** (typed Markdown/MDX) fit low-churn personal content with no backend. Built-in **View Transitions**, **image optimization**, **Fonts API**, **sitemap**, **MDX**. UI-agnostic — drop in React, Svelte, or vanilla islands for motion. The single best fit for a design-led portfolio in 2025/26. |
| **Tailwind CSS** | `4.3.x` | Styling / design-token utility layer | v4 is CSS-first: configure via `@theme` in CSS (no `tailwind.config.js` required), installed as a **Vite plugin** (`@tailwindcss/vite`) which Astro uses natively. Fast iteration, fluid spacing/type scales, arbitrary values for bespoke design. Pairs with Astro's auto-scoped component `<style>` blocks for the expressive, hand-crafted sections. |
| **GSAP** | `3.15.x` | Animation engine (the motion workhorse) | Best-in-class for scroll-driven, timeline, and expressive typographic motion. **As of the Webflow acquisition, GSAP and ALL plugins are 100% free for commercial use — no membership, license key, or auth token** (verified via GSAP's official AI-skills docs). That means **ScrollTrigger**, **SplitText** (text-reveal animations — perfect for a bold-type manifesto hero), **Flip**, **MorphSVG**, **Observer**, **Draggable** are all available via the public `gsap` npm package. Framework-agnostic: works in vanilla `<script>` or any island. |
| **Lenis** | `1.3.x` | Smooth scroll | The modern standard smooth-scroll lib (from darkroom.engineering, successors to Studio Freight). Syncs cleanly with GSAP ScrollTrigger for the "premium agency" scroll feel central to bold/expressive portfolios. Lightweight. **Use the `lenis` package — NOT the deprecated `@studio-freight/lenis`.** Gate behind `prefers-reduced-motion`. |
| **Astro View Transitions** | (built into Astro 7) | Animated cross-page navigation | `<ClientRouter />` added to `<head>` opts pages into the native View Transitions API with SPA-like animated transitions and a configurable `fallback` for unsupported browsers. This is the key ingredient that makes a **multi-page** site feel like one continuous designed experience rather than hard page reloads — directly serves the "multi-page case studies as one narrative" goal. |
| **TypeScript** | `5.x` (bundled w/ Astro) | Type safety | First-class in Astro; types Content Collection schemas so case-study frontmatter is validated at build. Low overhead, high payoff for a solo maintainer. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@astrojs/mdx` | latest (4.x line) | Rich case-study authoring | Author multi-page case studies in MDX (Markdown + embedded components). Lets narrative content include custom interactive/motion components inline. **Use from the start** — it's the no-CMS content engine. |
| `@astrojs/sitemap` | `3.7.x` | SEO sitemap | Auto-generates `sitemap.xml`. Add before launch. |
| `astro-icon` | `1.1.x` | Inline SVG icons | Clean icon usage (Iconify sets) without shipping an icon font. Optional but convenient. |
| `motion` (motion.dev) | `12.42.x` | Declarative component animation | **Only if** you build React or Svelte islands and prefer declarative/gesture animation over GSAP timelines. Formerly "Framer Motion" — `framer-motion` and `motion` are now the same codebase; **`motion` is the canonical package**. For a mostly-static Astro site, GSAP usually covers everything; treat this as optional. |
| `@fontsource-variable/<face>` | latest | Easy self-hosted variable fonts | Convenient source for self-hosting variable fonts. Can be wired through Astro's Fonts API (`fontProviders.fontsource()`) or referenced directly. Use variable fonts to get a full expressive weight range from one small file. |
| `clsx` + `tailwind-merge` | `2.1.x` / `3.6.x` | Conditional class composition | Minor convenience, mainly inside React/Svelte islands. Skip if not using component islands. |
| `three` + `@react-three/fiber` | `0.185.x` / `9.6.x` | 3D / WebGL hero | **Optional, heavy.** Only if a 3D centerpiece is part of the design direction. Defer until the design brief justifies it; lazy-load in an island and respect reduced-motion / mobile fallbacks. |

### Fonts & Typography

| Choice | Recommendation | Why |
|--------|----------------|-----|
| **Loading mechanism** | **Astro built-in Fonts API** (`fonts: [...]` in `astro.config`, stable in v7) | Configure `fontProviders.local()` for self-hosted `.woff2`, or `fontProviders.google()` / `fontProviders.fontsource()`. Astro handles optimization, preloading, and CSS-variable wiring. No third-party CDN dependency, no layout shift, GDPR-friendly. |
| **Self-host vs Google CDN** | **Self-host** (`fontProviders.local()` or Fontsource) | Best performance, no third-party request, full control — important when type IS the design. |
| **File format** | **Variable `.woff2`** | One file, full weight/optical-size range — ideal for bold/expressive type that shifts weight dramatically. |
| **Pairing strategy** | Distinctive **display** face for headlines + clean **variable body** face | A characterful display face carries the "bold/expressive" personality; a neutral, highly-legible body keeps long narrative readable. Final faces to be chosen against the owner's reference sites during the design phase. |
| **Sizing** | Fluid type via CSS `clamp()` + Tailwind v4 theme tokens | Responsive headline drama without dozens of breakpoints. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Node.js 22 LTS** | Runtime | Install via `winget install OpenJS.NodeJS.LTS` (verified publisher) on Windows. Astro 7 requires modern Node. |
| **pnpm** `9.x` | Package manager | Fast, disk-efficient, works cleanly in PowerShell. `npm` is fine too — pick one and commit the matching lockfile. |
| **Astro VS Code extension** | Editor support | `.astro` syntax, IntelliSense, diagnostics. |
| **Prettier** + `prettier-plugin-astro` | Formatting | Formats `.astro`/`.mdx`/CSS consistently. |
| **ESLint** (or **Biome**) | Linting | Biome is a fast all-in-one lint+format alternative if you want one tool; ESLint if you want the broader plugin ecosystem. |
| **Git + `.gitattributes`** | VCS / line endings | Set `* text=auto eol=lf` so Windows CRLF doesn't churn diffs or break the Linux deploy host. |

---

## Installation

```bash
# Scaffold (run in PowerShell)
pnpm create astro@latest

# Core integrations + styling
pnpm add @astrojs/mdx `
         @astrojs/sitemap `
         @tailwindcss/vite `
         tailwindcss

# Motion
pnpm add gsap `
         lenis

# Optional: icons, font source, 3D
pnpm add astro-icon `
         @fontsource-variable/inter
# pnpm add three @react-three/fiber   # only if a 3D hero is in the design

# Dev tooling
pnpm add -D prettier `
           prettier-plugin-astro
```

> Note (per global prefs): commands above are line-broken with PowerShell backticks for clean copy-paste. Breaks are only between arguments.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **Astro** | **SvelteKit 2 (Svelte 5)** | If the site is really a *highly interactive app* end-to-end rather than content-with-motion. Svelte 5 is excellent and lightweight, and you can still embed Svelte islands inside Astro — so Astro doesn't force you to give up Svelte. For a content/narrative portfolio, Astro's content collections + view transitions + zero-JS default win. |
| **Astro** | **Next.js 16** | If you genuinely need SSR, server actions, auth, or a React-everywhere app. For a static personal portfolio it's over-engineered: you pay App Router complexity and a React runtime for features you won't use. Choose it only if the design depends on pervasive heavy React/R3F interactivity. |
| **Astro** | **Plain Vite + HTML/CSS** | If you want absolute minimal tooling and will hand-craft everything. Viable for a tiny site, but you'd manually reinvent routing, templating, content typing, image optimization, and page transitions — exactly what Astro gives for free. Not worth it here given multi-page case studies. |
| **GSAP** | **Motion (motion.dev) 12** | If building React/Svelte islands and you prefer declarative, gesture-driven animation. Great DX inside components; less suited to complex scroll-timeline choreography than GSAP ScrollTrigger. |
| **Tailwind v4 + scoped styles** | **Pure vanilla CSS / SCSS** (modern CSS: nesting, `:has()`, container queries, `clamp()`) | A genuine preference axis. Many top design-led/agency sites use hand-written CSS for maximal control and clean markup, avoiding utility-class clutter on bespoke layouts. Choose this if the owner finds Tailwind constrains the expressive design or dislikes utility soup. Astro's scoped `<style>` blocks make pure CSS very ergonomic. **Either is defensible; Tailwind is recommended primarily for solo-dev iteration speed.** |
| **Cloudflare Pages** | **Netlify** | Netlify if you want the simplest custom-domain + built-in form handling and don't want to move DNS to Cloudflare. Nearly identical for a static Astro site. |
| **Cloudflare Pages** | **Vercel** | Vercel if you later adopt Next.js/SSR. Note its free **Hobby** tier has historically prohibited *commercial* use — a portfolio promoting professional services may fall foul of that (verify current ToS). Cloudflare/Netlify have no such restriction, so they're safer for a career-promoting portfolio. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@studio-freight/lenis` | Deprecated package name (frozen at 1.0.x) | `lenis` (1.3.x) |
| `framer-motion` (as the install name) | Rebranded; the canonical package is now `motion` | `motion` (same code, 12.x) |
| **A hosted CMS** (Contentful, Sanity, etc.) | Content is personal and low-churn; a CMS adds cost, latency, and a backend to maintain for no benefit | Astro **Content Collections** (MD/MDX in the repo) |
| **CSS-in-JS runtime** (styled-components, Emotion) | Runtime cost + hydration overhead; fights Astro's zero-JS model | Tailwind v4 + Astro scoped `<style>` |
| **UI component kits** (Bootstrap, MUI) | Impose a generic look that actively fights a bold/bespoke design | Custom components + design tokens |
| **AOS (Animate On Scroll)** | Limited, dated scroll-reveal lib | GSAP ScrollTrigger (far more capable, now free) |
| **Locomotive Scroll** | Largely superseded | Lenis |
| **Gatsby** | Declining; heavy GraphQL data layer is overkill for static content | Astro |
| **Create React App / jQuery** | Effectively dead / legacy | Astro + islands |
| **Vercel Hobby tier for a commercial-intent portfolio** | Free tier's non-commercial clause may not fit a career-promoting site (verify current ToS) | Cloudflare Pages or Netlify free tier |

---

## Stack Patterns by Variant

**If the design stays mostly typographic/2D motion (most likely):**
- Astro + Tailwind + GSAP (ScrollTrigger + SplitText) + Lenis + View Transitions.
- No React/Svelte runtime needed — use vanilla `<script>` islands. Lightest, fastest, easiest to maintain solo.

**If a section needs rich declarative/stateful interactivity:**
- Add a single framework integration (`@astrojs/react` or `@astrojs/svelte`) and build that section as an island.
- Use `motion` there if you want declarative animation; keep GSAP for scroll choreography.

**If the design brief calls for a 3D/WebGL centerpiece:**
- `three` + `@react-three/fiber` in a lazy-loaded React island, with a static image fallback for mobile and `prefers-reduced-motion`.
- Treat as a later, optional layer — don't let it gate the rest of the build.

**Accessibility (applies to ALL variants — non-negotiable for a motion-rich site):**
- Honor `prefers-reduced-motion`: gate Lenis, ScrollTrigger reveals, and View Transitions; provide reduced/instant fallbacks. A bold motion site that ignores this fails its own craft bar.

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `astro@7.0.x` | `tailwindcss@4.x` via `@tailwindcss/vite` | Tailwind v4 integrates as a **Vite plugin** in `astro.config` — there is no longer an `@astrojs/tailwind` integration; do not install the old one. |
| `astro@7.0.x` | `gsap@3.15.x`, `lenis@1.3.x` | Both are framework-agnostic; load in client `<script>` or islands. Register GSAP plugins once at module level. |
| `astro@7.0.x` | `vite@8.x` | Bundled/managed by Astro — don't pin Vite manually unless needed. |
| View Transitions | `<ClientRouter />` in `<head>` of each page | Renamed from the older `<ViewTransitions />`; ensure docs/snippets you copy use `ClientRouter`. |
| Astro Fonts API | `fontProviders.local()/google()/fontsource()` | Top-level `fonts: [...]` config (stable in v7); not under `experimental`. |

---

## Windows / PowerShell & Custom-Domain Deploy Notes

- **Toolchain on Windows 11:** Astro, pnpm/npm, GSAP, Tailwind, Vite all run natively in PowerShell — no WSL required. Install Node via `winget install OpenJS.NodeJS.LTS` (verified publisher) per the owner's security preference.
- **Filename casing trap:** Windows filesystems are case-insensitive; Linux deploy hosts are case-sensitive. An import like `./Hero.astro` that points at a file named `hero.astro` works locally but **breaks the production build**. Keep import paths matching file casing exactly.
- **Line endings:** Add a `.gitattributes` with `* text=auto eol=lf` to avoid CRLF churn and host build issues.
- **Custom-domain deploy (static build):**
  - Connect the GitHub repo to **Cloudflare Pages** (recommended) or **Netlify**; build command `pnpm build`, output dir `dist/`.
  - **Cloudflare Pages:** moving the domain's nameservers to Cloudflare gives the tightest integration, free SSL, and unlimited bandwidth on the free tier — strong for a static design site.
  - **Netlify:** add the custom domain in the dashboard, update DNS (CNAME/ALIAS or Netlify DNS); auto Let's Encrypt SSL.
  - Both auto-provision HTTPS and give per-push preview deploys (useful while the design is iterated to the launch bar).

---

## Sources

- npm registry (`npm view <pkg> version`, 2026-06-26) — verified current versions: astro 7.0.3, next 16.2.9, svelte 5.56.4, @sveltejs/kit 2.68.0, vite 8.1.0, tailwindcss 4.3.1, gsap 3.15.0, motion/framer-motion 12.42.0, lenis 1.3.25 (vs deprecated @studio-freight/lenis 1.0.42), @tailwindcss/vite 4.3.1, astro-icon 1.1.5, three 0.185.0, @react-three/fiber 9.6.1 — **HIGH**
- Context7 `/websites/astro_build_en` — View Transitions `<ClientRouter />`, Content Collections API, Fonts API (`fontProviders.local/google/fontsource`, top-level `fonts` config) — **HIGH**
- Context7 `/greensock/gsap-skills` — GSAP plugin licensing: "All GSAP plugins are free for commercial use and do not require a membership, license key, or auth token… install via public `gsap` npm package" — **HIGH**
- Context7 `/darkroomengineering/lenis` — current Lenis package identity and smooth-scroll usage — **HIGH**
- Hosting platform policy specifics (Vercel Hobby non-commercial clause, Cloudflare/Netlify free-tier terms) — based on prior knowledge; **MEDIUM**, web verification unavailable this session — recommend confirming current ToS before final hosting choice.

---
*Stack research for: design-led motion-rich multi-page personal portfolio*
*Researched: 2026-06-26*
