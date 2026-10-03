// QIC initiatives beyond individual events. Add entries as programmes launch;
// set `status: "active"` and an optional `href` when there's more to see.

export type Initiative = {
  slug: string;
  name: string;
  summary: string;
  status: "active" | "in-development";
  href?: string;
};

export const initiatives: Initiative[] = [
  {
    slug: "educational-programmes",
    name: "Educational Programmes",
    summary:
      "Structured opportunities for students, memorisers and educators to deepen their understanding of the Quran and strengthen their relationship with it.",
    status: "in-development",
  },
  {
    slug: "community-initiatives",
    name: "Community Initiatives",
    summary:
      "Projects that respond to the needs of local communities and bring people together around the Quran, wherever they are in the world.",
    status: "in-development",
  },
  {
    slug: "collaborations",
    name: "Collaborations",
    summary:
      "Joint programmes with scholars, organisations and institutions that share a commitment to meaningful, Quran-centred impact.",
    status: "in-development",
  },
  {
    slug: "special-programmes",
    name: "Special Programmes",
    summary:
      "Focused, time-bound programmes such as seasonal experiences and scholar-led series, built around particular moments and needs.",
    status: "in-development",
  },
];
