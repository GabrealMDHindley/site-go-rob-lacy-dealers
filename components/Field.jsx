"use client";
import { useEffect, useRef } from "react";

// Fixed background: drifting navy/gold particles over a perspective wire floor —
// the 2D stand-in for Train & Scale's WebGL field.
export default function Field() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, t0 = performance.now();
    let pts = [];
    let mx = 0, my = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 700 ? 70 : 160;
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: 0.3 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.08,
        gold: Math.random() < 0.22,
      }));
    };

    const floor = (t) => {
      const horizon = h * 0.62, base = h + 40, cx = w / 2 + mx * 20;
      ctx.lineWidth = 1;
      const rows = 14;
      for (let i = 0; i < rows; i++) {
        const p = ((i + (t * 0.04) % 1) / rows);
        const y = horizon + (base - horizon) * p * p;
        ctx.strokeStyle = `rgba(62,120,218,${0.02 + p * 0.1})`;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      const cols = 26;
      for (let i = -cols; i <= cols; i++) {
        const xb = cx + i * (w / cols) * 1.6;
        const g = ctx.createLinearGradient(0, horizon, 0, base);
        g.addColorStop(0, "rgba(62,120,218,0)"); g.addColorStop(1, "rgba(62,120,218,0.12)");
        ctx.strokeStyle = g;
        ctx.beginPath(); ctx.moveTo(cx + i * 6, horizon); ctx.lineTo(xb, base); ctx.stroke();
      }
    };

    const draw = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      floor(reduce ? 0 : t);
      const sy = window.scrollY * 0.05;
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        }
        const x = p.x + mx * 14 * p.z;
        let y = (p.y - sy * p.z) % h; if (y < 0) y += h;
        const r = 0.6 + p.z * 1.3;
        ctx.fillStyle = p.gold ? `rgba(244,204,98,${0.35 + p.z * 0.45})` : `rgba(110,155,235,${0.25 + p.z * 0.45})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(draw); };

    resize(); draw(performance.now());
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    if (reduce) window.addEventListener("scroll", () => draw(performance.now()), { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="field" aria-hidden="true" />;
}
