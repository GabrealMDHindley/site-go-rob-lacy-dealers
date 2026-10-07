import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Field from "@/components/Field";
import Effects from "@/components/Effects";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--f-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-mono", display: "swap" });

const title = "Free-to-Build Website, CRM & Follow-Up Automation for Car Dealerships | Go Rob Lacy";
const description =
  "Go Rob Lacy builds car dealerships and car salespeople a custom website, CRM, automated SMS follow-up and automated email follow-up — built free, done for you. Book your free build call.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: "/", siteName: SITE.name, title,
    description, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Go Rob Lacy — free website, CRM & automations for car dealerships" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  icons: { icon: [{ url: "/favicon-32.png", sizes: "32x32" }] },
};

export const viewport = { themeColor: "#040a17", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  telephone: "+1-928-392-4421",
  slogan: SITE.tagline,
  image: `${SITE.url}/og-image.jpg`,
  logo: `${SITE.url}/brand/emblem.svg`,
  address: { "@type": "PostalAddress", streetAddress: "16110 Foliage Avenue West", addressLocality: "Rosemount", addressRegion: "MN", postalCode: "55068", addressCountry: "US" },
  areaServed: "US",
  description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <div className="aurora" aria-hidden="true"><i className="a" /><i className="b" /><i className="c" /></div>
        <Field />
        <div className="grain" aria-hidden="true" />
        <div className="progress" aria-hidden="true" />
        <Header />
        {children}
        <Footer />
        <Effects />
      </body>
    </html>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <a href="/" className="ftr-logo" aria-label="Go Rob Lacy — home">
              <img src="/brand/logo-lockup-reversed.svg" alt="Go Rob Lacy Inc." width="245" height="40" />
            </a>
            <p>Website, CRM, SMS automations and email automations for car dealerships and car salespeople — built free, done for you. {SITE.tagline}.</p>
          </div>
          <div>
            <p className="ftr-h">Navigate</p>
            <ul>
              <li><a href="/#included">What You Get</a></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/#who">Who It's For</a></li>
              <li><a href="/#calculator">Calculator</a></li>
              <li><a href="/#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="ftr-h">Get in touch</p>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></li>
              <li>{SITE.address}</li>
              <li><a href="/#book" className="acc">Book your free build call →</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr-bar">
          <span>© {year} {SITE.legalName}. All rights reserved.</span>
          <span><a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms &amp; SMS Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
