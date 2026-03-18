import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import PageHeader from "@/components/PageHeader";
import DiagramDataFlow from "@/components/diagrams/DiagramDataFlow";
import DiagramAIPipeline from "@/components/diagrams/DiagramAIPipeline";
import DiagramIntegration from "@/components/diagrams/DiagramIntegration";
import DiagramTimeline from "@/components/diagrams/DiagramTimeline";

const diagrams = [
  { title: "End-to-End Data Flow", badge: "Data Architecture", Component: DiagramDataFlow },
  { title: "AI Classification Pipeline", badge: "AI / ML", Component: DiagramAIPipeline },
  { title: "Integration Architecture", badge: "Systems", Component: DiagramIntegration },
  { title: "Delivery Timeline", badge: "Roadmap", Component: DiagramTimeline },
];

export default function Architecture() {
  return (
    <div>
      <PageHeader
        label="Proof of Concept"
        title="How It Works"
        subtitle="Four architectural views showing how the Spend Intelligence engine connects to Maersk's existing systems and processes."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 32 }}>
        {diagrams.map(d => (
          <Card key={d.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{d.title}</h3>
              <Badge color="blue">{d.badge}</Badge>
            </div>
            <d.Component />
          </Card>
        ))}
      </div>

      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 4, minHeight: 40, background: C.maerskStar, borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskBlue, margin: "0 0 6px" }}>Technology Note</h3>
            <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>The architecture is API-first and cloud-native by design. No on-premise infrastructure is required for Phase 1. Integration with SAP S/4HANA and existing BI tools connects through standard APIs and can be validated during the Pilot phase.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
