import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import SectionLabel from "@/components/SectionLabel";
import PageHeader from "@/components/PageHeader";

const thStyle: React.CSSProperties = { textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "10px 12px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 };
const tdStyle: React.CSSProperties = { padding: "10px 12px", fontSize: 13, fontFamily: font.sans, color: C.valtechGray, lineHeight: 1.6 };

const lifecycle = [
  { phase: "Phase 1", label: "Validate", data: "Synthetic data only", env: "Valtech cloud (isolated)", retention: "Deleted after benchmark" },
  { phase: "Phase 2", label: "Pilot", data: "Real sample from 2 categories", env: "Maersk-approved cloud, encrypted", retention: "Retained for pilot duration" },
  { phase: "Phase 3", label: "Scale", data: "Full production data", env: "Maersk's environment", retention: "Maersk-managed" },
  { phase: "Phase 4", label: "Embed", data: "Maersk-owned and operated", env: "Maersk's environment", retention: "Maersk's retention policies" },
];

const dataCards = [
  {
    title: "Data Residency",
    tagline: "Your data stays in your environment",
    desc: "Production deployment runs within Maersk's approved cloud environment. During the POC phase, only synthetic data is used. Any real data samples provided for benchmarking are processed in an isolated, encrypted environment and deleted after validation.",
    verify: "Verification: Maersk's infosec team can audit the deployment environment at any point. Infrastructure configuration is documented and shared.",
  },
  {
    title: "Access Control",
    tagline: "Least privilege, full audit trail",
    desc: "All access to procurement data is role-based and logged. The AI engine operates on structured data extracts, not direct database connections. No standing access to source systems. Access is revoked at the end of each phase unless explicitly renewed.",
    verify: "Verification: Access logs are available to Maersk's security team via shared monitoring. Access reviews are conducted jointly at the start of each phase.",
  },
  {
    title: "Retention & Deletion",
    tagline: "Clear lifecycle, no ambiguity",
    desc: "Data retention windows are defined per phase and documented in the engagement agreement. At engagement end or on request, all Maersk data and derived outputs are deleted from Valtech-managed environments. Deletion is confirmed in writing.",
    verify: "Verification: Deletion is confirmed with a certificate of destruction. Maersk can request independent verification from the cloud provider.",
  },
  {
    title: "Incident Response",
    tagline: "Defined protocol, defined timeline",
    desc: "If a data incident occurs in a Valtech-managed environment during Phase 1 or Phase 2: Valtech notifies Maersk's designated security contact within 24 hours. Affected data is isolated immediately. A root cause analysis is delivered within 5 business days. All Maersk data in the affected environment is deleted on request. These terms are documented in the engagement agreement before any real data is shared.",
    verify: "",
  },
];

const aiCards = [
  {
    title: "Explainability",
    tagline: "Every classification has a reason",
    desc: "Each category assignment includes the reasoning chain: which features of the spend description drove the match, which taxonomy nodes were considered, and why the selected category scored highest. No black-box decisions.",
    addendum: "",
  },
  {
    title: "Confidence Calibration",
    tagline: "The AI knows what it doesn't know",
    desc: "Confidence scores are calibrated against human-validated baselines. A 92% confidence score means the model is correct 92% of the time at that threshold, not an arbitrary number. Calibration is re-validated as data volume increases.",
    addendum: "Maersk's team reviews calibration reports at each phase gate. Threshold adjustments require joint approval.",
  },
  {
    title: "Human-in-the-Loop",
    tagline: "Low confidence routes to people, not to production",
    desc: "Items below the confidence threshold are routed to a human review queue, never auto-committed to the taxonomy. Reviewers validate, correct, or escalate. Their decisions feed back into model calibration.",
    addendum: "The confidence threshold is configurable by Maersk. Lowering it routes more items to human review. Raising it increases automation. Maersk controls the dial.",
  },
  {
    title: "Auditability",
    tagline: "Full decision trail, always",
    desc: "Every classification decision, whether AI-resolved or human-reviewed, is logged with timestamp, model version, confidence score, and outcome. The audit trail supports both internal governance review and external compliance requirements.",
    addendum: "Audit data is stored in Maersk's environment from Phase 3 onward. During Phases 1-2, audit exports are provided on request in standard format (CSV/JSON).",
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
  {
    title: "Pricing Predictability",
    tagline: "No volume penalties, no hidden scaling costs",
    desc: "The engagement is priced by phase with fixed scope, not by data volume, API calls, or classification count. Processing more data does not increase cost. Adding entities does not trigger incremental licensing. The commercial model is designed so that the system becomes more valuable as it processes more data, not more expensive.",
  },
];

const govPhases = [
  { phase: "Phase 1", title: "Lightweight", data: "Synthetic only. No Maersk data.", approvals: "NDA + engagement agreement", scope: "Data handling terms for synthetic environment", timeline: "Days, not months" },
  { phase: "Phase 2", title: "Controlled", data: "Real sample from 2-3 categories", approvals: "Infosec review of Valtech environment + data handling addendum", scope: "Full Layer 1 (Data Governance) active", timeline: "1-2 weeks for security review" },
  { phase: "Phase 3", title: "Full", data: "Production data in Maersk's environment", approvals: "Full governance framework review (all three layers)", scope: "All layers active. Audit trail in Maersk's environment.", timeline: "Standard enterprise onboarding" },
  { phase: "Phase 4", title: "Transferred", data: "Maersk-owned", approvals: "Handover acceptance", scope: "Maersk's own governance policies apply. Valtech access revoked.", timeline: "Operational handover" },
];

export default function Governance() {
  return (
    <div>
      <PageHeader
        label="Engagement"
        title="Governance & Trust Framework"
        subtitle="How we handle Maersk's data, how the AI makes decisions, and how commercial interests are protected throughout the engagement."
      />

      {/* Data lifecycle table (promoted to top) */}
      <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 16px", maxWidth: 700 }}>Trust is built incrementally. The data model progresses from zero Maersk data in Phase 1 to full Maersk ownership in Phase 4. Each phase adds controls. No phase requires more access than is needed to validate the next.</p>
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
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans, marginLeft: 8 }}>{l.label}</span>
                </td>
                <td style={tdStyle}>{l.data}</td>
                <td style={tdStyle}>{l.env}</td>
                <td style={tdStyle}>{l.retention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 48px" }}>The progression is deliberate. Synthetic first, controlled sample second, production only after validation.</p>

      {/* Layer 1: Data Governance */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <SectionLabel text="Layer 1: Data Governance" />
          <Badge color="navy">CISO / Information Security</Badge>
        </div>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>Procurement data is commercially sensitive. These commitments govern where it lives, who touches it, and when it is deleted. Each commitment includes a verification mechanism.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {dataCards.map(c => (
            <Card key={c.title}>
              <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 2px" }}>{c.title}</h3>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.maerskStar, fontFamily: font.sans, marginBottom: 8 }}>{c.tagline}</div>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
              {c.verify && <p style={{ fontFamily: font.sans, fontSize: 12, lineHeight: 1.6, color: C.valtechGray, fontStyle: "italic", margin: "8px 0 0", opacity: 0.8 }}>{c.verify}</p>}
            </Card>
          ))}
        </div>
      </div>

      {/* Layer 2: AI Governance */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <SectionLabel text="Layer 2: AI Governance" />
          <Badge color="navy">Enterprise Architecture / Risk</Badge>
        </div>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>The mechanisms below are implemented as software components in the architecture (see <Link href="/architecture" style={{ color: C.maerskStar, textDecoration: "none" }}>Governance Layer</Link>). This section describes the operational commitments and controls around those mechanisms.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {aiCards.map(c => (
            <Card key={c.title}>
              <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 2px" }}>{c.title}</h3>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.maerskStar, fontFamily: font.sans, marginBottom: 8 }}>{c.tagline}</div>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
              {c.addendum && <p style={{ fontFamily: font.sans, fontSize: 12, lineHeight: 1.6, color: C.maerskBlue, margin: "8px 0 0", fontWeight: 700 }}>{c.addendum}</p>}
            </Card>
          ))}
        </div>

        <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
          <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>Model updates follow a defined approval process: Valtech proposes a retraining scope, Maersk reviews the training data and methodology, both parties approve before any model change is deployed. No silent updates. No automated retraining. No model changes outside this process.</p>
        </Card>
      </div>

      {/* Layer 3: Commercial Governance */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <SectionLabel text="Layer 3: Commercial Governance" />
          <Badge color="navy">Legal / Procurement Leadership</Badge>
        </div>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>AI engagements create IP questions that traditional services do not. These commitments are explicit from day one.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {commercialCards.map(c => (
            <Card key={c.title}>
              <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 2px" }}>{c.title}</h3>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.maerskStar, fontFamily: font.sans, marginBottom: 8 }}>{c.tagline}</div>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Governance Activation */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Governance Activation" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>Governance activates incrementally. Phase 1 is lightweight by design.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {govPhases.map(p => (
            <Card key={p.phase}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h3 style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{p.phase}: {p.title}</h3>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                {[
                  { label: "Data", value: p.data },
                  { label: "Approvals", value: p.approvals },
                  { label: "Scope", value: p.scope },
                  { label: "Timeline", value: p.timeline },
                ].map(row => (
                  <tr key={row.label}>
                    <td style={{ fontSize: 10, fontWeight: 700, color: C.valtechGray, letterSpacing: "0.05em", fontFamily: font.sans, padding: "3px 12px 3px 0", verticalAlign: "top", whiteSpace: "nowrap", width: 80 }}>{row.label.toUpperCase()}</td>
                    <td style={{ fontSize: 12, color: C.maerskNavy, fontFamily: font.sans, padding: "3px 0", verticalAlign: "top" }}>{row.value}</td>
                  </tr>
                ))}</tbody>
              </table>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 16 }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>Phase 1 requires an NDA and an engagement agreement. No Maersk data. No security review beyond standard vendor due diligence. The governance framework scales with the engagement: lightweight to start, fully governed by Phase 3, Maersk-owned by Phase 4. Every commitment on this page can be written into the engagement agreement as a contractual term.</p>
      </Card>

      <p style={{ fontFamily: font.sans, fontSize: 12, lineHeight: 1.7, color: C.valtechGray, textAlign: "center", margin: 0 }}>The fastest path to Phase 1 is an NDA, a scope agreement, and three weeks.</p>
    </div>
  );
}
