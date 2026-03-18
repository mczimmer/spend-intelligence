import { C, font } from "@/lib/constants";

export default function DiagramC4Context() {
  const W = 920, H = 400;

  const users = [
    { label: "Category Manager", sub: "Views consolidated spend,", sub2: "validates classifications" },
    { label: "Finance Team", sub: "Receives reconciled codes,", sub2: "reviews mismatches" },
    { label: "Procurement Lead", sub: "Monitors consolidation", sub2: "opportunities, tracks savings" },
  ];

  const sources = [
    { label: "SAP S/4HANA", sub: "Material Master, FI-CO data" },
    { label: "Oracle Procurement", sub: "PO & Invoice data" },
    { label: "Acquired Entity DBs", sub: "Legacy spend records" },
  ];

  const consumers = [
    { label: "Power BI / Tableau", sub: "Spend dashboards", sub2: "& reporting" },
    { label: "Category Mgmt Tools", sub: "Unified taxonomy,", sub2: "sourcing insights" },
    { label: "Finance / Treasury", sub: "Reconciled GL codes" },
  ];

  // Layout
  const centerX = 360, centerY = 190, centerW = 200, centerH = 80;
  const srcBoxW = 160, srcBoxH = 48, srcGap = 24;
  const sideBoxW = 180, sideBoxH = 56, sideGap = 14;
  const userX = 20;
  const consumerX = W - 20 - sideBoxW;

  // Sources centered above
  const srcTotalW = sources.length * srcBoxW + (sources.length - 1) * srcGap;
  const srcStartX = (W - srcTotalW) / 2;
  const srcY = 14;

  // Users stacked left
  const userTotalH = users.length * sideBoxH + (users.length - 1) * sideGap;
  const userStartY = centerY + centerH / 2 - userTotalH / 2;

  // Consumers stacked right
  const conTotalH = consumers.length * sideBoxH + (consumers.length - 1) * sideGap;
  const conStartY = centerY + centerH / 2 - conTotalH / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowC4" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.valtechBorder} />
        </marker>
        <marker id="arrowC4solid" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
      </defs>

      {/* Source systems (top) */}
      {sources.map((s, i) => {
        const x = srcStartX + i * (srcBoxW + srcGap);
        return (
          <g key={s.label}>
            <rect x={x} y={srcY} width={srcBoxW} height={srcBoxH} rx={8} fill={C.valtechLight} stroke={C.valtechBorder} strokeWidth={1.5} />
            <text x={x + srcBoxW / 2} y={srcY + 20} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{s.label}</text>
            <text x={x + srcBoxW / 2} y={srcY + 34} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{s.sub}</text>
            {/* Dashed line down to center */}
            <line x1={x + srcBoxW / 2} y1={srcY + srcBoxH + 2} x2={centerX + centerW / 2 - 40 + i * 40} y2={centerY - 2} stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowC4)" />
          </g>
        );
      })}

      {/* Center system */}
      <rect x={centerX} y={centerY} width={centerW} height={centerH} rx={12} fill={C.maerskNavy} />
      <text x={centerX + centerW / 2} y={centerY + 26} textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: C.white, fontFamily: font.sans }}>Spend Intelligence</text>
      <text x={centerX + centerW / 2} y={centerY + 44} textAnchor="middle" style={{ fontSize: 10, fill: C.maerskStar, fontFamily: font.sans }}>AI Classification &</text>
      <text x={centerX + centerW / 2} y={centerY + 57} textAnchor="middle" style={{ fontSize: 10, fill: C.maerskStar, fontFamily: font.sans }}>Reconciliation Engine</text>
      <text x={centerX + centerW / 2} y={centerY + 72} textAnchor="middle" style={{ fontSize: 9, fill: "rgba(255,255,255,0.5)", fontFamily: font.sans }}>API-first · Cloud-native</text>

      {/* Users (left) */}
      {users.map((u, i) => {
        const y = userStartY + i * (sideBoxH + sideGap);
        return (
          <g key={u.label}>
            <rect x={userX} y={y} width={sideBoxW} height={sideBoxH} rx={8} fill={C.maerskLight} stroke={C.maerskStar} strokeWidth={1.5} />
            <text x={userX + sideBoxW / 2} y={y + 18} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{u.label}</text>
            <text x={userX + sideBoxW / 2} y={y + 32} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{u.sub}</text>
            {u.sub2 && <text x={userX + sideBoxW / 2} y={y + 44} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{u.sub2}</text>}
            {/* Solid line to center */}
            <line x1={userX + sideBoxW + 2} y1={y + sideBoxH / 2} x2={centerX - 2} y2={centerY + centerH / 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowC4solid)" />
          </g>
        );
      })}

      {/* Consumers (right) */}
      {consumers.map((c, i) => {
        const y = conStartY + i * (sideBoxH + sideGap);
        return (
          <g key={c.label}>
            <rect x={consumerX} y={y} width={sideBoxW} height={sideBoxH} rx={8} fill="#dcfce7" stroke="#bbf7d0" strokeWidth={1.5} />
            <text x={consumerX + sideBoxW / 2} y={y + 18} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: "#166534", fontFamily: font.sans }}>{c.label}</text>
            <text x={consumerX + sideBoxW / 2} y={y + 32} textAnchor="middle" style={{ fontSize: 9, fill: "#15803d", fontFamily: font.sans }}>{c.sub}</text>
            {c.sub2 && <text x={consumerX + sideBoxW / 2} y={y + 44} textAnchor="middle" style={{ fontSize: 9, fill: "#15803d", fontFamily: font.sans }}>{c.sub2}</text>}
            {/* Dashed line from center */}
            <line x1={centerX + centerW + 2} y1={centerY + centerH / 2} x2={consumerX - 2} y2={y + sideBoxH / 2} stroke="#bbf7d0" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowC4)" />
          </g>
        );
      })}

      {/* Legend */}
      <g>
        <line x1={60} y1={H - 20} x2={100} y2={H - 20} stroke={C.maerskStar} strokeWidth={1.5} />
        <text x={108} y={H - 16} style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>User interaction</text>
        <line x1={240} y1={H - 20} x2={280} y2={H - 20} stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={288} y={H - 16} style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>Data flow</text>
      </g>
    </svg>
  );
}
