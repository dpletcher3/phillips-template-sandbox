export const brandQuery = `*[_type == "brand" && slug.current == $slug][0]{
  name, tagline, description, category,
  heroImage, logo,
  productLines[]{
    name, seriesLabel, models, description, image,
    xTravel, spindleSpeed, tableLoad, axes, bestFor, brochureUrl
  },
  "relatedCaseStudies": *[_type == "caseStudy" && references(^._id)][0..2]{
    title, slug, customer, industry, results[0..1]
  },
  seo
}`

export const solutionQuery = `*[_type == "solution" && slug.current == $slug][0]{
  name, offering, shortDesc, description, heroImage,
  relatedBrands[]->{name, slug, tagline, logo},
  seo
}`

export const personaPageQuery = `*[_type == "personaPage" && persona == $persona][0]{
  persona, headline, heroImage, description,
  featuredSolutions[]->{name, slug, offering, shortDesc},
  featuredBrands[]->{name, slug, tagline, category},
  ctaLabel, ctaUrl, seo
}`

export const allBrandSlugsQuery = `*[_type == "brand"]{ "slug": slug.current }`
export const allSolutionSlugsQuery = `*[_type == "solution"]{ "slug": slug.current }`
