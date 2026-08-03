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
    bgImageOpacity, // <- NEW FIELD ADDED HERE
    portrait,
    "portraitAlt": portrait.alt,
    "backgroundImageUrl": backgroundImage.asset->url
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
      description, // <- FETCHING THE NEW FIELD
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
export async function getProjects() {
  const query = `*[_type == "project"] | order(order asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    isFeatured,
    order,
    category,
    "mainImage": mainImage.asset->url,
    color, // <-- Fetch custom color field
    summary,
    status,
    dateLabel,
    projectType,
    highlightsTitle,
    highlights,
    ctaText,
    technologies,
    icon,
    liveUrl,
    githubUrl,
    sections[]{
      text,
      "image": image.asset->url
    }
  }`;
  return await client.fetch(query);
}
export async function getCertifications() {
  const query = `*[_type == "certification"] | order(issueDate desc){
    _id,
    title,
    issuer,
    issueDate,
    credentialUrl
  }`;
  return await client.fetch(query);
}