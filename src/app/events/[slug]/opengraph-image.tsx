import { ogCard, ogSize } from "@/components/og-card";
import { events, formatEventDate, getEvent } from "@/content/events";
import { site } from "@/content/site";

export const alt = "QIC event";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return ogCard({ title: [site.name] });

  return ogCard({
    eyebrow: `${site.shortName} · ${event.status === "upcoming" ? "Upcoming event" : "Past event"}`,
    title: [event.name],
    footer: [
      <span key="date" style={{ color: "#ebcb68" }}>{formatEventDate(event.date)}</span>,
      event.location ?? "Location to be announced",
    ],
  });
}
