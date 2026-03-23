export interface GuideCallout {
  type: 'info'
  title: string
  items: string[]
}

export interface GuideSpecRow {
  spec: string
  typical: string
  premium: string
  why: string
}

export interface GuideSection {
  id: string
  heading: string
  body: string
  callout: GuideCallout | null
  specTable?: GuideSpecRow[]
}

export interface GuideData {
  topic: string
  docId: string
  title: string
  metadata: Array<{ label: string; value: string }>
  sections: GuideSection[]
}
