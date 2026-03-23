import { CaseStudyData } from './types'

export const CASE_STUDY_MOCK: CaseStudyData = {
  title: 'NAVAIR Fleet Readiness Center Cuts Cycle Time 40% with 5-Axis Pallet Automation',
  subtitle: 'Fleet Readiness Center East',
  date: 'November 2024',
  industry: 'Federal / DoD',
  tags: ['Aerospace', 'Federal', '5-Axis', 'Automation'],
  customer: 'NAVAIR Fleet Readiness Center East',
  byline: 'Phillips Federal Division',
  lede: 'A Naval Air Systems Command depot-level maintenance facility needed to modernize its aging machining capability for F/A-18 structural components. Phillips Federal Division specified, delivered, and commissioned a Hermle C 42 U with HS flex pallet automation — achieving 40% cycle time reduction while meeting ITAR and cybersecurity requirements.',
  bodyLeft: 'The Fleet Readiness Center East (FRC East) in Cherry Point, North Carolina, is responsible for depot-level maintenance and repair of F/A-18 Hornet and Super Hornet structural airframe components. Existing 3-axis VMC cells required multiple setups per part, creating bottlenecks that directly impacted aircraft availability rates.\n\nPhillips Federal Division conducted a full process audit, identifying 14 part families that could benefit from 5-axis consolidation. The team specified a Hermle C 42 U with integrated HS flex heavy pallet automation — a configuration that reduces setup changes by 85% and enables unattended second-shift production.',
  bodyRight: 'The Hermle mineral-cast bed provides the thermal stability required for titanium and Inconel structural components, maintaining ±0.003mm positioning accuracy across 16-hour production runs. The HS flex system accommodates 6 pallets with automatic tool and workpiece management.\n\nPhillips applications engineers developed custom fixturing and CAM programs for all 14 part families, validated through test cuts at the Phillips Technology Center before deployment. On-site commissioning included operator training, preventive maintenance protocols, and integration with the facility\'s existing DNC network.',
  results: [
    { value: '40%', label: 'Cycle Time Reduction' },
    { value: '85%', label: 'Fewer Setups' },
    { value: '98.7%', label: 'Spindle Utilization' },
    { value: '14', label: 'Part Families Consolidated' },
  ],
  sidebarTitle: 'Equipment Deployed',
  sidebarItems: ['Hermle C 42 U', 'HS flex heavy (6 pallets)', 'Heidenhain TNC 640', 'Blum TC76 probe system', 'Custom titanium fixturing'],
  pullQuote: '"The Phillips team didn\'t just sell us a machine — they re-engineered our entire production workflow. We went from 6 setups per part to one."',
  pullAuthor: '— Production Lead, FRC East',
}
