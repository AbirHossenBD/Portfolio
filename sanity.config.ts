'use client'

/**
 * Sanity Studio configuration mounted on /studio
 */

import {visionTool} from '@sanity/vision'
import {defineConfig, type PluginOptions} from 'sanity'
import {structureTool} from 'sanity/structure'
import {iconPicker} from 'sanity-plugin-icon-picker'

import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {singletonTypes} from './src/sanity/singletons'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    // Cast to any to bypass Sanity v5 / plugin internal type version conflict
    iconPicker() as unknown as PluginOptions,
  ],
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => !singletonTypes.has(item.templateId))
      }
      return prev
    },
  },
})