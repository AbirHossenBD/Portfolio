// Document types that should only ever have ONE entry in the Studio
// (e.g. "Hero Section" instead of a list of many "Hero" documents).
// Add more type names here later (e.g. "siteSettings") to give them
// the same single-instance treatment.
export const singletonTypes = new Set(['hero'])

// Fixed document IDs so the singleton always resolves to the same entry.
export const singletonDocumentIds: Record<string, string> = {
  hero: 'heroSingleton',
}