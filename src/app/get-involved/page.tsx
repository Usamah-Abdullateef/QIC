import type { Metadata } from "next";
import { CalendarDays, HandHeart, Handshake, UsersRound } from "lucide-react";
import { PageHero } from "@/components/sections";
import { ArrowLink, ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Attend, partner, support or volunteer with Quran Initiative Collective.",
};

const ways = [
  {
    icon: CalendarDays,
    title: "Attend",
    body: "Join upcoming QIC events and programmes, and be part of gatherings centred on learning, reflection and community.",
    href: "/events",
    cta: "See upcoming events",
  },
  {
    icon: Handshake,
    title: "Partner",
    body: "For organisations, institutions and scholars interested in collaborating with QIC to develop and deliver Quran-centred initiatives.",
    href: "/contact?topic=partnerships",
    cta: "Discuss a partnership",
  },
  {
    icon: HandHeart,
    title: "Support",
    body: "For individuals and organisations who would like to support QIC initiatives and help them reach more people.",
    href: "/contact?topic=support",
    cta: "Offer support",
  },
  {
    icon: UsersRound,
    title: "Volunteer",
    body: "Contribute your time and skills, from event delivery to media, design and organisation.",
    href: "/contact?topic=volunteering",
    cta: "Volunteer with us",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Join the journey"
        intro="Whether you are a student, teacher, scholar, organisation or simply someone seeking a deeper connection with the Quran, there is a place for you within the QIC community."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {ways.map(({ icon: Icon, title, body, href, cta }) => (
              <li key={title} className="flex flex-col rounded-2xl border border-line bg-white/60 p-7 sm:p-10">
                <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h2 className="mt-7 font-display text-3xl tracking-tight text-ink">{title}</h2>
                <p className="mt-3 max-w-md flex-1 leading-relaxed text-ink-muted">{body}</p>
                <ArrowLink href={href} className="mt-7">
                  {cta}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line bg-sand py-20 sm:py-24">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl tracking-tight text-balance text-ink sm:text-4xl">
              Not sure where you fit? Tell us a little about yourself.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              The ways to get involved will expand as QIC develops. Get in touch and we&apos;ll find the
              right place for you.
            </p>
          </div>
          <ButtonLink href="/contact" className="shrink-0">
            Contact us
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
