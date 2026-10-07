// Site-wide settings. Edit here — every page reads from this file.

export const SITE = {
  name: "Go Rob Lacy",
  legalName: "Go Rob Lacy Inc.",
  tagline: "People | Systems | Greater Results",
  url: "https://site-go-rob-lacy-dealers.vercel.app",
  email: "rob@goroblacy.com",
  phoneDisplay: "+1 928 392-4421",
  phoneHref: "tel:+19283924421",
  smsHref: "sms:+19283924421",
  address: "16110 Foliage Avenue West, Rosemount, MN 55068",
  mainSite: "https://site-go-rob-lacy.vercel.app",
};

// Video slots. Leave empty until the video is filmed — a branded poster shows
// instead. Use a file in /public (e.g. "/vsl/vsl.mp4") or a Vimeo/YouTube
// embed URL (e.g. "https://player.vimeo.com/video/123456789").
export const VIDEOS = {
  vsl: "",
  vslPoster: "/vsl/poster.jpg",
  confirmation: "",
  confirmationPoster: "/vsl/poster-confirmation.jpg",
};

// The offer, word for word. The VSL and confirmation scripts use the same wording —
// change both together.
export const OFFER = {
  headline: "Get your website, CRM & automated follow-up built free — done for you.",
  items: ["Custom website", "CRM setup", "SMS automations", "Email automations"],
  terms: "Free to build. No obligation.",
  scarcity: "Spots for the free website and CRM build are limited per market.",
  callName: "free build call",
};
