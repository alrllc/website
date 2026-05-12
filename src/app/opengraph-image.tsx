import { ImageResponse } from "next/og";
import { getSiteContent } from "@/lib/site-content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const content = await getSiteContent();

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0b1220",
          color: "white",
          display: "flex",
          height: "100%",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              alignItems: "center",
              background: "#f6c453",
              borderRadius: "18px",
              color: "#111827",
              display: "flex",
              fontSize: "42px",
              fontWeight: 900,
              height: "96px",
              justifyContent: "center",
              width: "96px",
            }}
          >
            {content.brand.shortName}
          </div>
          <div style={{ color: "#f6c453", fontSize: "28px", fontWeight: 800 }}>
            {content.hero.eyebrow}
          </div>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 0.95,
              maxWidth: "980px",
            }}
          >
            {content.hero.headline}
          </div>
          <div style={{ color: "#d8e7f3", fontSize: "32px", maxWidth: "920px" }}>
            {content.hero.subheadline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
