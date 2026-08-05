// Path: src/sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from "sanity";
import hero from "./hero";
import { project } from "./project";
import { skill } from "./skill";
import { skillCategory } from "./skillCategory";
import { journey } from "./journey";
import { contact } from "./contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    project,
    skill,
    skillCategory,
    journey,
    contact, 
  ],
};