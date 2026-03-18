## Restructure — SPA to Multi-Page Workspace

Read CLAUDE.md first. This is a structural refactor of the existing single-page Spend Intelligence site into a multi-page executive workspace with a sidebar shell — same pattern as the Architecture Control Room project.

### What we're doing

Converting a scrolling SPA into 8 routed pages inside a premium shell layout. All existing content is preserved and split across pages. Two new content sections are added (Value Case, Governance). The interactive demo gets its own full page.

### Important constraints

- Next.js 14 Pages Router (not App Router)
- No new dependencies beyond what's already installed (React, Next, TypeScript)
- Inline styles are fine — the existing codebase uses them and consistency matters more than migration to Tailwind
- Preserve all SVG diagrams exactly as they are
- Preserve the full Demo component and all its data/logic exactly as it is
- Preserve the AI Insight component exactly as it is

---

### 1. Create brand constants file

Create `src/lib/constants.ts` extracting the existing colour and font tokens:

```typescript
export const C = {
  maerskNavy: "#00243D",
  maerskBlue: "#003B5C",
  maerskStar: "#42B0D5",
  maerskLight: "#E8F4F8",
  valtechBlack: "#111111",
  valtechGray: "#6B7280",
  valtechLight: "#F7F7F7",
  valtechBorder: "#E5E5E5",
  accent: "#42B0D5",
  success: "#22c55e",
  warning: "#eab308",
  danger: "#ef4444",
  white: "#FFFFFF",
};

export const font = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
};
```

Import these everywhere instead of redefining them per file.

---

### 2. Create Shell component

Create `src/components/Shell.tsx` — the app layout with dark sidebar + top bar + content canvas.

