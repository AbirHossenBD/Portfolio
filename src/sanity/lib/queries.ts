// --- Path: src/sanity/lib/queries.ts ---
import { client } from "./client";

export async function getHeroData() {
  const query = `*[_type == "hero"][0]{
    logoText,
    logoImage,
    topTagline,
    subheadingText,
    highlightedWord,
    description,
    statusItems[]{
      label,
      icon
    },
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
    watermarkCode,
    glowColor,
    portrait,
    "portraitAlt": portrait.alt,
    backgroundImage
  }`;
  return await client.fetch(query);
}

export async function getSkillCategories() {
  const query = `*[_type == "skillCategory"] | order(order asc){
    _id,
    title,
    "categoryId": categoryId.current,
    description,
    themeColor,
    badgeIcon,
    "customBadgeIconUrl": customBadgeIcon.asset->url,
    "skills": *[_type == "skill" && references(^._id)] | order(order asc){
      _id,
      name,
      subtitle,
      icon,
      "customIconUrl": customIcon.asset->url
    }
  }`;
  return await client.fetch(query);
}

export async function getSkills() {
  const query = `*[_type == "skillCategory"] | order(_createdAt asc){
    title,
    skills[]{
      name,
      icon,
      level
    }
  }`;
  return await client.fetch(query);
}