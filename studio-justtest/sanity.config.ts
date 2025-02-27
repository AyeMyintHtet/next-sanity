import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { codeInput } from '@sanity/code-input';
export default defineConfig({
  name: 'default',
  title: 'justTest',

  projectId: '33vcr9an',
  dataset: 'production',

  plugins: [structureTool(), visionTool(),codeInput()],

  schema: {
    types: schemaTypes,
  },
})
