
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-surface-dark-elevated/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
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
                className={`font-medium transition-colors hover:text-christian-blue ${
                  location.pathname === item.path
                    ? 'text-christian-blue'
                    : 'text-gray-700 dark:text-gray-300'
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
                  className={`flex items-center space-x-1 font-medium transition-colors hover:text-christian-blue ${
                    location.pathname === item.path
                      ? 'text-christian-blue'
                      : 'text-gray-700 dark:text-gray-300'
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
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome, {user.email}
                </span>
                <Button onClick={handleSignOut} variant="outline">
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenAuth('login')}
                >
                  Sign In
                </Button>
                <Button onClick={() => onOpenAuth('signup')}>
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
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-christian-blue transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-christian-blue/10 text-christian-blue'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
                        ? 'bg-christian-blue/10 text-christian-blue'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                      Welcome, {user.email}
                    </div>
                    <Button 
                      onClick={handleSignOut} 
                      variant="outline" 
                      className="w-full mx-3"
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
                      className="w-full mx-3"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => {
                        onOpenAuth('signup');
                        setIsMenuOpen(false);
                      }}
                      className="w-full mx-3"
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
