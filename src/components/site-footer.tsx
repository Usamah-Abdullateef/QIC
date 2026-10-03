import Image from "next/image";
import Link from "next/link";
import logoWhite from "../../public/brand/qic-logo-white.svg";
import { activeSocials, footerNav, site } from "@/content/site";
import { Container } from "./ui";
import { WaveLines } from "./wave-lines";

const linkClass =
  "rounded-sm text-sm text-paper/70 transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-paper">
      <WaveLines className="absolute inset-x-0 top-0 h-40 w-full text-paper/[0.06]" lines={6} />
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src={logoWhite} alt="QIC — Quran Initiative Collective" className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">{site.description}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold tracking-widest text-gold-300 uppercase">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold tracking-widest text-gold-300 uppercase">Connect</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              {activeSocials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-8 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
