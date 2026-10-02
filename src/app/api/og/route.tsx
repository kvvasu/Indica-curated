import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";

/**
 * Generates Open Graph / Twitter card images on request so every page has a
 * unique, correctly sized social preview without shipping binary assets.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? site.name).slice(0, 120);
  const kind = searchParams.get("kind") ?? "website";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f1ea",
          padding: "72px",
          fontFamily: "Georgia, serif",
          color: "#1c1b18",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#1c1b18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4f1ea",
              fontSize: 26,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 28, letterSpacing: 2, textTransform: "uppercase" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6f6b63",
            }}
          >
            {kind}
          </div>
          <div style={{ fontSize: 66, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e3ddd2",
            paddingTop: 28,
            fontSize: 22,
            color: "#4a4741",
          }}
        >
          <div>{site.tagline}</div>
          <div style={{ color: "#c4623f" }}>marlowe.supply</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
