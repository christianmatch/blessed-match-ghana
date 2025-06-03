
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, MessageCircle, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PremiumUpgradeProps {
  onUpgrade?: () => void;
}

export const PremiumUpgrade = ({ onUpgrade }: PremiumUpgradeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upgrade to premium.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create payment record
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: 100.00,
          currency: 'GHS',
          paystack_reference: `ref_${Date.now()}_${user.id.slice(0, 8)}`,
          status: 'pending'
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      // Initialize Paystack payment
      const handler = (window as any).PaystackPop.setup({
        key: 'pk_test_your_paystack_public_key', // Replace with your Paystack public key
        email: user.email,
        amount: 10000, // Amount in kobo (₵100 = 10000 kobo)
        currency: 'GHS',
        ref: payment.paystack_reference,
        callback: async function(response: any) {
          // Payment successful
          try {
            // Update payment status
            await supabase
              .from('payments')
              .update({ status: 'completed' })
              .eq('paystack_reference', response.reference);

            // Create or update subscription
            await supabase
              .from('subscriptions')
              .upsert({
                user_id: user.id,
                plan_type: 'premium',
                status: 'active',
                subscription_status: 'active',
                amount: 100.00,
                currency: 'GHS',
                start_date: new Date().toISOString(),
                end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
              });

            toast({
              title: "Premium Activated!",
              description: "Welcome to Premium! You can now access all chat features.",
            });

            onUpgrade?.();
          } catch (error) {
            console.error('Error updating subscription:', error);
            toast({
              title: "Error",
              description: "Payment successful but there was an error activating premium. Please contact support.",
              variant: "destructive"
            });
          }
        },
        onClose: function() {
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process.",
          });
        }
      });

      handler.openIframe();
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

  return (
    <Card className="border-love-red bg-gradient-to-br from-love-red/5 to-transparent">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-love-red/10 p-3 rounded-full">
            <Crown className="h-8 w-8 text-love-red" />
          </div>
        </div>
        <CardTitle className="text-2xl font-playfair text-christian-navy dark:text-white">
          Upgrade to Premium
        </CardTitle>
        <Badge className="bg-love-red text-white w-fit mx-auto">
          Only ₵100/month
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-growth-green" />
            <span className="text-gray-700 dark:text-gray-300">Unlimited messaging with all members</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-growth-green" />
            <span className="text-gray-700 dark:text-gray-300">Real-time chat with typing indicators</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-growth-green" />
            <span className="text-gray-700 dark:text-gray-300">Premium member badge on your profile</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-growth-green" />
            <span className="text-gray-700 dark:text-gray-300">Priority customer support</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-growth-green" />
            <span className="text-gray-700 dark:text-gray-300">Advanced search filters</span>
          </div>
        </div>

        <Button 
          onClick={handleUpgrade}
          disabled={isLoading}
          className="w-full bg-love-red hover:bg-love-red-dark text-white"
        >
          {isLoading ? 'Processing...' : 'Upgrade Now'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Secure payment powered by Paystack. Cancel anytime.
        </p>
      </CardContent>
    </Card>
  );
};
