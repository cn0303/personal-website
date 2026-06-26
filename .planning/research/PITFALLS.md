# Pitfalls Research

**Domain:** Design-led, motion-rich, multi-page personal portfolio (solo dev, "design-complete before launch" bar, Windows)
**Researched:** 2026-06-26
**Confidence:** HIGH (well-trodden domain; Core Web Vitals thresholds and `prefers-reduced-motion` semantics verified against current MDN; reduced-motion media-feature data fetched live)

> Scope note: This is a single-author, low-traffic, low-churn site. "Performance traps" here are about per-page-load weight and render behavior, **not** about scaling to many concurrent users. The two pitfalls most likely to actually sink this specific project are (1) **never-launch perfectionism** behind the "design-complete" gate and (2) **motion that breaks accessibility/performance on real devices**. Everything else is secondary to those two.

---

## Critical Pitfalls

### Pitfall 1: "Design-complete before launch" becomes never-launch perfectionism

**What goes wrong:**
The launch bar is defined as a feeling ("polished," "design-complete") rather than a checklist, so it never tests true. Every pass surfaces one more micro-interaction to refine, one more font pairing to try, one more reference site to chase. The site lives on `localhost` for months. Because there's no shipped baseline, none of the design is validated against a real visitor, and the owner burns motivation on diminishing returns. This is the single highest-probability failure mode for this project given the stated constraints.

**Why it happens:**
The owner explicitly front-loads polish and gates launch on design quality (PROJECT.md Constraints). Solo + no external deadline + subjective bar = infinite editing. The owner's own "levels" methodology (ship something that runs, then add fidelity axes) is being suspended for this project — removing the natural forcing function that normally prevents this.

**How to avoid:**
- Convert "design-complete" into an explicit, finite **launch checklist** during planning — a written definition of done per page (sections present, motion implemented, responsive verified, a11y pass, OG tags). When the checklist is green, you launch, full stop. No "but it could be better."
- Reconcile with the levels methodology: treat "design-complete" as the bar for **v1 of the *design axis***, not perfection of all axes. The site can still ship and then improve. Buy a domain-pointed staging URL early so "live" is cheap and reversible.
- Time-box the design-exploration phase (sketches/mockups) separately from build. Decide the visual direction, *freeze it*, then build. Re-opening direction mid-build is the main time sink.
- Set a calendar target ("live by date X") even if soft. A date converts open-ended polish into prioritization.

**Warning signs:**
- Repeatedly revisiting already-"done" sections; restarting the design from a new reference site.
- "I'll launch once X is perfect" where X keeps changing.
- Weeks pass with commits that only tweak easing curves / spacing / color and add no new content or page.
- Reluctance to show anyone the site because "it's not ready."

**Phase to address:**
Roadmap structure overall. Define the launch checklist in the **planning/roadmap phase**; enforce it as the milestone exit gate. Put a hard **"freeze visual direction"** boundary between the design-exploration phase and the build phase.

---

### Pitfall 2: Motion that ignores `prefers-reduced-motion` (accessibility + health regression)

**What goes wrong:**
Bold, motion-heavy sites lean on parallax, scroll-jacking, scale/zoom transitions, auto-playing loops, and large-element movement. For users with vestibular disorders, these can cause genuine nausea, dizziness, and migraines — not just annoyance. If motion isn't gated behind the user's OS-level "reduce motion" setting, the site actively harms a subset of visitors and fails WCAG 2.3.3 (Animation from Interactions). A flashy portfolio that makes a recruiter physically unwell is worse than a plain one.

**Why it happens:**
`prefers-reduced-motion` is invisible during development unless the dev toggles it on. Animation libraries don't honor it by default. The owner is on Windows 11 with motion preference off, so the "full" experience is the only one ever seen. Reduced-motion is treated as a post-hoc nice-to-have instead of a baseline.

**How to avoid:**
- Build the reduced-motion path **as a first-class variant from the start**, not an afterthought. Don't just kill animation — provide a calmer alternative: replace transform/scale/parallax with simple opacity fades or instant state changes (per MDN guidance: remove vestibular triggers — scaling, panning, spinning — and substitute opacity-based transitions).
- Establish a global motion guard early:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
  Then layer tasteful reduced alternatives on top for hero/key moments.
