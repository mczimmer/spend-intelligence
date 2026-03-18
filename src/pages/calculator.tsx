import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { C, font } from "@/lib/constants";
import { posthog } from "@/lib/posthog";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";

// ── Formatting ──

function fmtCurrency(n: number): string {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return "$" + Math.round(n / 1e6).toLocaleString() + "M";
  if (n >= 1e3) return "$" + Math.round(n / 1e3).toLocaleString() + "K";
  return "$" + Math.round(n).toLocaleString();
}

function fmtHours(n: number): string {
  return Math.round(n).toLocaleString() + " hours";
}

function fmtSpend(n: number): string {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  return "$" + (n / 1e6).toFixed(0) + "M";
}

// ── Fragmentation config ──

type Frag = "low" | "medium" | "high";

const fragConfig = {
  low: { label: "Low", consolidationRate: 0.04, automationRate: 0.50, visibility: 0.30 },
  medium: { label: "Medium", consolidationRate: 0.07, automationRate: 0.70, visibility: 0.55 },
  high: { label: "High", consolidationRate: 0.10, automationRate: 0.85, visibility: 0.40 },
};

// ── Slider component ──

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
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
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

// ── Output panel ──

function OutputPanel({ num, title, headline, secondary, range, detail }: {
  num: string; title: string; headline: string; secondary?: string; range?: string; detail: string;
}) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: C.maerskLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: C.maerskStar, fontFamily: font.sans }}>{num}</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans }}>{title}</span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: C.maerskNavy, fontFamily: font.sans, lineHeight: 1.2 }}>{headline}</div>
      {range && <div style={{ fontSize: 13, color: C.valtechGray, fontFamily: font.sans, marginTop: 4 }}>{range}</div>}
      {secondary && <div style={{ fontSize: 14, fontWeight: 600, color: C.maerskBlue, fontFamily: font.sans, marginTop: 4 }}>{secondary}</div>}
      <p style={{ fontSize: 12, color: C.valtechGray, fontFamily: font.sans, margin: "8px 0 0", lineHeight: 1.6 }}>{detail}</p>
    </Card>
  );
}

// ── Page ──

