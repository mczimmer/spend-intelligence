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

export default function Overview() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.maerskNavy} 0%, ${C.maerskBlue} 100%)`, borderRadius: 14, padding: "48px 40px", marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(66,176,213,0.15)", border: "1px solid rgba(66,176,213,0.3)", borderRadius: 9999, padding: "4px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.maerskStar, letterSpacing: "0.06em" }}>M{"\u00c6"}RSK {"\u00d7"} VALTECH</span>
        </div>
        <h1 style={{ fontFamily: font.sans, fontSize: 34, fontWeight: 700, color: C.white, margin: "0 0 12px", lineHeight: 1.2 }}>Spend Intelligence</h1>
        <p style={{ fontFamily: font.sans, fontSize: 17, fontWeight: 300, color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.65, margin: "0 0 20px" }}>Every acquisition M{"\u00e6"}rsk closed brought another procurement system, another taxonomy, another set of codes. The result: category managers can{"\u2019"}t see consolidated demand across entities. Finance teams reconcile payment codes manually across systems that were never designed to talk to each other. Consolidation opportunities sit unactioned because the data to find them doesn{"\u2019"}t exist in a unified form. This workspace quantifies the cost and demonstrates an AI engine that resolves it.</p>
        <p style={{ fontFamily: font.sans, fontSize: 19, fontWeight: 400, color: C.white, maxWidth: 640, lineHeight: 1.5, margin: "0 0 28px" }}>$48.5B in annual procurement. No single system can show you where the same service is bought twice, at different prices, from different suppliers, across entity boundaries.</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px 20px" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 700, fontFamily: font.sans }}>PREPARED FOR</div>
            <div style={{ fontSize: 14, color: C.white, fontWeight: 700, marginTop: 4, fontFamily: font.sans }}>Navneet S. Rainu</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: font.sans }}>Asset Strategy Platform</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px 20px" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 700, fontFamily: font.sans }}>CONTEXT</div>
            <div style={{ fontSize: 14, color: C.white, fontWeight: 700, marginTop: 4, fontFamily: font.sans }}>February 2026 Discovery</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: font.sans }}>Follow-up: Hypothesis & POC</div>
          </div>
        </div>
      </div>

      {/* The opportunity in one paragraph */}
      <Card style={{ borderLeft: `3px solid ${C.maerskStar}`, marginBottom: 32 }}>
        <p style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.maerskNavy, margin: "0 0 14px" }}>M{"\u00e6"}rsk{"\u2019"}s growth through acquisition, Hamburg S{"\u00fc"}d, Safmarine, Sealand, APM Terminals, LF Logistics, Senator International, and others, created a procurement landscape where the same goods are described, coded, and categorised differently across every entity. With $48.5 billion in annual cost of revenue and a corporate efficiency programme targeting $180 million in savings, the cost of this fragmentation is no longer theoretical.</p>
        <p style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.maerskNavy, margin: "0 0 14px" }}>Traditional harmonisation programmes have been tried. Consultant-led taxonomy mapping. ERP consolidation workstreams. Manual spend classification exercises. They produce a point-in-time snapshot. Then the next acquisition closes, the next entity{"\u2019"}s data enters the system, and the snapshot is already stale. The problem isn{"\u2019"}t that no one has tried to fix this. It{"\u2019"}s that the approach itself doesn{"\u2019"}t compound. Manual harmonisation is linear work applied to an exponentially growing problem.</p>
        <p style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.maerskNavy, margin: 0 }}>This workspace presents a hypothesis: semantic AI can unify M{"\u00e6"}rsk{"\u2019"}s procurement taxonomy, reconcile payment and material codes across entity boundaries, and surface consolidation opportunities that have been structurally invisible since the first acquisition closed.</p>
      </Card>

      {/* Executive summary stats */}
      <SectionLabel text="Executive Summary" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 40 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ padding: "16px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, fontFamily: font.sans, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.valtechGray, marginTop: 2, fontFamily: font.sans }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Workspace */}
      <SectionLabel text="Workspace" />
      <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 24px", maxWidth: 700 }}>Each section in the sidebar builds on the last. Start with <Link href="/demo" style={{ color: C.maerskStar, textDecoration: "none", fontWeight: 700 }}>the demo</Link> if you want evidence first, or <Link href="/problem" style={{ color: C.maerskStar, textDecoration: "none", fontWeight: 700 }}>the problem space</Link> if you want context.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
        <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
          <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>We already tested the hypothesis</h3>
          <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: "0 0 12px" }}>21 items from 10 M{"\u00e6"}rsk entities, classified and reconciled by the AI engine. It found 9.2% in consolidation savings that were invisible until the taxonomies were unified. The question is not whether $274K matters at M{"\u00e6"}rsk{"\u2019"}s scale. It is what 9.2% means across $48.5 billion in procurement.</p>
          <Link href="/demo" style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 700, color: C.maerskStar, textDecoration: "none" }}>Open the demo {"\u2192"}</Link>
        </Card>
        <Card style={{ borderColor: C.maerskStar, borderWidth: 1 }}>
          <h3 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.maerskNavy, margin: "0 0 6px" }}>Model your own numbers</h3>
          <p style={{ fontFamily: font.sans, fontSize: 12, lineHeight: 1.6, color: C.valtechGray, margin: "0 0 8px" }}>The ROI calculator lets you estimate consolidation savings, efficiency gains, and onboarding speed using your own procurement data.</p>
          <Link href="/calculator" style={{ fontFamily: font.sans, fontSize: 12, fontWeight: 700, color: C.maerskStar, textDecoration: "none" }}>Open the calculator {"\u2192"}</Link>
        </Card>
      </div>

      {/* The ask */}
      <SectionLabel text="Next Step" />
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8", marginBottom: 32 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskBlue, margin: "0 0 8px" }}>30 minutes and a sample dataset</h3>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.maerskNavy, margin: "0 0 12px" }}>The corporate efficiency programme has a timeline. Every quarter without unified spend visibility is a quarter where consolidation decisions rely on incomplete data, reconciliation burns finance FTE that could be redeployed, and the next acquisition adds another taxonomy to the backlog. The cost of waiting is not the AI investment deferred. It{"\u2019"}s the procurement leverage that compounds against you while the fragmentation persists.</p>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.maerskNavy, margin: 0 }}>Phase 1 requires minimal commitment: a representative spend data sample from 2{"\u2013"}3 entities, 3 weeks of elapsed time, and no infrastructure build. The go/no-go gate is explicit: {"\u2265"}85% classification accuracy on the sample. If it doesn{"\u2019"}t meet the bar, we stop with full transparency on what was learned and what it would take to get there.</p>
      </Card>

      {/* Footer callout */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>This workspace was prepared by Valtech for the Asset Strategy Platform team at M{"\u00e6"}rsk. All data referenced is from public sources or synthetic models. The interactive demo runs entirely in-browser; no M{"\u00e6"}rsk data has been used.</p>
      </Card>
    </div>
  );
}
