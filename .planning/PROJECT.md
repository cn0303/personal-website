# Chandran — Personal Website

## What This Is

A design-led, multi-page personal website for Chandran — an engineer and
researcher (working close to hardware/ML; robotics & teleoperation among the
domains). It is a **narrative site**, not a project grid: the spine is the
story and motivation behind the work — what Chandran is betting on, what he's
building toward, and the skills and trajectory that back it up. Projects and
accomplishments appear as *evidence* for that story rather than as the point
in themselves.

## Core Value

The site must clearly and compellingly communicate Chandran's vision and
direction — what he's working toward and why — so that a visitor walks away
understanding the person behind the work, not just a list of things he built.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. Hypotheses until shipped + validated. -->

- [ ] Hero / manifesto — name + a sharp statement of vision/mission (the hook)
- [ ] "The bets" section — what Chandran is building toward and why (narrative core)
- [ ] Work / projects — multi-page case studies presented as evidence for the story
- [ ] About + skills — who he is, background, and the concrete skills/tools behind the work
- [ ] Journey / timeline — chronological trajectory: bachelor's projects → hackathons → competitions won → onward
- [ ] Cohesive, distinctive visual design that itself demonstrates craft (bold/expressive leaning)
- [ ] Deploy to Chandran's existing domain

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Blog / writing section — not requested for v1; site is narrative + portfolio, not a publishing platform
- CMS / dynamic backend — content is personal and low-churn; avoid backend complexity until proven necessary
- Cliché "vision / mission / ambition" boilerplate framing — Chandran explicitly wants the story told in his own voice, not corporate template language

## Context

- **Owner profile:** Engineer + researcher. Builds close to hardware and ML —
  robotics and SO-arm teleoperation appear in the user's broader environment.
  The portfolio spans engineering and research/academic work.
- **Narrative-first intent:** The writing *is* the design here. The purpose is
  to convey story and motivation — "what I'm betting on, what I'm working
  toward, the skills behind it" — using Chandran's own framing, deliberately
  avoiding generic vision/mission/ambition language.
- **Design priority:** Design is the explicitly stated #1 priority of the whole
  project. Aesthetic direction leans **bold / expressive** (big type, strong
  color, motion, personality, memorable). To be refined against real reference
  sites and screenshots the owner will provide, and through throwaway mockups
  (`/gsd:sketch`) and a formal design contract (`/gsd:ui-phase`).
- **Reference material pending:** Owner has specific reference websites and
  screenshots to share; these should anchor the design brief once provided.
- **Content readiness:** Core narrative (the "bets"/mission) and the
  chronological timeline content are not yet drafted — a dedicated content pass
  will develop them. The trailing detail in scoping ("...competitions I won,
  etc., and") suggests the timeline list is not yet exhaustive.
- **Working methodology:** Owner works in concentric "levels" — each level
  wraps the previous with one more axis of fidelity. However, for this project
  the chosen launch bar is *design-complete before going live* (see
  Constraints), so polish is front-loaded rather than shipped ugly-first.

## Constraints

- **Timeline / Quality bar**: Design-complete before launch — do not go live
  until the full multi-page experience is polished. Higher first-impression
  bar, accepted slower path. Quality over speed.
- **Design**: Bold/expressive aesthetic is the leading axis; design quality
  gates launch. Reference sites/screenshots (owner-provided) are the anchor.
- **Tech stack**: Open — to be recommended based on design goals during
  research. (A static-friendly, design-flexible, low-JS-overhead stack that
  supports rich multi-page content and motion is the likely fit.)
- **Hosting / Domain**: Owner already has a domain; build targets that domain.
  Specific domain string TBD from owner.
- **Platform**: Owner develops on Windows 11 (PowerShell primary).

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Narrative-driven structure (story over project-grid) | Owner's core goal is conveying vision/motivation; projects are evidence, not the point | — Pending |
| Multi-page (not one-pager) | Room for case studies + a chronological journey section; supports design depth | — Pending |
| Design-complete before launch | Owner prioritizes first impression and craft over speed-to-live | — Pending |
| Bold/expressive aesthetic direction | Owner's stated lean; design is the #1 project priority | — Pending (refine via sketch/ui-phase + references) |
| Tech stack deferred to research | Stack should serve the design rather than constrain it | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-26 after initialization*
