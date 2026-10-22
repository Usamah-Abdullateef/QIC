import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Handshake, Layers } from "lucide-react";
import emblemWhite from "../../public/brand/qic-emblem-white.svg";
import { EventCard, EventMeta, FeaturedEvent, MoreEventsTile } from "@/components/events";
import { JoinTheJourney } from "@/components/sections";
import { ArrowLink, ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { WaveLines } from "@/components/wave-lines";
import { featuredEvent, upcomingEvents } from "@/content/events";

const whatWeDo = [
  {
    icon: CalendarDays,
    title: "Events",
    body: "We create meaningful gatherings that bring people together around the Quran, connecting communities with scholars, educators and fellow learners.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    body: "We develop and support opportunities for people to deepen their understanding of the Quran and strengthen their relationship with it.",
  },
  {
    icon: Layers,
    title: "Initiatives",
    body: "We develop Quran-centred projects and programmes that respond to the needs of individuals and communities.",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    body: "We collaborate with scholars, organisations, institutions and communities to bring impactful Quranic initiatives to life.",
  },
];

const exploreLinks = [
  {
    title: "Events",
    body: "Gatherings and experiences centred around the Quran.",
    href: "/events",
    cta: "Explore Events",
  },
  {
    title: "Initiatives",
    body: "Projects and programmes designed to create lasting impact.",
    href: "/initiatives",
    cta: "Explore Initiatives",
  },
  {
    title: "Media",
    body: "Talks, lectures, reflections and content from our programmes.",
    href: "/media",
    cta: "Explore Media",
  },
];

export default function HomePage() {
  const otherUpcoming = upcomingEvents.filter((e) => e.slug !== featuredEvent?.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <Eyebrow>Quran Initiative Collective</Eyebrow>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">
              Bringing People Together Through <em className="text-brand-700">the&nbsp;Quran</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">
              Quran Initiative Collective (QIC) is a global platform creating meaningful spaces for
              Quranic learning, reflection, scholarship and community.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/events">Explore Our Events</ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                Discover QIC
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            {featuredEvent?.poster ? (
              <div className="mx-auto max-w-md lg:max-w-none">
                <Link
                  href={`/events/${featuredEvent.slug}`}
                  className="block overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-brand-950/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
                >
                  <Image
                    src={featuredEvent.poster.portrait ?? featuredEvent.poster.landscape}
                    alt={featuredEvent.poster.alt}
                    placeholder="blur"
                    loading="eager"
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 40vw, 28rem"
                  />
                </Link>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
                  <p className="text-sm text-ink-muted">
                    <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">Next event</span>
                    <span aria-hidden className="mx-2">·</span>
                    {featuredEvent.name}
                  </p>
                  {featuredEvent.website ? (
                    <ArrowLink href={featuredEvent.website.href}>{featuredEvent.website.label}</ArrowLink>
                  ) : (
                    <ArrowLink href={`/events/${featuredEvent.slug}`}>Learn More</ArrowLink>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative isolate aspect-[4/5] max-h-[36rem] w-full overflow-hidden rounded-3xl bg-brand-900 sm:aspect-[5/4] lg:aspect-[4/5]">
                <WaveLines className="absolute inset-0 -z-10 size-full text-brand-400/35" lines={14} amplitude={20} />
                <Image
                  src={emblemWhite}
                  alt=""
                  className="absolute -top-10 -right-16 -z-10 w-[85%] max-w-none opacity-[0.07]"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950/90 via-brand-950/20 to-transparent" />

                {featuredEvent && (
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-paper p-6 shadow-xl shadow-brand-950/20 sm:inset-x-6 sm:bottom-6 sm:p-7">
                    <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">Next event</p>
                    <p className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">
                      {featuredEvent.name}
                    </p>
                    <EventMeta event={featuredEvent} className="mt-3" />
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                      {featuredEvent.website ? (
                        <ArrowLink href={featuredEvent.website.href}>{featuredEvent.website.label}</ArrowLink>
                      ) : (
                        <ArrowLink href={`/events/${featuredEvent.slug}`}>Learn More</ArrowLink>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Upcoming events */}
      <section id="events" className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Events"
              title="Upcoming Events"
              intro="Discover upcoming gatherings and experiences created to bring people closer to the Quran through knowledge, reflection and community."
            />
            <ArrowLink href="/events" className="shrink-0">
              View all events
            </ArrowLink>
          </div>

          <div className="mt-12 space-y-6">
            {featuredEvent && <FeaturedEvent event={featuredEvent} />}
            <div className="grid gap-6 md:grid-cols-2">
              {otherUpcoming.map((event, i) => (
                <EventCard key={event.slug} event={event} tone={i + 1} />
              ))}
              {otherUpcoming.length % 2 === 1 && <MoreEventsTile />}
            </div>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Creating spaces to learn, reflect and connect"
            intro="QIC is more than an event organiser. Our work spans gatherings, learning, long-term initiatives and partnerships, all centred on the Quran."
          />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="border-t border-ink/15 pt-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full bg-paper text-brand-700">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="font-display text-sm text-ink/40 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Our purpose */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Our purpose</Eyebrow>
            <blockquote className="mt-6 border-l-2 border-gold-500 pl-6 sm:pl-8">
              <p className="font-display text-3xl leading-snug tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem]">
                The Quran has the power to transform individuals, strengthen communities and shape
                generations.
              </p>
            </blockquote>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-ink-muted lg:col-span-5 lg:pt-14">
            <p>
              QIC exists to create spaces where people can engage with the Quran: not simply as a
              text to read, but as a source of knowledge, guidance, reflection and transformation.
            </p>
            <p>
              Through our events, initiatives and partnerships, we seek to connect people with the
              Quran and with one another.
            </p>
            <div className="pt-3">
              <ButtonLink href="/about" variant="secondary">
                Learn More About QIC
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Explore our work */}
      <section className="border-t border-line pt-20 sm:pt-28">
        <Container>
          <SectionHeading eyebrow="Explore" title="Explore Our Work" />
          <ul className="mt-12 border-b border-line">
            {exploreLinks.map((item, i) => (
              <li key={item.href} className="border-t border-line">
                <Link
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-8 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 sm:gap-x-10 sm:py-10 md:grid-cols-[4rem_1fr_1.2fr_auto]"
                >
                  <span className="font-display text-sm text-ink/40 tabular-nums">0{i + 1}</span>
                  <span className="font-display text-3xl tracking-tight text-ink transition-colors group-hover:text-brand-700 sm:text-4xl">
                    {item.title}
                  </span>
                  <span className="col-start-2 row-start-2 text-sm leading-relaxed text-ink-muted md:col-start-3 md:row-start-1 md:text-base">
                    {item.body}
                    <span className="sr-only">: {item.cta}</span>
                  </span>
                  <span
                    aria-hidden
                    className="col-start-3 row-span-2 flex size-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-150 group-hover:border-brand-700 group-hover:bg-brand-700 group-hover:text-paper md:col-start-4 md:row-span-1"
                  >
                    <ArrowRight className="size-5 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <JoinTheJourney />
    </>
  );
}
