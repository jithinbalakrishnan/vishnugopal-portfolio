# Portfolio — Industrial / UI-UX Designer

Minimal portfolio site modelled on the structure of
[abinrajendran.com](https://www.abinrajendran.com/): white background, black
text, Poppins headings, Inter body, generous whitespace.

**Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion ·
Sanity CMS. All page content is edited in the Studio at `/studio`.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000.

## Routes

| Route            | What it is                                                        |
| ---------------- | ----------------------------------------------------------------- |
| `/`              | Hero image, intro line, short bio, featured projects, portfolio link |
| `/portfolio`     | Cover block, intro, category chips, full project grid              |
| `/about`         | Portrait, bio, experience + education timelines, capabilities      |
| `/contact`       | Intro line, contact details, message form (no backend yet)         |
| `/work/[slug]`   | Case study: cover, meta, challenge/approach, process, next project |
| `/studio`        | Sanity Studio — edit all content here                              |
| `/api/revalidate`| Sanity publish webhook target                                      |
| 404              | `src/app/not-found.tsx`                                            |

## Where things live

```
src/
  app/
    layout.tsx            <html>, fonts, metadata from Sanity
    (site)/               Everything with the site header + footer
      layout.tsx          Header + Footer, fetches site settings once
      page.tsx            Home
      portfolio/          Portfolio listing
      about/              About
      contact/            Contact
      work/[slug]/        Case study template
    studio/[[...tool]]/   Sanity Studio, mounted at /studio
    api/revalidate/       Webhook: publish in Sanity -> cache tag cleared
    globals.css           Theme tokens (colours, fonts) for Tailwind v4
  components/
    Header.tsx            Sticky header, active link, mobile sheet
    Footer.tsx            Contact footer (email, location, phone, socials)
    ProjectCard.tsx       Cover + title, links to the case study
    ContactForm.tsx       Placeholder form, no submit endpoint
    CoverImage.tsx        Sanity image, or the Frame placeholder if empty
    Frame.tsx             Toned placeholder block
    Motion.tsx            Reveal / FadeIn / WordReveal wrappers
  sanity/
    schemaTypes/          project, entry, siteSettings
    data.ts               Cached, tagged read functions — pages call these
    queries.ts            GROQ
    client.ts, image.ts, env.ts, structure.ts, types.ts
  lib/
    content.ts            Seed data only; the live site reads Sanity
sanity.config.ts          Studio config
scripts/seed.ts           Writes src/lib/content.ts into the dataset
```

## Content

Everything on the site is edited at `/studio`:

- **Site settings** — name, role, location, email, phone, the home page
  headline, bio, socials, capabilities, hero image, portrait
- **Projects** — one document per case study, `featured` puts it on the home page
- **Timeline** — one document per row, `kind` switches it between the
  Experience and Education lists on About

Images are optional. `CoverImage` renders the Sanity asset when one exists and
falls back to a toned placeholder when the field is empty, so the layout holds
up before any photography is uploaded.

`src/lib/content.ts` is **seed data only** — the running site does not read it.
It exists so `npm run sanity:seed` can repopulate a fresh dataset.

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Pinned date, e.g. `2026-01-01` |
| `SANITY_API_WRITE_TOKEN` | Editor token; only the seed script uses it |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the publish webhook |

`.env.local` is gitignored. The write token is **not** needed to run the site —
reads are public.

## Caching

Reads go through `src/sanity/data.ts`, which wraps each query in `"use cache"`
with a tag (`project`, `entry`, `siteSettings`) and a one-hour `cacheLife`.
To make published edits appear immediately, add a webhook in sanity.io/manage
pointing at `POST /api/revalidate` with `SANITY_REVALIDATE_SECRET` as the
secret. Without it, edits appear within the hour.

## Next steps

1. Add `http://localhost:3000` as a CORS origin in sanity.io/manage so the
   Studio can connect (the Studio links straight to it on first load).
2. Upload real imagery in the Studio and replace the placeholder copy.
3. Wire the contact form to a route handler or a form service.
4. Set up the publish webhook described under Caching.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Seeding a fresh dataset

```bash
npm run sanity:seed
```

Re-runnable: every document has a fixed `_id` and is replaced, so seeding twice
does not duplicate anything. It does not upload images.
