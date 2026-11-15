import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { client } from "./client";
import {
  ALL_PROJECTS_QUERY,
  ENTRIES_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import type {
  ProjectCard,
  ProjectDoc,
  SiteSettings,
  TimelineEntry,
} from "./types";

/**
 * Every read is cached and tagged, so a publish in the Studio only has to
 * invalidate the tag it touched (see src/app/api/revalidate/route.ts).
 */

export async function getSettings(): Promise<SiteSettings | null> {
  "use cache";
  cacheTag("siteSettings");
  cacheLife("hours");
  return client.fetch(SITE_SETTINGS_QUERY);
}

export async function getAllProjects(): Promise<ProjectCard[]> {
  "use cache";
  cacheTag("project");
  cacheLife("hours");
  return client.fetch(ALL_PROJECTS_QUERY);
}

export async function getFeaturedProjects(): Promise<ProjectCard[]> {
  "use cache";
  cacheTag("project");
  cacheLife("hours");
  return client.fetch(FEATURED_PROJECTS_QUERY);
}

export async function getProjectSlugs(): Promise<{ slug: string }[]> {
  "use cache";
  cacheTag("project");
  cacheLife("hours");
  return client.fetch(PROJECT_SLUGS_QUERY);
}

export async function getProject(slug: string): Promise<ProjectDoc | null> {
  "use cache";
  cacheTag("project");
  cacheLife("hours");
  return client.fetch(PROJECT_QUERY, { slug });
}

export async function getEntries(): Promise<TimelineEntry[]> {
  "use cache";
  cacheTag("entry");
  cacheLife("hours");
  return client.fetch(ENTRIES_QUERY);
}
