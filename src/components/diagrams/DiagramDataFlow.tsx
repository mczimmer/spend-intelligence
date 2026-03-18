import { C, font } from "@/lib/constants";

export default function DiagramDataFlow() {
  const boxW = 140, boxH = 52, gap = 32;
  const sources = ["SAP ERP", "Oracle\nProcure", "Legacy\nSpreadsheets", "Acquired\nEntity DBs"];
  const pipeline = ["Data\nIngestion", "AI Semantic\nClassifier", "Confidence\nScoring", "Human\nReview"];
  const outputs = ["Unified\nTaxonomy", "Reconciled\nCodes", "Spend\nCube"];
  const drawBoxes = (items: string[], y: number, color: string, startX: number) => items.map((t, i) => {
    const x = startX + i * (boxW + gap);
    return (
      <g key={t + i}>
        <rect x={x} y={y} width={boxW} height={boxH} rx={8} fill={color} stroke={C.maerskStar} strokeWidth={1.5} />
        {t.split("\n").map((line, li) => (
          <text key={li} x={x + boxW / 2} y={y + (t.split("\n").length > 1 ? 18 + li * 16 : 30)} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{line}</text>
        ))}
      </g>
    );
  });
  const totalW = Math.max(sources.length, pipeline.length, outputs.length) * (boxW + gap) - gap;
  const sx = (_s: string, n: number) => (totalW - n * (boxW + gap) + gap) / 2;
  return (
    <svg viewBox={`0 0 ${totalW + 40} 280`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <text x={20} y={20} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>SOURCE SYSTEMS</text>
      {drawBoxes(sources, 30, C.maerskLight, 20 + sx("s", sources.length))}
      <text x={20} y={118} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>AI PIPELINE</text>
      {drawBoxes(pipeline, 128, "#EBF5FF", 20 + sx("p", pipeline.length))}
      <text x={20} y={216} style={{ fontSize: 10, fontWeight: 700, fill: C.valtechGray, letterSpacing: "0.08em", fontFamily: font.sans }}>OUTPUTS</text>
      {drawBoxes(outputs, 226, "#dcfce7", 20 + sx("o", outputs.length))}
      {[90, 188].map(ay => (
        <g key={ay}>
          <line x1={totalW / 2 + 20} y1={ay} x2={totalW / 2 + 20} y2={ay + 30} stroke={C.maerskStar} strokeWidth={2} markerEnd="url(#arrowM)" />
        </g>
      ))}
      <defs>
        <marker id="arrowM" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
      </defs>
    </svg>
  );
}
