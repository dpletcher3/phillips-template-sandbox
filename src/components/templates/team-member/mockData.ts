import { TeamMemberData } from './types'

export const TEAM_MEMBER_MOCK: TeamMemberData = {
  name: 'Dan Pletcher',
  title: 'Vice President',
  department: 'Executive Leadership',
  isLeadership: true,
  issueLabel: 'Phillips People · Issue 042',
  bio: [
    'Dan Pletcher joined Phillips Corporation in 2003 and has served in progressively senior roles across sales, applications engineering, and strategic planning. As Vice President, he oversees the company\'s technology partnerships, federal division, and digital transformation initiatives.',
    'Under Dan\'s leadership, Phillips has expanded its 5-axis portfolio to include Hermle, Mazak, and DMG MORI — establishing the company as the premier source for precision machining technology in the Northeast and Mid-Atlantic. He also spearheaded the launch of the Phillips Federal Division, now serving NAVAIR, Army arsenals, and DoD workforce development programs.',
    'Dan is a frequent speaker at IMTS, Eastec, and military manufacturing summits. He holds a degree in Mechanical Engineering from the University of Maryland and is a certified Lean Six Sigma Black Belt.',
  ],
  facts: [
    { label: 'Joined Phillips', value: '2003' },
    { label: 'Territory', value: 'Northeast & Mid-Atlantic' },
    { label: 'Specialization', value: '5-Axis, Federal, Strategic Partnerships' },
    { label: 'Education', value: 'BS Mechanical Engineering, UMD' },
  ],
  linkedinUrl: '#',
}
