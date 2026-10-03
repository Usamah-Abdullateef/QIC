import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Users, Sparkles } from "lucide-react";
import { EventAction, EventArt, EventCard } from "@/components/events";
import { JoinTheJourney } from "@/components/sections";
import { ArrowLink, Container, Eyebrow } from "@/components/ui";
import { events, formatEventDate, getEvent, upcomingEvents } from "@/content/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return { title: event.name, description: event.summary };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const facts = [
    { icon: CalendarDays, label: "Date", value: event.date ? formatEventDate(event.date) : "To be announced" },
    { icon: MapPin, label: "Location", value: event.location ?? "To be announced" },
    ...(event.audience ? [{ icon: Users, label: "Who it's for", value: event.audience }] : []),
    ...(event.format ? [{ icon: Sparkles, label: "Format", value: event.format }] : []),
  ];
  const related = upcomingEvents.filter((e) => e.slug !== event.slug).slice(0, 2);

  return (
    <>
      <section className="border-b border-line">
        <Container className="pt-10 pb-16 sm:pt-12 sm:pb-20">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All events
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{event.status === "upcoming" ? "Upcoming event" : "Past event"}</Eyebrow>
              <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-balance text-ink sm:text-6xl">
                {event.name}
              </h1>
              {event.tagline && (
                <p className="mt-4 font-display text-xl text-brand-700 italic sm:text-2xl">{event.tagline}</p>
              )}
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
                {event.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-line bg-white/60">
                <EventArt event={event} className="aspect-[16/9]" />
                <div className="p-6 sm:p-8">
                  <h2 className="text-xs font-bold tracking-widest text-brand-600 uppercase">Key information</h2>
                  <dl className="mt-5 divide-y divide-line">
                    {facts.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex gap-4 py-3.5 first:pt-0">
                        <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                        <div>
                          <dt className="text-xs font-semibold text-ink-muted">{label}</dt>
                          <dd className="mt-0.5 text-sm font-medium text-ink">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 [&>a]:w-full">
                    <EventAction event={event} />
                  </div>
                  {event.website && (
                    <p className="mt-3 text-center text-xs text-ink-muted">
                      Registration and full programme on the event website.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">Scholars &amp; speakers</h2>
          {event.speakers && event.speakers.length > 0 ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {event.speakers.map((s) => (
                <li key={s.name} className="rounded-2xl border border-line bg-white/60 p-6">
                  <p className="font-display text-xl text-ink">{s.name}</p>
                  {s.role && <p className="mt-1 text-sm text-ink-muted">{s.role}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
              Scholars and speakers will be announced soon.
              {event.website ? " Follow the event website for the latest updates." : ""}
            </p>
          )}
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-sand py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">More from QIC</h2>
              <ArrowLink href="/events">All events</ArrowLink>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((e, i) => (
                <EventCard key={e.slug} event={e} tone={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <JoinTheJourney />
    </>
  );
}
