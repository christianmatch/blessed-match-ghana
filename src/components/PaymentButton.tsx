
import { Button } from '@/components/ui/button';
import { usePaystack } from '@/hooks/usePaystack';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  planType: string;
  amount: number;
  planName: string;
  buttonText: string;
  variant?: 'default' | 'outline';
  className?: string;
  disabled?: boolean;
}

export const PaymentButton = ({ 
  planType, 
  amount, 
  planName, 
  buttonText, 
  variant = 'default',
  className = '',
  disabled = false 
}: PaymentButtonProps) => {
  const { initializePayment, isLoading } = usePaystack();
  const { user } = useAuth();

  const handlePayment = () => {
    if (!user) {
      // This will be handled by the usePaystack hook
      initializePayment({ planType, amount, planName });
      return;
    }

    initializePayment({ planType, amount, planName });
  };

  if (planType === 'free') {
    return (
      <Button 
        variant={variant}
        className={className}
        disabled={true}
      >
        Current Plan
      </Button>
    );
  }

  return (
    <Button 
      variant={variant}
      className={className}
      onClick={handlePayment}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};
