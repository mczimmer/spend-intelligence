import { C, font } from "@/lib/constants";

export default function DiagramPaceLayered() {
  const W = 920, layerX = 20, layerW = 880;
  const boxW = 152, boxH = 38, boxGap = 14, boxRx = 8;

  const layers = [
    {
      label: "DIFFERENTIATION",
      subtitle: "New capabilities — what this engagement delivers",
      y: 10, h: 100,
      fill: "rgba(66,176,213,0.10)",
      stroke: C.maerskStar,
      labelColor: C.maerskStar,
      boxes: [
        { text: "Spend Intelligence Engine", bold: true },
        { text: "Unified Taxonomy" },
        { text: "Code Reconciliation" },
        { text: "Spend Cube" },
        { text: "Human Review Queue" },
      ],
    },
    {
      label: "RECORD",
      subtitle: "Stable foundation — what Maersk already operates",
      y: 134, h: 100,
      fill: C.valtechLight,
      stroke: C.valtechBorder,
      labelColor: C.valtechGray,
      boxes: [
        { text: "SAP S/4HANA" },
        { text: "Oracle Procurement" },
        { text: "Coupa / Ariba" },
        { text: "General Ledger" },
        { text: "Entity Master Data" },
      ],
    },
    {
      label: "INNOVATION",
      subtitle: "Future capabilities — what becomes possible",
      y: 258, h: 94,
      fill: "rgba(34,197,94,0.08)",
      stroke: C.success,
      labelColor: C.success,
      boxes: [
        { text: "Continuous Learning" },
        { text: "Acquisition Auto-Onboard" },
        { text: "Predictive Category Mgmt" },
        { text: "Anomaly Detection" },
      ],
    },
  ];

  const renderBoxes = (boxes: { text: string; bold?: boolean }[], layerY: number, layerH: number, accent: string) => {
    const count = boxes.length;
    const totalBoxW = count * boxW + (count - 1) * boxGap;
    const startX = layerX + (layerW - totalBoxW) / 2;
    const boxY = layerY + layerH - boxH - 14;
    return boxes.map((b, i) => {
      const x = startX + i * (boxW + boxGap);
      return (
        <g key={b.text}>
          <rect x={x} y={boxY} width={boxW} height={boxH} rx={boxRx} fill={C.white} stroke={accent} strokeWidth={b.bold ? 2 : 1.5} />
          <text x={x + boxW / 2} y={boxY + boxH / 2 + 4} textAnchor="middle" style={{ fontSize: b.bold ? 11 : 10, fontWeight: b.bold ? 800 : 600, fill: C.maerskNavy, fontFamily: font.sans }}>{b.text}</text>
        </g>
      );
    });
  };

  return (
    <svg viewBox={`0 0 ${W} 362`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowPL" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.valtechBorder} />
        </marker>
      </defs>

      {layers.map(layer => (
        <g key={layer.label}>
          {/* Layer background */}
          <rect x={layerX} y={layer.y} width={layerW} height={layer.h} rx={10} fill={layer.fill} stroke={layer.stroke} strokeWidth={1.5} />
          {/* Label */}
          <text x={layerX + 16} y={layer.y + 22} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", fill: layer.labelColor, fontFamily: font.sans }}>{layer.label}</text>
          {/* Subtitle */}
          <text x={layerX + 16} y={layer.y + 38} style={{ fontSize: 10, fill: C.valtechGray, fontFamily: font.sans }}>{layer.subtitle}</text>
          {/* Boxes */}
          {renderBoxes(layer.boxes, layer.y, layer.h, layer.stroke)}
        </g>
      ))}

      {/* Dashed connectors: Record → Differentiation */}
      {[280, 460, 640].map(cx => (
        <line key={`up-${cx}`} x1={cx} y1={layers[1].y - 1} x2={cx} y2={layers[0].y + layers[0].h + 1} stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowPL)" />
      ))}

      {/* Dashed connectors: Differentiation → Innovation */}
      {[320, 500, 680].map(cx => (
        <line key={`down-${cx}`} x1={cx} y1={layers[1].y + layers[1].h + 1} x2={cx} y2={layers[2].y - 1} stroke={C.valtechBorder} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#arrowPL)" />
      ))}
    </svg>
  );
}
