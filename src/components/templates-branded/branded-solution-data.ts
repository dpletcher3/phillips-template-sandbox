/**
 * Shared types + per-slug fallbacks for the Branded Solution template.
 *
 * The existing Sanity `solution` schema (see sanity/schemas/documents/solution.ts)
 * doesn't cover most of the rich sections shown in
 * `design-references/branded/phillips-opto.html` and `phillips-robotics.html`
 * (sub-nav, accordion, success-stories, automation, training, testimonials,
 * team grid, cross-promo bands, etc.).
 *
 * Per the prompt: do NOT extend the schema in this pass. Instead, every
 * unmapped section reads from the slug-specific fallback below. The route's
 * `transformSolution()` overlays Sanity-supplied fields onto the fallback
 * so editors can still control what the schema does cover (`name`,
 * `description`, `heroImage`, `shortDesc`, `seo`).
 *
 * The matching `// TODO(schema-extension)` markers in
 * `BrandedSolutionClient.tsx` flag every site that's currently fallback-
 * driven so the next person can add fields cleanly.
 */

import type { ImageRef, RichText } from './branded-home-data';

export type { ImageRef, RichText, RichBlock } from './branded-home-data';

export interface CtaRef {
  label: string;
  href: string;
}

export interface SubnavItem {
  label: string;
  href: string;
  active?: boolean;
}

/** All possible sections; rendered conditionally based on which keys are populated. */
export interface BrandedSolutionData {
  meta?: { metaTitle?: string; metaDescription?: string };

  /** Hero — two visual variants: opto-target-mark or simpler stacked-headline. */
  hero: {
    variant: 'opto-mark' | 'stacked-headline';
    image: ImageRef;
    eyebrow?: string;
    /** opto-mark variant: large word inside the lockup, e.g. "OPTO" */
    lockupWord?: string;
    /** opto-mark variant: small subtitle under the lockup, e.g. "FOR HAAS" */
    lockupSubtitle?: string;
    /** Headline lines, rendered with `<br/>` between. */
    headlineLines: string[];
    /** Optional sub-paragraph (robotics only). */
    subText?: string;
    primaryCta?: CtaRef;
    showCarouselDots?: boolean;
  };

  /** Optional sticky sub-nav. Anchor hrefs must match section ids below. */
  subnavItems?: SubnavItem[];

  /** First content section under the hero. */
  bodyLeadIn?: {
    /** opto: portrait flanked by the offset-red-block frame. */
    /** robotics: a plain card-only layout (no image alongside). */
    variant: 'red-block-frame' | 'card-only';
    eyebrow?: string;
    heading: string;
    body: RichText;
    portrait?: ImageRef;
  };

  /** Application Support — opto. Card with top-left red bar + accordion + photo. */
  applicationSupport?: {
    id?: string;
    heading: string;
    intro: string;
    accordion: Array<{ summary: string; body: string; defaultOpen?: boolean }>;
    cta?: CtaRef;
    photo: ImageRef;
  };

  /** Haas Experts — robotics. Image + content with optional Haas/F1 logo card. */
  haasExperts?: {
    eyebrow: string;
    heading: string;
    body: RichText;
    image: ImageRef;
    cta?: CtaRef;
    showHaasLogos?: boolean;
  };

  /** Success Stories — opto. Featured story + "Next Up" sidebar with leftBorder accent. */
  successStories?: {
    eyebrow: string;
    heading: string;
    featured: {
      meta: string;
      title: string;
      description: string;
      image: ImageRef;
    };
    nextUp?: {
      label: string;
      title: string;
      href: string;
    };
  };

  /** Powerful Solutions — robotics. 6 partner-logo cards + portrait. */
  powerfulSolutions?: {
    eyebrow: string;
    heading: string;
    partners: Array<{ name: string; logoVariant: PartnerLogoVariant }>;
    portrait?: ImageRef;
  };

  /** Automation & Robotics — opto. Tinted inner card with photo + bullets. */
  automation?: {
    id?: string;
    eyebrow: string;
    heading: string;
    body: RichText;
    items: Array<{ title: string; body: string }>;
    cta?: CtaRef;
    image: ImageRef;
  };

