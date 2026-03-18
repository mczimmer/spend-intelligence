# CLAUDE.md — Spend Intelligence

## Project

Mærsk × Valtech Spend Intelligence — a hypothesis and proof of concept for AI-powered category standardisation and payment-code reconciliation across Mærsk's post-acquisition procurement landscape.

**Live:** https://spend-intelligence-navy.vercel.app
**Repo:** github.com/mczimmer/spend-intelligence
**Stack:** Next.js 14 (Pages Router) · TypeScript · Vercel auto-deploy

## Git Config

```bash
git config user.email "mczimmer@gmail.com" && git config user.name "mczimmer"
```

## Deployment

```bash
npm install && npx vercel --prod
```

Auto-deploys from GitHub on push to main.

---

## Design System — Mærsk Navy + Valtech Clarity

### Core Principle

Mærsk brand presence through navy, star blue, and maritime authority. Valtech delivery credibility through structure, hierarchy, and digital precision. This is a private executive workspace for an engagement hypothesis, not a marketing microsite.

### Palette

```
Mærsk Navy:      #00243D  — sidebar, hero backgrounds, dark callouts, primary headings
Mærsk Blue:      #003B5C  — secondary dark surfaces, card accents
Mærsk Star:      #42B0D5  — accent color, active states, progress, links, highlights
Mærsk Light:     #E8F4F8  — light accent surfaces, selected states, hover backgrounds
White:           #FFFFFF  — card backgrounds, main content area
Valtech Light:   #F7F7F7  — section backgrounds, alternating surfaces
Valtech Border:  #E5E5E5  — card borders, dividers, table rules
Valtech Gray:    #6B7280  — body text, secondary labels, metadata
Valtech Black:   #111111  — primary body text
Success:         #22c55e  — positive indicators, matched status, savings
Warning:         #eab308  — partial match, attention needed
Danger:          #ef4444  — unmatched, misalignment, errors
```

### Accent Usage

Mærsk Star (`#42B0D5`) is the primary accent. Used for:
- Active nav indicators
- Progress bars and confidence bars
- Links and interactive elements
- Section label bars
- Selected/active tab states
- Chart highlights

**Not** used as large surface fills. The accent signals precision, not decoration.

### Typography

```
Primary:  Inter — all body text, headings, UI labels
Mono:     JetBrains Mono — codes, IDs, percentages, technical values
```

Weights:
- 800: page titles, key metrics, hero headings
- 700: section headings, card titles, table headers, emphasis
- 600: labels, badges, metadata
- 500: nav items, secondary text
- 400: body text

### Type Scale

```
Hero:       38px / 800 weight / 1.2 line-height
H2:         28px / 800 weight / 1.25 line-height
H3:         18px / 700 weight
Body:       15px / 400 weight / 1.7 line-height
Caption:    13px
Small:      12px
Micro:      11px — badges, metadata, labels
Tiny:       10px — uppercase section labels, table headers (with 0.06-0.08em tracking)
Stat value: 24-26px / 800 weight
```

### Component Conventions

- **Cards:** White bg, 1px border (`#E5E5E5`), 12px border-radius, 24-28px padding. No shadows.
- **Badges:** Pill-shaped (border-radius: 9999), 1px border, coloured bg. Sizes: `padding: 2px 10px, font-size: 11px, font-weight: 600`.
- **Tables:** Left-aligned, 2px bottom border on thead, 1px `#f5f5f5` row dividers. 10px uppercase tracking headers in Valtech Gray. Hero treatment — generous padding, clean scanability.
- **Dark callouts:** Mærsk Navy background, white text, star accent for labels and highlights.
- **Stats bar:** Navy background, grid of metrics. Label in star/muted, value in white 800 weight.
- **Section labels:** Inline-flex with 20px × 2px accent bar + 11px uppercase tracking text.
- **Confidence bars:** 56px wide, 5px height, colour-coded (green ≥90, amber ≥75, red <75).

### Layout

