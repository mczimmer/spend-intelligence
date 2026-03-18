import { C, font } from "@/lib/constants";

export default function DiagramTargetState() {
  const W = 920, H = 600;
  const cw = 130, ch = 44, rx = 8;
  const processingFill = "rgba(66,176,213,0.10)";
  const storageFill = "#EBF5FF";
  const govFill = "rgba(0,36,61,0.06)";

  // Boundary with generous padding
  const bx = 30, by = 10, bw = 860;

  // Ingestion column (left side, inside boundary)
  const ingX = bx + 24;
  const ingY = by + 40;
  const ingGap = 14;
  const ingBoxes = [
    { label: "Source Extract Adapter", sub: "Connects to SAP, Oracle,", sub2: "entity systems" },
    { label: "Normalisation", sub: "Currency, encoding, units,", sub2: "naming resolution" },
    { label: "Data Quality", sub: "Missing fields, duplicates,", sub2: "provenance tagging" },
  ];

  // Processing column (center)
  const procX = ingX + cw + 60;
  const procY = ingY + 10;
  const procGap = 16;

  // Confidence Scoring (right of AI Classifier)
  const csX = procX + cw + 50;

  // Human Review (right of Confidence Scoring)
  const hrX = csX + cw + 50;

  // Storage row
  const storeY = ingY + (ch + ingGap) * 2 + ch + 36;

  // Governance layer
  const govY = storeY + ch + 36;
  const govH = ch + 24;
  const bh = govY + govH - by + 16;

  const drawBox = (label: string, sub: string, sub2: string | undefined, x: number, y: number, fill: string, stroke: string) => (
    <g key={label + x + y}>
      <rect x={x} y={y} width={cw} height={ch} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={x + cw / 2} y={y + (sub2 ? 14 : 18)} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{label}</text>
      <text x={x + cw / 2} y={y + (sub2 ? 26 : 30)} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>{sub}</text>
      {sub2 && <text x={x + cw / 2} y={y + 36} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>{sub2}</text>}
    </g>
  );

  // Computed positions
  const ing1Y = ingY;
  const ing2Y = ingY + ch + ingGap;
  const ing3Y = ingY + (ch + ingGap) * 2;
  const modelRouterY = procY + ch + procGap;
  const hrReviewY = procY + ch + procGap;

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
      <text x={bx + 16} y={by + 24} style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>Spend Intelligence Engine</text>

      {/* Ingestion column */}
      {drawBox(ingBoxes[0].label, ingBoxes[0].sub, ingBoxes[0].sub2, ingX, ing1Y, processingFill, C.maerskStar)}
      {drawBox(ingBoxes[1].label, ingBoxes[1].sub, ingBoxes[1].sub2, ingX, ing2Y, processingFill, C.maerskStar)}
      {drawBox(ingBoxes[2].label, ingBoxes[2].sub, ingBoxes[2].sub2, ingX, ing3Y, processingFill, C.maerskStar)}

      {/* Ingestion vertical arrows */}
      <path d={`M ${ingX + cw / 2} ${ing1Y + ch + 2} L ${ingX + cw / 2} ${ing2Y - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      <path d={`M ${ingX + cw / 2} ${ing2Y + ch + 2} L ${ingX + cw / 2} ${ing3Y - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Data Quality -> AI Classifier (L-shape: right then up) */}
      {(() => {
        const midX = ingX + cw + 30;
        return (
          <>
            <path d={`M ${ingX + cw + 2} ${ing3Y + ch / 2} L ${midX} ${ing3Y + ch / 2} L ${midX} ${procY + ch / 2} L ${procX - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
            <text x={midX + 6} y={procY + ch / 2 + 14} textAnchor="start" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Source entity + record ID</text>
          </>
        );
      })()}

      {/* Processing: AI Classifier */}
      {drawBox("AI Classifier", "Semantic embedding +", "taxonomy mapping", procX, procY, processingFill, C.maerskStar)}

      {/* Model Router (below AI Classifier) */}
      {drawBox("Model Router", "Provider-agnostic", "inference routing", procX, modelRouterY, processingFill, C.maerskStar)}

      {/* AI Classifier -> Model Router */}
      <path d={`M ${procX + cw / 2} ${procY + ch + 2} L ${procX + cw / 2} ${modelRouterY - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Model Router -> Inference (left, dashed) */}
      <path d={`M ${procX - 2} ${modelRouterY + ch / 2} L ${ingX + cw + 10} ${modelRouterY + ch / 2}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={(procX + ingX + cw) / 2} y={modelRouterY + ch / 2 - 7} textAnchor="middle" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Inference</text>

      {/* Confidence Scoring */}
      {drawBox("Confidence Scoring", "Threshold-based", "routing", csX, procY, processingFill, C.maerskStar)}

      {/* AI Classifier -> Confidence Scoring (horizontal) */}
      <path d={`M ${procX + cw + 2} ${procY + ch / 2} L ${csX - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Priority Router */}
      {drawBox("Priority Router", "Routes by spend", "impact and criticality", hrX, procY, "rgba(234,179,8,0.08)", C.warning)}

      {/* Reviewer Workbench */}
      {drawBox("Reviewer Workbench", "Validate, correct,", "escalate", hrX, hrReviewY, "rgba(234,179,8,0.08)", C.warning)}

      {/* Confidence Scoring -> Priority Router (horizontal) */}
      <path d={`M ${csX + cw + 2} ${procY + ch / 2} L ${hrX - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      <text x={(csX + cw + hrX) / 2} y={procY + ch / 2 - 7} textAnchor="middle" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Low confidence</text>

      {/* Priority Router -> Reviewer Workbench */}
      <path d={`M ${hrX + cw / 2} ${procY + ch + 2} L ${hrX + cw / 2} ${hrReviewY - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Confidence Scoring -> Taxonomy Store (L-shape: down then left) */}
      {(() => {
        const midY = storeY - 16;
        const tsX = procX;
        return (
          <>
            <path d={`M ${csX + cw / 2} ${procY + ch + 2} L ${csX + cw / 2} ${midY} L ${tsX + cw / 2} ${midY} L ${tsX + cw / 2} ${storeY - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
            <text x={csX + cw / 2 + 8} y={(procY + ch + midY) / 2} textAnchor="start" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>High confidence</text>
          </>
        );
      })()}

      {/* Reviewer Workbench -> Reconciliation Engine (L-shape: down then left) */}
      {(() => {
        const reX = csX;
        return (
          <path d={`M ${hrX + cw / 2} ${hrReviewY + ch + 2} L ${hrX + cw / 2} ${storeY + ch / 2} L ${reX + cw + 2} ${storeY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
        );
      })()}
      <text x={hrX + cw / 2 + 8} y={hrReviewY + ch + 16} textAnchor="start" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>+ reviewer ID + reason</text>

      {/* Reviewer Workbench -> Governance (dashed, L-shape: left then down) */}
      {(() => {
        const gx = hrX - 16;
        return (
          <path d={`M ${hrX - 2} ${hrReviewY + ch / 2} L ${gx} ${hrReviewY + ch / 2} L ${gx} ${govY + 10}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowTSg)" />
        );
      })()}
      <text x={hrX - 20} y={govY} textAnchor="end" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>Corrections feed calibration</text>

      {/* Storage row */}
      {drawBox("Taxonomy Store", "Unified category", "hierarchy", procX, storeY, storageFill, "#b3dce8")}
      {drawBox("Vector DB", "Embeddings for", "similarity matching", csX, storeY, storageFill, "#b3dce8")}
      {drawBox("Reconciliation Engine", "Payment / material", "code alignment", hrX, storeY, storageFill, "#b3dce8")}

      {/* Taxonomy Store -> Reconciliation Engine (horizontal) */}
      <path d={`M ${procX + cw + 2} ${storeY + ch / 2} L ${hrX - 2} ${storeY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* AI Classifier <-> Vector DB (L-shape in gap between columns) */}
      {(() => {
        const chX = procX + cw + 14;
        return (
          <path d={`M ${procX + cw + 2} ${procY + ch / 2 + 10} L ${chX} ${procY + ch / 2 + 10} L ${chX} ${storeY + ch / 2 - 8} L ${csX - 2} ${storeY + ch / 2 - 8}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
        );
      })()}

      {/* Governance layer band */}
      <rect x={bx + 10} y={govY} width={bw - 20} height={govH} rx={8} fill={govFill} stroke={C.maerskNavy} strokeWidth={1} strokeDasharray="4 2" opacity={0.6} />
      <text x={bx + 20} y={govY + 14} style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", fill: C.maerskNavy, fontFamily: font.sans, opacity: 0.5 }}>GOVERNANCE LAYER</text>

      {/* Governance boxes */}
      {[
        { label: "Taxonomy Versioning", sub: "Hierarchy changes versioned", x: bx + 24 },
        { label: "Audit & Decision Log", sub: "All decisions with provenance", x: bx + 24 + (cw + 14) },
        { label: "Calibration Monitor", sub: "Drift detection, validation", x: bx + 24 + (cw + 14) * 2 },
        { label: "Override Workflow", sub: "Corrections captured, approved", x: bx + 24 + (cw + 14) * 3 },
      ].map(b => (
        <g key={b.label}>
          <rect x={b.x} y={govY + 20} width={cw} height={ch - 10} rx={6} fill={C.white} stroke={C.maerskNavy} strokeWidth={1} opacity={0.7} />
          <text x={b.x + cw / 2} y={govY + 20 + 13} textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{b.label}</text>
          <text x={b.x + cw / 2} y={govY + 20 + 25} textAnchor="middle" style={{ fontSize: 7, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub}</text>
        </g>
      ))}

      {/* Legend */}
      <g>
        <rect x={bx + 10} y={H - 28} width={10} height={10} rx={3} fill={processingFill} stroke={C.maerskStar} strokeWidth={1} />
        <text x={bx + 26} y={H - 20} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Processing</text>
        <rect x={bx + 100} y={H - 28} width={10} height={10} rx={3} fill={storageFill} stroke="#b3dce8" strokeWidth={1} />
        <text x={bx + 116} y={H - 20} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Storage</text>
        <rect x={bx + 180} y={H - 28} width={10} height={10} rx={3} fill="rgba(234,179,8,0.08)" stroke={C.warning} strokeWidth={1} />
        <text x={bx + 196} y={H - 20} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Human Review</text>
        <rect x={bx + 290} y={H - 28} width={10} height={10} rx={3} fill={govFill} stroke={C.maerskNavy} strokeWidth={1} opacity={0.6} />
        <text x={bx + 306} y={H - 20} style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>Governance</text>
      </g>
    </svg>
  );
}
