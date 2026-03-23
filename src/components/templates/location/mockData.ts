import { LocationData } from './types'

export const LOCATION_MOCK: LocationData = {
  region: 'Mid-Atlantic',
  city: 'Hanover',
  state: 'MD',
  fullName: 'Phillips Technology Center — Hanover',
  address: '7170 Riverwood Drive\nColumbia, MD 21046',
  phone: '(410) 379-2500',
  hours: [
    { label: 'Sales', value: 'Mon–Fri 8 AM–5 PM' },
    { label: 'Service', value: '24/7 Emergency Line' },
    { label: 'Showroom', value: 'By Appointment' },
  ],
  marqueeText: 'CNC Sales & Applications  ·  5-Axis Machining  ·  Additive Manufacturing  ·  Automation  ·  Service & Repair  ·  Training & Education  ·  ',
  services: [
    { number: '01', name: 'CNC Machine Sales', description: 'New and certified pre-owned machines from Hermle, Mazak, Haas, DMG MORI, and 20+ additional brands.' },
    { number: '02', name: 'Applications Engineering', description: 'Test cuts, process development, fixturing design, and CAM programming for your specific parts.' },
    { number: '03', name: 'Service & Repair', description: '24/7 emergency service line. Factory-trained technicians for spindle repair, crash recovery, and PM.' },
    { number: '04', name: 'Automation Integration', description: 'Pallet systems, robotic load/unload, and FMS design for lights-out manufacturing.' },
    { number: '05', name: 'Training & Education', description: 'Hands-on CNC, CAM, and additive courses at the Technology Center. Custom on-site training available.' },
    { number: '06', name: 'Federal & DoD', description: 'ITAR-compliant procurement, GSA schedule, and dedicated support for military manufacturing.' },
  ],
}
