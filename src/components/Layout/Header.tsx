import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would implement dark mode toggling here
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="text-primary-600" size={28} />
            <span className={`text-xl font-bold ${
              isScrolled || location.pathname !== '/' 
                ? 'text-primary-700' 
                : 'text-primary-700'
            }`}>
              SkySearch
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/" label="Home" isActive={location.pathname === '/'} />
            <NavLink href="/about" label="About" isActive={location.pathname === '/about'} />
            <NavLink href="/contact" label="Contact" isActive={location.pathname === '/contact'} />
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link 
              to="/search" 
              className="btn btn-primary"
            >
              Search Flights
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 slide-down">
            <MobileNavLink href="/" label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/about" label="About" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/search" label="Search Flights" onClick={() => setIsMenuOpen(false)} />
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={toggleDarkMode} 
                className="flex w-full items-center p-2 rounded hover:bg-gray-100 transition-colors"
              >
                {isDarkMode ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isActive }) => {
  return (
    <Link 
      to={href} 
      className={`text-sm font-medium hover:text-primary-600 transition-colors ${
        isActive ? 'text-primary-600' : 'text-gray-700'
      }`}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, label, onClick }) => {
  return (
    <Link 
      to={href} 
      className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;