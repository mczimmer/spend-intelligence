import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";

const valueCards = [
  {
    title: "Spend Visibility",
    tagline: "From fragmented to unified",
    desc: "Cross-entity spend visibility enables category managers to see consolidated demand for the first time. Volume leverage becomes actionable, not theoretical.",
    metric: "100% addressable spend mapped within 5 days per entity",
  },
  {
    title: "Consolidation Savings",
    tagline: "Supplier rationalisation at scale",
    desc: "Duplicate suppliers across acquired entities are surfaced automatically. Consolidation opportunities are quantified by category, enabling data-driven sourcing decisions.",
    metric: "6-10% estimated savings on addressable consolidation spend",
  },
  {
    title: "Operational Efficiency",
    tagline: "From manual reconciliation to automated flow",
    desc: "Payment-code and material-code mismatches are flagged and corrected programmatically. Finance teams shift from reactive reconciliation to proactive exception management.",
    metric: "80% reduction in manual reconciliation FTE",
  },
  {
    title: "Acquisition Speed",
    tagline: "New entities onboarded in days, not months",
    desc: "Each acquisition currently requires 3-6 months of manual taxonomy mapping before spend is visible. The AI engine reduces this to days — making post-merger integration faster and cheaper.",
    metric: "5-day entity onboarding vs. 3-6 months today",
  },
];

const impactStats = [
  { label: "Addressable Spend (POC)", value: "$3.0M" },
  { label: "Est. Savings Identified", value: "$274K" },
  { label: "Savings Rate", value: "9.2%" },
  { label: "Full Portfolio", value: "Significant" },
];

export default function ValueCase() {
  return (
    <div>
      <PageHeader
        label="Analysis"
        title="The Business Impact of Unified Spend Intelligence"
        subtitle="Taxonomy fragmentation isn't just a data problem — it's a cost problem. Every misaligned code, every invisible consolidation opportunity, every manual reconciliation hour has a measurable financial impact."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {valueCards.map(c => (
          <Card key={c.title}>
            <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 2px" }}>{c.title}</h3>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.maerskStar, fontFamily: font.sans, marginBottom: 8 }}>{c.tagline}</div>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 12px" }}>{c.desc}</p>
            <div style={{ background: C.maerskLight, borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 600, color: C.maerskBlue, fontFamily: font.sans }}>{c.metric}</div>
          </Card>
        ))}
      </div>

      {/* Cumulative impact */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, marginBottom: 16, fontFamily: font.sans }}>CUMULATIVE IMPACT</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
          {impactStats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4, fontFamily: font.sans }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{s.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Cost of inaction */}
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 4, minHeight: 40, background: C.maerskStar, borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskBlue, margin: "0 0 8px" }}>Cost of Inaction</h3>
            <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Every quarter without unified spend visibility is a quarter of missed consolidation, duplicate contracts, and manual reconciliation. The compounding cost is not the AI investment — it's the procurement value left on the table.</p>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>
          This value case is validated through the{" "}
          <Link href="/demo" style={{ color: C.maerskStar, textDecoration: "none" }}>interactive proof of concept</Link>{" "}
          using synthetic data modelled on Maersk's procurement landscape.
        </p>
      </Card>
    </div>
  );
}
