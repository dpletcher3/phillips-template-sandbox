/**
 * Shared types + fallback content for the Branded home page.
 *
 * `FALLBACK_HOME` mirrors the content shown in
 * `design-references/branded/phillips-home.html`. The route at
 * `src/app/branded/page.tsx` overlays the live Sanity homePage doc on top
 * of this fallback, so `/branded` always renders something even on a fresh
 * dataset (or when the fetch fails).
 */

/**
 * Image source: either a Sanity image object (preferred) or a direct URL
 * with alt text. {@link BrandedHomeClient} uses `sanity` first and falls
 * back to `src` via `<SanityImage>`.
 */
export interface ImageRef {
  sanity?: unknown;
  src?: string;
  alt: string;
}

/** Block matching Sanity's portable text shape for our minimal renderer. */
export interface RichSpan {
  _type: 'span';
  _key?: string;
  text?: string;
  marks?: string[];
}
export interface RichBlock {
  _type: 'block';
  _key?: string;
  style?: string;
  children?: RichSpan[];
}

/**
 * Body text. Plain strings support `\n\n` paragraph breaks and `**…**`
 * inline bold markers (interpreted by the section that renders the
 * content — different sections style bold differently). Block arrays
 * come straight from Sanity's `blockContent`.
 */
export type RichText = string | RichBlock[];

export interface CtaRef {
  label: string;
  href: string;
}

