import { client } from './client'

export type HeroData = {
  portrait: { asset?: { _ref: string } } | null
  portraitAlt: string | null
}

const HERO_QUERY = `*[_type == "hero"][0]{ portrait, portraitAlt }`

export async function getHeroData(): Promise<HeroData | null> {
  return client.fetch(HERO_QUERY, {}, { next: { revalidate: 60 } })
}

export type SkillCategory = 'Programming' | 'Tools' | 'Creative' | 'Currently Learning'

export type SkillData = {
  _id: string
  name: string
  category: SkillCategory
  icon: string | null
  order: number | null
}

// Sorted so consumers can group-by-category directly without re-sorting.
const SKILLS_QUERY = `*[_type == "skill"] | order(category asc, order asc, name asc){
  _id, name, category, icon, order
}`

export async function getSkills(): Promise<SkillData[]> {
  return client.fetch(SKILLS_QUERY, {}, { next: { revalidate: 60 } })
}