"use client";
import { useState } from "react";

// Honest "what-if" math with the visitor's own numbers. It does not predict an
// outcome — it shows what a given change in closing rate would be worth.
const fmt = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const money = (n) => "$" + fmt(Math.round(n));

function Range({ id, label, value, set, min, max, step, show, scale }) {
  return (
    <div className="range">
      <label htmlFor={id}>{label}<output htmlFor={id}>{show(value)}</output></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} />
      <div className="scale" aria-hidden="true"><span>{scale[0]}</span><span>{scale[1]}</span></div>
    </div>
  );
}

export default function Calculator() {
  const [leads, setLeads] = useState(150);
  const [close, setClose] = useState(10);
  const [gross, setGross] = useState(2500);
  const [lift, setLift] = useState(1);

  const unitsNow = (leads * close) / 100;
  const extraUnits = (leads * lift) / 100;
  const extraMonth = extraUnits * gross;

  return (
    <div className="calc">
      <div className="card rv">
        <Range id="c-leads" label="Leads per month (internet, phone, walk-in)" value={leads} set={setLeads} min={10} max={1000} step={10} show={(v) => fmt(v)} scale={["10", "1,000"]} />
        <Range id="c-close" label="Your current closing rate" value={close} set={setClose} min={1} max={40} step={1} show={(v) => v + "%"} scale={["1%", "40%"]} />
        <Range id="c-gross" label="Average gross per unit (front + back)" value={gross} set={setGross} min={250} max={10000} step={250} show={money} scale={["$250", "$10,000"]} />
        <Range id="c-lift" label="What if you closed this many more points?" value={lift} set={setLift} min={0.5} max={5} step={0.5} show={(v) => "+" + v + " pt"} scale={["+0.5", "+5"]} />
      </div>
      <div className="card rv" style={{ "--d": "90ms" }} aria-live="polite">
        <div className="res-lbl">Extra gross per month, at +{lift} pt</div>
        <div className="res-big gold-text">{money(extraMonth)}</div>
        <div className="res-lbl">{money(extraMonth * 12)} per year</div>
        <div className="res-rows">
          <div className="srow"><span>Units you sell from these leads now</span><span>{fmt(unitsNow)} / mo</span></div>
          <div className="srow"><span>Extra units at +{lift} pt</span><span>{extraUnits.toLocaleString("en-US", { maximumFractionDigits: 1 })} / mo</span></div>
          <div className="srow"><span>Gross per extra unit</span><span>{money(gross)}</span></div>
        </div>
        <p className="calc-note">
          An estimate from the numbers you enter, not a prediction or a promise. Leads × extra
          closing points × your gross per unit. Your results depend on your store, your team and
          your market.
        </p>
      </div>
    </div>
  );
}
