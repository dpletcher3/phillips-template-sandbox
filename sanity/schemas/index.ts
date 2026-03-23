import brand        from './documents/brand'
import solution     from './documents/solution'
import caseStudy    from './documents/caseStudy'
import post         from './documents/post'
import guide        from './documents/guide'
import webinar      from './documents/webinar'
import course       from './documents/course'
import classEvent   from './documents/classEvent'
import teamMember   from './documents/teamMember'
import location     from './documents/location'
import productLine  from './objects/productLine'
import seoBlock     from './objects/seoBlock'
import blockContent from './objects/blockContent'
import personaPage  from './singletons/personaPage'
import siteSettings from './singletons/siteSettings'

export const schemaTypes = [
  // Documents
  brand, solution, caseStudy, post, guide, webinar, course, classEvent, teamMember, location,
  // Objects
  productLine, seoBlock, blockContent,
  // Singletons
  personaPage, siteSettings,
]
