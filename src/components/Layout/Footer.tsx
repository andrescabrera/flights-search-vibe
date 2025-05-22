import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="text-primary-400" size={24} />
              <span className="text-xl font-bold text-white">SkySearch</span>
            </div>
            <p className="text-gray-400 mb-4">
              Find and compare the best flight deals from hundreds of airlines and travel sites.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="https://facebook.com" />
              <SocialLink icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialLink icon={<Instagram size={18} />} href="https://instagram.com" />
              <SocialLink icon={<Mail size={18} />} href="mailto:contact@skysearch.com" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <FooterLink href="/about" label="About Us" />
            <FooterLink href="/careers" label="Careers" />
            <FooterLink href="/news" label="News" />
            <FooterLink href="/contact" label="Contact" />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <FooterLink href="/faq" label="FAQ" />
            <FooterLink href="/help" label="Help Center" />
            <FooterLink href="/privacy" label="Privacy Policy" />
            <FooterLink href="/terms" label="Terms of Service" />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-2">Get the latest deals and more.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">
            &copy; {currentYear} SkySearch. All rights reserved.
          </p>
          <p className="text-gray-400 flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="mx-1 text-accent-500" /> using SERP API
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <div className="mb-2">
      <Link 
        to={href} 
        className="text-gray-400 hover:text-primary-400 transition-colors"
      >
        {label}
      </Link>
    </div>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="p-2 bg-gray-800 rounded-full hover:bg-primary-700 transition-colors"
    >
      {icon}
    </a>
  );
};

export default Footer;