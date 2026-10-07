// POST /api/ghl-book
// Body: { firstName, lastName, email, phone, startTime, dealership?, role?, smsConsent? }
// Upserts the contact in GoHighLevel, then books the appointment on the
// configured calendar. Same pattern and env var names as the main Go Rob Lacy
// site (GHL_API_KEY, GHL_LOCATION_ID, GHL_CALENDAR_ID).

export const dynamic = "force-dynamic";

const clean = (v, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const firstName = clean(body.firstName, 60);
  const lastName = clean(body.lastName, 60);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const startTime = clean(body.startTime, 40);
  const dealership = clean(body.dealership, 120);
  const role = clean(body.role, 60);
  const smsConsent = body.smsConsent === true;
  const consentText = clean(body.consentText, 600);
  const pageUrl = clean(body.pageUrl, 300);

  if (!firstName || !lastName || !email || !phone || !startTime || Number.isNaN(Date.parse(startTime))) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.GHL_API_KEY;
  const calendarId = process.env.GHL_CALENDAR_ID;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !calendarId || !locationId) {
    return Response.json({ error: "Calendar is not configured yet", reason: "not_configured" }, { status: 503 });
  }

  const baseHeaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const tags = ["dealer-free-build"];
  if (smsConsent) tags.push("sms-consent");

  try {
    const contactRes = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: { ...baseHeaders, Version: "2021-07-28" },
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        email,
        phone,
        ...(dealership ? { companyName: dealership } : {}),
        source: "Dealer free-build landing page",
        tags,
      }),
    });
    const contactData = await contactRes.json();
    if (!contactRes.ok) {
      return Response.json({ error: contactData.message || "Could not save contact" }, { status: contactRes.status });
    }
    const contactId = contactData.contact && contactData.contact.id;
    if (!contactId) {
      return Response.json({ error: "GoHighLevel did not return a contact id" }, { status: 502 });
    }

    // Consent record (TCPA audit trail): what was shown, when, where. Best effort —
    // a failed note never blocks the booking.
    const note = [
      `Booked via the dealer free-build landing page${pageUrl ? ` (${pageUrl})` : ""}.`,
      dealership ? `Dealership: ${dealership}` : "",
      role ? `Role: ${role}` : "",
      `SMS consent: ${smsConsent ? "YES" : "no"} at ${new Date().toISOString()}`,
      smsConsent && consentText ? `Consent text shown: "${consentText}"` : "",
    ].filter(Boolean).join("\n");
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: "POST",
      headers: { ...baseHeaders, Version: "2021-07-28" },
      body: JSON.stringify({ body: note }),
    }).catch(() => {});

    const who = [`${firstName} ${lastName}`, dealership, role].filter(Boolean).join(" · ");
    const apptRes = await fetch("https://services.leadconnectorhq.com/calendars/events/appointments", {
      method: "POST",
      headers: { ...baseHeaders, Version: "v3" },
      body: JSON.stringify({
        calendarId,
        locationId,
        contactId,
        startTime: new Date(startTime).toISOString(),
        title: `Free Build Call — ${who}`,
        appointmentStatus: "confirmed",
      }),
    });
    const apptData = await apptRes.json();
    if (!apptRes.ok) {
      return Response.json(
        { error: apptData.message || "That time is no longer available", reason: "slot_taken" },
        { status: apptRes.status }
      );
    }

    return Response.json({ ok: true, appointmentId: apptData.id });
  } catch {
    return Response.json({ error: "Unexpected error booking the call" }, { status: 500 });
  }
}
