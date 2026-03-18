import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";

const principles = [
  {
    title: "Data Residency",
    tagline: "Your data stays in your environment",
    desc: "Production deployment runs within Maersk's approved cloud environment. During POC, synthetic data is used. Any real data samples are processed in an isolated, encrypted environment and deleted after benchmarking.",
  },
  {
    title: "Access Control",
    tagline: "Least privilege, full audit trail",
    desc: "All access to procurement data is role-based and logged. The AI engine operates on structured data extracts, not direct database connections. No standing access to source systems.",
  },
  {
    title: "Compliance Alignment",
    tagline: "Built for enterprise procurement",
    desc: "The solution aligns with SOC 2 Type II, GDPR data processing requirements, and Maersk's internal information security policies. Compliance documentation is provided as part of Phase 2 delivery.",
  },
];

const lifecycle = [
  { phase: "Phase 1 (Validate)", data: "Synthetic data only. No real Maersk data required." },
  { phase: "Phase 2 (Pilot)", data: "Real data sample from 2 category groups. Encrypted, access-controlled, deleted on request." },
  { phase: "Phase 3 (Scale)", data: "Production data within Maersk's environment. Full data governance controls active." },
  { phase: "Phase 4 (Embed)", data: "Maersk-owned and operated. Valtech access revoked." },
];

export default function Governance() {
  return (
    <div>
      <PageHeader
        label="Engagement"
        title="Data Governance & Security"
        subtitle="How we handle Maersk's procurement data throughout the engagement — from initial sample ingestion through to production deployment."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {principles.map(p => (
          <Card key={p.title}>
            <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 2px" }}>{p.title}</h3>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.maerskStar, fontFamily: font.sans, marginBottom: 8 }}>{p.tagline}</div>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{p.desc}</p>
          </Card>
        ))}
      </div>

      {/* AI governance */}
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8", marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 4, minHeight: 40, background: C.maerskStar, borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskBlue, margin: "0 0 8px" }}>AI Transparency & Control</h3>
            <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Every AI classification includes a confidence score. Items below the threshold are routed to human review — never auto-committed. The model does not learn from Maersk data without explicit approval. All training data, model versions, and classification decisions are fully auditable.</p>
          </div>
        </div>
      </Card>

      {/* Data lifecycle */}
      <Card style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 16px" }}>Data Lifecycle by Phase</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "8px 12px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700, width: 180 }}>Phase</th>
              <th style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "8px 12px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 }}>Data Handling</th>
            </tr>
          </thead>
          <tbody>
            {lifecycle.map(l => (
              <tr key={l.phase} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, fontFamily: font.sans, color: C.maerskNavy }}>{l.phase}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, fontFamily: font.sans, color: C.valtechGray, lineHeight: 1.6 }}>{l.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Footer */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>Data governance is not an afterthought — it's built into the engagement model from day one. We are happy to review these commitments with Maersk's information security team before any real data is shared.</p>
      </Card>
    </div>
  );
}
