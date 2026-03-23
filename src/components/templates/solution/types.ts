export interface SpecNumber {
  value: string
  label: string
}

export interface BrandCell {
  name: string
  slug: string
  description: string
}

export interface SpecBar {
  label: string
  value: number
  max: number
  unit: string
  note?: string
}

export interface SolutionData {
  name: string
  slug: string
  offeringNumber: string
  offering: string
  shortDesc: string
  description: string
  typePills: string[]
  specNumbers: SpecNumber[]
  relatedBrands: BrandCell[]
  specs: SpecBar[]
  specsHeading: string
  specsDescription: string
  ctaHeading: string
  ctaAccent: string
  ctaDescription: string
}
