// ---- Brand ----
export const brandQuery = `*[_type == "brand" && slug.current == $slug][0]{
  name, tagline, description, category,
  heroImage, logo,
  productLines[]{
    name, seriesLabel, models, description, image,
    xTravel, spindleSpeed, tableLoad, axes, bestFor, brochureUrl,
    tagline, type, keySpecs, modelDetails
  },
  "relatedCaseStudies": *[_type == "caseStudy" && references(^._id)][0..2]{
    title, slug, customer, industry, results[0..1]
  },
  stats, taglineBarText, aboutTitle, aboutBody, aboutStats, marqueeItems, caseStudiesIntro,
  seo
}`

export const allBrandSlugsQuery = `*[_type == "brand"]{ "slug": slug.current }`

// ---- Solution ----
export const solutionQuery = `*[_type == "solution" && slug.current == $slug][0]{
  name, offering, shortDesc, description, heroImage,
  relatedBrands[]->{name, slug, tagline, logo},
  bgNumber, typePills, specStripe, specBars,
  specSectionTitle, specSectionBody,
  ctaTitle, ctaSubtitle, ctaDescription, ctaPrimaryLabel, ctaSecondaryLabel,
  seo
}`

export const allSolutionSlugsQuery = `*[_type == "solution"]{ "slug": slug.current }`

// ---- Persona ----
export const personaPageQuery = `*[_type == "personaPage" && persona == $persona][0]{
  persona, headline, heroImage, description,
  featuredSolutions[]->{name, slug, offering, shortDesc},
  featuredBrands[]->{name, slug, tagline, category},
  ctaLabel, ctaUrl,
  forLabel,
  stats,
  filterTabs[]{
    id, label,
    solutions[]->{name, slug, offering, shortDesc},
    brands[]->{name, slug, tagline, category}
  },
  seo
}`

// ---- Case Study ----
export const caseStudyQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{
  title, slug, customer, industry, isFederal,
  heroImage, summary, body,
  relatedBrands[]->{name, slug, logo},
  results,
  pullQuote, pullQuoteAttribution, kickerTags, byline,
  seo
}`

export const allCaseStudySlugsQuery = `*[_type == "caseStudy"]{ "slug": slug.current }`

// ---- Post ----
export const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title, slug, publishedAt, categories, mainImage, excerpt, body,
  author->{name, title, photo},
  readTime, heroImageCaption, pullQuote, tableOfContents,
  "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@ in ^.categories]) > 0][0..2]{
    title, slug, categories, publishedAt
  },
  seo
}`

export const allPostSlugsQuery = `*[_type == "post"]{ "slug": slug.current }`

// ---- Guide ----
export const guideQuery = `*[_type == "guide" && slug.current == $slug][0]{
  title, slug, topic, heroImage, intro, body,
  docNumber, readTime, level, tableOfContents, callouts,
  seo
}`

export const allGuideSlugsQuery = `*[_type == "guide"]{ "slug": slug.current }`

// ---- Webinar ----
export const webinarQuery = `*[_type == "webinar" && slug.current == $slug][0]{
  title, slug, scheduledAt, status, registrationUrl, recordingUrl, description,
  relatedBrands[]->{name, slug, logo},
  statusLabel, speakers, agenda, formTitle,
  seo
}`

export const allWebinarSlugsQuery = `*[_type == "webinar"]{ "slug": slug.current }`

// ---- Course ----
export const courseQuery = `*[_type == "course" && slug.current == $slug][0]{
  title, slug, track, audience, duration, description,
  relatedBrands[]->{name, slug, logo},
  trackLabel, levelLabel, modules, prerequisites, machineLabel,
  seo
}`

export const allCourseSlugsQuery = `*[_type == "course"]{ "slug": slug.current }`

// ---- Class Calendar ----
export const classCalendarQuery = `*[_type == "classEvent"] | order(startDate asc) {
  _id,
  course->{title, slug, track},
  location, startDate, endDate, seats, registrationUrl, isFederal
}`

// ---- Team Member ----
export const teamMemberQuery = `*[_type == "teamMember" && slug.current == $slug][0]{
  name, title, photo, bio, isLeadership, linkedinUrl,
  slug, issueLabel, facts
}`

export const allTeamMemberSlugsQuery = `*[_type == "teamMember" && defined(slug)]{ "slug": slug.current }`

// ---- Location ----
export const locationQuery = `*[_type == "location" && slug.current == $slug][0]{
  name, slug, region, address, phone, photo,
  services, eyebrow, hours, marqueeItems, directionsUrl
}`

export const allLocationSlugsQuery = `*[_type == "location"]{ "slug": slug.current }`

// ---- Product Lines (by brand) ----
export const brandProductLinesQuery = `*[_type == "brand" && slug.current == $slug][0]{
  name, slug, tagline, logo,
  productLines[]{
    name, seriesLabel, models, description, image, brochureUrl,
    xTravel, spindleSpeed, tableLoad, axes, bestFor,
    tagline, type, keySpecs, modelDetails
  }
}`
