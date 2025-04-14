import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, Plus, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export const Education = () => {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      institution: 'Example University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      description: 'Graduated with honors. Specialized in Software Engineering and Artificial Intelligence.',
      current: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null);

  const handleAddEducation = () => {
    setIsEditing(true);
    setCurrentEducation({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    });
  };

  const handleSaveEducation = () => {
    if (currentEducation) {
      setEducations([...educations, currentEducation]);
      setIsEditing(false);
      setCurrentEducation(null);
    }
  };

  const handleDeleteEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
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
            <h1 className="text-4xl font-bold">Education</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddEducation}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Education</span>
            </motion.button>
          </div>

          {isEditing && currentEducation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Education</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentEducation.institution}
                      onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentEducation.degree}
                      onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentEducation.field}
                      onChange={(e) => setCurrentEducation({ ...currentEducation, field: e.target.value })}
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
                      value={currentEducation.startDate}
                      onChange={(e) => setCurrentEducation({ ...currentEducation, startDate: e.target.value })}
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
                      value={currentEducation.endDate}
                      onChange={(e) => setCurrentEducation({ ...currentEducation, endDate: e.target.value })}
                      disabled={currentEducation.current}
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
                    value={currentEducation.description}
                    onChange={(e) => setCurrentEducation({ ...currentEducation, description: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="current"
                    checked={currentEducation.current}
                    onChange={(e) => setCurrentEducation({ ...currentEducation, current: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="current" className="text-sm text-gray-700">
                    Currently studying here
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentEducation(null);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveEducation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save Education
                </motion.button>
              </div>
            </motion.div>
          )}

          <div className="space-y-6">
            {educations.map((education) => (
              <motion.div
                key={education.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{education.degree} in {education.field}</h3>
                    <p className="text-gray-600">{education.institution}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {education.startDate} - {education.current ? 'Present' : education.endDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteEducation(education.id)}
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
                <p className="mt-4 text-gray-700">{education.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education; 