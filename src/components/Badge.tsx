import { ReactNode } from "react";
import { C } from "@/lib/constants";

const colors: Record<string, { bg: string; text: string; border: string }> = {
  green: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  amber: { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
  red: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
  blue: { bg: C.maerskLight, text: C.maerskBlue, border: "#b3dce8" },
  gray: { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb" },
  navy: { bg: C.maerskNavy, text: C.white, border: C.maerskNavy },
};

export default function Badge({ color, children }: { color: string; children: ReactNode }) {
  const c = colors[color] || colors.gray;
  return (
    <span style={{ display: "inline-block", background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 9999, padding: "2px 10px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}
