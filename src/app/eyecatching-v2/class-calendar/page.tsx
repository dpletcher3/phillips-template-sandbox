'use client';

import { useState } from 'react';

const schedule = [
  { date: 'APR 07', month: 'April', course: 'Haas Maintenance & Repair', location: 'Charlotte, NC', seats: 12, type: 'service', federal: false },
  { date: 'APR 07', month: 'April', course: 'Haas Maintenance & Repair', location: 'Knoxville, TN', seats: 8, type: 'service', federal: false },
  { date: 'APR 14', month: 'April', course: 'Advanced Lathe Service', location: 'Charlotte, NC', seats: 8, type: 'service', federal: false },
  { date: 'APR 14', month: 'April', course: 'Advanced Mill Service', location: 'Knoxville, TN', seats: 6, type: 'service', federal: false },
  { date: 'APR 21', month: 'April', course: 'Basic Mill Operator', location: 'Charlotte, NC', seats: 20, type: 'operator', federal: false },
  { date: 'MAY 05', month: 'May', course: 'Haas Maintenance & Repair', location: 'Charlotte, NC', seats: 12, type: 'service', federal: true },
  { date: 'MAY 05', month: 'May', course: '5-Axis & 4th-Axis', location: 'Knoxville, TN', seats: 8, type: 'cnc', federal: false },
  { date: 'MAY 12', month: 'May', course: 'Advanced Lathe Programming', location: 'Virtual / Zoom', seats: 16, type: 'cnc', federal: false },
];

const filters: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'cnc', label: 'CNC' },
  { key: 'service', label: 'Service' },
  { key: 'operator', label: 'Operator' },
  { key: 'federal', label: 'Federal' },
];

const columnHeaders = ['Date', 'Course', 'Location', 'Seats', 'Register'];

const gridColumns = '76px 1fr 160px 80px 110px';

export default function ClassCalendarPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = schedule.filter((row) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'federal') return row.federal === true;
    return row.type === activeFilter;
  });

  return (
    <div
      style={{
        background: '#060606',
        color: '#fff',
        minHeight: '100vh',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* SECTION 1 — Header */}
      <div style={{ padding: '32px 44px 20px' }}>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(36px,5vw,56px)',
            textTransform: 'uppercase',
            lineHeight: 0.95,
            color: '#fff',
            margin: '0 0 12px',
          }}
        >
          CLASS <span style={{ color: '#F9423A' }}>CALENDAR</span>
        </h1>

        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255,255,255,.3)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Spring 2026
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {filters.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  background: isActive ? '#F9423A' : 'rgba(255,255,255,.05)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,.4)',
                  border: isActive ? 'none' : '1px solid rgba(255,255,255,.08)',
                  padding: '6px 16px',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: 2,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2 — Column Headers */}
      <div
        style={{
          padding: '0 44px',
          display: 'grid',
          gridTemplateColumns: gridColumns,
          gap: 0,
          borderBottom: '1px solid rgba(255,255,255,.08)',
          paddingBottom: 10,
        }}
      >
        {columnHeaders.map((h) => (
          <div
            key={h}
            style={{
              fontSize: 8,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'rgba(255,255,255,.25)',
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {/* SECTION 3 — Schedule Rows */}
      <div style={{ padding: '0 44px' }}>
        {filtered.map((row, i) => {
          const isFederal = row.federal;
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: gridColumns,
                gap: 0,
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,.04)',
                alignItems: 'center',
                ...(isFederal
                  ? { borderLeft: '3px solid #00AEEF', paddingLeft: 8 }
                  : {}),
              }}
            >
              {/* Date */}
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 14,
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                {row.date}
              </div>

              {/* Course */}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {row.course}
                {isFederal && (
                  <span
                    style={{
                      background: '#00AEEF',
                      color: '#fff',
                      fontSize: 7,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 2,
                      marginLeft: 8,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    FEDERAL
                  </span>
                )}
              </div>

              {/* Location */}
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,.4)',
                }}
              >
                {row.location}
              </div>

              {/* Seats */}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: row.seats <= 8 ? '#F68B33' : 'rgba(255,255,255,.5)',
                }}
              >
                {row.seats}
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,.25)',
                    marginLeft: 3,
                  }}
                >
                  left
                </span>
              </div>

              {/* Register */}
              <div>
                <button
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#F9423A',
                    background: 'none',
                    border: '1px solid rgba(249,66,58,.3)',
                    padding: '6px 14px',
                    borderRadius: 2,
                    cursor: 'pointer',
                  }}
                >
                  Register &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
