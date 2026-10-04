import { ogCard, ogSize } from "@/components/og-card";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: [
      "Connecting people",
      <span key="quran">
        with the&nbsp;<span style={{ fontStyle: "italic", color: "#ebcb68" }}>Quran.</span>
      </span>,
    ],
  });
}
