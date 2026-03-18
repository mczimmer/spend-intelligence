import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { C, font } from "@/lib/constants";
import { posthog } from "@/lib/posthog";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import PageHeader from "@/components/PageHeader";

// ── Formatting ──

function fmtCurrency(n: number): string {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + Math.round(n / 1e3).toLocaleString() + "K";
  return "$" + Math.round(n).toLocaleString();
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(n >= 0.1 ? 0 : 1) + "%";
}

function fmtSpend(n: number): string {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(0) + "B";
  return "$" + (n / 1e6).toFixed(0) + "M";
}

// ── Slider ──

function Slider({ label, helper, value, min, max, step, format, onChange }: {
  label: string; helper: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: C.maerskStar, fontFamily: font.mono }}>{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", height: 5, borderRadius: 3, outline: "none", cursor: "pointer", WebkitAppearance: "none", appearance: "none" as any, background: `linear-gradient(to right, ${C.maerskStar} 0%, ${C.maerskStar} ${pct}%, ${C.valtechBorder} ${pct}%, ${C.valtechBorder} 100%)` }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 10, color: C.valtechGray, fontFamily: font.sans }}>{format(min)}</span>
        <span style={{ fontSize: 10, color: C.valtechGray, fontFamily: font.sans }}>{format(max)}</span>
      </div>
      <p style={{ fontSize: 11, color: C.valtechGray, fontFamily: font.sans, margin: "4px 0 0", lineHeight: 1.5 }}>{helper}</p>
    </div>
  );
}

// ── Page ──

