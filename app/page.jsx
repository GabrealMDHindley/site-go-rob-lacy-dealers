import Kinetic from "@/components/Kinetic";
import HeroRidge from "@/components/HeroRidge";
import Video from "@/components/Video";
import Calculator from "@/components/Calculator";
import Booking from "@/components/Booking";
import { VIDEOS } from "@/lib/site";

const MARQUEE = [
  "Free custom website",
  "Inventory & VDP landing pages",
  "CRM setup",
  "Automated SMS follow-up",
  "Under-60-second lead replies",
  "Missed-call text-back",
  "Test-drive reminders",
  "Automated email follow-up",
  "Review requests",
  "Old-lead re-engagement",
  "Service-to-sales follow-up",
];

const TILES = [
  ["01", "Custom website"],
  ["02", "CRM setup"],
  ["03", "SMS automations"],
  ["04", "Email automations"],
];

const GETS = [
  {
    icon: "web",
    title: "Free custom website",
    body: "A fast, mobile-first website built for your store — or for you as a salesperson — designed to turn shoppers into booked appointments.",
    checks: [
      "Inventory- and VDP-focused landing pages",
      "Lead forms, click-to-call and click-to-text on every page",
      "Fast loading and built for phones first",
      "Your branding, your market, your contact details",
    ],
  },
  {
    icon: "crm",
    title: "Free CRM setup",
    body: "One place for every lead, conversation and appointment — set up around how a dealership actually sells.",
    checks: [
      "Sales pipeline from first inquiry to delivery",
      "Two-way text and call inbox in one app",
      "Website, call and text leads land in one place",
      "Appointment and test-drive calendar",
    ],
  },
  {
    icon: "sms",
    title: "Free automated SMS follow-up",
    body: "New internet leads get a text back in under 60 seconds, day or night — and the follow-up keeps going so leads don't go cold.",
    checks: [
      "Under-60-second text reply to new internet leads",
      "Missed-call text-back",
      "Test-drive and appointment confirmations and reminders",
      "Re-engagement texts for old leads and past customers",
    ],
  },
  {
    icon: "mail",
    title: "Free automated email follow-up",
    body: "Email sequences that keep you in front of shoppers and customers without anyone having to remember to send them.",
    checks: [
      "Welcome and follow-up sequences for new leads",
      "Post-delivery review requests",
      "Service-to-sales follow-up",
      "Appointment confirmations and reminders by email",
    ],
  },
];

const WHO = [
  "Franchise dealers",
  "Independent dealers",
  "Used-car lots",
  "Dealer principals & GMs",
  "Sales managers",
  "BDC & internet teams",
  "Individual car salespeople",
];

const STEPS = [
  {
    k: "Step 01",
    title: "Book your free call",
    body: "Pick a time below. We learn about your store — how you sell today, where your leads come from, and where follow-up falls through.",
    list: ["Monthly units and lead sources", "Your current website and CRM", "How your BDC and follow-up work", "Your goals for the store"],
  },
  {
    k: "Step 02",
    title: "We build your system — free",
    body: "Our team builds your website, sets up your CRM, and writes and turns on your SMS and email automations.",
    list: ["Website and landing pages", "CRM pipeline and inbox", "SMS automations", "Email automations"],
  },
  {
    k: "Step 03",
    title: "Website reveal & onboarding call",
    body: "We walk you through your new website, CRM, SMS automations and email automations so you know exactly how everything works.",
    list: ["See your new website", "How leads reach your phone and inbox", "Your follow-up, step by step", "Your questions answered"],
  },
  {
    k: "Step 04",
    title: "Ongoing support",
    body: "Questions once you're live? Our team is here to help you get the most out of your new system.",
    list: [],
  },
];

