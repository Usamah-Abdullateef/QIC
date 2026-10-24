import type { StaticImageData } from "next/image";
import qrdPoster from "@/assets/events/quran-revision-day-poster.jpg";
import qrdPosterLandscape from "@/assets/events/quran-revision-day-poster-landscape.jpg";
import noorPoster from "@/assets/events/noor-workshop-poster.jpg";

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
  /** ISO date (YYYY-MM-DD), or just the month (YYYY-MM) until the day is confirmed. */
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
  poster?: { alt: string } & (
    | { landscape: StaticImageData; portrait?: StaticImageData }
    | { landscape?: StaticImageData; portrait: StaticImageData }
  );
  featured?: boolean;
};

const QURAN_REVISION_DAY_URL = "https://www.qrdnigeria.com";

export const events: QicEvent[] = [
  {
    slug: "quran-revision-day",
    name: "Quran Revision Day",
    tagline: "An initiative of QIC",
    summary:
      "A quiet, structured day for Quran memorisers to reset, reconnect and test their retention alongside fellow students, with revision circles from 5 ajzaa to the full 30.",
    description: [
      "The hardest part of hifz isn't memorising new pages. It's holding onto what you've already completed.",
      "Life gets busy, routines break down, and revision often gets pushed to the background. Quran Revision Day was created to give you a quiet, structured environment to reset, reconnect and test your retention alongside fellow students.",
      "Whether you're aiming to review 5, 7.5, 15 or the full 30 ajzaa, there is a circle built for you. Step into a dedicated space designed purely for active review.",
      "The event has its own dedicated website, where you'll find the full programme, registration details and the latest updates.",
    ],
    status: "upcoming",
    date: "2027-01-23",
    time: "6am – 7:45pm",
    location: "Lagos State Secretariat Mosque, Ikeja, Lagos",
    fee: "₦5,000",
    audience: "Brothers only: Quran memorisers and those currently memorising",
    format: "In-person revision circles for 5, 7.5, 15 and 30 ajzaa",
    website: { href: QURAN_REVISION_DAY_URL, label: "Visit Event Website" },
    poster: {
      landscape: qrdPosterLandscape,
      portrait: qrdPoster,
      alt: "Quran Revision Day 2027 poster: 23 January 2027, 6am to 9pm, at Alausa Secretariat Mosque, Ikeja, Lagos. Categories of 5, 10, 15 and 30 ajzaa. Registration fee ₦5,000 at qrdnigeria.com. Brothers only. Brought to you by QIC.",
    },
    featured: true,
  },
  {
    slug: "noor-workshop",
    name: "Noor Workshop",
    tagline: "Barnaamaj × QIC",
    summary:
      "200 Muslims. One Quran. One afternoon before Ramadan. A workshop on recitation, reflection and living with the Quran, from Barnaamaj and QIC.",
    description: [
      "200 Muslims. One Quran. One afternoon before Ramadan.",
      "Noor Workshop is an afternoon of recitation, reflection and living with the Quran, brought to you by Barnaamaj and QIC as Ramadan approaches.",
      "The exact date, venue and registration details will be shared here as soon as they are confirmed.",
    ],
    status: "upcoming",
    date: "2027-01",
    format: "Afternoon workshop for 200 participants",
    poster: {
      portrait: noorPoster,
      alt: "Noor Workshop poster, Barnaamaj × QIC: 200 Muslims. One Quran. One afternoon before Ramadan. January 2027.",
    },
  },
  // Hidden for now; uncomment to bring it back.
  // {
  //   slug: "existing-with-the-quran",
  //   name: "Existing With the Quran",
  //   tagline: "A Pre-Ramadan Quran Experience",
  //   summary:
  //     "An immersive Quran-centred experience designed to help participants prepare for Ramadan through reflection, learning, connection and a renewed relationship with the Quran.",
  //   description: [
  //     "Existing With the Quran is an immersive Quran-centred experience designed to help participants prepare for Ramadan through reflection, learning, connection and a renewed relationship with the Quran.",
  //     "Full details, including dates, venue and speakers, will be shared here as the programme is confirmed.",
  //   ],
  //   status: "upcoming",
  //   audience: "Anyone preparing for Ramadan",
  //   format: "Pre-Ramadan experience",
  // },
];

export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const pastEvents = events.filter((e) => e.status === "past");
export const featuredEvent = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];

/** The poster in the preferred shape, falling back to the other one. */
export function posterImage(poster: NonNullable<QicEvent["poster"]>, prefer: "landscape" | "portrait"): StaticImageData {
  return prefer === "landscape" ? (poster.landscape ?? poster.portrait)! : (poster.portrait ?? poster.landscape)!;
}

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function formatEventDate(date?: string) {
  if (!date) return "Date to be announced";
  return new Intl.DateTimeFormat("en-GB", {
    day: date.length > 7 ? "numeric" : undefined,
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
