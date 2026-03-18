import { C, font } from "@/lib/constants";

export default function DiagramTimeline() {
  const phases = [
    { label: "Phase 1", title: "Validate", weeks: "Weeks 1–3", items: ["Data sample ingestion", "Taxonomy mapping", "Accuracy benchmarking"], color: C.maerskStar },
    { label: "Phase 2", title: "Pilot", weeks: "Weeks 4–8", items: ["2 category groups live", "SAP integration", "Feedback loop tuning"], color: C.maerskBlue },
    { label: "Phase 3", title: "Scale", weeks: "Weeks 9–14", items: ["All categories live", "Multi-entity rollout", "Dashboard delivery"], color: C.maerskNavy },
    { label: "Phase 4", title: "Embed", weeks: "Weeks 15–18", items: ["Self-service tooling", "Continuous learning", "Handover & training"], color: C.maerskNavy },
  ];
  const phaseW = 185, gap = 16;
  const totalW = phases.length * (phaseW + gap) - gap + 40;
  return (
    <svg viewBox={`0 0 ${totalW} 160`} style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <rect x={20} y={12} width={totalW - 40} height={4} rx={2} fill={C.valtechBorder} />
      {phases.map((p, i) => {
        const x = 20 + i * (phaseW + gap);
        return (
          <g key={i}>
            <circle cx={x + phaseW / 2} cy={14} r={7} fill={p.color} />
            <rect x={x} y={34} width={phaseW} height={116} rx={10} fill={C.white} stroke={p.color} strokeWidth={1.5} />
            <text x={x + 14} y={54} style={{ fontSize: 9, fontWeight: 700, fill: p.color, letterSpacing: "0.08em", fontFamily: font.sans }}>{p.label}</text>
            <text x={x + 14} y={70} style={{ fontSize: 13, fontWeight: 700, fill: C.maerskNavy, fontFamily: font.sans }}>{p.title}</text>
            <text x={x + 14} y={84} style={{ fontSize: 9, fill: C.valtechGray, fontFamily: font.sans }}>{p.weeks}</text>
            {p.items.map((item, j) => (
              <text key={j} x={x + 14} y={104 + j * 14} style={{ fontSize: 10, fill: C.valtechGray, fontFamily: font.sans }}>{"\u2022"} {item}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
