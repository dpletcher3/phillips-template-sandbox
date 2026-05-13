import {
  PortableText as PT,
  type PortableTextComponents,
  type PortableTextReactComponents,
} from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import SanityImage from './SanityImage'
import { F_DISPLAY, F_BODY } from '@/lib/constants'

export type { PortableTextBlock, PortableTextComponents }

const defaultComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p style={{ fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>{children}</p>
    ),
    h1: ({ children }) => (
      <h1 style={{ ...F_DISPLAY, fontSize: 36, margin: '0 0 24px' }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ ...F_DISPLAY, fontSize: 28, margin: '32px 0 16px' }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ ...F_DISPLAY, fontSize: 20, margin: '24px 0 12px' }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ ...F_DISPLAY, fontSize: 16, margin: '20px 0 10px' }}>{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '3px solid #F9423A', padding: '0 16px', margin: '16px 0', color: '#555' }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={{ paddingLeft: 20, margin: '0 0 16px' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ paddingLeft: 20, margin: '0 0 16px' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ ...F_BODY, fontSize: 14, lineHeight: 1.7, margin: '0 0 6px' }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ ...F_BODY, fontSize: 14, lineHeight: 1.7, margin: '0 0 6px' }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const isExternal = /^https?:\/\//.test(href) && !href.includes('phillipscorp.com')
      return (
        <a
          href={href}
          {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
          style={{ color: '#F9423A', textDecoration: 'underline' }}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => (
      <SanityImage
        image={value}
        alt={value?.alt ?? ''}
        width={800}
        height={600}
        style={{ margin: '16px 0', maxWidth: '100%', height: 'auto' }}
      />
    ),
  },
}

function mergeComponents(
  override?: PortableTextComponents,
): Partial<PortableTextReactComponents> {
  if (!override) return defaultComponents
  return {
    ...defaultComponents,
    ...override,
    block: { ...defaultComponents.block, ...override.block },
    list: { ...defaultComponents.list, ...override.list },
    listItem: { ...defaultComponents.listItem, ...override.listItem },
    marks: { ...defaultComponents.marks, ...override.marks },
    types: { ...defaultComponents.types, ...override.types },
  } as Partial<PortableTextReactComponents>
}

type PortableTextProps = {
  value: PortableTextBlock[] | PortableTextBlock | undefined | null
  components?: PortableTextComponents
}

export default function PortableText({ value, components }: PortableTextProps) {
  if (!value) return null
  const merged = mergeComponents(components)
  return <PT value={value} components={merged} />
}
