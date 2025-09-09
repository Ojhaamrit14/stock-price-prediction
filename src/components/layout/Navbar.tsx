import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, BellRing } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border transition-colors duration-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-muted-foreground md:hidden"
              onClick={onMenuClick}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center ml-2 md:ml-0">
              <svg 
                viewBox="0 0 24 24" 
                className="h-8 w-8 text-primary" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              <span className="ml-2 text-xl font-bold text-foreground hidden sm:block">AmritSense</span>
            </Link>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <BellRing className="h-5 w-5" />
            </button>
            
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;