  /** Phillips Additive — robotics. Tinted display-heading section. */
  phillipsAdditive?: {
    eyebrow: string;
    /** Each line rendered separately; the design uses 2 lines. */
    headingLines: string[];
    body: RichText;
    cta?: CtaRef;
    image: ImageRef;
  };

  /** Training — opto. Card with top-left red bar + bullet list + photo. */
  training?: {
    id?: string;
    heading: string;
    body: RichText;
    items: Array<{ title: string; body: string }>;
    cta?: CtaRef;
    photo: ImageRef;
  };

  /** Fastrack Robotics — robotics. Image + content with CTA. */
  fastrack?: {
    id?: string;
    eyebrow: string;
    heading: string;
    body: RichText;
    cta?: CtaRef;
    image: ImageRef;
  };

  /** Testimonials — opto. Dark section with 3 white cards (red drop-tab + Georgia open-quote). */
  testimonials?: {
    id?: string;
    eyebrow: string;
    heading: string;
    cards: Array<{
      quote: string;
      person: { name: string; title: string };
      moreLink?: { label: string; href: string };
    }>;
  };

  /** Team — opto. 4-up round avatars (grayscale → color hover) + carousel dots + contact CTA. */
  team?: {
    id?: string;
    eyebrow: string;
    heading: string;
    members: Array<{ name: string; role: string; photo: ImageRef }>;
    contactCta?: CtaRef;
  };

  /** Opto Engineers cross-promo — robotics. */
  optoEngineers?: {
    heading: string;
    body: RichText;
    cta?: CtaRef;
    image: ImageRef;
  };

  /** Phillips Education cross-promo — robotics. */
  phillipsEducation?: {
    heading: string;
    body: RichText;
    cta?: CtaRef;
    image: ImageRef;
  };

  /** Community / photo strip — always shown. */
  community: {
    tagline: string;
    photos: ImageRef[];
  };
}

/** Partner-logo selector keys for the Powerful Solutions grid. */
export type PartnerLogoVariant =
  | 'haas-f1'
  | 'fanuc'
  | 'phillips-additive-hybrid'
  | 'markforged'
  | 'eos'
  | 'absolute-machine-tools';

const U = (path: string, w = 1200, h = 900, q = 80) =>
  `https://images.unsplash.com/${path}?w=${w}&h=${h}&fit=crop&auto=format&q=${q}`;

/* ============================================================
   COMMUNITY (shared by both pages)
   ============================================================ */

const COMMUNITY: BrandedSolutionData['community'] = {
  tagline: 'We are a community of manufacturing experts dedicated to delivering the best solutions',
  photos: [
    { src: U('photo-1581091226033-d5c48150dbaa', 400, 500, 70), alt: '' },
    { src: U('photo-1580894732930-0babd100d356', 400, 500, 70), alt: '' },
    { src: U('photo-1580894732444-8ecded7900cd', 400, 500, 70), alt: '' },
    { src: U('photo-1581089789966-df27db014448', 400, 500, 70), alt: '' },
    { src: U('photo-1580983218765-f663bec07b37', 400, 500, 70), alt: '' },
    { src: U('photo-1580983230786-ce385a434707', 400, 500, 70), alt: '' },
    { src: U('photo-1581091224003-01e7c2e69f6f', 400, 500, 70), alt: '' },
    { src: U('photo-1581094271901-8022df4466f9', 400, 500, 70), alt: '' },
  ],
};

/* ============================================================
   PHILLIPS-OPTO FALLBACK
   ============================================================ */

