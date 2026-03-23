export interface CalendarEvent {
  dates: string
  course: string
  track: string
  location: string
  seats: number
  isFederal: boolean
  registrationUrl?: string
}

export interface ClassCalendarData {
  title: string
  subtitle: string
  events: CalendarEvent[]
  tracks: string[]
}
