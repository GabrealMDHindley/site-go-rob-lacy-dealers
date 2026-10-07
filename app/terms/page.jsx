import { SITE } from "@/lib/site";

export const metadata = {
  title: "Terms & SMS Terms | Go Rob Lacy",
  description: "Terms of use for this website and Go Rob Lacy's text-message program.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <main id="main" className="page">
      <div className="wrap wrap-48 prose">
        <h1>Terms &amp; SMS Terms</h1>
        <p>Last updated: October 7, 2026</p>

        <h2>Using this website</h2>
        <p>This website is operated by {SITE.legalName}. By using it you agree to these terms. The content is for general information. Booking a call does not create a contract or any obligation to buy.</p>

        <h2>The calculator</h2>
        <p>The commission calculator is a what-if tool. It multiplies the numbers you enter. It is an estimate, not a prediction, promise or guarantee of any result.</p>

        <h2>SMS terms</h2>
        <p><strong>Program:</strong> Go Rob Lacy appointment and offer messages. If you opt in on our booking form, we may text you about your call and this offer, including appointment confirmations and reminders.</p>
        <p><strong>Frequency:</strong> message frequency varies. <strong>Cost:</strong> message and data rates may apply. Carriers are not liable for delayed or undelivered messages.</p>
        <p><strong>Opt out:</strong> reply <strong>STOP</strong> at any time to stop receiving texts; you'll get one message confirming you've opted out. <strong>Help:</strong> reply <strong>HELP</strong>, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call {SITE.phoneDisplay}.</p>
        <p>Consent to receive texts is not a condition of booking or of any purchase. See our <a href="/privacy">Privacy Policy</a> for how we handle your information.</p>

        <h2>Liability</h2>
        <p>This website is provided “as is”. To the extent the law allows, {SITE.legalName} is not liable for any indirect or consequential loss arising from use of this website.</p>

        <h2>Contact</h2>
        <p>{SITE.legalName}<br />{SITE.address}<br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a> · {SITE.phoneDisplay}</p>
      </div>
    </main>
  );
}
