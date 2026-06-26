# Research Summary

**Project:** Chandran — design-led, narrative-driven, multi-page personal portfolio (engineer/researcher)
**Synthesized:** 2026-06-26
**Source research:** STACK.md · FEATURES.md · ARCHITECTURE.md · PITFALLS.md
**Overall confidence:** HIGH on the build approach; MEDIUM on hosting-policy specifics and a few cutting-edge motion features (flagged below)

---

## Executive Summary

This is a **design-led narrative site**, not a project grid — and all four research dimensions converged on that same spine with unusual agreement. The product is a multi-page personal site whose purpose is to convey *who Chandran is and what he's betting on*, with projects and a timeline appearing as **evidence for the story** rather than as the point. Design is the explicit #1 priority, and the launch bar is "design-complete before going live" rather than ship-ugly-first. The expert consensus is to build this as a **static Astro 7 site** (zero-JS by default, content collections instead of a CMS, surgical motion "islands"), styled tokens-first, animated with GSAP + Lenis + Astro View Transitions, deployed static to Cloudflare Pages or Netlify on the owner's domain. This stack is purpose-built for exactly this profile: content-rich, multi-page, motion-capable, low-maintenance, high-craft.

The recommended way to *build* it is a strict **eight-layer, bottom-up dependency stack**: design tokens → design-system primitives → layout shell + routing → content schemas → sections at full visual fidelity → asset pipeline → motion polish → **design-complete gate** → deploy. This ordering front-loads design quality (matching the launch bar) and front-loads correctness so motion only ever decorates a finished, correct layout — never a moving target. Two architectural commitments make the whole thing work: **tokens as the single source of design truth** (every visual constant is a CSS custom property, making "design-complete" auditable and a restyle a one-file change) and a **content/presentation split** (Zod-typed content collections so adding a project is "drop a markdown file," not "hand-write a page").

The risks here are not technical — they are about *discipline and authenticity*. The two highest-probability ways this specific project fails are (1) **"design-complete" curdling into never-launch perfectionism** — an infinite-polish loop with no shipped baseline — and (2) **weak or placeholder narrative copy** undermining a site whose entire value is the story, including the owner's explicitly-forbidden slide into corporate vision/mission boilerplate. Right behind those sit the motion-craft hazards every bold portfolio hits: ignoring `prefers-reduced-motion` (an accessibility *and* health regression), layout shift / heavy payload that tanks Core Web Vitals on real phones, and over-animation that makes the story a chore to read. The mitigations are structural: convert "design-complete" into a **finite written launch checklist**, treat **copy as a first-class deliverable drafted before/alongside layout**, and build the **reduced-motion path as a first-class variant from the start** rather than retrofitting it.

---

## Key Findings

### Stack (from STACK.md) — confidence HIGH

- **Astro 7 (static)** — the single best fit for content-driven, multi-page, design-led sites. Ships zero JS by default, MPA + islands, first-class typed Content Collections, built-in View Transitions, image optimization, Fonts API, MDX, sitemap. No backend needed.
- **Tailwind CSS v4** (CSS-first, `@theme`, installed as a Vite plugin — *not* the old `@astrojs/tailwind` integration) **+ Astro scoped `<style>`** for bespoke sections. Pure CSS/SCSS is a defensible alternative if utility-soup fights the expressive design.
- **GSAP 3.15** — now 100% free incl. ScrollTrigger + SplitText (perfect for a bold-type manifesto hero) after the Webflow acquisition. Framework-agnostic; load island-scoped, not global.
- **Lenis 1.3** for smooth scroll (use the `lenis` package, **not** deprecated `@studio-freight/lenis`). Gate behind `prefers-reduced-motion`.
- **Astro View Transitions** (`<ClientRouter />`, renamed from `<ViewTransitions />`) — the key ingredient that makes a *multi-page* site feel like one continuous designed experience.
- **MDX content collections** for case studies; **self-hosted variable `.woff2` fonts** via Astro Fonts API (`fontProviders.local()`); **TypeScript** for schema validation.
- **Deploy:** static build to **Cloudflare Pages** (recommended) or **Netlify**. **Avoid Vercel Hobby** for a career-promoting site — its free tier has historically prohibited commercial use (verify ToS).
- **Windows traps:** filename-casing mismatches break the Linux production build; add `.gitattributes` with `* text=auto eol=lf`. Install Node via `winget install OpenJS.NodeJS.LTS`.

### Features (from FEATURES.md) — confidence HIGH (table stakes), MEDIUM (cutting-edge differentiators)

