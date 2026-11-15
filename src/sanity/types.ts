import type { Image } from "sanity";

export type SanityImage = Image & {
  alt?: string;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
};

export type ProjectCard = {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  year?: string;
  featured?: boolean;
  tone?: string;
  coverImage?: SanityImage;
};

export type ProjectSection = {
  heading: string;
  body?: string;
  tone?: string;
  image?: SanityImage;
};

export type ProjectDoc = ProjectCard & {
  client?: string;
  role?: string;
  summary?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  sections?: ProjectSection[];
};

export type TimelineEntry = {
  kind: "experience" | "education";
  title: string;
  company?: string;
  place?: string;
  from?: string;
  to?: string;
};

export type SiteSettings = {
  name: string;
  role?: string;
  location?: string;
  email?: string;
  phone?: string;
  bio?: string;
  heroLead?: string;
  heroTrail?: string;
  capabilities?: string[];
  socials?: { label: string; href: string }[];
  heroImage?: SanityImage;
  portrait?: SanityImage;
};
