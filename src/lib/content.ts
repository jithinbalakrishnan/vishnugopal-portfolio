export const site = {
  name: "Vishnu Prasad",
  role: "Industrial Designer",
  location: "Bangalore, India",
  email: "hello@vishnuprasad.design",
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  heroLead: "Hello, I'm Vishnu Prasad. I design",
  heroTrail: "consumer electronics & experiences.",
  bio:
    "Industrial Designer based in India, passionately dedicated to redefining the creative boundaries of design for a smarter, more meaningful future.",
  socials: [
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
} as const;

/** Static so the footer stays prerenderable (no `new Date()` at build time). */
export const copyrightYear = 2026;

export const nav = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  tone: string;
  featured: boolean;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  sections: { heading: string; body: string; tone: string }[];
};

export const projects: Project[] = [
  {
    slug: "aria",
    title: "Aria",
    subtitle: "Semi-automatic washing machine",
    category: "Home Appliances",
    year: "2025",
    client: "Placeholder Client",
    role: "Form development, CMF, Design for manufacture",
    tone: "#ededed",
    featured: true,
    summary:
      "A semi-automatic washing machine reimagined around a calmer control language and a tighter, more confident stance.",
    challenge:
      "The existing range read as bulky and dated on the shop floor. The brief asked for a family of appliances that felt premium without adding cost to the tooling.",
    approach:
      "Form studies started from the control deck outwards, letting the dial cluster set the proportion of the whole body. Soft chamfers replaced hard parting lines so the shell could be moulded in fewer pieces.",
    outcome:
      "A platform design that carries across three capacity variants while sharing most of its tooling and its control architecture.",
    sections: [
      { heading: "Concept sketches", body: "Early exploration of stance, dial placement and the break between lid and body.", tone: "#f3f3f3" },
      { heading: "Form development", body: "CAD iterations resolving the chamfer radius, the lid overhang and the service access panel.", tone: "#e8e8e8" },
      { heading: "CMF", body: "A matte graphite shell paired with a lightly textured deck, chosen to hide fingerprints in daily use.", tone: "#efefef" },
    ],
  },
  {
    slug: "orbo",
    title: "Orbo",
    subtitle: "Modular lighting system",
    category: "Lighting",
    year: "2025",
    client: "Placeholder Client",
    role: "Concept, form development, prototyping",
    tone: "#e9e9e9",
    featured: true,
    summary:
      "A modular lighting system built from one circular element that stacks, tilts and clusters into several fixtures.",
    challenge:
      "Make a single part do the work of an entire catalogue, so the range could grow without new tooling for every fixture.",
    approach:
      "A magnetic ring interface lets each module snap to the next at a fixed set of angles. The diffuser doubles as the structural face of the part.",
    outcome:
      "Five fixture types built from two moulded components and a shared electronics tray.",
    sections: [
      { heading: "System logic", body: "How the modules index to each other and the angles the interface allows.", tone: "#f1f1f1" },
      { heading: "Optics", body: "Diffuser studies balancing glare control against perceived brightness.", tone: "#e6e6e6" },
      { heading: "Prototypes", body: "Printed and machined parts used to validate the magnetic interface in use.", tone: "#ededed" },
    ],
  },
  {
    slug: "kolors",
    title: "Kolors",
    subtitle: "Colour, material & finish study",
    category: "CMF",
    year: "2024",
    client: "Placeholder Client",
    role: "CMF direction, material sourcing",
    tone: "#f0e8c8",
    featured: true,
    summary:
      "A CMF direction for a seasonal appliance range, built around warm neutrals and a single accent family.",
    challenge:
      "Give a utilitarian product line a point of view on colour without drifting from the brand's existing palette.",
    approach:
      "Three palettes were tested against the same body geometry under retail lighting, then narrowed to one warm neutral with two accents.",
    outcome:
      "A documented palette with finish specifications and supplier-ready swatch references.",
    sections: [
      { heading: "Palette exploration", body: "Warm neutrals tested against the existing brand colours.", tone: "#f4edd4" },
      { heading: "Finish studies", body: "Gloss, satin and fine-grain textures compared on the same surface.", tone: "#eee6c4" },
      { heading: "Final direction", body: "The selected palette applied across the full range.", tone: "#f2ead0" },
    ],
  },
  {
    slug: "bable",
    title: "Bable",
    subtitle: "Tabletop air purifier",
    category: "Consumer Electronics",
    year: "2024",
    client: "Placeholder Client",
    role: "Concept, form development, CMF",
    tone: "#e4ded8",
    featured: true,
    summary:
      "A compact air purifier meant to sit on a desk rather than hide in a corner, with the filter change as the only interaction.",
    challenge:
      "Most purifiers in this size read as office equipment. The brief asked for an object that could live on a table without apologising.",
    approach:
      "A turned wooden body wraps the filter stack, with the intake hidden in the shadow gap between body and base.",
    outcome:
      "A quiet object with a one-twist filter change and no visible controls.",
    sections: [
      { heading: "Proportion studies", body: "Height-to-diameter ratios tested as physical blocks on a desk.", tone: "#e9e3dd" },
      { heading: "Airflow", body: "Intake and exhaust placement resolved around the shadow gap.", tone: "#ded8d2" },
      { heading: "Material", body: "Turned wood against a moulded base, with the parting line used as the intake.", tone: "#e7e1db" },
    ],
  },
  {
    slug: "sable",
    title: "Sable",
    subtitle: "Premium bathroom fittings",
    category: "Sanitaryware",
    year: "2023",
    client: "Placeholder Client",
    role: "Form development, surface finish",
    tone: "#eceff1",
    featured: false,
    summary:
      "A fittings family drawn from a single section profile, carried across taps, showers and accessories.",
    challenge:
      "Build visual consistency across parts made by different suppliers and processes.",
    approach:
      "One cross-section was defined first, then extruded, swept and revolved to generate each product in the family.",
    outcome:
      "A coherent family of eleven products from a single defining profile.",
    sections: [
      { heading: "The profile", body: "The section that generates every product in the range.", tone: "#f0f2f4" },
      { heading: "Family spread", body: "The profile applied across taps, showers and accessories.", tone: "#e7eaec" },
    ],
  },
  {
    slug: "nimbus",
    title: "Nimbus",
    subtitle: "Portable speaker concept",
    category: "Consumer Electronics",
    year: "2023",
    client: "Self-initiated",
    role: "Concept, prototyping",
    tone: "#e8eaef",
    featured: false,
    summary:
      "A pocket speaker with a fabric wrap and a single physical control that doubles as the carry point.",
    challenge:
      "Fit a usable driver and a day of battery into something that still disappears into a jacket pocket.",
    approach:
      "The strap loop became the structural spine, letting the housing stay thin where it did not need to carry load.",
    outcome:
      "A working prototype at roughly half the thickness of the reference product.",
    sections: [
      { heading: "Packaging", body: "Driver, battery and board arranged around the strap spine.", tone: "#edeff3" },
      { heading: "Soft goods", body: "Fabric wrap tension and the seam placement around the control.", tone: "#e3e6eb" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const experience = [
  {
    from: "04-2025",
    to: "Present",
    title: "Senior Industrial Designer",
    company: "Placeholder Studio",
    place: "Bangalore, India",
  },
  {
    from: "06-2022",
    to: "03-2025",
    title: "Industrial Designer",
    company: "Placeholder Studio",
    place: "New Delhi, India",
  },
  {
    from: "11-2021",
    to: "03-2022",
    title: "Industrial Designer — Intern",
    company: "Placeholder Technologies",
    place: "Kochi, India",
  },
];

export const education = [
  {
    from: "2017",
    to: "2021",
    title: "B.Des, Industrial Design",
    company: "Placeholder Institute of Design",
    place: "India",
  },
];

export const capabilities = [
  "Form development",
  "CMF direction",
  "Design for manufacture",
  "Rapid prototyping",
  "User research",
  "CAD & surfacing",
  "Rendering & visualisation",
  "Design systems",
];
