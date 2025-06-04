
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, MessageCircle, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Header = ({ onOpenAuth }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const authenticatedNavItems = [
    { name: 'Find Match', path: '/find-match', icon: Heart },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
    { name: 'Profile', path: '/profile', icon: Users },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-faithful-ivory/95 dark:bg-nightly-navy/95 backdrop-blur-sm border-b border-sacred-blue/20 dark:border-celestial-teal/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors hover:text-sacred-blue dark:hover:text-radiant-yellow ${
                  location.pathname === item.path
                    ? 'text-sacred-blue dark:text-radiant-yellow'
                    : 'text-charcoal dark:text-soft-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {user && authenticatedNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 font-medium transition-colors hover:text-sacred-blue dark:hover:text-radiant-yellow ${
                    location.pathname === item.path
                      ? 'text-sacred-blue dark:text-radiant-yellow'
                      : 'text-charcoal dark:text-soft-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <DarkModeToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-charcoal/70 dark:text-soft-white/70">
                  Welcome, {user.email}
                </span>
                <Button onClick={handleSignOut} variant="outline" className="border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white dark:border-celestial-teal dark:text-celestial-teal dark:hover:bg-celestial-teal dark:hover:text-nightly-navy">
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenAuth('login')}
                  className="text-charcoal hover:text-sacred-blue dark:text-soft-white dark:hover:text-radiant-yellow"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => onOpenAuth('signup')}
                  className="bg-divine-gold hover:bg-divine-gold/90 text-charcoal font-semibold"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-radiant-yellow transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-sacred-blue/20 dark:border-celestial-teal/30">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-sacred-blue/10 dark:bg-radiant-yellow/10 text-sacred-blue dark:text-radiant-yellow'
                      : 'text-charcoal dark:text-soft-white hover:bg-faithful-ivory dark:hover:bg-charcoal-gray'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {user && authenticatedNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-sacred-blue/10 dark:bg-radiant-yellow/10 text-sacred-blue dark:text-radiant-yellow'
                        : 'text-charcoal dark:text-soft-white hover:bg-faithful-ivory dark:hover:bg-charcoal-gray'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-sacred-blue/20 dark:border-celestial-teal/30 pt-2 mt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-charcoal/70 dark:text-soft-white/70">
                      Welcome, {user.email}
                    </div>
                    <Button 
                      onClick={handleSignOut} 
                      variant="outline" 
                      className="w-full mx-3 border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white dark:border-celestial-teal dark:text-celestial-teal dark:hover:bg-celestial-teal dark:hover:text-nightly-navy"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        onOpenAuth('login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full mx-3 text-charcoal hover:text-sacred-blue dark:text-soft-white dark:hover:text-radiant-yellow"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => {
                        onOpenAuth('signup');
                        setIsMenuOpen(false);
                      }}
                      className="w-full mx-3 bg-divine-gold hover:bg-divine-gold/90 text-charcoal font-semibold"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