export const OPTO_FALLBACK: BrandedSolutionData = {
  meta: {
    metaTitle: 'Opto for Haas — Phillips Corporation',
    metaDescription: 'Phillips Opto engineers — applications consultants who help you reduce cycle times, improve manufacturing, and unlock new capabilities on your Haas machines.',
  },

  hero: {
    variant: 'opto-mark',
    image: { src: U('photo-1717386255773-a456c611dc4e', 1600, 900), alt: 'Haas CNC machine in operation' },
    lockupWord: 'OPTO',
    lockupSubtitle: 'FOR HAAS',
    headlineLines: ['Stop Making.', 'Start Scaling.'],
  },

  subnavItems: [
    { label: 'Application Support',     href: '#application-support' },
    { label: 'Opto Videos',             href: '#opto-videos' },
    { label: 'Training',                href: '#training' },
    { label: 'Automation & Robotics',   href: '#automation', active: true },
    { label: 'Testimonials',            href: '#testimonials' },
    { label: 'Our Team',                href: '#team' },
    { label: 'Contact Us',              href: '#contact' },
  ],

  bodyLeadIn: {
    variant: 'red-block-frame',
    eyebrow: 'Opto Engineers',
    heading: 'Amplify Your Efficiency',
    body: 'Experience, expertise, and engagement — that\'s what you get when an "OPTOmization" engineer steps on your shop floor.\n\nOPTO engineers are applications consultants who can help you develop optimized processes and maximized profits through reduced cycle times, manufacturing improvements, and new capabilities realized.\n\nOur Haas machine optimization services include training, tooling, applications support, robot installation & integration, and process improvement. OPTO engineers are the competitive edge your business needs.',
    portrait: { src: U('photo-1581089789966-df27db014448', 720, 900), alt: 'Phillips Opto engineer portrait' },
  },

  applicationSupport: {
    id: 'application-support',
    heading: 'Application Support',
    intro: "Unlock your Haas machine's full potential and boost your ROI with Phillips' comprehensive application support services. Our experts provide:",
    accordion: [
      {
        summary: 'Optimized Machine Performance',
        body: "Customized programming solutions (including offline simulation) and precise tooling/cutting parameter recommendations to maximize your Haas machine's performance for complex parts and enhance part quality while reducing tooling costs.",
        defaultOpen: true,
      },
      {
        summary: 'Enhanced Production Efficiency',
        body: 'Streamline production with proven workflows, fixturing strategies, and macro-driven automation to compress cycle times and increase throughput.',
      },
      {
        summary: 'Quality and Validation Support',
        body: 'On-machine probing strategies, first-article inspection workflows, and process capability validation to ensure consistent, repeatable parts.',
      },
    ],
    cta: { label: 'Contact Our Team', href: '#contact' },
    photo: { src: U('photo-1581091226033-d5c48150dbaa', 1100, 900), alt: 'Application engineers at Haas control' },
  },

  successStories: {
    eyebrow: 'Customer Outcomes',
    heading: 'Success Stories.',
    featured: {
      meta: 'Featured Case Study',
      title: 'Allied Cycle Works — From Design to Programming',
      description: 'Phillips Opto assists new parts production from design to programming for Allied Cycle Works.',
      image: { src: U('photo-1716191299980-a6e8827ba10b', 1400, 800), alt: 'Allied Cycle Works case study' },
    },
    nextUp: {
      label: 'Next Up',
      title: 'Streamlining the Production Process at Ziehl-Abegg with Phillips Opto',
      href: '#',
    },
  },

  automation: {
    id: 'automation',
    eyebrow: 'Automation & Robotics',
    heading: 'Robots That Work With You.',
    body: 'Complement your existing workforce and quickly increase capacity while freeing up your staff to focus on more value-added activities.',
    items: [
      {
        title: 'Custom Robotic Automation Solutions',
        body: 'We provide customizable robotic automation solutions tailored to meet the specific needs of your company, leveraging industry-leading robot brands and the expertise of our dedicated robotic automation engineers.',
      },
      {
        title: 'Installation and Integration Assistance',
        body: 'Expert support for seamless robotic system integration, from cell design through commissioning.',
      },
      {
        title: 'Beginner and Advanced Robot Programming',
        body: 'Comprehensive robot programming training, from foundational concepts to advanced techniques.',
      },
    ],
    cta: { label: 'Learn More', href: '/branded/solution/phillips-robotics' },
    image: { src: U('photo-1647427060118-4911c9821b82', 1200, 900), alt: 'Automation engineer with robot cell' },
  },

  training: {
    id: 'training',
    heading: 'Training',
    body: 'Put our industry-leading know-how to work and gain cutting-edge skills with our training programs.',
    items: [
      { title: 'Introduction to Macros Training', body: 'Foundational knowledge for utilizing macros to automate and streamline machine operations.' },
      { title: 'Multi-Axis Training',             body: 'Learn to program and operate multi-axis machines for complex part manufacturing.' },
      { title: 'Advanced Lathe Training',         body: 'Master advanced techniques for lathe programming and operation to maximize efficiency and precision.' },
      { title: 'Advanced Mill Training',          body: 'Develop expertise in advanced milling strategies and techniques for complex part production.' },
      { title: 'Advanced Probe Training',         body: 'Gain proficiency in utilizing probing systems for precise part measurement and in-process adjustments.' },
      { title: 'Advanced Macros Training',        body: 'Explore advanced macro programming for complex automation and process control.' },
    ],
    cta: { label: 'Learn More', href: '#' },
    photo: { src: U('photo-1580983230786-ce385a434707', 900, 1100), alt: 'Engineers reviewing training program' },
  },

  testimonials: {
    id: 'testimonials',
    eyebrow: 'Customer Voices',
    heading: 'Opto In Action.',
    cards: [
      {
        quote: 'This wasn\'t just about productivity. It was also about sustainability.',
        person: { name: 'Nathan Hoagland', title: 'Quality and Maintenance Supervisor for Gerdau' },
      },
      {
        quote: "If you think you know everything, you're not going anywhere. You've got to be willing to reach out and learn — and Phillips has a lot to teach.",
        person: { name: 'Stan Wright', title: 'Machine Shop Manager for Nighthawk' },
      },
      {
        quote: "I rarely do this, but I highly recommend Ben. You just don't see this kind of technical skill very often.",
        person: { name: 'Dave Myers', title: 'Senior Manufacturing Engineer' },
        moreLink: { label: 'More', href: '#' },
      },
    ],
  },

  team: {
    id: 'team',
    eyebrow: 'Our People',
    heading: 'Meet Your Team',
    members: [
      { name: 'Joe Sommers',      role: 'General Manager',           photo: { src: U('photo-1581091224003-01e7c2e69f6f', 400, 400), alt: 'Joe Sommers' } },
      { name: 'Ben VandeHoef',    role: 'Sr. Applications Engineer', photo: { src: U('photo-1580894732444-8ecded7900cd', 400, 400), alt: 'Ben VandeHoef' } },
      { name: 'Jonathan Hopkins', role: 'Sr. Applications Engineer', photo: { src: U('photo-1580894732930-0babd100d356', 400, 400), alt: 'Jonathan Hopkins' } },
      { name: 'Dave Cirilo',      role: 'Sr. Applications Engineer', photo: { src: U('photo-1581094271901-8022df4466f9', 400, 400), alt: 'Dave Cirilo' } },
    ],
    contactCta: { label: 'Contact Us', href: '#' },
  },

  community: COMMUNITY,
};

