import { defineQuery } from "next-sanity";

const IMAGE = `{
  ...,
  asset->{ _id, url, metadata { lqip, dimensions } }
}`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    name, role, location, email, phone, bio, aboutBody, capabilities,
    heroLead, heroTrail,
    socials[]{ label, href },
    heroImage ${IMAGE},
    portrait ${IMAGE}
  }
`);

const PROJECT_CARD = `{
  "slug": slug.current,
  title, subtitle, category, year, featured, tone,
  coverImage ${IMAGE}
}`;

export const ALL_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
    | order(order asc, year desc) ${PROJECT_CARD}
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true && defined(slug.current)]
    | order(order asc, year desc) ${PROJECT_CARD}
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    "slug": slug.current,
    title, subtitle, category, year, client, role, tone,
    summary, challenge, approach, outcome,
    coverImage ${IMAGE},
    sections[]{ heading, body, tone, image ${IMAGE} }
  }
`);

/** Ordered list used by both timelines on the About page. */
export const ENTRIES_QUERY = defineQuery(`
  *[_type == "entry"] | order(order asc){
    kind, title, company, place, from, to
  }
`);
