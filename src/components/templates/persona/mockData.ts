import { PersonaData } from './types'

export const MANUFACTURER_MOCK: PersonaData = {
  persona: 'Manufacturer',
  headline: "YOU'RE A",
  headlineAccent: 'MANUFACTURER',
  description:
    'You need machines that run — and partners who keep them running. Phillips delivers the brands, the applications expertise, and the service infrastructure to keep your shop producing.',
  heroDescription:
    'From first spindle turn to lights-out automation, Phillips supports manufacturers at every stage of growth.',
  ctaLabel: 'Talk to an Engineer',
  ctaUrl: '#contact',
  tabs: {
    stats: [
      { value: '25+',    label: 'Brands Represented' },
      { value: '6',      label: 'Regional Service Centers' },
      { value: '98.7%',  label: 'Uptime SLA' },
    ],
    solutions: [
      { label: '5-Axis Machining',         description: 'Hermle, Mazak, DMG MORI — trunnion, swivel-head, and gantry platforms for complex geometry.', href: '/solution' },
      { label: 'Turning Centers',          description: 'Multi-axis lathes and multi-tasking machines for done-in-one production turning.', href: '/solution' },
      { label: 'Automation & Pallet',      description: 'Pallet pools, robotic load/unload, and flexible manufacturing systems for lights-out operation.', href: '/solution' },
      { label: 'Additive Manufacturing',   description: 'Metal and polymer additive platforms for prototyping, tooling, and production parts.', href: '/solution' },
      { label: 'Metrology & Inspection',   description: 'CMMs, optical scanners, and in-process probing for closed-loop quality assurance.', href: '/solution' },
      { label: 'CAD/CAM Software',         description: 'Mastercam, hyperMILL, and VERICUT — programming, simulation, and optimization.', href: '/solution' },
    ],
    brands: [
      { label: 'Hermle',    description: 'German-engineered 5-axis precision. Mineral-cast beds, ±0.003mm accuracy.', href: '/brand' },
      { label: 'Mazak',     description: 'INTEGREX multi-tasking and VARIAXIS 5-axis. Done-in-one manufacturing.', href: '/brand' },
      { label: 'DMG MORI',  description: 'monoBLOCK, duoBLOCK, and NLX platforms. Smart manufacturing with CELOS.', href: '/brand' },
      { label: 'EOS',       description: 'Industrial metal and polymer 3D printing. DMLS and SLS production platforms.', href: '/brand' },
    ],
    federal: [
      { label: 'ITAR Compliance',         description: 'Secure, ITAR-compliant supply chain for defense manufacturing equipment procurement.', href: '#' },
      { label: 'GSA Schedule',            description: 'Streamlined acquisition through GSA Schedule contracts for federal buyers.', href: '#' },
      { label: 'DoD Workforce Training',  description: 'CNC training programs designed for military transition and DoD workforce development.', href: '#' },
      { label: 'Arsenal Support',         description: 'Dedicated service and support for U.S. Army arsenals and Navy shipyards.', href: '#' },
    ],
  },
}
