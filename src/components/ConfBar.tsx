import { C, font } from "@/lib/constants";

export default function ConfBar({ value }: { value: number }) {
  const color = value >= 90 ? C.success : value >= 75 ? C.warning : C.danger;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 56, height: 5, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: font.mono }}>{value}%</span>
    </div>
  );
}
