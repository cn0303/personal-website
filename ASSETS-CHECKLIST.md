# 📦 Assets & Info Checklist

Everything I need to enrich the site with images, video, logos, and facts.
Tick items as you add them. **Don't worry about exact size/format/naming** — drop the
highest-quality originals you have and I'll derive all responsive sizes/formats
(webp/avif, mp4/webm, posters) and optimize for load time.

**Legend:** ⭐ = high impact (do first) · ◦ = nice-to-have · ⚠️ = needs a decision/confirm

**Suggested drop layout** (create folders loosely — I'll sort whatever lands):

```
assets/
  brand/                      portrait, headshot, mark, resume.pdf, og
  hero/                       showreel video + poster frame
  projects/<slug>/            cover, gallery, demo clips
  logos/                      org logos (svg preferred)
  docs/                       papers, thesis, blog PDFs
```

**General specs (rough — I optimize the rest):**
- Photos: largest you have (≥2000px wide). Landscape for covers; a few portrait too.
- Video: 1080p+ `.mp4`/`.mov`; short loops (5–20s) best for hero.
- Logos: `.svg` preferred, else transparent `.png` ≥512px.
- Screenshots: native / 2× retina, `.png`.

---

## A. Brand / global
- [ ] ⭐ Professional **portrait** of you (1–2 shots; one in-lab/with-robots is ideal) → `assets/brand/`
- [ ] ⭐ **Résumé / CV** as PDF → `assets/brand/resume.pdf` *(site needs a CV link — currently missing)*
- [ ] ⭐ **Real email address** to use on the site: `____________________`
- [ ] ⭐ **Domain you own** (for deploy + canonical URLs): `____________________`
- [ ] ◦ A **logo / personal mark** if you have one *(else I'll cut a favicon from the CHANDRAN wordmark)*
- [ ] ◦ **OG / social-share image** *(I can generate from the design; a strong hero still helps)*

## B. Hero (homepage) — most important single asset
- [ ] ⭐ **Strawberry-harvesting showreel video** — highest-res source you have (the LinkedIn clip). Fills the cinematic media slot. → `assets/hero/`
- [ ] ◦ A **poster frame** for it *(or I'll grab a clean frame from the video)*
- [ ] ⚠️ Hosting preference for video: **self-host MP4** (I optimize, full control) **or** YouTube/Vimeo **embed**? → `____________________`

---

## C. Per-project media (Work page)
For each: one strong **cover** (landscape, ≥1600px) is the priority; galleries/clips are bonus.
Folder = `assets/projects/<slug>/`. Each line also notes the **LinkedIn post URL** to add (ChatGPT is compiling these).

### 1. Alpine Valley — Berry-Harvesting VLA  `alpine-valley-berry-harvesting`
- [ ] ⭐ Harvest **demo video** / clip
- [ ] ⭐ Photos: SO-101 rig + **fake-plant setup** (silicon stems / plastic berries)
- [ ] ◦ Environment shots (Austria / Alpine Valley) + team
- [ ] LinkedIn post URL: `____________________`

### 2. VLA Interpretability for Strawberry Picking  `vla-interpretability-strawberry`
- [ ] ⭐ The **2D "brain map"** visualization (image)
- [ ] ⭐ The **live rollout HUD** screenshot or short screen-recording
- [ ] ◦ Stage-discovery / HMM / Viterbi plots
- [ ] HF blog link (already in copy ✔) — LinkedIn post URL: `____________________`

### 3. Autonomous Twistlock Handling — Qafka  `qafka-twistlock-autonomy`
- [ ] ⚠️ **What is shareable?** (confidentiality) — confirm before any media goes public
- [ ] ◦ If allowed: mobile-robot photo, perception/depth viz, or just a safe still
- [ ] LinkedIn post URL (if any): `____________________`

### 4. Hugging Face LeLab Contributions  `lelab-open-source`
- [ ] ⭐ Screenshot of the **LeLab browser UI**
- [ ] ◦ Merged-PR screenshot
- [ ] ⚠️ Confirm **PR count** ("~6") and link to your PRs: `____________________`

### 5. FitCheck  `fitcheck-hardware-understanding`
- [ ] ⭐ Screenshot of the **HF Space UI**
- [ ] ◦ Short demo gif
- [ ] ⭐ **Live Space URL** (so I can embed it as an interactive iframe): `____________________`

### 6. Multi-LLM Interface for Supermarket Robots  `multi-llm-hri-thesis`
- [ ] ⭐ Photo of the **supermarket / service robot**
- [ ] ⭐ **Architecture / interface diagram** (or a figure from the paper)
- [ ] ◦ **Thesis PDF** → `assets/docs/`
- [ ] LinkedIn post URL: `____________________`

### 7. Vision-Guided Pick-and-Place — FORGIS  `forgis-physical-ai`
- [ ] ⭐ **Dobot Nova 5** demo photo/video
- [ ] ◦ AR / Spectacles view + the **demo-to-Massimo-Banzi** / award moment
- [ ] LinkedIn post URL: `____________________`

### 8. Unspool  `unspool`
- [ ] ⭐ 3–5 **app screenshots** (key screens)
- [ ] ◦ App icon + short screen-recording + store badges
- [ ] Store links (App Store / Play Store): `____________________`

### 9. Early Mechatronics & Writing  `early-mechatronics-writing`
- [ ] ⭐ **Monocopter** photos + 1–2 standout early-project images
- [ ] ◦ Hackster profile screenshot
- [ ] ⚠️ Confirm **"100k+ views"** claim

---

## D. Journey / timeline thumbnails  (`assets/logos/` or `assets/projects/...`)
Small images/logos per milestone — modest resolution is fine (rendered small).
- [ ] ◦ NITK + **BAJA car**
- [ ] ◦ IEEE paper figure
- [ ] ◦ TU Delft · Frontiers · Qafka
- [ ] ◦ Hackathons: **PIX-E** robot (Junction) · **Hyrox AR** (Snap)
- [ ] ◦ Alpine Valley · HF blog visual · LeLab · **Lely**

## E. Org logos (credibility strip + inline) — ⭐ as a set → `assets/logos/`
- [ ] Qafka  ·  [ ] Lely  ·  [ ] TU Delft  ·  [ ] NITK
- [ ] Hugging Face  ·  [ ] Alpine Valley / Latent Robotics
- [ ] Arduino / FORGIS  ·  [ ] Snap  ·  [ ] Junction
- [ ] Frontiers  ·  [ ] IEEE  ·  [ ] Dobot
> Want me to **fetch the public ones myself** (HF, TU Delft, Arduino, etc.)? Say the word and I'll take those off your list.

## F. Extra info / text
- [ ] ⭐ **LinkedIn post URLs** per project (fills the per-project links — multiple links supported now)
- [ ] Per project: **collaborators to credit**, exact **dates**, **publishable metrics**
- [ ] Demo/embed URLs: FitCheck Space, any interpretability demo, Unspool store links
- [ ] Confirm handles: GitHub `cn0303` · Hugging Face `cn0303` · Hackster `chandran0303cn`

---

## ⚠️ Fact-check before going public
- [ ] **SmolVLA episode count** — copy says *"~450 episodes"* but earlier writeups said *"40 teleoperated demos."* Which is correct?
- [ ] **LeLab "~6 PRs merged"** — confirm current number
- [ ] **Hackster "100k+ views"** — confirm
- [ ] **Qafka twistlock** — confirm the public-safe framing
- [ ] **Lely** — confirm title ("Rapid Prototyping Engineer") + start ("Aug 2026") are OK to publish

---

## How I'll process whatever you drop
1. Inventory the `assets/` folder and map files to slugs/sections.
2. Decide each asset's role/crop/format from its real dimensions.
3. Wire in responsive `<Image>`/`<Picture>` + video-with-poster (move into `src/assets/` and `public/` appropriately).
4. Rebuild, **measure load time / Core Web Vitals**, and tune (lazy-load, compress, sized media).
