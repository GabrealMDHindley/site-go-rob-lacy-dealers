# Go Rob Lacy — Dealer free-build landing page

One-page landing site for Go Rob Lacy's offer to car dealerships and car salespeople:
a free website, CRM, automated SMS follow-up and automated email follow-up, built for
them. Next.js (App Router), no other runtime dependencies. Deploys on Vercel
(Framework preset: Next.js).

## Edit
- Contact details, video slots, offer wording: `lib/site.js`
- Page copy: `app/page.jsx` (hero, sections, FAQ), `app/callbooked/page.jsx`
- Legal pages: `app/privacy/page.jsx`, `app/terms/page.jsx`
- Styles: `app/globals.css`

## Videos
Set `VIDEOS.vsl` / `VIDEOS.confirmation` in `lib/site.js` to an mp4 in `/public` or a
Vimeo/YouTube embed URL. Empty = branded poster with "Video coming soon".

## Booking (GoHighLevel)
Same pattern and env var names as the main Go Rob Lacy site. Set in Vercel → Settings →
Environment Variables, then redeploy:
`GHL_API_KEY`, `GHL_LOCATION_ID`, `GHL_CALENDAR_ID`.
- `GET /api/ghl-slots` — open times; `POST /api/ghl-book` — upserts the contact (tag
  `dealer-free-build`, plus `sms-consent` when the box is ticked) and books the call.
- Until the keys are set the form shows a call / text / email fallback.
- After booking the visitor goes to `/callbooked` (noindex) with the confirmation video.

## Local
`npm install && npm run build && npm start`
