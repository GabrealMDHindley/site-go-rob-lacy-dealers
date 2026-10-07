/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Unlisted filming guide + scripts for the presenters (static file in /public).
  async rewrites() {
    return [{ source: "/film-r8d4", destination: "/film-r8d4/index.html" }];
  },
  async headers() {
    return [
      {
        source: "/film-r8d4/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/film-r8d4",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};
export default nextConfig;
