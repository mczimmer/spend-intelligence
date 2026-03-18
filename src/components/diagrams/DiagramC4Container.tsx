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

  // Row 3: Storage & Output (3 boxes) — shifted down to make room for Model Router
  const r3y = r2y + ch + 100;
  const r3boxes = [
    { label: "Taxonomy Store", sub: "PostgreSQL — unified", sub2: "category hierarchy", x: bx + 30 },
    { label: "Vector DB", sub: "Embeddings for", sub2: "similarity matching", x: bx + 30 + cw + 40 },
    { label: "Reconciliation Engine", sub: "Payment / material", sub2: "code alignment", x: bx + 30 + (cw + 40) * 2 },
  ];

  // External systems
  const extLeftX = 10, extRightX = W - 10 - 90;
  const extSrcY = r1y + 10;
  const extLlmY = mrY;

  const processingFill = "rgba(66,176,213,0.10)";
  const storageFill = "#EBF5FF";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowCC" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
        <marker id="arrowCCgray" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.valtechBorder} />
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

      {/* Arrows: API Gateway → Data Ingestion */}
      <line x1={r1boxes[0].x + cw + 2} y1={r1y + ch / 2} x2={r1boxes[1].x - 2} y2={r1y + ch / 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* Data Ingestion → AI Classifier */}
      <line x1={r1boxes[1].x + cw / 2} y1={r1y + ch + 2} x2={r2boxes[0].x + cw / 2} y2={r2y - 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* AI Classifier → Confidence Scoring */}
      <line x1={r2boxes[0].x + cw + 2} y1={r2y + ch / 2} x2={r2boxes[1].x - 2} y2={r2y + ch / 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* AI Classifier → Model Router */}
      <line x1={mrX + cw / 2} y1={r2y + ch + 2} x2={mrX + cw / 2} y2={mrY - 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
      <text x={mrX + cw / 2 + 10} y={r2y + ch + 14} textAnchor="start" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Classification request</text>

      {/* Model Router → LLM Provider (external) */}
      <line x1={mrX - 2} y1={mrY + ch / 2} x2={bx - 2} y2={mrY + ch / 2} stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowCCgray)" />
      <line x1={bx - 2} y1={mrY + ch / 2} x2={extLeftX + 90 + 2} y2={extLlmY + ch / 2} stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowCCgray)" />
      <text x={(mrX + bx) / 2} y={mrY + ch / 2 - 8} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Inference</text>

      {/* Confidence Scoring → Human Review Queue (low conf) */}
      <line x1={r2boxes[1].x + cw + 2} y1={r2y + ch / 2} x2={r2boxes[2].x - 2} y2={r2y + ch / 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
      <text x={r2boxes[1].x + cw + (r2boxes[2].x - r2boxes[1].x - cw) / 2} y={r2y + ch / 2 - 8} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Low confidence</text>

      {/* Confidence Scoring → Taxonomy Store (high conf) */}
      <line x1={r2boxes[1].x + cw / 2} y1={r2y + ch + 2} x2={r3boxes[0].x + cw / 2 + 40} y2={r3y - 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
      <text x={(r2boxes[1].x + cw / 2 + r3boxes[0].x + cw / 2 + 40) / 2 + 20} y={(r2y + ch + r3y) / 2 + 4} textAnchor="start" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>High confidence</text>

      {/* AI Classifier ↔ Vector DB */}
      <line x1={r2boxes[0].x + cw / 2 + 40} y1={r2y + ch + 2} x2={r3boxes[1].x + cw / 2} y2={r3y - 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />
      <line x1={r3boxes[1].x + cw / 2 - 10} y1={r3y - 2} x2={r2boxes[0].x + cw / 2 + 30} y2={r2y + ch + 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* Taxonomy Store → Reconciliation Engine */}
      <line x1={r3boxes[0].x + cw + 2} y1={r3y + ch / 2} x2={r3boxes[2].x - 2} y2={r3y + ch / 2} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowCC)" />

      {/* External: SAP / Oracle / Entity DBs (left, top) */}
      <rect x={extLeftX} y={extSrcY} width={90} height={48} rx={8} fill={C.valtechLight} stroke={C.valtechBorder} strokeWidth={1.5} />
      <text x={extLeftX + 45} y={extSrcY + 18} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>SAP / Oracle /</text>
      <text x={extLeftX + 45} y={extSrcY + 30} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>Entity DBs</text>
      <text x={extLeftX + 45} y={extSrcY + 42} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Source systems</text>
      <line x1={extLeftX + 90 + 2} y1={extSrcY + 24} x2={bx - 2} y2={r1y + ch / 2} stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowCCgray)" />

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
      <line x1={bx + bw + 2} y1={r3y + ch / 2} x2={extRightX - 2} y2={extSrcY + 50 + 24} stroke="#bbf7d0" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowCCgray)" />

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
