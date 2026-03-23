'use client'

import { useState } from 'react'
import { WebinarData } from '@/components/templates/webinar/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'

export default function AppealingWebinarClient({ data }: { data: WebinarData }) {
  const [selectedSpeakers, setSelectedSpeakers] = useState<Set<number>>(new Set())

  const toggleSpeaker = (index: number) => {
    setSelectedSpeakers(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const splitTitle = (title: string) => {
    const words = title.split(' ')
    if (words.length <= 2) return { main: '', highlight: title }
    const highlight = words.slice(-2).join(' ')
    const main = words.slice(0, -2).join(' ')
    return { main, highlight }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  }

  // Extract day number and month from date string
  const extractDateParts = (dateStr: string) => {
    const parsed = new Date(dateStr)
    if (isNaN(parsed.getTime())) {
      // Fallback: try to parse manually
      const match = dateStr.match(/(\w+)\s+(\d+)/)
      return { day: match?.[2] ?? '', month: match?.[1] ?? '' }
    }
    return {
      day: String(parsed.getDate()),
      month: parsed.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    }
  }

  const { main: titleMain, highlight: titleHighlight } = splitTitle(data.title)
  const dateParts = extractDateParts(data.date)

  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,66,58,.4); }
          50% { box-shadow: 0 0 0 12px rgba(249,66,58,0); }
        }
        @keyframes breathe {
          0%, 100% { opacity: .3; }
          50% { opacity: 1; }
        }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* Dark gradient hero */}
      <div style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 50%, #3F0017 100%)',
        padding: '60px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '48px',
        alignItems: 'start',
      }}>
        {/* Left column */}
        <div>
          {/* Status badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22C55E',
              display: 'inline-block',
              animation: 'breathe 2s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#fff',
            }}>
              {data.status === 'on-demand' ? 'Available On-Demand' : 'Registration Open'}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 4vw, 52px)',
            color: '#fff',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
          }}>
            {titleMain}{' '}
            <em style={{ color: '#F9423A', fontStyle: 'normal' }}>{titleHighlight}</em>
          </h1>

          {/* Date row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px',
            marginBottom: '20px',
          }}>
            <span style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 900,
              fontSize: '48px',
              color: '#fff',
              lineHeight: 1,
            }}>
              {dateParts.day}
            </span>
            <span style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              color: '#F9423A',
              fontWeight: 600,
              letterSpacing: '1px',
            }}>
              {dateParts.month}
            </span>
            <span style={{
              fontSize: '13px',
              color: '#647883',
            }}>
              {data.time}
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,.5)',
            lineHeight: 1.7,
            margin: 0,
            maxWidth: '520px',
          }}>
            {data.description}
          </p>
        </div>

        {/* Right column: Registration card */}
        <div style={{
          background: '#fff',
          padding: '28px',
          borderTop: '4px solid #F9423A',
        }}>
          {/* Date chip */}
          <div style={{
            display: 'inline-block',
            background: '#F2F4F6',
            borderLeft: '3px solid #F9423A',
            padding: '6px 12px',
            fontSize: '11px',
            color: '#333',
            marginBottom: '16px',
          }}>
            {data.date} &middot; {data.time}
          </div>

          {/* Form title */}
          <div style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 700,
            fontSize: '18px',
            color: '#111',
            margin: '0 0 16px 0',
          }}>
            {data.formTitle}
          </div>

          {/* Input fields */}
          <input
            type="text"
            placeholder="Full Name"
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              border: '1px solid #D7DFE3',
              marginBottom: '12px',
              fontSize: '13px',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <input
            type="email"
            placeholder="Work Email"
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              border: '1px solid #D7DFE3',
              marginBottom: '12px',
              fontSize: '13px',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />

          {/* Submit button */}
          <button style={{
            width: '100%',
            padding: '14px',
            background: '#F9423A',
            color: '#fff',
            border: 'none',
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            cursor: 'pointer',
            animation: 'pulse 2.5s infinite',
          }}>
            Register Now
          </button>
        </div>
      </div>

      {/* Featured Speakers section */}
      <div style={{ padding: '64px 48px', background: '#fff' }}>
        <h2 style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 800,
          fontSize: '22px',
          color: '#111',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          margin: '0 0 32px 0',
        }}>
          Featured Speakers
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {data.speakers.map((speaker, i) => {
            const isSelected = selectedSpeakers.has(i)
            return (
              <div
                key={i}
                onClick={() => toggleSpeaker(i)}
                style={{
                  background: '#fff',
                  border: isSelected ? '2px solid #F9423A' : '1px solid #D7DFE3',
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'border 0.2s',
                }}
              >
                {/* Red checkmark for selected */}
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#F9423A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}>
                    &#10003;
                  </div>
                )}

                {/* Avatar circle */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#3F0017',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}>
                  <span style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#fff',
                  }}>
                    {getInitials(speaker.name)}
                  </span>
                </div>

                {/* Name */}
                <div style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#111',
                  marginTop: '12px',
                }}>
                  {speaker.name}
                </div>

                {/* Role/title */}
                <div style={{
                  fontSize: '13px',
                  color: '#647883',
                  marginTop: '4px',
                }}>
                  {speaker.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Agenda section */}
      <div style={{ padding: '48px', background: '#fff' }}>
        <h2 style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 800,
          fontSize: '22px',
          color: '#111',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          margin: '0 0 32px 0',
        }}>
          Agenda
        </h2>

        {data.agenda.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              padding: '16px 0',
              borderBottom: i < data.agenda.length - 1 ? '1px solid #D7DFE3' : 'none',
            }}
          >
            <span style={{
              color: '#F9423A',
              fontSize: '13px',
              fontWeight: 700,
              minWidth: '100px',
              flexShrink: 0,
            }}>
              {item.time}
            </span>
            <span style={{
              fontSize: '14px',
              color: '#333',
            }}>
              {item.item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
