import { ReactNode } from "react";
import { C } from "@/lib/constants";

export default function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.valtechBorder}`, borderRadius: 12, padding: "24px 28px", ...style }}>
      {children}
    </div>
  );
}
