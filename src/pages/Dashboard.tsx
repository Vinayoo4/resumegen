import { motion } from 'framer-motion';
import { FileText, CheckCircle, Palette, Code, Share, Download, Eye, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
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

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Link to="/personal" className="block">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <FileText className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-xl font-bold mb-2">Personal Info</h3>
              <p className="text-gray-600">Add your personal details and contact information</p>
            </motion.div>
          </Link>

          <Link to="/experience" className="block">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold mb-2">Experience</h3>
              <p className="text-gray-600">Showcase your work history and achievements</p>
            </motion.div>
          </Link>

          <Link to="/education" className="block">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Palette className="w-12 h-12 mx-auto mb-4 text-pink-600" />
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-gray-600">Add your academic background and certifications</p>
            </motion.div>
          </Link>

          <Link to="/projects" className="block">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Code className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Projects</h3>
              <p className="text-gray-600">Highlight your key projects and contributions</p>
            </motion.div>
          </Link>

          <Link to="/skills" className="block">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Share className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">Skills</h3>
              <p className="text-gray-600">List your technical and soft skills</p>
            </motion.div>
          </Link>

          <Link to="/preview" className="block">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Eye className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <h3 className="text-xl font-bold mb-2">Preview</h3>
              <p className="text-gray-600">View and customize your portfolio</p>
            </motion.div>
          </Link>
        </div>

        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            <Download className="w-5 h-5" />
            <span>Export Portfolio</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 