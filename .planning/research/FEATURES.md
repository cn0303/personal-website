# Feature Research

**Domain:** Design-led, narrative-driven personal portfolio (engineer/researcher; multi-page; bold/expressive; story-first with projects as evidence)
**Researched:** 2026-06-26
**Confidence:** HIGH for table stakes and anti-features (well-established conventions); MEDIUM for cutting-edge differentiators (verified against MDN browser-support status; specific award-site examples drawn from training data and flagged where uncertain)

> **Method note:** WebSearch and most WebFetch calls were denied in this environment, and Brave/Exa/Firecrawl were unavailable (no API key). Findings rest on (a) durable domain conventions for this site category, and (b) two authoritative MDN checks that directly gate the differentiator recommendations: the **View Transitions API** (same-document mature; cross-document newer, Chromium-led) and **CSS scroll-driven animations** (MDN: *"Limited availability — not Baseline"*). Both are therefore framed as **progressive enhancements**, never load-bearing. Treat the few named-site references as illustrative, not verified-current.

---

## Section Map (the site's known spine)

All features below are tagged to these sections so requirements can be traced:

| Tag | Section | Role in the narrative |
|-----|---------|-----------------------|
| **HERO** | Hero / manifesto | The hook — name + sharp vision statement |
| **BETS** | "The bets" | Narrative core — what he's building toward and why |
| **WORK** | Work / case studies (multi-page) | Evidence for the story |
| **ABOUT** | About + skills | Who he is + concrete tools/skills |
| **TIME** | Journey / timeline | Chronological trajectory (degree → hackathons → wins → onward) |
| **GLOBAL** | Cross-cutting | Nav, perf, a11y, SEO, contact, theming |

---

## Feature Landscape

### Table Stakes (Users Expect These)

Missing any of these makes the site feel broken or unprofessional. For a *design-led* site the bar is higher than average: visitors are evaluating craft, so polish defects read as the message.

