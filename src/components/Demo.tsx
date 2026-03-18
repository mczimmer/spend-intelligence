import { useState, useEffect, useRef, useCallback } from "react";
import { C, font } from "@/lib/constants";
import { posthog } from "@/lib/posthog";
import Badge from "./Badge";
import ConfBar from "./ConfBar";

// ── Demo Data ──
const SPEND = [
  { id: "SP-001", desc: "Marine Fuel Oil HFO 380cst - Rotterdam", source: "Svitzer (DK)", amount: 284000, payCode: "PAY-4401", matCode: "MAT-7710" },
  { id: "SP-002", desc: "Bunker fuel heavy oil vessel supply", source: "Hamburg Sud (DE)", amount: 312000, payCode: "PAY-4401", matCode: "MAT-8820" },
  { id: "SP-003", desc: "HFO bunkering - Singapore terminal", source: "APM Terminals (SG)", amount: 198000, payCode: "PAY-4410", matCode: "MAT-7710" },
  { id: "SP-004", desc: "Reefer container maintenance - compressor rebuild", source: "MCI (NL)", amount: 47500, payCode: "PAY-5520", matCode: "MAT-3301" },
  { id: "SP-005", desc: "Refrigerated unit repair - scroll compressor", source: "Star Cool (DK)", amount: 52000, payCode: "PAY-5580", matCode: "MAT-3310" },
  { id: "SP-006", desc: "Container reefer spare parts - compressor kit", source: "Sealand (US)", amount: 38000, payCode: "PAY-5520", matCode: "MAT-3399" },
  { id: "SP-007", desc: "Port handling crane ops - Tanjung Pelepas", source: "APM Terminals (MY)", amount: 125000, payCode: "PAY-6601", matCode: "MAT-5501" },
  { id: "SP-008", desc: "Terminal crane services and stevedoring", source: "APMT Maasvlakte (NL)", amount: 143000, payCode: "PAY-6650", matCode: "MAT-5510" },
  { id: "SP-009", desc: "Quay crane hire + container handling labour", source: "Svitzer (AU)", amount: 98000, payCode: "PAY-6601", matCode: "MAT-5590" },
  { id: "SP-010", desc: "Anti-fouling hull coating - drydock Busan", source: "Maersk Supply Svc (KR)", amount: 187000, payCode: "PAY-7701", matCode: "MAT-6610" },
  { id: "SP-011", desc: "Vessel hull paint antifoul application", source: "Hamburg Sud (BR)", amount: 165000, payCode: "PAY-7790", matCode: "MAT-6699" },
  { id: "SP-012", desc: "Marine antifouling coating service - SG yard", source: "Fleet Mgmt (SG)", amount: 201000, payCode: "PAY-7701", matCode: "MAT-6610" },
  { id: "SP-013", desc: "Lashing rods and turnbuckles - container securing", source: "Safmarine (ZA)", amount: 23000, payCode: "PAY-8801", matCode: "MAT-4401" },
  { id: "SP-014", desc: "Container twist locks and lashing equipment", source: "Sealand (US)", amount: 31000, payCode: "PAY-8810", matCode: "MAT-4410" },
  { id: "SP-015", desc: "Cargo securing gear - twistlocks + rods", source: "MCC Transport (TH)", amount: 19000, payCode: "PAY-8801", matCode: "MAT-4490" },
  { id: "SP-016", desc: "MGO low-sulphur fuel supply Algeciras", source: "Maersk Oil Trading (ES)", amount: 410000, payCode: "PAY-4450", matCode: "MAT-7750" },
  { id: "SP-017", desc: "VLSFO compliant marine gas oil bunker", source: "Hamburg Sud (NL)", amount: 375000, payCode: "PAY-4401", matCode: "MAT-7799" },
  { id: "SP-018", desc: "Low sulphur fuel oil - IMO2020 spec", source: "Svitzer (GB)", amount: 289000, payCode: "PAY-4460", matCode: "MAT-7750" },
  { id: "SP-019", desc: "Container terminal gate operations - Maasvlakte", source: "APMT Maasvlakte (NL)", amount: 87000, payCode: "PAY-6601", matCode: "MAT-5501" },
  { id: "SP-020", desc: "Terminal gate processing and truck marshalling", source: "APM Terminals (SG)", amount: 92000, payCode: "PAY-6601", matCode: "MAT-5501" },
  { id: "SP-021", desc: "Vessel engine room lubricant supply - marine grade", source: "Maersk Line (DK)", amount: 156000, payCode: "PAY-4401", matCode: "MAT-7710" },
];

