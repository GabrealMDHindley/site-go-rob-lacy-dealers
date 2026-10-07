"use client";
import { useEffect } from "react";

// Page-wide motion: scroll reveals, kinetic headings, progress rail, header
// shadow, card tilt + glare, timeline fill, magnetic primary buttons.
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    document.querySelectorAll(".rv, .kinetic").forEach((el) => io.observe(el));

    const bar = document.querySelector(".progress");
    const hdr = document.querySelector(".hdr");
    const tl = document.querySelector(".tl");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        bar && bar.style.setProperty("--p", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
        hdr && hdr.classList.toggle("scrolled", window.scrollY > 12);
        if (tl) {
          const r = tl.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height));
          tl.style.setProperty("--tl", p.toFixed(3));
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const cleanups = [];
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine && !reduce) {
      document.querySelectorAll(".card.tilt").forEach((c) => {
        const move = (e) => {
          const r = c.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty("--gx", `${x * 100}%`); c.style.setProperty("--gy", `${y * 100}%`);
          c.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 8}deg) rotateX(${-(y - 0.5) * 8}deg) translateY(-4px)`;
        };
        const leave = () => { c.style.transform = ""; };
        c.addEventListener("pointermove", move); c.addEventListener("pointerleave", leave);
        cleanups.push(() => { c.removeEventListener("pointermove", move); c.removeEventListener("pointerleave", leave); });
      });
      document.querySelectorAll(".magnet").forEach((b) => {
        const k = b.classList.contains("hdr-cta") ? 0.2 : 0.3;
        const move = (e) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * k}px, ${(e.clientY - r.top - r.height / 2) * k}px)`;
        };
        const leave = () => { b.style.transform = ""; };
        b.addEventListener("pointermove", move); b.addEventListener("pointerleave", leave);
        cleanups.push(() => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); });
      });
    }

    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); cleanups.forEach((f) => f()); };
  }, []);

  return null;
}
