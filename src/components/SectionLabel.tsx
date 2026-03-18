import { C } from "@/lib/constants";
import { font } from "@/lib/constants";

export default function SectionLabel({ text, color }: { text: string; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 20, height: 2, background: color || C.maerskStar }} />
      <span style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: color || C.maerskStar }}>{text}</span>
    </div>
  );
}
