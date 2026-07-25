import { type SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { skill } from "./skill";
import { experience } from "./experience";
import { education } from "./education";
import { certification } from "./certification";
import { hero } from "./hero";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    project,
    skill,
    experience,
    education,
    certification,
  ],
};