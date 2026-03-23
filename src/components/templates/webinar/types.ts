export interface WebinarSpeaker {
  name: string
  title: string
  bio: string
}

export interface WebinarAgendaItem {
  time: string
  item: string
}

export interface WebinarData {
  status: 'upcoming' | 'on-demand'
  title: string
  date: string
  time: string
  duration: string
  description: string
  speakers: WebinarSpeaker[]
  agenda: WebinarAgendaItem[]
  formTitle: string
}
