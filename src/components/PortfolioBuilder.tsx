import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Image as ImageIcon, Link as LinkIcon, Github, Linkedin, Twitter, Mail, Briefcase, Award, Book, User } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

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
        level: 75
      }
    ]);
  };

  const removeItem = (id: string, setter: Function, items: any[]) => {
    setter(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: any, setter: Function, items: any[]) => {
    setter(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Portfolio Data:', { personalInfo, projects, experiences, education, skills });
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-12">
              {/* Sidebar Navigation */}
              <div className="col-span-3 bg-gray-50 p-6 border-r border-gray-200">
                <nav className="space-y-2">
                  <TabButton id="personal" label="Personal Info" icon={User} />
                  <TabButton id="projects" label="Projects" icon={Briefcase} />
                  <TabButton id="experience" label="Experience" icon={Award} />
                  <TabButton id="education" label="Education" icon={Book} />
                </nav>
              </div>

              {/* Main Content Area */}
              <div className="col-span-9 p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'personal' && (
                    <motion.div
                      key="personal"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Full Name</label>
                          <input
                            type="text"
                            value={personalInfo.name}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                          <input
                            type="text"
                            value={personalInfo.title}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Bio</label>
                          <textarea
                            value={personalInfo.bio}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            value={personalInfo.location}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              <Mail className="h-5 w-5" />
                            </span>
                            <input
                              type="email"
                              value={personalInfo.email}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                              className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">GitHub</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              <Github className="h-5 w-5" />
                            </span>
                            <input
                              type="text"
                              value={personalInfo.github}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                              className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              <Linkedin className="h-5 w-5" />
                            </span>
                            <input
                              type="text"
                              value={personalInfo.linkedin}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                              className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Twitter</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              <Twitter className="h-5 w-5" />
                            </span>
                            <input
                              type="text"
                              value={personalInfo.twitter}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, twitter: e.target.value })}
                              className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700">Accent Color</label>
                          <div
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: personalInfo.accentColor }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                          />
                          {showColorPicker && (
                            <div className="absolute z-10 mt-2">
                              <HexColorPicker
                                color={personalInfo.accentColor}
                                onChange={(color) => setPersonalInfo({ ...personalInfo, accentColor: color })}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'projects' && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Projects</h2>
                        <motion.button
                          type="button"
                          onClick={addProject}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Project
                        </motion.button>
                      </div>

                      <div className="space-y-6">
                        {projects.map((project) => (
                          <motion.div
                            key={project.id}
                            className="border border-gray-200 p-6 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 mr-4">
                                <input
                                  type="text"
                                  value={project.title}
                                  onChange={(e) => updateItem(project.id, 'title', e.target.value, setProjects, projects)}
                                  placeholder="Project Title"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <motion.button
                                type="button"
                                onClick={() => removeItem(project.id, setProjects, projects)}
                                className="text-red-600 hover:text-red-800"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-5 w-5" />
                              </motion.button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <textarea
                                  value={project.description}
                                  onChange={(e) => updateItem(project.id, 'description', e.target.value, setProjects, projects)}
                                  placeholder="Project Description"
                                  rows={3}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                      <ImageIcon className="h-5 w-5" />
                                    </span>
                                    <input
                                      type="text"
                                      value={project.image}
                                      onChange={(e) => updateItem(project.id, 'image', e.target.value, setProjects, projects)}
                                      placeholder="Project Image URL"
                                      className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                      <LinkIcon className="h-5 w-5" />
                                    </span>
                                    <input
                                      type="text"
                                      value={project.link}
                                      onChange={(e) => updateItem(project.id, 'link', e.target.value, setProjects, projects)}
                                      placeholder="Project URL"
                                      className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <input
                                  type="text"
                                  placeholder="Add technologies (comma-separated)"
                                  onChange={(e) => updateItem(
                                    project.id,
                                    'technologies',
                                    e.target.value.split(',').map(tech => tech.trim()),
                                    setProjects,
                                    projects
                                  )}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'experience' && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Work Experience</h2>
                        <motion.button
                          type="button"
                          onClick={addExperience}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Experience
                        </motion.button>
                      </div>

                      <div className="space-y-6">
                        {experiences.map((experience) => (
                          <motion.div
                            key={experience.id}
                            className="border border-gray-200 p-6 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 mr-4">
                                <input
                                  type="text"
                                  value={experience.company}
                                  onChange={(e) => updateItem(experience.id, 'company', e.target.value, setExperiences, experiences)}
                                  placeholder="Company Name"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <motion.button
                                type="button"
                                onClick={() => removeItem(experience.id, setExperiences, experiences)}
                                className="text-red-600 hover:text-red-800"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-5 w-5" />
                              </motion.button>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={experience.position}
                                  onChange={(e) => updateItem(experience.id, 'position', e.target.value, setExperiences, experiences)}
                                  placeholder="Position"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <input
                                  type="text"
                                  value={experience.duration}
                                  onChange={(e) => updateItem(experience.id, 'duration', e.target.value, setExperiences, experiences)}
                                  placeholder="Duration (e.g., Jan 2020 - Present)"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <textarea
                                value={experience.description}
                                onChange={(e) => updateItem(experience.id, 'description', e.target.value, setExperiences, experiences)}
                                placeholder="Job Description"
                                rows={3}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'education' && (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Education</h2>
                        <motion.button
                          type="button"
                          onClick={addEducation}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Education
                        </motion.button>
                      </div>

                      <div className="space-y-6">
                        {education.map((edu) => (
                          <motion.div
                            key={edu.id}
                            className="border border-gray-200 p-6 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 mr-4">
                                <input
                                  type="text"
                                  value={edu.institution}
                                  onChange={(e) => updateItem(edu.id, 'institution', e.target.value, setEducation, education)}
                                  placeholder="Institution Name"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <motion.button
                                type="button"
                                onClick={() => removeItem(edu.id, setEducation, education)}
                                className="text-red-600 hover:text-red-800"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-5 w-5" />
                              </motion.button>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => updateItem(edu.id, 'degree', e.target.value, setEducation, education)}
                                  placeholder="Degree"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <input
                                  type="text"
                                  value={edu.duration}
                                  onChange={(e) => updateItem(edu.id, 'duration', e.target.value, setEducation, education)}
                                  placeholder="Duration (e.g., 2016 - 2020)"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <textarea
                                value={edu.description}
                                onChange={(e) => updateItem(edu.id, 'description', e.target.value, setEducation, education)}
                                placeholder="Additional Information"
                                rows={3}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="h-5 w-5 mr-2" />
              Save Portfolio
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};