// Path: src/sanity/singletons.ts
export const singletonTypes = new Set(['hero', 'contact'])

export const singletonDocumentIds: Record<string, string> = {
  hero: 'heroSingleton',
  contact: 'contactSingleton',
}