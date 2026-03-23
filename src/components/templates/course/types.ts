export interface CourseModule {
  number: number
  title: string
  description: string
}

export interface CourseData {
  track: string
  level: string
  title: string
  subtitle: string
  description: string
  duration: string
  schedule: string
  price: string
  location: string
  machines: string[]
  modules: CourseModule[]
  prerequisites: string[]
}