- In JS-driven motion (GSAP/Framer Motion/Motion One), read the media query (`window.matchMedia('(prefers-reduced-motion: reduce)')`) and branch — most libraries expose a hook/util for this (e.g. Framer Motion `useReducedMotion`, GSAP `matchMedia`).
- Avoid scroll-jacking (hijacking native scroll speed/direction) entirely, or make it opt-out — it's the most-complained-about pattern on award-style sites and breaks reduced-motion expectations even when subtle.

**Warning signs:**
- Toggling Windows 11 "Animation effects" off (Settings > Accessibility > Visual Effects) changes nothing on the site.
- Any continuous/looping animation, parallax, or large-element transform with no reduced variant.
- Motion logic embedded inline in components with no central preference check.

**Phase to address:**
The **motion/animation system phase** — bake the reduced-motion branch into the animation architecture before building individual animated sections, so every section inherits it. Verify in the a11y pass.

---

### Pitfall 3: Layout shift (CLS) caused by animation, web fonts, and unsized media

**What goes wrong:**
Entrance animations that move elements into place, late-loading web fonts (FOIT/FOUT reflow), and images/embeds without reserved dimensions all push content around after first paint. The result is a janky, "cheap-feeling" load that undercuts the premium impression — and a failing CLS score (good = ≤ 0.1). Ironically, the more "designed" the load sequence, the worse CLS tends to get if done naively.

**Why it happens:**
Animations that transition `top/left/height/width/margin` (instead of `transform`/`opacity`) trigger layout and shift surrounding content. Custom display fonts swap in after layout, reflowing big headings. Images without width/height or aspect-ratio collapse then expand. On a fast dev machine with cached fonts, none of this is visible.

**How to avoid:**
- Animate only **`transform` and `opacity`** for movement/fade (compositor-friendly, no layout shift). Never animate layout-affecting properties for entrances.
- Always set explicit `width`/`height` or `aspect-ratio` on `<img>`/`<video>`/embeds so space is reserved before load.
- Control font swap deliberately: use `font-display: swap` with a carefully **size-adjusted fallback** (`size-adjust`, `ascent-override` via `@font-face`, or Next.js `next/font` which automates this) so the swap doesn't reflow. For a bold display heading, consider preloading the one critical font file.
- Reserve space for any element that animates in; use opacity/transform to reveal, not to occupy.
- Measure CLS on a throttled connection, not just the dev machine.

**Warning signs:**
- Lighthouse/PageSpeed CLS > 0.1.
- Headings visibly "jump" or resize on load; content reflows when fonts arrive.
- Animations defined with `top`, `left`, `width`, `height`, or `margin` keyframes.

**Phase to address:**
**Animation system phase** (transform/opacity discipline) and **typography/asset-loading phase** (font-display + sizing). Verify in the **performance/CWV pass** before launch.

---

### Pitfall 4: Heavy payload — fonts, images, and animation JS tanking LCP/INP on real devices

**What goes wrong:**
Bold portfolios accumulate weight fast: multiple custom font families/weights, full-res hero imagery, video backgrounds, and an animation library (GSAP + ScrollTrigger, Lenis smooth-scroll, Three.js, etc.). On the owner's machine over local/fast wifi it's instant; on a mid-range phone over mobile data it's a multi-second blank screen (LCP > 2.5s) and laggy interaction (INP > 200ms). The visitor bounces before the story loads — defeating the entire narrative purpose.

**Why it happens:**
Development happens on a fast desktop with a warm cache and no throttling. JS-heavy motion stacks are easy to add and hard to feel the cost of locally. "It looks great and runs smooth" on the dev box hides the real-device penalty. Note (March 12, 2024): **INP replaced FID** as the responsiveness Core Web Vital — heavy main-thread JS during interaction now counts directly against you.

