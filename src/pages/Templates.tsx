import { motion } from 'framer-motion';
import { Layout, Palette, Code, Share, Sparkles, Rocket, Zap } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: 'professional' | 'creative' | 'minimal' | 'modern';
}

export const Templates = () => {
  const templates: Template[] = [
    {
      id: '1',
      name: 'Professional Classic',
      description: 'A clean, traditional design perfect for corporate professionals and executives.',
      features: ['ATS-friendly layout', 'Professional typography', 'Easy navigation', 'Responsive design'],
      image: '/templates/professional-classic.png',
      category: 'professional'
    },
    {
      id: '2',
      name: 'Creative Showcase',
      description: 'A vibrant, dynamic template ideal for designers, artists, and creative professionals.',
      features: ['Portfolio gallery', 'Animation effects', 'Custom color schemes', 'Project showcase'],
      image: '/templates/creative-showcase.png',
      category: 'creative'
    },
    {
      id: '3',
      name: 'Minimal Elegance',
      description: 'A sophisticated, minimalist design that puts focus on your content.',
      features: ['Clean typography', 'White space emphasis', 'Simple navigation', 'Lightweight'],
      image: '/templates/minimal-elegance.png',
      category: 'minimal'
    },
    {
      id: '4',
      name: 'Modern Tech',
      description: 'A contemporary template with tech-inspired design elements.',
      features: ['Dark mode support', 'Code snippets', 'Tech stack showcase', 'Interactive elements'],
      image: '/templates/modern-tech.png',
      category: 'modern'
    },
    {
      id: '5',
      name: 'Academic Pro',
      description: 'A structured template perfect for researchers and academic professionals.',
      features: ['Publication list', 'Research highlights', 'Conference presentations', 'Academic timeline'],
      image: '/templates/academic-pro.png',
      category: 'professional'
    },
    {
      id: '6',
      name: 'Portfolio Plus',
      description: 'A feature-rich template with advanced customization options.',
      features: ['Multiple layout options', 'Custom sections', 'SEO optimization', 'Analytics integration'],
      image: '/templates/portfolio-plus.png',
      category: 'modern'
    }
  ];

  return (
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
            <p className="text-xl text-gray-600">
              Select from our collection of professionally designed templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      template.category === 'professional' ? 'bg-blue-100 text-blue-800' :
                      template.category === 'creative' ? 'bg-purple-100 text-purple-800' :
                      template.category === 'minimal' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Preview
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                    >
                      Use Template
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
            >
              View All Templates
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates; 