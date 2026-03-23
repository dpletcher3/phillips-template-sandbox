import { CourseData } from './types'

export const COURSE_MOCK: CourseData = {
  track: 'CNC',
  level: 'Intermediate',
  title: '5-Axis Programming & Setup',
  subtitle: 'From 3+2 to Simultaneous: Master 5-axis operations on Hermle and Haas platforms.',
  description: 'This 3-day intensive course covers everything from work coordinate systems and trunnion kinematics to simultaneous 5-axis toolpath strategies. You\'ll program, set up, and run parts on live machines at the Phillips Technology Center.',
  duration: '3 Days',
  schedule: 'Tue–Thu, 8 AM–5 PM',
  price: '$1,800',
  location: 'Phillips Technology Center, Hanover, MD',
  machines: ['Hermle C 32 U', 'Haas UMC-750'],
  modules: [
    { number: 1, title: '5-Axis Fundamentals', description: 'Machine kinematics, coordinate systems, RTCP, and toolpoint control. Understanding trunnion vs. swivel-head configurations.' },
    { number: 2, title: 'Work Holding & Fixturing', description: 'Zero-point systems, tombstone fixtures, and pallet strategies for 5-axis work. Live setup exercises.' },
    { number: 3, title: '3+2 Positional Machining', description: 'Programming indexed positions for multi-face machining. Tool reach optimization and collision avoidance.' },
    { number: 4, title: 'Simultaneous 5-Axis Toolpaths', description: 'Swarf cutting, flowline, and morph-between-curves strategies. CAM programming with hyperMILL and Mastercam.' },
    { number: 5, title: 'Probing & In-Process Measurement', description: 'Part alignment, tool length compensation, and closed-loop quality verification on the machine.' },
    { number: 6, title: 'Production Project', description: 'Program, set up, and run a complex 5-axis part from print to finished piece. Peer review and instructor feedback.' },
  ],
  prerequisites: [
    'Basic CNC mill operation experience',
    'Familiarity with G-code fundamentals',
    'Completion of "CNC Mill Essentials" or equivalent',
    'CAM software exposure (Mastercam, hyperMILL, or similar)',
  ],
}
