/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Pin the workspace root so Next does not walk up to a parent lockfile.
  outputFileTracingRoot: process.cwd(),
  // Next 15 streams metadata for dynamically rendered routes, which appends
  // <title> and <meta> tags to the end of <body> for any user agent that is not
  // on its built-in bot list (Google/Bing/Twitter/Slack only). Anything that
  // reads the HTML without running JS — most AI crawlers, link previewers,
  // social scrapers — then sees no description at all. Matching every user
  // agent opts those routes back into blocking metadata so the tags land in
  // <head> for everyone. The catalogue is small enough that the extra few
  // milliseconds before the shell flushes do not matter.
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1440, 1920],
    // All artwork is generated locally as SVG, so nothing remote is ever
    // optimised or hotlinked. The CSP below keeps that guarantee explicit.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
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
