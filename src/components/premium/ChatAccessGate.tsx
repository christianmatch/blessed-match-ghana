
import { useState, useEffect } from 'react';
import { PremiumUpgrade } from './PremiumUpgrade';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface ChatAccessGateProps {
  children: React.ReactNode;
}

export const ChatAccessGate = ({ children }: ChatAccessGateProps) => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkPremiumStatus();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const checkPremiumStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('plan_type', 'premium')
        .eq('status', 'active')
        .single();

      if (data && !error) {
        // Check if subscription is still valid
        const endDate = new Date(data.end_date);
        const now = new Date();
        setIsPremium(endDate > now);
      } else {
        setIsPremium(false);
      }
    } catch (error) {
      console.error('Error checking premium status:', error);
      setIsPremium(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-christian-blue" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Please sign in to access chat features.
        </p>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="max-w-md mx-auto p-4">
        <PremiumUpgrade onUpgrade={checkPremiumStatus} />
      </div>
    );
  }

  return <>{children}</>;
};