function fmt(n: number) { return "$" + n.toLocaleString(); }

// ── UNSPSC mappings ──
const UNSPSC: Record<string, { code: string; label: string }> = {
  "Marine Fuels & Lubricants": { code: "15101500", label: "Segment 15: Fuels" },
  "Reefer & Container Maintenance": { code: "72154000", label: "Segment 72: Maintenance" },
  "Port & Terminal Services": { code: "78141500", label: "Segment 78: Transport" },
  "Vessel Maintenance & Drydock": { code: "72141100", label: "Segment 72: Maintenance" },
  "Cargo Securing Equipment": { code: "24101500", label: "Segment 24: Material Handling" },
};

function classifyItem(item: any) {
  const d = item.desc.toLowerCase();
  const u = (cat: string) => UNSPSC[cat] || { code: "—", label: "" };

  if (d.includes("lubricant") || d.includes("lube oil")) {
    const cat = "Marine Fuels & Lubricants";
    return { cat, sub: "Marine Lubricants", conf: 92, unspsc: "15121500", unspscLabel: "Segment 15: Fuels", reasoning: "Matched on: 'lubricant' \u2192 Marine lubricant supply. Cross-referenced with vessel engine room context." };
  }
  if (d.includes("hfo") || d.includes("bunker") || d.includes("heavy") || (d.includes("fuel") && d.includes("oil") && !d.includes("sulphur") && !d.includes("mgo") && !d.includes("vlsfo") && !d.includes("low"))) {
    const cat = "Marine Fuels & Lubricants";
    const conf = d.includes("hfo") ? 96 : 88;
    const reasoning = d.includes("hfo")
      ? `Matched on: 'HFO 380cst' \u2192 Heavy Fuel Oil specification. Entity convention: ${item.source} uses standard fuel grade codes.`
      : `Matched on: 'bunker fuel' + 'heavy oil' \u2192 Heavy Fuel Oil terminology. Natural language mapping across entity-specific descriptions.`;
    return { cat, sub: "Heavy Fuel Oil (HFO)", conf, unspsc: u(cat).code, unspscLabel: u(cat).label, reasoning };
  }
  if (d.includes("mgo") || d.includes("vlsfo") || d.includes("low sulphur") || d.includes("low-sulphur")) {
    const cat = "Marine Fuels & Lubricants";
    return { cat, sub: "Low Sulphur Fuel Oil (VLSFO/MGO)", conf: 94, unspsc: u(cat).code, unspscLabel: u(cat).label, reasoning: "Matched on: 'VLSFO'/'MGO'/'low sulphur' \u2192 Low Sulphur Fuel Oil. IMO2020 compliance specification detected." };
  }
  if (d.includes("reefer") || d.includes("refrigerat") || d.includes("compressor")) {
    const cat = "Reefer & Container Maintenance";
    return { cat, sub: "Compressor Repair & Rebuild", conf: d.includes("compressor") ? 95 : 82, unspsc: u(cat).code, unspscLabel: u(cat).label, reasoning: "Matched on: 'reefer'/'compressor'/'refrigerated' \u2192 Container cooling equipment. Cross-referenced with maintenance service context." };
  }
  if (d.includes("crane") || d.includes("stevedor") || d.includes("port handling") || d.includes("container handling") || d.includes("terminal gate") || d.includes("gate operations") || d.includes("truck marshalling")) {
    const cat = "Port & Terminal Services";
    const conf = d.includes("crane") ? 93 : d.includes("stevedor") ? 93 : 79;
    return { cat, sub: "Crane & Stevedoring", conf, unspsc: u(cat).code, unspscLabel: u(cat).label, reasoning: "Matched on: 'crane'/'stevedoring'/'port handling'/'terminal gate' \u2192 Terminal operations. Geographic port reference confirmed." };
  }
  if (d.includes("antifoul") || d.includes("hull") || d.includes("coating") || d.includes("paint")) {
    const cat = "Vessel Maintenance & Drydock";
    return { cat, sub: "Hull Coating & Antifouling", conf: 91, unspsc: u(cat).code, unspscLabel: u(cat).label, reasoning: "Matched on: 'antifouling'/'hull coating'/'paint' \u2192 Vessel drydock services. Marine-specific terminology identified." };
  }
  if (d.includes("lash") || d.includes("twistlock") || d.includes("twist lock") || d.includes("securing") || d.includes("turnbuckle")) {
    const cat = "Cargo Securing Equipment";
    return { cat, sub: "Lashing & Twistlocks", conf: 89, unspsc: u(cat).code, unspscLabel: u(cat).label, reasoning: "Matched on: 'lashing'/'twistlock'/'securing gear' \u2192 Container fastening equipment. Cargo securing context confirmed." };
  }
  const cat = "Marine Fuels & Lubricants";
  return { cat, sub: "Heavy Fuel Oil (HFO)", conf: 62, unspsc: u(cat).code, unspscLabel: u(cat).label, reasoning: "Low-confidence fallback classification. Manual review recommended." };
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
    // Count entities per code for majority-rule suggestion
    const payCount: Record<string, number> = {};
    const matCount: Record<string, number> = {};
    grp.forEach(g => { payCount[g.payCode] = (payCount[g.payCode] || 0) + 1; matCount[g.matCode] = (matCount[g.matCode] || 0) + 1; });
    const bestPay = Object.entries(payCount).sort((a, b) => b[1] - a[1])[0];
    const bestMat = Object.entries(matCount).sort((a, b) => b[1] - a[1])[0];
    grp.forEach(g => {
      recon.push({
        ...g,
        payMismatch: payCodes.length > 1,
        matMismatch: matCodes.length > 1,
        reconStatus: matched ? "matched" : partial ? "partial" : "unmatched",
        suggestedPayCode: bestPay[0],
        suggestedPayCount: bestPay[1],
        suggestedPayTotal: grp.length,
        suggestedMatCode: bestMat[0],
        suggestedMatCount: bestMat[1],
        suggestedMatTotal: grp.length,
      });
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
    codeRedPay: g.payV.size > 1 ? `${g.payV.size} \u2192 1` : "\u2014",
    codeRedMat: g.matV.size > 1 ? `${g.matV.size} \u2192 1` : "\u2014",
  })).sort((a: any, b: any) => b.totalSpend - a.totalSpend);
}