export interface BrandedHomeData {
  hero: {
    image: ImageRef;
    showProgressBars: boolean;
    headline: string;
    body: RichText;
    cta: string;
  };
  inspired: {
    heading: string;
    body: RichText;
    image: ImageRef;
  };
  hybrid: {
    heading: string;
    subheading: string;
    partnerPills: string[];
    body: RichText;
    image: ImageRef;
    cta: CtaRef;
  };
  op: {
    eyebrow: string;
    heading: string;
    subheading: string;
    body: RichText;
    tileImages: [ImageRef, ImageRef];
    cta: CtaRef;
  };
  haas: {
    eyebrow: string;
    heading: string;
    body: RichText;
    image: ImageRef;
  };
  innov: {
    heading: string;
    cards: Array<{
      iconKey: 'machining' | 'additive' | 'optimization' | 'workforce';
      title: string;
      body: string;
      cta: CtaRef;
    }>;
  };
  lg: {
    heading: string;
    regions: Array<{
      regionName: string;
      subLabels: Array<{ label?: string; locations: string[] }>;
    }>;
    regionButtons: CtaRef[];
  };
  impact: {
    eyebrow: string;
    heading: string;
    cards: Array<{
      title: string;
      meta: string;
      slug: string;
      heroImage: ImageRef;
    }>;
  };
  machinist: {
    heading: string;       // multi-line label, e.g. "THE\nPHILLIPS\nMACHINIST"
    body: RichText;
    highlight: string;
    qrImage: ImageRef | null;
  };
  wt: {
    eyebrow: string;
    heading: string;
    body: RichText;
    ctas: Array<CtaRef & { variant: 'primary' | 'ghost' }>;
    image: ImageRef;
  };
  community: {
    tagline: string;
    photos: ImageRef[];
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

const U = (path: string, w = 1200, h = 900, q = 80) =>
  `https://images.unsplash.com/${path}?w=${w}&h=${h}&fit=crop&auto=format&q=${q}`;

/** Reference content from `phillips-home.html`, used when no Sanity doc exists. */
export const FALLBACK_HOME: BrandedHomeData = {
  hero: {
    image: { src: U('photo-1716191300020-b52dec5b70a8', 1600, 900), alt: 'Phillips Corporation manufacturing facility' },
    showProgressBars: true,
    headline: 'Move your Mountain.',
    body: "At Phillips we're passionate in helping customers overcome barriers to success. We deliver customized manufacturing solutions for **machining, additive, automation** and **workforce enrichment.**",
    cta: "Make your move. We're ready.",
  },

  inspired: {
    heading: 'Inspired By Your Ingenuity',
    body: 'We are a global manufacturing solutions and services company, partnering with customers to create legendary value by providing unparalleled expertise, innovative thinking, and solutions for those who shape the future.\n\n**Our Mission:** To partner with thought leaders and creators providing the needed know-how and machinery to transform human society in ways that make life immeasurably better.\n\n**Our Vision:** To accomplish our mission by being the world’s best supplier of manufacturing technology.',
    image: { src: U('photo-1581091226033-d5c48150dbaa', 1000, 800), alt: 'Phillips engineers reviewing CNC controls' },
  },

  hybrid: {
    heading: 'ADDITIVE HYBRID',
    subheading: 'POWERED BY HAAS',
    partnerPills: ['MELTIO', 'FRONIUS', 'LASERLINE'],
    body: "Phillips is transforming manufacturing with a lineup of hybrid additive solutions, combining the power of Fronius Wire Arc, Laserline’s powder deposition and Meltio’s laser deposition technology systems with trusted Haas CNC machining centers. Now, you can integrate both additive and subtractive capabilities directly into your new or existing Haas machine, allowing for unparalleled flexibility in creating and repairing complex parts all within a single setup.",
    image: { src: U('photo-1666618090858-fbcee636bd3e', 1100, 900), alt: 'Phillips Additive Hybrid machine' },
    cta: { label: 'Learn More', href: '#' },
  },

  op: {
    eyebrow: 'Advanced Manufacturing',
    heading: 'Operationalize',
    subheading: 'Advanced Manufacturing Technology',
    body: '**Phillips experts are ready to help you transform your ideas into reality.**\n\nWe help our customers operationalize advanced manufacturing technology by providing expertise in technology selection, workforce development, and design for advanced manufacturing life cycle support. Leverage our proven additive expertise to accelerate and solidify your industrial readiness. From concept to completion, we seamlessly convert research projects into scalable parts ready for production.\n\nLet Phillips’ EXPERTISE fuel your success — OPERATIONALIZE and PROPEL your additive business like never before.',
    tileImages: [
      { src: U('photo-1740209475472-aa7d280f7452', 900, 900), alt: 'Machined precision part' },
      { src: U('photo-1561471828-96e54774b225', 900, 900), alt: 'Additive impeller' },
    ],
    cta: { label: 'Learn More', href: '#' },
  },

  haas: {
    eyebrow: 'Haas Factory Outlet · 30+ Years',
    heading: 'Haas. Sales. Service. Support. And More.',
    body: 'We know Haas. For over 30 years, Phillips has been a prominent and proud Haas Factory Outlet — offering sales, service, training, applications support, and Phillips Opto. Our knowledgeable team will help you find the best solution to propel your productivity.\n\nWith over 30,000 Haas machines installed globally, our Haas experts are ready to support you from install to service and beyond. Let us help you experience manufacturing innovation.',
    image: { src: U('photo-1580894732444-8ecded7900cd', 900, 1100), alt: 'Phillips Haas service technician' },
  },

  innov: {
    heading: 'Innovative Solutions To Maximize Your Productivity',
    cards: [
      {
        iconKey: 'machining',
        title: 'Machining Solutions',
        body: 'We carry the best machines from the best brands. With Phillips, you get a dedicated team of experts ready to provide everything you need for success — fast service, productivity solutions, training, and more.',
        cta: { label: 'Select Region', href: '#' },
      },
      {
        iconKey: 'additive',
        title: 'Additive Solutions',
        body: 'As AM enthusiasts, we inspire you to gain confidence to integrate additive into your manufacturing process, understand its potential, and exploit new opportunities to grow your business.',
        cta: { label: 'Select Region', href: '#' },
      },
      {
        iconKey: 'optimization',
        title: 'Optimization',
        body: 'Our Opto engineers are applications consultants who can help you develop improved processes and maximized profits through reduced cycle times, manufacturing improvements, and new capabilities realized.',
        cta: { label: 'Select Region', href: '#' },
      },
      {
        iconKey: 'workforce',
        title: 'Workforce Training',
        body: "With our hands-on classes, we'll teach you how to troubleshoot, repair, and maintain your Haas machines on your own. A major “leveling up” of skills that keeps your machines running smoothly.",
        cta: { label: 'Select Region', href: '#' },
      },
    ],
  },

  lg: {
    heading: "We're Local And Global",
    regions: [
      {
        regionName: 'Americas',
        subLabels: [
          {
            label: 'Offices and Showrooms',
            locations: ['Birmingham, Alabama', 'Little Rock, Arkansas', 'Hanover, Maryland', 'Colfax, North Carolina', 'Bensalem, Pennsylvania'],
          },
          {
            label: 'Education Centers',
            locations: ['Thaddeus Stevens College, PA', 'Greenville Technical College, SC', 'Midlands Technical College, SC', 'TCAT Smyrna, TN'],
          },
        ],
      },
      {
        regionName: 'Asia · India',
        subLabels: [
          { locations: ['Ahmedabad', 'Bengaluru', 'Chennai', 'Kolhapur', 'Ludhiana', 'Mumbai', 'Nashik', 'Noida', 'Pune'] },
        ],
      },
      {
        regionName: 'Southern Asia',
        subLabels: [
          { locations: ['Dhaka, Bangladesh', 'Panadura, Sri Lanka'] },
          { label: 'South-Eastern Asia', locations: ['Selangor, Malaysia'] },
          { label: 'Middle East', locations: ['Dammam, Saudi Arabia', 'Sharjah, UAE', 'Cairo, Egypt'] },
          { label: 'China', locations: ['Shanghai', 'Suzhou', 'Zhejiang'] },
        ],
      },
    ],
    regionButtons: [
      { label: 'USA', href: '#' },
      { label: 'USA Gov', href: '#' },
      { label: 'India', href: '#' },
      { label: 'Southern Asia', href: '#' },
      { label: 'Malaysia', href: '#' },
      { label: 'Middle East', href: '#' },
    ],
  },

  impact: {
    eyebrow: 'Customer Stories',
    heading: 'Phillips Global Impact On Manufacturing',
    cards: [
      { title: 'Headline goes here', meta: 'Case Study', slug: '#', heroImage: { src: U('photo-1713371398484-cc4e4f6a262a', 900, 600), alt: 'Manufacturing customer story' } },
      { title: 'Headline goes here', meta: 'Case Study', slug: '#', heroImage: { src: U('photo-1711418235334-8895331a6cf9', 900, 600), alt: 'Manufacturing customer story' } },
      { title: 'Headline goes here', meta: 'Case Study', slug: '#', heroImage: { src: U('photo-1727292485858-588c7652ad69', 900, 600), alt: 'Manufacturing customer story' } },
    ],
  },

  machinist: {
    heading: 'THE\nPHILLIPS\nMACHINIST',
    body: 'The Phillips Machinist app is an innovative tool designed to assist machinists and manufacturing professionals in improving their daily productivity, staying in touch with industry leaders and trends, and providing opportunities for developing and advancing skill sets.',
    highlight: 'Come join our community of machinists — download the Phillips Machinist app for free.',
    qrImage: null, // renders the inline placeholder QR SVG
  },

  wt: {
    eyebrow: 'Careers at Phillips',
    heading: "Let’s Work Together.",
    body: "When you join the Phillips community, you’ll enhance your career, creativity, and intellectual growth while being part of a company committed to becoming the best supplier of manufacturing technology and expertise. Apply for opportunities at Corporate, as well as our Performance Centers including Phillips Commercial, Federal, & Phillips Machine Tools India.",
    ctas: [
      { label: 'Careers',     href: '#', variant: 'primary' },
      { label: 'Our Story',   href: '#', variant: 'ghost'   },
      { label: 'Our Culture', href: '#', variant: 'ghost'   },
    ],
    image: { src: U('photo-1580983218765-f663bec07b37', 1100, 900), alt: 'Phillips Corporation team member' },
  },

  community: {
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
  },

  seo: {
    metaTitle: 'Phillips Corporation — Move Your Mountain',
    metaDescription: "Phillips Corporation — customized manufacturing solutions for machining, additive, automation, and workforce enrichment.",
  },
};
