export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  readTime: string
  category: string
  image: string
  tags: string[]
}

export interface RelatedPost {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
}

export interface BlogCategory {
  id: string
  name: string
  description: string
  image: string
  postCount: number
}

export interface BlogTag {
  id: string
  name: string
  postCount: number
}

export interface BlogAuthor {
  id: string
  name: string
  avatar: string
  bio: string
  postCount: number
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
  }
} 