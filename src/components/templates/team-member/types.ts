export interface TeamMemberFact {
  label: string
  value: string
}

export interface TeamMemberData {
  name: string
  title: string
  department: string
  isLeadership: boolean
  issueLabel: string
  bio: string[]
  facts: TeamMemberFact[]
  linkedinUrl: string
}
