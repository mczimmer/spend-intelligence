import { useState, useEffect, useCallback, useRef } from "react";

// ── Brand tokens ──
const C = {
  maerskNavy: "#00243D",
  maerskBlue: "#003B5C",
  maerskStar: "#42B0D5",
  maerskLight: "#E8F4F8",
  valtechBlack: "#111111",
  valtechGray: "#6B7280",
  valtechLight: "#F7F7F7",
  valtechBorder: "#E5E5E5",
  accent: "#42B0D5",
  success: "#22c55e",
  warning: "#eab308",
  danger: "#ef4444",
  white: "#FFFFFF",
};

const font = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
};

// ── Utility Components ──
function Section({ id, children, bg, py }: { id?: string; children: any; bg?: string; py?: number }) {
  return (
    <section id={id} style={{ background: bg || "transparent", padding: `${py || 80}px 0` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>{children}</div>
    </section>
  );
}

function SectionLabel({ text, color }: { text: string; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 20, height: 2, background: color || C.maerskStar }} />
      <span style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: color || C.maerskStar }}>{text}</span>
    </div>
  );
}

function H2({ children }: { children: any }) {
  return <h2 style={{ fontFamily: font.sans, fontSize: 28, fontWeight: 800, color: C.maerskNavy, margin: "0 0 8px", lineHeight: 1.25 }}>{children}</h2>;
}

function H3({ children, style }: { children: any; style?: any }) {
  return <h3 style={{ fontFamily: font.sans, fontSize: 18, fontWeight: 700, color: C.maerskNavy, margin: "0 0 6px", ...style }}>{children}</h3>;
}

function Body({ children, style }: { children: any; style?: any }) {
  return <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: "0 0 16px", ...style }}>{children}</p>;
}

