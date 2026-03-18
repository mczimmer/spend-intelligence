import { C, font } from "@/lib/constants";

export default function DiagramTargetState() {
  const W = 920, H = 580;
  const bx = 20, by = 10, bw = 880, bh = 500;
  const cw = 130, ch = 44, rx = 8;
  const processingFill = "rgba(66,176,213,0.10)";
  const storageFill = "#EBF5FF";
  const govFill = "rgba(0,36,61,0.06)";

  // Ingestion column (left, stacked vertically)
  const ingX = bx + 20;
  const ingY = by + 36;
  const ingBoxes = [
    { label: "Source Extract Adapter", sub: "Connects to SAP, Oracle,", sub2: "entity systems", y: ingY },
    { label: "Normalisation", sub: "Currency, encoding, units,", sub2: "naming resolution", y: ingY + ch + 12 },
    { label: "Data Quality", sub: "Missing fields, duplicates,", sub2: "provenance tagging", y: ingY + (ch + 12) * 2 },
  ];

  // Processing row
  const procY = ingY + 20;
  const procX = ingX + cw + 50;
  const procBoxes = [
    { label: "AI Classifier", sub: "Semantic embedding +", sub2: "taxonomy mapping", x: procX, y: procY },
    { label: "Model Router", sub: "Provider-agnostic", sub2: "inference routing", x: procX, y: procY + ch + 16 },
    { label: "Confidence Scoring", sub: "Threshold-based routing", x: procX + cw + 40, y: procY },
  ];

  // Human review (expanded)
  const hrX = procX + (cw + 40) * 2;
  const hrY = procY;
  const hrBoxes = [
    { label: "Priority Router", sub: "Routes by spend impact", sub2: "and criticality", x: hrX, y: hrY },
    { label: "Reviewer Workbench", sub: "Validate, correct,", sub2: "escalate", x: hrX, y: hrY + ch + 16 },
  ];

  // Storage row
  const storeY = ingY + (ch + 12) * 2 + ch + 30;
  const storeBoxes = [
    { label: "Taxonomy Store", sub: "Unified category hierarchy", x: procX, y: storeY },
    { label: "Vector DB", sub: "Embeddings for matching", x: procX + cw + 40, y: storeY },
    { label: "Reconciliation Engine", sub: "Payment / material codes", x: procX + (cw + 40) * 2, y: storeY },
  ];

  // Governance layer
  const govY = storeY + ch + 30;
  const govH = ch + 20;
  const govBoxes = [
    { label: "Taxonomy Versioning", sub: "Every hierarchy change versioned", x: bx + 30 },
    { label: "Audit & Decision Log", sub: "All decisions logged with provenance", x: bx + 30 + cw + 20 },
    { label: "Calibration Monitor", sub: "Drift detection, threshold validation", x: bx + 30 + (cw + 20) * 2 },
    { label: "Override Workflow", sub: "Human corrections captured, approved", x: bx + 30 + (cw + 20) * 3 },
  ];

  // External systems
  const extLeftX = bx - 10;
  const extRightX = W - 10;

  const drawBox = (b: { label: string; sub: string; sub2?: string; x: number; y: number }, fill: string, stroke: string) => (
    <g key={b.label + b.x}>
      <rect x={b.x} y={b.y} width={cw} height={ch} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={b.x + cw / 2} y={b.y + (b.sub2 ? 14 : 18)} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{b.label}</text>
      <text x={b.x + cw / 2} y={b.y + (b.sub2 ? 26 : 30)} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub}</text>
      {b.sub2 && <text x={b.x + cw / 2} y={b.y + 36} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub2}</text>}
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowTS" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
        <marker id="arrowTSg" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.valtechBorder} />
        </marker>
      </defs>

      {/* System boundary */}
      <rect x={bx} y={by} width={bw} height={bh} rx={12} fill="none" stroke={C.maerskNavy} strokeWidth={2} strokeDasharray="8 4" />
      <text x={bx + 16} y={by + 22} style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>Spend Intelligence Engine</text>

      {/* Ingestion column */}
      {ingBoxes.map(b => drawBox(b as any, processingFill, C.maerskStar))}
      {/* Vertical arrows between ingestion boxes */}
      <path d={`M ${ingX + cw / 2} ${ingY + ch + 2} L ${ingX + cw / 2} ${ingY + ch + 10}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      <path d={`M ${ingX + cw / 2} ${ingY + (ch + 12) + ch + 2} L ${ingX + cw / 2} ${ingY + (ch + 12) * 2 - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Data Quality -> AI Classifier */}
      <path d={`M ${ingX + cw + 2} ${ingY + (ch + 12) * 2 + ch / 2} L ${procX - 15} ${ingY + (ch + 12) * 2 + ch / 2} L ${procX - 15} ${procY + ch / 2} L ${procX - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      <text x={procX - 20} y={procY + ch / 2 + 14} textAnchor="end" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Source entity + record ID</text>

      {/* Processing boxes */}
      {procBoxes.map(b => drawBox(b as any, processingFill, C.maerskStar))}

      {/* AI Classifier -> Model Router (vertical) */}
      <path d={`M ${procX + cw / 2} ${procY + ch + 2} L ${procX + cw / 2} ${procY + ch + 14}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* AI Classifier -> Confidence Scoring (horizontal) */}
      <path d={`M ${procX + cw + 2} ${procY + ch / 2} L ${procBoxes[2].x - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Confidence Scoring -> Priority Router (low confidence) */}
      <path d={`M ${procBoxes[2].x + cw + 2} ${procY + ch / 2} L ${hrX - 2} ${hrY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      <text x={(procBoxes[2].x + cw + hrX) / 2} y={procY + ch / 2 - 7} textAnchor="middle" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Low confidence</text>

      {/* Confidence Scoring -> Taxonomy Store (high confidence) */}
      <path d={`M ${procBoxes[2].x + cw / 2} ${procY + ch + 2} L ${procBoxes[2].x + cw / 2} ${storeY - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      <text x={procBoxes[2].x + cw / 2 + 10} y={(procY + ch + storeY) / 2} textAnchor="start" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Classification + confidence</text>

      {/* Priority Router -> Reviewer Workbench */}
      <path d={`M ${hrX + cw / 2} ${hrY + ch + 2} L ${hrX + cw / 2} ${hrY + ch + 14}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Human review boxes */}
      {hrBoxes.map(b => drawBox(b as any, "rgba(234,179,8,0.08)", C.warning))}

      {/* Reviewer Workbench -> Taxonomy Store (validated output) */}
      <path d={`M ${hrX + cw / 2} ${hrY + ch + 16 + ch + 2} L ${hrX + cw / 2} ${storeY + ch / 2} L ${storeBoxes[2].x + cw + 2} ${storeY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} />
      <text x={hrX + cw / 2 + 10} y={hrY + ch + 16 + ch + 16} textAnchor="start" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>+ reviewer ID + override reason</text>

      {/* Reviewer Workbench -> Governance (corrections feed calibration) */}
      <path d={`M ${hrX} ${hrY + ch + 16 + ch / 2} L ${hrX - 15} ${hrY + ch + 16 + ch / 2} L ${hrX - 15} ${govY + govH / 2}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowTSg)" />
      <text x={hrX - 20} y={govY - 4} textAnchor="end" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Corrections feed calibration</text>

      {/* Storage boxes */}
      {storeBoxes.map(b => drawBox(b as any, storageFill, "#b3dce8"))}

      {/* Taxonomy Store -> Reconciliation Engine */}
      <path d={`M ${storeBoxes[0].x + cw + 2} ${storeY + ch / 2} L ${storeBoxes[2].x - 2} ${storeY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* AI Classifier <-> Vector DB */}
      <path d={`M ${procX + cw + 15} ${procY + ch + 2} L ${procX + cw + 15} ${storeY + ch / 2 - 10} L ${storeBoxes[1].x - 2} ${storeY + ch / 2 - 10}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Model Router -> External LLM (left, through boundary) */}
      <path d={`M ${procX} ${procY + ch + 16 + ch / 2} L ${ingX + cw / 2} ${procY + ch + 16 + ch / 2}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={(procX + ingX + cw / 2) / 2} y={procY + ch + 16 + ch / 2 - 7} textAnchor="middle" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Inference</text>

      {/* Governance layer band */}
      <rect x={bx + 10} y={govY} width={bw - 20} height={govH} rx={8} fill={govFill} stroke={C.maerskNavy} strokeWidth={1} strokeDasharray="4 2" opacity={0.6} />
      <text x={bx + 20} y={govY + 12} style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", fill: C.maerskNavy, fontFamily: font.sans, opacity: 0.5 }}>GOVERNANCE LAYER</text>
      {govBoxes.map(b => (
        <g key={b.label}>
          <rect x={b.x} y={govY + 18} width={cw + 20} height={ch - 8} rx={6} fill={C.white} stroke={C.maerskNavy} strokeWidth={1} opacity={0.7} />
          <text x={b.x + (cw + 20) / 2} y={govY + 18 + 14} textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{b.label}</text>
          <text x={b.x + (cw + 20) / 2} y={govY + 18 + 26} textAnchor="middle" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub}</text>
        </g>
      ))}

      {/* Legend */}
      <g>
        <rect x={bx + 10} y={H - 30} width={10} height={10} rx={3} fill={processingFill} stroke={C.maerskStar} strokeWidth={1} />
        <text x={bx + 26} y={H - 22} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Processing</text>
        <rect x={bx + 100} y={H - 30} width={10} height={10} rx={3} fill={storageFill} stroke="#b3dce8" strokeWidth={1} />
        <text x={bx + 116} y={H - 22} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Storage</text>
        <rect x={bx + 180} y={H - 30} width={10} height={10} rx={3} fill="rgba(234,179,8,0.08)" stroke={C.warning} strokeWidth={1} />
        <text x={bx + 196} y={H - 22} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Human Review</text>
        <rect x={bx + 290} y={H - 30} width={10} height={10} rx={3} fill={govFill} stroke={C.maerskNavy} strokeWidth={1} opacity={0.6} />
        <text x={bx + 306} y={H - 22} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Governance</text>
      </g>
    </svg>
  );
}
