import { ReactNode } from "react";

export default function Section({ id, children, bg, py }: { id?: string; children: ReactNode; bg?: string; py?: number }) {
  return (
    <section id={id} style={{ background: bg || "transparent", padding: `${py || 80}px 0` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>{children}</div>
    </section>
  );
}
