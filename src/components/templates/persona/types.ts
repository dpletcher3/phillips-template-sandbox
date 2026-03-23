export interface GridCell {
  label: string
  description: string
  href?: string
}

export interface StatCell {
  value: string
  label: string
}

export interface TabContent {
  stats: StatCell[]
  solutions: GridCell[]
  brands: GridCell[]
  federal: GridCell[]
}

export interface PersonaData {
  persona: string
  headline: string
  headlineAccent: string
  description: string
  heroDescription: string
  ctaLabel: string
  ctaUrl: string
  tabs: TabContent
}
