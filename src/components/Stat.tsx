import { C, font } from "@/lib/constants";

export default function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, fontFamily: font.sans, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.maerskNavy, fontFamily: font.sans }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.valtechGray, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
