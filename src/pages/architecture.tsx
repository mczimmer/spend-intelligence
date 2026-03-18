import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import SectionLabel from "@/components/SectionLabel";
import PageHeader from "@/components/PageHeader";
import DiagramPhase1Flow from "@/components/diagrams/DiagramPhase1Flow";
import DiagramTargetState from "@/components/diagrams/DiagramTargetState";
import DiagramAIPipeline from "@/components/diagrams/DiagramAIPipeline";

const govCards = [
  { title: "Taxonomy Version Control", desc: "Every change to the category hierarchy is versioned. Rollback is possible. No silent taxonomy drift. Category managers approve structural changes. Finance validates code mapping updates." },
  { title: "Classification Audit Trail", desc: "Every AI decision is logged: input description, source entity, model version, taxonomy version, confidence score, output category, timestamp. Human overrides include reviewer ID and override reason." },
  { title: "Confidence Calibration", desc: "Confidence scores are calibrated against human-validated baselines: a 92% score means the model is correct 92% of the time at that threshold. Calibration is re-validated as data volume increases. Drift is detected automatically." },
  { title: "Systemic Error Handling", desc: "If the model shows consistent errors in a category (a pattern, not individual uncertainty), the category is flagged for retraining review. Retraining requires explicit approval. No automated model updates. No silent corrections at scale." },
];

const phases = [
  { phase: "Phase 1", title: "File Extracts", weeks: "Weeks 1-3", input: "CSV/Excel exports from 2-3 entity procurement systems", effort: "None", env: "Valtech-hosted isolated cloud", time: "3 weeks" },
  { phase: "Phase 2", title: "Scheduled API Extracts", weeks: "Weeks 4-8", input: "Scheduled pulls from SAP (pilot categories) via standard APIs", effort: "Lightweight (API configuration, not custom development)", env: "Shared operating model, Maersk infosec oversight", time: "Weeks 4-8" },
  { phase: "Phase 3", title: "Embedded Service", weeks: "Weeks 9-14", input: "Full API integration with SAP, Oracle, entity systems", effort: "Standard enterprise integration patterns", env: "Deployed into Maersk's Azure/data platform", time: "Weeks 9-14" },
  { phase: "Phase 4", title: "Maersk-Owned", weeks: "Weeks 15-18", input: "All source systems connected", effort: "Operational handover only", env: "Maersk-owned and operated. Valtech access revoked.", time: "Steady state" },
];

export default function Architecture() {
  return (
    <div>
      <PageHeader
        label="Proof of Concept"
        title="Architecture"
        subtitle="This architecture removes the manual taxonomy mapping burden. It does not replace Maersk's ERP, BI, or data platform landscape. The pilot starts with file-based extracts and a minimal classification flow. As confidence grows, the capability embeds into Maersk's existing infrastructure as a governed service with taxonomy versioning, auditability, and human override controls."
      />

      {/* Section 1: What this is / What this is not */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Positioning" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card style={{ borderLeft: `3px solid ${C.success}` }}>
            <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 10px" }}>What this is</h3>
            {[
              "A governed classification and reconciliation service",
              "Sits between source procurement data and existing reporting tools",
              "Consumes data extracts, produces unified coded outputs",
              "Replaces manual taxonomy mapping, not infrastructure",
              "Designed to be embedded into Maersk's operating estate",
            ].map(line => (
              <p key={line} style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.5, color: C.valtechGray, margin: "0 0 4px" }}>{line}</p>
            ))}
          </Card>
          <Card style={{ borderLeft: `3px solid ${C.valtechBorder}` }}>
            <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 10px" }}>What this is not</h3>
            {[
              "Not a replacement for SAP, Oracle, or existing ERP systems",
              "Not a new data lake or analytics platform",
              "Not a big-bang platform rollout requiring months of integration",
              "Not a vendor-hosted black box with opaque decision logic",
              "Not another system that requires a dedicated ops team",
            ].map(line => (
              <p key={line} style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.5, color: C.valtechGray, margin: "0 0 4px" }}>{line}</p>
            ))}
          </Card>
        </div>
      </div>

      {/* Section 2: Phase 1 Architecture */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Phase 1: Pilot Footprint" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>The pilot architecture is deliberately minimal. File-based extracts, no system integration, no API development. First useful output in 3 weeks.</p>
        <Card style={{ marginBottom: 12 }}>
          <DiagramPhase1Flow />
        </Card>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Phase 1 runs on Valtech's isolated cloud environment. No Maersk infrastructure required. Data is encrypted in transit and at rest. Deleted after benchmarking.</p>
      </div>

      {/* Section 3: Target-State Architecture */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Target State: Embedded Architecture" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>The target architecture embeds the classification capability into Maersk's existing Azure and data platform estate. It adds API integration, persistent taxonomy governance, and the full reconciliation engine.</p>
        <Card style={{ marginBottom: 12 }}>
          <DiagramTargetState />
        </Card>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Every classification can be traced from source record through model version to final output, including any human overrides. This provenance chain supports procurement governance and internal audit.</p>
      </div>

      {/* Section 4: Governance and Failure Handling */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Governance as Software" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>Governance is not a policy document appended to the architecture. It is running software: version control, audit trails, calibration monitoring, and human override workflows.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {govCards.map(c => (
            <Card key={c.title}>
              <h3 style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: C.maerskNavy, margin: "0 0 6px" }}>{c.title}</h3>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
            </Card>
          ))}
        </div>
        <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
          <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.maerskBlue, margin: 0 }}>The value is not the model alone. The value is a governed classification layer that can absorb messy multi-entity source data, expose confidence and provenance, and fit into Maersk's existing operating estate without creating unnecessary platform sprawl.</p>
        </Card>
      </div>

      {/* Section 5: Integration Progression */}
      <div style={{ marginBottom: 48 }}>
        <SectionLabel text="Integration Model" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>Integration deepens incrementally. Phase 1 requires zero integration effort.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {phases.map(p => (
            <Card key={p.phase}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h3 style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{p.phase}: {p.title}</h3>
                <Badge color="navy">{p.weeks}</Badge>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { label: "Input", value: p.input },
                  { label: "Integration effort", value: p.effort },
                  { label: "Environment", value: p.env },
                  { label: "Timeline", value: p.time },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.valtechGray, letterSpacing: "0.05em", fontFamily: font.sans, minWidth: 100, flexShrink: 0 }}>{row.label.toUpperCase()}</span>
                    <span style={{ fontSize: 12, color: C.maerskNavy, fontFamily: font.sans }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 6: AI Classification Pipeline */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel text="Classification Detail" />
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 20px", maxWidth: 700 }}>The six-stage pipeline that transforms raw, multi-format spend descriptions into standardised, confidence-scored category assignments. At production scale, items are processed in prioritised batches. High-spend items are classified first. Low-confidence items route to the Human Review path, prioritised by spend impact.</p>
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
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>This architecture proves value in 3 weeks with zero infrastructure commitment, then embeds incrementally into Maersk's existing estate. The pilot is lightweight. The target state is governed. The transition is phased. At no point does this require a big-bang deployment, a new platform team, or a parallel data infrastructure.</p>
      </Card>
    </div>
  );
}
