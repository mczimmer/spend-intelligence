import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import SectionLabel from "@/components/SectionLabel";
import PageHeader from "@/components/PageHeader";

const thStyle: React.CSSProperties = { textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "10px 12px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 };
const tdStyle: React.CSSProperties = { padding: "10px 12px", fontSize: 13, fontFamily: font.sans, color: C.valtechGray, lineHeight: 1.6 };

const dataCards = [
  {
    title: "Data Residency",
    tagline: "Your data stays in your environment",
    desc: "Production deployment runs within Maersk's approved cloud environment. During the POC phase, only synthetic data is used. Any real data samples provided for benchmarking are processed in an isolated, encrypted environment and deleted after validation.",
  },
  {
    title: "Access Control",
    tagline: "Least privilege, full audit trail",
    desc: "All access to procurement data is role-based and logged. The AI engine operates on structured data extracts, not direct database connections. No standing access to source systems. Access is revoked at the end of each phase unless explicitly renewed.",
  },
  {
    title: "Retention & Deletion",
    tagline: "Clear lifecycle, no ambiguity",
    desc: "Data retention windows are defined per phase and documented in the engagement agreement. At engagement end or on request, all Maersk data and derived outputs are deleted from Valtech-managed environments. Deletion is confirmed in writing.",
  },
];

const lifecycle = [
  { phase: "Phase 1", label: "Validate", data: "Synthetic data only", env: "Valtech cloud (isolated)", retention: "Deleted after benchmark" },
  { phase: "Phase 2", label: "Pilot", data: "Real sample from 2 categories", env: "Maersk-approved cloud, encrypted", retention: "Retained for pilot duration" },
  { phase: "Phase 3", label: "Scale", data: "Full production data", env: "Maersk's environment", retention: "Maersk-managed" },
  { phase: "Phase 4", label: "Embed", data: "Maersk-owned and operated", env: "Maersk's environment", retention: "Maersk's retention policies" },
];

const aiCards = [
  {
    title: "Explainability",
    tagline: "Every classification has a reason",
    desc: "Each category assignment includes the reasoning chain: which features of the spend description drove the match, which taxonomy nodes were considered, and why the selected category scored highest. No black-box decisions.",
  },
  {
    title: "Confidence Calibration",
    tagline: "The AI knows what it doesn't know",
    desc: "Confidence scores are calibrated against human-validated baselines. A 92% confidence score means the AI is correct 92% of the time at that threshold, not an arbitrary number. Calibration is re-validated as data volume increases.",
  },
  {
    title: "Human-in-the-Loop",
    tagline: "Low confidence routes to people, not to production",
    desc: "Items below the confidence threshold are routed to a human review queue, never auto-committed to the taxonomy. Reviewers validate, correct, or escalate. Their decisions feed back into model calibration.",
  },
  {
    title: "Auditability",
    tagline: "Full decision trail, always",
    desc: "Every classification decision, whether AI-resolved or human-reviewed, is logged with timestamp, model version, confidence score, and outcome. The audit trail supports both internal governance review and external compliance requirements.",
  },
];

const commercialCards = [
  {
    title: "Model Ownership",
    tagline: "The trained model is yours",
    desc: "Any model fine-tuned on Maersk data, and any Maersk-specific taxonomy mappings, category hierarchies, or classification rules produced during the engagement are Maersk's intellectual property. Valtech delivers the capability; Maersk owns the output.",
  },
  {
    title: "Data Isolation",
    tagline: "No cross-client learning",
    desc: "Maersk's procurement data, classification patterns, and spend insights are never used to train models for other clients. Complete data isolation between engagements. No pooled learning, no shared embeddings, no anonymised cross-client benchmarks, unless Maersk explicitly opts in.",
  },
  {
    title: "Exit & Portability",
    tagline: "You can walk away with everything",
    desc: "Phase 4 is designed for full ownership transfer. The classification engine, taxonomy, trained models, and all operational tooling are handed over to Maersk's teams. If Maersk chooses to bring the capability in-house or switch providers at any point, all IP and data are portable. No lock-in by design.",
  },
];

function GovernanceCard({ title, tagline, desc }: { title: string; tagline: string; desc: string }) {
  return (
    <Card>
      <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 2px" }}>{title}</h3>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.maerskStar, fontFamily: font.sans, marginBottom: 8 }}>{tagline}</div>
      <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{desc}</p>
    </Card>
  );
}

export default function Governance() {
  return (
    <div>
      <PageHeader
        label="Engagement"
        title="Governance & Trust Framework"
        subtitle="How we handle Maersk's data, how the AI makes decisions, and how commercial interests are protected throughout the engagement."
      />

      {/* ── Section 1: Data Governance ── */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Layer 1: Data Governance" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>Procurement data is commercially sensitive. These commitments govern where it lives, who touches it, and when it's deleted.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
          {dataCards.map(c => <GovernanceCard key={c.title} {...c} />)}
        </div>

        <Card style={{ marginBottom: 12 }}>
          <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 16px" }}>Data Lifecycle by Phase</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 140 }}>Phase</th>
                <th style={thStyle}>Data Used</th>
                <th style={thStyle}>Environment</th>
                <th style={thStyle}>Retention</th>
              </tr>
            </thead>
            <tbody>
              {lifecycle.map(l => (
                <tr key={l.phase} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ ...tdStyle, padding: "10px 12px" }}>
                    <Badge color="navy">{l.phase}</Badge>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.maerskNavy, fontFamily: font.sans, marginLeft: 8 }}>{l.label}</span>
                  </td>
                  <td style={tdStyle}>{l.data}</td>
                  <td style={tdStyle}>{l.env}</td>
                  <td style={tdStyle}>{l.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>The progression is deliberate. Trust is built incrementally: synthetic first, controlled sample second, production only after validation.</p>
      </div>

      {/* ── Section 2: AI Governance ── */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Layer 2: AI Governance" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>AI-powered classification requires a different kind of transparency. Every decision the engine makes must be explainable, auditable, and reversible.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {aiCards.map(c => <GovernanceCard key={c.title} {...c} />)}
        </div>

        <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
          <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>The AI engine does not learn from Maersk data without explicit approval. Model updates require sign-off. No automated retraining. No silent model changes. Maersk retains control over when and how the classification model evolves.</p>
        </Card>
      </div>

      {/* ── Section 3: Commercial Governance ── */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel text="Layer 3: Commercial Governance" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>AI engagements create IP questions that traditional services don't. These commitments are explicit from day one.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {commercialCards.map(c => <GovernanceCard key={c.title} {...c} />)}
        </div>
      </div>

      {/* Footer */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>These three governance layers, data, AI, and commercial, are not negotiation positions. They are how we operate. We are happy to review each layer in detail with Maersk's information security, legal, and procurement governance teams before any data is shared.</p>
      </Card>
    </div>
  );
}
