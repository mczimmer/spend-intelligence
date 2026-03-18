import { C, font } from "@/lib/constants";

export default function DiagramPhase1Flow() {
  const W = 920, H = 230;
  const bw = 134, bh = 56, rx = 8, gap = 26;

  // Row positions
  const mainY = 40;
  const splitY = mainY + bh + 40;

  // Main flow boxes (left to right)
  const boxes = [
    { label: "Source Extracts", sub: "CSV / Excel from", sub2: "2-3 entities", x: 20, y: mainY, fill: C.valtechLight, stroke: C.valtechBorder },
    { label: "Normalisation", sub: "Encoding, currency,", sub2: "units, dedup", x: 20 + bw + gap, y: mainY, fill: "rgba(66,176,213,0.10)", stroke: C.maerskStar },
    { label: "AI Classifier", sub: "Semantic matching +", sub2: "UNSPSC mapping", x: 20 + (bw + gap) * 2, y: mainY, fill: "rgba(66,176,213,0.10)", stroke: C.maerskStar },
    { label: "Confidence Scoring", sub: "Threshold-based", sub2: "routing", x: 20 + (bw + gap) * 3, y: mainY, fill: "rgba(66,176,213,0.10)", stroke: C.maerskStar },
  ];

  // Output boxes
  const classifiedX = 20 + (bw + gap) * 3 + bw + gap + 20;
  const humanX = 20 + (bw + gap) * 3;
  const classifiedBox = { label: "Classified Output", sub: "Unified taxonomy", sub2: "+ codes", x: classifiedX, y: mainY, fill: "rgba(34,197,94,0.10)", stroke: C.success };
  const humanBox = { label: "Human Review", sub: "Priority queue by", sub2: "spend impact", x: humanX, y: splitY, fill: "rgba(234,179,8,0.10)", stroke: C.warning };

  const drawBox = (b: typeof boxes[0]) => (
    <g key={b.label}>
      <rect x={b.x} y={b.y} width={bw} height={bh} rx={rx} fill={b.fill} stroke={b.stroke} strokeWidth={1.5} />
      <text x={b.x + bw / 2} y={b.y + 16} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{b.label}</text>
      <text x={b.x + bw / 2} y={b.y + 30} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub}</text>
      {b.sub2 && <text x={b.x + bw / 2} y={b.y + 42} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{b.sub2}</text>}
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowPh1" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
        <marker id="arrowPh1w" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.warning} />
        </marker>
        <marker id="arrowPh1g" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.success} />
        </marker>
      </defs>

      {/* Main flow boxes */}
      {boxes.map(drawBox)}

      {/* Output boxes */}
      {drawBox(classifiedBox)}
      {drawBox(humanBox)}

      {/* Arrows: main flow (horizontal) */}
      {boxes.slice(0, -1).map((b, i) => (
        <path key={i} d={`M ${b.x + bw + 2} ${mainY + bh / 2} L ${boxes[i + 1].x - 2} ${mainY + bh / 2}`} fill="none" stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowPh1)" />
      ))}

      {/* Confidence Scoring -> Classified Output (high confidence, up-right) */}
      <path d={`M ${boxes[3].x + bw + 2} ${mainY + bh / 2 - 8} L ${classifiedBox.x - 2} ${mainY + bh / 2 - 8}`} fill="none" stroke={C.success} strokeWidth={1.5} markerEnd="url(#arrowPh1g)" />
      <text x={(boxes[3].x + bw + classifiedBox.x) / 2} y={mainY + bh / 2 - 14} textAnchor="middle" style={{ fontSize: 8, fill: C.success, fontFamily: font.sans }}>85%+ confidence</text>

      {/* Confidence Scoring -> Human Review (below threshold) */}
      <path d={`M ${boxes[3].x + bw / 2} ${mainY + bh + 2} L ${boxes[3].x + bw / 2} ${splitY + bh / 2} L ${humanBox.x + bw + 2} ${splitY + bh / 2}`} fill="none" stroke={C.warning} strokeWidth={1.5} />
      <text x={boxes[3].x + bw / 2 + 10} y={mainY + bh + 20} textAnchor="start" style={{ fontSize: 8, fill: C.warning, fontFamily: font.sans }}>Below threshold</text>

      {/* Human Review -> Classified Output (validated) */}
      <path d={`M ${humanBox.x + bw + 15} ${splitY} L ${humanBox.x + bw + 15} ${splitY - 15} L ${classifiedBox.x + bw / 2} ${splitY - 15} L ${classifiedBox.x + bw / 2} ${mainY + bh + 2}`} fill="none" stroke={C.success} strokeWidth={1.5} markerEnd="url(#arrowPh1g)" />
      <text x={(humanBox.x + bw + classifiedBox.x + bw / 2) / 2} y={splitY - 20} textAnchor="middle" style={{ fontSize: 8, fill: C.success, fontFamily: font.sans }}>Validated</text>

      {/* Flow label */}
      <text x={20} y={16} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>PHASE 1 FLOW</text>
    </svg>
  );
}
