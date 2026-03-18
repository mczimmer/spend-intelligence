import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import SectionLabel from "@/components/SectionLabel";

const stats = [
  { label: "Cost of revenue (2024)", value: "$48.5B", sub: "Annual procurement base" },
  { label: "Acquired entities", value: "10+", sub: "Independent procurement systems" },
  { label: "POC sample", value: "21 items", sub: "Across 10 entities, 6 categories" },
  { label: "Consolidation identified", value: "$274K", sub: "9.2% of sample spend" },
  { label: "Efficiency target", value: "$180M", sub: "Corporate overhead programme" },
];

const workspacePages = [
  { num: "1", title: "Problem Space", href: "/problem", desc: "Why taxonomy fragmentation is structural, not incidental" },
  { num: "2", title: "Hypothesis", href: "/solution", desc: "The three-stage AI method: classify, reconcile, consolidate" },
  { num: "3", title: "Value Case", href: "/value-case", desc: "What unified spend intelligence is worth at M\u00e6rsk\u2019s scale" },
  { num: "4", title: "Interactive Demo", href: "/demo", desc: "The classification engine running on synthetic M\u00e6rsk data" },
  { num: "5", title: "ROI Calculator", href: "/calculator", desc: "Model the impact using your own numbers" },
  { num: "6", title: "Architecture", href: "/architecture", desc: "Pace-layered design, C4 system views, integration model" },
  { num: "7", title: "Governance", href: "/governance", desc: "Data handling, AI transparency, commercial terms" },
  { num: "8", title: "Approach", href: "/approach", desc: "Four phases with explicit gates and a low-commitment entry point" },
];

export default function Overview() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.maerskNavy} 0%, ${C.maerskBlue} 100%)`, borderRadius: 14, padding: "48px 40px", marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(66,176,213,0.15)", border: "1px solid rgba(66,176,213,0.3)", borderRadius: 9999, padding: "4px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.maerskStar, letterSpacing: "0.06em" }}>M{"\u00c6"}RSK {"\u00d7"} VALTECH</span>
        </div>
        <h1 style={{ fontFamily: font.sans, fontSize: 34, fontWeight: 800, color: C.white, margin: "0 0 12px", lineHeight: 1.2 }}>Spend Intelligence</h1>
        <p style={{ fontFamily: font.sans, fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.65, margin: "0 0 28px" }}>A hypothesis for resolving the procurement taxonomy fragmentation that M{"\u00e6"}rsk{"\u2019"}s acquisition history created, and a proof of concept demonstrating that AI classification can do in weeks what manual harmonisation takes months to achieve.</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px 20px" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 600, fontFamily: font.sans }}>PREPARED FOR</div>
            <div style={{ fontSize: 14, color: C.white, fontWeight: 700, marginTop: 4, fontFamily: font.sans }}>Navneet S. Rainu</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: font.sans }}>Asset Strategy Platform</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px 20px" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 600, fontFamily: font.sans }}>CONTEXT</div>
            <div style={{ fontSize: 14, color: C.white, fontWeight: 700, marginTop: 4, fontFamily: font.sans }}>February 2026 Discovery</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: font.sans }}>Follow-up: Hypothesis & POC</div>
          </div>
        </div>
      </div>

      {/* The opportunity in one paragraph */}
      <Card style={{ borderLeft: `3px solid ${C.maerskStar}`, marginBottom: 32 }}>
        <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.maerskNavy, margin: 0 }}>M{"\u00e6"}rsk{"\u2019"}s growth through acquisition, Hamburg S{"\u00fc"}d, Safmarine, Sealand, APM Terminals, LF Logistics, Senator International, and others, created a procurement landscape where the same goods are described, coded, and categorised differently across every entity. With $48.5 billion in annual cost of revenue and a corporate efficiency programme targeting $180 million in savings, the cost of this fragmentation is no longer theoretical. This workspace presents a hypothesis: semantic AI can unify M{"\u00e6"}rsk{"\u2019"}s procurement taxonomy, reconcile payment and material codes across entity boundaries, and surface consolidation opportunities that have been structurally invisible since the first acquisition closed.</p>
      </Card>

      {/* Executive summary stats */}
      <SectionLabel text="Executive Summary" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 40 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ padding: "16px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, fontFamily: font.sans, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.maerskNavy, fontFamily: font.sans }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.valtechGray, marginTop: 2, fontFamily: font.sans }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* What this workspace contains */}
      <SectionLabel text="Workspace" />
      <div style={{ display: "flex", gap: 28, marginBottom: 40 }}>
        {/* Left column — page map */}
        <div style={{ flex: "0 0 58%", minWidth: 0 }}>
          <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 16px" }}>This workspace builds a complete case, from problem diagnosis through hypothesis, value quantification, live proof of concept, technical architecture, governance framework, and engagement approach. Each section builds on the previous one.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {workspacePages.map(p => (
              <Link key={p.href} href={p.href} style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10, padding: "6px 0", borderBottom: "1px solid #f5f5f5" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.maerskStar, fontFamily: font.sans, width: 18, flexShrink: 0 }}>{p.num}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans }}>{p.title}</span>
                <span style={{ fontSize: 13, color: C.valtechGray, fontFamily: font.sans }}>: {p.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right column — start here */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
            <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>See the proof of concept</h3>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: "0 0 12px" }}>The interactive demo classifies 21 maritime procurement items from 10 M{"\u00e6"}rsk entities in real-time, categorising, reconciling payment codes, and surfacing consolidation opportunities.</p>
            <Link href="/demo" style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 600, color: C.maerskStar, textDecoration: "none" }}>Open the demo {"\u2192"}</Link>
          </Card>
          <Card style={{ borderColor: C.maerskStar, borderWidth: 1 }}>
            <h3 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 600, color: C.maerskNavy, margin: "0 0 6px" }}>Model your own numbers</h3>
            <p style={{ fontFamily: font.sans, fontSize: 12, lineHeight: 1.6, color: C.valtechGray, margin: "0 0 8px" }}>The ROI calculator lets you estimate consolidation savings, efficiency gains, and onboarding speed using your own procurement data.</p>
            <Link href="/calculator" style={{ fontFamily: font.sans, fontSize: 12, fontWeight: 600, color: C.maerskStar, textDecoration: "none" }}>Open the calculator {"\u2192"}</Link>
          </Card>
        </div>
      </div>

      {/* The ask */}
      <SectionLabel text="Next Step" />
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8", marginBottom: 32 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskBlue, margin: "0 0 8px" }}>30 minutes and a sample dataset</h3>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.maerskNavy, margin: "0 0 12px" }}>Phase 1 requires minimal commitment: a representative spend data sample from 2{"\u2013"}3 entities, 3 weeks of elapsed time, and no infrastructure build. The go/no-go gate is explicit: {"\u2265"}85% classification accuracy on the sample. If it doesn{"\u2019"}t meet the bar, we stop with full transparency on what was learned and what it would take to get there.</p>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>This workspace is itself a demonstration of how we work: technically grounded, M{"\u00e6"}rsk-specific, and built to support a decision, not to sell a platform.</p>
      </Card>

      {/* Footer callout */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>This workspace was prepared by Valtech for the Asset Strategy Platform team at M{"\u00e6"}rsk. All data referenced is from public sources or synthetic models. The interactive demo runs entirely in-browser; no M{"\u00e6"}rsk data has been used.</p>
      </Card>
    </div>
  );
}
