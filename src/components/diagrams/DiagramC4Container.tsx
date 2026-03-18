import { C, font } from "@/lib/constants";

export default function DiagramC4Container() {
  const W = 920, H = 510;

  // Boundary
  const bx = 120, by = 10, bw = 680, bh = 420;

  // Container box dimensions
  const cw = 150, ch = 50, rx = 8;

  // Row 1: Ingestion (2 boxes)
  const r1y = by + 40;
  const r1boxes = [
    { label: "API Gateway", sub: "Routes requests, authenticates", x: bx + 80 },
    { label: "Data Ingestion", sub: "Normalises source data formats", x: bx + 80 + cw + 80 },
  ];

  // Row 2: Processing (3 boxes)
  const r2y = r1y + ch + 50;
  const r2boxes = [
    { label: "AI Classifier", sub: "Semantic embedding +", sub2: "taxonomy mapping", x: bx + 30 },
    { label: "Confidence Scoring", sub: "Threshold-based routing", x: bx + 30 + cw + 40 },
    { label: "Human Review Queue", sub: "Low-confidence triage", x: bx + 30 + (cw + 40) * 2 },
  ];

  // Model Router: between row 2 and row 3, aligned with AI Classifier
  const mrX = bx + 30;
  const mrY = r2y + ch + 26;

  // Row 3: Storage & Output (3 boxes)
  const r3y = r2y + ch + 100;
  const r3boxes = [
    { label: "Taxonomy Store", sub: "PostgreSQL, unified", sub2: "category hierarchy", x: bx + 30 },
    { label: "Vector DB", sub: "Embeddings for", sub2: "similarity matching", x: bx + 30 + cw + 40 },
    { label: "Reconciliation Engine", sub: "Payment / material", sub2: "code alignment", x: bx + 30 + (cw + 40) * 2 },
  ];

  // External systems
  const extLeftX = 10, extRightX = W - 10 - 90;
  const extSrcY = r1y + 10;
  const extLlmY = mrY;

  const processingFill = "rgba(66,176,213,0.10)";
  const storageFill = "#EBF5FF";

  // Computed positions for arrow routing
  const aiRight = r2boxes[0].x + cw;       // 300
  const csLeft = r2boxes[1].x;             // 340
  const csRight = r2boxes[1].x + cw;       // 490
  const csCenter = r2boxes[1].x + cw / 2;  // 415
  const hrLeft = r2boxes[2].x;             // 530
  const diRight = r1boxes[1].x + cw / 2;   // 505
  const aiCenter = r2boxes[0].x + cw / 2;  // 225
  const mrBottom = mrY + ch;               // 276
  const tsCenter = r3boxes[0].x + cw / 2;  // 225
  const tsRight = r3boxes[0].x + cw;       // 300
  const vdbLeft = r3boxes[1].x;            // 340
  const vdbRight = r3boxes[1].x + cw;      // 490
  const reLeft = r3boxes[2].x;             // 530
  const reCenter = r3boxes[2].x + cw / 2;  // 605
  const reRight = r3boxes[2].x + cw;       // 680

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowCC" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
        <marker id="arrowCCgray" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.valtechBorder} />
        </marker>
        <marker id="arrowCCgreen" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#bbf7d0" />
        </marker>
      </defs>

      {/* Boundary rect */}
      <rect x={bx} y={by} width={bw} height={bh} rx={12} fill="none" stroke={C.maerskNavy} strokeWidth={2} strokeDasharray="8 4" />
      <text x={bx + 16} y={by + 22} style={{ fontSize: 11, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>Spend Intelligence Engine</text>

      {/* Row 1: Ingestion */}
      {r1boxes.map(b => (
        <g key={b.label}>
          <rect x={b.x} y={r1y} width={cw} height={ch} rx={rx} fill={processingFill} stroke={C.maerskStar} strokeWidth={1.5} />
          <text x={b.x + cw / 2} y={r1y + 20} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{b.label}</text>
          <text x={b.x + cw / 2} y={r1y + 34} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub}</text>
        </g>
      ))}

      {/* Row 2: Processing */}
      {r2boxes.map(b => (
        <g key={b.label}>
          <rect x={b.x} y={r2y} width={cw} height={ch} rx={rx} fill={processingFill} stroke={C.maerskStar} strokeWidth={1.5} />
          <text x={b.x + cw / 2} y={r2y + (b.sub2 ? 16 : 20)} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{b.label}</text>
          <text x={b.x + cw / 2} y={r2y + (b.sub2 ? 30 : 34)} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub}</text>
          {b.sub2 && <text x={b.x + cw / 2} y={r2y + 42} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub2}</text>}
        </g>
      ))}

      {/* Model Router (between row 2 and row 3) */}
      <rect x={mrX} y={mrY} width={cw} height={ch} rx={rx} fill={processingFill} stroke={C.maerskStar} strokeWidth={1.5} />
      <text x={mrX + cw / 2} y={mrY + 20} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>Model Router</text>
      <text x={mrX + cw / 2} y={mrY + 34} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>Provider-agnostic</text>
      <text x={mrX + cw / 2} y={mrY + 45} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>inference routing</text>

      {/* Row 3: Storage & Output */}
      {r3boxes.map(b => (
        <g key={b.label}>
          <rect x={b.x} y={r3y} width={cw} height={ch} rx={rx} fill={storageFill} stroke="#b3dce8" strokeWidth={1.5} />
          <text x={b.x + cw / 2} y={r3y + (b.sub2 ? 16 : 20)} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{b.label}</text>
          <text x={b.x + cw / 2} y={r3y + (b.sub2 ? 30 : 34)} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub}</text>
          {b.sub2 && <text x={b.x + cw / 2} y={r3y + 42} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub2}</text>}
        </g>
      ))}

      {/* ── ARROWS (all orthogonal, no box crossings) ── */}

      {/* 1. API Gateway → Data Ingestion (horizontal) */}
      <path d={`M ${r1boxes[0].x + cw + 2} ${r1y + ch / 2} L ${r1boxes[1].x - 2} ${r1y + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* 2. Data Ingestion → AI Classifier (L-shape: down then left) */}
      <path d={`M ${diRight} ${r1y + ch + 2} L ${diRight} ${r1y + ch + 25} L ${aiCenter} ${r1y + ch + 25} L ${aiCenter} ${r2y - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* 3. AI Classifier → Confidence Scoring (horizontal) */}
      <path d={`M ${aiRight + 2} ${r2y + ch / 2} L ${csLeft - 2} ${r2y + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* 4. Confidence Scoring → Human Review Queue (horizontal) */}
      <path d={`M ${csRight + 2} ${r2y + ch / 2} L ${hrLeft - 2} ${r2y + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
      <text x={csRight + (hrLeft - csRight) / 2} y={r2y + ch / 2 - 8} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Low confidence</text>

      {/* 5. AI Classifier → Model Router (vertical) */}
      <path d={`M ${aiCenter} ${r2y + ch + 2} L ${aiCenter} ${mrY - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
      <text x={aiCenter + 12} y={r2y + ch + 16} textAnchor="start" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Classification request</text>

      {/* 6. Model Router → LLM Provider (horizontal through boundary) */}
      <path d={`M ${mrX - 2} ${mrY + ch / 2} L ${extLeftX + 90 + 2} ${mrY + ch / 2}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowCCgray)" />
      <text x={(mrX + bx) / 2} y={mrY + ch / 2 - 8} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Inference</text>

      {/* 7. Confidence Scoring → Taxonomy Store (L-shape: down then left, routed between Model Router and Row 3) */}
      {(() => {
        const midY = mrBottom + 12; // 12px below Model Router bottom
        return (
          <>
            <path d={`M ${csCenter} ${r2y + ch + 2} L ${csCenter} ${midY} L ${tsCenter} ${midY} L ${tsCenter} ${r3y - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
            <text x={csCenter + 10} y={(r2y + ch + midY) / 2 + 4} textAnchor="start" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>High confidence</text>
          </>
        );
      })()}

      {/* 8. AI Classifier ↔ Vector DB (two L-shaped paths in the gap between columns) */}
      {/* Down: AI Classifier right → gap channel at x=310 → Vector DB left */}
      <path d={`M ${aiRight + 2} ${r2y + 18} L ${aiRight + 12} ${r2y + 18} L ${aiRight + 12} ${r3y + 15} L ${vdbLeft - 2} ${r3y + 15}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
      {/* Up: Vector DB left → gap channel at x=320 → AI Classifier right */}
      <path d={`M ${vdbLeft - 2} ${r3y + 35} L ${aiRight + 22} ${r3y + 35} L ${aiRight + 22} ${r2y + 38} L ${aiRight + 2} ${r2y + 38}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* 9. Taxonomy Store → Reconciliation Engine (U-shape routing below Vector DB) */}
      {(() => {
        const belowY = r3y + ch + 18; // 18px below row 3 bottom
        return (
          <path d={`M ${tsRight + 2} ${r3y + ch / 2 + 8} L ${tsRight + 15} ${r3y + ch / 2 + 8} L ${tsRight + 15} ${belowY} L ${reLeft - 15} ${belowY} L ${reLeft - 15} ${r3y + ch / 2 + 8} L ${reLeft - 2} ${r3y + ch / 2 + 8}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
        );
      })()}

      {/* ── EXTERNAL SYSTEMS ── */}

      {/* External: SAP / Oracle / Entity DBs (left, top) */}
      <rect x={extLeftX} y={extSrcY} width={90} height={48} rx={8} fill={C.valtechLight} stroke={C.valtechBorder} strokeWidth={1.5} />
      <text x={extLeftX + 45} y={extSrcY + 18} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>SAP / Oracle /</text>
      <text x={extLeftX + 45} y={extSrcY + 30} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>Entity DBs</text>
      <text x={extLeftX + 45} y={extSrcY + 42} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Source systems</text>
      {/* SAP → API Gateway (horizontal) */}
      <path d={`M ${extLeftX + 90 + 2} ${r1y + ch / 2} L ${r1boxes[0].x - 2} ${r1y + ch / 2}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowCCgray)" />

      {/* External: LLM Provider (left, lower) */}
      <rect x={extLeftX} y={extLlmY} width={90} height={48} rx={8} fill={C.valtechLight} stroke={C.valtechBorder} strokeWidth={1.5} />
      <text x={extLeftX + 45} y={extLlmY + 18} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>LLM Provider</text>
      <text x={extLeftX + 45} y={extLlmY + 30} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>OpenAI / Azure /</text>
      <text x={extLeftX + 45} y={extLlmY + 42} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>Open-source</text>

      {/* External: Power BI / Category Tools (right) */}
      <rect x={extRightX} y={extSrcY + 50} width={90} height={48} rx={8} fill="#dcfce7" stroke="#bbf7d0" strokeWidth={1.5} />
      <text x={extRightX + 45} y={extSrcY + 50 + 18} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: "#166534", fontFamily: font.sans }}>Power BI /</text>
      <text x={extRightX + 45} y={extSrcY + 50 + 30} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: "#166534", fontFamily: font.sans }}>Category Tools</text>
      <text x={extRightX + 45} y={extSrcY + 50 + 42} textAnchor="middle" style={{ fontSize: 8, fill: "#15803d", fontFamily: font.sans }}>Consumers</text>
      {/* Reconciliation Engine → Power BI (L-shape: right then up) */}
      <path d={`M ${reRight + 2} ${r3y + ch / 2} L ${extRightX - 15} ${r3y + ch / 2} L ${extRightX - 15} ${extSrcY + 50 + 24} L ${extRightX - 2} ${extSrcY + 50 + 24}`} fill="none" stroke="#bbf7d0" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowCCgreen)" />

      {/* Legend */}
      <g>
        <rect x={bx} y={H - 50} width={12} height={12} rx={3} fill={processingFill} stroke={C.maerskStar} strokeWidth={1} />
        <text x={bx + 18} y={H - 41} style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>Processing</text>
        <rect x={bx + 100} y={H - 50} width={12} height={12} rx={3} fill={storageFill} stroke="#b3dce8" strokeWidth={1} />
        <text x={bx + 118} y={H - 41} style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>Storage</text>
        <rect x={bx + 200} y={H - 50} width={12} height={12} rx={3} fill={C.valtechLight} stroke={C.valtechBorder} strokeWidth={1} />
        <text x={bx + 218} y={H - 41} style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>External</text>
      </g>
    </svg>
  );
}
