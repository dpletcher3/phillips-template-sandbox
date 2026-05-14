import { PHILLIPS_COLORS, F_DISPLAY } from '@/lib/constants'
import { IndiaH2 } from '@/components/india'

export type FAQItem = { question: string; answer: string }

type Props = {
  items?: FAQItem[]
}

/**
 * FAQ accordion per §7's re-skin note. White surface, 1px india-light
 * separators, plus-sign affordance, italic uppercase question, sentence-
 * case body. Uses <details>/<summary> for no-JS interactivity.
 *
 * If `items` is empty or undefined, renders a placeholder set so the
 * section visually balances the page. The Sanity schemas (brand, solution,
 * personaPage) do not yet have an `faq` field — TBD-verify to add one in
 * a follow-up schema session. Until then, Clients pass placeholder data
 * or nothing, and consumers see the styling only.
 */
export default function IndiaFAQ({ items }: Props) {
  // TBD-verify: replace placeholder list once an `faq` field is added
  // to the relevant Sanity schemas. See NOTES.md in repo root for the
  // similar pattern used to flag the Guide callouts client adaptation.
  const list: FAQItem[] = items?.length
    ? items
    : [
        { question: 'What are the lead times on a typical 5-axis machine order?', answer: 'Lead times vary by configuration but range from 8 to 20 weeks. Stock builds ship in under 4 weeks.' },
        { question: 'Do you provide installation and training?', answer: 'Yes — Phillips field service handles installation, run-off, and operator training as part of every machine purchase.' },
        { question: 'What support is available after the sale?', answer: 'Phone support 24/7; on-site service available within 48 hours in most US regions.' },
        { question: 'Can I get a custom configuration?', answer: 'Most platforms support custom fixturing, tooling packages, and automation tie-ins. Talk to a specialist about your specific application.' },
      ]
  return (
    <section style={{ background: '#fff', padding: '80px 48px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <IndiaH2>Frequently Asked Questions</IndiaH2>
        <div style={{ marginTop: 32 }}>
          {list.map((item, i) => (
            <details
              key={i}
              style={{
                borderBottom: `1px solid ${PHILLIPS_COLORS.light}`,
                padding: '16px 0',
              }}
            >
              <summary
                style={{
                  listStyle: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  ...F_DISPLAY,
                  fontSize: 16,
                  letterSpacing: 1,
                  color: PHILLIPS_COLORS.black,
                }}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  style={{
                    color: PHILLIPS_COLORS.red,
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 24,
                    fontWeight: 300,
                    fontStyle: 'normal',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  marginTop: 12,
                  marginBottom: 0,
                  paddingLeft: 0,
                  fontFamily: 'var(--font-barlow-condensed), sans-serif',
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: PHILLIPS_COLORS.grey,
                }}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