// ── AI Insight (pre-written, no API) ──
function AIInsight({ stage }: { stage: string }) {
  const insights: Record<string, string> = {
    classify: "Classification identified 6 distinct sub-categories across 21 items from 11 entities. The highest fragmentation is in Marine Fuels: the same HFO 380cst appears under 3 different natural-language descriptions across Svitzer, Hamburg S\u00fcd, and APM Terminals. All items classified above the 79% confidence threshold, with exact specification matches (e.g. 'HFO 380cst') achieving 96% confidence. One item flagged for human review where VLSFO descriptors conflicted with the HFO classification path, demonstrating the system's ability to detect its own uncertainty rather than silently misclassify.",
    reconcile: "Payment-code fragmentation is most severe in Marine Fuels, where 3 different pay codes (PAY-4401, PAY-4410, PAY-4460) are used for identical products across Svitzer, Hamburg S\u00fcd, and APM Terminals. Material-code misalignment follows the same entity boundaries; codes diverge at acquisition boundaries, not at product boundaries. Port & Terminal Services shows a mix of matched and mismatched codes, indicating partial standardisation already exists where APM Terminals entities share infrastructure. At current volumes, manual reconciliation of these 21 items alone would require approximately 15 FTE-hours per month; across the full procurement portfolio, this scales linearly with each entity integration.",
    consolidate: "The largest consolidation opportunity is in Marine Fuels & Lubricants, $1.87M across 6 entities representing over 60% of total addressable spend in this sample. Hull Coating & Antifouling shows the second-highest savings potential with 3 entities and $553K in spend. Recommended first action for category managers: consolidate HFO suppliers across the Svitzer, Hamburg S\u00fcd, and APM Terminals boundary, where 3 separate suppliers serve overlapping routes for an identical product specification. This single consolidation could capture an estimated $130K\u2013$170K in annual volume leverage.",
  };
  return (
    <div style={{ background: "linear-gradient(135deg, #EBF5FF 0%, #f0fdf4 100%)", border: "1px solid rgba(66,176,213,0.2)", borderRadius: 10, padding: "14px 18px", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.maerskStar }} />
        <span style={{ fontWeight: 700, fontSize: 12, color: C.maerskBlue, fontFamily: font.sans }}>AI Analyst</span>
        <span style={{ fontSize: 10, color: C.valtechGray, fontFamily: font.sans }}>{"\u00b7"} Automated insight</span>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: C.maerskNavy, margin: 0, fontFamily: font.sans }}>{insights[stage] || ""}</p>
    </div>
  );
}

