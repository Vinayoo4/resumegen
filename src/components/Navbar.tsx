import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-40 backdrop-blur-md bg-white/80 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="text-indigo-600" />
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Portfolio Builder
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/builder">Builder</NavLink>
          </div>

          <motion.button 
            className="md:hidden p-2 rounded-full hover:bg-indigo-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="text-indigo-600" /> : <Menu className="text-indigo-600" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full w-full bg-white/90 backdrop-blur-md shadow-lg rounded-b-2xl md:hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                <MobileNavLink to="/builder" onClick={() => setIsOpen(false)}>Builder</MobileNavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
    >
      {children}
    </Link>
  </motion.div>
);

const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => (
  <motion.div
    whileHover={{ x: 10 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className="text-gray-600 hover:text-indigo-600 transition-colors block py-2 font-medium"
      onClick={onClick}
    >
      {children}
    </Link>
  </motion.div>
);