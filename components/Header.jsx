"use client";
import { useState } from "react";

const NAV = [
  ["What You Get", "/#included"],
  ["How It Works", "/#how-it-works"],
  ["Who It's For", "/#who"],
  ["FAQ", "/#faq"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="hdr">
      <div className="hdr-bar">
        <a href="/" className="hdr-logo" aria-label="Go Rob Lacy — home">
          <img src="/brand/logo-lockup-reversed.svg" alt="Go Rob Lacy Inc." width="185" height="30" />
        </a>
        <nav className="hdr-nav" aria-label="Main">
          {NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div className="hdr-right">
          <a href="/#book" className="btn btn-primary hdr-cta hdr-cta-desk magnet">Book Your Free Call</a>
          <button
            className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="menu" aria-label="Mobile">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href="/#book" className="btn btn-primary" onClick={() => setOpen(false)}>Book Your Free Call <span className="arr">→</span></a>
        </nav>
      )}
    </header>
  );
}
