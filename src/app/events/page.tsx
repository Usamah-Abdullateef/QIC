import type { Metadata } from "next";
import { History } from "lucide-react";
import { EventCard, FeaturedEvent, MoreEventsTile } from "@/components/events";
import { JoinTheJourney, PageHero } from "@/components/sections";
import { ArrowLink, Container, SectionHeading } from "@/components/ui";
import { featuredEvent, pastEvents, upcomingEvents } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Gatherings and experiences created to bring people closer to the Quran through knowledge, reflection and community.",
};

export default function EventsPage() {
  const otherUpcoming = upcomingEvents.filter((e) => e.slug !== featuredEvent?.slug);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Gatherings centred around the Quran"
        intro="From dedicated revision days to seasonal experiences, QIC events connect communities with scholars, educators and fellow learners."
      />

      <section id="upcoming" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Upcoming Events"
            intro="Events currently being planned or delivered. Some QIC events have their own dedicated websites; you'll find an overview here and a link through."
          />
          <div className="mt-12 space-y-6">
            {featuredEvent && <FeaturedEvent event={featuredEvent} />}
            {otherUpcoming.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {otherUpcoming.map((event, i) => (
                  <EventCard key={event.slug} event={event} tone={i + 1} />
                ))}
                {otherUpcoming.length % 2 === 1 && <MoreEventsTile />}
              </div>
            )}
            {upcomingEvents.length === 0 && (
              <p className="rounded-2xl border border-dashed border-ink/20 p-10 text-ink-muted">
                New events will be announced here soon.
              </p>
            )}
          </div>
        </Container>
      </section>

      <section id="past" className="border-t border-line bg-sand py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Past Events"
            intro="A record of previous QIC events, with photos, recordings and highlights."
          />
          {pastEvents.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event, i) => (
                <EventCard key={event.slug} event={event} tone={i} />
              ))}
            </div>
          ) : (
            <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-dashed border-ink/20 p-8 sm:flex-row sm:items-center sm:p-10">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-paper text-brand-700">
                <History aria-hidden className="size-5" />
              </span>
              <div className="flex-1">
                <p className="font-display text-2xl tracking-tight text-ink">Our archive is being put together.</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Photos, recordings and highlights from past events will appear here.
                </p>
              </div>
              <ArrowLink href="/media">Browse media</ArrowLink>
            </div>
          )}
        </Container>
      </section>

      <JoinTheJourney />
    </>
  );
}
