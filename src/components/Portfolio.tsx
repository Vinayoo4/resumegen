import React from 'react';
import { Github, Globe, Linkedin, Mail, MapPin } from 'lucide-react';
import type { Profile, Project, Skill } from '../types';

interface PortfolioProps {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
}

export function Portfolio({ profile, projects, skills }: PortfolioProps) {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    finance: 'Finance & Accounting',
    hr: 'Human Resources',
    leadership: 'Leadership & Management',
    entrepreneurship: 'Entrepreneurship',
    tools: 'Development Tools',
    other: 'Other Skills'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />
        <h1 className="text-4xl font-bold text-gray-900">{profile.name}</h1>
        <p className="text-xl text-gray-600">{profile.title}</p>
        <p className="text-gray-600 max-w-2xl mx-auto">{profile.bio}</p>
        
        <div className="flex justify-center space-x-4 text-gray-600">
          <span className="flex items-center">
            <MapPin size={18} className="mr-1" />
            {profile.location}
          </span>
          <a href={`mailto:${profile.email}`} className="flex items-center hover:text-indigo-600">
            <Mail size={18} className="mr-1" />
            {profile.email}
          </a>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600">
              <Github size={18} className="mr-1" />
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600">
              <Linkedin size={18} className="mr-1" />
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{categoryLabels[category]}</h3>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-gray-700">{skill.name}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < skill.level ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <Globe size={18} className="mr-1" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <Github size={18} className="mr-1" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}