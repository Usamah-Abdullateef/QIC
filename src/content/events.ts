import type { StaticImageData } from "next/image";
import qrdPoster from "@/assets/events/quran-revision-day-poster.jpg";
import qrdPosterLandscape from "@/assets/events/quran-revision-day-poster-landscape.jpg";

// QIC events. To add an event, add an entry to `events`; it gets a card on
// the Events page and its own page at /events/<slug>.
//
// Leave `date` / `location` undefined until they're confirmed: the site shows
// "To be announced". Set `status: "past"` once an event has happened.

export type QicEvent = {
  slug: string;
  name: string;
  /** Short line under the name, e.g. "A Pre-Ramadan Quran Experience". */
  tagline?: string;
  /** One or two sentences for cards. */
  summary: string;
  /** Paragraphs for the event page. */
  description: string[];
  status: "upcoming" | "past";
  /** ISO date (YYYY-MM-DD). */
  date?: string;
  /** e.g. "6am – 9pm". */
  time?: string;
  location?: string;
  /** e.g. "₦5,000". */
  fee?: string;
  audience?: string;
  format?: string;
  speakers?: { name: string; role?: string }[];
  /** Dedicated event website. When set, the QIC page acts as a gateway to it. */
  website?: { href: string; label: string };
  /** Path under /public. Without one, a branded artwork panel is shown. */
  image?: string;
  /** Event flyer, always shown uncropped: `landscape` on cards, `portrait` on the event page. */
  poster?: { landscape: StaticImageData; portrait?: StaticImageData; alt: string };
  featured?: boolean;
};

const QURAN_REVISION_DAY_URL = "https://www.qrdnigeria.com";

export const events: QicEvent[] = [
  {
    slug: "quran-revision-day",
    name: "Quran Revision Day",
    tagline: "An initiative of QIC",
    summary:
      "A dedicated gathering for Quran memorisers to revise, recite and reconnect with the Book of Allah in an environment of learning, brotherhood and shared commitment.",
    description: [
      "Quran Revision Day is a dedicated gathering for Quran memorisers to revise, recite and reconnect with the Book of Allah in an environment of learning, brotherhood and shared commitment.",
      "The event has its own dedicated website, where you'll find the full programme, registration details and the latest updates.",
    ],
    status: "upcoming",
    date: "2027-01-23",
    time: "6am – 9pm",
    location: "Alausa Secretariat Central Mosque, Ikeja, Lagos",
    fee: "₦5,000",
    audience: "Brothers only: Quran memorisers and those currently memorising",
    format: "In-person revision in four categories: 5, 10, 15 and 30 ajzaa",
    website: { href: QURAN_REVISION_DAY_URL, label: "Visit Event Website" },
    poster: {
      landscape: qrdPosterLandscape,
      portrait: qrdPoster,
      alt: "Quran Revision Day 2027 poster: 23 January 2027, 6am to 9pm, at Alausa Secretariat Mosque, Ikeja, Lagos. Categories of 5, 10, 15 and 30 ajzaa. Registration fee ₦5,000 at qrdnigeria.com. Brothers only. Brought to you by QIC.",
    },
    featured: true,
  },
  {
    slug: "existing-with-the-quran",
    name: "Existing With the Quran",
    tagline: "A Pre-Ramadan Quran Experience",
    summary:
      "An immersive Quran-centred experience designed to help participants prepare for Ramadan through reflection, learning, connection and a renewed relationship with the Quran.",
    description: [
      "Existing With the Quran is an immersive Quran-centred experience designed to help participants prepare for Ramadan through reflection, learning, connection and a renewed relationship with the Quran.",
      "Full details, including dates, venue and speakers, will be shared here as the programme is confirmed.",
    ],
    status: "upcoming",
    audience: "Anyone preparing for Ramadan",
    format: "Pre-Ramadan experience",
  },
];

export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const pastEvents = events.filter((e) => e.status === "past");
export const featuredEvent = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function formatEventDate(date?: string) {
  if (!date) return "Date to be announced";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
