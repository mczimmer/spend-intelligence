import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";

const problems = [
  { num: "01", title: "Category Fragmentation", desc: "The same marine fuel — HFO 380cst — appears under different descriptions, category codes, and naming conventions across entities that were Hamburg Sud, Svitzer, APM Terminals, and Maersk Line. Each entity built its taxonomy independently over years or decades. Category managers cannot see consolidated spend without weeks of manual cross-referencing. Multiply this across every procurement category — from reefer maintenance to port handling to hull coatings — and the fragmentation is structural, not incidental." },
  { num: "02", title: "Code Reconciliation Gap", desc: "Finance teams reconciling across former Hamburg Sud, Sealand, and Maersk Line entities encounter payment codes and material codes that don't align — the same fuel purchase coded as PAY-4401 in one entity and PAY-4460 in another. With $48.5 billion in cost of revenue (2024), even small misalignment percentages represent material reconciliation overhead. The GL reconciliation burden scales with every integration and every acquisition." },
  { num: "03", title: "Hidden Consolidation Value", desc: "With $54 billion in annual revenue and operations across 130 countries, the volume leverage available through consolidated category management is significant. But without a unified taxonomy, that leverage is invisible. Duplicate suppliers across former Hamburg Sud routes and Maersk Line routes, fragmented contracts inherited from Safmarine's African operations, volume that could be consolidated across APM Terminals port services — none of this is actionable without standardised categories." },
];

export default function ProblemSpace() {
  return (
    <div>
      <PageHeader
        label="Analysis"
        title="The Taxonomy Fragmentation Challenge"
        subtitle="Maersk's transformation from a shipping line into an integrated logistics company has been built through acquisition — Hamburg Sud (2017), the integration of Safmarine and Sealand, LF Logistics and Senator International (2022), and most recently the Panama Canal Railway Company (2025). Each acquisition brought its own procurement systems, category taxonomies, payment codes, and material code structures. The brand unification programme that retired Hamburg Sud and Sealand as customer-facing names did not unify the procurement data behind them. The 2024 Svitzer demerger added another layer — systems that were partially integrated now need to be cleanly separated. This is not a data quality problem. It is a structural consequence of how the company was built."
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
            <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Traditional approaches — consultant-led spend classification exercises, ERP harmonisation programmes, manual taxonomy mapping — produce a point-in-time snapshot that degrades as new data enters the system. Maersk acquires roughly 1-2 businesses per year. Each acquisition resets the clock. The 2023 brand unification programme addressed the customer-facing identity but not the underlying procurement data structures. And the current $180 million corporate overhead reduction programme creates pressure to automate reconciliation, not add headcount to it. The problem demands a continuously learning, AI-native approach — not another manual mapping exercise.</p>
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
