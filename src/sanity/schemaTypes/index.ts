// --- Path: src/sanity/schemaTypes/index.ts (UPDATE) ---

import { type SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { skill } from "./skill";
// IMPORT THE NEW CATEGORY SCHEMA:
import { skillCategory } from "./skillCategory";
import { experience } from "./experience";
import { education } from "./education";
import { certification } from "./certification";
import hero from "./hero";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    project,
    // UPDATE skill.
    skill,
    // REGISTER skillCategory.
    skillCategory,
    experience,
    education,
    certification,
  ],
};