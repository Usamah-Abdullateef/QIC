import type { Metadata } from "next";
import { ArrowUpRight, CirclePlay, Images, Mic, Newspaper } from "lucide-react";
import { JoinTheJourney, PageHero } from "@/components/sections";
import { Container } from "@/components/ui";
import { mediaCategories, mediaItems, type MediaCategoryId } from "@/content/media";
import { activeSocials } from "@/content/site";

export const metadata: Metadata = {
  title: "Media",
  description: "Talks, lectures, reflections, photos and articles from QIC programmes.",
};

const icons: Record<MediaCategoryId, typeof CirclePlay> = {
  videos: CirclePlay,
  talks: Mic,
  photos: Images,
  articles: Newspaper,
};

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Talks, reflections and moments from our programmes"
        intro="A central home for QIC content, from lectures and event recordings to photography and written reflections."
      >
        <nav aria-label="Media categories">
          <ul className="flex flex-wrap gap-2">
            {mediaCategories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex h-10 items-center rounded-full border border-ink/15 px-4 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="py-6 sm:py-10">
        {mediaCategories.map((category) => {
          const Icon = icons[category.id];
          const items = mediaItems.filter((m) => m.category === category.id);
          return (
            <section key={category.id} id={category.id} className="py-10 sm:py-12">
              <Container>
                <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <span className="flex size-11 items-center justify-center rounded-full bg-sand text-brand-700">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h2 className="mt-5 font-display text-3xl tracking-tight text-ink">{category.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{category.description}</p>
                  </div>

                  <div className="lg:col-span-8">
                    {items.length > 0 ? (
                      <ul className="divide-y divide-line border-y border-line">
                        {items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between gap-6 py-5 focus-visible:outline-2 focus-visible:outline-brand-700"
                            >
                              <div>
                                <p className="font-display text-xl text-ink group-hover:text-brand-700">{item.title}</p>
                                {item.context && <p className="mt-1 text-sm text-ink-muted">{item.context}</p>}
                              </div>
                              <ArrowUpRight aria-hidden className="size-5 shrink-0 text-ink-muted group-hover:text-brand-700" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex h-full min-h-40 flex-col justify-center rounded-2xl border border-dashed border-ink/20 p-8">
                        <p className="font-display text-xl text-ink">Coming soon</p>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
                          {category.name} from QIC programmes will be published here as our library grows.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {activeSocials.length > 0 && (
        <section className="pb-8">
          <Container>
            <p className="text-sm text-ink-muted">
              Follow QIC on{" "}
              {activeSocials.map((s, i) => (
                <span key={s.label}>
                  {i > 0 && (i === activeSocials.length - 1 ? " and " : ", ")}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:text-brand-900">
                    {s.label}
                  </a>
                </span>
              ))}
              .
            </p>
          </Container>
        </section>
      )}

      <JoinTheJourney />
    </>
  );
}
