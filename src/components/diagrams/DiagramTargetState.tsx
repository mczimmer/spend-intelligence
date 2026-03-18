import { C, font } from "@/lib/constants";

export default function DiagramTargetState() {
  const W = 940, H = 600;
  const cw = 130, ch = 44, rx = 8;
  const processingFill = "rgba(66,176,213,0.10)";
  const storageFill = "#EBF5FF";
  const govFill = "rgba(0,36,61,0.06)";

  // Boundary
  const bx = 20, by = 10, bw = 900;

  // Ingestion column
  const ingX = bx + 30;
  const ingY = by + 40;
  const ingGap = 14;

  // Processing column
  const procX = ingX + cw + 70;
  const procY = ingY + 10;
  const procGap = 18;

  // Confidence Scoring
  const csX = procX + cw + 60;

  // Human Review
  const hrX = csX + cw + 60;

  // Storage row
  const storeY = ingY + (ch + ingGap) * 2 + ch + 44;

  // Governance layer
  const govY = storeY + ch + 40;
  const govH = ch + 24;
  const bh = govY + govH - by + 16;

  // Computed y positions
  const ing1Y = ingY;
  const ing2Y = ingY + ch + ingGap;
  const ing3Y = ingY + (ch + ingGap) * 2;
  const modelRouterY = procY + ch + procGap;

  const drawBox = (label: string, sub: string, sub2: string | undefined, x: number, y: number, fill: string, stroke: string) => (
    <g key={label + x + y}>
      <rect x={x} y={y} width={cw} height={ch} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={x + cw / 2} y={y + (sub2 ? 14 : 18)} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{label}</text>
      <text x={x + cw / 2} y={y + (sub2 ? 26 : 30)} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>{sub}</text>
      {sub2 && <text x={x + cw / 2} y={y + 36} textAnchor="middle" style={{ fontSize: 8, fill: C.valtechGray, fontFamily: font.sans }}>{sub2}</text>}
    </g>
  );

  // Label with white background for readability
  const arrowLabel = (text: string, x: number, y: number, anchor: "start" | "middle" | "end" = "middle", color: string = C.valtechGray) => {
    const approxW = text.length * 4.2;
    const lx = anchor === "start" ? x - 2 : anchor === "end" ? x - approxW : x - approxW / 2;
    return (
      <>
        <rect x={lx} y={y - 8} width={approxW + 4} height={11} rx={2} fill={C.white} opacity={0.85} />
        <text x={x} y={y} textAnchor={anchor} style={{ fontSize: 7, fill: color, fontFamily: font.sans }}>{text}</text>
      </>
    );
  };

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
      {drawBox("Source Extract Adapter", "Connects to SAP, Oracle,", "entity systems", ingX, ing1Y, processingFill, C.maerskStar)}
      {drawBox("Normalisation", "Currency, encoding, units,", "naming resolution", ingX, ing2Y, processingFill, C.maerskStar)}
      {drawBox("Data Quality", "Missing fields, duplicates,", "provenance tagging", ingX, ing3Y, processingFill, C.maerskStar)}

      {/* Ingestion vertical arrows */}
      <path d={`M ${ingX + cw / 2} ${ing1Y + ch + 2} L ${ingX + cw / 2} ${ing2Y - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      <path d={`M ${ingX + cw / 2} ${ing2Y + ch + 2} L ${ingX + cw / 2} ${ing3Y - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Data Quality -> AI Classifier (L-shape) */}
      {(() => {
        const turnX = ingX + cw + 35;
        return (
          <path d={`M ${ingX + cw + 2} ${ing3Y + ch / 2} L ${turnX} ${ing3Y + ch / 2} L ${turnX} ${procY + ch / 2} L ${procX - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
        );
      })()}
      {arrowLabel("Source + record ID", ingX + cw + 38, ing3Y + ch / 2 - 6, "start")}

      {/* AI Classifier */}
      {drawBox("AI Classifier", "Semantic embedding +", "taxonomy mapping", procX, procY, processingFill, C.maerskStar)}

      {/* Model Router */}
      {drawBox("Model Router", "Provider-agnostic", "inference routing", procX, modelRouterY, processingFill, C.maerskStar)}

      {/* AI Classifier -> Model Router */}
      <path d={`M ${procX + cw / 2} ${procY + ch + 2} L ${procX + cw / 2} ${modelRouterY - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Model Router -> Inference (left, dashed) */}
      <path d={`M ${procX - 2} ${modelRouterY + ch / 2} L ${ingX + cw + 10} ${modelRouterY + ch / 2}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" />
      {arrowLabel("Inference", (procX + ingX + cw) / 2, modelRouterY + ch / 2 - 6)}

      {/* Confidence Scoring */}
      {drawBox("Confidence Scoring", "Threshold-based", "routing", csX, procY, processingFill, C.maerskStar)}

      {/* AI Classifier -> Confidence Scoring */}
      <path d={`M ${procX + cw + 2} ${procY + ch / 2} L ${csX - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Priority Router */}
      {drawBox("Priority Router", "Routes by spend", "impact and criticality", hrX, procY, "rgba(234,179,8,0.08)", C.warning)}

      {/* Reviewer Workbench */}
      {drawBox("Reviewer Workbench", "Validate, correct,", "escalate", hrX, procY + ch + procGap, "rgba(234,179,8,0.08)", C.warning)}

      {/* Confidence Scoring -> Priority Router */}
      <path d={`M ${csX + cw + 2} ${procY + ch / 2} L ${hrX - 2} ${procY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
      {arrowLabel("Low confidence", (csX + cw + hrX) / 2, procY + ch / 2 - 6)}

      {/* Priority Router -> Reviewer Workbench */}
      <path d={`M ${hrX + cw / 2} ${procY + ch + 2} L ${hrX + cw / 2} ${procY + ch + procGap - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* Confidence Scoring -> Taxonomy Store (L-shape) */}
      {(() => {
        const midY = storeY - 18;
        return (
          <path d={`M ${csX + cw / 2} ${procY + ch + 2} L ${csX + cw / 2} ${midY} L ${procX + cw / 2} ${midY} L ${procX + cw / 2} ${storeY - 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />
        );
      })()}
      {arrowLabel("High confidence", csX + cw / 2 + 10, procY + ch + 18, "start")}

      {/* Reviewer Workbench -> Reconciliation Engine (L-shape: down then left) */}
      {(() => {
        const rwBottom = procY + ch + procGap + ch;
        return (
          <path d={`M ${hrX + cw / 2} ${rwBottom + 2} L ${hrX + cw / 2} ${storeY + ch / 2} L ${hrX + cw + 2} ${storeY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} />
        );
      })()}
      {arrowLabel("+ reviewer ID + reason", hrX + cw / 2 + 10, procY + ch + procGap + ch + 16, "start")}

      {/* Reviewer Workbench -> Governance (dashed L-shape) */}
      {(() => {
        const rwMidY = procY + ch + procGap + ch / 2;
        const gx = hrX - 18;
        return (
          <path d={`M ${hrX - 2} ${rwMidY} L ${gx} ${rwMidY} L ${gx} ${govY + 8}`} fill="none" stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowTSg)" />
        );
      })()}
      {arrowLabel("Corrections feed calibration", hrX - 22, govY - 6, "end")}

      {/* Storage row */}
      {drawBox("Taxonomy Store", "Unified category", "hierarchy", procX, storeY, storageFill, "#b3dce8")}
      {drawBox("Vector DB", "Embeddings for", "similarity matching", csX, storeY, storageFill, "#b3dce8")}
      {drawBox("Reconciliation Engine", "Payment / material", "code alignment", hrX, storeY, storageFill, "#b3dce8")}

      {/* Taxonomy Store -> Reconciliation Engine */}
      <path d={`M ${procX + cw + 2} ${storeY + ch / 2} L ${hrX - 2} ${storeY + ch / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowTS)" />

      {/* AI Classifier <-> Vector DB (L-shape in gap) */}
      {(() => {
        const chX = procX + cw + 16;
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
        { label: "Audit & Decision Log", sub: "All decisions with provenance", x: bx + 24 + (cw + 20) },
        { label: "Calibration Monitor", sub: "Drift detection, validation", x: bx + 24 + (cw + 20) * 2 },
        { label: "Override Workflow", sub: "Corrections captured, approved", x: bx + 24 + (cw + 20) * 3 },
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
