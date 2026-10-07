"use client";
import { useState } from "react";

// Honest commission math with the visitor's own numbers. It does not predict an
// outcome — it compares the deals they close today with the deals their leads would
// produce at the closing rate they enter.
const fmt = (n, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d });
const money = (n) => (n < 0 ? "−$" : "$") + fmt(Math.round(Math.abs(n)));

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
  const [price, setPrice] = useState(35000);
  const [deals, setDeals] = useState(10);
  const [comm, setComm] = useState(1);

  const perDeal = (price * comm) / 100;
  const dealsAtRate = (leads * close) / 100;
  const atRateMonth = dealsAtRate * perDeal;
  const nowMonth = deals * perDeal;
  const diff = atRateMonth - nowMonth;

  return (
    <div className="calc">
      <div className="card rv">
        <Range id="c-leads" label="Leads per month" value={leads} set={setLeads} min={10} max={1000} step={10} show={(v) => fmt(v)} scale={["10", "1,000"]} />
        <Range id="c-close" label="Your closing rate" value={close} set={setClose} min={1} max={80} step={1} show={(v) => v + "%"} scale={["1%", "80%"]} />
        <Range id="c-price" label="Average vehicle price sold" value={price} set={setPrice} min={5000} max={150000} step={1000} show={money} scale={["$5,000", "$150,000"]} />
        <Range id="c-deals" label="Average amount of deals closed per month" value={deals} set={setDeals} min={1} max={200} step={1} show={(v) => fmt(v)} scale={["1", "200"]} />
        <Range id="c-comm" label="Commission percentage" value={comm} set={setComm} min={0.25} max={10} step={0.25} show={(v) => v + "%"} scale={["0.25%", "10%"]} />
      </div>
      <div className="card rv" style={{ "--d": "90ms" }} aria-live="polite">
        <div className="res-lbl">Monthly commission at a {close}% closing rate</div>
        <div className="res-big gold-text">{money(atRateMonth)}</div>
        <div className="res-lbl">{money(atRateMonth * 12)} per year</div>
        <div className="res-rows">
          <div className="srow"><span>Deals from your leads at {close}%</span><span>{fmt(dealsAtRate, 1)} / mo</span></div>
          <div className="srow"><span>Commission per deal ({comm}% of {money(price)})</span><span>{money(perDeal)}</span></div>
          <div className="srow"><span>Your commission today ({fmt(deals)} deals)</span><span>{money(nowMonth)} / mo</span></div>
          <div className="srow"><span>Difference vs. today</span><span>{diff >= 0 ? "+" : ""}{money(diff)} / mo</span></div>
        </div>
        <p className="calc-note">
          An estimate from the numbers you enter, not a prediction or a promise. Deals = leads ×
          closing rate; commission = deals × vehicle price × commission percentage. Your results
          depend on your store, your pay plan and your market.
        </p>
      </div>
    </div>
  );
}
