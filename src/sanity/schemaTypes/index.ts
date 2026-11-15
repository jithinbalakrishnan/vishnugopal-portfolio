import type { SchemaTypeDefinition } from "sanity";
import { entry } from "./entry";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  entry,
  siteSettings,
];
