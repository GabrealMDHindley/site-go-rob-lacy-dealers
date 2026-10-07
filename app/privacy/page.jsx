import { SITE } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy | Go Rob Lacy",
  description: "How Go Rob Lacy Inc. collects, uses and protects the information you share on this site.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main id="main" className="page">
      <div className="wrap wrap-48 prose">
        <h1>Privacy Policy</h1>
        <p>Last updated: October 7, 2026</p>
        <p>This policy explains how {SITE.legalName} (“Go Rob Lacy”, “we”, “us”) handles information you share on this website.</p>

        <h2>What we collect</h2>
        <p>When you book a call we collect your first and last name, email address, mobile phone number, and — if you choose to give them — your dealership name and role, plus the time you picked. Like most websites, our hosting provider also records basic technical data such as your IP address, browser type and pages visited.</p>

        <h2>How we use it</h2>
        <p>We use your information to schedule and hold your call, send confirmations and reminders, follow up about the offer you asked about, and run our business. We store your booking in our customer-relationship (CRM) and scheduling software.</p>

        <h2>Text messages</h2>
        <p>If you check the SMS consent box, we may text you about your call and this offer, including appointment reminders. Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to opt out at any time and <strong>HELP</strong> for help. Consent to texts is not a condition of booking or of any purchase.</p>
        <p><strong>We do not sell, rent or share your mobile number or SMS consent with third parties or affiliates for their marketing purposes.</strong> Text-messaging originator opt-in data and consent are never shared with any third party, except the service providers that deliver messages on our behalf.</p>

        <h2>Who we share it with</h2>
        <p>Only with service providers that help us run this site and our business — for example our website host, our CRM and scheduling platform, and our email and text-messaging providers — and only for those purposes, or when the law requires it. We never sell your personal information.</p>

        <h2>How long we keep it</h2>
        <p>We keep your information for as long as we need it for the purposes above or as required by law, then delete it.</p>

        <h2>Your choices</h2>
        <p>You can ask us to access, correct or delete your information, or to stop contacting you, by emailing <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or calling {SITE.phoneDisplay}.</p>

        <h2>Contact</h2>
        <p>{SITE.legalName}<br />{SITE.address}<br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a> · {SITE.phoneDisplay}</p>
      </div>
    </main>
  );
}
