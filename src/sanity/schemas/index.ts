import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import service from './service'
import project from './project'
import lead from './lead'
import siteSettings from './siteSettings'
import pageContent from './pageContent'

import adminUser from './adminUser'

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  service,
  project,
  lead,
  siteSettings,
  pageContent,
  blockContent,
  adminUser,
]
