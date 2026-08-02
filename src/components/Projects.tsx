import { getProjects } from "@/sanity/lib/queries";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  let projects = [];
  
  try {
    projects = await getProjects();
  } catch (err) {
    console.error("Error fetching projects from Sanity:", err);
  }

  return <ProjectsClient projects={projects} />;
}