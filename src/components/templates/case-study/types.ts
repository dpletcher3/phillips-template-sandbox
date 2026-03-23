export interface CaseStudyData {
  title: string
  subtitle: string
  date: string
  industry: string
  tags: string[]
  customer: string
  byline: string
  lede: string
  bodyLeft: string
  bodyRight: string
  results: Array<{ value: string; label: string }>
  sidebarTitle: string
  sidebarItems: string[]
  pullQuote: string
  pullAuthor: string
}
