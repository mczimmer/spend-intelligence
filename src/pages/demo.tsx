import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import Demo from "@/components/Demo";

const demonstrates = [
  { title: "Decision intelligence", desc: "AI identifies anomalies, opportunities, and patterns across 21 items from 11 entities, surfacing the insights that matter, not just the data." },
  { title: "Explainable classification", desc: "Every category assignment includes a reasoning trace. The AI shows its work, with confidence scoring calibrated against human baselines." },
  { title: "Actionable simulation", desc: "Vendor consolidation modelling lets you toggle scenarios and see the financial impact in real time. From insight to action in one view." },
];

export default function DemoPage() {
  return (
    <div>
      <PageHeader
        label="Proof of Concept"
        title="See It Working"
        subtitle="This interactive demo uses synthetic data modelled on Maersk's maritime logistics procurement landscape: 21 spend items across 11 acquired entities. Start with the Overview for key insights, then explore classification, reconciliation, and consolidation detail."
      />

      <Demo />

      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginTop: 32 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, marginBottom: 16, fontFamily: font.sans }}>WHAT THIS DEMONSTRATES</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {demonstrates.map(d => (
            <div key={d.title}>
              <h4 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 6px" }}>{d.title}</h4>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
