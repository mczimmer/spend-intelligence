import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import SectionLabel from "@/components/SectionLabel";
import PageHeader from "@/components/PageHeader";
import DiagramPaceLayered from "@/components/diagrams/DiagramPaceLayered";
import DiagramC4Context from "@/components/diagrams/DiagramC4Context";
import DiagramC4Container from "@/components/diagrams/DiagramC4Container";
import DiagramAIPipeline from "@/components/diagrams/DiagramAIPipeline";

const paceExplanations = [
  { title: "Differentiation", desc: "What you're getting. AI-powered classification, reconciliation, and consolidation — delivered as an API-first service." },
  { title: "Record", desc: "What it sits on. Your existing SAP, Oracle, and procurement systems remain the source of truth. No migration required." },
  { title: "Innovation", desc: "Where it goes next. Once the classification engine is trained, continuous learning and predictive capabilities become possible." },
];

export default function Architecture() {
  return (
    <div>
      <PageHeader
        label="Proof of Concept"
        title="Architecture"
        subtitle="How the Spend Intelligence engine fits into Maersk's existing systems landscape — what it delivers, what it builds on, and how it's constructed."
      />

      {/* Section 1: Pace-Layered Architecture */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Strategic Architecture View" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>The architecture is organised by rate of change. Differentiation — the new capabilities — sits on top of stable systems of record that Maersk already operates. Innovation extends the platform over time.</p>
        <Card style={{ marginBottom: 20 }}>
          <DiagramPaceLayered />
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {paceExplanations.map(p => (
            <Card key={p.title} style={{ padding: "16px 20px" }}>
              <h4 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.maerskNavy, margin: "0 0 4px" }}>{p.title}</h4>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: C.valtechGray, margin: 0 }}>{p.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 2: C4 Context Diagram */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="System Context" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>The Spend Intelligence engine as a bounded system — who uses it, what feeds it, and what consumes its outputs.</p>
        <Card style={{ marginBottom: 12 }}>
          <DiagramC4Context />
        </Card>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, fontStyle: "italic", margin: 0 }}>Users interact with the engine through a web interface and API. Source systems push data via scheduled extracts. Consumers pull from the unified taxonomy and reconciled code outputs.</p>
      </div>

      {/* Section 3: C4 Container Diagram */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Inside the Engine" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>Zooming in — the internal containers that make up the Spend Intelligence engine and how they communicate.</p>
        <Card style={{ marginBottom: 12 }}>
          <DiagramC4Container />
        </Card>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 8px" }}>All containers run as cloud-native services. No on-premise infrastructure required for Phase 1. The API Gateway provides the integration surface for SAP and other source systems.</p>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>The Model Router abstracts the inference layer from the classification logic. Today it routes to cloud LLM APIs. As open-source models mature or Maersk's infrastructure preferences evolve, the model layer can be swapped without re-engineering the pipeline.</p>
      </div>

      {/* Section 4: AI Classification Pipeline */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel text="Classification Detail" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>The six-stage pipeline that transforms raw, multi-format spend descriptions into standardised, confidence-scored category assignments.</p>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>AI Classification Pipeline</h3>
            <Badge color="blue">AI / ML</Badge>
          </div>
          <DiagramAIPipeline />
        </Card>
      </div>

      {/* Footer callout */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>This architecture is designed to prove the hypothesis in Phase 1 with zero infrastructure commitment from Maersk. The API-first design means that if the accuracy benchmark is met, integration with production SAP environments in Phase 2 connects through standard interfaces.</p>
      </Card>
    </div>
  );
}
