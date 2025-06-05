
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, User, LogOut, Menu, X } from 'lucide-react';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Header = ({ onOpenAuth }: HeaderProps) => {
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "Come back soon!"
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-nightly-navy/95 backdrop-blur-sm border-b border-sacred-blue/20 dark:border-celestial-teal/20 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-sacred-blue dark:bg-radiant-yellow p-2 rounded-full transition-colors duration-200">
              <Heart className="h-6 w-6 text-white dark:text-nightly-navy fill-current" />
            </div>
            <span className="font-playfair font-bold text-deep-maroon dark:text-divine-gold transition-colors duration-200 text-lg sm:text-xl lg:text-2xl">
              Christian Match Ghana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              to="/gallery" 
              className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium"
            >
              Gallery
            </Link>
            <Link 
              to="/pricing" 
              className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link 
              to="/blog" 
              className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <DarkModeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/find-match">
                  <Button className="bg-sacred-blue hover:bg-sacred-blue/90 text-white">
                    Find Match
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenAuth('login')}
                  className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => onOpenAuth('signup')}
                  className="bg-sacred-blue hover:bg-sacred-blue/90 text-white"
                >
                  Join Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-charcoal dark:text-soft-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-nightly-navy border-t border-sacred-blue/20 dark:border-celestial-teal/20 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium px-4 py-2"
              >
                About
              </Link>
              <Link 
                to="/gallery" 
                onClick={closeMobileMenu}
                className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium px-4 py-2"
              >
                Gallery
              </Link>
              <Link 
                to="/pricing" 
                onClick={closeMobileMenu}
                className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium px-4 py-2"
              >
                Pricing
              </Link>
              <Link 
                to="/blog" 
                onClick={closeMobileMenu}
                className="text-charcoal dark:text-soft-white hover:text-sacred-blue dark:hover:text-celestial-teal transition-colors font-medium px-4 py-2"
              >
                Blog
              </Link>
              
              <div className="border-t border-sacred-blue/20 dark:border-celestial-teal/20 pt-4 px-4 space-y-3">
                {user ? (
                  <>
                    <Link to="/find-match" onClick={closeMobileMenu}>
                      <Button className="w-full bg-sacred-blue hover:bg-sacred-blue/90 text-white">
                        Find Match
                      </Button>
                    </Link>
                    <Link to="/profile" onClick={closeMobileMenu}>
                      <Button variant="outline" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={() => { handleSignOut(); closeMobileMenu(); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => { onOpenAuth('login'); closeMobileMenu(); }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="w-full bg-sacred-blue hover:bg-sacred-blue/90 text-white"
                      onClick={() => { onOpenAuth('signup'); closeMobileMenu(); }}
                    >
                      Join Now
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
