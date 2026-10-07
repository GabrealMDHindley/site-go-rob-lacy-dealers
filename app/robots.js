import { SITE } from "@/lib/site";
export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/callbooked", "/api/"] }], sitemap: `${SITE.url}/sitemap.xml` };
}
