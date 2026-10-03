import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/sections";
import { Container } from "@/components/ui";
import { activeSocials, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Quran Initiative Collective for general, partnership, event and media enquiries.",
};

const enquiryTypes = [
  { title: "General Enquiries", body: "Questions about QIC and our work." },
  { title: "Partnerships", body: "Collaborating on events, programmes and initiatives." },
  { title: "Events", body: "Attending, hosting or bringing a QIC event to your community." },
  { title: "Media", body: "Press, interviews and content requests." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Whether you have a question, an idea or would like to work together, we'd be glad to hear from you."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-10 lg:col-span-5">
            <div className="rounded-2xl bg-sand p-7 sm:p-8">
              <h2 className="text-xs font-bold tracking-widest text-brand-600 uppercase">Email us directly</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-flex items-center gap-3 rounded-sm font-display text-2xl tracking-tight text-ink transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
              >
                <Mail aria-hidden className="size-5 text-brand-600" />
                {site.email}
              </a>
              {activeSocials.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-6 text-sm">
                  {activeSocials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:text-brand-900">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-xs font-bold tracking-widest text-brand-600 uppercase">We can help with</h2>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {enquiryTypes.map((t) => (
                  <div key={t.title} className="py-4">
                    <dt className="font-display text-xl text-ink">{t.title}</dt>
                    <dd className="mt-1 text-sm text-ink-muted">{t.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
