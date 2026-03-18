import Link from "next/link";
import { C, font } from "@/lib/constants";
import Card from "@/components/Card";
import SectionLabel from "@/components/SectionLabel";

const stats = [
  { label: "Acquired Entities", value: "8+", sub: "In scope" },
  { label: "Spend Items", value: "18", sub: "POC sample" },
  { label: "Est. Savings", value: "$274K", sub: "Consolidation" },
  { label: "Target Accuracy", value: "92%+", sub: "Classification" },
  { label: "Timeline", value: "18 wks", sub: "Full engagement" },
];

const pages = [
  { title: "Problem Space", href: "/problem", desc: "Why taxonomy fragmentation costs more than you think" },
  { title: "Hypothesis", href: "/solution", desc: "How semantic AI resolves structural spend fragmentation" },
  { title: "Value Case", href: "/value-case", desc: "The measurable business impact" },
  { title: "Interactive Demo", href: "/demo", desc: "See the AI classification engine working on synthetic Maersk data", featured: true },
  { title: "Architecture", href: "/architecture", desc: "How it connects to existing systems" },
  { title: "Governance", href: "/governance", desc: "Data handling, security, and compliance" },
  { title: "Approach & Investment", href: "/approach", desc: "Phased engagement with clear gates" },
];

export default function Overview() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.maerskNavy} 0%, ${C.maerskBlue} 100%)`, borderRadius: 14, padding: "48px 40px", marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(66,176,213,0.15)", border: "1px solid rgba(66,176,213,0.3)", borderRadius: 9999, padding: "4px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.maerskStar, letterSpacing: "0.06em" }}>MAERSK x VALTECH</span>
        </div>
        <h1 style={{ fontFamily: font.sans, fontSize: 34, fontWeight: 800, color: C.white, margin: "0 0 12px", lineHeight: 1.2 }}>Spend Intelligence</h1>
        <p style={{ fontFamily: font.sans, fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.65, margin: "0 0 28px" }}>AI-powered category standardisation and payment-code reconciliation for Maersk's post-acquisition procurement landscape.</p>
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

      {/* Workspace contents */}
      <SectionLabel text="What This Workspace Contains" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
        {pages.map(p => (
          <Link key={p.href} href={p.href} style={{ textDecoration: "none", color: "inherit" }}>
            <Card style={{ cursor: "pointer", transition: "border-color 0.15s, box-shadow 0.15s", ...(p.featured ? { borderColor: C.maerskStar, borderWidth: 2 } : {}) }}>
              <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 6px" }}>{p.title}</h3>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: C.valtechGray, margin: 0 }}>{p.desc}</p>
              {p.featured && (
                <div style={{ marginTop: 8 }}>
                  <span style={{ display: "inline-block", background: C.maerskLight, color: C.maerskBlue, border: "1px solid #b3dce8", borderRadius: 9999, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>Centrepiece</span>
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {/* Footer callout */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>This workspace presents a hypothesis and proof of concept. It is designed to support a 30-minute discussion on the opportunity and a concrete next step.</p>
      </Card>
    </div>
  );
}
