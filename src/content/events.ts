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
  location?: string;
  audience?: string;
  format?: string;
  speakers?: { name: string; role?: string }[];
  /** Dedicated event website. When set, the QIC page acts as a gateway to it. */
  website?: { href: string; label: string };
  /** Path under /public. Without one, a branded artwork panel is shown. */
  image?: string;
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
    location: "Alausa Secretariat Central Mosque, Ikeja, Lagos",
    audience: "Quran memorisers and those currently memorising",
    format: "In-person gathering",
    website: { href: QURAN_REVISION_DAY_URL, label: "Visit Event Website" },
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
