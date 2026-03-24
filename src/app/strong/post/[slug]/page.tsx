'use client'

import Image from 'next/image'
import StrongNav from '@/components/strong/StrongNav'
import LightSection from '@/components/strong/LightSection'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ── */
const RED = '#F9423A'
const CYAN = '#00D4FF'
const GOLD = '#F68B33'

const Z_BG = '#09090B'
const Z_CARD = '#18181B'
const Z_DIM = 'rgba(255,255,255,0.45)'
const Z_MID = 'rgba(255,255,255,0.70)'
const Z_BRIGHT = 'rgba(255,255,255,0.95)'

const L_BG = '#ffffff'
const L_ALT = '#F4F5F7'
const L_BORDER = '#E2E4E8'
const L_INK = '#0D0D0E'
const L_MID = '#3C3F45'
const L_DIM = '#72777F'

const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── TOC Items ── */
const tocItems = [
  'The Readiness Crisis',
  "What's Driving Adoption",
  'The Cost Equation',
  'Looking Ahead',
]

/* ── Flip Card Data ── */
const flipCards = [
  { code: 'ART.01', title: 'The 5-Axis Mandate', desc: 'Why 5-axis is becoming the minimum standard for precision aerospace machining.' },
  { code: 'ART.02', title: 'Federal AM Certification', desc: 'How federal programs are creating certification pathways for additive parts.' },
  { code: 'ART.03', title: 'Shipyard Modernization', desc: 'Inside the $21B plan to modernize America\'s four public naval shipyards.' },
]

