"use client";
import { useEffect, useRef } from "react";

// Wireframe ridge behind the hero — Train & Scale's rising wire peaks, drawn as
// the Go Rob Lacy emblem's road climbing to a gold summit.
export default function HeroRidge() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const t0 = performance.now();
    const COLS = 46, ROWS = 22;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const peakX = () => (w >= 1024 ? 0.42 : 0.2);
    const height = (u, v, t) => {
      // u: -1..1 across, v: 0 (near) .. 1 (far)
      const px = peakX();
      const d1 = (u - px) ** 2 / 0.09 + (v - 0.62) ** 2 / 0.08;
      const d2 = (u + 0.45) ** 2 / 0.12 + (v - 0.75) ** 2 / 0.1;
      const d3 = (u - 0.9) ** 2 / 0.1 + (v - 0.5) ** 2 / 0.12;
      return 1.15 * Math.exp(-d1) + 0.55 * Math.exp(-d2) + 0.45 * Math.exp(-d3)
        + 0.05 * Math.sin(u * 6 + t * 0.6) * Math.cos(v * 5 + t * 0.4);
    };

    const project = (u, v, y) => {
      const z = 1.2 + v * 4.2;
      const f = Math.min(w, 1500) * 0.62;
      return [w * 0.5 + (u * 3.4 * f) / z, h * 0.8 - (y * 1.25 * f) / z + (v * h * 0.06)];
    };

    const draw = (now) => {
      const t = reduce ? 0 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const P = [];
      for (let j = 0; j <= ROWS; j++) {
        const v = j / ROWS, row = [];
        for (let i = 0; i <= COLS; i++) {
          const u = -1.25 + (2.5 * i) / COLS;
          row.push(project(u, v, height(u, v, t)));
        }
        P.push(row);
      }
      ctx.lineWidth = 1;
      for (let j = 0; j <= ROWS; j++) {
        const a = 0.55 * (1 - (j / ROWS) * 0.7);
        ctx.strokeStyle = `rgba(62,120,218,${a})`;
        ctx.beginPath();
        P[j].forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
        if (j < ROWS) {
          ctx.beginPath();
          for (let i = 0; i <= COLS; i++) {
            ctx.moveTo(P[j][i][0], P[j][i][1]); ctx.lineTo(P[j + 1][i][0], P[j + 1][i][1]);
            if (i < COLS) { ctx.moveTo(P[j][i][0], P[j][i][1]); ctx.lineTo(P[j + 1][i + 1][0], P[j + 1][i + 1][1]); }
          }
          ctx.strokeStyle = `rgba(62,120,218,${a * 0.55})`;
          ctx.stroke();
        }
      }
      // gold summit beacon
      const px = peakX();
      const [sx, sy] = project(px, 0.62, height(px, 0.62, t) + 0.06);
      const pulse = 1 + 0.12 * Math.sin(t * 2);
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 46 * pulse);
      g.addColorStop(0, "rgba(244,204,98,0.75)"); g.addColorStop(0.35, "rgba(226,180,70,0.25)"); g.addColorStop(1, "rgba(226,180,70,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 46 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#F7D774"; ctx.beginPath();
      for (let k = 0; k < 6; k++) { const an = (Math.PI / 3) * k + t * 0.3; const r = 9; ctx[k ? "lineTo" : "moveTo"](sx + r * Math.cos(an), sy + r * Math.sin(an)); }
      ctx.closePath(); ctx.fill();
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    resize(); draw(performance.now());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting; cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    const onR = () => { resize(); draw(performance.now()); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", onR); };
  }, []);

  return <canvas ref={ref} className="hero-ridge" aria-hidden="true" />;
}
