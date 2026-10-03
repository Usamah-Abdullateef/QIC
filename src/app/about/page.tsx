import type { Metadata } from "next";
import { Check } from "lucide-react";
import { JoinTheJourney, PageHero } from "@/components/sections";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { WaveLines } from "@/components/wave-lines";

export const metadata: Metadata = {
  title: "About",
  description:
    "Quran Initiative Collective (QIC) is a global Quran-focused organisation dedicated to creating meaningful spaces for learning, reflection, scholarship and community.",
};

const mission = [
  "Meaningful learning experiences",
  "Access to scholarship and knowledge",
  "Community gatherings",
  "Educational programmes",
  "Collaborative projects",
  "Quran-centred experiences and initiatives",
];

const whatWeDo = [
  {
    title: "Create Experiences",
    body: "We organise and support gatherings that give people opportunities to learn, reflect and connect around the Quran.",
  },
  {
    title: "Develop Initiatives",
    body: "We develop programmes and projects addressing different aspects of Quranic learning, engagement and community development.",
  },
  {
    title: "Connect People",
    body: "We bring together scholars, educators, students, organisations and communities around shared Quranic goals.",
  },
  {
    title: "Build Partnerships",
    body: "We work with organisations and individuals who share a commitment to creating meaningful Quran-centred impact.",
  },
];

const values = [
  { title: "Quran", body: "The Quran is at the heart of everything we do." },
  { title: "Knowledge", body: "We value authentic knowledge, scholarship, learning and intellectual growth." },
  { title: "Community", body: "We believe the Quran brings people together and strengthens communities." },
  {
    title: "Excellence",
    body: (
      <>
        We strive to approach our work with professionalism, intentionality and <em>ihsān</em>.
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About QIC"
        title="Who We Are"
        intro="Quran Initiative Collective (QIC) is a global Quran-focused organisation dedicated to creating meaningful spaces for learning, reflection, scholarship and community."
      />

      {/* Who we are */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <p className="font-display text-3xl leading-snug tracking-tight text-balance text-ink sm:text-4xl lg:col-span-6">
            We believe the Quran should remain at the heart of our individual and collective lives.
          </p>
          <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg lg:col-span-6">
            <p>
              QIC brings together people, ideas and organisations to create experiences and initiatives
              that encourage deeper engagement with the Quran.
            </p>
            <p>
              From gatherings that connect communities with scholars to educational programmes and
              collaborative initiatives, our work is centred on helping people build a stronger and more
              meaningful relationship with the Quran.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & mission */}
      <section className="bg-sand py-20 sm:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="relative isolate overflow-hidden rounded-3xl bg-brand-900 p-8 sm:p-12">
            <WaveLines className="absolute inset-0 -z-10 size-full text-brand-500/25" lines={10} />
            <Eyebrow tone="light">Our vision</Eyebrow>
            <h2 className="mt-6 font-display text-3xl leading-tight tracking-tight text-balance text-paper sm:text-4xl">
              A world where the Quran is deeply connected to the lives of individuals and communities.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-paper/75">
              We envision communities where the Quran is not only recited and memorised, but
              understood, reflected upon and lived.
            </p>
          </div>

          <div className="rounded-3xl bg-paper p-8 sm:p-12">
            <Eyebrow>Our mission</Eyebrow>
            <p className="mt-6 text-lg leading-relaxed text-ink">
              Our mission is to create and support initiatives that connect people with the Quran
              through:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {mission.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink-muted">
              We aim to bring together the people, knowledge and resources needed to make these
              opportunities accessible and impactful.
            </p>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="What we do" title="How we work towards our vision" />
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((item, i) => (
              <li key={item.title} className="border-t border-ink/15 pt-6">
                <span className="font-display text-sm text-ink/40 tabular-nums">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-white/50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Our values" title="What guides our work" />
          <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="bg-paper p-7 sm:p-8">
                <dt className="flex items-center gap-3 font-display text-2xl tracking-tight text-ink">
                  <span aria-hidden className="size-2 rounded-full bg-gold-500" />
                  {v.title}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-muted">{v.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Approach + growing collective */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              QIC is built around collaboration.
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-ink-muted">
              <p>
                We believe meaningful Quranic initiatives are strengthened when scholars, educators,
                organisations, communities and individuals work together.
              </p>
              <p>
                Our role is to help bring these people and resources together, developing ideas into
                experiences and initiatives that can benefit individuals and communities.
              </p>
            </div>
          </div>
          <div>
            <Eyebrow>A growing collective</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Designed to grow beyond individual events.
            </h2>
            <p className="mt-6 leading-relaxed text-ink-muted">
              Our work will continue to develop across events, education, initiatives, partnerships and
              media, allowing us to respond to different needs and opportunities while maintaining one
              central purpose:
            </p>
            <p className="mt-6 border-l-2 border-gold-500 pl-5 font-display text-2xl tracking-tight text-brand-700 sm:text-3xl">
              Connecting people with the Quran.
            </p>
          </div>
        </Container>
      </section>

      <JoinTheJourney />
    </>
  );
}
