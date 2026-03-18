import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import SectionLabel from "@/components/SectionLabel";
import PageHeader from "@/components/PageHeader";
import ValtechBrandmark from "@/components/ValtechBrandmark";

const deliveryStats = [
  { value: "Weeks, not months", sub: "This workspace: concept to deployed product" },
  { value: "AI + Data Engineering", sub: "Production ML and NLP, not just POCs" },
  { value: "Enterprise Integration", sub: "SAP, Oracle, multi-ERP data environments" },
  { value: "Post-Acquisition", sub: "System harmonisation across acquired entities" },
];

const capCards = [
  {
    title: "We've solved the classification problem before",
    badge: "Data + AI",
    desc: "Spend classification, taxonomy harmonisation, and code reconciliation across fragmented entity systems. We have built this pattern in healthcare (12 acquired entities), financial services (2M+ monthly transactions), and automotive (4 ERP environments post-acquisition). The patterns are the same: messy source data, inconsistent naming, codes that do not align. The AI approach in this workspace is informed by what worked at production scale across those engagements.",
  },
  {
    title: "We build products, not slide decks",
    badge: "Engineering",
    desc: "The interactive demo in this workspace runs a real classification pipeline with confidence scoring, code reconciliation, and consolidation savings. The ROI calculator computes live. The architecture diagrams are drawn from production patterns, not aspirational designs. This is how we work: build first, present what is working, then discuss what to do with it. Phase 1 operates at the same velocity.",
  },
  {
    title: "We design for the people who use it",
    badge: "Experience",
    desc: "Spend intelligence only delivers value if category managers, finance teams, and procurement leads adopt it. Every screen in this workspace was designed for a specific user: the overview for Navneet, the demo for a category manager evaluating accuracy, the calculator for a finance lead modelling ROI, the governance page for an infosec reviewer. That is experience design applied to enterprise data, not consumer apps.",
  },
];

const caseStudies = [
  {
    title: "Procurement taxonomy harmonisation",
    badge: "Healthcare",
    desc: "Unified category taxonomy across 12 acquired entities with 4 different ERP platforms across 3 continents. Reduced procurement cycle time by 30% and enabled consolidated supplier management for the first time.",
  },
  {
    title: "AI-powered data classification",
    badge: "Financial Services",
    desc: "Built and deployed an NLP classification engine processing 2M+ transactions monthly with 94% accuracy and full audit trail compliance. Production system, not a prototype.",
  },
  {
    title: "Post-acquisition system integration",
    badge: "Automotive",
    desc: "Procurement systems integration following a \u20ac2B acquisition. Harmonised 4 ERP environments into a unified procurement data model across 6 operating countries.",
  },
  {
    title: "Operational dashboard platform",
    badge: "Logistics",
    desc: "Designed and built an operational dashboard platform for a global logistics provider, adopted by 3,000+ users across 40 countries within the first year of deployment.",
  },
];

export default function AboutValtech() {
  return (
    <div>
      <PageHeader
        label="Engagement"
        title="About Valtech"
        subtitle="The team behind this workspace. Not a strategy consultancy. Not a systems integrator. A digital engineering firm that builds working software for complex enterprises."
      />

      <div style={{ marginTop: -20, marginBottom: 24 }}>
        <ValtechBrandmark size={32} color={C.valtechBorder} />
      </div>

      {/* Company overview */}
      <Card style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Valtech builds digital products and data platforms for enterprises navigating complex transformation. Not strategy decks. Not advisory reports. Working software: classification engines, governed data pipelines, interactive tools that category managers and finance teams actually use. The workspace you are reading is an example of how we work. It was built in weeks, not months, by the same team that would deliver Phase 1.</p>
      </Card>

      {/* Delivery-relevant metrics */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
          {deliveryStats.map(s => (
            <div key={s.value} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.valtechMoss, fontFamily: font.sans }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.06em", marginTop: 4, fontFamily: font.sans }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Capability cards */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 20, height: 2, background: C.maerskStar }} />
        <span style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.maerskStar }}>Why Valtech for this engagement</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
        {capCards.map(c => (
          <Card key={c.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{c.title}</h3>
              <Badge color="blue">{c.badge}</Badge>
            </div>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
          </Card>
        ))}
      </div>

      {/* Selected experience */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ width: 20, height: 2, background: C.maerskStar }} />
        <span style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.maerskStar }}>Selected Experience</span>
      </div>
      <p style={{ fontFamily: font.sans, fontSize: 12, lineHeight: 1.6, color: C.valtechGray, margin: "0 0 12px" }}>We do not name clients without permission. These are capability patterns drawn from real engagements, described at the level of specificity we can share publicly.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
        {caseStudies.map(c => (
          <Card key={c.title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>{c.title}</h3>
              <Badge color="blue">{c.badge}</Badge>
            </div>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
          </Card>
        ))}
      </div>

      {/* Delivery model */}
      <SectionLabel text="Delivery Model" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <Card>
          <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 8px" }}>Who does this work</h3>
          <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Phase 1 is delivered by a senior data engineer, an AI/ML specialist, and a solution architect from Valtech's Nordic practice. Not offshore juniors. Not a rotating bench. The same people who built this workspace scope, build, and deliver Phase 1.</p>
        </Card>
        <Card>
          <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 8px" }}>How we work</h3>
          <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Embedded with your team, not parallel to it. Category managers validate classifications. Finance reviews reconciliation. We build in the open, with weekly demos and a shared workspace. No 6-week discovery phase before anything gets built.</p>
        </Card>
      </div>

      {/* Footer */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>The strongest proof of how we work is the workspace you have been reading. It was researched, designed, architected, and built by the same team proposing Phase 1. The classification engine works. The ROI model runs real math. The governance framework can be written into a contract. If that standard of delivery is what you expect from Phase 1, we should talk.</p>
      </Card>
    </div>
  );
}
