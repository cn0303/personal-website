# Requirements: Chandran — Personal Website

**Defined:** 2026-06-26
**Core Value:** The site must clearly and compellingly communicate Chandran's vision and direction — what he's working toward and why — so a visitor understands the person behind the work, not just a list of things he built.

## v1 Requirements

Requirements for the initial release. Each maps to a roadmap phase.

### Narrative & Identity

- [ ] **NARR-01**: Visitor sees a hero/manifesto that states Chandran's vision in his own voice (no vision/mission boilerplate)
- [ ] **NARR-02**: Visitor can read a "bets" section explaining what Chandran is building toward and why
- [ ] **NARR-03**: Visitor can read an About section covering background and who he is
- [ ] **NARR-04**: Visitor can see the concrete skills and tools behind the work

### Work & Case Studies

- [ ] **WORK-01**: Visitor can browse a work section that frames projects as evidence for the story (narrative-led, not a bare grid)
- [ ] **WORK-02**: Visitor can open a dedicated case-study page per project, each at its own URL
- [ ] **WORK-03**: Each case study follows a problem → approach → outcome narrative with supporting media
- [ ] **WORK-04**: Adding a new project is a content-only operation (drop a markdown/MDX file, no page hand-coding)

### Journey & Timeline

- [ ] **TIME-01**: Visitor can view a chronological journey (bachelor's projects, hackathons, competitions won, and beyond)
- [ ] **TIME-02**: Timeline entries are content-driven via a typed schema, easy to add and extend

### Design System

- [ ] **DSGN-01**: Site presents a cohesive, bold/expressive visual identity that itself demonstrates craft
- [ ] **DSGN-02**: All visual constants (color, type scale, spacing, motion) are defined as design tokens — a single source of truth
- [ ] **DSGN-03**: A signature expressive typography system is applied consistently across the site
- [ ] **DSGN-04**: Visual direction is anchored to owner-provided references and frozen before the build phase

### Motion

- [ ] **MOTN-01**: Site has one marquee motion treatment (scroll-driven storytelling or an animated timeline) executed flawlessly
- [ ] **MOTN-02**: All motion respects `prefers-reduced-motion` with calm, first-class alternatives (not an afterthought)
- [ ] **MOTN-03**: Page-to-page navigation feels continuous via view transitions, degrading gracefully where unsupported

### Platform & Global

- [ ] **PLAT-01**: Persistent navigation works across all pages and survives page transitions
- [ ] **PLAT-02**: Site is fully responsive and correct from 360px width upward
- [ ] **PLAT-03**: Visitor has a working contact path (email or contact mechanism)
- [ ] **PLAT-04**: Visitor can access Chandran's resume / CV
- [ ] **PLAT-05**: Site has an on-brand 404 page

### Quality

- [ ] **QUAL-01**: Site meets an accessibility baseline — keyboard navigation, visible focus, sufficient contrast, semantic structure
- [ ] **QUAL-02**: Site meets Core Web Vitals on throttled mobile (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)
- [ ] **QUAL-03**: Every page has correct SEO meta and a social/OG unfurl

### Launch & Deploy

- [ ] **DPLY-01**: A finite, written "design-complete" launch checklist exists and gates go-live
- [ ] **DPLY-02**: Site is live on Chandran's custom domain over HTTPS

## v2 Requirements

Deferred to a future release. Tracked but not in the current roadmap.

### Enhanced Experience

- **EXP-01**: Dark / light theme toggle (both art-directed)
- **EXP-02**: Advanced interactive timeline (filtering, expandable detail)
- **EXP-03**: WebGL / 3D generative hero treatment
- **EXP-04**: Embedded demo media galleries (robotics / teleop footage) with rich playback
- **EXP-05**: Advanced shared-element view-transition choreography (project cover → case-study hero)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep. (Anti-features from research included with warnings.)

| Feature | Reason |
|---------|--------|
| Project grid as primary structure | Contradicts the core value — projects are evidence inside the narrative, not the point |
| CMS / dynamic backend | Content is personal and low-churn; content collections suffice, backend adds needless complexity |
| Blog / writing section | Out of scope for v1; site is narrative + portfolio, not a publishing platform |
| Vision/mission/ambition boilerplate | Owner explicitly forbids corporate template language; story is told in his own voice |
| Scroll-jacking / hijacked scroll | Hurts usability and accessibility; motion must guide, never gate comprehension |
| Heavy preloaders / intro animations | Adds friction and payload; hurts perceived performance and CWV |
| Testimonials / client logo walls | Not aligned with a personal narrative site |
| Autoplay audio | Hostile UX, accessibility problem |
| i18n / multi-language | No current need; adds complexity |
| Cookie-banner-heavy analytics | Avoid invasive tracking on a personal site |

## Traceability

Which phases cover which requirements. **Populated during roadmap creation.**

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-04 | Phase 1 | Pending |
| DSGN-02 | Phase 2 | Pending |
| DSGN-03 | Phase 2 | Pending |
| PLAT-01 | Phase 2 | Pending |
| WORK-04 | Phase 2 | Pending |
| TIME-02 | Phase 2 | Pending |
| NARR-01 | Phase 3 | Pending |
| NARR-02 | Phase 3 | Pending |
| NARR-03 | Phase 3 | Pending |
| NARR-04 | Phase 3 | Pending |
| WORK-01 | Phase 3 | Pending |
| WORK-02 | Phase 3 | Pending |
| WORK-03 | Phase 3 | Pending |
| TIME-01 | Phase 3 | Pending |
| DSGN-01 | Phase 3 | Pending |
| PLAT-02 | Phase 3 | Pending |
| PLAT-03 | Phase 3 | Pending |
| PLAT-04 | Phase 3 | Pending |
| PLAT-05 | Phase 3 | Pending |
| MOTN-01 | Phase 4 | Pending |
| MOTN-02 | Phase 4 | Pending |
| MOTN-03 | Phase 4 | Pending |
| QUAL-01 | Phase 5 | Pending |
| QUAL-02 | Phase 5 | Pending |
| QUAL-03 | Phase 5 | Pending |
| DPLY-01 | Phase 5 | Pending |
| DPLY-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24 ✓
- Unmapped: 0

---
*Requirements defined: 2026-06-26*
*Last updated: 2026-06-26 after roadmap creation*
