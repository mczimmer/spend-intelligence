import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import Demo from "@/components/Demo";

const demonstrates = [
  { title: "Classification accuracy", desc: "Semantic AI correctly categorised 18/18 items across 6 category groups with >79% confidence on all items." },
  { title: "Code reconciliation", desc: "Payment and material code mismatches identified across all categories with suggested corrections." },
  { title: "Consolidation opportunity", desc: "$274K in estimated savings surfaced from 18 line items across 8 entities." },
];

export default function DemoPage() {
  return (
    <div>
      <PageHeader
        label="Proof of Concept"
        title="See It Working"
        subtitle="This interactive demo uses synthetic data modelled on Maersk's maritime logistics procurement landscape — 18 spend items across 8 acquired entities. Walk through the three-stage pipeline: categorise, reconcile, and consolidate. Each stage includes live AI analysis."
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