**How to avoid:**
- **Budget the page weight up front** (e.g. ≤ ~1–1.5 MB initial, ≤ ~150 KB JS gzipped as a starting target) and check against it. A budget makes "add Three.js" a visible decision, not a default.
- Subset fonts to used glyphs/weights; prefer 1–2 families, `woff2` only, self-hosted + preloaded for the LCP heading. Drop unused weights.
- Serve responsive, modern-format images (AVIF/WebP) with correct `sizes`; lazy-load below-the-fold (`loading="lazy"`); never ship a 4000px hero to a phone.
- Prefer CSS/Web Animations API and lightweight libs (Motion One ~ small) over heavy stacks unless a specific effect demands it. Reserve WebGL/Three.js for one signature moment, code-split it, and don't load it where it isn't used.
- **Test on a throttled mobile profile** (Chrome DevTools "Slow 4G" + 4x CPU throttle) regularly, not once at the end.

**Warning signs:**
- Lighthouse mobile LCP > 2.5s or INP > 200ms; performance score well below ~90 on mobile.
- Total transfer multiple MB; >2 font families or >4 weights.
- Animation library bundle dwarfs the actual content.
- "Feels instant" was only ever checked on the dev machine.

**Phase to address:**
Set the budget in the **stack/architecture phase** (it influences framework + animation lib choice). Enforce in **each build phase** and verify in the **performance pass**.

---

### Pitfall 5: Over-animation degrading usability and the message

**What goes wrong:**
Every element fades/slides/staggers in on scroll; nothing is ever just *there*. Reading the narrative (the whole point of this site) becomes a chore — the visitor waits for text to animate in before they can read, scroll feels sticky from scroll-jacking, and the cumulative effect reads as "trying too hard" rather than crafted. Motion stops being expressive and becomes friction between the visitor and the story.

**Why it happens:**
When the goal is "bold and motion-rich," more motion feels like more progress. Each animation is fine in isolation; the *aggregate* is exhausting. Without an editorial principle for *when* motion earns its place, defaults trend toward "animate everything."

**How to avoid:**
- Adopt a **motion budget / hierarchy**: reserve signature motion for a few intentional moments (hero, section transitions, one or two delight beats). Body copy and evidence should be readable immediately or with the lightest possible reveal.
- Rule of thumb: motion should **guide attention or express personality**, never gate comprehension. If a visitor has to wait to read, it's too much.
- Keep entrance durations short (~150–400ms) and avoid long staggers on text blocks. Never block content behind a scroll-triggered reveal that fails if JS is slow/off.
- Pressure-test by reading the whole site as a *reader*, not a builder — is the story easy to consume, or are you fighting the page?

**Warning signs:**
- You can't read a paragraph without first triggering its animation.
- Multiple competing animations on screen at once; scroll feels detached from input.
- Stakeholder/test reaction is "whoa" but not "I get what he's about."

**Phase to address:**
**Design-direction/sketch phase** (define motion principles) and enforced through every **section-build phase**.

---

### Pitfall 6: Weak or placeholder narrative copy undermining a story-first site

**What goes wrong:**
The site's stated core value is communicating Chandran's vision and motivation. But content (the "bets," the timeline) is explicitly **not yet drafted** (PROJECT.md). The common failure: build the beautiful shell with lorem ipsum / vague placeholder lines, fall in love with the visuals, then backfill copy that's thin, generic, or — the explicitly-forbidden outcome — slides into clichéd "vision/mission/ambition" boilerplate. A gorgeous site that says nothing specific is a louder failure than a plain one, because it sets up an expectation it doesn't meet.

**Why it happens:**
Writing sharp first-person narrative is harder and less immediately rewarding than visual polish, so it gets deferred. Design done against placeholder text gets sized/laid-out for the wrong content length, and real copy then gets squeezed to "fit the design" — tail wagging the dog. Under deadline pressure, generic phrasing is the path of least resistance, which is exactly the boilerplate the owner rejected.

