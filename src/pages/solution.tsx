import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import PageHeader from "@/components/PageHeader";

const capabilities = [
  { title: "Semantic Understanding", desc: "AI reads natural-language spend descriptions and understands that 'HFO 380cst bunkering' and 'heavy fuel oil vessel supply' are the same thing — across languages, abbreviations, and entity conventions.", badge: "NLP" },
  { title: "Taxonomy Alignment", desc: "Every item is mapped to a unified, UNSPSC-aligned category hierarchy. This becomes the single source of truth for both category management and finance.", badge: "Mapping" },
  { title: "Code Reconciliation", desc: "Payment codes and material codes are cross-referenced within each category. Mismatches are flagged with AI-suggested corrections, prioritised by spend impact.", badge: "Finance" },
  { title: "Continuous Learning", desc: "Human reviewers validate edge cases, and their decisions train the model. Accuracy improves over time, and new acquisitions can be onboarded in days rather than months.", badge: "AI/ML" },
];

const metrics = [
  { label: "Categorisation Accuracy", value: "92%+", sub: "Target after Phase 1" },
  { label: "Manual Effort Reduction", value: "80%", sub: "Reconciliation FTE" },
  { label: "Time to Onboard Entity", value: "5 days", sub: "vs. 3-6 months today" },
  { label: "Spend Visibility", value: "100%", sub: "Cross-entity unified view" },
];

export default function Solution() {
  return (
    <div>
      <PageHeader
        label="Analysis"
        title="Hypothesis: AI Semantic Classification"
        subtitle="We believe that a combination of large language model semantic understanding and structured taxonomy mapping can automate 80%+ of spend categorisation and payment-material code reconciliation — with human-in-the-loop review for edge cases, creating a continuously improving system."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {capabilities.map(c => (
          <Card key={c.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{c.title}</h3>
              <Badge color="blue">{c.badge}</Badge>
            </div>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
          </Card>
        ))}
      </div>

      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
          {metrics.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 10, color: C.maerskStar, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4, fontFamily: font.sans }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2, fontFamily: font.sans }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>What This Informs</h3>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>
          This hypothesis is validated through the{" "}
          <Link href="/demo" style={{ color: C.maerskStar, textDecoration: "none" }}>interactive demo</Link>{" "}
          using synthetic Maersk procurement data.
        </p>
      </Card>
    </div>
  );
}
