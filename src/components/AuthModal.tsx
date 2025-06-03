
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart, Mail, Lock, User, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
        });
      } else {
        await signIn(formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // Placeholder for Google auth
    console.log('Google auth not implemented yet');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-2 text-2xl">
            <Heart className="h-6 w-6 text-christian-blue" />
            <span>{mode === 'login' ? 'Welcome Back' : 'Join Christian Match Ghana'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      className="pl-10"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      className="pl-10"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="Your address"
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full btn-christian"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
          </Button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-sm text-gray-500">
              or
            </span>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleAuth}
          >
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              className="ml-2 text-christian-blue hover:underline font-medium"
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? 'Join now' : 'Sign in'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
