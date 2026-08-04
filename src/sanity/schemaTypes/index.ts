import { type SchemaTypeDefinition } from "sanity";
import hero from "./hero";
import { project } from "./project";
import { skill } from "./skill";
import { skillCategory } from "./skillCategory";
import { journey } from "./journey";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    project,
    skill,
    skillCategory,
    journey, // <-- Replaced experience and education with journey
  ],
};