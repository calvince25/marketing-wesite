import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { CustomNavbar } from './src/sanity/components/CustomNavbar'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Disable telemetry and update checks (dev-only noise reduction)
  telemetry: false,
  studio: {
    components: {
      navbar: CustomNavbar
    }
  },
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
