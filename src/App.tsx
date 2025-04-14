import { BrowserRouter as Router, Routes, Route, useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Card } from './components/Card';
import { PortfolioBuilder } from './components/PortfolioBuilder';
import { Palette, Code, Share, Sparkles, Rocket, Zap } from 'lucide-react';
import Personal from './pages/Personal';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Templates from './pages/Templates';
import { useEffect } from 'react';

const consoleBanner = `
%c
██████╗  █████╗ ██████╗  █████╗     ██████╗ ███████╗███████╗██╗███╗   ██╗███████╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔════╝██╔════╝██║████╗  ██║██╔════╝██╔══██╗
██████╔╝███████║██████╔╝███████║    ██████╔╝█████╗  █████╗  ██║██╔██╗ ██║█████╗  ██████╔╝
██╔══██╗██╔══██║██╔══██╗██╔══██║    ██╔══██╗██╔══╝  ██╔══╝  ██║██║╚██╗██║██╔══╝  ██╔══██╗
██████╔╝██║  ██║██████╔╝██║  ██║    ██║  ██║███████╗██║     ██║██║ ╚████║███████╗██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
                                                                                            
%cPortfolio Builder v1.0.0
Created with ❤️ by Baba

%c
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Welcome to Portfolio Builder!                                          │
│                                                                         │
│  Features:                                                              │
│  • Create professional portfolios                                       │
│  • Choose from multiple templates                                       │
│  • Export in various formats                                            │
│  • ATS-friendly design                                                  │
│                                                                         │
│  Get started by clicking the "Get Started" button!                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
`;

const consoleStyles = [
  'color: #4F46E5; font-size: 12px; font-family: monospace; line-height: 1.2; text-shadow: 0 0 10px rgba(79, 70, 229, 0.3);',
  'color: #6B7280; font-size: 14px; font-family: system-ui, -apple-system, sans-serif; font-weight: 500; margin-top: 8px;',
  'color: #4B5563; font-size: 13px; font-family: monospace; line-height: 1.5; margin-top: 8px; background: rgba(243, 244, 246, 0.1); padding: 8px; border-radius: 4px;'
];

const printWelcomeMessage = () => {
  console.log('%cWelcome to Portfolio Builder!', 'color: #4F46E5; font-size: 18px; font-weight: bold; font-family: system-ui, -apple-system, sans-serif;');
  };

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(consoleBanner, ...consoleStyles);
    printWelcomeMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.span
              className="absolute -top-4 -right-4 text-yellow-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={32} />
            </motion.span>
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Create Your Dream Portfolio
            </h1>
          </motion.div>
          
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
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Examples
            </motion.button>
          </motion.div>
        </section>

        <section className="mt-32" id="features">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                title="Customizable Themes"
                description="Choose from a variety of professional themes and customize them to match your style."
                icon={<Palette className="text-indigo-600" />}
              />
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                title="Code Export"
                description="Download your portfolio as clean HTML/CSS files or deploy directly to the web."
                icon={<Code className="text-purple-600" />}
              />
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                title="Easy Sharing"
                description="Share your portfolio with potential clients and employers with a single click."
                icon={<Share className="text-pink-600" />}
              />
            </motion.div>
          </div>
        </section>

        <section className="mt-32 text-center" id="about">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              About Portfolio Generator
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe everyone deserves a professional online presence. Our platform makes it easy to create beautiful, responsive portfolios that showcase your work in the best light possible.
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/builder",
    element: <PortfolioBuilder />,
  },
  {
    path: "/PortfolioBuilder",
    element: <PortfolioBuilder />,
  },
  {
    path: "/personal",
    element: <Personal />,
  },
  {
    path: "/experience",
    element: <Experience />,
  },
  {
    path: "/education",
    element: <Education />,
  },
  {
    path: "/templates",
    element: <Templates />,
  }
]);

function App() {
  useEffect(() => {
    console.log(consoleBanner, ...consoleStyles);
    printWelcomeMessage();
  }, []);

  return (
    <Router future={{ v7_startTransition: true }}>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<PortfolioBuilder />} />
        <Route path="/PortfolioBuilder" element={<PortfolioBuilder />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Router>
  );
}

export default App;
