import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="mt-5 max-w-2xl font-display text-5xl tracking-tight text-balance text-ink sm:text-6xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
        It may have moved, or the link may be out of date.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/events" variant="secondary">
          Explore events
        </ButtonLink>
      </div>
    </Container>
  );
}
