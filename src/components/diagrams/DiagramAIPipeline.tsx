import { C, font } from "@/lib/constants";

export default function DiagramAIPipeline() {
  const steps = [
    { label: "Raw Descriptions", sub: "Multi-language, multi-format", icon: "\u{1F4E5}" },
    { label: "Text Embedding", sub: "Semantic vectorisation", icon: "\u{1F524}" },
    { label: "Similarity Matching", sub: "Cosine distance clustering", icon: "\u{1F517}" },
    { label: "Category Mapping", sub: "UNSPSC taxonomy alignment", icon: "\u{1F5C2}\uFE0F" },
    { label: "Confidence Score", sub: "Threshold-based routing", icon: "\u{1F4CA}" },
    { label: "Human Review", sub: "Low-confidence triage", icon: "\u{1F464}" },
  ];
  const w = 150, h = 70, gap = 16;
  const totalW = steps.length * (w + gap) - gap + 40;
  return (
    <svg viewBox={`0 0 ${totalW} 100`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      {steps.map((s, i) => {
        const x = 20 + i * (w + gap);
        const isAI = i >= 1 && i <= 4;
        return (
          <g key={i}>
            <rect x={x} y={10} width={w} height={h} rx={10} fill={isAI ? "#EBF5FF" : C.valtechLight} stroke={isAI ? C.maerskStar : C.valtechBorder} strokeWidth={1.5} />
            <text x={x + w / 2} y={36} textAnchor="middle" style={{ fontSize: 14 }}>{s.icon}</text>
            <text x={x + w / 2} y={52} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{s.label}</text>
            <text x={x + w / 2} y={66} textAnchor="middle" style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{s.sub}</text>
            {i < steps.length - 1 && (
              <line x1={x + w + 2} y1={45} x2={x + w + gap - 2} y2={45} stroke={C.maerskStar} strokeWidth={1.5} markerEnd="url(#arrowP)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowP" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.maerskStar} />
        </marker>
      </defs>
    </svg>
  );
}
