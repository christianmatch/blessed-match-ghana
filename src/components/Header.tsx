
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Header = ({ onOpenAuth }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-love-red to-love-red-dark p-2 rounded-lg animate-pulse-love">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-playfair font-bold text-christian-navy dark:text-white">
              Christian Match Ghana
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-love-red dark:hover:text-love-red transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons and Dark Mode */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <Button 
              variant="outline" 
              onClick={() => onOpenAuth('login')}
              className="hover:bg-love-red hover:text-white transition-all duration-300 border-love-red text-love-red dark:border-love-red dark:text-love-red"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => onOpenAuth('signup')}
              className="bg-love-red hover:bg-love-red-dark text-white"
            >
              Join Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-love-red transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onOpenAuth('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full border-love-red text-love-red hover:bg-love-red hover:text-white"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    onOpenAuth('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-love-red hover:bg-love-red-dark text-white"
                >
                  Join Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
