
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Heart, Users } from 'lucide-react';

const Pricing = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      description: "Perfect for starting your faith journey",
      features: [
        "Create a profile",
        "Browse member profiles",
        "Send 3 messages per month",
        "Basic search filters",
        "Access to blog articles",
        "Community events updates"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      icon: <Users className="h-6 w-6" />
    },
    {
      name: "Premium",
      price: "₵50",
      period: "per month",
      description: "Enhanced features for serious Christians",
      features: [
        "Everything in Basic",
        "Unlimited messaging",
        "Advanced search filters",
        "See who viewed your profile",
        "Priority customer support",
        "Profile verification badge",
        "Video call integration",
        "Relationship coaching resources"
      ],
      buttonText: "Choose Premium",
      buttonVariant: "default" as const,
      popular: true,
      icon: <Star className="h-6 w-6" />
    },
    {
      name: "Platinum",
      price: "₵100",
      period: "per month",
      description: "Complete experience with personal guidance",
      features: [
        "Everything in Premium",
        "Personal relationship counselor",
        "Monthly video consultations",
        "Event priority access",
        "Profile boost feature",
        "Background verification",
        "Wedding planning resources",
        "Exclusive member events"
      ],
      buttonText: "Choose Platinum",
      buttonVariant: "default" as const,
      icon: <Heart className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find the perfect plan to support your journey to finding a God-centered relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow ${
                  plan.popular ? 'ring-2 ring-love-red' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-love-red text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.popular ? 'bg-love-red text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-playfair text-christian-navy dark:text-white">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-love-red">{plan.price}</span>
                    {plan.period !== "Forever" && (
                      <span className="text-gray-600 dark:text-gray-300 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-growth-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.buttonVariant === 'default' 
                        ? 'bg-love-red hover:bg-love-red-dark text-white' 
                        : 'border-love-red text-love-red hover:bg-love-red hover:text-white'
                    }`}
                    onClick={() => handleOpenAuth('signup')}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-playfair font-bold text-center text-christian-navy dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-christian-navy dark:text-white mb-2">
                    Can I change my plan anytime?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-christian-navy dark:text-white mb-2">
                    Is my payment information secure?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Absolutely. We use Stripe for secure payment processing and never store your payment details.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-christian-navy dark:text-white mb-2">
                    What if I don't find a match?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We're committed to helping you succeed. Our counselors provide guidance and support throughout your journey.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-christian-navy dark:text-white mb-2">
                    Are all members verified Christians?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We verify church membership and faith commitment for all Premium and Platinum members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default Pricing;
