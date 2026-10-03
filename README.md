# QIC website

The website for Quran Initiative Collective (QIC), at qic.international. It's
built with Next.js 16 and Tailwind CSS v4, and every page is generated as a
static page at build time.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Editing content

Events, initiatives, media and site settings live in typed files under
`src/content/`. You don't need to change any page code to update them.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Contact email, social links (empty ones are hidden), navigation |
| `src/content/events.ts` | Events. Each entry gets a card and its own page at `/events/<slug>` |
| `src/content/initiatives.ts` | The Initiatives page |
| `src/content/media.ts` | Media items, grouped into Videos, Talks & Lectures, Photos and Articles |

**Adding an event:** add an object to `events` in `events.ts`. Leave `date` and
`location` out until they're confirmed, and the site shows "To be announced".
If the event has its own website, set `website` and the QIC page becomes an
overview that links through to it. Change `status` to `"past"` once the event
has happened. For a photo, put it in `public/events/` and set
`image: "/events/<file>.jpg"`. Without one, the event shows a branded artwork
panel.

**Adding media:** add `{ title, category, href }` entries to `mediaItems`.
Links can point to YouTube, Instagram, a gallery and so on.


The contact form deliberately stays simple: it opens the visitor's email app
with their message filled in (`mailto:`), so no form backend is needed.

## Design system

Colours and fonts are defined in `src/app/globals.css` (`@theme`). The green
and gold were sampled from the QIC logo. Following the brief, both are used
sparingly: warm ivory does most of the work. Headings use Newsreader and body
text uses Manrope, both loaded through `next/font`. The flowing-lines motif
(`src/components/wave-lines.tsx`) echoes the bands in the QIC emblem.

The SVG logos in `public/brand/` (full logo, emblem and white versions) were
traced from the original PNG (`qic-logo.png`), and the app icons in
`src/app/` were rendered from the traced emblem. If QIC's designer has the
original vector artwork, drop it in with the same file names; nothing else
needs to change.
