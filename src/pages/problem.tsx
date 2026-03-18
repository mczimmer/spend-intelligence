import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";

const problems = [
  { num: "01", title: "Category Fragmentation", desc: "The same material — vessel hull antifouling paint — appears as 6+ different descriptions across entities. Category managers cannot build a unified view of spend without weeks of manual mapping." },
  { num: "02", title: "Code Reconciliation Gap", desc: "Finance teams see payment codes that don't align with material codes. The same fuel purchase might be PAY-4401 in one entity and PAY-4460 in another, making GL reconciliation manual and error-prone." },
  { num: "03", title: "Hidden Consolidation Value", desc: "Without standardised categories, spend that could be consolidated across entities remains invisible. Duplicate suppliers, fragmented contracts, and missed volume leverage go undetected." },
];

export default function ProblemSpace() {
  return (
    <div>
      <PageHeader
        label="Analysis"
        title="The Taxonomy Fragmentation Challenge"
        subtitle="Maersk's growth through acquisition — Svitzer, Hamburg Sud, APM Terminals, Sealand, Star Cool, and others — has created a procurement landscape where the same goods and services are described, coded, and categorised differently across every entity. This isn't a data quality problem. It's a structural one."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {problems.map(c => (
          <Card key={c.num}>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.maerskStar, fontFamily: font.sans, marginBottom: 10 }}>{c.num}</div>
            <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 6px" }}>{c.title}</h3>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
          </Card>
        ))}
      </div>

      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 4, minHeight: 40, background: C.maerskStar, borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskBlue, margin: "0 0 6px" }}>Why This Problem Persists</h3>
            <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Traditional approaches — manual taxonomy mapping, consultant-led spend classification exercises, ERP harmonisation programs — are slow, expensive, and brittle. They produce a point-in-time snapshot that degrades as new data enters the system. Every acquisition resets the clock. The problem demands a continuously learning, AI-native approach.</p>
          </div>
        </div>
      </Card>

      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginTop: 24 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>What This Informs</h3>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>
          Understanding the structural nature of this problem is essential context for the{" "}
          <Link href="/solution" style={{ color: C.maerskStar, textDecoration: "none" }}>AI hypothesis</Link> and{" "}
          <Link href="/value-case" style={{ color: C.maerskStar, textDecoration: "none" }}>value case</Link> that follow.
        </p>
      </Card>
    </div>
  );
}
