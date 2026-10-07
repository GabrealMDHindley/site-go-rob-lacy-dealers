"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

// Booking form on GoHighLevel: /api/ghl-slots for open times, /api/ghl-book to
// book. Until the GHL keys are set in Vercel the API answers 503 and the form
// swaps to a friendly call / text / email fallback.
const DAYS_AHEAD = 21;
// Shown next to the checkbox and stored with the booking as the consent record.
const CONSENT_TEXT = `Yes, ${SITE.legalName} may text me at the number above about my call and this offer, including appointment reminders. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of booking or of any purchase.`;
const ROLES = [
  "Dealer principal / owner",
  "General manager",
  "Sales manager",
  "BDC / internet manager",
  "Salesperson",
  "Other",
];

export default function Booking() {
  // Resolved after mount so the server render and first client render match.
  const [tz, setTz] = useState("");
  const [state, setState] = useState("loading"); // loading | ready | empty | fallback
  const [slots, setSlots] = useState({});
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = async (zone = tz) => {
    setState("loading"); setErr("");
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + DAYS_AHEAD * 864e5);
    try {
      const r = await fetch(`/api/ghl-slots?start=${start.getTime()}&end=${end.getTime()}&tz=${encodeURIComponent(zone)}`);
      if (!r.ok) { setState("fallback"); return; }
      const { slots: s } = await r.json();
      const days = Object.keys(s || {}).filter((d) => s[d].length).sort();
      setSlots(s || {});
      if (!days.length) { setState("empty"); return; }
      setDay(days[0]); setState("ready");
    } catch {
      setState("fallback");
    }
  };
  useEffect(() => {
    let zone = "America/Chicago";
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || zone; } catch {}
    setTz(zone);
    load(zone);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const days = Object.keys(slots).filter((d) => slots[d].length).sort();
  const fmtDay = (d) => {
    const dt = new Date(d + "T12:00:00");
    return { wd: dt.toLocaleDateString("en-US", { weekday: "short" }), md: dt.toLocaleDateString("en-US", { month: "short", day: "numeric" }) };
  };
  const fmtTime = (iso) => new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz || undefined });

  const submit = async (e) => {
    e.preventDefault();
    if (!time) { setErr("Pick a day and time first."); return; }
    const f = new FormData(e.currentTarget);
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/ghl-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: f.get("firstName"), lastName: f.get("lastName"), email: f.get("email"), phone: f.get("phone"),
          dealership: f.get("dealership"), role: f.get("role"), smsConsent: f.get("smsConsent") === "on", consentText: CONSENT_TEXT, pageUrl: window.location.href, startTime: time,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        try { sessionStorage.setItem("grl_booked", JSON.stringify({ time, tz, name: f.get("firstName") })); } catch {}
        window.location.href = "/callbooked";
        return;
      }
      if (r.status === 503) { setState("fallback"); return; }
      if (data.reason === "slot_taken" || r.status === 409) {
        setErr("Someone just took that time. Please pick another one.");
        setTime(""); load();
      } else {
        setErr(`We couldn't book that just now. Please try again, or call/text ${SITE.phoneDisplay} or email ${SITE.email}.`);
      }
    } catch {
      setErr(`We couldn't reach the calendar. Please try again, or call/text ${SITE.phoneDisplay}.`);
    } finally {
      setBusy(false);
    }
  };

  if (state === "fallback" || state === "empty") {
    return (
      <div className="card booker">
        <div className="fallback">
          <h3>{state === "empty" ? "No open times in the next 3 weeks" : "Online booking is opening soon"}</h3>
          <p>
            Reach us directly and we'll get your free build call on the calendar. Tell us your name,
            your dealership and the best time to reach you.
          </p>
          <div className="row">
            <a className="btn btn-primary" href={SITE.phoneHref}>Call {SITE.phoneDisplay}</a>
            <a className="btn btn-ghost" href={SITE.smsHref}>Text us</a>
            <a className="btn btn-ghost" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Free build call — dealership website + CRM")}`}>Email {SITE.email}</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="card booker" onSubmit={submit} noValidate={false}>
      <div className="booker-meta"><span>Free 1-on-1 phone call</span><span>·</span><span>No obligation</span><span>·</span><span>Confidential</span></div>

      <span className="blabel" id="pick-day">Pick a day</span>
      {state === "loading" ? (
        <div className="days" aria-busy="true">{[0, 1, 2, 3, 4].map((i) => <div key={i} className="skel" style={{ width: 92 }} />)}</div>
      ) : (
        <div className="days" role="group" aria-labelledby="pick-day">
          {days.map((d) => {
            const f = fmtDay(d);
            return (
              <button type="button" key={d} className="dayb" aria-pressed={d === day} onClick={() => { setDay(d); setTime(""); }}>
                <small>{f.wd}</small>{f.md}
              </button>
            );
          })}
        </div>
      )}

      <span className="blabel" id="pick-time">Pick a time</span>
      <p className="tzline">Times shown in your time zone{tz ? ` (${tz.replace(/_/g, " ")})` : ""}.</p>
      <div className="times" role="group" aria-labelledby="pick-time">
        {state === "loading"
          ? [0, 1, 2, 3].map((i) => <div key={i} className="skel" style={{ width: 96 }} />)
          : (slots[day] || []).map((s) => (
            <button type="button" key={s} className="timeb" aria-pressed={s === time} onClick={() => setTime(s)}>{fmtTime(s)}</button>
          ))}
      </div>

      <div className="fgrid">
        <label className="field-l">First name<input className="inp" name="firstName" required autoComplete="given-name" /></label>
        <label className="field-l">Last name<input className="inp" name="lastName" required autoComplete="family-name" /></label>
        <label className="field-l">Email<input className="inp" name="email" type="email" required autoComplete="email" /></label>
        <label className="field-l">Mobile phone<input className="inp" name="phone" type="tel" required autoComplete="tel" /></label>
        <label className="field-l">Dealership name<input className="inp" name="dealership" autoComplete="organization" /></label>
        <label className="field-l">Your role
          <select className="inp" name="role" defaultValue="">
            <option value="" disabled>Select…</option>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
      </div>

      <label className="consent">
        <input type="checkbox" name="smsConsent" />
        <span>
          {CONSENT_TEXT} See our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms</a>.
        </span>
      </label>

      <button className="btn btn-primary btn-lg book-submit" disabled={busy || state !== "ready"}>
        {busy ? "Booking…" : <>Book my free call <span className="arr">→</span></>}
      </button>
      <p className="legal-note">
        By booking you agree to be contacted by phone and email about your call. We never sell your
        information. <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
      </p>
      {err && <div className="msg err" role="alert">{err}</div>}
    </form>
  );
}
