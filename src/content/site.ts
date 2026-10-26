// Site-wide settings. Values marked TODO need confirming with QIC before launch.

export const site = {
  name: "Quran Initiative Collective",
  shortName: "QIC",
  url: "https://qic.international",
  tagline: "Connecting people with the Quran.",
  description:
    "Quran Initiative Collective (QIC) is a global platform creating meaningful spaces for Quranic learning, reflection, scholarship and community.",
  // TODO: confirm the public contact address.
  email: "info@qic.international",
  // Add a URL to show a profile in the footer and contact page; empty ones are hidden.
  socials: [
    { label: "YouTube", href: "" },
    { label: "Instagram", href: "" },
    { label: "X", href: "" },
    { label: "Facebook", href: "" },
    { label: "LinkedIn", href: "" },
  ],
};

export const activeSocials = site.socials.filter((s) => s.href);

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Media", href: "/media" },
  { label: "Get Involved", href: "/get-involved" },
];

export const footerNav = [...mainNav.slice(1), { label: "Contact", href: "/contact" }];
