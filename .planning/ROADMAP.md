# Roadmap: Chandran — Personal Website

## Overview

A design-led, narrative-driven personal site built tokens-first along a strict dependency stack. We front-load the two things that make or break this project — the bold/expressive **visual direction** and the **narrative copy in Chandran's own voice** — and freeze them before any build. We then lay a tokens-first foundation (design system, layout shell, typed content schemas), compose all five sections and the case-study pages at full visual fidelity fed by real content, layer one flawless marquee motion treatment with reduced-motion built in first, and finally pass a finite written **design-complete checklist** (a11y/perf/SEO) that gates go-live before deploying to Chandran's custom domain. The ordering guarantees motion only ever decorates a finished, correct layout — and that "design-complete" is auditable rather than infinite.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Direction & Narrative** - Freeze the bold visual direction against owner references and author all narrative copy in Chandran's voice
- [ ] **Phase 2: Foundation** - Tokens-first design system, layout shell + routing, and typed content schemas
- [ ] **Phase 3: Build — Sections & Pages** - All five sections and case-study pages at full visual fidelity with real content and the asset pipeline
- [ ] **Phase 4: Motion Polish** - One marquee motion treatment plus continuous page transitions, reduced-motion first
- [ ] **Phase 5: Design-Complete Gate & Launch** - Pass the written design-complete + a11y/perf/SEO checklist, then deploy to the custom domain

## Phase Details

### Phase 1: Direction & Narrative
**Goal**: Settle and freeze the bold/expressive visual direction (anchored to owner-provided references) and author the real narrative content — the writing *is* the design, so it leads, not trails, the build.
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-04
**Success Criteria** (what must be TRUE):
  1. The bold/expressive visual direction is anchored to owner-provided reference sites/screenshots and captured in a frozen design brief (via /gsd:sketch + /gsd:ui-phase).
  2. The hero manifesto and "bets" copy are drafted in Chandran's own voice, with an explicit anti-cliché ban on vision/mission boilerplate.
  3. Timeline entries and per-project case-study narratives exist as real draft content (not placeholder/lorem ipsum).
  4. Web-licensed fonts are settled and the Tailwind-vs-pure-CSS decision is made, so the build can commit to them.
  5. Motion principles and the reduced-motion intent are documented as direction inputs for later phases.
**Plans**: TBD
**UI hint**: yes

### Phase 2: Foundation
**Goal**: Lay the tokens-first scaffold every visual layer composes from — design tokens as the single source of truth, an expressive type system, the layout shell + nav + routing, and typed content schemas so adding content is a content-only operation.
**Depends on**: Phase 1
**Requirements**: DSGN-02, DSGN-03, PLAT-01, WORK-04, TIME-02
**Success Criteria** (what must be TRUE):
  1. Every visual constant (color, type scale, spacing, motion) is defined as a design token in a single source of truth; a raw hex/px in a component is a review failure.
  2. A signature expressive typography system is wired and renders consistently across a `/styleguide` route.
  3. Persistent navigation (and footer) renders correctly across all pages, with `:focus-visible` and semantic structure baked in from the start.
  4. Adding a new project or timeline entry is a content-only operation — drop a typed MDX/markdown file, no page hand-coding (Zod-validated schemas + `getStaticPaths`).
**Plans**: TBD
**UI hint**: yes

### Phase 3: Build — Sections & Pages
**Goal**: Compose all five narrative sections and the dedicated case-study pages at full visual fidelity, fed by the real Phase 1 content, fully responsive, with the asset pipeline finalized so layout is correct and CLS-stable before any motion is added.
**Depends on**: Phase 2
**Requirements**: NARR-01, NARR-02, NARR-03, NARR-04, WORK-01, WORK-02, WORK-03, TIME-01, DSGN-01, PLAT-02, PLAT-03, PLAT-04, PLAT-05
**Success Criteria** (what must be TRUE):
  1. A visitor sees the hero/manifesto, "bets", About, and skills/tools sections stating Chandran's vision in his own voice.
  2. A visitor can browse work framed as narrative evidence and open a dedicated case-study page per project (own URL), each following problem → approach → outcome with supporting media.
  3. A visitor can view the chronological journey (bachelor's projects, hackathons, competitions, onward) rendered from the timeline schema.
  4. The site presents one cohesive, bold/expressive visual identity and is fully responsive and correct from 360px width upward.
  5. A visitor has a working contact path, can access the resume/CV, and lands on an on-brand 404 page; all media flows through the optimized asset pipeline.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Motion Polish
**Goal**: Layer expressive motion onto the finished, correct layout — one marquee treatment executed flawlessly plus continuous page-to-page transitions — with the reduced-motion path built as a first-class variant first, never retrofitted.
**Depends on**: Phase 3
**Requirements**: MOTN-01, MOTN-02, MOTN-03
**Success Criteria** (what must be TRUE):
  1. One marquee motion treatment (scroll-driven storytelling or an animated timeline) is executed flawlessly and animates only transform/opacity (no CLS regression).
  2. Every motion effect respects `prefers-reduced-motion` with calm, first-class alternatives — verified by toggling the OS setting.
  3. Page-to-page navigation feels continuous via view transitions and degrades gracefully where unsupported, surviving the persistent nav.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Design-Complete Gate & Launch
**Goal**: Convert "design-complete before launch" into a finite, green checklist — accessibility, Core Web Vitals, and SEO/OG — then deploy the static build to Chandran's custom domain over HTTPS. The gate guards against never-launch perfectionism.
**Depends on**: Phase 4
**Requirements**: QUAL-01, QUAL-02, QUAL-03, DPLY-01, DPLY-02
**Success Criteria** (what must be TRUE):
  1. A finite, written design-complete launch checklist exists and is fully green before go-live.
  2. The site meets the accessibility baseline (keyboard nav, visible focus, sufficient contrast, semantic structure) verified by axe + manual keyboard/screen-reader passes.
  3. The site meets Core Web Vitals on throttled mobile (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1) and every page has correct SEO meta + a social/OG unfurl.
  4. The site is live on Chandran's custom domain over HTTPS via the static build.
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Direction & Narrative | 0/TBD | Not started | - |
| 2. Foundation | 0/TBD | Not started | - |
| 3. Build — Sections & Pages | 0/TBD | Not started | - |
| 4. Motion Polish | 0/TBD | Not started | - |
| 5. Design-Complete Gate & Launch | 0/TBD | Not started | - |
