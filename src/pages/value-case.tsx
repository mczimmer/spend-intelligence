import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";

const valueCards = [
  {
    title: "Spend Visibility",
    tagline: "From fragmented to unified",
    desc: "With procurement spread across systems inherited from Hamburg Sud, Sealand, Safmarine, APM Terminals, and recent acquisitions like LF Logistics and Senator, category managers have no unified view of demand. Cross-entity spend visibility turns fragmented data into consolidated, actionable intelligence, for the first time across the full portfolio.",
    metric: "Unified view across 10+ entity procurement systems within weeks, not years",
  },
  {
    title: "Consolidation Savings",
    tagline: "Supplier rationalisation at scale",
    desc: "Duplicate suppliers exist across every major acquisition boundary. A hull coating supplier serving former Hamburg Sud routes and a different supplier serving Maersk Line routes, for the same service, in the same ports. AI-powered classification surfaces these overlaps automatically, quantified by category and prioritised by spend impact. At Maersk's scale, even single-digit consolidation percentages translate to hundreds of millions in addressable savings.",
    metric: "6-10% estimated savings on addressable consolidation spend",
  },
  {
    title: "Operational Efficiency",
    tagline: "From manual reconciliation to automated flow",
    desc: "The current corporate overhead reduction programme is targeting $180 million in annual savings and closing approximately 1,000 corporate positions. Automated reconciliation directly supports this initiative, replacing manual payment-code and material-code matching with programmatic alignment. Finance teams shift from reactive reconciliation to proactive exception management; AI handles the volume and humans handle the judgement.",
    metric: "Directly aligned with Maersk's 2026 corporate efficiency programme",
  },
  {
    title: "Acquisition Speed",
    tagline: "New entities onboarded in days, not months",
    desc: "The Panama Canal Railway Company was acquired in April 2025. LF Logistics and Senator International were acquired in 2022. Each integration required months of manual taxonomy mapping before spend became visible. The AI classification engine reduces entity onboarding from months to days, making post-acquisition procurement integration faster, cheaper, and repeatable.",
    metric: "5-day entity onboarding vs. 3-6 months today",
  },
];

const impactStats = [
  { label: "Cost of Revenue (2024)", value: "$48.5B" },
  { label: "Addressable Procurement (est.)", value: "$15-25B" },
  { label: "Consolidation Savings Potential", value: "4-10%" },
  { label: "Corporate Efficiency Target", value: "$180M/yr" },
];

export default function ValueCase() {
  return (
    <div>
      <PageHeader
        label="Analysis"
        title="The Business Impact of Unified Spend Intelligence"
        subtitle="At $48.5 billion in cost of revenue, Maersk's procurement landscape is one of the largest in the logistics industry. Every misaligned category code, every invisible consolidation opportunity, every manual reconciliation hour has a measurable financial impact, compounded across 10+ acquired entity systems and 130 countries of operation."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {valueCards.map(c => (
          <Card key={c.title}>
            <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 2px" }}>{c.title}</h3>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.maerskStar, fontFamily: font.sans, marginBottom: 8 }}>{c.tagline}</div>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 12px" }}>{c.desc}</p>
            <div style={{ background: C.maerskLight, borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 700, color: C.maerskBlue, fontFamily: font.sans }}>{c.metric}</div>
          </Card>
        ))}
      </div>

      {/* Cumulative impact */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, marginBottom: 16, fontFamily: font.sans }}>CUMULATIVE IMPACT</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
          {impactStats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4, fontFamily: font.sans }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.white, fontFamily: font.sans }}>{s.value}</div>
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
            <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Every quarter without unified spend visibility is a quarter of missed consolidation across the Hamburg Sud, Sealand, and APM Terminals procurement boundaries that have existed since those acquisitions closed. The corporate efficiency programme creates urgency: the $180 million target requires automation, not additional manual processes. Meanwhile, the next acquisition is already adding another taxonomy to reconcile. The compounding cost is not the AI investment; it's the procurement value left on the table while the fragmentation persists.</p>
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
