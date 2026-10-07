"use client";
import { useEffect, useState } from "react";

// Shows the time the visitor just booked (saved by the booking form).
export default function BookedTime() {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    try {
      const b = JSON.parse(sessionStorage.getItem("grl_booked") || "null");
      if (b && b.time) {
        const d = new Date(b.time);
        setTxt(
          d.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: b.tz, timeZoneName: "short" })
        );
      }
    } catch {}
  }, []);
  if (!txt) return null;
  return <p className="booked-time rv in">Your call: <b>{txt}</b></p>;
}
