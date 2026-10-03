import type { MetadataRoute } from "next";
import { events } from "@/content/events";
import { footerNav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...footerNav.map((n) => n.href), ...events.map((e) => `/events/${e.slug}`)];
  return pages.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
