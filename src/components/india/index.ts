// Atoms (re-exported for `import { IndiaH2 } from '@/components/india'`)
export {
  IndiaH2,
  IndiaCtaButton,
  IndiaGlassCard,
  IndiaCaptionPill,
} from './atoms'

// Simple components (session 5b)
export { default as IndiaSectionBreak } from './IndiaSectionBreak'
export { default as IndiaTickCheckList } from './IndiaTickCheckList'
export { default as IndiaLogoCarousel } from './IndiaLogoCarousel'
export { default as IndiaPhotoGrid } from './IndiaPhotoGrid'

// Composite components (session 5c)
export { default as IndiaHeroWithForm } from './IndiaHeroWithForm'
export { default as IndiaContentHero } from './IndiaContentHero'
export { default as IndiaPortfolioRow } from './IndiaPortfolioRow'
export { default as IndiaProTipsCallout } from './IndiaProTipsCallout'
export { default as IndiaGlasseyTabs } from './IndiaGlasseyTabs'
export { default as IndiaDarkCategoryCard } from './IndiaDarkCategoryCard'
export { default as IndiaRepeatableLeadForm } from './IndiaRepeatableLeadForm'

// PortableText components map (consumers pass it explicitly to <PortableText>)
export { indiaPortableTextComponents } from './portableText'

// Shared TypeScript shapes (mirror the Sanity object schemas from 5a)
export type {
  LeadForm,
  LeadFormField,
  LeadFormFieldType,
  PhotoTab,
  Callout,
  CalloutType,
} from './types'
