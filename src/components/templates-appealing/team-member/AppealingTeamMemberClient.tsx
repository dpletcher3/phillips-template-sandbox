'use client'

import Image from 'next/image'
import { IMAGES } from '@/lib/appealing-images'
import { TeamMemberData } from '@/components/templates/team-member/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'

interface Props {
  data: TeamMemberData
}

export default function AppealingTeamMemberClient({ data }: Props) {
  const firstName = data.name.split(' ')[0]

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* ── Hero ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
      }}>
        {/* Left — dark gradient panel */}
        <div style={{
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
          padding: '48px 36px',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,.4)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '12px',
            display: 'block',
          }}>
            {data.issueLabel}
          </span>

          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 3.5vw, 48px)',
            color: '#fff',
            lineHeight: 1.05,
            margin: '0 0 8px 0',
          }}>
            {data.name}
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,.5)',
            margin: '8px 0 20px',
          }}>
            {data.title}
          </p>

          {data.isLeadership && (
            <span style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              background: '#F9423A',
              color: '#fff',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              animation: 'pulse 2.5s infinite',
            }}>
              LEADERSHIP
            </span>
          )}
        </div>

        {/* Right — portrait photo */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '360px', background: '#F2F4F6' }}>
          <Image src={IMAGES.engineer} alt={data.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 60vw" />
        </div>
      </section>

      {/* ── Body ── */}
      <section style={{
        padding: '48px',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '48px',
      }}>
        {/* Left — bio */}
        <div>
          <h2 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: '24px',
            margin: '0 0 20px 0',
            color: '#000',
          }}>
            About {firstName}
          </h2>

          {data.bio.map((paragraph, i) => (
            <p key={i} style={{
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#444',
              marginBottom: '16px',
            }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right — facts */}
        <div style={{ borderLeft: '3px solid #F9423A', paddingLeft: '20px' }}>
          {data.facts.map((fact, i) => (
            <div key={i} style={{
              padding: '14px 0',
              borderBottom: '1px solid #D7DFE3',
            }}>
              <div style={{
                fontSize: '10px',
                color: '#647883',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '4px',
              }}>
                {fact.label}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#000',
                fontWeight: 600,
              }}>
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
