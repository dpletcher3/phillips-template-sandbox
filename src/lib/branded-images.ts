/**
 * Branded family image map. Mirrors the structure of `appealing-images.ts`
 * and `strong-images.ts` — Unsplash URLs aligned with the Branded design
 * references in `design-references/branded/`.
 *
 * Note: `sample_images/` is in the repo root (not under `public/`) so
 * those files aren't web-accessible without copying or a Next.js rewrite.
 * All existing image maps use remote Unsplash URLs and we follow suit
 * here. Hostnames are already allow-listed in `next.config.mjs`.
 */
export const BRANDED_IMAGES = {
  // Hero / cover imagery
  homeHero:         'https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?w=1600&q=80',
  optoHero:         'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?w=1600&q=80',
  roboticsHero:     'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1600&q=80',
  brandHero:        'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1600&q=80',
  caseStudyHero:    'https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=1600&q=80',

  // Equipment
  haasMachine:      'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?w=1100&q=80',
  haasService:      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=900&q=80',
  hybridMachine:    'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=1100&q=80',
  precisionPart:    'https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=900&q=80',
  impeller:         'https://images.unsplash.com/photo-1561471828-96e54774b225?w=900&q=80',

  // Additive / 3D printing
  additivePrinters: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=1200&q=80',
  metalAM:          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',

  // People / portraits (used by RedBlockFrame on opto + team-member)
  engineerPortrait: 'https://images.unsplash.com/photo-1581089789966-df27db014448?w=720&q=80',
  teamPortrait:     'https://images.unsplash.com/photo-1580894732930-0babd100d356?w=720&q=80',
  optoEngineer:     'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=1100&q=80',

  // Training / facility
  trainingRoom:     'https://images.unsplash.com/photo-1727292485858-588c7652ad69?w=1100&q=80',
  facility:         'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80',
  classroom:        'https://images.unsplash.com/photo-1580983230786-ce385a434707?w=900&q=80',

  // Card thumbnails (used by sandbox cards if needed)
  thumbnailHome:    'https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?w=600&h=400&fit=crop&q=80',
  thumbnailOpto:    'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?w=600&h=400&fit=crop&q=80',
  thumbnailRobotics:'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=600&h=400&fit=crop&q=80',
} as const;

export type BrandedImageKey = keyof typeof BRANDED_IMAGES;