export default function Calculator() {
  const [spend, setSpend] = useState(15e9);
  const [entities, setEntities] = useState(10);
  const [fragRate, setFragRate] = useState(0.15);
  const [captureRate, setCaptureRate] = useState(0.06);
  const [reconCost, setReconCost] = useState(2e6);

  // Debounced PostHog tracking
  const debounceRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const trackInput = useCallback((input: string, value: number | string) => {
    if (typeof window === "undefined" || !posthog?.capture) return;
    if (debounceRef.current[input]) clearTimeout(debounceRef.current[input]);
    debounceRef.current[input] = setTimeout(() => {
      posthog.capture("calculator_input_changed", { input, value });
    }, 500);
  }, []);

  // Driver 1: Supplier consolidation
  const d1 = spend * fragRate * captureRate;

  // Driver 2: Reconciliation efficiency
  const automationRate = 0.80;
  const d2 = reconCost * automationRate;

  // Driver 3: Onboarding acceleration
  const manualCost = 500000;
  const aiCost = 50000;
  const d3 = entities * (manualCost - aiCost);

  // Total
  const total = d1 + d2 + d3;

  const thStyle: React.CSSProperties = { textAlign: "left", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.valtechGray, padding: "10px 12px", borderBottom: `2px solid ${C.valtechBorder}`, fontFamily: font.sans, fontWeight: 700 };
  const tdStyle: React.CSSProperties = { padding: "10px 12px", fontSize: 13, fontFamily: font.sans, color: C.valtechGray, lineHeight: 1.6 };

  return (
    <div>
      <PageHeader
        label="Proof of Concept"
        title="ROI Model"
        subtitle="A directional model for estimating the financial impact of unified spend intelligence at Maersk's scale. Adjust the inputs to reflect your assumptions. The methodology is visible. The defaults are conservative."
      />
      <p style={{ fontFamily: font.sans, fontSize: 13, color: C.valtechGray, marginTop: -24, marginBottom: 32, lineHeight: 1.7 }}>All calculations run in your browser. No data is transmitted or stored.</p>

      {/* Two-column: inputs + outputs */}
      <div className="calc-layout" style={{ display: "flex", gap: 32, marginBottom: 32 }}>

        {/* Inputs */}
        <div className="calc-inputs" style={{ flex: "0 0 38%", minWidth: 0 }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 20, height: 2, background: C.maerskStar }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.maerskStar, fontFamily: font.sans }}>Inputs</span>
            </div>

            <Slider
              label="Addressable procurement spend"
              helper="Maersk's total cost of revenue is $48.5B (2024). Addressable procurement is a subset. $15B is a conservative default."
              value={spend} min={1e9} max={50e9} step={1e9}
              format={fmtSpend} onChange={v => { setSpend(v); trackInput("spend", v); }}
            />

            <Slider
              label="Acquired entity systems"
              helper="Maersk has integrated 10+ entities including Hamburg Sud, Safmarine, Sealand, APM Terminals, LF Logistics, and Senator International."
              value={entities} min={2} max={20} step={1}
              format={v => String(v)} onChange={v => { setEntities(v); trackInput("entities", v); }}
            />

            <Slider
              label="Category fragmentation rate"
              helper="Percentage of spend where the same goods/services are described differently across entities. 15% is based on industry benchmarks for post-acquisition environments. The POC sample showed fragmentation in 100% of categories tested."
              value={fragRate} min={0.05} max={0.40} step={0.01}
              format={v => Math.round(v * 100) + "%"} onChange={v => { setFragRate(v); trackInput("frag_rate", v); }}
            />

            <Slider
              label="Consolidation capture rate"
              helper="Percentage of fragmented spend where supplier consolidation yields savings. 6% is conservative. The POC sample demonstrated 9.2%. Industry range: 4-12% depending on category maturity."
              value={captureRate} min={0.02} max={0.15} step={0.005}
              format={v => (v * 100).toFixed(1) + "%"} onChange={v => { setCaptureRate(v); trackInput("capture_rate", v); }}
            />

            <Slider
              label="Annual reconciliation FTE cost"
              helper="Estimated cost of manual payment-code and material-code reconciliation across all entities. Includes finance team effort, category manager time, and periodic consulting engagements."
              value={reconCost} min={0} max={5e6} step={100000}
              format={fmtCurrency} onChange={v => { setReconCost(v); trackInput("recon_cost", v); }}
            />
          </Card>
        </div>

        {/* Outputs */}
        <div className="calc-outputs" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Driver 1 */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>Supplier Consolidation</h3>
                  <p style={{ fontFamily: font.sans, fontSize: 12, color: C.valtechGray, margin: "2px 0 0" }}>Savings from rationalising duplicate suppliers across entity boundaries</p>
                </div>
                <Badge color="amber">HIGH SENSITIVITY</Badge>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans, margin: "8px 0 4px" }}>{fmtCurrency(d1)}</div>
              <div style={{ fontSize: 11, fontFamily: font.mono, color: C.valtechGray }}>{fmtSpend(spend)} {"\u00d7"} {Math.round(fragRate * 100)}% fragmentation {"\u00d7"} {(captureRate * 100).toFixed(1)}% capture = {fmtCurrency(d1)}</div>
              <p style={{ fontSize: 11, color: C.valtechGray, fontFamily: font.sans, margin: "6px 0 0" }}>Most sensitive to fragmentation rate and consolidation capture inputs</p>
            </Card>

            {/* Driver 2 */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>Reconciliation Automation</h3>
                  <p style={{ fontFamily: font.sans, fontSize: 12, color: C.valtechGray, margin: "2px 0 0" }}>FTE reduction from automated payment/material code matching</p>
                </div>
                <Badge color="green">LOW SENSITIVITY</Badge>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans, margin: "8px 0 4px" }}>{fmtCurrency(d2)}</div>
              <div style={{ fontSize: 11, fontFamily: font.mono, color: C.valtechGray }}>{fmtCurrency(reconCost)} FTE cost {"\u00d7"} 80% automation = {fmtCurrency(d2)}</div>
              <p style={{ fontSize: 11, color: C.valtechGray, fontFamily: font.sans, margin: "6px 0 0" }}>Driven by known FTE cost. Most predictable driver.</p>
            </Card>

            {/* Driver 3 */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: C.maerskNavy, margin: 0 }}>Onboarding Acceleration</h3>
                  <p style={{ fontFamily: font.sans, fontSize: 12, color: C.valtechGray, margin: "2px 0 0" }}>Cost avoided by reducing entity taxonomy onboarding from months to days</p>
                </div>
                <Badge color="blue">MEDIUM SENSITIVITY</Badge>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans, margin: "8px 0 4px" }}>{fmtCurrency(d3)}</div>
              <div style={{ fontSize: 11, fontFamily: font.mono, color: C.valtechGray }}>({entities} entities {"\u00d7"} $500K manual) - ({entities} entities {"\u00d7"} $50K AI) = {fmtCurrency(d3)}</div>
              <p style={{ fontSize: 11, color: C.valtechGray, fontFamily: font.sans, margin: "6px 0 0" }}>Scales with acquisition frequency. Compounds over time.</p>
            </Card>

            {/* Driver 4: Qualitative */}
            <Card style={{ background: C.valtechLight, borderColor: C.valtechBorder }}>
              <h3 style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: C.maerskNavy, margin: "0 0 6px" }}>Decision Reliability</h3>
              <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: C.valtechGray, margin: 0, fontStyle: "italic" }}>Category managers making sourcing decisions on unified data instead of fragmented views. Not quantified here because the value depends on decision context, but this is where the largest long-term impact lives.</p>
            </Card>

            {/* Total */}
            <div style={{ background: C.maerskLight, borderRadius: 10, padding: "16px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, fontFamily: font.sans, marginBottom: 4 }}>ESTIMATED ANNUAL IMPACT</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans }}>{fmtCurrency(total)}</div>
              <p style={{ fontSize: 12, color: C.valtechGray, fontFamily: font.sans, margin: "4px 0 0" }}>Conservative estimate. Excludes decision quality improvement and contract leakage reduction.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology note */}
      <Card style={{ borderLeft: `3px solid ${C.maerskStar}`, marginBottom: 32 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 8px" }}>How to read this model</h3>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.maerskNavy, margin: "0 0 12px" }}>This is a directional model, not a business case. The defaults are deliberately conservative: $15B addressable spend (vs. $48.5B total cost of revenue), 6% consolidation capture (vs. 9.2% demonstrated in the POC sample), and 15% fragmentation rate (vs. 100% observed in POC categories).</p>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.maerskNavy, margin: "0 0 12px" }}>The model has three quantified drivers and one qualitative driver. Supplier consolidation is the largest lever and the most sensitive to the fragmentation rate input. Reconciliation efficiency is the most certain because it replaces a known manual process. Onboarding acceleration compounds with each future acquisition.</p>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.maerskNavy, margin: 0 }}>The numbers are designed to survive scrutiny in an internal review. If the fragmentation rate or consolidation capture rate feels too high for your context, adjust them downward. The model remains compelling at conservative assumptions because the addressable base is large.</p>
      </Card>

      {/* Assumptions table */}
      <Card style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 16px" }}>Assumptions</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Assumption</th>
              <th style={thStyle}>Default</th>
              <th style={thStyle}>Range</th>
              <th style={thStyle}>Basis</th>
            </tr>
          </thead>
          <tbody>
            {[
              { assumption: "Addressable procurement spend", def: "$15B", range: "$1-50B", basis: "Subset of $48.5B cost of revenue (2024 annual report)" },
              { assumption: "Category fragmentation rate", def: "15%", range: "5-40%", basis: "Industry benchmark for post-acquisition environments. POC showed 100% in tested categories" },
              { assumption: "Consolidation capture rate", def: "6%", range: "2-15%", basis: "POC demonstrated 9.2%. 6% accounts for real-world constraints. Industry range: 4-12%" },
              { assumption: "Reconciliation automation rate", def: "80%", range: "Fixed", basis: "Based on classification accuracy target (92%+) minus edge cases requiring manual review" },
              { assumption: "Manual onboarding cost per entity", def: "$500K", range: "Fixed", basis: "Typical cost of consulting-led taxonomy mapping engagement (3-6 months)" },
              { assumption: "AI onboarding cost per entity", def: "$50K", range: "Fixed", basis: "Estimated cost of AI-assisted entity taxonomy integration (5 days)" },
              { assumption: "Annual reconciliation FTE cost", def: "$2M", range: "$0-5M", basis: "Estimated across all entities. Includes finance, category management, and periodic consulting" },
            ].map(r => (
              <tr key={r.assumption} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ ...tdStyle, fontWeight: 700, color: C.maerskNavy }}>{r.assumption}</td>
                <td style={{ ...tdStyle, fontFamily: font.mono, fontSize: 12 }}>{r.def}</td>
                <td style={{ ...tdStyle, fontFamily: font.mono, fontSize: 12 }}>{r.range}</td>
                <td style={tdStyle}>{r.basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Bridge to action */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 32 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, marginBottom: 16, fontFamily: font.sans }}>WHAT THIS NUMBER JUSTIFIES</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          <div>
            <h4 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 6px" }}>Phase 1 validation</h4>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>If the model outputs $50M+ in annual impact at conservative assumptions, a 3-week validation phase costing less than $100K represents a 500:1 ratio of potential value to validation cost. The question is not whether the investment is justified. The question is whether the assumptions hold against real data.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 6px" }}>Where to start</h4>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>The highest-value categories to validate first are those with the highest spend, the most entity fragmentation, and the widest code divergence. In the POC sample, marine fuels and hull coatings showed the strongest signal. Phase 1 should target 2-3 equivalent categories from real M{"\u00e6"}rsk data.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 6px" }}>Connection to the demo</h4>
            <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>This model uses the same consolidation logic demonstrated in the interactive proof of concept. The 9.2% savings rate from the POC sample is the upper bound. The 6% default in this model is the conservative baseline. The{" "}<Link href="/demo" style={{ color: C.maerskStar, textDecoration: "none" }}>demo</Link> shows the method. This model shows the scale.</p>
          </div>
        </div>
      </Card>

      {/* CTA footer */}
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.maerskBlue, margin: 0 }}>
          Ready to validate these numbers? Phase 1 uses a real data sample to benchmark accuracy and confirm the savings hypothesis. The investment is a sample dataset, 3 weeks, and a decision.{" "}
          <Link href="/approach" style={{ color: C.maerskStar, textDecoration: "none", fontWeight: 700 }}>View the engagement approach</Link>
        </p>
      </Card>

      {/* Slider + responsive styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: ${C.maerskStar};
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          margin-top: -7px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: ${C.maerskStar};
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        input[type="range"]::-moz-range-track {
          height: 5px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
