import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Shared frame for the generated social share images (opengraph-image routes).

export const ogSize = { width: 1200, height: 630 };

const asset = (...p: string[]) => readFile(join(process.cwd(), ...p));

// Gold version of the emblem: swap the white fill for the logo's gold gradient.
async function goldEmblem() {
  const svg = (await asset("public/brand/qic-emblem-white.svg"))
    .toString()
    .replace(
      'aria-label="QIC">',
      'aria-label="QIC"><defs><linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#d09b24"/><stop offset="1" stop-color="#ebcb68"/></linearGradient></defs>',
    )
    .replace('fill="#fff"', 'fill="url(#g)"');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Same flowing bands as <WaveLines />, sized to the card.
function wavePaths(lines: number, width: number, height: number, amplitude: number) {
  const gap = height / (lines + 1);
  return Array.from({ length: lines }, (_, i) => {
    const y = gap * (i + 1);
    const a = amplitude * (0.55 + 0.45 * Math.sin(i * 1.3 + 0.4));
    const wavelength = 320 + (i % 3) * 70;
    const start = -((i * 97) % wavelength);
    let d = `M${start} ${y.toFixed(1)} q${wavelength / 4} ${(-a).toFixed(1)} ${wavelength / 2} 0`;
    for (let x = start + wavelength / 2; x < width + wavelength; x += wavelength / 2) {
      d += ` t${wavelength / 2} 0`;
    }
    return d;
  });
}

export async function ogCard({
  eyebrow = site.name,
  title,
  footer = [new URL(site.url).host],
}: {
  eyebrow?: string;
  /** One entry per line. */
  title: ReactNode[];
  footer?: ReactNode[];
}) {
  const [emblem, newsreader, newsreaderItalic, manrope] = await Promise.all([
    goldEmblem(),
    asset("src/assets/og/Newsreader-Regular.ttf"),
    asset("src/assets/og/Newsreader-Italic.ttf"),
    asset("src/assets/og/Manrope-SemiBold.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#011d18",
          backgroundImage: "linear-gradient(120deg, #011d18 0%, #022f26 45%, #035040 100%)",
          color: "#f8f6f1",
          fontFamily: "Manrope",
        }}
      >
        <svg
          width={ogSize.width}
          height={ogSize.height}
          viewBox={`0 0 ${ogSize.width} ${ogSize.height}`}
          style={{ position: "absolute", inset: 0 }}
        >
          {wavePaths(12, ogSize.width, ogSize.height, 18).map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#71ad96" strokeOpacity={0.14} strokeWidth={1.5} />
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 0 68px 80px",
            width: 780,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 44, height: 2, backgroundColor: "#e1b22e" }} />
            <div style={{ fontSize: 22, letterSpacing: 4, color: "#ebcb68" }}>{eyebrow.toUpperCase()}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Newsreader",
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {title.map((line, i) => (
              <div key={i} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 24, color: "#a9cfc0" }}>
            {footer.map((line, i) => (
              <div key={i} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={emblem} width={318} height={340} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Newsreader", data: newsreader, style: "normal", weight: 400 },
        { name: "Newsreader", data: newsreaderItalic, style: "italic", weight: 400 },
        { name: "Manrope", data: manrope, style: "normal", weight: 600 },
      ],
    },
  );
}
