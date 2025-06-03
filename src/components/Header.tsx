
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Header = ({ onOpenAuth }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-surface-dark/95 dark:border-gray-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/blog" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue transition-colors">
              Blog
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue transition-colors">
              About
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue transition-colors">
              Pricing
            </Link>
            
            <DarkModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.profile_image_url} alt="Profile" />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenAuth('login')}
                  className="text-gray-700 hover:text-christian-blue dark:text-gray-300"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => onOpenAuth('signup')}
                  className="btn-christian"
                >
                  Join Now
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link to="/blog" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue">Blog</Link>
              <Link to="/gallery" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue">Gallery</Link>
              <Link to="/about" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue">About</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-christian-blue dark:text-gray-300 dark:hover:text-christian-blue">Pricing</Link>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" onClick={() => navigate('/profile')} className="justify-start">
                    Profile
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut} className="justify-start text-red-600">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" onClick={() => onOpenAuth('login')}>Sign In</Button>
                  <Button onClick={() => onOpenAuth('signup')} className="btn-christian">Join Now</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
