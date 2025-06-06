
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaystackConfig {
  planType: string;
  amount: number;
  planName: string;
}

export const usePaystack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const initializePayment = async ({ planType, amount, planName }: PaystackConfig) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase a subscription.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate unique reference
      const reference = `CMG_${Date.now()}_${user.id.slice(0, 8)}`;

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: amount,
          currency: 'GHS',
          paystack_reference: reference,
          status: 'pending'
        });

      if (paymentError) {
        throw paymentError;
      }

      // Paystack configuration
      const config = {
        reference,
        email: user.email!,
        amount: amount * 100, // Convert to kobo
        publicKey: 'pk_test_74f19a4796d0c4b6f72e0d0ae1b4e7c946e0a628', // Replace with your actual Paystack public key
        text: `Pay ₵${amount}`,
        metadata: {
          userId: user.id,
          planType: planType,
          planName: planName,
        },
      };

      const initializePayment = usePaystackPayment(config);
      
      return initializePayment({
        onSuccess: async (response: any) => {
          try {
            // Call our database function to update subscription
            const { error } = await supabase.rpc('update_user_subscription', {
              user_id_param: user.id,
              plan_type_param: planType,
              amount_param: amount,
              reference_param: response.reference
            });

            if (error) throw error;

            toast({
              title: "Payment Successful!",
              description: `Welcome to ${planName}! Your subscription is now active.`,
            });

            // Reload page to reflect new subscription status
            window.location.reload();
          } catch (error) {
            console.error('Error updating subscription:', error);
            toast({
              title: "Payment Successful",
              description: "Payment completed but there was an issue activating your subscription. Please contact support.",
              variant: "destructive"
            });
          }
        },
        onClose: () => {
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process.",
          });
        },
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast({
        title: "Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initializePayment,
    isLoading
  };
};
