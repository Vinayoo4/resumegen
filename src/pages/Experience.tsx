import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building, Plus, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Example Company',
      position: 'Software Engineer',
      startDate: '2020-01',
      endDate: '2022-12',
      description: 'Developed and maintained web applications using React and Node.js.',
      current: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);

  const handleAddExperience = () => {
    setIsEditing(true);
    setCurrentExperience({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    });
  };

  const handleSaveExperience = () => {
    if (currentExperience) {
      setExperiences([...experiences, currentExperience]);
      setIsEditing(false);
      setCurrentExperience(null);
    }
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Work Experience</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddExperience}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Experience</span>
            </motion.button>
          </div>

          {isEditing && currentExperience && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Experience</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentExperience.company}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentExperience.position}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, position: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="month"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentExperience.startDate}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, startDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="month"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentExperience.endDate}
                      onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
                      disabled={currentExperience.current}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    value={currentExperience.description}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="current"
                    checked={currentExperience.current}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, current: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="current" className="text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentExperience(null);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveExperience}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save Experience
                </motion.button>
              </div>
            </motion.div>
          )}

          <div className="space-y-6">
            {experiences.map((experience) => (
              <motion.div
                key={experience.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{experience.position}</h3>
                    <p className="text-gray-600">{experience.company}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteExperience(experience.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    >
                      <Edit2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{experience.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience; 