'use client';

import { useState } from 'react';

const tocItems = [
  { id: '1', label: 'What Is a VMC?' },
  { id: '2', label: 'Key Components' },
  { id: '3', label: 'VMC vs. HMC' },
  { id: '4', label: 'Applications' },
  { id: '5', label: 'Choosing a VMC' },
];

const comparisonRows = [
  { feature: 'Spindle', vmc: 'Vertical', hmc: 'Horizontal' },
  { feature: 'Chip Evacuation', vmc: 'Manual assist', hmc: 'Gravity-aided' },
  { feature: 'Pallet Changer', vmc: 'Optional', hmc: 'Standard' },
  { feature: 'Cost', vmc: 'Lower', hmc: 'Higher' },
  { feature: 'Best For', vmc: 'Job shops', hmc: 'Production' },
];

export default function GuidePage() {
  const [activeSectionId, setActiveSectionId] = useState('1');

  return (
    <div style={{ background: '#0d0d0d', color: '#fff', fontFamily: "'Montserrat', sans-serif", minHeight: '100vh' }}>

      {/* SECTION 1 — Red Topbar */}
      <div style={{ background: '#F9423A', padding: '9px 44px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Knowledge Hub
        </span>
        <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 10 }}>&rarr;</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.8)', letterSpacing: '1px' }}>
          VMC Guide
        </span>
      </div>

      {/* SECTION 2 — Hero */}
      <div style={{ padding: '44px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        {/* Guide ID row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)' }}>
            Technical Reference
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F9423A' }}>#CNC-001</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(36px,5.5vw,64px)',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          color: '#fff',
          margin: '0 0 20px',
        }}>
          VERTICAL<br />
          MACHINING<br />
          <span style={{ color: '#F9423A' }}>CENTER?</span>
        </h1>

        {/* Metadata chips */}
        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
          {[
            { label: 'Level', value: 'Beginner' },
            { label: 'Read Time', value: '8 min' },
            { label: 'Updated', value: 'March 2026' },
          ].map((chip) => (
            <div key={chip.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F9423A', display: 'inline-block' }} />
              <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,.3)' }}>
                {chip.label}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}>
                {chip.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3 — Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>

        {/* LEFT TOC sidebar */}
        <div style={{
          background: '#080808',
          borderRight: '1px solid rgba(255,255,255,.05)',
          padding: '24px 16px',
          position: 'sticky' as const,
          top: 0,
          alignSelf: 'start' as const,
          minHeight: '60vh',
        }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.25)', marginBottom: 16 }}>
            Contents
          </div>
          {tocItems.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSectionId(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 12px',
                  fontSize: 11,
                  color: isActive ? '#fff' : 'rgba(255,255,255,.35)',
                  borderLeft: isActive ? '2px solid #F9423A' : '2px solid transparent',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all .2s',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT body */}
        <div style={{ padding: '36px 44px' }}>

          {/* Section 1 — What Is a VMC? */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#F9423A', marginRight: 12 }}>01</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#fff' }}>WHAT IS A VMC?</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 16 }}>
              A Vertical Machining Center (VMC) is a CNC machine tool where the spindle axis is oriented vertically. The spindle holds and rotates the cutting tool while the workpiece is secured to a table that moves in the X and Y axes. The spindle moves in the Z axis to control depth of cut.
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 12 }}>
              VMCs have become the backbone of modern manufacturing due to their versatility, relatively compact footprint, and ease of operation. They are capable of performing milling, drilling, tapping, boring, and contouring operations with high precision. Most VMCs feature an automatic tool changer (ATC) that allows the machine to switch between different cutting tools without operator intervention, dramatically reducing cycle times and improving consistency across production runs.
            </p>

            {/* Callout box */}
            <div style={{
              background: 'rgba(249,66,58,.05)',
              borderLeft: '3px solid #F9423A',
              padding: '16px 20px',
              margin: '20px 0',
              borderRadius: '0 4px 4px 0',
            }}>
              <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#F9423A', marginBottom: 6 }}>
                Key Takeaway
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', lineHeight: 1.7 }}>
                VMCs are the most common type of CNC machine in job shops worldwide, offering excellent versatility for 3-axis and basic 4-axis work.
              </div>
            </div>
          </div>

          {/* Section 2 — Key Components */}
          <div style={{ marginTop: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#F9423A', marginRight: 12 }}>02</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#fff' }}>KEY COMPONENTS</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 16 }}>
              The spindle is the heart of any VMC, responsible for rotating the cutting tool at speeds ranging from a few hundred to tens of thousands of RPM depending on the machine class. Common spindle tapers include CAT40 for general-purpose work and CAT50 for heavy-duty cutting. The worktable provides the mounting surface for fixtures, vises, and workpieces, with T-slots machined into its surface for clamping hardware.
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 12 }}>
              The automatic tool changer (ATC) stores multiple tools in a carousel or chain-type magazine and swaps them into the spindle on command from the CNC program. Tool capacities typically range from 20 to 120 tools. The CNC controller — often a Fanuc, Siemens, or Heidenhain unit — interprets G-code and M-code instructions to coordinate axis movements, spindle speed, feed rates, coolant delivery, and tool changes with micron-level precision.
            </p>
          </div>

          {/* Section 3 — VMC vs. HMC */}
          <div style={{ marginTop: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#F9423A', marginRight: 12 }}>03</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#fff' }}>VMC VS. HMC</span>
            </div>

            {/* Comparison table */}
            <div style={{ marginTop: 16 }}>
              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <span style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)' }}>Feature</span>
                <span style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)' }}>VMC</span>
                <span style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)' }}>HMC</span>
              </div>
              {/* Data rows */}
              {comparisonRows.map((row) => (
                <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{row.feature}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{row.vmc}</span>
                  <span style={{ fontSize: 12, color: '#F9423A' }}>{row.hmc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 — Applications */}
          <div style={{ marginTop: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#F9423A', marginRight: 12 }}>04</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#fff' }}>APPLICATIONS</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 16 }}>
              VMCs serve a remarkably wide range of industries. In aerospace, they machine complex aluminum structural components, titanium brackets, and engine housings that demand tight tolerances and superior surface finishes. Medical device manufacturers rely on VMCs to produce surgical instruments, orthopedic implants, and prosthetic components from stainless steel, cobalt-chrome, and PEEK plastics.
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 12 }}>
              The automotive sector uses VMCs extensively for prototyping, fixture machining, and low-to-medium volume production of engine blocks, transmission cases, and suspension components. General job shops depend on VMCs for their ability to handle a constantly changing mix of parts, materials, and batch sizes — from one-off prototypes to recurring production orders of several thousand pieces.
            </p>
          </div>

          {/* Section 5 — Choosing a VMC */}
          <div style={{ marginTop: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: '#F9423A', marginRight: 12 }}>05</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#fff' }}>CHOOSING A VMC</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 16 }}>
              Selecting the right VMC starts with understanding your workpiece envelope — the maximum part dimensions you need to accommodate. Table size, X/Y/Z travel distances, and spindle nose-to-table clearance all dictate what you can physically fit and machine. Spindle power and torque curves should match your primary materials: high-speed aluminum work favors RPM, while heavy steel and titanium cutting demands torque at lower speeds.
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.85, marginTop: 12 }}>
              Consider the tool magazine capacity relative to your typical job complexity, the rigidity of the machine base and column construction, and the accuracy class you require. Thermal compensation systems, linear scale feedback, and through-spindle coolant are features that significantly impact precision and productivity in demanding applications. Finally, evaluate the total cost of ownership including installation, training, tooling, maintenance contracts, and the availability of local service support.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
