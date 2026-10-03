import type { ReactNode } from "react";
import { ButtonLink, Container, SectionHeading } from "./ui";
import { WaveLines } from "./wave-lines";

/** Top-of-page introduction for inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <WaveLines
        className="absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 text-brand-600/15 [mask-image:linear-gradient(to_left,black,transparent)] md:block"
        lines={11}
      />
      <Container className="py-16 sm:py-24">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} />
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}

/** Closing invitation used at the bottom of most pages. */
export function JoinTheJourney() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand-900 px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
          <WaveLines className="absolute inset-0 -z-10 size-full text-brand-500/30" lines={12} />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-900 via-brand-900/90 to-brand-900/40" />
          <div className="max-w-2xl">
            <SectionHeading
              tone="light"
              eyebrow="Join the journey"
              title="There is a place for you within the QIC community."
              intro="Whether you are a student, teacher, scholar, organisation or simply someone seeking a deeper connection with the Quran, we would love you to be part of what we're building."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/get-involved" variant="gold">
                Get Involved
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-light">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
