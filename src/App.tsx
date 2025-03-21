
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Card } from './components/Card';
import { PortfolioBuilder } from './components/PortfolioBuilder';
import { Palette, Code, Share } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <section className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Create Your Dream Portfolio
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Generate stunning, responsive portfolios in minutes. Showcase your work with style and professionalism.
          </motion.p>
          
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate('/builder')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Examples
            </motion.button>
          </motion.div>
        </section>

        <section className="mt-32" id="features">
          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              title="Customizable Themes"
              description="Choose from a variety of professional themes and customize them to match your style."
              icon={<Palette />}
            />
            <Card 
              title="Code Export"
              description="Download your portfolio as clean HTML/CSS files or deploy directly to the web."
              icon={<Code />}
            />
            <Card 
              title="Easy Sharing"
              description="Share your portfolio with potential clients and employers with a single click."
              icon={<Share />}
            />
          </div>
        </section>

        <section className="mt-32 text-center" id="about">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About Portfolio Generator
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            We believe everyone deserves a professional online presence. Our platform makes it easy to create beautiful, responsive portfolios that showcase your work in the best light possible.
          </motion.p>
        </section>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<PortfolioBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;