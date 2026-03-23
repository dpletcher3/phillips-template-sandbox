export interface PostSection {
  id: string
  heading: string
  body: string
}

export interface RelatedPost {
  title: string
  category: string
  date: string
  slug?: string
}

export interface PostData {
  title: string
  titleAccent: string
  categories: string[]
  date: string
  author: string
  authorTitle: string
  readTime: string
  sections: PostSection[]
  pullQuote: string
  relatedPosts: RelatedPost[]
}
