import type {StructureResolver} from 'sanity/structure'
import {singletonDocumentIds, singletonTypes} from './singletons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ''),
      ),
    ])