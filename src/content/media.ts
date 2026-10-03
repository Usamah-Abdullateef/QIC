// QIC media. Items can link out to YouTube, Instagram, a gallery, etc.;
// nothing needs to be hosted on this site. Categories with no items show a
// "coming soon" state.

export type MediaCategoryId = "videos" | "talks" | "photos" | "articles";

export type MediaItem = {
  title: string;
  category: MediaCategoryId;
  href: string;
  /** e.g. "Quran Revision Day 2026" */
  context?: string;
  date?: string;
};

export const mediaCategories: {
  id: MediaCategoryId;
  name: string;
  description: string;
}[] = [
  {
    id: "videos",
    name: "Videos",
    description: "Event recordings, interviews and highlights from our programmes.",
  },
  {
    id: "talks",
    name: "Talks & Lectures",
    description: "Featured scholarly content and reflections on the Quran.",
  },
  {
    id: "photos",
    name: "Photos",
    description: "Moments from our events, gatherings and activities.",
  },
  {
    id: "articles",
    name: "Articles",
    description: "Written reflections, educational material and announcements.",
  },
];

export const mediaItems: MediaItem[] = [];
