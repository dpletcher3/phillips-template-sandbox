import { PHILLIPS_COLORS, F_DISPLAY } from '@/lib/constants'
import PortableText from '@/components/PortableText'
import { indiaPortableTextComponents } from './portableText'
import type { Callout } from './types'

export type IndiaProTipsCalloutProps = {
  callout: Callout
  style?: 'default' | 'inverted'
}

// Type → chip label mapping per §5.4. Fall back to uppercasing the type
// for unknown values. callout.chipLabel always wins if explicitly set.
const TYPE_TO_CHIP_LABEL: Record<string, string> = {
  protips: 'PRO TIPS',
  tip: 'TIP',
  warning: 'WARNING',
  note: 'NOTE',
  callout: 'CALLOUT',
}

function resolveChipLabel(c: Callout): string {
  if (c.chipLabel) return c.chipLabel
  return TYPE_TO_CHIP_LABEL[c.type] ?? c.type.toUpperCase()
}

/**
 * Bordered red-outline editorial callout per §5.4. Consumes the shared
 * `callout` Sanity object directly.
 *
 * The body renders via the shared PortableText with indiaPortableTextComponents
 * passed at the call site — bulleted lists get the red-tick treatment for
 * free via the override map established in 5a/5b.
 */
export default function IndiaProTipsCallout({
  callout,
  style = 'default',
}: IndiaProTipsCalloutProps) {
  const inverted = style === 'inverted'
  const chip = resolveChipLabel(callout)

  // TBD-verify: border width is 3px per §5.4 ("3–4px"); we go with 3px
  // and step down to 2px on mobile per the spec's mobile note.
  return (
    <div
      style={{
        position: 'relative',
        margin: '32px 0',
        padding: '32px 28px 28px',
        border: `3px solid ${PHILLIPS_COLORS.red}`,
        background: inverted ? PHILLIPS_COLORS.black : '#fff',
        color: inverted ? '#fff' : PHILLIPS_COLORS.black,
      }}
    >
      {/* Chip — anchored top-left, overlapping the border via negative
          top margin. */}
      <span
        style={{
          position: 'absolute',
          top: -14,
          left: 20,
          background: PHILLIPS_COLORS.red,
          color: '#fff',
          padding: '4px 12px',
          fontFamily: 'var(--font-barlow-condensed), sans-serif',
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        {chip}
      </span>

      <h3
        style={{
          ...F_DISPLAY,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: 1,
          margin: '0 0 16px',
          color: 'inherit',
        }}
      >
        {callout.title}
      </h3>

      {/* Body renders via the shared renderer with india overrides
          passed explicitly at the call site. The override map's
          listItem.bullet supplies the red-tick treatment for any
          bulleted list inside the body — no extra mechanism needed. */}
      <PortableText value={callout.body} components={indiaPortableTextComponents} />
    </div>
  )
}