**Sidebar:**
- Width: 220px
- Background: `C.maerskNavy` (#00243D)
- Top branding area: "Mærsk" (weight 800) × "Valtech" (weight 700), separated by a muted divider. Below: "Spend Intelligence" in 13px white/90%.
- Bottom footer: "Hypothesis & POC" and "Prepared March 2026" in muted white/20%.

**Navigation items grouped into sections:**

```
Discovery
  Overview              → /

Analysis
  Problem Space         → /problem
  Hypothesis            → /solution
  Value Case            → /value-case

Proof of Concept
  Interactive Demo      → /demo
  Architecture          → /architecture

Engagement
  Governance            → /governance
  Approach & Investment → /approach
```

Nav styling:
- Section labels: 9px uppercase, tracking 0.14em, white/20%, weight 600
- Nav items: 13px, white/40% default, white/70% hover, white + star accent dot when active
- Active item: subtle white/8% background
- No oversized icons — typography-led, compact, elegant

**Top bar:**
- Height: 48px
- Background: white/92% with backdrop blur and bottom border
- Left: breadcrumb (muted "Spend Intelligence / " + bold current page name)
- Right: status badge — small star-coloured dot + "Phase 0 — Hypothesis" in muted text

**Content canvas:**
- Flex-1, padding 32-40px, max-width 1080px

**Mobile:** Add a hamburger menu button that opens the sidebar as a drawer overlay. Same pattern as Architecture Control Room.

**Conditional rendering in _app.tsx:** All pages render inside the Shell. No exceptions (unlike Architecture Control Room which has a login page outside the shell).

---

### 3. Create shared components

Extract from the existing `index.tsx` into separate files under `src/components/`:

- `Section.tsx` — the Section wrapper (already exists, just extract)
- `SectionLabel.tsx` — accent bar + uppercase label
- `Card.tsx` — standard card component
- `Badge.tsx` — pill badge with colour variants
- `Stat.tsx` — metric display
- `ConfBar.tsx` — confidence bar
- `PageHeader.tsx` — new component for consistent page headers:
  ```
  SectionLabel + H2 title + subtitle paragraph (max-width 700, gray, light weight)
  ```

Extract the four diagram components into `src/components/diagrams/`:
- `DiagramDataFlow.tsx`
- `DiagramAIPipeline.tsx`
- `DiagramIntegration.tsx`
- `DiagramTimeline.tsx`

Extract the Demo component and all its supporting code (SPEND data, classifyItem, reconcileItems, consolidateItems, AIInsight, fmt) into `src/components/Demo.tsx`. Keep it all in one file — the demo is self-contained and that's fine.

---

### 4. Create navigation data

Create `src/data/navigation.ts`:

```typescript
export const navigation = [
  { label: "Overview", href: "/", section: "Discovery" },
  { label: "Problem Space", href: "/problem", section: "Analysis" },
  { label: "Hypothesis", href: "/solution", section: "Analysis" },
  { label: "Value Case", href: "/value-case", section: "Analysis" },
  { label: "Interactive Demo", href: "/demo", section: "Proof of Concept" },
  { label: "Architecture", href: "/architecture", section: "Proof of Concept" },
  { label: "Governance", href: "/governance", section: "Engagement" },
  { label: "Approach & Investment", href: "/approach", section: "Engagement" },
];
```

---

### 5. Page: Overview (/)

The new landing page. Executive foyer — not a dashboard, not the old hero.

**Hero section** — full-width navy gradient background (same as current hero but inside the content area, not edge-to-edge since the shell handles the frame):
- Badge pill: "MÆRSK × VALTECH" in star accent
- Title (32-36px, weight 800, white): "Spend Intelligence"
- Subtitle (17px, white/70%): "AI-powered category standardisation and payment-code reconciliation for Mærsk's post-acquisition procurement landscape."
- Two info cards below: "Prepared for: Navneet S. Rainu, Asset Strategy Platform" and "Context: February 2026 Discovery — Hypothesis & POC"

**Executive summary strip** — grid of 4-5 stat cards:
- Acquired entities in scope: 8+
- Spend items classified: 18 (POC sample)
- Estimated consolidation savings: $274K
- Target accuracy: 92%+
- Engagement timeline: 18 weeks

**What this workspace contains** — brief section with card grid linking to all pages:
- Problem Space → /problem — "Why taxonomy fragmentation costs more than you think"
- Hypothesis → /solution — "How semantic AI resolves structural spend fragmentation"
- Value Case → /value-case — "The measurable business impact"
- Interactive Demo → /demo — "See the AI classification engine working on synthetic Mærsk data"
- Architecture → /architecture — "How it connects to existing systems"
- Governance → /governance — "Data handling, security, and compliance"
- Approach → /approach — "Phased engagement with clear gates"

Each card: title, one-line description, subtle hover effect. The Demo card should feel slightly more prominent — it's the centrepiece.

**Footer callout** — navy card: "This workspace presents a hypothesis and proof of concept. It is designed to support a 30-minute discussion on the opportunity and a concrete next step."

---

### 6. Page: Problem Space (/problem)

Take the existing "Problem Space" section content and give it a full page.

- PageHeader: label "Analysis", title "The Taxonomy Fragmentation Challenge", subtitle from existing.
- Three problem cards — same content as current (Category Fragmentation, Code Reconciliation Gap, Hidden Consolidation Value). **Replace the emoji icons (🗂️ 🔗 💰) with numbered indicators** — "01", "02", "03" in 20px star accent colour. Cleaner for this audience.
- "Why This Problem Persists" callout — same content, same light accent card treatment. **Replace the ⚡ emoji with a small accent bar.**
- Add a **"What this informs"** footer: navy callout linking to Solution and Value Case. "Understanding the structural nature of this problem is essential context for the AI hypothesis and value case that follow."

---

### 7. Page: Hypothesis (/solution)

Take the existing "Solution" section content.

- PageHeader: label "Analysis", title "Hypothesis: AI Semantic Classification", subtitle from existing.
- Four capability cards — same content (Semantic Understanding, Taxonomy Alignment, Code Reconciliation, Continuous Learning). Keep the blue badges.
- Target metrics bar — same navy stats bar (92%+ accuracy, 80% reduction, 5 days onboarding, 100% visibility).
- Add a **"What this informs"** footer: "This hypothesis is validated through the interactive demo using synthetic Mærsk procurement data." Link to Demo.

---

### 8. Page: Value Case (/value-case) — NEW

This is new content. Build it to match the existing design language.

- PageHeader: label "Analysis", title "The Business Impact of Unified Spend Intelligence", subtitle: "Taxonomy fragmentation isn't just a data problem — it's a cost problem. Every misaligned code, every invisible consolidation opportunity, every manual reconciliation hour has a measurable financial impact."

- **Value framework** — grid of 4 cards:

  1. **Spend Visibility** — "From fragmented to unified"
     "Cross-entity spend visibility enables category managers to see consolidated demand for the first time. Volume leverage becomes actionable, not theoretical."
     Metric: "100% addressable spend mapped within 5 days per entity"

  2. **Consolidation Savings** — "Supplier rationalisation at scale"
     "Duplicate suppliers across acquired entities are surfaced automatically. Consolidation opportunities are quantified by category, enabling data-driven sourcing decisions."
     Metric: "6–10% estimated savings on addressable consolidation spend"

  3. **Operational Efficiency** — "From manual reconciliation to automated flow"
     "Payment-code and material-code mismatches are flagged and corrected programmatically. Finance teams shift from reactive reconciliation to proactive exception management."
     Metric: "80% reduction in manual reconciliation FTE"

  4. **Acquisition Speed** — "New entities onboarded in days, not months"
     "Each acquisition currently requires 3–6 months of manual taxonomy mapping before spend is visible. The AI engine reduces this to days — making post-merger integration faster and cheaper."
     Metric: "5-day entity onboarding vs. 3–6 months today"

- **Cumulative impact** — navy stats bar:
  - Addressable spend (POC sample): $3.0M
  - Estimated savings identified: $274K
  - Savings rate: 9.2%
  - Extrapolated across full portfolio: "Significant" (deliberately understated — let the client do the mental multiplication)

- **Cost of inaction** — single accent-background card:
  "Every quarter without unified spend visibility is a quarter of missed consolidation, duplicate contracts, and manual reconciliation. The compounding cost is not the AI investment — it's the procurement value left on the table."

- Footer: "This value case is validated through the interactive proof of concept using synthetic data modelled on Mærsk's procurement landscape." Link to Demo.

---

### 9. Page: Interactive Demo (/demo)

Full-page treatment for the demo.

- PageHeader: label "Proof of Concept", title "See It Working", subtitle from existing content.
- Brief intro text above the demo.
- The full Demo component renders here — **no changes to the demo itself**. Just extract it from the monolith and render on its own page. Give it room to breathe.
- Below the demo, add a **"What this demonstrates"** navy callout with 3 columns:
  - "Classification accuracy" — "Semantic AI correctly categorised 18/18 items across 6 category groups with >79% confidence on all items."
  - "Code reconciliation" — "Payment and material code mismatches identified across all categories with suggested corrections."
  - "Consolidation opportunity" — "$274K in estimated savings surfaced from 18 line items across 8 entities."

---

### 10. Page: Architecture (/architecture)

Take the existing "Architecture" section content.

- PageHeader: label "Proof of Concept", title "How It Works", subtitle from existing.
- Four diagram cards — each with title, blue badge, and the SVG diagram component. Same layout as current, stacked vertically with gap.
- Add a **technology note** card at the bottom: "The architecture is API-first and cloud-native by design. No on-premise infrastructure is required for Phase 1. Integration with SAP S/4HANA and existing BI tools connects through standard APIs and can be validated during the Pilot phase."

---

### 11. Page: Governance (/governance) — NEW

New content. Addresses data handling, security, and compliance — the questions a Mærsk procurement team will ask.

- PageHeader: label "Engagement", title "Data Governance & Security", subtitle: "How we handle Mærsk's procurement data throughout the engagement — from initial sample ingestion through to production deployment."

- **Data handling principles** — grid of 3 cards:

  1. **Data Residency** — "Your data stays in your environment"
     "Production deployment runs within Mærsk's approved cloud environment. During POC, synthetic data is used. Any real data samples are processed in an isolated, encrypted environment and deleted after benchmarking."

  2. **Access Control** — "Least privilege, full audit trail"
     "All access to procurement data is role-based and logged. The AI engine operates on structured data extracts, not direct database connections. No standing access to source systems."

  3. **Compliance Alignment** — "Built for enterprise procurement"
     "The solution aligns with SOC 2 Type II, GDPR data processing requirements, and Mærsk's internal information security policies. Compliance documentation is provided as part of Phase 2 delivery."

- **AI-specific governance** — accent-background card:
  Title: "AI Transparency & Control"
  Content: "Every AI classification includes a confidence score. Items below the threshold are routed to human review — never auto-committed. The model does not learn from Mærsk data without explicit approval. All training data, model versions, and classification decisions are fully auditable."

- **Data lifecycle** — simple visual or table showing:
  - Phase 1 (Validate): Synthetic data only. No real Mærsk data required.
  - Phase 2 (Pilot): Real data sample from 2 category groups. Encrypted, access-controlled, deleted on request.
  - Phase 3 (Scale): Production data within Mærsk's environment. Full data governance controls active.
  - Phase 4 (Embed): Mærsk-owned and operated. Valtech access revoked.

- Footer callout: "Data governance is not an afterthought — it's built into the engagement model from day one. We are happy to review these commitments with Mærsk's information security team before any real data is shared."

---

### 12. Page: Approach & Investment (/approach)

Take the existing "Approach" section content.

- PageHeader: label "Engagement", title "How We Get There", subtitle from existing.
- Four phase cards — same content as current (Validate, Pilot, Scale, Embed). Keep the structure with deliverable and go/no-go gate per phase.
- "Investment & Next Step" card — same content as current.
- Add a **closing statement** — navy callout: "Phase 1 requires a sample dataset, 3 weeks, and a decision. The gate criteria are explicit: ≥85% classification accuracy on the sample. If it doesn't meet the bar, we stop — with full transparency on what was learned and what it would take to get there."

---

### 13. Update _app.tsx

Wrap all pages in the Shell:

```typescript
import Shell from "@/components/Shell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>...</Head>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </>
  );
}
```

Keep the existing font loading and meta tags.

---

### 14. Remove emoji icons throughout

Replace all emoji usage in content with styled alternatives:
- Problem cards: numbered indicators ("01", "02", "03") in star accent
- "Why This Problem Persists": accent bar instead of ⚡
- AI Pipeline diagram: keep the emoji icons in the SVG boxes — they work at that scale
- AI Insight component: replace 🧠 with a small star-coloured dot or accent bar
- Remove any other decorative emoji

---

### 15. What NOT to do

- Don't change the Demo component logic, data, or behaviour
- Don't change the SVG diagram components
- Don't add Tailwind — the project uses inline styles consistently
- Don't add new fonts or external dependencies
- Don't add heavy animations or transitions
- Don't use the Architecture Control Room's design tokens — this project has its own Mærsk palette
- Don't make it feel like a marketing site — it's a private working environment
- Don't add a login gate (not needed for this project right now)