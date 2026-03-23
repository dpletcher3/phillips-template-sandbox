export interface ProductLine {
  name: string
  seriesLabel: string
  models: string
  description: string
  image: string | null
  brochureUrl?: string
  xTravel?: string
  spindleSpeed?: string
  tableLoad?: string
  axes?: string
  bestFor?: string
}

export interface Stat {
  label: string
  value: string
}

export interface CaseStudyPreview {
  title: string
  customer: string
  industry: string
  summary: string
  slug: string
}

export interface SpecBar {
  label: string
  value: number
  max: number
  unit: string
  note?: string
}

export interface BrandData {
  name: string
  slug: string
  tagline: string
  description: string
  categories: string[]
  heroStats: Stat[]
  productLines: ProductLine[]
  specs: SpecBar[]
  about: {
    description: string
    founded: string
    employees: string
    countries: string
    inHouseMfg: string
  }
  caseStudies: CaseStudyPreview[]
  marqueeText: string
}