/* ============================================================
   PHILLIPS-ROBOTICS FALLBACK
   ============================================================ */

export const ROBOTICS_FALLBACK: BrandedSolutionData = {
  meta: {
    metaTitle: 'Phillips Corporation — We Make Robotics Easy',
    metaDescription: 'Phillips Robotics — find out how to optimize production through robotic automation, integrated with your existing CNC platforms.',
  },

  hero: {
    variant: 'stacked-headline',
    image: { src: U('photo-1647427060118-4911c9821b82', 1600, 900), alt: 'Robot cell tending a CNC machine' },
    eyebrow: 'Phillips Robotics',
    headlineLines: ['We Make', 'Robotics', 'Easy'],
    subText: 'Find out how to optimize production through robotics.',
    primaryCta: { label: 'Learn More', href: '#fastrack' },
    showCarouselDots: true,
  },

  bodyLeadIn: {
    variant: 'card-only',
    heading: 'Experience Manufacturing Innovation',
    body: 'At Phillips, our goal is to help you succeed. We offer innovative solutions that propel manufacturing capabilities, profitability, and productivity.\n\nWe are machining & additive experts providing legendary value to our customers, partners and employees with a unique, high performance, passionate, deeply caring culture.',
  },

  haasExperts: {
    eyebrow: 'Sales · Service · Support',
    heading: 'Your Haas Experts',
    body: 'Phillips Corporation is proud to be a Haas Factory Outlet for more than 30 years. With over 20,000 Haas machines installed across 12 states, our Haas experts are ready to support you from sales, installation, service and beyond.',
    image: { src: U('photo-1717386255773-a456c611dc4e', 1100, 900), alt: 'Haas CNC machine' },
    cta: { label: 'Learn More', href: '#' },
    showHaasLogos: true,
  },

  powerfulSolutions: {
    eyebrow: 'Manufacturing Partners',
    heading: 'Powerful Solutions For All Your Manufacturing Needs',
    partners: [
      { name: 'Haas + F1 Team',           logoVariant: 'haas-f1' },
      { name: 'FANUC',                    logoVariant: 'fanuc' },
      { name: 'Phillips Additive Hybrid', logoVariant: 'phillips-additive-hybrid' },
      { name: 'Markforged',               logoVariant: 'markforged' },
      { name: 'EOS',                      logoVariant: 'eos' },
      { name: 'Absolute Machine Tools',   logoVariant: 'absolute-machine-tools' },
    ],
    portrait: { src: U('photo-1580894732930-0babd100d356', 720, 900), alt: 'Phillips Corporation team member' },
  },

  phillipsAdditive: {
    eyebrow: 'Phillips Additive',
    headingLines: ['The Only Limitation', 'Is Your Imagination.'],
    body: 'Additive manufacturing is transforming the industry. This technology is not just for rapid prototyping, but for complex production, low-cost customization, rapid turnarounds and more.',
    cta: { label: 'Learn More', href: '#' },
    image: { src: U('photo-1655393001768-d946c97d6fd1', 1200, 800), alt: 'EOS metal 3D printers in production' },
  },

  fastrack: {
    id: 'fastrack',
    eyebrow: 'Automation & Robotics',
    heading: 'Fastrack Productivity With Robotics',
    body: "Few new technologies will give you this much output this quickly. With today's new machine tending robots, you can double, even triple, output. Let our dedicated team of experts help you select and integrate the best robot for your CNCs.",
    cta: { label: 'Learn More', href: '#' },
    image: { src: U('photo-1716191299980-a6e8827ba10b', 1200, 900), alt: 'Robot arm tending a CNC machine' },
  },

  optoEngineers: {
    heading: 'Experience Next-Level Productivity With Our Opto Engineers',
    body: 'Our Opto engineers are applications consultants who can help you develop improved processes and maximized profits through reduced cycle times, manufacturing improvements, and new capabilities realized.',
    cta: { label: 'Learn More', href: '/branded/solution/phillips-opto' },
    image: { src: U('photo-1580983218765-f663bec07b37', 1100, 700), alt: 'Phillips Opto engineer at work' },
  },

  phillipsEducation: {
    heading: 'Training That Breaks The Mold',
    body: "From machine programming to repairs, our new premier education program is rewriting the training story. Entirely hands-on, our classes are taught by some of the country's most experienced experts. Master real challenges on real machines. For real results.",
    cta: { label: 'Find Classes', href: '#' },
    image: { src: U('photo-1727292485858-588c7652ad69', 1100, 900), alt: 'Phillips Education hands-on training' },
  },

  community: COMMUNITY,
};

/* ============================================================
   GENERIC FALLBACK (used when slug is unknown)
   ============================================================ */

/** Used when the route is hit with a slug we don't have a fallback for. */
export const GENERIC_FALLBACK: BrandedSolutionData = ROBOTICS_FALLBACK;

/** Pick the slug-specific fallback, or {@link GENERIC_FALLBACK}. */
export function pickFallback(slug: string | undefined): BrandedSolutionData {
  if (slug === 'phillips-opto') return OPTO_FALLBACK;
  if (slug === 'phillips-robotics') return ROBOTICS_FALLBACK;
  return GENERIC_FALLBACK;
}
