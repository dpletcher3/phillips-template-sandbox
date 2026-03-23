import { ClassCalendarData } from './types'

export const CLASS_CALENDAR_MOCK: ClassCalendarData = {
  title: 'Class Calendar',
  subtitle: 'Spring 2025 Schedule',
  tracks: ['all', 'CNC', 'AM', 'Software', 'Automation'],
  events: [
    { dates: 'Apr 8–10',  course: '5-Axis Programming & Setup',       track: 'CNC',        location: 'Hanover, MD',        seats: 6,  isFederal: false },
    { dates: 'Apr 15–16', course: 'Mastercam for 5-Axis',             track: 'Software',    location: 'Hanover, MD',        seats: 8,  isFederal: false },
    { dates: 'Apr 22–24', course: 'Metal Additive Fundamentals',      track: 'AM',          location: 'Philadelphia, PA',   seats: 10, isFederal: false },
    { dates: 'May 6–8',   course: 'CNC Mill Essentials — DoD Cohort', track: 'CNC',         location: 'Cherry Point, NC',   seats: 12, isFederal: true },
    { dates: 'May 13–15', course: 'Pallet Automation Workshop',       track: 'Automation',  location: 'Hanover, MD',        seats: 4,  isFederal: false },
    { dates: 'May 20–22', course: 'Advanced Turning — Federal',       track: 'CNC',         location: 'Watervliet Arsenal', seats: 8,  isFederal: true },
  ],
}
