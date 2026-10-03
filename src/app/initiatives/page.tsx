import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { EventCard } from "@/components/events";
import { JoinTheJourney, PageHero } from "@/components/sections";
import { ArrowLink, ButtonLink, Container, SectionHeading, cx } from "@/components/ui";
import { upcomingEvents } from "@/content/events";
import { initiatives } from "@/content/initiatives";

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "Quran-centred projects and programmes designed to create lasting impact for individuals and communities.",
};

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        eyebrow="Initiatives"
        title="Projects and programmes designed to create lasting impact"
        intro="Beyond individual events, QIC develops Quran-centred initiatives that respond to the needs of individuals and communities, and grow over time."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Areas we're building"
            intro="Our initiatives are taking shape across these areas. New programmes will be added here as they launch."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {initiatives.map((item, i) => {
              const active = item.status === "active";
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-sm text-ink/40 tabular-nums">0{i + 1}</span>
                    <span
                      className={cx(
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        active ? "bg-brand-50 text-brand-700" : "bg-sand text-ink-muted",
                      )}
                    >
                      {active ? "Active" : "In development"}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-3xl tracking-tight text-ink">{item.name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">{item.summary}</p>
                  {item.href && (
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Learn more <ArrowRight aria-hidden className="size-4" />
                    </span>
                  )}
                </>
              );
              return (
                <li key={item.slug}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block h-full rounded-2xl border border-line bg-white/60 p-7 transition-colors hover:border-brand-300 focus-visible:outline-2 focus-visible:outline-brand-700 sm:p-9"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="h-full rounded-2xl border border-line bg-white/60 p-7 sm:p-9">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-sand py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              title="Initiatives in action"
              intro="Our events are one expression of this work, each an initiative of QIC."
            />
            <ArrowLink href="/events" className="shrink-0">
              All events
            </ArrowLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {upcomingEvents.slice(0, 2).map((event, i) => (
              <EventCard key={event.slug} event={event} tone={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              title="Have an idea for a Quran-centred initiative?"
              intro="We work with scholars, educators, organisations and communities to develop ideas into programmes. If you'd like to collaborate, we'd love to hear from you."
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <ButtonLink href="/contact?topic=partnerships">Start a conversation</ButtonLink>
          </div>
        </Container>
      </section>

      <JoinTheJourney />
    </>
  );
}
