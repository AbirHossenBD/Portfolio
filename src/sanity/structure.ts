// Path: src/sanity/structure.ts
import type {StructureResolver} from 'sanity/structure'
import {singletonDocumentIds, singletonTypes} from './singletons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero Section')
        .id('hero')
        .child(
          S.document()
            .schemaType('hero')
            .documentId(singletonDocumentIds.hero),
        ),
      S.listItem()
        .title('Contact & Footer')
        .id('contact')
        .child(
          S.document()
            .schemaType('contact')
            .documentId(singletonDocumentIds.contact),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ''),
      ),
    ])