export default function Calculator() {
  const [spend, setSpend] = useState(20e9);
  const [entities, setEntities] = useState(10);
  const [frag, setFrag] = useState<Frag>("high");
  const [ftes, setFtes] = useState(25);
  const [acquisitions, setAcquisitions] = useState(2);

  // Debounced PostHog tracking
  const debounceRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const trackInput = useCallback((input: string, value: number | string) => {
    if (typeof window === "undefined" || !posthog?.capture) return;
    if (debounceRef.current[input]) clearTimeout(debounceRef.current[input]);
    debounceRef.current[input] = setTimeout(() => {
      posthog.capture("calculator_input_changed", { input, value });
    }, 500);
  }, []);

  const cfg = fragConfig[frag];

  // Panel 1: Consolidation Savings
  const entityMultiplier = Math.min(entities / 8, 1.5);
  const adjustedRate = cfg.consolidationRate * entityMultiplier;
  const consolidationMid = spend * adjustedRate;
  const consolidationLow = consolidationMid * 0.7;
  const consolidationHigh = consolidationMid * 1.3;

  // Panel 2: Operational Efficiency
  const hoursPerFTE = 1200;
  const hoursSaved = ftes * hoursPerFTE * cfg.automationRate;
  const costPerHour = 85;
  const costSaved = hoursSaved * costPerHour;

  // Panel 3: Acquisition Speed
  const currentMonths = 4;
  const aiDays = 5;
  const daysSavedPerYear = acquisitions * 115;

  // Panel 4: Spend Visibility
  const currentVisibility = cfg.visibility;
  const visibilityGain = 1.0 - currentVisibility;
  const spendMadeVisible = spend * visibilityGain;

  // Summary
  const totalValueMid = consolidationMid + costSaved;
  const totalValueLow = consolidationLow + costSaved * 0.8;
  const totalValueHigh = consolidationHigh + costSaved * 1.2;
  const phase1Cost = 150000;
  const weeksToPayback = Math.max(1, Math.round(phase1Cost / (totalValueMid / 52)));

  return (
    <div>
      <PageHeader
        label="Proof of Concept"
        title="Model Your Spend Intelligence Program"
        subtitle="Estimate the impact of unified category management, automated reconciliation, and cross-entity consolidation using your own numbers."
      />
      <p style={{ fontFamily: font.sans, fontSize: 13, color: C.valtechGray, marginTop: -24, marginBottom: 32, lineHeight: 1.7 }}>All calculations run in your browser. No data is transmitted or stored.</p>

      {/* Main layout: inputs + outputs */}
      <div className="calc-layout" style={{ display: "flex", gap: 32, marginBottom: 32 }}>

        {/* Inputs */}
        <div className="calc-inputs" style={{ flex: "0 0 38%", minWidth: 0 }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 20, height: 2, background: C.maerskStar }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.maerskStar, fontFamily: font.sans }}>Your Organisation</span>
            </div>

            <Slider
              label="Addressable procurement spend"
              helper="Annual spend across all categories and entities eligible for classification"
              value={spend} min={100e6} max={50e9} step={100e6}
              format={fmtSpend} onChange={v => { setSpend(v); trackInput("addressable_spend", v); }}
            />

            <Slider
              label="Entities with independent procurement systems"
              helper="Acquired businesses operating separate category taxonomies"
              value={entities} min={2} max={20} step={1}
              format={v => String(v)} onChange={v => { setEntities(v); trackInput("entities", v); }}
            />

            {/* Fragmentation toggle */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.maerskNavy, fontFamily: font.sans, marginBottom: 6 }}>Taxonomy fragmentation</div>
              <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${C.valtechBorder}` }}>
                {(["low", "medium", "high"] as Frag[]).map(level => (
                  <button
                    key={level}
                    onClick={() => { setFrag(level); trackInput("fragmentation", level); }}
                    style={{
                      flex: 1, padding: "10px 0", border: "none", cursor: "pointer",
                      fontFamily: font.sans, fontSize: 13,
                      fontWeight: frag === level ? 700 : 500,
                      color: frag === level ? C.maerskStar : C.valtechGray,
                      background: frag === level ? C.maerskLight : "transparent",
                      borderBottom: frag === level ? `2px solid ${C.maerskStar}` : "2px solid transparent",
                      transition: "all 0.15s",
                    }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, color: C.valtechGray, fontFamily: font.sans, margin: "4px 0 0", lineHeight: 1.5 }}>How much variation exists in category naming across entities</p>
            </div>

            <Slider
              label="Reconciliation FTEs"
              helper="Finance staff doing manual payment-code and material-code matching"
              value={ftes} min={1} max={50} step={1}
              format={v => String(v)} onChange={v => { setFtes(v); trackInput("reconciliation_ftes", v); }}
            />

            <Slider
              label="Acquisitions per year"
              helper="How often new entities need taxonomy integration"
              value={acquisitions} min={0} max={4} step={1}
              format={v => String(v)} onChange={v => { setAcquisitions(v); trackInput("acquisitions_per_year", v); }}
            />
          </Card>
        </div>

        {/* Outputs */}
        <div className="calc-outputs" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <OutputPanel
              num="1"
              title="Estimated Consolidation Savings"
              headline={fmtCurrency(consolidationMid)}
              range={`Range: ${fmtCurrency(consolidationLow)} – ${fmtCurrency(consolidationHigh)}`}
              detail={`Based on supplier rationalisation, contract consolidation, and volume leverage across ${entities} entities`}
            />
            <OutputPanel
              num="2"
              title="Reconciliation Efficiency"
              headline={fmtHours(hoursSaved) + " saved"}
              secondary={fmtCurrency(costSaved) + " annual cost avoided"}
              detail="From automated payment-code and material-code reconciliation replacing manual matching"
            />
            <OutputPanel
              num="3"
              title="Entity Onboarding Acceleration"
              headline={acquisitions > 0 ? `${currentMonths} months → ${aiDays} days` : "Future-ready"}
              secondary={acquisitions > 0 ? `${daysSavedPerYear} days saved annually` : undefined}
              detail={acquisitions > 0 ? "Per-entity taxonomy integration time with AI-powered classification" : "No acquisitions planned — but when the next one happens, onboarding drops from months to days"}
            />
            <OutputPanel
              num="4"
              title="Spend Visibility Unlocked"
              headline={`${Math.round(currentVisibility * 100)}% → 100%`}
              secondary={fmtCurrency(spendMadeVisible) + " in spend made actionable"}
              detail="Previously invisible cross-entity spend becomes available for category management"
            />
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <Card style={{ background: C.maerskNavy, borderColor: C.maerskNavy, marginBottom: 32 }}>
        <div className="calc-summary" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, fontFamily: font.sans, marginBottom: 6 }}>TOTAL ESTIMATED ANNUAL VALUE</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.white, fontFamily: font.sans }}>{fmtCurrency(totalValueMid)}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: font.sans, marginTop: 4 }}>Range: {fmtCurrency(totalValueLow)} – {fmtCurrency(totalValueHigh)}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, fontFamily: font.sans, marginBottom: 6 }}>PAYBACK INDICATOR</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.white, fontFamily: font.sans, lineHeight: 1.4 }}>Phase 1 investment recovers within {weeksToPayback} {weeksToPayback === 1 ? "week" : "weeks"} of full deployment</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.maerskStar, fontFamily: font.sans, marginBottom: 6 }}>NOTE</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: font.sans, lineHeight: 1.6 }}>Based on {entities} entities and {fmtSpend(spend)} addressable spend. Actuals will be validated during Phase 1 benchmarking.</div>
          </div>
        </div>
      </Card>

      {/* Methodology note */}
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: C.maerskNavy, margin: "0 0 8px" }}>About These Estimates</h3>
        <p style={{ fontFamily: font.sans, fontSize: 13, lineHeight: 1.7, color: C.valtechGray, margin: 0 }}>These projections use industry benchmarks for procurement consolidation savings (Hackett Group, McKinsey), reconciliation automation rates, and entity onboarding timelines. They are order-of-magnitude indicators, not precise forecasts. Phase 1 of the engagement validates these assumptions against Maersk's actual data. The accuracy benchmark and go/no-go gate are designed to confirm or correct these estimates before any scaling commitment.</p>
      </Card>

      {/* CTA footer */}
      <Card style={{ background: C.maerskLight, borderColor: "#b3dce8" }}>
        <p style={{ fontFamily: font.sans, fontSize: 14, lineHeight: 1.7, color: C.maerskBlue, margin: 0 }}>
          Ready to validate these numbers? Phase 1 uses a real data sample to benchmark accuracy and confirm the savings hypothesis. The investment is a sample dataset, 3 weeks, and a decision.{" "}
          <Link href="/approach" style={{ color: C.maerskStar, textDecoration: "none", fontWeight: 600 }}>View the engagement approach</Link>
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
        @media (max-width: 768px) {
          .calc-layout { flex-direction: column !important; }
          .calc-inputs { flex: 1 !important; }
          .calc-outputs { flex: 1 !important; }
          .calc-summary { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
}
