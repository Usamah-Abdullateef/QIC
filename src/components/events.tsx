import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import emblem from "../../public/brand/qic-emblem.svg";
import emblemWhite from "../../public/brand/qic-emblem-white.svg";
import { formatEventDate, type QicEvent } from "@/content/events";
import { ArrowLink, ButtonLink, cx } from "./ui";
import { WaveLines } from "./wave-lines";

const artTones = [
  { bg: "bg-brand-800", lines: "text-gold-400/30", emblem: emblemWhite, emblemOpacity: "opacity-[0.08]" },
  { bg: "bg-sand", lines: "text-brand-600/25", emblem: emblem, emblemOpacity: "opacity-[0.09]" },
  { bg: "bg-brand-950", lines: "text-brand-400/35", emblem: emblemWhite, emblemOpacity: "opacity-[0.07]" },
];

/** Event poster, photo, or a decorative branded panel until either is available. */
export function EventArt({
  event,
  tone = 0,
  className,
  size = "md",
}: {
  event: QicEvent;
  tone?: number;
  className?: string;
  size?: "md" | "lg";
}) {
  if (event.poster) {
    return (
      <div className={cx("relative overflow-hidden bg-white", className)}>
        <Image
          src={event.poster.landscape}
          alt={event.poster.alt}
          fill
          placeholder="blur"
          className="object-contain"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    );
  }
  if (event.image) {
    return (
      <div className={cx("relative overflow-hidden", className)}>
        <Image src={event.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
    );
  }
  const t = artTones[tone % artTones.length];
  return (
    <div className={cx("relative isolate overflow-hidden", t.bg, className)} aria-hidden>
      <WaveLines className={cx("absolute inset-0 -z-10 size-full", t.lines)} lines={size === "lg" ? 12 : 9} />
      <Image
        src={t.emblem}
        alt=""
        className={cx("absolute top-1/2 -right-[12%] -z-10 h-[125%] w-auto max-w-none -translate-y-1/2", t.emblemOpacity)}
      />
    </div>
  );
}

/** The event's portrait poster at full size, linking to the original image. */
export function EventPoster({ poster, className }: { poster: NonNullable<QicEvent["poster"]>; className?: string }) {
  const image = poster.portrait ?? poster.landscape;
  return (
    <a
      href={image.src}
      target="_blank"
      rel="noopener"
      className={cx(
        "block bg-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700",
        className,
      )}
    >
      <Image
        src={image}
        alt={poster.alt}
        placeholder="blur"
        className="h-auto w-full"
        sizes="(min-width: 1024px) 40vw, 100vw"
      />
      <span className="sr-only">(opens the full-size poster in a new tab)</span>
    </a>
  );
}

export function EventMeta({ event, className }: { event: QicEvent; className?: string }) {
  return (
    <dl className={cx("flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted", className)}>
      <div className="flex items-center gap-2">
        <dt className="sr-only">Date</dt>
        <CalendarDays aria-hidden className="size-4 text-brand-600" />
        <dd>{formatEventDate(event.date)}</dd>
      </div>
      <div className="flex items-center gap-2">
        <dt className="sr-only">Location</dt>
        <MapPin aria-hidden className="size-4 text-brand-600" />
        <dd>{event.location ?? "Location to be announced"}</dd>
      </div>
    </dl>
  );
}

/** Primary call to action for an event: its own website if it has one. */
export function EventAction({ event, variant = "primary" }: { event: QicEvent; variant?: "primary" | "link" }) {
  if (variant === "link") {
    return event.website ? (
      <ArrowLink href={event.website.href}>{event.website.label}</ArrowLink>
    ) : (
      <ArrowLink href={`/events/${event.slug}`}>Learn More</ArrowLink>
    );
  }
  return event.website ? (
    <ButtonLink href={event.website.href}>{event.website.label}</ButtonLink>
  ) : (
    <ButtonLink href={`/events/${event.slug}`}>Learn More</ButtonLink>
  );
}

/** Large side-by-side feature for the headline event. */
export function FeaturedEvent({ event }: { event: QicEvent }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-white/60 lg:grid-cols-2">
      {event.poster ? (
        <Image
          src={event.poster.landscape}
          alt={event.poster.alt}
          placeholder="blur"
          className="h-auto w-full self-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <EventArt event={event} size="lg" className="min-h-72 lg:min-h-[28rem]" />
      )}
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700 uppercase">
          <span aria-hidden className="size-1.5 rounded-full bg-gold-500" />
          Featured event
        </p>
        <h3 className="mt-5 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          <Link
            href={`/events/${event.slug}`}
            className="rounded-sm hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
          >
            {event.name}
          </Link>
        </h3>
        <EventMeta event={event} className="mt-4" />
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink-muted">{event.summary}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <EventAction event={event} />
          {event.website && <ArrowLink href={`/events/${event.slug}`}>Event overview</ArrowLink>}
        </div>
      </div>
    </article>
  );
}

/** Placeholder tile that sits alongside event cards while the programme grows. */
export function MoreEventsTile() {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-dashed border-ink/20 p-8 sm:p-10">
      <p className="font-display text-2xl tracking-tight text-ink">More gatherings are on the way.</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        New events and programmes are announced here first. Get in touch to hear about them early, or to
        bring a QIC event to your community.
      </p>
      <div className="mt-6">
        <ArrowLink href="/contact?topic=events">Enquire about events</ArrowLink>
      </div>
    </div>
  );
}

export function EventCard({ event, tone = 1 }: { event: QicEvent; tone?: number }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white/60 transition-colors duration-150 hover:border-brand-300">
      <EventArt event={event} tone={tone} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <EventMeta event={event} />
        <h3 className="mt-4 font-display text-2xl tracking-tight text-ink">
          <Link
            href={`/events/${event.slug}`}
            className="rounded-sm after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
          >
            {event.name}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">{event.summary}</p>
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
          {event.website ? "Overview & event website" : "Learn More"}
          <span aria-hidden className="transition-transform duration-150 motion-safe:group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </div>
    </article>
  );
}
