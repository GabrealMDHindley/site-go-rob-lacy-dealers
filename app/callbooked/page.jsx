import Kinetic from "@/components/Kinetic";
import Video from "@/components/Video";
import BookedTime from "@/components/BookedTime";
import { SITE, VIDEOS } from "@/lib/site";

export const metadata = {
  title: "You're booked — watch this before your call | Go Rob Lacy",
  description: "Your free build call with Go Rob Lacy is booked.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/callbooked" },
};

export default function CallBooked() {
  return (
    <main id="main" className="page">
      <div className="wrap wrap-42" style={{ textAlign: "center" }}>
        <span className="eyebrow rv">You're confirmed</span>
        <Kinetic as="h1" className="h2" text="Your free build call is *booked.*" />
        <p className="lede rv" style={{ "--d": "120ms" }}>Watch this short video before we talk — it'll help us make the most of your call.</p>
        <BookedTime />
        <div className="rv" style={{ marginTop: 40, "--d": "200ms" }}>
          <Video src={VIDEOS.confirmation} poster={VIDEOS.confirmationPoster} title="Before your call — Go Rob Lacy" label="Watch before your call" />
        </div>
        <div className="card rv prep" style={{ marginTop: 40, textAlign: "left", "--d": "260ms" }}>
          <h2 className="prep-h">Before your call, have these handy</h2>
          <ul className="checks">
            {[
              "Roughly how many units you sell a month",
              "Your lead sources and about how many leads you get",
              "Who runs your website today",
              "The CRM and DMS you use now",
              "How your BDC and follow-up work — and how missed calls are handled",
              "Your goals for the next few months",
            ].map((t) => (
              <li key={t}><span aria-hidden="true" style={{ color: "var(--gold-hi)" }}>✓</span>{t}</li>
            ))}
          </ul>
          <p className="calc-note">We'll call you at the number you gave at your scheduled time. Watch for your confirmation by email{" "}— and, if you opted in, by text.</p>
        </div>
        <p className="legal-note rv" style={{ marginTop: 28, fontSize: 14 }}>
          Need to reschedule or have a question? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call/text <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.
        </p>
      </div>
    </main>
  );
}
