import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = "Rexsis Consultancy — tax, accounting, and bookkeeping services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social-sharing card. Text only: no photo, no unsupported claims. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0b1f3a",
          color: "#faf7f0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            color: "#8ccbc3",
            textTransform: "uppercase",
          }}
        >
          Accounting · Tax · Advisory
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 96, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", marginTop: 28, height: 4, width: 120, background: "#2d6a66" }} />
        <div style={{ display: "flex", marginTop: 32, fontSize: 36, lineHeight: 1.35, color: "rgba(250,247,240,0.82)" }}>
          Tax, bookkeeping, and consultancy support for individuals and businesses.
        </div>
      </div>
    ),
    size,
  );
}
