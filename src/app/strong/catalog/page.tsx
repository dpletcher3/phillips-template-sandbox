'use client'

import { useState } from 'react'
import Image from 'next/image'
import StrongNav from '@/components/strong/StrongNav'
import PulseRing from '@/components/strong/PulseRing'
import FinalCTA from '@/components/strong/FinalCTA'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ──────────────────────────────────── */
const RED   = '#F9423A'
const CYAN  = '#00D4FF'
const GOLD  = '#F68B33'

const Z_BG       = '#09090B'
const Z_CARD      = '#18181B'
const Z_BORDER    = 'rgba(255,255,255,0.07)'
const Z_DIM       = 'rgba(255,255,255,0.45)'
const Z_MID       = 'rgba(255,255,255,0.70)'
const Z_BRIGHT    = 'rgba(255,255,255,0.95)'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── Filter Types ────────────────────────────────────── */
type FilterKey = 'all' | 'service' | 'operator' | 'programming' | 'certification' | 'popular'

/* ── Course Data ─────────────────────────────────────── */
interface Course {
  title: string
  category: 'Service' | 'Operator' | 'Programming' | 'Certification'
  level: string
  duration: string
  description: string
  isMostPopular?: boolean
}

const COURSES: Course[] = [
  {
    title: 'Haas Maintenance & Repair Training',
    category: 'Service',
    level: 'Foundation',
    duration: '4 Days',
    description: 'Comprehensive hands-on training covering preventative maintenance, troubleshooting, and common repair procedures for Haas CNC machines.',
    isMostPopular: true,
  },
  {
    title: 'Advanced Lathe Service Training',
    category: 'Service',
    level: 'Advanced',
    duration: '3 Days',
    description: 'Deep-dive into lathe-specific service procedures including spindle rebuilds, turret alignment, and tailstock calibration.',
  },
  {
    title: 'Advanced Mill Service Training',
    category: 'Service',
    level: 'Advanced',
    duration: '3 Days',
    description: 'Advanced mill service covering spindle bearing replacement, ballscrew compensation, and geometric accuracy restoration.',
  },
  {
    title: 'HFO Field Service Engineer Cert',
    category: 'Service',
    level: 'Expert',
    duration: '5 Days',
    description: 'Certification program for HFO field service engineers. Covers full diagnostic workflows, warranty procedures, and escalation protocols.',
  },
  {
    title: 'Basic Mill Operator Training',
    category: 'Operator',
    level: 'Beginner',
    duration: '2 Days',
    description: 'Introduction to Haas mill operation: machine startup, tool loading, work offsets, program execution, and safe operating procedures.',
    isMostPopular: true,
  },
  {
    title: 'Basic Lathe Operator Training',
    category: 'Operator',
    level: 'Beginner',
    duration: '2 Days',
    description: 'Hands-on lathe fundamentals covering chuck operation, tool touch-off, coordinate systems, and basic turning cycles.',
  },
  {
    title: 'Advanced Lathe Programming',
    category: 'Programming',
    level: 'Intermediate',
    duration: '3 Days',
    description: 'Advanced G-code programming for turning operations including canned cycles, sub-programs, thread cutting, and live tooling.',
    isMostPopular: true,
  },
  {
    title: 'Macros & Probing',
    category: 'Programming',
    level: 'Advanced',
    duration: '2 Days',
    description: 'Master Haas macro programming and probing routines for automated setup, in-process gauging, and adaptive machining.',
  },
  {
    title: '5-Axis & 4th-Axis Training',
    category: 'Programming',
    level: 'Advanced',
    duration: '2 Days',
    description: 'Multi-axis programming fundamentals including work coordinate rotation, TCPC, and fixture offset strategies for 4th and 5th axis.',
  },
  {
    title: 'Haas Controller Training',
    category: 'Programming',
    level: 'Foundation',
    duration: '1 Day',
    description: 'Complete overview of the Haas NGC control: navigation, settings, parameters, diagnostics, and networking.',
  },
  {
    title: 'VPS/IPS Template Programming',
    category: 'Programming',
    level: 'Intermediate',
    duration: '2 Days',
    description: 'Learn to build and customize Visual Programming System and Intuitive Programming System templates for faster shop-floor programming.',
  },
  {
    title: 'Preventative Maintenance',
    category: 'Certification',
    level: 'Foundation',
    duration: '1 Day',
    description: 'Certification course on scheduled maintenance procedures, fluid management, filter replacement, and machine longevity best practices.',
  },
]

const BADGE_COLORS: Record<Course['category'], string> = {
  Service: RED,
  Operator: CYAN,
  Programming: GOLD,
  Certification: Z_DIM,
}

const FILTER_TABS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Courses' },
  { key: 'service', label: 'Service' },
  { key: 'operator', label: 'Operator' },
  { key: 'programming', label: 'Programming' },
  { key: 'certification', label: 'Certification' },
  { key: 'popular', label: 'Most Popular' },
]

