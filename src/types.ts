export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'finance' | 'hr' | 'leadership' | 'entrepreneurship' | 'tools' | 'other';
  level: number; // 1-5
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  github?: string;
  linkedin?: string;
}