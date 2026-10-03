"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../public/brand/qic-logo.svg";
import { mainNav } from "@/content/site";
import { ButtonLink, Container, cx } from "./ui";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
        >
          <Image
            src={logo}
            alt="QIC — Quran Initiative Collective"
            className="h-10 w-auto sm:h-11"
            preload
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-brand-700",
                      active ? "text-brand-700" : "text-ink/75 hover:text-ink",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-gold-500"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/events" size="sm">
              Upcoming Events
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-brand-700 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-paper lg:hidden">
          <Container className="py-4">
            <ul className="flex flex-col">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "flex items-center justify-between rounded-lg px-3 py-3.5 font-display text-2xl transition-colors focus-visible:outline-2 focus-visible:outline-brand-700",
                        active ? "text-brand-700" : "text-ink hover:bg-ink/[0.04]",
                      )}
                    >
                      {item.label}
                      {active && <span aria-hidden className="size-1.5 rounded-full bg-gold-500" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-line pt-5 pb-2 sm:hidden">
              <ButtonLink href="/events" className="w-full">
                Upcoming Events
              </ButtonLink>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
