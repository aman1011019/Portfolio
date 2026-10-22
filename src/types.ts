export type ProjectStatus = 'Live' | 'Link pending'

export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  image?: string
  featured: boolean
  status: ProjectStatus
  mark: string
}

export interface Capability {
  title: string
  summary: string
  items: string[]
}
