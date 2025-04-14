import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Image as ImageIcon, Link as LinkIcon, Github, Linkedin, Twitter, Mail, Briefcase, Award, Book, User, Palette, Code, Share, FileText, CheckCircle, Download, Eye, Settings, Languages } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { toast } from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  accentColor: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

export const PortfolioBuilder = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    title: '',
    bio: '',
    avatar: '',
    location: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    accentColor: '#3b82f6'
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<{ id: string; name: string; level: string }[]>([]);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      const portfolioData = {
        personalInfo,
        projects,
        experiences,
        education,
        skills,
        languages
      };
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    };

    const interval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [personalInfo, projects, experiences, education, skills, languages]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      const { personalInfo, projects, experiences, education, skills, languages } = JSON.parse(savedData);
      setPersonalInfo(personalInfo);
      setProjects(projects);
      setExperiences(experiences);
      setEducation(education);
      setSkills(skills);
      setLanguages(languages);
    }
  }, []);

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        title: '',
        description: '',
        image: '',
        link: '',
        technologies: []
      },
    ]);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        company: '',
        position: '',
        duration: '',
        description: ''
      }
    ]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        duration: '',
        description: ''
      }
    ]);
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        name: '',
        level: 0
      }
    ]);
  };

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        id: Date.now().toString(),
        name: '',
        level: 'Beginner'
      }
    ]);
  };

  const removeItem = <T extends { id: string }>(id: string, setter: (items: T[]) => void, items: T[]): void => {
    setter(items.filter(item => item.id !== id));
  };

  const updateItem = <T extends { id: string }, K extends keyof T>(id: string, field: K, value: T[K], setter: (items: T[]) => void, items: T[]): void => {
    setter(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Portfolio Data:', { personalInfo, projects, experiences, education, skills });
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
        activeTab === id 
          ? 'bg-blue-600 text-white' 
          : 'hover:bg-gray-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </motion.button>
  );

  return (
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Build Your Professional Portfolio
          </h1>
          <p className="text-xl text-gray-600">
            Create an ATS-friendly portfolio that stands out to recruiters and showcases your skills effectively.
          </p>
        </motion.div>

        <div className="flex justify-end space-x-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Eye className="h-5 w-5" />
            <span>{isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-5 w-5" />
            <span>Export Portfolio</span>
          </motion.button>
        </div>

        {!isPreviewMode ? (
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32">
                <h2 className="text-xl font-bold mb-6">Sections</h2>
                <div className="space-y-2">
                  <TabButton id="personal" label="Personal Info" icon={User} />
                  <TabButton id="experience" label="Experience" icon={Briefcase} />
                  <TabButton id="education" label="Education" icon={Book} />
                  <TabButton id="projects" label="Projects" icon={Code} />
                  <TabButton id="skills" label="Skills" icon={Award} />
                  <TabButton id="languages" label="Languages" icon={Languages} />
                  <TabButton id="settings" label="Settings" icon={Settings} />
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  {/* Personal Info Form */}
                  {activeTab === 'personal' && (
                    <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={personalInfo.name}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={personalInfo.title}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          value={personalInfo.bio}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                          <input
                            type="text"
                            value={personalInfo.location}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                          <input
                            type="url"
                            value={personalInfo.github}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                          <input
                            type="url"
                            value={personalInfo.linkedin}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                          <input
                            type="url"
                            value={personalInfo.twitter}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, twitter: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Experience Form */}
                  {activeTab === 'experience' && (
                    <div className="space-y-6">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="border rounded-lg p-6">
                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateItem(exp.id, 'company', e.target.value, setExperiences, experiences)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateItem(exp.id, 'position', e.target.value, setExperiences, experiences)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => updateItem(exp.id, 'duration', e.target.value, setExperiences, experiences)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateItem(exp.id, 'description', e.target.value, setExperiences, experiences)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => removeItem(exp.id, setExperiences, experiences)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addExperience}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Add Experience</span>
                      </button>
                    </div>
                  )}

                  {/* Education Form */}
                  {activeTab === 'education' && (
                    <div className="space-y-6">
                      {education.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-6">
                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateItem(edu.id, 'institution', e.target.value, setEducation, education)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateItem(edu.id, 'degree', e.target.value, setEducation, education)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                              <input
                                type="text"
                                value={edu.duration}
                                onChange={(e) => updateItem(edu.id, 'duration', e.target.value, setEducation, education)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={edu.description}
                              onChange={(e) => updateItem(edu.id, 'description', e.target.value, setEducation, education)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => removeItem(edu.id, setEducation, education)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addEducation}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Add Education</span>
                      </button>
                    </div>
                  )}

                  {/* Projects Form */}
                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      {projects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-6">
                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateItem(project.id, 'title', e.target.value, setProjects, projects)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                              <input
                                type="url"
                                value={project.link}
                                onChange={(e) => updateItem(project.id, 'link', e.target.value, setProjects, projects)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => updateItem(project.id, 'description', e.target.value, setProjects, projects)}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={4}
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                  <span className="text-sm text-gray-600">{tech}</span>
                                  <button
                                    onClick={() => {
                                      const newTechs = [...project.technologies];
                                      newTechs.splice(index, 1);
                                      updateItem(project.id, 'technologies', newTechs, setProjects, projects);
                                    }}
                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              <input
                                type="text"
                                placeholder="Add technology"
                                className="text-sm px-3 py-1 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.currentTarget.value) {
                                    const newTechs = [...project.technologies, e.currentTarget.value];
                                    updateItem(project.id, 'technologies', newTechs, setProjects, projects);
                                    e.currentTarget.value = '';
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => removeItem(project.id, setProjects, projects)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addProject}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Add Project</span>
                      </button>
                    </div>
                  )}

                  {/* Skills Form */}
                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                      {skills.map((skill) => (
                        <div key={skill.id} className="border rounded-lg p-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => updateItem(skill.id, 'name', e.target.value, setSkills, skills)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Level (%)</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => updateItem(skill.id, 'level', parseInt(e.target.value), setSkills, skills)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => removeItem(skill.id, setSkills, skills)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addSkill}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Add Skill</span>
                      </button>
                    </div>
                  )}

                  {/* Languages Form */}
                  {activeTab === 'languages' && (
                    <div className="space-y-6">
                      {languages.map((lang) => (
                        <div key={lang.id} className="border rounded-lg p-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                              <input
                                type="text"
                                value={lang.name}
                                onChange={(e) => updateItem(lang.id, 'name', e.target.value, setLanguages, languages)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                              <select
                                value={lang.level}
                                onChange={(e) => updateItem(lang.id, 'level', e.target.value, setLanguages, languages)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Native">Native</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => removeItem(lang.id, setLanguages, languages)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addLanguage}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Add Language</span>
                      </button>
                    </div>
                  )}

                  {/* Settings Form */}
                  {activeTab === 'settings' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                        <div className="relative">
                          <button
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            style={{ backgroundColor: personalInfo.accentColor }}
                          >
                            {personalInfo.accentColor}
                          </button>
                          {showColorPicker && (
                            <div className="absolute top-0 right-0 mt-12">
                              <HexColorPicker
                                color={personalInfo.accentColor}
                                onChange={(color) => setPersonalInfo({ ...personalInfo, accentColor: color })}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                        <select
                          value={selectedTemplate}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="modern">Modern</option>
                          <option value="classic">Classic</option>
                          <option value="minimal">Minimal</option>
                        </select>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  {personalInfo.name || 'Your Name'}
                </h2>
                <p className="text-xl text-gray-600">{personalInfo.title || 'Professional Title'}</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-6">About Me</h3>
                  <p className="text-gray-600 leading-relaxed">{personalInfo.bio || 'Add your bio here'}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Contact</h4>
                    <p className="text-gray-600">{personalInfo.email}</p>
                    <p className="text-gray-600">{personalInfo.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Links</h4>
                    <div className="flex space-x-4 mt-2">
                      {personalInfo.github && (
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {personalInfo.twitter && (
                        <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {experiences.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Experience</h3>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="border-l-4 border-blue-500 pl-6">
                        <h4 className="text-xl font-semibold">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-gray-500 text-sm">{exp.duration}</p>
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {education.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Education</h3>
                  <div className="space-y-6">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-4 border-purple-500 pl-6">
                        <h4 className="text-xl font-semibold">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">{edu.duration}</p>
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Projects</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-4"
                          >
                            <LinkIcon className="h-4 w-4 mr-1" />
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Skills</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {skills.map((skill) => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {languages.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Languages</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {languages.map((lang) => (
                      <div key={lang.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-gray-500">{lang.level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioBuilder;