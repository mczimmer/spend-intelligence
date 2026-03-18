import { useState, useEffect, useRef } from "react";
import { C, font } from "@/lib/constants";
import Badge from "./Badge";
import ConfBar from "./ConfBar";

// ── Demo Data ──
const SPEND = [
  { id: "SP-001", desc: "Marine Fuel Oil HFO 380cst - Rotterdam", source: "Svitzer (DK)", amount: 284000, payCode: "PAY-4401", matCode: "MAT-7710" },
  { id: "SP-002", desc: "Bunker fuel heavy oil vessel supply", source: "Hamburg Süd (DE)", amount: 312000, payCode: "PAY-4401", matCode: "MAT-8820" },
  { id: "SP-003", desc: "HFO bunkering - Singapore terminal", source: "APM Terminals (SG)", amount: 198000, payCode: "PAY-4410", matCode: "MAT-7710" },
  { id: "SP-004", desc: "Reefer container maintenance - compressor rebuild", source: "MCI (NL)", amount: 47500, payCode: "PAY-5520", matCode: "MAT-3301" },
  { id: "SP-005", desc: "Refrigerated unit repair - scroll compressor", source: "Star Cool (DK)", amount: 52000, payCode: "PAY-5580", matCode: "MAT-3310" },
  { id: "SP-006", desc: "Container reefer spare parts - compressor kit", source: "Sealand (US)", amount: 38000, payCode: "PAY-5520", matCode: "MAT-3399" },
  { id: "SP-007", desc: "Port handling crane ops - Tanjung Pelepas", source: "APM Terminals (MY)", amount: 125000, payCode: "PAY-6601", matCode: "MAT-5501" },
  { id: "SP-008", desc: "Terminal crane services and stevedoring", source: "APMT Maasvlakte (NL)", amount: 143000, payCode: "PAY-6650", matCode: "MAT-5510" },
  { id: "SP-009", desc: "Quay crane hire + container handling labour", source: "Svitzer (AU)", amount: 98000, payCode: "PAY-6601", matCode: "MAT-5590" },
  { id: "SP-010", desc: "Anti-fouling hull coating - drydock Busan", source: "Maersk Supply Svc (KR)", amount: 187000, payCode: "PAY-7701", matCode: "MAT-6610" },
  { id: "SP-011", desc: "Vessel hull paint antifoul application", source: "Hamburg Süd (BR)", amount: 165000, payCode: "PAY-7790", matCode: "MAT-6699" },
  { id: "SP-012", desc: "Marine antifouling coating service - SG yard", source: "Fleet Mgmt (SG)", amount: 201000, payCode: "PAY-7701", matCode: "MAT-6610" },
  { id: "SP-013", desc: "Lashing rods and turnbuckles - container securing", source: "Safmarine (ZA)", amount: 23000, payCode: "PAY-8801", matCode: "MAT-4401" },
  { id: "SP-014", desc: "Container twist locks and lashing equipment", source: "Sealand (US)", amount: 31000, payCode: "PAY-8810", matCode: "MAT-4410" },
  { id: "SP-015", desc: "Cargo securing gear - twistlocks + rods", source: "MCC Transport (TH)", amount: 19000, payCode: "PAY-8801", matCode: "MAT-4490" },
  { id: "SP-016", desc: "MGO low-sulphur fuel supply Algeciras", source: "Maersk Oil Trading (ES)", amount: 410000, payCode: "PAY-4450", matCode: "MAT-7750" },
  { id: "SP-017", desc: "VLSFO compliant marine gas oil bunker", source: "Hamburg Süd (NL)", amount: 375000, payCode: "PAY-4401", matCode: "MAT-7799" },
  { id: "SP-018", desc: "Low sulphur fuel oil - IMO2020 spec", source: "Svitzer (GB)", amount: 289000, payCode: "PAY-4460", matCode: "MAT-7750" },
];

function fmt(n: number) { return "$" + n.toLocaleString(); }

function classifyItem(item: any) {
  const d = item.desc.toLowerCase();
  if (d.includes("hfo") || d.includes("bunker") || d.includes("heavy") || (d.includes("fuel") && d.includes("oil") && !d.includes("sulphur") && !d.includes("mgo") && !d.includes("vlsfo") && !d.includes("low")))
    return { cat: "Marine Fuels & Lubricants", sub: "Heavy Fuel Oil (HFO)", conf: d.includes("hfo") ? 96 : 88 };
  if (d.includes("mgo") || d.includes("vlsfo") || d.includes("low sulphur") || d.includes("low-sulphur"))
    return { cat: "Marine Fuels & Lubricants", sub: "Low Sulphur Fuel Oil (VLSFO/MGO)", conf: 94 };
  if (d.includes("reefer") || d.includes("refrigerat") || d.includes("compressor"))
    return { cat: "Reefer & Container Maintenance", sub: "Compressor Repair & Rebuild", conf: d.includes("compressor") ? 95 : 82 };
  if (d.includes("crane") || d.includes("stevedor") || d.includes("port handling") || d.includes("container handling"))
    return { cat: "Port & Terminal Services", sub: "Crane & Stevedoring", conf: d.includes("crane") ? 93 : 79 };
  if (d.includes("antifoul") || d.includes("hull") || d.includes("coating") || d.includes("paint"))
    return { cat: "Vessel Maintenance & Drydock", sub: "Hull Coating & Antifouling", conf: 91 };
  if (d.includes("lash") || d.includes("twistlock") || d.includes("twist lock") || d.includes("securing") || d.includes("turnbuckle"))
    return { cat: "Cargo Securing Equipment", sub: "Lashing & Twistlocks", conf: 89 };
  return { cat: "Marine Fuels & Lubricants", sub: "Heavy Fuel Oil (HFO)", conf: 62 };
}

function reconcileItems(items: any[]) {
  const classified = items.map(i => ({ ...i, ...classifyItem(i) }));
  const groups: Record<string, any[]> = {};
  classified.forEach(i => { const k = i.cat + "|" + i.sub; if (!groups[k]) groups[k] = []; groups[k].push(i); });
  const recon: any[] = [];
  Object.entries(groups).forEach(([, grp]) => {
    const payCodes = [...new Set(grp.map(g => g.payCode))];
    const matCodes = [...new Set(grp.map(g => g.matCode))];
    const matched = payCodes.length === 1 && matCodes.length === 1;
    const partial = payCodes.length <= 2 && matCodes.length <= 2;
    grp.forEach(g => {
      recon.push({ ...g, payMismatch: payCodes.length > 1, matMismatch: matCodes.length > 1, reconStatus: matched ? "matched" : partial ? "partial" : "unmatched", suggestedPayCode: payCodes[0], suggestedMatCode: matCodes[0] });
    });
  });
  return recon;
}

function consolidateItems(reconItems: any[]) {
  const groups: Record<string, any> = {};
  reconItems.forEach(i => {
    const k = i.cat + "|" + i.sub;
    if (!groups[k]) groups[k] = { cat: i.cat, sub: i.sub, items: [], totalSpend: 0, sources: new Set(), payV: new Set(), matV: new Set() };
    groups[k].items.push(i); groups[k].totalSpend += i.amount; groups[k].sources.add(i.source); groups[k].payV.add(i.payCode); groups[k].matV.add(i.matCode);
  });
  return Object.values(groups).map((g: any) => ({
    ...g, sources: [...g.sources], payV: [...g.payV], matV: [...g.matV],
    savingsEst: g.sources.size >= 2 ? Math.round(g.totalSpend * (0.06 + 0.04 * g.sources.size / 4)) : 0,
    codeRedPay: g.payV.size > 1 ? `${g.payV.size} → 1` : "—",
    codeRedMat: g.matV.size > 1 ? `${g.matV.size} → 1` : "—",
  })).sort((a: any, b: any) => b.totalSpend - a.totalSpend);
}

// ── AI Insight ──
function Spinner() {
  return <span style={{ display: "inline-block", width: 14, height: 14, border: `2px solid ${C.valtechBorder}`, borderTop: `2px solid ${C.maerskStar}`, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />;
}

function AIInsight({ items, stage }: { items: any[]; stage: string }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const ran = useRef(false);
  useEffect(() => { if (ran.current) return; ran.current = true; go(); }, []);
  async function go() {
    setLoading(true);
    const prompts: Record<string, string> = {
      classify: `You are an AI procurement analyst for a global container shipping company formed through acquisitions (like Maersk with Svitzer, Hamburg Süd, APM Terminals, Sealand etc). Given these auto-classified spend items, provide a concise 3-sentence executive insight about classification quality, data fragmentation patterns across acquired entities, and what this means for spend visibility. Items: ${JSON.stringify(items.slice(0, 8).map((i: any) => ({ desc: i.desc, source: i.source, cat: i.cat, conf: i.conf })))} Respond in plain text only.`,
      reconcile: `You are an AI procurement analyst for a global container shipping company. These items were reconciled for payment/material code consistency. Give a 3-sentence insight on: which categories have worst code fragmentation, impact on financial reporting, and estimated manual FTE being wasted on reconciliation. Items: ${JSON.stringify(items.slice(0, 8).map((i: any) => ({ desc: i.desc, cat: i.cat, payCode: i.payCode, matCode: i.matCode, status: i.reconStatus })))} Respond in plain text only.`,
      consolidate: `You are an AI procurement analyst. After classification, reconciliation, and consolidation of maritime procurement spend, provide a 3-sentence executive summary: total savings opportunity, top category for consolidation, and recommended next step for category managers. Groups: ${JSON.stringify(items.map((g: any) => ({ cat: g.cat, sub: g.sub, totalSpend: g.totalSpend, entities: g.sources?.length, savings: g.savingsEst })))} Respond in plain text only.`
    };
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompts[stage] }] }) });
      const d = await r.json();
      setInsight(d.content?.map((b: any) => b.text || "").join("") || "");
    } catch (e) { setInsight("AI insight unavailable."); }
    setLoading(false);
  }
  return (
    <div style={{ background: "linear-gradient(135deg, #EBF5FF 0%, #f0fdf4 100%)", border: `1px solid ${C.maerskStar}33`, borderRadius: 10, padding: "14px 18px", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: C.maerskStar, display: "inline-block" }} />
        <span style={{ fontWeight: 700, fontSize: 12, color: C.maerskBlue, fontFamily: font.sans }}>AI Analyst</span>
        {loading && <Spinner />}
      </div>
      {insight && <p style={{ fontSize: 13, lineHeight: 1.6, color: C.maerskNavy, margin: 0, fontFamily: font.sans }}>{insight}</p>}
    </div>
  );
}

function Body({ children, style }: { children: any; style?: any }) {
  return <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 16px", ...style }}>{children}</p>;
}

// ── Demo Component ──
export default function Demo() {
  const [tab, setTab] = useState("classify");
  const classified = SPEND.map(i => ({ ...i, ...classifyItem(i) }));
  const reconciled = reconcileItems(classified);
  const consolidated = consolidateItems(reconciled);
  const totalSpend = SPEND.reduce((s, i) => s + i.amount, 0);
  const totalSavings = consolidated.reduce((s: number, g: any) => s + g.savingsEst, 0);
  const [key, setKey] = useState(0);

  return (
    <div style={{ background: C.white, border: `1px solid ${C.valtechBorder}`, borderRadius: 14, overflow: "hidden" }}>
      {/* demo header */}
      <div style={{ background: C.maerskNavy, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, fontFamily: font.sans }}>INTERACTIVE PROOF OF CONCEPT</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.white, fontFamily: font.sans, marginTop: 2 }}>Spend Intelligence Engine</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: font.sans }}>ITEMS</div><div style={{ fontSize: 18, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{SPEND.length}</div></div>
          <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: font.sans }}>SPEND</div><div style={{ fontSize: 18, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{fmt(totalSpend)}</div></div>
          <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: font.sans }}>EST. SAVINGS</div><div style={{ fontSize: 18, fontWeight: 800, color: C.success, fontFamily: font.sans }}>{fmt(totalSavings)}</div></div>
        </div>
      </div>
      {/* tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.valtechBorder}` }}>
        {([["classify", "1. Categorise"], ["reconcile", "2. Reconcile"], ["consolidate", "3. Consolidate"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => { setTab(k); setKey(p => p + 1); }} style={{ flex: 1, padding: "12px 0", border: "none", cursor: "pointer", fontFamily: font.sans, fontSize: 13, fontWeight: tab === k ? 700 : 500, color: tab === k ? C.maerskStar : C.valtechGray, background: tab === k ? C.maerskLight : "transparent", borderBottom: tab === k ? `2px solid ${C.maerskStar}` : "2px solid transparent", transition: "all 0.2s" }}>{l}</button>
        ))}
      </div>
      {/* content */}
      <div style={{ padding: "20px 24px", overflowX: "auto" }}>
        {tab === "classify" && (
          <>
            <Body style={{ marginBottom: 12 }}>Each spend description is semantically matched to a standardised UNSPSC-aligned category taxonomy — regardless of language, abbreviation, or entity-specific naming.</Body>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Description", "Entity", "Category", "Sub-category", "Confidence"].map(h => <th key={h} style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "8px 8px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 }}>{h}</th>)}</tr></thead>
              <tbody>
                {classified.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "8px", fontSize: 12, maxWidth: 200, fontFamily: font.sans }}>{r.desc}</td>
                    <td style={{ padding: "8px" }}><Badge color="gray">{r.source}</Badge></td>
                    <td style={{ padding: "8px", fontSize: 12, fontWeight: 600, fontFamily: font.sans, color: C.maerskNavy }}>{r.cat}</td>
                    <td style={{ padding: "8px", fontSize: 12, fontFamily: font.sans }}>{r.sub}</td>
                    <td style={{ padding: "8px" }}><ConfBar value={r.conf} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AIInsight key={"c" + key} items={classified} stage="classify" />
          </>
        )}
        {tab === "reconcile" && (
          <>
            <Body style={{ marginBottom: 12 }}>Items within the same category are checked for payment-code and material-code consistency. Mismatches highlight where acquired entities use different codes for identical items.</Body>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {([["matched", "green", reconciled.filter(r => r.reconStatus === "matched").length], ["partial", "amber", reconciled.filter(r => r.reconStatus === "partial").length], ["unmatched", "red", reconciled.filter(r => r.reconStatus === "unmatched").length]] as const).map(([l, c, n]) => (
                <Badge key={l} color={c}>{n} {l}</Badge>
              ))}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Description", "Category", "Pay Code", "Mat Code", "Status", "Suggested Fix"].map(h => <th key={h} style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "8px 8px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 }}>{h}</th>)}</tr></thead>
              <tbody>
                {reconciled.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "8px", fontSize: 12, maxWidth: 180, fontFamily: font.sans }}>{r.desc}</td>
                    <td style={{ padding: "8px", fontSize: 11, fontFamily: font.sans }}>{r.sub}</td>
                    <td style={{ padding: "8px" }}><span style={{ fontFamily: font.mono, fontSize: 11, color: r.payMismatch ? C.danger : C.success, fontWeight: 600 }}>{r.payCode}</span></td>
                    <td style={{ padding: "8px" }}><span style={{ fontFamily: font.mono, fontSize: 11, color: r.matMismatch ? C.danger : C.success, fontWeight: 600 }}>{r.matCode}</span></td>
                    <td style={{ padding: "8px" }}><Badge color={r.reconStatus === "matched" ? "green" : r.reconStatus === "partial" ? "amber" : "red"}>{r.reconStatus}</Badge></td>
                    <td style={{ padding: "8px", fontSize: 10, color: C.valtechGray, fontFamily: font.sans }}>{r.payMismatch ? `Pay → ${r.suggestedPayCode}` : ""}{r.payMismatch && r.matMismatch ? " · " : ""}{r.matMismatch ? `Mat → ${r.suggestedMatCode}` : ""}{!r.payMismatch && !r.matMismatch ? "—" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AIInsight key={"r" + key} items={reconciled} stage="reconcile" />
          </>
        )}
        {tab === "consolidate" && (
          <>
            <Body style={{ marginBottom: 12 }}>Spend is consolidated across all acquired entities to surface savings from supplier rationalisation and code standardisation.</Body>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Category", "Sub-category", "Total Spend", "Entities", "Pay Codes", "Mat Codes", "Est. Savings"].map(h => <th key={h} style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "8px 8px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 }}>{h}</th>)}</tr></thead>
              <tbody>
                {consolidated.map((g: any, i: number) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "8px", fontSize: 12, fontWeight: 600, fontFamily: font.sans, color: C.maerskNavy }}>{g.cat}</td>
                    <td style={{ padding: "8px", fontSize: 12, fontFamily: font.sans }}>{g.sub}</td>
                    <td style={{ padding: "8px", fontSize: 13, fontWeight: 700, fontFamily: font.sans }}>{fmt(g.totalSpend)}</td>
                    <td style={{ padding: "8px" }}><div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{g.sources.map((s: string, j: number) => <Badge key={j} color="gray">{s}</Badge>)}</div></td>
                    <td style={{ padding: "8px" }}>{g.codeRedPay !== "—" ? <Badge color="amber">{g.codeRedPay}</Badge> : <span style={{ fontSize: 11, color: C.success }}>✓</span>}</td>
                    <td style={{ padding: "8px" }}>{g.codeRedMat !== "—" ? <Badge color="amber">{g.codeRedMat}</Badge> : <span style={{ fontSize: 11, color: C.success }}>✓</span>}</td>
                    <td style={{ padding: "8px", fontSize: 13, fontWeight: 700, color: g.savingsEst > 0 ? C.success : C.valtechGray, fontFamily: font.sans }}>{g.savingsEst > 0 ? fmt(g.savingsEst) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 16, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontWeight: 700, color: "#166534", fontSize: 13, marginBottom: 4, fontFamily: font.sans }}>Consolidation Opportunity</div>
              <p style={{ fontSize: 13, color: "#166534", margin: 0, lineHeight: 1.6, fontFamily: font.sans }}>
                Across {SPEND.length} line items from {new Set(SPEND.map(d => d.source)).size} entities, AI identified {consolidated.length} sub-categories with <b>{fmt(totalSavings)}</b> in estimated consolidation savings ({(totalSavings / totalSpend * 100).toFixed(1)}% of addressable spend).
              </p>
            </div>
            <AIInsight key={"x" + key} items={consolidated} stage="consolidate" />
          </>
        )}
      </div>
    </div>
  );
}
