import fs from 'fs';
import path from 'path';

/**
 * This function is used server-side to load markdown content
 * for static site generation.
 */
export function getMdContent() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  
  // Load all markdown files
  const aboutContent = fs.readFileSync(path.join(contentDir, 'about.md'), 'utf8');
  const skillsContent = fs.readFileSync(path.join(contentDir, 'skills.md'), 'utf8');
  const experienceContent = fs.readFileSync(path.join(contentDir, 'experience.md'), 'utf8');
  const projectsContent = fs.readFileSync(path.join(contentDir, 'projects.md'), 'utf8');
  const contactContent = fs.readFileSync(path.join(contentDir, 'contact.md'), 'utf8');
  
  return {
    about: aboutContent,
    skills: skillsContent,
    experience: experienceContent,
    projects: projectsContent,
    contact: contactContent
  };
}
