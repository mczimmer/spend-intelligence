import { C, font } from "@/lib/constants";

export default function DiagramIntegration() {
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
      <rect x={280} y={80} width={240} height={80} rx={12} fill={C.maerskNavy} />
      <text x={400} y={110} textAnchor="middle" style={{ fontSize: 13, fontWeight: 700, fill: C.white, fontFamily: font.sans }}>Spend Intelligence</text>
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
