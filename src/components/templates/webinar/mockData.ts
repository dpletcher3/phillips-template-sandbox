import { WebinarData } from './types'

export const WEBINAR_MOCK: WebinarData = {
  status: 'upcoming',
  title: '5-Axis Automation: From First Part to Lights-Out Production',
  date: 'April 15, 2025',
  time: '2:00 PM ET',
  duration: '60 min',
  description: 'Learn how leading manufacturers are combining 5-axis machining centers with pallet automation to achieve 98%+ spindle utilization. This session covers machine selection, pallet system design, CAM strategies, and real production data from Phillips customer installations.',
  speakers: [
    { name: 'Dan Pletcher', title: 'VP, Phillips Corporation', bio: '20+ years in CNC technology and manufacturing strategy.' },
    { name: 'Thomas Keller', title: 'Applications Engineer, Hermle', bio: 'Specialist in 5-axis pallet automation systems.' },
    { name: 'Sarah Chen', title: 'Sr. Engineer, Aerospace OEM', bio: 'Led 5-axis adoption at a Tier 1 aerospace supplier.' },
  ],
  agenda: [
    { time: '2:00 PM', item: 'Welcome & Market Overview' },
    { time: '2:10 PM', item: 'Why Pallet Automation? The Business Case' },
    { time: '2:25 PM', item: 'Machine + Pallet System Selection Framework' },
    { time: '2:40 PM', item: 'Live Demo: CAM Programming for Automated Cells' },
    { time: '2:50 PM', item: 'Customer Case Study: 40% Cycle Time Reduction' },
    { time: '3:00 PM', item: 'Q&A' },
  ],
  formTitle: 'Register Now',
}
