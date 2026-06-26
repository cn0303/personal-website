---
sketch: 002
name: dark-hero-wordmark
question: "How should the name / wordmark identity read in the dark cinematic direction — larger and more distinctive?"
winner: "W3"
tags: [wordmark, identity, logo, header]
---

# Sketch 002: Dark Hero / Wordmark Identity

## Design Question
Sketch 001 landed on the dark cinematic-technical direction, but the name was
flat and undersized ("just Chandran at one font size"). This sketch keeps the
*approved* hero and swaps only the **wordmark/identity treatment** — three
distinct, larger takes — so the name becomes a real identity moment.

## How to View
open .planning/sketches/002-dark-hero-wordmark/index.html

Switch wordmarks with the top bar; check **375px** in the toolbar.

## Variants
- **W1: Serif Statement** — "Chandran" in large Merriweather (900) with a mono role tag beneath. Editorial, confident, ties to the serif used in the headline italic.
- **W2: Lowercase Sans + dot** — "chandran**.**" in heavy Satoshi, oversized, tight, lowercase, with an accent-colored period. Modern, designer/dev personal-site energy.
- **W3: Technical Lockup** — a distinctive open-arc + node mark (a robotics nod: arc = reach, node = end-effector) + "CHANDRAN" in tracked mono caps, a role line, and a live "open to collaborations" status dot. Most on-theme with the blueprint/technical language.

## What to Look For
- Which reads most like *a personal brand* vs a company?
- Does the larger size balance against the thesis headline, or fight it?
- W3's mark — distinctive enough to become a favicon / repeated identity element?
- Mobile: does the wordmark hold when the nav links collapse?

## Revision 2 — adaptiveness fix + larger wordmarks
Owner feedback on r1: wordmarks were far too small (esp. W2), and the layout
"squished to the middle" without truly adapting. Root cause: the toolbar's
viewport buttons only narrowed a centered column while the responsive rules keyed
off the real window — so shrinking never triggered a mobile layout.

Fixes in r2:
- **Container queries** (`container-type: inline-size`) — layout now reshapes to the
  *frame's* width, so the viewport buttons genuinely demonstrate responsiveness.
- Full-bleed header: name hard **top-left**, nav hard **top-right**, generous gaps,
  larger/clearer nav labels.
- Wordmarks substantially enlarged across all three; W3 mark + name scaled up.
- Real mobile reshape: nav collapses to a **Menu** button + stacked panel at ≤760px.
- Owner leans **W3 (technical lockup)** — likes that it's the biggest / most distinct.

## Revision 3 — FINAL (W3 selected; balance/scale/fill fixed; browser-verified)
Owner picked **W3** but flagged: huge wasted left/right space, everything too small,
unbalanced; remove the "open to collaborations" status + dot — "just keep my name."

Fixes in r3 (rendered in Chrome at 1680px desktop + 390px mobile and screenshot-verified):
- **Filled composition**: hero is now a two-column layout — big headline left, a
  **full-bleed cinematic visual (wireframe arm + HUD + blueprint grid) bleeding to the
  right edge**, full viewport height. No dead space.
- **Headline enlarged + widened** (was choked into a 17ch column) — now fills the left
  column at clamp up to ~5.8rem.
- Wordmark = **CHANDRAN** only (mono tracked caps). Removed status line, green dot, role line.
- Larger nav + brand; generous top-left / top-right placement.
- True adaptiveness via container queries (verified): desktop two-column → mobile single
  column with visual on top + collapsing **☰ Menu**.

**Standing rule going forward:** every sketch is rendered & verified at desktop + mobile
before being shown; designs must fill the frame and adapt, never float in a void.

## Notes
- Copy is placeholder; the media zone is a stand-in for owner's real teleop/field footage.
- Fonts via CDN (Google + Fontshare).
