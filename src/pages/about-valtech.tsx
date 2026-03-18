import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import PageHeader from "@/components/PageHeader";

const stats = [
  { label: "Employees", value: "6,000+" },
  { label: "Countries", value: "20+" },
  { label: "Offices", value: "50+" },
  { label: "Years", value: "25+" },
];

const whyCards = [
  {
    title: "Category-heavy industries",
    desc: "We've built classification, taxonomy harmonisation, and data standardisation solutions across healthcare, pharma, automotive, and financial services, industries where structural data fragmentation runs as deep as maritime logistics.",
  },
  {
    title: "AI and data engineering",
    desc: "Our AI practice delivers production-grade machine learning and NLP solutions, not proof-of-concept demos that never scale. We build the infrastructure, the governance, and the operational model around the model.",
  },
  {
    title: "Experience-led delivery",
    desc: "Spend intelligence only delivers value if the people who use it, category managers, finance teams, procurement leads, actually adopt it. Our experience design discipline ensures the solution is built around real workflows and real decision points.",
  },
];

const caseStudies = [
  {
    title: "Procurement taxonomy harmonisation",
    badge: "Healthcare",
    desc: "Unified category taxonomy across 12 acquired entities for a global healthcare company, reducing procurement cycle time by 30% and enabling consolidated supplier management for the first time.",
  },
  {
    title: "AI-powered data classification",
    badge: "Financial Services",
    desc: "Built and deployed an NLP classification engine for a major European bank, processing 2M+ transactions monthly with 94% accuracy and full audit trail compliance.",
  },
  {
    title: "Post-acquisition system integration",
    badge: "Automotive",
    desc: "Led the procurement systems integration following a \u20ac2B acquisition for a global automotive OEM. Harmonised 4 ERP environments into a unified procurement data model.",
  },
  {
    title: "Digital experience for enterprise operations",
    badge: "Logistics",
    desc: "Designed and built an operational dashboard platform for a global logistics provider, adopted by 3,000+ users across 40 countries within the first year.",
  },
];

export default function AboutValtech() {
  return (
    <div>
      <PageHeader
        label="Engagement"
        title="About Valtech"
        subtitle="A global digital agency connecting technology, experience design, and business transformation. The team behind this workspace."
      />

      {/* Company overview */}
      <Card style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>Valtech is a global digital transformation agency operating across 50+ offices in 20+ countries with over 6,000 employees. We work at the intersection of experience design, technology, and business strategy, helping enterprises modernise their platforms, processes, and customer experiences. Our clients include global logistics, automotive, healthcare, pharma, FMCG, and financial services organisations navigating complex transformation programmes.</p>
      </Card>

      {/* Stats bar */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.06em", marginTop: 4, fontFamily: font.sans }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Why Valtech */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 20, height: 2, background: C.maerskStar }} />
        <span style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.maerskStar }}>Why Valtech for this engagement</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
        {whyCards.map(c => (
          <Card key={c.title}>
            <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 6px" }}>{c.title}</h3>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>{c.desc}</p>
          </Card>
        ))}
      </div>

      {/* Selected experience */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 20, height: 2, background: C.maerskStar }} />
        <span style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.maerskStar }}>Selected Experience</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
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

      {/* Footer */}
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.maerskBlue, margin: 0 }}>This workspace, the research, the architecture, the interactive demo, the governance framework, is itself a demonstration of how Valtech works: technically grounded, business-literate, and built for the people who will use it.</p>
      </Card>
    </div>
  );
}
