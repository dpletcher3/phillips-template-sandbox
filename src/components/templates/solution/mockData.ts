import { SolutionData } from './types'

export const FIVE_AXIS_MOCK: SolutionData = {
  name: '5-Axis Machining Centers',
  slug: '5-axis-machining-centers',
  offeringNumber: '01',
  offering: 'CNC Machining',
  shortDesc: 'Simultaneous 5-axis precision for aerospace, medical, and mold & die.',
  description:
    'Phillips represents the world\'s leading 5-axis machining center manufacturers — Hermle, Mazak, and DMG MORI. From compact trunnion-style machines to large-envelope gantry platforms, we match the right 5-axis solution to your application, tolerance, and throughput requirements.',
  typePills: ['Trunnion', 'Swivel Head', 'Gantry', 'Mill-Turn'],
  specNumbers: [
    { value: '400–2000mm', label: 'X-Axis Travel Range' },
    { value: '42K RPM',    label: 'Max Spindle Speed' },
    { value: '±3µ',        label: 'Repeatability' },
    { value: '155°',       label: 'B-Axis Swivel' },
  ],
  relatedBrands: [
    {
      name: 'Hermle',
      slug: 'hermle',
      description: 'German-engineered mineral-cast 5-axis centers. Benchmark precision for aerospace and medical with ±0.003mm accuracy.',
    },
    {
      name: 'Mazak',
      slug: 'mazak',
      description: 'INTEGREX and VARIAXIS multi-tasking platforms. Done-in-one machining with integrated turning, milling, and automation.',
    },
    {
      name: 'DMG MORI',
      slug: 'dmg-mori',
      description: 'monoBLOCK and duoBLOCK universal centers. Industry-leading rigidity with CELOS control for smart manufacturing.',
    },
  ],
  specs: [
    { label: 'X-Axis Travel',        value: 2000,  max: 2500,  unit: 'mm' },
    { label: 'Max Spindle Speed',     value: 42000, max: 60000, unit: 'RPM' },
    { label: 'Positioning Accuracy',  value: 0.003, max: 0.01,  unit: 'mm' },
    { label: 'Table Load Capacity',   value: 2000,  max: 3000,  unit: 'kg' },
    { label: 'Tool Magazine',         value: 120,   max: 200,   unit: 'tools', note: 'Expandable to 300+' },
  ],
  specsHeading: 'Engineered for Micron-Level Confidence',
  specsDescription:
    'Our 5-axis portfolio spans machines built for watchmaking-grade tolerances to heavy aerospace structural components. Every platform we represent has been validated by Phillips applications engineers — we don\'t just sell machines, we prove them on your parts.',
  ctaHeading: 'Find Your 5-Axis',
  ctaAccent: 'Solution',
  ctaDescription:
    'Tell us about your part, your tolerance, and your production volume. Our applications engineers will recommend the right 5-axis platform — and prove it with a test cut.',
}
