import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import PageHeader from "@/components/PageHeader";

const stages = [
  {
    num: "01",
    title: "Classify: Unified taxonomy from fragmented descriptions",
    badge: "NLP + UNSPSC",
    desc: "Every spend description across every acquired entity is semantically matched to a unified, UNSPSC-aligned category hierarchy. The AI reads 'HFO 380cst bunkering' from Svitzer and 'heavy fuel oil vessel supply' from Hamburg Sud and understands they are the same product, regardless of language, abbreviation, or entity naming convention. The output is a single category structure that replaces the fragmented taxonomies inherited from each acquisition. Items the AI is uncertain about are routed to human review, not silently committed.",
  },
  {
    num: "02",
    title: "Reconcile: Code alignment across entity boundaries",
    badge: "Finance",
    desc: "Within each unified category, payment codes and material codes are cross-referenced across entities. Where Svitzer uses PAY-4401 and Hamburg Sud uses PAY-4460 for identical fuel purchases, the system flags the mismatch, identifies which code the majority of entities already use, and suggests standardisation. Finance teams review exceptions, not spreadsheets. The reconciliation logic follows acquisition boundaries, not arbitrary rules, because that's where the fragmentation originates.",
  },
  {
    num: "03",
    title: "Consolidate: Cross-entity spend visibility",
    badge: "Category Mgmt",
    desc: "With unified categories and reconciled codes, cross-entity spend becomes visible for the first time. Category managers can see that three entities are buying the same hull coating from three different suppliers in the same port region. Consolidation opportunities are quantified by category and prioritised by spend impact. This is the visibility that has been structurally impossible since the first acquisition closed, not because the data didn't exist, but because it was never in the same language.",
  },
];

const metrics = [
  { label: "First-pass accuracy", value: "92%+", sub: "On 21 maritime procurement items across 10 entities" },
  { label: "Reconciliation automation", value: "80%", sub: "Directly aligned with the $180M efficiency programme" },
  { label: "Entity onboarding", value: "5 days", sub: "vs. 3-6 months for Hamburg Sud, LF Logistics, Senator" },
  { label: "Spend visibility", value: "100%", sub: "Across all acquisition boundaries, for the first time" },
];

const footerCols = [
  {
    title: "How we validate this",
    body: "The interactive demo runs this three-stage pipeline on synthetic Maersk procurement data: 21 items across 10 entities. It demonstrates classification, reconciliation, and consolidation with live AI insights.",
    link: "/demo",
    linkText: "See the demo \u2192",
  },
  {
    title: "What comes next",
    body: "Phase 1 tests this hypothesis against real Maersk data. The go/no-go gate is explicit: \u226585% classification accuracy on a representative sample. If the hypothesis doesn't hold, we stop, with full transparency on what was learned.",
    link: "/approach",
    linkText: "See the approach \u2192",
  },
  {
    title: "What this is worth",
    body: "If the hypothesis holds at Maersk's scale, $15-25B in addressable procurement spend across 10+ entities, the value case quantifies the consolidation, efficiency, and acquisition speed impact.",
    link: "/value-case",
    linkText: "See the value case \u2192",
  },
];

export default function Solution() {
  return (
    <div>
      <PageHeader
        label="Analysis"
        title="The Hypothesis"
        subtitle="We believe Maersk's procurement taxonomy fragmentation, the structural consequence of integrating Hamburg Sud, Safmarine, Sealand, and a dozen other entities, can be resolved through AI classification in weeks rather than the months-to-years that manual harmonisation requires. The hypothesis: semantic AI achieves 85%+ accuracy on first pass, with human review closing the gap, creating a system that improves with every entity integration rather than degrading."
      />

      {/* Why Now */}
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8", marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 4, minHeight: 40, background: C.maerskStar, borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskBlue, margin: "0 0 8px" }}>Why this is possible now, and wasn't before</h3>
            <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>The 2023 brand unification programme consolidated Maersk's customer-facing identity, retiring Hamburg Sud, Sealand, and Safmarine as commercial brands. But brand unification didn't touch procurement data. The category taxonomies, payment codes, and material codes behind those brands remain fragmented. This hypothesis is the procurement equivalent of that unification, with one critical difference: AI makes it achievable in weeks rather than years, and the system improves with each new entity rather than producing a point-in-time snapshot that degrades.</p>
          </div>
        </div>
      </Card>

      {/* Three method stages */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 12 }}>
        {stages.map((s, i) => (
          <div key={s.num} style={{ display: "flex", gap: 0 }}>
            {/* Step indicator column */}
            <div style={{ width: 48, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 24 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.maerskStar, fontFamily: font.sans, lineHeight: 1 }}>{s.num}</div>
              {i < stages.length - 1 && (
                <div style={{ width: 2, flex: 1, background: C.valtechBorder, marginTop: 12 }} />
              )}
            </div>
            {/* Card */}
            <div style={{ flex: 1, paddingBottom: 16 }}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: 0, maxWidth: "80%" }}>{s.title}</h3>
                  <Badge color="blue">{s.badge}</Badge>
                </div>
                <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{s.desc}</p>
              </Card>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: font.sans, fontSize: 13, color: C.valtechGray, lineHeight: 1.7, margin: "0 0 32px", paddingLeft: 48 }}>These three stages form the pipeline demonstrated in the{" "}<Link href="/demo" style={{ color: C.maerskStar, textDecoration: "none" }}>interactive proof of concept</Link>, running on synthetic data modelled on Maersk's maritime procurement landscape.</p>

      {/* Continuous Learning */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 32 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>A system that gets better, not one that decays</h3>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>Traditional taxonomy mapping exercises produce a snapshot. It's accurate on the day it's delivered and degrades from that moment; every new supplier, every new entity, every new category introduces drift. The AI classification engine works in the opposite direction: human reviewers validate edge cases, and their corrections calibrate the model. Accuracy improves over time. When Maersk acquires the next business, as it does roughly 1-2 times per year, onboarding that entity's taxonomy is a training exercise for the AI, not a 6-month consulting project.</p>
      </Card>

      {/* Stats bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 20, height: 2, background: C.maerskStar }} />
          <span style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.maerskStar }}>What this means at Maersk scale</span>
        </div>
        <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
            {metrics.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 10, color: C.maerskStar, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4, fontFamily: font.sans }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.white, fontFamily: font.sans }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2, fontFamily: font.sans }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer — three-column dark callout */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
          {footerCols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>{col.title}</h4>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: "0 0 8px" }}>{col.body}</p>
              <Link href={col.link} style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 700, color: C.maerskStar, textDecoration: "none" }}>{col.linkText}</Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