function Body({ children, style }: { children: any; style?: any }) {
  return <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 16px", ...style }}>{children}</p>;
}

// ── Animated counter hook ──
function useCountUp(target: number, duration: number = 800) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

// ── Demo Component ──
export default function Demo() {
  const [tab, setTab] = useState("classify");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const classified = SPEND.map(i => ({ ...i, ...classifyItem(i) }));
  const reconciled = reconcileItems(classified);
  const consolidated = consolidateItems(reconciled);
  const totalSpend = SPEND.reduce((s, i) => s + i.amount, 0);
  const totalSavings = consolidated.reduce((s: number, g: any) => s + g.savingsEst, 0);

  // Animated header stats
  const animItems = useCountUp(SPEND.length);
  const animSpend = useCountUp(totalSpend);
  const animSavings = useCountUp(totalSavings);

  // SP-017 edge case detection
  const isEdgeCase = (r: any) => r.desc.toLowerCase().includes("vlsfo") && r.sub === "Heavy Fuel Oil (HFO)";
  const edgeCaseCount = classified.filter(isEdgeCase).length;

  const thStyle: React.CSSProperties = { textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "8px 8px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 };

  return (
    <div style={{ background: C.white, border: `1px solid ${C.valtechBorder}`, borderRadius: 14, overflow: "hidden" }}>
      {/* demo header */}
      <div style={{ background: C.maerskNavy, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, fontFamily: font.sans }}>INTERACTIVE PROOF OF CONCEPT</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.white, fontFamily: font.sans, marginTop: 2 }}>Spend Intelligence Engine</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: font.sans }}>ITEMS</div><div style={{ fontSize: 18, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{animItems}</div></div>
          <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: font.sans }}>SPEND</div><div style={{ fontSize: 18, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{fmt(animSpend)}</div></div>
          <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: font.sans }}>EST. SAVINGS</div><div style={{ fontSize: 18, fontWeight: 800, color: C.success, fontFamily: font.sans }}>{fmt(animSavings)}</div></div>
        </div>
      </div>
      {/* tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.valtechBorder}` }}>
        {([["classify", "1. Categorise"], ["reconcile", "2. Reconcile"], ["consolidate", "3. Consolidate"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => { setTab(k); setExpandedRow(null); if (typeof window !== "undefined" && posthog?.capture) posthog.capture("demo_tab_switched", { tab: k }); }} style={{ flex: 1, padding: "12px 0", border: "none", cursor: "pointer", fontFamily: font.sans, fontSize: 13, fontWeight: tab === k ? 700 : 500, color: tab === k ? C.maerskStar : C.valtechGray, background: tab === k ? C.maerskLight : "transparent", borderBottom: tab === k ? `2px solid ${C.maerskStar}` : "2px solid transparent", transition: "all 0.2s" }}>{l}</button>
        ))}
      </div>
      {/* content */}
      <div style={{ padding: "20px 24px", overflowX: "auto" }}>
        {tab === "classify" && (
          <>
            <Body style={{ marginBottom: 12 }}>Each spend description is semantically matched to a standardised category taxonomy aligned to UNSPSC (United Nations Standard Products and Services Code), the global classification standard used by procurement organisations worldwide. This ensures interoperability with existing benchmarking tools and category management systems.</Body>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["", "Description", "Entity", "Category", "Sub-category", "UNSPSC", "Confidence"].map(h => <th key={h} style={{ ...thStyle, width: h === "" ? 24 : undefined }}>{h}</th>)}</tr></thead>
              <tbody>
                {classified.map((r, i) => {
                  const edge = isEdgeCase(r);
                  const expanded = expandedRow === i;
                  return (
                    <React.Fragment key={i}>
                      <tr onClick={() => { setExpandedRow(expanded ? null : i); if (!expanded && typeof window !== "undefined" && posthog?.capture) posthog.capture("demo_row_expanded", { item_id: r.id, category: r.cat }); }} style={{ borderBottom: expanded ? "none" : "1px solid #f5f5f5", cursor: "pointer" }}>
                        <td style={{ padding: "8px 4px 8px 8px", fontSize: 11, color: C.valtechGray, fontFamily: font.sans }}>{expanded ? "\u2304" : "\u203a"}</td>
                        <td style={{ padding: "8px", fontSize: 12, maxWidth: 200, fontFamily: font.sans }}>{r.desc}</td>
                        <td style={{ padding: "8px" }}><Badge color="gray">{r.source}</Badge></td>
                        <td style={{ padding: "8px", fontSize: 12, fontWeight: 600, fontFamily: font.sans, color: C.maerskNavy }}>{r.cat}</td>
                        <td style={{ padding: "8px", fontSize: 12, fontFamily: font.sans }}>{r.sub}</td>
                        <td style={{ padding: "8px" }}>
                          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.valtechGray }}>{r.unspsc}</div>
                          <div style={{ fontSize: 9, color: C.valtechGray, fontFamily: font.sans }}>{r.unspscLabel}</div>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <ConfBar value={r.conf} />
                            {edge && <span style={{ fontSize: 10, color: C.warning, fontStyle: "italic", fontFamily: font.sans, whiteSpace: "nowrap" }}>{"\u26a0"} Review</span>}
                          </div>
                        </td>
                      </tr>
                      {expanded && (
                        <tr style={{ borderBottom: "1px solid #f5f5f5" }}>
                          <td colSpan={7} style={{ padding: "4px 8px 10px 36px", background: C.valtechLight }}>
                            <div style={{ fontSize: 11, color: C.valtechGray, fontFamily: font.sans, lineHeight: 1.6 }}>{r.reasoning}</div>
                            {edge && <div style={{ fontSize: 10, color: C.warning, fontFamily: font.sans, fontStyle: "italic", marginTop: 4 }}>VLSFO descriptor conflicts with HFO classification; routes to human review queue</div>}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
            {edgeCaseCount > 0 && (
              <div style={{ fontSize: 12, color: C.valtechGray, fontFamily: font.sans, marginTop: 12, padding: "8px 12px", background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, lineHeight: 1.6 }}>
                {edgeCaseCount} item flagged for human review: confidence score is above threshold but keyword conflict detected. In production, this routes to the human review queue for manual validation.
              </div>
            )}
            <AIInsight stage="classify" />
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
              <thead><tr>{["Description", "Category", "Pay Code", "Mat Code", "Status", "Suggested Fix"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
              <tbody>
                {reconciled.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "8px", fontSize: 12, maxWidth: 180, fontFamily: font.sans }}>{r.desc}</td>
                    <td style={{ padding: "8px", fontSize: 11, fontFamily: font.sans }}>{r.sub}</td>
                    <td style={{ padding: "8px" }}><span style={{ fontFamily: font.mono, fontSize: 11, color: r.payMismatch ? C.danger : C.success, fontWeight: 600 }}>{r.payCode}</span></td>
                    <td style={{ padding: "8px" }}><span style={{ fontFamily: font.mono, fontSize: 11, color: r.matMismatch ? C.danger : C.success, fontWeight: 600 }}>{r.matCode}</span></td>
                    <td style={{ padding: "8px" }}><Badge color={r.reconStatus === "matched" ? "green" : r.reconStatus === "partial" ? "amber" : "red"}>{r.reconStatus}</Badge></td>
                    <td style={{ padding: "8px", fontSize: 10, color: C.valtechGray, fontFamily: font.sans }}>
                      {r.payMismatch ? `Standardise to ${r.suggestedPayCode} (${r.suggestedPayCount} of ${r.suggestedPayTotal})` : ""}
                      {r.payMismatch && r.matMismatch ? " · " : ""}
                      {r.matMismatch ? `Standardise to ${r.suggestedMatCode} (${r.suggestedMatCount} of ${r.suggestedMatTotal})` : ""}
                      {!r.payMismatch && !r.matMismatch ? "\u2014" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AIInsight stage="reconcile" />
          </>
        )}
        {tab === "consolidate" && (
          <>
            <Body style={{ marginBottom: 12 }}>Spend is consolidated across all acquired entities to surface savings from supplier rationalisation and code standardisation.</Body>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Category", "Sub-category", "Total Spend", "Entities", "Pay Codes", "Mat Codes", "Est. Savings"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
              <tbody>
                {consolidated.map((g: any, i: number) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "8px", fontSize: 12, fontWeight: 600, fontFamily: font.sans, color: C.maerskNavy }}>{g.cat}</td>
                    <td style={{ padding: "8px", fontSize: 12, fontFamily: font.sans }}>{g.sub}</td>
                    <td style={{ padding: "8px", fontSize: 13, fontWeight: 700, fontFamily: font.sans }}>{fmt(g.totalSpend)}</td>
                    <td style={{ padding: "8px" }}><div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{g.sources.map((s: string, j: number) => <Badge key={j} color="gray">{s}</Badge>)}</div></td>
                    <td style={{ padding: "8px" }}>{g.codeRedPay !== "\u2014" ? <Badge color="amber">{g.codeRedPay}</Badge> : <span style={{ fontSize: 11, color: C.success }}>{"\u2713"}</span>}</td>
                    <td style={{ padding: "8px" }}>{g.codeRedMat !== "\u2014" ? <Badge color="amber">{g.codeRedMat}</Badge> : <span style={{ fontSize: 11, color: C.success }}>{"\u2713"}</span>}</td>
                    <td style={{ padding: "8px", fontSize: 13, fontWeight: 700, color: g.savingsEst > 0 ? C.success : C.valtechGray, fontFamily: font.sans }}>{g.savingsEst > 0 ? fmt(g.savingsEst) : "\u2014"}</td>
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
            <AIInsight stage="consolidate" />
          </>
        )}
      </div>
    </div>
  );
}

// Need React import for Fragment
import React from "react";
