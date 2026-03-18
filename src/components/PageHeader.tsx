import { C, font } from "@/lib/constants";
import SectionLabel from "./SectionLabel";

export default function PageHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel text={label} />
      <h2 style={{ fontFamily: font.sans, fontSize: 28, fontWeight: 800, color: C.maerskNavy, margin: "0 0 8px", lineHeight: 1.25 }}>{title}</h2>
      <p style={{ fontFamily: font.sans, fontSize: 15, lineHeight: 1.7, color: C.valtechGray, margin: 0, maxWidth: 700 }}>{subtitle}</p>
    </div>
  );
}