const FAQ = [
  {
    q: "Is the website and CRM really free?",
    a: "Yes. We build your website, set up your CRM, and turn on your SMS and email automations for free. There's no obligation — you'll see everything on your website reveal call.",
  },
  {
    q: "How long does it take to go live?",
    a: "It depends on your store and what you want built. We'll give you a clear timeline on your free call.",
  },
  {
    q: "Who do you work with?",
    a: "Franchise and independent dealers, used-car lots, dealer principals and GMs, sales managers, BDC and internet teams, and individual car salespeople who want their own website, CRM and follow-up.",
  },
  {
    q: "Do I need any technical skills?",
    a: "None. Our team builds everything for you. On your website reveal and onboarding call we walk you step by step through how your leads reach your phone and inbox.",
  },
  {
    q: "Does this replace my DMS or my current CRM?",
    a: "Your DMS stays where it is. On the call we'll look at the tools you use today — your DMS, CRM and lead providers — and talk through how your new system fits alongside them.",
  },
  {
    q: "Can I keep my website domain and phone number?",
    a: "Bring them up on your call. We'll go over your current domain and phone setup and how to connect them to your new system.",
  },
];

function Icon({ name }) {
  const p = {
    web: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8M12 18v3" /></>,
    crm: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 4h5M16 8h5M18 12h3" /></>,
    sms: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  }[name];
  return (
    <span className="icon" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
    </span>
  );
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" strokeOpacity=".45" /><path d="m7.5 12.5 3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Head({ eyebrow, title, lede, id }) {
  return (
    <div className="head">
      <span className="eyebrow rv">{eyebrow}</span>
      <Kinetic text={title} className="h2" id={id} />
      {lede && <p className="lede rv" style={{ "--d": "120ms" }}>{lede}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <main id="main">
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <HeroRidge />
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-a">
              <span className="eyebrow rv">For car dealerships &amp; car salespeople</span>
              <Kinetic as="h1" id="hero-title" className="h1" delay={100} text="Get a *free* website, CRM & automated follow-up — built for you." />
            </div>
            <div className="hero-b">
              <p className="hero-sub rv" style={{ "--d": "220ms" }}>
                We build your website, set up your CRM, and turn on automated text and email
                follow-up — so every internet lead, missed call and test drive gets a fast,
                consistent response. Free to build. No obligation.
              </p>
              <div className="hero-ctas rv" style={{ "--d": "340ms" }}>
                <a href="#book" className="btn btn-primary magnet">Book your free call <span className="arr">→</span></a>
                <a href="#included" className="btn btn-ghost">See what's included</a>
              </div>
              <ul className="hero-ticks rv" style={{ "--d": "420ms" }}>
                <li>Free custom website</li>
                <li>Done-for-you setup</li>
                <li>Instant SMS &amp; email follow-up</li>
              </ul>
            </div>
            <div className="hero-v vframe-wrap rv" style={{ "--d": "260ms" }}>
              <Video src={VIDEOS.vsl} poster={VIDEOS.vslPoster} title="Go Rob Lacy — free website, CRM & automations for car dealerships" />
              <p className="vnote">Watch first — then pick a time for your free call below.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-label="What's included">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <ul key={k} aria-hidden={k === 1}>
              {MARQUEE.map((m) => <li key={m}>{m}</li>)}
            </ul>
          ))}
        </div>
      </div>

      {/* INCLUDED TILES */}
      <section className="stats-pad" aria-label="Included free">
        <div className="wrap">
          <div className="tiles">
            {TILES.map(([n, l], i) => (
              <div key={n} className="card tile tilt rv" style={{ "--d": `${i * 90}ms` }}>
                <div className="num gold-text glow-text">{n}</div>
                <div className="lbl">{l}</div>
                <div className="sub">Included free</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="wrap wrap-56">
          <p className="mission rv">
            You might not have a lead problem. You might have a <em className="gold-text">follow-up</em> problem —
            leads waiting hours for a reply, calls that ring out after close, customers nobody calls back.
            We build the system that answers for you.
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section" id="included" aria-labelledby="included-title">
        <div className="wrap">
          <Head
            id="included-title"
            eyebrow="Free website & dealership growth system"
            title="Everything you get — *free* to build, done for you"
            lede="Four pieces built to work together, set up by our team so you can stay on the lot and sell."
          />
          <div className="gets">
            {GETS.map((g, i) => (
              <article key={g.title} className="card get tilt rv" style={{ "--d": `${(i % 2) * 100}ms` }}>
                <div className="get-top"><Icon name={g.icon} /><span className="badge">Included free</span></div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
                <ul className="checks">
                  {g.checks.map((c) => <li key={c}><Check />{c}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DONE FOR YOU */}
      <section className="section" aria-labelledby="dfy-title">
        <div className="wrap">
          <div className="dfy">
            <div>
              <div className="head">
                <span className="eyebrow rv">Done-for-you setup</span>
                <Kinetic id="dfy-title" text="Built for you — *zero* tech skills needed" className="h2" />
                <p className="lede rv">Our team handles the setup — website, CRM, texts and emails — so you never have to touch the tech.</p>
              </div>
              <div className="mini">
                {[
                  ["Completely built for you", "Design, setup and connections handled by our team."],
                  ["Personalized to your store", "Your branding, your inventory focus, your market and your contact details."],
                  ["Walked through step by step", "A website reveal and onboarding call so you know how every piece works."],
                ].map(([t, d], i) => (
                  <div key={t} className="card rv" style={{ "--d": `${i * 80}ms` }}>
                    <span className="dot" aria-hidden="true" />
                    <div><h3>{t}</h3><p>{d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card status tilt rv" style={{ "--d": "120ms" }}>
              <div className="status-top"><b>Your dealership system</b><span className="live">Ready to build</span></div>
              {[
                ["Custom website & lead capture", "Free build"],
                ["Dealership CRM & pipeline", "Set up for you"],
                ["SMS lead responder", "Replies in under 60 s"],
                ["Missed-call text-back", "Automated"],
                ["Email follow-up & review requests", "Automated"],
              ].map(([a, b]) => <div key={a} className="srow"><span>{a}</span><span>{b}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="section" id="who" aria-labelledby="who-title">
        <div className="wrap wrap-64">
          <Head
            id="who-title"
            eyebrow="Who it's for"
            title="Built for *dealerships* — and the people who sell the cars"
            lede="Whether you run the store, manage the desk or sell on the floor, we'll build a system around your business and your goals."
          />
          <div className="pills rv">{WHO.map((w) => <span key={w} className="pill">{w}</span>)}</div>
          <div className="three">
            {[
              ["For the whole store", "One system for the dealership: website, CRM and follow-up for every salesperson and the BDC."],
              ["For you on the floor", "Get your own website, CRM and follow-up, so your customer follow-up never depends on remembering to send it."],
              ["Mobile-first everything", "Website, texts and inbox all work from your phone — on the lot, on a test drive or after close."],
            ].map(([t, d], i) => (
              <div key={t} className="card tilt rv" style={{ "--d": `${i * 90}ms` }}><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works" aria-labelledby="how-title">
        <div className="wrap wrap-64">
          <Head id="how-title" eyebrow="How it works" title="From free call to fully built — here's the process" />
          <div className="tl">
            <div className="tl-rail" aria-hidden="true"><div className="tl-fill" /></div>
            {STEPS.map((s) => (
              <div key={s.k} className="step rv">
                <span className="node" aria-hidden="true" />
                <span className="k">{s.k}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {s.list.length > 0 && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="section" id="calculator" aria-labelledby="calc-title">
        <div className="wrap wrap-64">
          <Head
            id="calc-title"
            eyebrow="Dealership calculator"
            title="What's one more closing point worth to *your* store?"
            lede="Slide in your own numbers. Faster replies and steady follow-up are about closing more of the leads you already have — here's the math on what that could be worth."
          />
          <Calculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" aria-labelledby="faq-title">
        <div className="wrap wrap-48">
          <Head id="faq-title" eyebrow="Got questions? We have answers" title="Frequently asked questions" />
          <div className="faq">
            {FAQ.map((f, i) => (
              <details key={f.q} className="card rv" style={{ "--d": `${i * 60}ms` }}>
                <summary>{f.q}</summary>
                <div className="ans"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section className="section book-sec" id="book" aria-labelledby="book-title">
        <div className="wrap wrap-42">
          <Head
            id="book-title"
            eyebrow="Reserve your free build"
            title="Claim your *free* website & CRM build"
            lede="Spots for the free website and CRM build are limited per market. Pick a time for your free 1-on-1 call."
          />
          <div className="rv"><Booking /></div>
        </div>
      </section>
    </main>
  );
}