| Feature | Why Expected | Complexity | Section | Notes |
|---------|--------------|------------|---------|-------|
| Persistent, obvious navigation (Work, About, Timeline, Contact) | Multi-page site is unusable without it | LOW | GLOBAL | Sticky or revealed-on-scroll header; current-page indication; must survive page transitions |
| Fully responsive layout (mobile → ultrawide) | >50% of visits are mobile; broken mobile = instant bounce | MEDIUM | GLOBAL | Bold/expressive type needs deliberate fluid-type scaling (`clamp()`); test the manifesto at 360px width |
| Fast load / good Core Web Vitals (LCP, CLS, INP) | Slow design site contradicts the "craft" message; SEO ranking factor | MEDIUM | GLOBAL | Budget fonts + hero media; reserve space to avoid layout shift; lazy-load below-fold case-study media |
| Accessibility baseline (semantic HTML, keyboard nav, focus states, alt text, color contrast, landmark structure) | Legal/ethical baseline; expressive design often fails contrast and focus visibility | MEDIUM | GLOBAL | Bold color choices must still pass WCAG AA contrast; visible focus rings; skip-to-content link |
| `prefers-reduced-motion` honored | Motion-heavy sites trigger vestibular issues; this is the a11y counterpart to the differentiators | LOW | GLOBAL | Every scroll/transition effect needs a reduced-motion fallback (instant or fade). Gate motion behind the media query, not the reverse |
| SEO + Open Graph / Twitter meta + favicon | Link shares (recruiters, DMs) must render a rich card, not a bare URL | LOW | GLOBAL | Per-page title/description; unique OG image per case study ideally; `sitemap.xml`, sensible `<title>` hierarchy |
| Working contact path | The site's whole purpose is to make people reach out | LOW | GLOBAL / HERO | Email link / mailto or simple form; visible LinkedIn/GitHub. Don't bury it |
| Case-study detail pages (own URL each) | "Projects as evidence" only works if each is a linkable, substantive page | MEDIUM | WORK | Each case study = shareable URL; problem → approach → outcome structure |
| Readable long-form typography | Narrative site lives or dies on reading experience | LOW–MEDIUM | BETS/ABOUT/WORK | Measure (~60–75ch), line-height, hierarchy; don't sacrifice legibility for expressiveness |
| 404 + graceful empty/error states | Multi-page = deep links can break | LOW | GLOBAL | On-brand 404 routing back into the narrative |
| HTTPS + custom domain deploy | Owner has a domain; bare/insecure deploy looks amateur | LOW | GLOBAL | Static host (Vercel/Netlify/Cloudflare Pages) handles certs |
| Resume/CV access (link or download) | Recruiters expect a fast path to the formal record | LOW | ABOUT | Link out or downloadable PDF; complements (doesn't replace) the timeline |

### Differentiators (Competitive Advantage)

This is where a design-led narrative site earns "memorable." Pick a *few* and execute them flawlessly — over-stacking effects is itself an anti-pattern (see below). Each must degrade gracefully and respect `prefers-reduced-motion`.

| Feature | Value Proposition | Complexity | Section | Notes |
|---------|-------------------|------------|---------|-------|
| Scroll-driven storytelling (pinned sections, scroll-progress reveals, scrollytelling) | Turns the "bets" narrative into a guided, cinematic read — directly serves the core value | HIGH | BETS/HERO | **Verified:** native CSS scroll-driven animations are *not Baseline* (MDN). Use JS (GSAP ScrollTrigger / Motion / IntersectionObserver) for support today, OR native CSS behind `@supports (animation-timeline: scroll())` with fallback. Don't hijack the scrollbar |
| Motion choreography / micro-interactions (staggered reveals, hover states, magnetic buttons, text animations) | Signals craft in the first 3 seconds; reinforces "design is the product" | MEDIUM–HIGH | GLOBAL/HERO | Keep a consistent motion language (shared easing/durations). Restraint reads as taste; chaos reads as a template |
| Cross-page (cross-document) view transitions | Page-to-page continuity makes a multi-page site feel like one fluid experience — strong for "manifesto → case study" flow | MEDIUM | GLOBAL/WORK | **Verified:** View Transitions API — same-document mature; cross-document (MPA) is Chromium-led and newer, Safari/Firefox lagging. Pure CSS opt-in, degrades to instant nav where unsupported → ideal progressive enhancement |
| Interactive / animated timeline | The journey section becomes the proof-of-trajectory centerpiece (degree → hackathons → wins → onward) | MEDIUM–HIGH | TIME | Scroll-linked progress line, milestone reveals, filter by type (project/hackathon/win). Must be readable as a plain list with motion off |
| Bold expressive type system (oversized display type, variable fonts, kinetic/animated headlines) | The single highest-ROI "wow" lever for a design-led site; carries personality cheaply | MEDIUM | HERO/BETS | Variable fonts enable weight/width animation with one file. Self-host for perf + control. This is likely the signature element |
| Dark/light theme (or a deliberate single-mode statement) | Respects user preference; shows attention to detail | MEDIUM | GLOBAL | `prefers-color-scheme` + manual toggle persisted to `localStorage`. **Caution:** a bold, committed single palette can be *stronger* than a half-baked dual theme — only build both if both are art-directed |
| Case-study narrative pattern (problem → approach → role → outcome → media) | Makes projects function as *evidence* rather than a grid; lets engineering depth show | MEDIUM | WORK | Consistent template; lead with the "why it mattered." Include metrics/outcomes for an engineer/researcher (benchmarks, results, demos) |
| Embedded media / demos (video, GIFs, interactive widgets, especially robotics/teleop footage) | Hardware/ML work is far more convincing shown than told | MEDIUM | WORK | Autoplay-muted loops for hero clips; lazy-load; provide poster frames; respect reduced-motion for autoplay |
| Custom cursor / pointer effects | Distinctive flourish common on award sites | LOW–MEDIUM | GLOBAL | High cliché risk and an a11y/touch liability. Only if it carries real character; never break native cursor affordance on interactive elements |
| Subtle generative / canvas / WebGL hero accent | Memorable, on-theme for a hardware/ML engineer (e.g., particle/shader motif) | HIGH | HERO | Heavy perf/maintenance cost. Strictly optional; must have a static fallback and a perf budget. Don't let it block LCP |

### Anti-Features (Commonly Requested, Often Problematic)

For a solo personal site, these add cost/complexity or actively undermine the narrative goal.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Project **grid** as the primary structure | Default portfolio convention | Directly contradicts the core value — reduces story to a catalog of tiles | Lead with narrative (bets); surface curated case studies as evidence within/after the story |
| CMS / dynamic backend | "I'll update it constantly" | Content is personal and low-churn; adds hosting, security, and maintenance burden for near-zero benefit | Static site, content in MDX/markdown or in-repo data files; redeploy on edit (already out of scope in PROJECT.md) |
| Blog / writing platform | "Show thought leadership" | Out of scope for v1; an empty or stale blog is worse than none; pulls focus from the narrative | Defer. If writing matters later, add a lightweight `/notes` — don't build a CMS for it |
| Scroll-jacking / full-page-snap hijack of native scroll | Mimics flashy agency sites | Breaks scroll speed expectations, accessibility, and mobile; common reason visitors bounce | Scroll-*driven* reveals that respect native scroll velocity and `prefers-reduced-motion` |
| Heavy preloader / forced intro animation on every visit | "Cinematic entrance" | Adds latency before content; infuriating on repeat visits; hurts LCP | Fast first paint; reserve any intro for first visit only (cookie/localStorage), keep <1s, skippable |
| Generic vision/mission/ambition boilerplate | Feels "professional" | Explicitly rejected by owner; reads as corporate template, kills the authentic voice | Tell the bets in Chandran's own framing/voice (PROJECT.md mandate) |
| Auto-playing audio / sound-on-by-default | "Immersive" | Universally hated; accessibility and surprise-factor disaster | None. If sound exists, default off, opt-in, clearly toggled |
| Testimonials / logo wall / "trusted by" | Mimics startup landing pages | Reads as sales-y for a personal site; dilutes authentic first-person narrative | Let the work and outcomes (wins, metrics) speak; quote sparingly if genuinely strong |
| Analytics-heavy tracking / cookie banner / third-party scripts | "Measure everything" | Perf and privacy cost; cookie banner clutters a design-led first impression | Privacy-friendly, cookieless analytics (e.g., Plausible/Vercel Analytics) — no banner needed |
| Contact form with backend + spam handling | "More professional than mailto" | Requires a backend/service, adds spam surface, can silently fail | `mailto:` + visible social links; or a single managed form endpoint (Formspree/Web3Forms) only if a form is truly wanted |
| i18n / multi-language | "Reach everyone" | Doubles content burden for a solo personal site with one authentic voice | Single language; revisit only on real demand |
| Effect maximalism (every section a different gimmick) | "Show range" | Reads as a template/demo reel, not taste; tanks performance and coherence | One consistent motion + type language applied with restraint |

---

## Feature Dependencies

```
Multi-page routing
    └──requires──> Persistent navigation (must persist across pages)
                       └──enhanced-by──> Cross-document view transitions

Scroll-driven storytelling ──requires──> prefers-reduced-motion fallbacks (a11y gate)
Motion choreography        ──requires──> prefers-reduced-motion fallbacks (a11y gate)
Interactive timeline       ──requires──> prefers-reduced-motion fallbacks (a11y gate)
                                              └──and──> plain-list semantic fallback

Case-study detail pages
    └──requires──> Multi-page routing
    └──requires──> Per-page SEO/OG meta (unique title + OG image each)
    └──enhanced-by──> Embedded media/demos

Bold expressive type system
    └──requires──> Font loading strategy (self-host + budget) ──affects──> Core Web Vitals

Dark/light theme ──affects──> Color contrast (every effect must pass AA in BOTH modes)

WebGL/canvas hero accent ──conflicts/tensions-with──> LCP / performance budget
Custom cursor            ──conflicts-with──> touch devices + native pointer affordance
```

### Dependency Notes

- **Navigation persistence ↔ view transitions:** Cross-document view transitions are the cleanest way to keep nav/identity stable across page loads; build nav first, layer transitions as enhancement.
- **All motion features require the reduced-motion gate:** Treat `prefers-reduced-motion` as a hard dependency of *every* differentiator, not an afterthought — it is table stakes that motion features depend on.
- **Case studies require routing + per-page meta:** Each evidence page needs its own URL and its own OG card to be shareable; this couples WORK to GLOBAL SEO work.
- **Expressive type ↔ performance:** The signature type system is also the biggest font-weight payload risk; font strategy is on the critical path for both design and CWV.
- **Theme ↔ contrast:** A dual theme doubles the contrast/QA matrix — every bold color must pass AA in both modes, or it's an anti-feature in disguise.

---

## MVP Definition

Given the launch bar is **design-complete before going live** (PROJECT.md), "MVP" here means *the smallest set that fully delivers the narrative at the required polish* — not an ugly-first cut. Levels still apply *within* build order.

### Launch With (v1) — required for a credible design-complete launch

- [ ] All five sections present (HERO, BETS, WORK, ABOUT+skills, TIME) — the narrative is incomplete without any one
- [ ] Persistent navigation + multi-page routing — structural backbone
- [ ] Responsive across mobile→desktop — non-negotiable
- [ ] Accessibility baseline + `prefers-reduced-motion` — table stakes, and the gate for all motion
- [ ] Core Web Vitals in good range + font loading strategy — the "craft" claim must be backed by perf
- [ ] SEO + per-page OG meta + favicon — shares must render rich cards
- [ ] Contact path + social links — the site's purpose
- [ ] Case-study pages with consistent problem→approach→outcome pattern + embedded media — projects-as-evidence
- [ ] Bold expressive type system — the signature differentiator, cheapest high-impact "wow"
- [ ] One marquee motion treatment (scroll-driven reveals OR an animated timeline) executed flawlessly — proof of design craft

### Add After Validation (v1.x)

- [ ] Cross-document view transitions — add once nav is stable; pure-CSS, degrades gracefully (trigger: nav/routing finalized)
- [ ] Dark/light theme toggle — only if both modes get full art direction (trigger: a second palette is genuinely designed, not bolted on)
- [ ] Richer timeline interactivity (filtering, scrubbing) — once base timeline proves valuable
- [ ] Additional case studies — content-driven, add as work lands

### Future Consideration (v2+)

- [ ] WebGL/canvas/generative hero accent — high cost; defer until core experience is shipped and perf headroom confirmed
- [ ] Lightweight `/notes` writing area — only on real demand (blog is explicitly out of scope for v1)
- [ ] Custom cursor / pointer effects — only if it earns its keep without harming touch/a11y

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Five core sections + narrative copy | HIGH | MEDIUM | P1 |
| Persistent nav + multi-page routing | HIGH | LOW–MEDIUM | P1 |
| Responsive layout | HIGH | MEDIUM | P1 |
| A11y baseline + reduced-motion gate | HIGH | MEDIUM | P1 |
| Performance / CWV + font strategy | HIGH | MEDIUM | P1 |
| SEO + per-page OG meta | HIGH | LOW | P1 |
| Contact path + socials | HIGH | LOW | P1 |
| Case-study pattern + embedded media | HIGH | MEDIUM | P1 |
| Bold expressive type system | HIGH | MEDIUM | P1 |
| One marquee motion treatment | HIGH | HIGH | P1 |
| Cross-document view transitions | MEDIUM | MEDIUM | P2 |
| Animated/interactive timeline (advanced) | MEDIUM | MEDIUM–HIGH | P2 |
| Dark/light theme | MEDIUM | MEDIUM | P2 |
| WebGL/generative hero accent | LOW–MEDIUM | HIGH | P3 |
| Custom cursor | LOW | LOW–MEDIUM | P3 |
| Writing/notes area | LOW (v1) | MEDIUM | P3 |

**Priority key:** P1 = must have for (design-complete) launch · P2 = should have, add when possible · P3 = future consideration

## Competitor Feature Analysis

Patterns synthesized from the design-portfolio / award-site category (Awwwards/Godly-tier personal sites, developer/designer portfolios). Named examples are illustrative from training data — verify current state if cited downstream.

| Feature | Typical "award" design site | Typical engineer/dev portfolio | Our Approach |
|---------|-----------------------------|-------------------------------|--------------|
| Primary structure | Story/scroll experience, often single-page | Project grid + about | **Narrative multi-page**, projects as evidence (best of both) |
| Motion | Heavy, sometimes scroll-jacking | Minimal/none | Restrained, consistent motion language; reduced-motion safe |
| Typography | Bold display type, variable fonts | System/utility fonts | **Bold expressive type as signature**, self-hosted, perf-budgeted |
| Case studies | Visual-heavy, light on substance | Substance-heavy, weak visuals | Problem→approach→outcome with metrics *and* strong visuals/demos |
| Timeline | Rare | Sometimes a plain list | **Interactive trajectory** as a centerpiece (degree→hackathons→wins) |
| Perf/a11y | Often sacrificed for effect | Usually decent | Treat as table stakes — craft claim requires it |
| Theming | Often a single committed palette | Frequent dark/light toggle | Bold committed palette first; dual theme only if both art-directed |

## Sources

- MDN — View Transitions API (verified: same-document mature; cross-document/MPA newer, Chromium-led; CSS opt-in degrades gracefully) — HIGH confidence on status
- MDN — `animation-timeline: scroll()` / scroll-driven animations (verified: *"Limited availability — not Baseline"*; use `@supports` + JS fallback) — HIGH confidence on status
- Durable conventions of the design-led personal-portfolio / award-site category (training data) — MEDIUM confidence; named examples illustrative only
- PROJECT.md — owner intent, scope boundaries, section spine, and out-of-scope decisions

---
*Feature research for: design-led, narrative-driven personal portfolio (engineer/researcher)*
*Researched: 2026-06-26*