- **Section spine:** HERO/manifesto · BETS (narrative core) · WORK (multi-page case studies as evidence) · ABOUT+skills · TIME (journey/timeline) · GLOBAL (nav, perf, a11y, SEO, contact).
- **Table stakes (the bar is *higher* here because visitors are evaluating craft):** persistent nav surviving page transitions, full responsiveness, good Core Web Vitals, accessibility baseline + `prefers-reduced-motion`, per-page SEO/OG, working contact path, case-study detail pages (own URL each), readable long-form typography, on-brand 404, HTTPS + custom domain, resume/CV access.
- **Differentiators (pick a *few*, execute flawlessly):** the signature is a **bold expressive type system** (highest-ROI "wow," cheapest personality) plus **one marquee motion treatment** (scroll-driven storytelling *or* an animated timeline). Cross-document view transitions and a case-study narrative pattern (problem→approach→outcome→media) round it out. Embedded demo media (robotics/teleop footage) is high-value for this owner.
- **Anti-features (explicitly avoid):** project grid as primary structure (contradicts the core value), CMS/backend, blog (out of scope), **scroll-jacking**, heavy preloaders, generic vision/mission boilerplate, autoplay audio, testimonials/logo walls, cookie-banner-heavy analytics, i18n, and **effect maximalism** (every section a different gimmick).
- **MVP = the smallest set that fully delivers the narrative at the required polish** — all five sections, real copy, the type system, and one flawless motion treatment, all a11y- and perf-clean. View transitions, dark/light theme, advanced timeline interactivity, and WebGL are deferred to v1.x / v2.

### Architecture (from ARCHITECTURE.md) — confidence HIGH (stack mechanics), MEDIUM (org conventions)

