import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Served from the CDN; published edits arrive via the revalidation webhook.
  useCdn: true,
});
