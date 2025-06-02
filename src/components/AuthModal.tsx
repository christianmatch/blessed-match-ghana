
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (mode === 'signup') {
        // Redirect to comprehensive signup flow
        onClose();
        navigate('/signup');
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    if (mode === 'signup') {
      onClose();
      navigate('/signup');
    } else {
      toast({
        title: "Google Sign In",
        description: "This feature will be available when Firebase is connected.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-2 text-2xl">
            <Heart className="h-6 w-6 text-christian-blue" />
            <span>{mode === 'login' ? 'Welcome Back' : 'Quick Start'}</span>
          </DialogTitle>
        </DialogHeader>

        {mode === 'signup' ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600 dark:text-gray-300">
              Ready to find your God-given match? Let's get started with our comprehensive signup process.
            </p>
            
            <Button 
              onClick={() => {
                onClose();
                navigate('/signup');
              }}
              className="w-full btn-christian"
            >
              Start Complete Registration
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
              <span className="text-gray-600">Already have an account?</span>
              <button
                type="button"
                className="ml-2 text-christian-blue hover:underline font-medium"
                onClick={() => onSwitchMode('login')}
              >
                Sign in
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              {isLoading ? 'Please wait...' : 'Sign In'}
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
              <span className="text-gray-600">Don't have an account?</span>
              <button
                type="button"
                className="ml-2 text-christian-blue hover:underline font-medium"
                onClick={() => onSwitchMode('signup')}
              >
                Join now
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
