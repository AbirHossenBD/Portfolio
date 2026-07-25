import { client } from './client'

export type HeroData = {
  portrait: { asset?: { _ref: string } } | null
  portraitAlt: string | null
}

const HERO_QUERY = `*[_type == "hero"][0]{ portrait, portraitAlt }`

export async function getHeroData(): Promise<HeroData | null> {
  return client.fetch(HERO_QUERY, {}, { next: { revalidate: 60 } })
}