**How to avoid:**
- **Write the core narrative before or alongside the design, not after.** At minimum draft the hero manifesto and the "bets" section early — the design should be shaped *to* the real words, since here "the writing *is* the design."
- Treat copy as a first-class deliverable with its own pass/phase, in Chandran's own voice. Use a concrete anti-cliché check: ban template phrasings ("passionate about," "leveraging cutting-edge," generic "vision/mission/ambition" framing) explicitly.
- Design layouts to accommodate real copy length (and a realistic max), not a tidy placeholder line.
- Pull projects/timeline in strictly as **evidence for the thesis**, not as a decontextualized grid — each item should answer "why does this support the bet?"

**Warning signs:**
- Placeholder/lorem text still present late in the build.
- Copy that could describe any engineer (swap the name and nothing breaks).
- Real text overflows or underfills containers designed around placeholders.
- The "bets" read like a corporate mission statement.

**Phase to address:**
A dedicated **content/narrative phase**, sequenced *before* or *in parallel with* final layout — not after. Should gate the milestone alongside design.

---

### Pitfall 7: Desktop-designed motion breaking on mobile / responsive

**What goes wrong:**
Bold motion is almost always designed at desktop width first. On mobile it breaks in predictable ways: hover-dependent interactions have no equivalent on touch (and `:hover` can stick); parallax/scroll effects stutter on mobile GPUs; large type set for 1440px overflows or shrinks illegibly; `100vh` heroes jump when mobile browser chrome shows/hides; scroll-jacking fights the native momentum scroll users expect. Since a large share of portfolio traffic (shared links, recruiters on phones) is mobile, the worst experience hits the most casual, highest-bounce-risk visitors.

**Why it happens:**
Solo dev builds and admires the site on a desktop monitor. Motion that depends on hover or precise scroll position has no clean touch analog. Responsive is treated as "make it not overflow" rather than "design the motion for this context." `100vh` quirks are invisible on desktop.

**How to avoid:**
- Decide per effect: **does this animation exist on mobile, simplify, or disappear?** Use `matchMedia` / GSAP `matchMedia` to scope motion by breakpoint and input type. Don't assume desktop motion ports down.
- Never make content/navigation depend on `:hover`. Provide touch-equivalent affordances; design hover effects as enhancement only.
- Use `100dvh` (dynamic viewport units) for full-height heroes to avoid mobile-chrome jump; test on real iOS Safari + Android Chrome.
- Set fluid, clamped typography (`clamp()`) so big display type scales sanely.
- Test on an actual phone (or DevTools device mode + touch) at each section, not once at the end.

**Warning signs:**
- Horizontal scrollbar / overflow at narrow widths.
- Hover effects that never trigger or get stuck on touch.
- Hero height jumps when scrolling on a phone; janky scroll-linked animation on mobile.
- Type unreadably large or tiny on small screens.

**Phase to address:**
**Responsive/motion-adaptation phase** per section; verify on real devices in the **cross-device QA pass**.

---

### Pitfall 8: Keyboard, focus, contrast, and semantic regressions from custom design

**What goes wrong:**
Bold custom design routinely sacrifices accessibility basics: low-contrast trendy palettes (light-gray-on-white, thin type on busy/photographic/animated backgrounds) fail WCAG contrast; custom-styled interactive elements lose visible focus indicators (`outline: none` with no replacement), stranding keyboard users; non-semantic markup (`<div>` everywhere, headings chosen for size not structure) breaks screen readers; custom nav/menus aren't keyboard-operable; animated/scroll-revealed content can be invisible to assistive tech or trap focus. A site meant to *prove craft* that fails basic a11y signals the opposite to anyone who checks.

**Why it happens:**
Visual-first design treats focus rings as "ugly" and removes them. Color is chosen for mood over contrast. Heading levels are picked to hit a font size, not document outline. Motion/scroll libraries manipulate DOM/visibility in ways that confuse AT. The owner navigates with a mouse and never tabs through.

