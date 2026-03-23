export interface ProductLineModel {
  name: string
  travel: string
  spindle: string
}

export interface ProductLineKeySpec {
  value: string
  label: string
}

export interface ProductLineSeries {
  name: string
  tagline: string
  description: string
  models: ProductLineModel[]
  type: string
  xTravel: string
  spindleSpeed: string
  tableLoad: string
  bestFor: string
  keySpecs?: ProductLineKeySpec[]
}

export interface ProductLinesData {
  brandName: string
  series: ProductLineSeries[]
}
