import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import SectionLabel from "@/components/SectionLabel";
import PageHeader from "@/components/PageHeader";
import DiagramTimeline from "@/components/diagrams/DiagramTimeline";

const teamCards = [
  {
    title: "Category complexity is our pattern",
    badge: "Cross-Industry",
    desc: "We've built classification, taxonomy harmonisation, and data standardisation solutions across healthcare, pharma, automotive, and financial services — industries where structural fragmentation runs as deep as maritime logistics. The AI approach here is informed by what works at scale across category-heavy enterprises. This isn't a first attempt at the problem.",
  },
  {
    title: "Built for the people who use it",
    badge: "Experience Design",
    desc: "Spend intelligence only delivers value if category managers, finance teams, and procurement leads actually use it. Valtech's experience design discipline ensures the solution is built around real workflows and real decision points — not just technically correct, but operationally adopted. The interactive demo in this workspace is an example of that thinking.",
  },
];

const phases = [
  { phase: "Phase 1: Validate", weeks: "Weeks 1-3", desc: "Ingest a sample of real Maersk spend data. Build and benchmark the AI classification engine against a manually-verified baseline. Deliver an accuracy report and refined taxonomy mapping.", deliverable: "Accuracy benchmark + taxonomy", gate: ">=85% accuracy on sample" },
  { phase: "Phase 2: Pilot", weeks: "Weeks 4-8", desc: "Go live with 2 category groups (e.g. Marine Fuels, Reefer Maintenance). Connect to SAP for payment/material code extraction. Run reconciliation engine with human review loop.", deliverable: "Working pilot + reconciliation report", gate: "Category manager sign-off" },
  { phase: "Phase 3: Scale", weeks: "Weeks 9-14", desc: "Extend to all spend categories. Roll out across additional acquired entities. Build executive dashboard with consolidated spend view and savings tracking.", deliverable: "Full deployment + spend dashboard", gate: "Finance team validation" },
  { phase: "Phase 4: Embed", weeks: "Weeks 15-18", desc: "Transfer ownership to internal teams. Deploy self-service tools for ongoing taxonomy management. Establish continuous learning pipeline for new data and acquisitions.", deliverable: "Handover + training complete", gate: "Self-sustaining operation" },
];

export default function Approach() {
  return (
    <div>
      <PageHeader
        label="Engagement"
        title="How We Get There"
        subtitle="A phased approach designed to demonstrate value early and scale with confidence. Each phase has a clear deliverable and go/no-go gate."
      />

      {/* Why This Team */}
      <div style={{ marginBottom: 40 }}>
        <SectionLabel text="Why This Team" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {teamCards.map(c => (
            <Card key={c.title}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{c.title}</h3>
                <Badge color="blue">{c.badge}</Badge>
              </div>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
            </Card>
          ))}
        </div>
        <Card style={{ background: C.maerskLight, borderColor: "#b3dce8", padding: "14px 20px" }}>
          <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.maerskBlue, margin: 0, fontWeight: 500 }}>We don't just build the engine — we build the product around it. From data ingestion to the dashboard a category manager opens on Monday morning, every touchpoint is designed for adoption.</p>
        </Card>
      </div>

      <Card style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>Delivery Timeline</h3>
          <Badge color="blue">Roadmap</Badge>
        </div>
        <DiagramTimeline />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {phases.map(p => (
          <Card key={p.phase}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{p.phase}</h3>
              <Badge color="navy">{p.weeks}</Badge>
            </div>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 12px" }}>{p.desc}</p>
            <div style={{ display: "flex", gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.valtechGray, letterSpacing: "0.05em", fontFamily: font.sans }}>DELIVERABLE</div>
                <div style={{ fontSize: 12, color: C.maerskNavy, fontWeight: 600, marginTop: 2, fontFamily: font.sans }}>{p.deliverable}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.valtechGray, letterSpacing: "0.05em", fontFamily: font.sans }}>GO/NO-GO</div>
                <div style={{ fontSize: 12, color: C.maerskNavy, fontWeight: 600, marginTop: 2, fontFamily: font.sans }}>{p.gate}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8", marginBottom: 24 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskBlue, margin: "0 0 8px" }}>Investment & Next Step</h3>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 12px" }}>Phase 1 (Validate) requires minimal commitment: a sample dataset from 2-3 entities and 3 weeks of elapsed time. There is no infrastructure build required — the POC runs on cloud-native AI services. If the accuracy benchmark meets the gate criteria, we proceed to Pilot. If not, we stop with full transparency on what was learned.</p>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.maerskNavy, margin: 0, fontWeight: 600 }}>We'd welcome 30 minutes to walk through this hypothesis and demo together, and to discuss what a representative data sample for Phase 1 would look like.</p>
      </Card>

      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>Phase 1 requires a sample dataset, 3 weeks, and a decision. The gate criteria are explicit: {"\u2265"}85% classification accuracy on the sample. If it doesn't meet the bar, we stop — with full transparency on what was learned and what it would take to get there.</p>
      </Card>
    </div>
  );
}
