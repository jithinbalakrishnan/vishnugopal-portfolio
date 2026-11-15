/**
 * Seeds the dataset from the placeholder content in src/lib/content.ts.
 *
 *   npm run sanity:seed
 *
 * Needs SANITY_API_WRITE_TOKEN in .env.local (an Editor token from
 * sanity.io/manage -> API -> Tokens). Safe to re-run: every document has a
 * deterministic _id and is replaced, so seeding twice does not duplicate
 * anything. Images are not seeded - upload those in the Studio.
 */
import {
  createClient,
  type IdentifiedSanityDocumentStub,
} from "@sanity/client";
import {
  capabilities,
  education,
  experience,
  projects,
  site,
} from "../src/lib/content";

const projectId = required("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = required("NEXT_PUBLIC_SANITY_DATASET");
const token = required("SANITY_API_WRITE_TOKEN");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01",
  useCdn: false,
});

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

async function run() {
  const docs: IdentifiedSanityDocumentStub[] = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      name: site.name,
      role: site.role,
      location: site.location,
      email: site.email,
      phone: site.phone,
      heroLead: site.heroLead,
      heroTrail: site.heroTrail,
      bio: site.bio,
      capabilities: [...capabilities],
      socials: site.socials.map((s, i) => ({
        _key: `social-${i}`,
        label: s.label,
        href: s.href,
      })),
    },

    ...projects.map((p, i) => ({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      subtitle: p.subtitle,
      category: p.category,
      year: p.year,
      client: p.client,
      role: p.role,
      featured: p.featured,
      order: i,
      tone: p.tone,
      summary: p.summary,
      challenge: p.challenge,
      approach: p.approach,
      outcome: p.outcome,
      sections: p.sections.map((s, j) => ({
        _key: `section-${j}`,
        _type: "section",
        heading: s.heading,
        body: s.body,
        tone: s.tone,
      })),
    })),

    ...experience.map((e, i) => ({
      _id: `entry-experience-${i}`,
      _type: "entry",
      kind: "experience",
      title: e.title,
      company: e.company,
      place: e.place,
      from: e.from,
      to: e.to,
      order: i,
    })),

    ...education.map((e, i) => ({
      _id: `entry-education-${i}`,
      _type: "entry",
      kind: "education",
      title: e.title,
      company: e.company,
      place: e.place,
      from: e.from,
      to: e.to,
      order: 100 + i,
    })),
  ];

  const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());
  await tx.commit();

  console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