**How to avoid:**
- Keep (and style, don't delete) visible focus indicators — use `:focus-visible` for a designed focus state that fits the aesthetic.
- Check text contrast against WCAG (4.5:1 normal, 3:1 large) **including text over images/video/animated backgrounds** — add scrims/overlays where needed. Don't trust eyeballing on a good monitor.
- Use semantic HTML: one logical `<h1>`, ordered heading levels for document outline (decouple visual size from heading level via CSS), real `<button>`/`<a>`, landmark regions, descriptive `alt`.
- Ensure full keyboard operability: tab through every interactive element, logical order, skip-link to main content, no focus traps in animated/overlay components.
- Run an automated pass (axe DevTools / Lighthouse a11y) **and** a manual keyboard + screen-reader spot check.

**Warning signs:**
- `outline: none` anywhere without a `:focus-visible` replacement.
- Lighthouse accessibility < ~95; axe flags contrast or names.
- Tabbing reveals no visible focus, illogical order, or unreachable controls.
- Heading levels skip (h1 → h4) for sizing reasons.

**Phase to address:**
Bake into **every build phase** (semantics + focus as you build); dedicated **accessibility pass** before launch as a milestone gate.

---

### Pitfall 9: SEO / Open Graph / social-share omissions

**What goes wrong:**
The site ships with default/missing `<title>`, no meta description, no Open Graph / Twitter Card tags, and no share image. When Chandran shares the link (the primary distribution channel for a personal site — DMs, LinkedIn, applications), it unfurls as a bare ugly URL with no title, description, or image. For a site whose entire purpose is first impression, the *preview* is often the actual first impression — and it's broken. Heavy client-side rendering can also leave crawlers/scrapers seeing an empty shell.

**Why it happens:**
Meta tags are invisible in the browser viewport, so they're forgotten — there's no visual feedback for their absence during the build. SPA/client-rendered setups don't emit per-page meta unless explicitly configured. OG images require deliberate creation. Multi-page sites need *per-page* meta, which is extra work.

**How to avoid:**
- Treat meta as part of "done" for every page: unique `<title>`, meta description, canonical URL, and per-page Open Graph + Twitter Card tags with a designed OG image (1200×630).
- Prefer SSG/SSR or pre-rendered HTML so titles/OG and content exist in the served markup (matters for scrapers and link unfurlers that don't run JS).
- Add `sitemap.xml`, `robots.txt`, and favicon/app-icon set.
- **Test the unfurl** before launch in real targets (LinkedIn Post Inspector, social card validators, paste into a chat) — don't assume.

**Warning signs:**
- Pasting the URL into Slack/LinkedIn/iMessage shows no card or a blank/placeholder image.
- View-source shows generic framework default title on every page.
- No `og:image`; identical title across all pages.

**Phase to address:**
**Stack/architecture phase** (choose a rendering mode that emits real HTML meta) and a **launch-prep/SEO phase**. Verify in the launch checklist.

---

### Pitfall 10: Font licensing violations

**What goes wrong:**
Bold typography is central to the aesthetic, so the owner reaches for a striking display font. Common license violations: using a **desktop/print license** font as a webfont (different license tier); self-hosting a commercial font without a webfont license; lifting a font file from another site or a "free fonts" mirror that has no redistribution rights; exceeding pageview/domain limits on a hosted webfont plan; or using a "free for personal use" font on what is arguably a professional/promotional site. For a site meant to showcase professional craft, a license violation is both a legal exposure and an embarrassing credibility hit if noticed.

**Why it happens:**
Font licensing is genuinely confusing — desktop vs. webfont vs. app licenses are distinct products, and "free download" sites blur whether commercial/web use is permitted. The cost of a premium display font tempts shortcuts. Self-hosting (good for performance) is mistakenly assumed to also grant usage rights.

**How to avoid:**
- Use clearly web-licensed fonts: Google Fonts (open-source, OFL — free for web/commercial, self-hostable via fontsource), or other explicitly OFL/Apache fonts. These cover the vast majority of needs with no license risk.
- If a paid display font is wanted for the hero, **buy the correct webfont license** for the expected domain/pageviews and keep the receipt; read the EULA for self-hosting permission.
- Never use a "personal use only" font on a portfolio that markets professional services/availability — that's commercial use.
- Keep a short `LICENSES`/credits note recording each font and its license source.

**Warning signs:**
- Font file obtained from a random download site or extracted from another website's assets.
- License says "desktop" / "personal use" / "free for personal projects."
- No record of where a font came from or under what terms.

**Phase to address:**
**Typography/design-direction phase** — settle fonts and confirm licensing *before* committing the visual direction to them (swapping a hero font late is costly).

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip reduced-motion variants ("add later") | Faster to build the flashy version | Retrofitting motion gating across many components is far harder than building it in; ships harmful experience meanwhile | Never — build the guard first |
| Lorem ipsum / placeholder copy in layouts | Unblocks visual work immediately | Layouts get sized to fake text; real copy gets squeezed; story is an afterthought | Only for the earliest throwaway sketch; never past the first build phase |
| Desktop-only build, "make responsive later" | Faster initial visual progress | Motion + type designed for desktop often must be re-thought for mobile, not just resized | Acceptable to draft desktop-first *if* responsive is a scheduled phase, not a hope |
| Heavy animation lib (GSAP+ScrollTrigger+Lenis+Three) by default | Powerful effects available instantly | Bundle bloat, INP/LCP hit, mobile jank, more reduced-motion surface area | When a specific signature effect truly needs it and it's code-split/scoped |
| `outline: none` on focus to "clean up" design | Removes a visual the owner finds ugly | Keyboard users stranded; WCAG failure; credibility hit | Never without a `:focus-visible` replacement |
| Inline per-component animation logic | Quick to add one effect | No central reduced-motion/breakpoint control; inconsistent timing | Only for trivial one-offs; prefer a shared motion config |
| Client-only rendering for a content site | Simple SPA setup | Empty HTML for crawlers/unfurlers; SEO/OG fragility | Rarely justified here — content + SEO favor SSG/SSR |

## Integration Gotchas

Common mistakes when connecting to external services (minimal for this static, backend-free site).

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Hosting / custom domain | Misconfigured DNS, missing HTTPS, no `www`↔apex redirect | Configure DNS early; verify auto-HTTPS (most static hosts provide it); set canonical host + redirect; test before announcing |
| Google Fonts / hosted webfonts | `<link>` to Google Fonts adds third-party connection + privacy/latency cost; some jurisdictions flag the IP transfer | Self-host (fontsource or downloaded OFL files) + preload; removes third-party round-trip and improves LCP |
| Analytics (if added) | Heavy/blocking script (e.g. classic GA) hurts INP/LCP and adds cookie-consent burden | Use a lightweight, privacy-friendly, async analytics (e.g. Plausible-style) or none; load deferred |
| Contact / email link | Building a backend form for a low-churn personal site | `mailto:` or a static-host form service; no backend needed (matches "no CMS/backend" scope) |
| Link unfurlers (LinkedIn/Slack/iMessage) | Assuming OG tags work without testing | Validate with each platform's inspector before sharing widely |

## Performance Traps

Patterns that work on the dev machine but fail on real visitors' devices. (Scale here = device capability + network, not concurrent users.)

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Animating layout properties (top/left/width/height/margin) | Jank, high CLS, dropped frames | Animate only `transform`/`opacity`; promote with `will-change` sparingly | Immediately on lower-end GPUs / on first load |
| Unbudgeted font weights/families | Slow LCP, FOUT reflow | 1–2 families, subset, woff2, preload critical | Mid-range phones on mobile data |
| Full-res / unsized hero imagery & video bg | Multi-second LCP, layout shift, data waste | Responsive AVIF/WebP, explicit dimensions, lazy below fold | Phones, slow connections |
| Smooth-scroll + scroll-triggered everything | Sticky scroll, high INP, mobile stutter | Use sparingly; scope to desktop; respect reduced-motion | Touch devices, low-power CPUs |
| WebGL/Three.js loaded site-wide | Large bundle, main-thread blocking, battery drain | Code-split; load only on the page/section that uses it; static fallback | Any constrained device; immediately on mobile |
| Testing only on the dev machine | "It's fast" that isn't | Routine throttled testing (Slow 4G + 4× CPU), real phone checks | Always — the gap is invisible locally |

## Security Mistakes

Limited surface (static, no backend, no user data), but not zero.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Committing secrets/API keys (analytics, deploy tokens) to the repo | Token leakage, abuse | Use host env vars / secrets; `.gitignore` env files; the site needs no client-side secrets |
| No HTTPS / mixed content | Browser warnings, broken assets, credibility hit | Ensure host enforces HTTPS; load all assets over HTTPS |
| Third-party scripts/embeds from untrusted sources | XSS / supply-chain via injected script | Minimize third-party JS; pin/verify any embed; consider a basic Content-Security-Policy header |
| Outdated dependencies (animation libs, build tooling) | Known vulns in the toolchain | Periodic `npm audit`; keep deps current; minimal dependency footprint |
| Exposing personal data beyond intent (full address, phone) | Doxxing/spam risk on a public personal site | Share only what's intended; prefer a contact form/email alias over raw personal details |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Long intro/loader animation before content | Impatient visitors bounce before the story | Keep any intro <1s and skippable; never gate first contentful paint behind a loader |
| Story buried under spectacle | Visitor remembers "cool animations," not Chandran's bets | Motion serves the narrative; ensure the thesis is legible within seconds of landing |
| Scroll-jacking / nonstandard navigation | Disorientation, lost place, can't find content | Respect native scroll; if used, make it subtle, reversible, reduced-motion-aware |
| No clear path between pages (multi-page site) | Visitor doesn't discover case studies / journey | Persistent, obvious nav; clear inter-page links; the narrative spine should guide traversal |
| Hover-only affordances on touch | Mobile visitors miss interactions/info | Design hover as enhancement; ensure touch-equivalent access |
| Autoplaying audio/video with motion | Startling, bandwidth-heavy, annoying | No autoplay audio; muted + reduced-motion-aware video; provide pause |
| Case studies as a decontextualized grid | Contradicts story-first intent | Frame each project as evidence for a stated bet, with a throughline |

## "Looks Done But Isn't" Checklist

Things that appear complete on the dev machine but are missing critical pieces.

- [ ] **Reduced motion:** Often missing entirely — verify the site is calm & usable with Windows 11 "Animation effects" off (and OS reduce-motion on).
- [ ] **Mobile motion:** Often only tested on desktop — verify on a real phone (iOS Safari + Android Chrome): no overflow, no `100vh` jump, no hover-stuck, scroll smooth.
- [ ] **Keyboard navigation:** Often broken by custom design — verify tab order, visible `:focus-visible`, skip-link, no focus traps in overlays/animated sections.
- [ ] **Contrast over imagery:** Often fails on hero text over photo/video — verify WCAG 4.5:1 (3:1 large) including animated/photographic backgrounds.
- [ ] **Social unfurl:** Often missing OG tags/image — verify the link renders a proper card in LinkedIn/Slack/iMessage.
- [ ] **Per-page SEO meta:** Often only the homepage has real title/description — verify each page has unique title, description, canonical.
- [ ] **Real content:** Often still placeholder — verify no lorem ipsum, copy is specific & in-voice (no boilerplate vision/mission framing).
- [ ] **Throttled performance:** Often only fast-machine-tested — verify Lighthouse mobile LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- [ ] **Font licensing:** Often unverified — confirm every font has a valid web/commercial license with a recorded source.
- [ ] **CLS on load:** Often invisible locally — verify no heading/image jump on a cold load over throttled network.
- [ ] **Favicon / app icons / 404 page:** Often forgotten — verify present and on-brand.

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Never-launch perfectionism | LOW (decision, not code) | Freeze scope to the launch checklist; ship to the real domain now; schedule polish as post-launch levels |
| Missing reduced-motion | MEDIUM | Add the global guard CSS immediately; then add scoped reduced alternatives for signature moments; retrofit JS motion via `matchMedia` |
| CLS from animation/fonts | LOW–MEDIUM | Switch keyframes to transform/opacity; add image dimensions/aspect-ratio; size-adjust font fallbacks |
| Heavy payload / poor CWV | MEDIUM | Subset/drop fonts, convert images to AVIF/WebP, code-split or remove the heaviest animation lib, lazy-load |
| Weak/placeholder copy | MEDIUM–HIGH | Dedicated writing pass in-voice; may force layout adjustments to fit real content |
| Mobile motion breakage | MEDIUM | Scope effects by breakpoint/input with matchMedia; swap to `100dvh`; replace hover-only affordances |
| a11y regressions | LOW–MEDIUM | Restore `:focus-visible`, fix headings/landmarks, add scrims for contrast, run axe + keyboard pass |
| SEO/OG omissions | LOW | Add meta + OG per page, generate OG image, add sitemap/robots; re-test unfurl |
| Font licensing violation | LOW–HIGH | Swap to an OFL/Google font (low) or purchase correct license (cost); worst case re-typeset if the look depended on it |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls. (Phase names are suggestions for the roadmap author.)

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Never-launch perfectionism | Roadmap/planning (define launch checklist + freeze-direction boundary) | Milestone exits when checklist is green — not when it "feels done" |
| Reduced-motion ignored | Animation-system phase (build guard first) | Site usable with OS reduce-motion on; per-effect reduced variant exists |
| CLS from animation/fonts | Animation-system + typography/asset phases | Lighthouse CLS ≤ 0.1 on throttled cold load |
| Heavy payload / CWV | Stack/architecture (budget) + each build phase | Lighthouse mobile LCP ≤2.5s, INP ≤200ms; under weight budget |
| Over-animation | Design-direction/sketch (motion principles) + section builds | Read-through test: story legible without waiting on motion |
| Weak/placeholder copy | Dedicated content/narrative phase (before final layout) | No placeholder; in-voice, specific, non-boilerplate copy |
| Mobile motion breakage | Responsive/motion-adaptation phase | Real-device QA: no overflow/jump/hover-stuck, smooth scroll |
| a11y regressions (focus/contrast/semantics) | Every build phase + dedicated a11y pass | axe/Lighthouse ≥95 + manual keyboard & SR spot check |
| SEO/OG omissions | Stack (rendering mode) + launch-prep/SEO phase | Unfurl test + per-page meta audit |
| Font licensing | Typography/design-direction phase | Recorded valid web license per font before direction freeze |

## Sources

- MDN — `@media/prefers-reduced-motion` (fetched 2026-06-26): values (`no-preference`/`reduce`), guidance to remove vestibular triggers and substitute opacity-based alternatives, per-platform user settings incl. Windows 11. **HIGH**
- MDN — Lazy loading guide (fetched 2026-06-26): `loading="lazy"`, layout-shift implications of late-loading media. **HIGH**
- Core Web Vitals thresholds (LCP ≤2.5s good, INP ≤200ms good, CLS ≤0.1 good) and **INP replaced FID on 2024-03-12** — web.dev / Google Search Central, established knowledge current to Jan 2026 cutoff (direct fetch of web.dev was blocked in this environment). **HIGH**
- WCAG 2.1/2.2 — contrast (1.4.3: 4.5:1 / 3:1 large), focus visible (2.4.7), animation from interactions (2.3.3), keyboard (2.1.1) — established standards. **HIGH**
- SIL Open Font License (OFL) terms; desktop vs. webfont vs. personal-use license tiers — established font-licensing knowledge. **MEDIUM–HIGH** (specific paid-foundry EULAs vary; verify per font)
- Domain practitioner knowledge of award-style / motion-heavy portfolio failure modes (scroll-jacking complaints, over-animation, desktop-first breakage, OG omissions). **MEDIUM** (pattern-level, not single-source)

> Note: Live WebSearch and several WebFetch targets (web.dev, fonts.google.com) were blocked by environment permissions during this research; MDN fetches succeeded. Numeric thresholds and the FID→INP change are within the Jan 2026 knowledge cutoff and are stable, widely-published facts — flagged HIGH. Verify any specific paid-font EULA and current hosted-webfont pageview limits at purchase time.

---
*Pitfalls research for: design-led, motion-rich, multi-page personal portfolio (solo dev)*
*Researched: 2026-06-26*
