import React from 'react';

export function Header({ activeTab, setActiveTab }: {
  activeTab: 'profile' | 'projects' | 'skills' | 'preview';
  setActiveTab: (tab: 'profile' | 'projects' | 'skills' | 'preview') => void;
}) {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Anatomical Skull Logo */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-purple-500 to-emerald-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-black rounded-lg ring-1 ring-amber-400/50">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-200"
                style={{
                  filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.7))'
                }}
              >
                <defs>
                  <linearGradient id="skullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffd700' }} />
                    <stop offset="50%" style={{ stopColor: '#daa520' }} />
                    <stop offset="100%" style={{ stopColor: '#b8860b' }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Anatomically detailed skull path */}
                <path
                  fill="url(#skullGradient)"
                  filter="url(#glow)"
                  d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2h1c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM8.5 15c-.83 0-1.5-.67-1.5-1.5S7.67 12 8.5 12s1.5.67 1.5 1.5S9.33 15 8.5 15zm3.5-3c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1zm4 3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                />
                {/* Decorative details */}
                <path
                  fill="none"
                  stroke="url(#skullGradient)"
                  strokeWidth="0.5"
                  d="M8 10.5c.5-1 2-2 4-2s3.5 1 4 2M12 13v2M9 14.5l1.5-1M15 14.5l-1.5-1"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex space-x-8 ml-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'projects'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'skills'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'preview'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}