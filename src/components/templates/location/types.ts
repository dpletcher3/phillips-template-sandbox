export interface LocationHours {
  label: string
  value: string
}

export interface LocationService {
  number: string
  name: string
  description: string
}

export interface LocationData {
  region: string
  city: string
  state: string
  fullName: string
  address: string
  phone: string
  hours: LocationHours[]
  marqueeText: string
  services: LocationService[]
}