/* ── Page ───────────────────────────────────────────── */
export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredCourses = COURSES.filter((course) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'popular') return course.isMostPopular
    return course.category.toLowerCase() === activeFilter
  })

  return (
    <div style={{ background: Z_BG, color: Z_BRIGHT, minHeight: '100vh' }}>

      {/* ── 1. NAV ──────────────────────────────────── */}
      <StrongNav />

      {/* ── 2. DARK HERO ────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: Z_BG,
      }}>
        {/* BG image */}
        <Image
          src={STRONG_IMAGES.trainingRoom}
          alt="Haas Training Room"
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.12 }}
        />
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${Z_BG} 0%, transparent 40%, transparent 70%, ${Z_BG} 100%)`,
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, ${Z_BG} 0%, transparent 60%)`,
          zIndex: 1,
        }} />

        {/* Content grid */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          padding: '80px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* LEFT */}
          <div>
            {/* Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <PulseRing size={8} />
              <span style={{
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: GOLD,
              }}>
                Haas Training &middot; Real Machines.
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              color: Z_BRIGHT,
              margin: '0 0 20px',
            }}>
              Haas Training.<br />
              Real Machines.<br />
              <span style={{ color: RED }}>Real Results.</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: INTER,
              fontSize: '15px',
              fontWeight: 600,
              color: Z_MID,
              lineHeight: 1.6,
              margin: '0 0 28px',
            }}>
              Service &middot; Operator &middot; Programming &middot; Certification
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: RED,
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
                Browse Courses
              </button>
              <button style={{
                background: 'transparent',
                color: Z_BRIGHT,
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '14px 32px',
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
                Contact Training
              </button>
            </div>
          </div>

          {/* RIGHT — Stat callouts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { value: '52', unit: 'Weeks', label: 'Training Available' },
              { value: '12', unit: 'Classes', label: 'Available' },
              { value: '4', unit: 'Categories', label: '' },
            ].map((stat) => (
              <div key={stat.value}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                  <span style={{
                    fontFamily: MONO,
                    fontSize: '40px',
                    fontWeight: 700,
                    color: Z_BRIGHT,
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontFamily: MONO,
                    fontSize: '13px',
                    fontWeight: 700,
                    color: Z_BRIGHT,
                    lineHeight: 1,
                  }}>
                    /{stat.unit}
                  </span>
                </div>
                <span style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase' as const,
                  color: Z_DIM,
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FILTER TABS ──────────────────────────── */}
      <div style={{
        position: 'sticky',
        top: 58,
        zIndex: 50,
        background: Z_BG,
        borderBottom: `1px solid ${Z_BORDER}`,
        padding: '0 48px',
        display: 'flex',
        gap: '0',
      }}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeFilter === tab.key ? `2px solid ${RED}` : '2px solid transparent',
              color: activeFilter === tab.key ? RED : Z_MID,
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              padding: '14px 20px',
              cursor: 'pointer',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 4. COURSE CARD GRID ─────────────────────── */}
      <section style={{
        padding: '32px 48px',
        background: Z_BG,
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          {filteredCourses.map((course) => (
            <div
              key={course.title}
              style={{
                background: Z_CARD,
                border: `1px solid ${course.isMostPopular ? RED : Z_BORDER}`,
                borderTop: course.isMostPopular ? `2px solid ${RED}` : `1px solid ${course.isMostPopular ? RED : Z_BORDER}`,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* Category badge */}
              <div>
                <span style={{
                  display: 'inline-block',
                  fontFamily: MONO,
                  fontSize: '8px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase' as const,
                  color: '#fff',
                  background: BADGE_COLORS[course.category],
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}>
                  {course.category}
                </span>
              </div>

              {/* Level */}
              <span style={{
                fontFamily: MONO,
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                color: Z_DIM,
              }}>
                {course.level}
              </span>

              {/* Title */}
              <h3 style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: '14px',
                color: Z_BRIGHT,
                margin: 0,
                lineHeight: 1.35,
              }}>
                {course.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: INTER,
                fontSize: '12px',
                color: Z_DIM,
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
              }}>
                {course.description}
              </p>

              {/* Duration + CTA */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '6px',
                paddingTop: '10px',
                borderTop: `1px solid ${Z_BORDER}`,
              }}>
                <span style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  fontWeight: 600,
                  color: Z_MID,
                  letterSpacing: '1px',
                }}>
                  {course.duration}
                </span>
                <button style={{
                  background: 'transparent',
                  border: `1px solid ${Z_BORDER}`,
                  color: Z_BRIGHT,
                  fontFamily: MONO,
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase' as const,
                  padding: '6px 14px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                }}>
                  Register &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. TESTIMONIAL STRIP ────────────────────── */}
      <section style={{
        background: Z_CARD,
        borderTop: `1px solid ${Z_BORDER}`,
        padding: '40px 48px',
        textAlign: 'center' as const,
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{
            fontFamily: INTER,
            fontSize: '16px',
            fontStyle: 'italic',
            color: Z_BRIGHT,
            lineHeight: 1.7,
            margin: '0 0 16px',
          }}>
            <span style={{ color: GOLD }}>{'// '}</span>
            &ldquo;The hands-on approach at Phillips made all the difference. Our techs came back confident.&rdquo;
          </p>
          <span style={{
            fontFamily: MONO,
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            color: Z_DIM,
          }}>
            &mdash; Mike Torres, Shop Manager, Aerospace Dynamics
          </span>
        </div>
      </section>

      {/* ── 6. FINAL CTA ────────────────────────────── */}
      <FinalCTA
        tag="// Start Training"
        headline="Invest in your team. See real results."
        accentWord="See real results."
        description="Browse our full course catalog or contact our training coordinators to build a custom program for your shop."
      />
    </div>
  )
}
