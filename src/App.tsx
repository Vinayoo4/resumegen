import React, { useState } from 'react';
import { Portfolio } from './components/Portfolio';
import { ProfileForm } from './components/ProfileForm';
import { ProjectForm } from './components/ProjectForm';
import { SkillForm } from './components/SkillForm';
import { Header } from './components/Header';
import type { Profile, Project, Skill } from './types';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'preview'>('profile');

  const handleProfileSubmit = (newProfile: Profile) => {
    setProfile(newProfile);
    setActiveTab('projects');
  };

  const handleProjectSubmit = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleSkillSubmit = (skill: Skill) => {
    setSkills([...skills, skill]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto py-8 px-4">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <ProfileForm onSubmit={handleProfileSubmit} />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Add Project</h2>
            <ProjectForm onSubmit={handleProjectSubmit} />
            {projects.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Added Projects</h3>
                <ul className="space-y-4">
                  {projects.map((project) => (
                    <li key={project.id} className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Add Skill</h2>
            <SkillForm onSubmit={handleSkillSubmit} />
            {skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Added Skills</h3>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-600 capitalize">{skill.category}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'preview' && profile && (
          <Portfolio profile={profile} projects={projects} skills={skills} />
        )}
      </main>
    </div>
  );
}

export default App;