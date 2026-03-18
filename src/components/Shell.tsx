import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { C, font } from "@/lib/constants";
import { navigation } from "@/data/navigation";
import ValtechBrandmark from "./ValtechBrandmark";

function getPageTitle(pathname: string): string {
  const item = navigation.find(n => n.href === pathname);
  return item?.label || "Overview";
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export default function Shell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const currentPage = getPageTitle(router.pathname);

  const sections = [...new Set(navigation.map(n => n.section))];

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [router.pathname]);

  const navLinks = (
    <nav style={{ flex: 1, padding: "0 12px" }}>
      {sections.map(section => (
        <div key={section} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", padding: "0 8px", marginBottom: 6, fontFamily: font.sans }}>{section}</div>
          {navigation.filter(n => n.section === section).map(item => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 6, textDecoration: "none", fontSize: 13, fontFamily: font.sans, fontWeight: 400, color: isActive ? C.white : "rgba(255,255,255,0.4)", background: isActive ? "rgba(255,255,255,0.08)" : "transparent", transition: "all 0.15s", marginBottom: 1 }}>
                {isActive && <span style={{ width: 4, height: 4, borderRadius: 2, background: C.maerskStar, flexShrink: 0 }} />}
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  const sidebarContent = (
    <>
      {/* Branding */}
      <div style={{ padding: "0 20px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: font.sans, fontWeight: 700, fontSize: 16, color: C.white, letterSpacing: "0.04em" }}>M{"\u00e6"}rsk</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{"\u00d7"}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: font.sans, fontWeight: 400, fontSize: 16, letterSpacing: "0.02em", color: "rgba(255,255,255,0.9)" }}>Valtech</span>
            <ValtechBrandmark size={16} color="rgba(255,255,255,0.9)" />
          </div>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginTop: 4, fontFamily: font.sans }}>Spend Intelligence</div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "16px 20px" }} />

      {navLinks}

      {/* Sidebar footer */}
      <div style={{ padding: "0 20px", marginTop: "auto" }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 16 }} />
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: font.sans }}>Hypothesis & POC</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: font.sans, marginTop: 2 }}>Prepared March 2026</div>
      </div>
    </>
  );

  // ── MOBILE LAYOUT ──
  if (isMobile) {
    return (
      <div style={{ fontFamily: font.sans, color: C.valtechBlack, background: C.white, minHeight: "100vh" }}>
        {/* Mobile header */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, height: 48, background: C.maerskNavy, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
          <button onClick={() => setDrawerOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><rect width="20" height="2" rx="1" fill={C.white} /><rect y="6" width="20" height="2" rx="1" fill={C.white} /><rect y="12" width="20" height="2" rx="1" fill={C.white} /></svg>
          </button>
          <span style={{ fontSize: 14, fontWeight: 400, color: C.white, fontFamily: font.sans }}>{currentPage}</span>
          <ValtechBrandmark size={16} color="rgba(255,255,255,0.5)" />
        </div>

        {/* Drawer overlay */}
        {drawerOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 199, background: "rgba(0,0,0,0.5)" }} onClick={() => setDrawerOpen(false)} />
        )}

        {/* Drawer panel */}
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 200, width: 280, height: "100vh", background: C.maerskNavy, display: "flex", flexDirection: "column", padding: "24px 0", transform: drawerOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.2s ease-out", overflowY: "auto" }}>
          {/* Close button */}
          <button onClick={() => setDrawerOpen(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          {sidebarContent}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 16px" }}>
          {children}
        </div>

        {/* Copyright footer */}
        <div style={{ borderTop: `1px solid ${C.valtechBorder}`, padding: "16px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: C.valtechGray, fontFamily: font.sans, flexWrap: "wrap" }}>
            <span>{"\u00a9"} 2026 Valtech</span>
            <span style={{ color: C.valtechBorder }}>{"\u00b7"}</span>
            <span>Prepared for A.P. M{"\u00f8"}ller {"\u2013"} M{"\u00e6"}rsk A/S</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.valtechGray, fontFamily: font.sans }}>VALTECH</span>
            <ValtechBrandmark size={12} color={C.valtechGray} />
          </div>
        </div>
      </div>
    );
  }

  // ── DESKTOP LAYOUT ──
  return (
    <div style={{ fontFamily: font.sans, color: C.valtechBlack, background: C.white, minHeight: "100vh" }}>
      {/* Desktop sidebar */}
      <div style={{ width: 220, minHeight: "100vh", background: C.maerskNavy, display: "flex", flexDirection: "column", padding: "24px 0", position: "fixed", top: 0, left: 0, zIndex: 200, overflowY: "auto" }}>
        {sidebarContent}
      </div>

      {/* Main content area */}
      <div style={{ marginLeft: 220 }}>
        {/* Top bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 100, height: 48, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.valtechBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.valtechGray, fontFamily: font.sans }}>VALTECH</span>
            <ValtechBrandmark size={12} color={C.valtechGray} />
          </div>
        </div>
      </div>
    </div>
  );
}
