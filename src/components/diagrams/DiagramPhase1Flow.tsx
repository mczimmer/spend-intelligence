import { C, font } from "@/lib/constants";

export default function DiagramPhase1Flow() {
  const W = 920, H = 240;
  const bw = 120, bh = 54, rx = 8, gap = 20;

  const mainY = 36;
  const splitY = mainY + bh + 50;

  // Main flow: 4 boxes left to right
  const x0 = 20;
  const boxes = [
    { label: "Source Extracts", sub: "CSV / Excel from", sub2: "2-3 entities", x: x0, fill: C.valtechLight, stroke: C.valtechBorder },
    { label: "Normalisation", sub: "Encoding, currency,", sub2: "units, dedup", x: x0 + bw + gap, fill: "rgba(66,176,213,0.10)", stroke: C.maerskStar },
    { label: "AI Classifier", sub: "Semantic matching +", sub2: "UNSPSC mapping", x: x0 + (bw + gap) * 2, fill: "rgba(66,176,213,0.10)", stroke: C.maerskStar },
    { label: "Confidence Scoring", sub: "Threshold-based", sub2: "routing", x: x0 + (bw + gap) * 3, fill: "rgba(66,176,213,0.10)", stroke: C.maerskStar },
  ];

  // Classified Output: further right, same row
  const classifiedX = x0 + (bw + gap) * 4 + 30;
  // Human Review: below Confidence Scoring, shifted right
  const humanX = classifiedX;

  const drawBox = (label: string, sub: string, sub2: string | undefined, bx: number, by: number, fill: string, stroke: string) => (
    <g key={label}>
      <rect x={bx} y={by} width={bw} height={bh} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={bx + bw / 2} y={by + 16} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{label}</text>
      <text x={bx + bw / 2} y={by + 30} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{sub}</text>
      {sub2 && <text x={bx + bw / 2} y={by + 42} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{sub2}</text>}
    </g>
  );

  const csRight = boxes[3].x + bw;
  const csMidY = mainY + bh / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowPh1" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
        <marker id="arrowPh1g" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.success} />
        </marker>
        <marker id="arrowPh1w" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.warning} />
        </marker>
      </defs>

      {/* Flow label */}
      <text x={20} y={16} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>PHASE 1 FLOW</text>

      {/* Main flow boxes */}
      {boxes.map(b => drawBox(b.label, b.sub, b.sub2, b.x, mainY, b.fill, b.stroke))}

      {/* Output boxes */}
      {drawBox("Classified Output", "Unified taxonomy", "+ codes", classifiedX, mainY, "rgba(34,197,94,0.10)", C.success)}
      {drawBox("Human Review", "Priority queue,", "spend impact", humanX, splitY, "rgba(234,179,8,0.10)", C.warning)}

      {/* Arrows: main flow (horizontal between first 4 boxes) */}
      {boxes.slice(0, -1).map((b, i) => (
        <path key={i} d={`M ${b.x + bw + 2} ${csMidY} L ${boxes[i + 1].x - 2} ${csMidY}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowPh1)" />
      ))}

      {/* Confidence Scoring -> Classified Output (high confidence, horizontal) */}
      <path d={`M ${csRight + 2} ${mainY + bh / 2 - 6} L ${classifiedX - 2} ${mainY + bh / 2 - 6}`} fill="none" stroke={C.success} strokeWidth={1.5} markerEnd="url(#arrowPh1g)" />
      <text x={(csRight + classifiedX) / 2} y={mainY + bh / 2 - 14} textAnchor="middle" style={{ fontSize: 8, fill: C.success, fontFamily: font.sans }}>85%+ confidence</text>

      {/* Confidence Scoring -> Human Review (L-shape: down then right) */}
      {(() => {
        const downX = csRight + 14;
        return (
          <>
            <path d={`M ${downX} ${mainY + bh + 2} L ${downX} ${splitY + bh / 2} L ${humanX - 2} ${splitY + bh / 2}`} fill="none" stroke={C.warning} strokeWidth={1.5} markerEnd="url(#arrowPh1w)" />
            <text x={downX + 8} y={mainY + bh + 18} textAnchor="start" style={{ fontSize: 8, fill: C.warning, fontFamily: font.sans }}>Below threshold</text>
          </>
        );
      })()}

      {/* Human Review -> Classified Output (L-shape: up from left edge) */}
      <path d={`M ${humanX - 2} ${splitY + 10} L ${humanX - 14} ${splitY + 10} L ${humanX - 14} ${mainY + bh + 6} L ${classifiedX + bw / 2} ${mainY + bh + 6} L ${classifiedX + bw / 2} ${mainY + bh + 2}`} fill="none" stroke={C.success} strokeWidth={1.5} markerEnd="url(#arrowPh1g)" />
      <text x={(humanX - 14 + classifiedX + bw / 2) / 2} y={mainY + bh + 18} textAnchor="middle" style={{ fontSize: 8, fill: C.success, fontFamily: font.sans }}>Validated</text>
    </svg>
  );
}