export default function PostPage() {
  return (
    <div style={{ background: Z_BG, minHeight: '100vh' }}>
      {/* Scoped CSS for flip cards and drop cap */}
      <style>{`
        .flip-card {
          perspective: 1000px;
          height: 160px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(.4,0,.2,1);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* ═══ 1. NAV ═══ */}
      <StrongNav />

      {/* ═══ 2. DARK HERO ═══ */}
      <section style={{
        position: 'relative',
        minHeight: '50vh',
        background: Z_BG,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* BG Image */}
        <Image
          src={STRONG_IMAGES.metalAM}
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.18 }}
          priority
        />
        {/* Gradient Overlay — bottom-heavy */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, #09090B 0%, rgba(9,9,11,.55) 50%, rgba(9,9,11,.2) 100%)',
          zIndex: 1,
        }} />

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 800,
          width: '100%',
          padding: '0 48px 48px',
          margin: '0 auto',
        }}>
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <span style={{
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: GOLD,
              background: 'rgba(246,139,51,.15)',
              padding: '5px 12px',
              borderRadius: 2,
            }}>
              Metal AM
            </span>
            <span style={{
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: Z_MID,
              background: Z_CARD,
              padding: '5px 12px',
              borderRadius: 2,
            }}>
              Federal Programs
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: INTER,
            fontWeight: 900,
            fontSize: 'clamp(26px, 4vw, 50px)',
            lineHeight: 1.08,
            letterSpacing: '-1.5px',
            color: Z_BRIGHT,
            margin: '0 0 24px',
          }}>
            Why Naval Shipyards Are Betting on Metal AM for Maintenance Parts
          </h1>

          {/* Author Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Avatar */}
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: RED,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1,
              }}>
                DG
              </span>
            </div>
            <div>
              <div style={{
                fontFamily: MONO,
                fontSize: 11,
                color: Z_MID,
                letterSpacing: 0.5,
              }}>
                Dan Grant {'// '}Phillips Federal Programs
              </div>
              <div style={{
                fontFamily: MONO,
                fontSize: 10,
                color: Z_DIM,
                letterSpacing: 0.5,
                marginTop: 2,
              }}>
                Mar 18, 2026 &middot; 6 min read
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. LIGHT BODY ═══ */}
      <LightSection>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 210px',
          gap: 56,
        }}>
          {/* Left — Article Body */}
          <article>
            {/* Opening paragraph with drop cap */}
            <p style={{
              fontFamily: INTER,
              fontSize: 16,
              color: L_INK,
              lineHeight: 1.8,
              margin: '0 0 24px',
            }}>
              <span style={{
                fontFamily: MONO,
                fontSize: 60,
                fontWeight: 700,
                color: RED,
                float: 'left',
                lineHeight: 0.8,
                marginRight: 10,
                marginTop: 6,
              }}>
                A
              </span>
              cross America&apos;s four public naval shipyards, a quiet revolution is underway. Maintenance backlogs that once stretched years are being attacked with a technology most people associate with prototyping: metal additive manufacturing. The shift isn&apos;t theoretical. It&apos;s happening now, and it&apos;s rewriting the playbook for how the Navy sustains its fleet.
            </p>

            <p style={{
              fontFamily: INTER,
              fontSize: 16,
              color: L_INK,
              lineHeight: 1.8,
              margin: '0 0 24px',
            }}>
              The challenge is well-documented. Aging vessels need parts that were designed decades ago, often by manufacturers who no longer exist. Traditional casting and forging routes can take 12 to 18 months. Metal AM compresses that timeline to weeks, sometimes days, while meeting the same material specifications.
            </p>

            {/* h2 with // prefix */}
            <h2 style={{
              fontFamily: INTER,
              fontSize: 22,
              fontWeight: 800,
              color: L_INK,
              margin: '48px 0 16px',
              letterSpacing: '-0.5px',
            }}>
              <span style={{ color: CYAN }}>{'// '}</span>What&apos;s Driving Adoption
            </h2>

            <p style={{
              fontFamily: INTER,
              fontSize: 16,
              color: L_INK,
              lineHeight: 1.8,
              margin: '0 0 24px',
            }}>
              Three forces are converging. First, the maintenance backlog at public shipyards has grown to over 1,700 ship-days&mdash;the equivalent of nearly five years of lost operational availability. Second, the supply chain for legacy parts is increasingly fragile, with sole-source vendors retiring and tooling being scrapped. Third, metal AM technology has matured to the point where directed energy deposition and laser powder bed fusion can produce parts that meet MIL-SPEC requirements.
            </p>

            {/* Quote */}
            <blockquote style={{
              borderLeft: `3px solid ${RED}`,
              paddingLeft: 24,
              margin: '32px 0',
            }}>
              <p style={{
                fontFamily: INTER,
                fontSize: 18,
                fontStyle: 'italic',
                color: L_INK,
                lineHeight: 1.7,
                margin: 0,
              }}>
                &ldquo;We&apos;re not replacing traditional manufacturing. We&apos;re filling gaps that traditional manufacturing can no longer reach.&rdquo;
              </p>
            </blockquote>

            <p style={{
              fontFamily: INTER,
              fontSize: 16,
              color: L_INK,
              lineHeight: 1.8,
              margin: '0 0 24px',
            }}>
              NAVSEA has established dedicated AM cells at each of the four public yards: Norfolk Naval Shipyard, Portsmouth Naval Shipyard, Puget Sound Naval Shipyard, and Pearl Harbor Naval Shipyard. Each cell is equipped with both powder bed and directed energy deposition systems, allowing engineers to select the right process for each application.
            </p>

            {/* h2 */}
            <h2 style={{
              fontFamily: INTER,
              fontSize: 22,
              fontWeight: 800,
              color: L_INK,
              margin: '48px 0 16px',
              letterSpacing: '-0.5px',
            }}>
              <span style={{ color: CYAN }}>{'// '}</span>The Cost Equation
            </h2>

            <p style={{
              fontFamily: INTER,
              fontSize: 16,
              color: L_INK,
              lineHeight: 1.8,
              margin: '0 0 24px',
            }}>
              The economics are compelling but nuanced. Per-part costs for AM are often higher than traditional methods at scale. But when you factor in tooling elimination, lead time reduction, and the cost of vessel downtime&mdash;roughly $400,000 per day for a nuclear submarine&mdash;the calculus shifts dramatically. A single valve body that takes 14 months through traditional casting can be printed, machined, and qualified in under three weeks.
            </p>

            {/* Callout */}
            <div style={{
              borderLeft: `3px solid ${CYAN}`,
              background: L_ALT,
              padding: 16,
              margin: '32px 0',
            }}>
              <div style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: CYAN,
                marginBottom: 8,
              }}>
                Key Takeaway
              </div>
              <p style={{
                fontFamily: INTER,
                fontSize: 14,
                color: L_INK,
                lineHeight: 1.7,
                margin: 0,
              }}>
                When vessel downtime costs $400K/day, the ROI on metal AM isn&apos;t about per-part cost&mdash;it&apos;s about operational availability. A 14-month lead time compressed to 3 weeks can save millions in avoided downtime.
              </p>
            </div>

            {/* h2 */}
            <h2 style={{
              fontFamily: INTER,
              fontSize: 22,
              fontWeight: 800,
              color: L_INK,
              margin: '48px 0 16px',
              letterSpacing: '-0.5px',
            }}>
              <span style={{ color: CYAN }}>{'// '}</span>Looking Ahead
            </h2>

            <p style={{
              fontFamily: INTER,
              fontSize: 16,
              color: L_INK,
              lineHeight: 1.8,
              margin: '0 0 24px',
            }}>
              The Navy&apos;s investment in metal AM is accelerating. The FY2026 budget includes $180M for advanced manufacturing infrastructure across the shipyard system. Phillips is supporting this transformation with turnkey AM cells that include machines, materials qualification, training, and ongoing technical support. The goal isn&apos;t to print everything&mdash;it&apos;s to print the right things at the right time.
            </p>

            <p style={{
              fontFamily: INTER,
              fontSize: 16,
              color: L_INK,
              lineHeight: 1.8,
              margin: '0 0 24px',
            }}>
              For program managers and depot leaders, the question is no longer whether to adopt metal AM. It&apos;s how fast they can scale it. The shipyards that move first will set the standard for the rest of the fleet.
            </p>
          </article>

          {/* Right — Sticky TOC */}
          <aside style={{
            position: 'sticky',
            top: 80,
            alignSelf: 'start',
          }}>
            <div style={{
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: L_DIM,
              marginBottom: 16,
            }}>
              {'// In This Article'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {tocItems.map((item, i) => (
                <div
                  key={item}
                  style={{
                    fontFamily: INTER,
                    fontSize: 13,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? RED : L_MID,
                    padding: '8px 0 8px 12px',
                    borderLeft: i === 0 ? `2px solid ${RED}` : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'color .2s, border-color .2s',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </LightSection>

      {/* ═══ 4. FLIP CARDS ═══ */}
      <LightSection alt>
        <div style={{
          fontFamily: MONO,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: L_DIM,
          marginBottom: 24,
        }}>
          {'// Hover to Preview Related Articles'}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {flipCards.map((card) => (
            <div key={card.code} className="flip-card">
              <div className="flip-card-inner">
                {/* Front */}
                <div
                  className="flip-card-front"
                  style={{
                    background: L_BG,
                    border: `1px solid ${L_BORDER}`,
                  }}
                >
                  <div style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: CYAN,
                    marginBottom: 12,
                  }}>
                    {card.code}
                  </div>
                  <div style={{
                    fontFamily: INTER,
                    fontSize: 16,
                    fontWeight: 700,
                    color: L_INK,
                    lineHeight: 1.4,
                  }}>
                    {card.title}
                  </div>
                </div>

                {/* Back */}
                <div
                  className="flip-card-back"
                  style={{
                    background: RED,
                  }}
                >
                  <p style={{
                    fontFamily: INTER,
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#ffffff',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LightSection>
    </div>
  )
}