- **Shell:** Dark sidebar (Mærsk Navy `#00243D`, w-56) + sticky top bar + large content canvas
- **Sidebar:** Typography-led nav. "Mærsk × Valtech" branding at top. Grouped sections. Active state: star accent indicator + white text.
- **Top bar:** Breadcrumb left, status badge right. White/warm background with subtle border.
- **Content canvas:** Max-width ~1080px, generous horizontal padding.

### Page Rhythm

Every page follows this structure:
1. **Section label** — uppercase accent bar + category name
2. **Page heading** — H2, bold, navy
3. **Subtitle** — 1-2 sentences, max-width 700px, gray body text
4. **Core content** — cards, tables, diagrams, interactive elements
5. **Insight/callout** — navy card or light accent card summarising implications

---

## Project Structure

```
src/
├── pages/
│   ├── _app.tsx           ← Shell wrapper, font loading
│   ├── index.tsx          ← Overview (hero + executive summary)
│   ├── problem.tsx        ← Problem Space
│   ├── solution.tsx       ← Hypothesis & Approach
│   ├── value-case.tsx     ← Business Impact
│   ├── demo.tsx           ← Interactive POC (centrepiece)
│   ├── architecture.tsx   ← Technical Architecture (4 diagrams)
│   ├── governance.tsx     ← Data Governance, Security, Compliance
│   └── approach.tsx       ← Engagement Phases + Investment
├── components/
│   ├── Shell.tsx          ← Sidebar + top bar + canvas
│   ├── Section.tsx        ← Section wrapper with bg/padding
│   ├── SectionLabel.tsx   ← Accent bar + label
│   ├── Card.tsx           ← Standard card
│   ├── Badge.tsx          ← Status/category pills
│   ├── Stat.tsx           ← Metric display
│   ├── ConfBar.tsx        ← Confidence bar
│   ├── Nav data           ← Navigation structure
│   └── Diagrams/          ← SVG diagram components
├── data/                  ← Mock data (spend items, phases, etc.)
├── styles/
│   └── globals.css        ← Global resets, animations
└── lib/
    └── constants.ts       ← Brand tokens, font config
```

---

## Key Content

### Demo

The interactive demo is the centrepiece. It uses synthetic data modelled on Mærsk's maritime procurement landscape — 18 spend items across 8 acquired entities. Three-stage pipeline:

1. **Categorise** — semantic classification against UNSPSC-aligned taxonomy
2. **Reconcile** — payment-code and material-code consistency checking
3. **Consolidate** — cross-entity spend aggregation with savings estimation

The demo includes an AI Insight component that calls the Anthropic API. This requires the API to be proxied through a server-side route with an API key in env vars to work on Vercel. Currently shows "AI insight unavailable" without the key.

### Architecture Diagrams

Four SVG diagrams (all inline, no external dependencies):
- End-to-End Data Flow
- AI Classification Pipeline
- Integration Architecture
- Delivery Timeline

### Engagement Phases

Four phases with clear deliverables and go/no-go gates:
1. Validate (Weeks 1-3) — accuracy benchmark
2. Pilot (Weeks 4-8) — 2 category groups live
3. Scale (Weeks 9-14) — full deployment
4. Embed (Weeks 15-18) — handover

---

## Content Tone

Senior procurement transformation. Technical credibility without jargon overload. Business-literate, data-forward, hypothesis-driven.

Good: "Every misaligned code, every invisible consolidation opportunity, every manual reconciliation hour has a measurable financial impact."
Good: "If the accuracy benchmark meets the gate criteria, we proceed to Pilot. If not, we stop with full transparency on what was learned."
Bad: "Revolutionise your procurement with cutting-edge AI."
Bad: "Unlock the power of intelligent spend management."

---

## Things to Avoid

- Marketing microsite aesthetic — this is a private working environment
- Consumer-grade emojis as section icons (use accent bars or subtle indicators)
- Startup SaaS patterns (loud CTAs, gradient buttons, playful interactions)
- Heavy shadows or glassmorphism
- Casual or hype language
- Generic AI/ML buzzword soup

---

## Prepared For

**Client:** Navneet S. Rainu, Asset Strategy Platform, Mærsk
**Context:** February 2026 Discovery follow-up
**Status:** Hypothesis & Proof of Concept