- **Eight stacked layers, each depending only on those below:** Design Tokens → Primitives → Content Layer → Layout Shell → Pages/Sections → Motion → Asset Pipeline → Deploy. Dependency arrows point downward; this is what lets the design system be locked first.
- **Pattern 1 — Tokens as CSS custom properties:** the single source of design truth; makes "design-complete" auditable and a restyle a one-file change. Treat a raw hex/px in a component as a code-review failure.
- **Pattern 2 — Content collections + Zod schemas:** typed content/presentation split; "drop a markdown file to add a project" via `getStaticPaths`. (Legacy `src/content` rule is gone — content layer now uses explicit `glob()`/`file()` loaders.)
- **Pattern 3 — Layered progressive-enhancement motion:** CSS transitions → GSAP/ScrollTrigger islands (`client:visible`) → `<ClientRouter />` page transitions, all gated by `prefers-reduced-motion`; re-init motion on `astro:page-load`.
- **Pattern 4 — Dumb sections, smart pages:** only route files call `getCollection()`; sections receive plain props and never fetch.
- **Asset discipline:** source images in `src/assets/` through `astro:assets`; reserve `public/` for favicon/OG/fonts only. (Hero PNGs in `public/` is the #1 way people ship 4 MB images.)
- **Suggested build order is dependency-driven and front-loads design**, with the **design-complete gate sitting between motion polish and deploy** — the architectural expression of "quality over speed."

### Pitfalls (from PITFALLS.md) — confidence HIGH

Two most likely to actually sink *this* project:

1. **Never-launch perfectionism** behind the subjective "design-complete" bar — infinite polish, no shipped baseline, no real-visitor validation. *Mitigation: a finite written launch checklist as the milestone exit gate; freeze visual direction between exploration and build; soft calendar target.*
2. **Weak/placeholder narrative copy** — building the beautiful shell with lorem ipsum, then backfilling thin or boilerplate copy (the explicitly-forbidden vision/mission framing). *Mitigation: write the hero manifesto and "bets" early; design layouts to real copy length; a dedicated content phase before final layout; an explicit anti-cliché ban list.*

Motion-craft cluster (every bold portfolio hits these):

3. **Ignoring `prefers-reduced-motion`** — accessibility + health regression (WCAG 2.3.3). *Build the reduced path as a first-class variant from the start; global guard CSS + per-effect calm alternatives.*
4. **Layout shift (CLS) + heavy payload** tanking Core Web Vitals on real phones (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1). *Animate only transform/opacity; size all media; subset fonts; budget page weight; test throttled mobile. (INP replaced FID, 2024-03-12.)*
5. **Over-animation** making the story a chore to read. *Motion budget/hierarchy: motion guides attention, never gates comprehension.*

Secondary but checklist-worthy: desktop-designed motion breaking on mobile (`100dvh`, no hover-only affordances), keyboard/focus/contrast/semantic regressions from custom design, SEO/OG omissions (the unfurl is often the actual first impression), and **font licensing** (settle web-licensed fonts *before* committing the visual direction to them).

---

## Implications for Roadmap

Dependency-driven phase structure. Lower layers are non-negotiable in order (tokens precede everything visual; layout must be correct before motion). The unusual move — driven by the launch bar and "story is the design" — is that **content/copy and design-direction are front-loaded, not deferred**.

1. **Design direction + content drafting (parallel, pre-build).** Settle the bold/expressive direction against the owner's reference sites (`/gsd:sketch` + `/gsd:ui-phase`), define **motion principles**, confirm **font licensing**, and **draft the hero manifesto + "bets" in Chandran's own voice**. *Rationale:* the writing *is* the design; re-opening direction mid-build is the main time sink. *Avoids:* weak copy, over-animation, font licensing. **Freeze visual direction at the end.**

2. **Foundation: design tokens + primitives + layout shell.** `tokens.css`, reset/global, primitives (Button, Heading, Prose, Container, Section, MediaFrame), then `BaseLayout` + Nav + Footer + SEO head + routing skeleton. A `/styleguide` route is worth it. *Avoids:* hardcoded values, focus/semantic regressions (bake `:focus-visible` + semantics in from the start).

3. **Content schemas + sample content.** `content.config.ts` Zod schemas for `projects`/`timeline`/`bets`; `data/site.ts` for global strings. *Avoids:* hardcoded content; unblocks section work, surfaces schema gaps early.

4. **Sections at full visual fidelity (no motion yet).** All five sections composed from primitives, fed by real content, fully responsive; fluid `clamp()` type; test manifesto at 360px. *Avoids:* desktop-only motion breakage, over-animation.

5. **Asset pipeline.** `astro:assets` `<Image>`/`<Picture>`, responsive `srcset`, self-hosted fonts with size-adjusted fallback, OG image, favicon. Do *before* motion so CLS is final. *Avoids:* heavy payload, CLS, `public/` 4 MB trap.

6. **Motion polish.** CSS reveals → GSAP scroll scenes (island-scoped) → `<ClientRouter />` transitions, with the **reduced-motion branch built in first**, scoped by breakpoint/input via `matchMedia`, re-init on `astro:page-load`. *Avoids:* reduced-motion regression, mobile breakage, CLS, payload creep.

7. **Design-complete gate + a11y/perf/SEO passes.** Audit tokens/spacing/type/motion vs. references; axe + Lighthouse + manual keyboard/SR; verify CLS/LCP/INP on throttled mobile; per-page meta + unfurl test. **Launch blocked until the finite checklist is green.** *Avoids:* never-launch perfectionism, a11y/SEO/CWV omissions.

8. **Deploy to custom domain.** Cloudflare Pages/Netlify, `astro build` → `dist/`, DNS, TLS, OG previews, 404, Lighthouse. Only after the gate.

### Research Flags

| Phase | Recommendation | Why |
|-------|----------------|-----|
| 1 — Direction + content | **Needs owner input** (not research) | Awaits reference sites/screenshots, domain string; copy is owner-authored. Anchors the design brief. |
| 6 — Motion polish | **Likely needs `--research-phase`** | Cross-document view transitions + CSS scroll-driven animations are *not Baseline* (MDN); GSAP choreography + reduced-motion branching has real depth. Confirm support matrix at plan time. |
| 2, 3, 4, 5 | **Standard patterns — skip research** | Astro tokens/collections/`astro:assets` well-documented, HIGH confidence, verified vs. current docs. |
| 7, 8 | **Standard patterns** | Hosting/DNS/SEO well-trodden; only verify current Cloudflare/Netlify/Vercel ToS (MEDIUM) before final host choice. |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Frameworks + versions verified via npm + Context7. Hosting-policy specifics **MEDIUM** — confirm ToS before host choice. |
| Features | **HIGH** / **MEDIUM** | Category conventions solid; cross-document view transitions + CSS scroll-driven animations verified as not-Baseline → progressive enhancements. Named award sites illustrative only. |
| Architecture | **HIGH** / **MEDIUM** | Astro APIs verified vs. official docs; 8-layer layering is sound industry practice but training-derived. |
| Pitfalls | **HIGH** | CWV thresholds, reduced-motion semantics, FID→INP change verified vs. MDN/standards. Paid-font EULAs vary. |

### Gaps to Address During Planning

- **Owner reference material pending** — direction can't finalize until reference sites/screenshots arrive (gating input for Phase 1).
- **Narrative copy undrafted** — "bets" + timeline don't exist yet; timeline list likely non-exhaustive. Owner must author before final layout.
- **Custom domain string TBD** — needed for DNS + canonical URLs at deploy.
- **Hosting ToS unverified this session** — confirm Cloudflare/Netlify/Vercel terms (esp. Vercel commercial clause).
- **Cutting-edge motion is browser-gated** — build as progressive enhancement, never load-bearing.
- **Tailwind vs. pure CSS** — genuine preference axis; settle in design-direction phase.

---

## Sources

- **npm registry** (2026-06-26) — current versions (astro 7.0.3, tailwindcss 4.3.1, gsap 3.15.0, lenis 1.3.25, etc.) — HIGH
- **Context7 official docs** — Astro (Content Collections, `astro:assets`, `<ClientRouter />`, Fonts API), GSAP licensing, Lenis identity — HIGH
- **MDN** — View Transitions status, CSS scroll-driven animations ("not Baseline"), `prefers-reduced-motion`, lazy-loading — HIGH on status
- **Core Web Vitals** (web.dev / Google) — LCP/INP/CLS thresholds; INP replaced FID 2024-03-12 — HIGH
- **WCAG 2.1/2.2** — contrast, focus visible, animation from interactions, keyboard — HIGH
- **SIL OFL** + license tiers — MEDIUM–HIGH (paid EULAs vary)
- **Hosting platform policies** — MEDIUM, verify before host choice
- **Portfolio category conventions** — MEDIUM (training-derived; WebSearch unavailable)
- **PROJECT.md** — owner intent, scope, constraints, out-of-scope

> Environment note: live WebSearch and several WebFetch targets were blocked this session; MDN + Context7/npm verification succeeded. Training-knowledge and unverified-ToS items flagged MEDIUM.
