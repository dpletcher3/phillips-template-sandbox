import { GuideData } from './types'

export const GUIDE_MOCK: GuideData = {
  topic: 'CNC Technology',
  docId: 'PG-2025-003',
  title: 'The Complete Guide to 5-Axis CNC Machining',
  metadata: [
    { label: 'Updated', value: 'March 2025' },
    { label: 'Read Time', value: '22 min' },
    { label: 'Level', value: 'Intermediate' },
  ],
  sections: [
    {
      id: 'what-is-5-axis',
      heading: 'What Is 5-Axis Machining?',
      body: '5-axis machining refers to a CNC machine that moves a cutting tool or workpiece along five different axes simultaneously. The three standard linear axes (X, Y, Z) are augmented by two rotary axes (typically A and B, or B and C), allowing the tool to approach the workpiece from virtually any direction.\n\nThis capability eliminates the need for multiple setups, enables complex geometry in a single operation, and dramatically improves surface finish on contoured surfaces.',
      callout: null,
    },
    {
      id: 'types',
      heading: 'Types of 5-Axis Machines',
      body: 'There are three primary 5-axis machine configurations, each optimized for different applications and part sizes:',
      callout: {
        type: 'info' as const,
        title: 'Configuration Comparison',
        items: [
          'Trunnion (table/table): Workpiece tilts and rotates. Best for smaller parts. Example: Hermle C 32 U, Haas UMC-750.',
          'Swivel Head (head/table): Spindle tilts, table rotates. Ideal for large, heavy parts. Example: DMG MORI DMU 80.',
          'Gantry (head/head): Both rotary axes in the head. For very large aerospace and energy parts. Example: Zimmermann FZ33.',
        ],
      },
    },
    {
      id: 'specs',
      heading: 'Key Specifications to Evaluate',
      body: 'When evaluating a 5-axis machine, these are the specifications that matter most for production accuracy and throughput:',
      callout: null,
      specTable: [
        { spec: 'Positioning Accuracy', typical: '±0.005 mm', premium: '±0.002 mm', why: 'Determines part tolerance capability' },
        { spec: 'Repeatability', typical: '±0.003 mm', premium: '±0.001 mm', why: 'Consistency across production runs' },
        { spec: 'Spindle Speed', typical: '12,000 RPM', premium: '42,000 RPM', why: 'Surface finish and material range' },
        { spec: 'Rapid Traverse', typical: '36 m/min', premium: '60 m/min', why: 'Non-cutting time reduction' },
        { spec: 'Table Load', typical: '500 kg', premium: '2,000 kg', why: 'Maximum workpiece weight' },
      ],
    },
    {
      id: 'when-to-upgrade',
      heading: 'When to Move to 5-Axis',
      body: 'The transition from 3-axis to 5-axis is warranted when any of these conditions are present: you\'re running more than 3 setups per part, you\'re losing quotes due to geometric complexity, your surface finish requirements exceed what indexing can deliver, or your competition has already made the move.\n\nPhillips applications engineers can evaluate your current part mix and identify the ROI case for 5-axis adoption. We typically find that shops break even within 8–14 months on their first 5-axis machine.',
      callout: null,
    },
  ],
}
