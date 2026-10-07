// GET /api/ghl-slots?start=<ms>&end=<ms>&tz=<IANA tz>
// Proxies GoHighLevel's free-slots endpoint so GHL_API_KEY never reaches the
// browser. Same pattern and env var names as the main Go Rob Lacy site
// (GHL_API_KEY, GHL_CALENDAR_ID — set in the Vercel project).

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const tz = searchParams.get("tz");
  if (!start || !end || !/^\d+$/.test(start) || !/^\d+$/.test(end)) {
    return Response.json({ error: "Missing start/end query params" }, { status: 400 });
  }

  const apiKey = process.env.GHL_API_KEY;
  const calendarId = process.env.GHL_CALENDAR_ID;
  if (!apiKey || !calendarId) {
    return Response.json({ error: "Calendar is not configured yet", reason: "not_configured" }, { status: 503 });
  }

  const url = new URL(`https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots`);
  url.searchParams.set("startDate", start);
  url.searchParams.set("endDate", end);
  if (tz) url.searchParams.set("timezone", tz);

  try {
    const ghlRes = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}`, Version: "v3", Accept: "application/json" },
      cache: "no-store",
    });
    const data = await ghlRes.json();
    if (!ghlRes.ok) {
      return Response.json({ error: data.message || "GoHighLevel request failed" }, { status: ghlRes.status });
    }
    const slots = {};
    for (const [date, value] of Object.entries(data)) {
      if (value && Array.isArray(value.slots)) slots[date] = value.slots;
    }
    return Response.json({ slots });
  } catch {
    return Response.json({ error: "Unexpected error fetching availability" }, { status: 500 });
  }
}
