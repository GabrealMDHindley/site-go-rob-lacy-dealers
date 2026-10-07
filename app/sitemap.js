import { SITE } from "@/lib/site";
export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, priority: 1 },
    { url: `${SITE.url}/privacy`, lastModified: now, priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified: now, priority: 0.2 },
  ];
}
