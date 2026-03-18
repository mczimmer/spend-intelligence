import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { C, font } from "@/lib/constants";
import { navigation } from "@/data/navigation";

function getPageTitle(pathname: string): string {
  const item = navigation.find(n => n.href === pathname);
  return item?.label || "Overview";
}

export default function Shell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPage = getPageTitle(router.pathname);

  const sections = [...new Set(navigation.map(n => n.section))];

  const sidebar = (
    <div style={{ width: 220, minHeight: "100vh", background: C.maerskNavy, display: "flex", flexDirection: "column", padding: "24px 0", position: "fixed", top: 0, left: 0, zIndex: 200, overflowY: "auto" }}>
      {/* Branding */}
      <div style={{ padding: "0 20px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: font.sans, fontWeight: 800, fontSize: 16, color: C.white, letterSpacing: "0.04em" }}>M{"\u00e6"}rsk</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{"\u00d7"}</span>
          <span style={{ fontFamily: font.sans, fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.9)" }}>Valtech</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 4, fontFamily: font.sans }}>Spend Intelligence</div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "16px 20px" }} />

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 12px" }}>
        {sections.map(section => (
          <div key={section} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", padding: "0 8px", marginBottom: 6, fontFamily: font.sans }}>{section}</div>
            {navigation.filter(n => n.section === section).map(item => {
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 6, textDecoration: "none", fontSize: 13, fontFamily: font.sans, fontWeight: 500, color: isActive ? C.white : "rgba(255,255,255,0.4)", background: isActive ? "rgba(255,255,255,0.08)" : "transparent", transition: "all 0.15s", marginBottom: 1 }}>
                  {isActive && <span style={{ width: 4, height: 4, borderRadius: 2, background: C.maerskStar, flexShrink: 0 }} />}
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "0 20px", marginTop: "auto" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 16 }} />
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: font.sans }}>Hypothesis & POC</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: font.sans, marginTop: 2 }}>Prepared March 2026</div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: font.sans, color: C.valtechBlack, background: C.white, minHeight: "100vh" }}>
      {/* Desktop sidebar */}
      <div style={{ display: "block" }} className="shell-sidebar">
        {sidebar}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 199, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar drawer */}
      <div className="shell-mobile-sidebar" style={{ display: "none", position: "fixed", top: 0, left: 0, zIndex: 200, transform: mobileOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.2s ease" }}>
        {sidebar}
      </div>

      {/* Main content area */}
      <div style={{ marginLeft: 220 }} className="shell-main">
        {/* Top bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 100, height: 48, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.valtechBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {/* Mobile hamburger */}
            <button className="shell-hamburger" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px 12px 4px 0", marginRight: 8 }}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><rect width="18" height="2" rx="1" fill={C.valtechGray} /><rect y="6" width="18" height="2" rx="1" fill={C.valtechGray} /><rect y="12" width="18" height="2" rx="1" fill={C.valtechGray} /></svg>
            </button>
            <span style={{ fontSize: 13, color: C.valtechGray, fontFamily: font.sans }}>Spend Intelligence</span>
            <span style={{ fontSize: 13, color: C.valtechGray, margin: "0 6px" }}>/</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans }}>{currentPage}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: C.maerskStar }} />
            <span style={{ fontSize: 12, color: C.valtechGray, fontFamily: font.sans }}>Phase 0: Hypothesis</span>
          </div>
        </div>

        {/* Content canvas */}
        <div style={{ maxWidth: 1080, padding: "32px 40px" }}>
          {children}
        </div>

        {/* Copyright footer */}
        <div style={{ borderTop: `1px solid ${C.valtechBorder}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: C.valtechGray, fontFamily: font.sans }}>
            <span>{"\u00a9"} 2026 Valtech</span>
            <span style={{ color: C.valtechBorder }}>{"\u00b7"}</span>
            <span>Prepared exclusively for A.P. M{"\u00f8"}ller {"\u2013"} M{"\u00e6"}rsk A/S</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.valtechGray, fontFamily: font.sans }}>VALTECH</span>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .shell-sidebar { display: none !important; }
          .shell-mobile-sidebar { display: block !important; }
          .shell-hamburger { display: block !important; }
          .shell-main { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