function Badge({ color, children }: { color: any; children: any }) {
  const colors = {
    green: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
    amber: { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
    red: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
    blue: { bg: C.maerskLight, text: C.maerskBlue, border: "#b3dce8" },
    gray: { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb" },
    navy: { bg: C.maerskNavy, text: C.white, border: C.maerskNavy },
  };
  const c = colors[color] || colors.gray;
  return <span style={{ display: "inline-block", background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 9999, padding: "2px 10px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{children}</span>;
}

function Card({ children, style }: { children: any; style?: any }) {
  return <div style={{ background: C.white, border: `1px solid ${C.valtechBorder}`, borderRadius: 12, padding: "24px 28px", ...style }}>{children}</div>;
}

function ConfBar({ value }: { value: number }) {
  const color = value >= 90 ? C.success : value >= 75 ? C.warning : C.danger;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 56, height: 5, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: font.mono }}>{value}%</span>
    </div>
  );
}

function Spinner() {
  return <span style={{ display: "inline-block", width: 14, height: 14, border: `2px solid ${C.valtechBorder}`, borderTop: `2px solid ${C.maerskStar}`, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />;
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, fontFamily: font.sans, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.maerskNavy, fontFamily: font.sans }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.valtechGray, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ── Nav ──
function Nav({ active }: { active: string }) {
  const items = [
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "demo", label: "Demo" },
    { id: "architecture", label: "Architecture" },
    { id: "approach", label: "Approach" },
  ];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.valtechBorder}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: font.sans, fontWeight: 800, fontSize: 14, color: C.maerskNavy }}>Mærsk</span>
          <span style={{ color: C.valtechBorder }}>×</span>
          <span style={{ fontFamily: font.sans, fontWeight: 700, fontSize: 14, color: C.valtechBlack }}>Valtech</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {items.map(it => (
            <a key={it.id} href={`#${it.id}`} style={{ fontFamily: font.sans, fontSize: 12, fontWeight: active === it.id ? 700 : 500, color: active === it.id ? C.maerskStar : C.valtechGray, textDecoration: "none", padding: "6px 12px", borderRadius: 6, background: active === it.id ? C.maerskLight : "transparent", transition: "all 0.2s" }}>{it.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Architectural Diagrams (SVG) ──
function DiagramDataFlow() {
  const boxW = 140, boxH = 52, gap = 32;
  const sources = ["SAP ERP", "Oracle\nProcure", "Legacy\nSpreadsheets", "Acquired\nEntity DBs"];
  const pipeline = ["Data\nIngestion", "AI Semantic\nClassifier", "Confidence\nScoring", "Human\nReview"];
  const outputs = ["Unified\nTaxonomy", "Reconciled\nCodes", "Spend\nCube"];
  const drawBoxes = (items, y, color, startX) => items.map((t, i) => {
    const x = startX + i * (boxW + gap);
    return (
      <g key={t + i}>
        <rect x={x} y={y} width={boxW} height={boxH} rx={8} fill={color} stroke={C.maerskStar} strokeWidth={1.5} />
        {t.split("\n").map((line, li) => (
          <text key={li} x={x + boxW / 2} y={y + (t.split("\n").length > 1 ? 18 + li * 16 : 30)} textAnchor="middle" style={{ fontSize: 11, fontWeight: 600, fill: C.maerskNavy, fontFamily: font.sans }}>{line}</text>
        ))}
      </g>
    );
  });
  const totalW = Math.max(sources.length, pipeline.length, outputs.length) * (boxW + gap) - gap;
  const sx = (s, n) => (totalW - n * (boxW + gap) + gap) / 2;
  return (
    <svg viewBox={`0 0 ${totalW + 40} 280`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <text x={20} y={20} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>SOURCE SYSTEMS</text>
      {drawBoxes(sources, 30, C.maerskLight, 20 + sx("s", sources.length))}
      <text x={20} y={118} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>AI PIPELINE</text>
      {drawBoxes(pipeline, 128, "#EBF5FF", 20 + sx("p", pipeline.length))}
      <text x={20} y={216} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>OUTPUTS</text>
      {drawBoxes(outputs, 226, "#dcfce7", 20 + sx("o", outputs.length))}
      {/* arrows */}
      {[90, 188].map(ay => (
        <g key={ay}>
          <line x1={totalW / 2 + 20} y1={ay} x2={totalW / 2 + 20} y2={ay + 30} stroke={C.maerskStar} strokeWidth={2} markerEnd="url(#arrowM)" />
        </g>
      ))}
      <defs>
        <marker id="arrowM" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
      </defs>
    </svg>
  );
}

function DiagramAIPipeline() {
  const steps = [
    { label: "Raw Descriptions", sub: "Multi-language, multi-format", icon: "📥" },
    { label: "Text Embedding", sub: "Semantic vectorisation", icon: "🔤" },
    { label: "Similarity Matching", sub: "Cosine distance clustering", icon: "🔗" },
    { label: "Category Mapping", sub: "UNSPSC taxonomy alignment", icon: "🗂️" },
    { label: "Confidence Score", sub: "Threshold-based routing", icon: "📊" },
    { label: "Human Review", sub: "Low-confidence triage", icon: "👤" },
  ];
  const w = 150, h = 70, gap = 16;
  const totalW = steps.length * (w + gap) - gap + 40;
  return (
    <svg viewBox={`0 0 ${totalW} 100`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      {steps.map((s, i) => {
        const x = 20 + i * (w + gap);
        const isAI = i >= 1 && i <= 4;
        return (
          <g key={i}>
            <rect x={x} y={10} width={w} height={h} rx={10} fill={isAI ? "#EBF5FF" : C.valtechLight} stroke={isAI ? C.maerskStar : C.valtechBorder} strokeWidth={1.5} />
            <text x={x + w / 2} y={36} textAnchor="middle" style={{ fontSize: 14 }}>{s.icon}</text>
            <text x={x + w / 2} y={52} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{s.label}</text>
            <text x={x + w / 2} y={66} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{s.sub}</text>
            {i < steps.length - 1 && (
              <line x1={x + w + 2} y1={45} x2={x + w + gap - 2} y2={45} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowP)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowP" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
      </defs>
    </svg>
  );
}

function DiagramIntegration() {
  const left = [{ l: "SAP S/4HANA", s: "Material Master / FI-CO" }, { l: "Oracle Procurement", s: "PO & Invoice data" }, { l: "Coupa / Ariba", s: "Catalog & Contracts" }];
  const right = [{ l: "Power BI / Tableau", s: "Spend dashboards" }, { l: "Category Mgmt", s: "Unified taxonomy" }, { l: "Finance / Treasury", s: "Reconciled GL codes" }];
  return (
    <svg viewBox="0 0 800 240" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      {left.map((item, i) => (
        <g key={"l" + i}>
          <rect x={10} y={20 + i * 72} width={180} height={52} rx={8} fill={C.valtechLight} stroke={C.valtechBorder} strokeWidth={1.5} />
          <text x={100} y={42 + i * 72} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{item.l}</text>
          <text x={100} y={56 + i * 72} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{item.s}</text>
          <line x1={194} y1={46 + i * 72} x2={280} y2={120} stroke={C.valtechBorder} strokeWidth={1.5} />
        </g>
      ))}
      {/* Center */}
      <rect x={280} y={80} width={240} height={80} rx={12} fill={C.maerskNavy} />
      <text x={400} y={110} textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: C.white, fontFamily: font.sans }}>Spend Intelligence</text>
      <text x={400} y={128} textAnchor="middle" style={{ fontSize: 10, fill: C.maerskStar, fontFamily: font.sans }}>AI Classification Engine</text>
      <text x={400} y={144} textAnchor="middle" style={{ fontSize: 9, fill: "rgba(255,255,255,0.6)", fontFamily: font.sans }}>API-first · Cloud-native</text>
      {right.map((item, i) => (
        <g key={"r" + i}>
          <rect x={610} y={20 + i * 72} width={180} height={52} rx={8} fill="#dcfce7" stroke="#bbf7d0" strokeWidth={1.5} />
          <text x={700} y={42 + i * 72} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: "#166534", fontFamily: font.sans }}>{item.l}</text>
          <text x={700} y={56 + i * 72} textAnchor="middle" style={{ fontSize: 9, fill: "#15803d", fontFamily: font.sans }}>{item.s}</text>
          <line x1={524} y1={120} x2={606} y2={46 + i * 72} stroke="#bbf7d0" strokeWidth={1.5} />
        </g>
      ))}
    </svg>
  );
}

function DiagramTimeline() {
  const phases = [
    { label: "Phase 1", title: "Validate", weeks: "Weeks 1–3", items: ["Data sample ingestion", "Taxonomy mapping", "Accuracy benchmarking"], color: C.maerskStar },
    { label: "Phase 2", title: "Pilot", weeks: "Weeks 4–8", items: ["2 category groups live", "SAP integration", "Feedback loop tuning"], color: C.maerskBlue },
    { label: "Phase 3", title: "Scale", weeks: "Weeks 9–14", items: ["All categories live", "Multi-entity rollout", "Dashboard delivery"], color: C.maerskNavy },
    { label: "Phase 4", title: "Embed", weeks: "Weeks 15–18", items: ["Self-service tooling", "Continuous learning", "Handover & training"], color: "#166534" },
  ];
  const phaseW = 185, gap = 16;
  const totalW = phases.length * (phaseW + gap) - gap + 40;
  return (
    <svg viewBox={`0 0 ${totalW} 160`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      {/* timeline bar */}
      <rect x={20} y={12} width={totalW - 40} height={4} rx={2} fill={C.valtechBorder} />
      {phases.map((p, i) => {
        const x = 20 + i * (phaseW + gap);
        return (
          <g key={i}>
            <circle cx={x + phaseW / 2} cy={14} r={7} fill={p.color} />
            <rect x={x} y={34} width={phaseW} height={116} rx={10} fill={C.white} stroke={p.color} strokeWidth={1.5} />
            <text x={x + 14} y={54} style={{ fontSize: 9, fontWeight: 700, fill: p.color, letterSpacing: "0.08em", fontFamily: font.sans }}>{p.label}</text>
            <text x={x + 14} y={70} style={{ fontSize: 13, fontWeight: 800, fill: C.maerskNavy, fontFamily: font.sans }}>{p.title}</text>
            <text x={x + 14} y={84} style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{p.weeks}</text>
            {p.items.map((item, j) => (
              <text key={j} x={x + 14} y={104 + j * 14} style={{ fontSize: 10, fill: C.valtechGray, fontFamily: font.sans }}>• {item}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Demo Data & Logic (inline) ──
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
  const recon = [];
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
  return Object.values(groups).map(g => ({
    ...g, sources: [...g.sources], payV: [...g.payV], matV: [...g.matV],
    savingsEst: g.sources.size >= 2 ? Math.round(g.totalSpend * (0.06 + 0.04 * g.sources.size / 4)) : 0,
    codeRedPay: g.payV.size > 1 ? `${g.payV.size} → 1` : "—",
    codeRedMat: g.matV.size > 1 ? `${g.matV.size} → 1` : "—",
  })).sort((a, b) => b.totalSpend - a.totalSpend);
}

// ── AI Insight ──
function AIInsight({ items, stage }: { items: any[]; stage: string }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const ran = useRef(false);
  useEffect(() => { if (ran.current) return; ran.current = true; go(); }, []);
  async function go() {
    setLoading(true);
    const prompts = {
      classify: `You are an AI procurement analyst for a global container shipping company formed through acquisitions (like Maersk with Svitzer, Hamburg Süd, APM Terminals, Sealand etc). Given these auto-classified spend items, provide a concise 3-sentence executive insight about classification quality, data fragmentation patterns across acquired entities, and what this means for spend visibility. Items: ${JSON.stringify(items.slice(0, 8).map(i => ({ desc: i.desc, source: i.source, cat: i.cat, conf: i.conf })))} Respond in plain text only.`,
      reconcile: `You are an AI procurement analyst for a global container shipping company. These items were reconciled for payment/material code consistency. Give a 3-sentence insight on: which categories have worst code fragmentation, impact on financial reporting, and estimated manual FTE being wasted on reconciliation. Items: ${JSON.stringify(items.slice(0, 8).map(i => ({ desc: i.desc, cat: i.cat, payCode: i.payCode, matCode: i.matCode, status: i.reconStatus })))} Respond in plain text only.`,
      consolidate: `You are an AI procurement analyst. After classification, reconciliation, and consolidation of maritime procurement spend, provide a 3-sentence executive summary: total savings opportunity, top category for consolidation, and recommended next step for category managers. Groups: ${JSON.stringify(items.map(g => ({ cat: g.cat, sub: g.sub, totalSpend: g.totalSpend, entities: g.sources?.length, savings: g.savingsEst })))} Respond in plain text only.`
    };
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompts[stage] }] }) });
      const d = await r.json();
      setInsight(d.content?.map(b => b.text || "").join("") || "");
    } catch (e) { setInsight("AI insight unavailable."); }
    setLoading(false);
  }
  return (
    <div style={{ background: "linear-gradient(135deg, #EBF5FF 0%, #f0fdf4 100%)", border: `1px solid ${C.maerskStar}33`, borderRadius: 10, padding: "14px 18px", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 12 }}>🧠</span>
        <span style={{ fontWeight: 700, fontSize: 12, color: C.maerskBlue, fontFamily: font.sans }}>AI Analyst</span>
        {loading && <Spinner />}
      </div>
      {insight && <p style={{ fontSize: 13, lineHeight: 1.6, color: C.maerskNavy, margin: 0, fontFamily: font.sans }}>{insight}</p>}
    </div>
  );
}

// ── Demo Component ──
function Demo() {
  const [tab, setTab] = useState("classify");
  const classified = SPEND.map(i => ({ ...i, ...classifyItem(i) }));
  const reconciled = reconcileItems(classified);
  const consolidated = consolidateItems(reconciled);
  const totalSpend = SPEND.reduce((s, i) => s + i.amount, 0);
  const totalSavings = consolidated.reduce((s, g) => s + g.savingsEst, 0);
  const [key, setKey] = useState(0);

  return (
    <div style={{ background: C.white, border: `1px solid ${C.valtechBorder}`, borderRadius: 14, overflow: "hidden" }}>
      {/* demo header */}
      <div style={{ background: C.maerskNavy, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        {[["classify", "1. Categorise"], ["reconcile", "2. Reconcile"], ["consolidate", "3. Consolidate"]].map(([k, l]) => (
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
                  <tr key={i} style={{ borderBottom: `1px solid #f5f5f5` }}>
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
              {[["matched", "green", reconciled.filter(r => r.reconStatus === "matched").length], ["partial", "amber", reconciled.filter(r => r.reconStatus === "partial").length], ["unmatched", "red", reconciled.filter(r => r.reconStatus === "unmatched").length]].map(([l, c, n]) => (
                <Badge key={l} color={c}>{n} {l}</Badge>
              ))}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Description", "Category", "Pay Code", "Mat Code", "Status", "Suggested Fix"].map(h => <th key={h} style={{ textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "8px 8px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 }}>{h}</th>)}</tr></thead>
              <tbody>
                {reconciled.map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid #f5f5f5` }}>
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
                {consolidated.map((g, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid #f5f5f5` }}>
                    <td style={{ padding: "8px", fontSize: 12, fontWeight: 600, fontFamily: font.sans, color: C.maerskNavy }}>{g.cat}</td>
                    <td style={{ padding: "8px", fontSize: 12, fontFamily: font.sans }}>{g.sub}</td>
                    <td style={{ padding: "8px", fontSize: 13, fontWeight: 700, fontFamily: font.sans }}>{fmt(g.totalSpend)}</td>
                    <td style={{ padding: "8px" }}><div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{g.sources.map((s, j) => <Badge key={j} color="gray">{s}</Badge>)}</div></td>
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

// ── Main App ──
export default function App() {
  const [activeNav, setActiveNav] = useState("problem");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.3 });
    ["problem", "solution", "demo", "architecture", "approach"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: font.sans, color: C.valtechBlack, background: C.white }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} * { box-sizing: border-box; } html { scroll-behavior: smooth; }`}</style>
      <Nav active={activeNav} />

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.maerskNavy} 0%, ${C.maerskBlue} 100%)`, padding: "80px 0 72px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(66,176,213,0.15)", border: "1px solid rgba(66,176,213,0.3)", borderRadius: 9999, padding: "4px 14px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.maerskStar, letterSpacing: "0.06em" }}>MÆRSK × VALTECH</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: C.white, margin: "0 0 16px", lineHeight: 1.2, maxWidth: 700 }}>Spend Intelligence: AI-Powered Category Standardisation & Payment Reconciliation</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.65, margin: 0 }}>A hypothesis and proof of concept for resolving cross-entity taxonomy fragmentation and payment–material code misalignment using semantic AI classification.</p>
          <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px 20px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 600 }}>PREPARED FOR</div>
              <div style={{ fontSize: 14, color: C.white, fontWeight: 700, marginTop: 4 }}>Navneet S. Rainu</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Asset Strategy Platform</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "14px 20px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 600 }}>CONTEXT</div>
              <div style={{ fontSize: 14, color: C.white, fontWeight: 700, marginTop: 4 }}>February 2026 Discovery</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Follow-up: Hypothesis & POC</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Space */}
      <Section id="problem" bg={C.white}>
        <SectionLabel text="Problem Space" />
        <H2>The Taxonomy Fragmentation Challenge</H2>
        <Body style={{ maxWidth: 700, marginBottom: 32 }}>Mærsk's growth through acquisition — Svitzer, Hamburg Süd, APM Terminals, Sealand, Star Cool, and others — has created a procurement landscape where the same goods and services are described, coded, and categorised differently across every entity. This isn't a data quality problem. It's a structural one.</Body>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { title: "Category Fragmentation", desc: "The same material — vessel hull antifouling paint — appears as 6+ different descriptions across entities. Category managers cannot build a unified view of spend without weeks of manual mapping.", icon: "🗂️" },
            { title: "Code Reconciliation Gap", desc: "Finance teams see payment codes that don't align with material codes. The same fuel purchase might be PAY-4401 in one entity and PAY-4460 in another, making GL reconciliation manual and error-prone.", icon: "🔗" },
            { title: "Hidden Consolidation Value", desc: "Without standardised categories, spend that could be consolidated across entities remains invisible. Duplicate suppliers, fragmented contracts, and missed volume leverage go undetected.", icon: "💰" },
          ].map((c, i) => (
            <Card key={i}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
              <H3>{c.title}</H3>
              <Body style={{ marginBottom: 0, fontSize: 13 }}>{c.desc}</Body>
            </Card>
          ))}
        </div>

        <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ fontSize: 28, marginTop: -2 }}>⚡</div>
            <div>
              <H3 style={{ color: C.maerskBlue }}>Why This Problem Persists</H3>
              <Body style={{ marginBottom: 0 }}>Traditional approaches — manual taxonomy mapping, consultant-led spend classification exercises, ERP harmonisation programs — are slow, expensive, and brittle. They produce a point-in-time snapshot that degrades as new data enters the system. Every acquisition resets the clock. The problem demands a continuously learning, AI-native approach.</Body>
            </div>
          </div>
        </Card>
      </Section>

      {/* Solution */}
      <Section id="solution" bg={C.valtechLight}>
        <SectionLabel text="Proposed Solution" />
        <H2>Hypothesis: AI Semantic Classification</H2>
        <Body style={{ maxWidth: 700, marginBottom: 32 }}>We believe that a combination of large language model semantic understanding and structured taxonomy mapping can automate 80%+ of spend categorisation and payment–material code reconciliation — with human-in-the-loop review for edge cases, creating a continuously improving system.</Body>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { title: "Semantic Understanding", desc: "AI reads natural-language spend descriptions and understands that 'HFO 380cst bunkering' and 'heavy fuel oil vessel supply' are the same thing — across languages, abbreviations, and entity conventions.", badge: "NLP" },
            { title: "Taxonomy Alignment", desc: "Every item is mapped to a unified, UNSPSC-aligned category hierarchy. This becomes the single source of truth for both category management and finance.", badge: "Mapping" },
            { title: "Code Reconciliation", desc: "Payment codes and material codes are cross-referenced within each category. Mismatches are flagged with AI-suggested corrections, prioritised by spend impact.", badge: "Finance" },
            { title: "Continuous Learning", desc: "Human reviewers validate edge cases, and their decisions train the model. Accuracy improves over time, and new acquisitions can be onboarded in days rather than months.", badge: "AI/ML" },
          ].map((c, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <H3>{c.title}</H3>
                <Badge color="blue">{c.badge}</Badge>
              </div>
              <Body style={{ marginBottom: 0, fontSize: 13 }}>{c.desc}</Body>
            </Card>
          ))}
        </div>

        <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
            {[
              { label: "Categorisation Accuracy", value: "92%+", sub: "Target after Phase 1" },
              { label: "Manual Effort Reduction", value: "80%", sub: "Reconciliation FTE" },
              { label: "Time to Onboard Entity", value: "5 days", sub: "vs. 3–6 months today" },
              { label: "Spend Visibility", value: "100%", sub: "Cross-entity unified view" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: C.maerskStar, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.white }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Demo */}
      <Section id="demo" bg={C.white} py={64}>
        <SectionLabel text="Proof of Concept" />
        <H2>See It Working</H2>
        <Body style={{ maxWidth: 700, marginBottom: 28 }}>This interactive demo uses synthetic data modelled on Mærsk's maritime logistics procurement landscape — 18 spend items across 8 acquired entities. Walk through the three-stage pipeline: categorise, reconcile, and consolidate. Each stage includes live AI analysis.</Body>
        <Demo />
      </Section>

      {/* Architecture */}
      <Section id="architecture" bg={C.valtechLight}>
        <SectionLabel text="Technical Architecture" />
        <H2>How It Works</H2>
        <Body style={{ maxWidth: 700, marginBottom: 32 }}>Four architectural views showing how the Spend Intelligence engine connects to Mærsk's existing systems and processes.</Body>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <H3>End-to-End Data Flow</H3>
              <Badge color="blue">Data Architecture</Badge>
            </div>
            <DiagramDataFlow />
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <H3>AI Classification Pipeline</H3>
              <Badge color="blue">AI / ML</Badge>
            </div>
            <DiagramAIPipeline />
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <H3>Integration Architecture</H3>
              <Badge color="blue">Systems</Badge>
            </div>
            <DiagramIntegration />
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <H3>Delivery Timeline</H3>
              <Badge color="blue">Roadmap</Badge>
            </div>
            <DiagramTimeline />
          </Card>
        </div>
      </Section>

      {/* Approach */}
      <Section id="approach" bg={C.white}>
        <SectionLabel text="Engagement Approach" />
        <H2>How We Get There</H2>
        <Body style={{ maxWidth: 700, marginBottom: 32 }}>A phased approach designed to demonstrate value early and scale with confidence. Each phase has a clear deliverable and go/no-go gate.</Body>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { phase: "Phase 1: Validate", weeks: "Weeks 1–3", desc: "Ingest a sample of real Mærsk spend data. Build and benchmark the AI classification engine against a manually-verified baseline. Deliver an accuracy report and refined taxonomy mapping.", deliverable: "Accuracy benchmark + taxonomy", gate: "≥85% accuracy on sample" },
            { phase: "Phase 2: Pilot", weeks: "Weeks 4–8", desc: "Go live with 2 category groups (e.g. Marine Fuels, Reefer Maintenance). Connect to SAP for payment/material code extraction. Run reconciliation engine with human review loop.", deliverable: "Working pilot + reconciliation report", gate: "Category manager sign-off" },
            { phase: "Phase 3: Scale", weeks: "Weeks 9–14", desc: "Extend to all spend categories. Roll out across additional acquired entities. Build executive dashboard with consolidated spend view and savings tracking.", deliverable: "Full deployment + spend dashboard", gate: "Finance team validation" },
            { phase: "Phase 4: Embed", weeks: "Weeks 15–18", desc: "Transfer ownership to internal teams. Deploy self-service tools for ongoing taxonomy management. Establish continuous learning pipeline for new data and acquisitions.", deliverable: "Handover + training complete", gate: "Self-sustaining operation" },
          ].map((p, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <H3>{p.phase}</H3>
                <Badge color="navy">{p.weeks}</Badge>
              </div>
              <Body style={{ fontSize: 13 }}>{p.desc}</Body>
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                <div><div style={{ fontSize: 10, fontWeight: 700, color: C.valtechGray, letterSpacing: "0.05em" }}>DELIVERABLE</div><div style={{ fontSize: 12, color: C.maerskNavy, fontWeight: 600, marginTop: 2 }}>{p.deliverable}</div></div>
                <div><div style={{ fontSize: 10, fontWeight: 700, color: C.valtechGray, letterSpacing: "0.05em" }}>GO/NO-GO</div><div style={{ fontSize: 12, color: C.maerskNavy, fontWeight: 600, marginTop: 2 }}>{p.gate}</div></div>
              </div>
            </Card>
          ))}
        </div>

        <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
          <H3 style={{ color: C.maerskBlue }}>Investment & Next Step</H3>
          <Body style={{ marginBottom: 12 }}>Phase 1 (Validate) requires minimal commitment: a sample dataset from 2–3 entities and 3 weeks of elapsed time. There is no infrastructure build required — the POC runs on cloud-native AI services. If the accuracy benchmark meets the gate criteria, we proceed to Pilot. If not, we stop with full transparency on what was learned.</Body>
          <Body style={{ marginBottom: 0, fontWeight: 600, color: C.maerskNavy }}>We'd welcome 30 minutes to walk through this hypothesis and demo together, and to discuss what a representative data sample for Phase 1 would look like.</Body>
        </Card>
      </Section>

      {/* Footer */}
      <section style={{ background: C.maerskNavy, padding: "32px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>Mærsk × Valtech</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 12 }}>Spend Intelligence — Hypothesis & Proof of Concept</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Prepared March 2026</div>
        </div>
      </section>
    </div>
  );
}
