
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Shield, Award, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const About = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const steps = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Share your faith journey and what you're looking for in a Christian partner.",
      icon: <Users className="h-8 w-8 text-love-red" />
    },
    {
      step: 2,
      title: "Connect with Faith",
      description: "Browse profiles of committed Christians who share your values and beliefs.",
      icon: <Heart className="h-8 w-8 text-love-red" />
    },
    {
      step: 3,
      title: "Build Relationships",
      description: "Start meaningful conversations and build relationships centered on Christ.",
      icon: <Shield className="h-8 w-8 text-love-red" />
    }
  ];

  const team = [
    {
      name: "Pastor Emmanuel Asante",
      role: "Founder & Spiritual Director",
      church: "Calvary Baptist Church",
      image: "/placeholder.svg"
    },
    {
      name: "Grace Osei",
      role: "Community Manager",
      church: "Victory Chapel",
      image: "/placeholder.svg"
    },
    {
      name: "David Mensah",
      role: "Relationship Counselor",
      church: "Living Faith Ministry",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
              About Christian Match Ghana
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Founded on biblical principles, we're dedicated to helping Christians in Ghana find meaningful, 
              God-centered relationships that lead to marriage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "He who finds a wife finds what is good and receives favor from the Lord." - Proverbs 18:22
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We believe that God has a perfect plan for every Christian's life, including their relationships. 
                Our platform is designed to connect believers who are seeking marriage based on shared faith, 
                values, and commitment to Christ.
              </p>
              <Button 
                onClick={() => handleOpenAuth('signup')}
                className="bg-love-red hover:bg-love-red-dark text-white"
              >
                Join Our Community
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-christian-cream to-white dark:from-surface-dark-elevated dark:to-surface-dark p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-love-red mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-300">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-growth-green mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-300">Success Stories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-highlight-yellow mb-2">25+</div>
                  <div className="text-gray-600 dark:text-gray-300">Church Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-christian-blue mb-2">100%</div>
                  <div className="text-gray-600 dark:text-gray-300">Faith-Centered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Process */}
        <div className="bg-gray-50 dark:bg-surface-dark-elevated py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
                Our Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simple steps to finding your God-ordained partner
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={step.step} className="bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="bg-love-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="text-sm font-semibold text-love-red mb-2">Step {step.step}</div>
                    <h3 className="text-xl font-semibold text-christian-navy dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
              Our Ministry Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dedicated servants committed to helping you find your life partner
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-christian-navy dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-love-red font-medium mb-1">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.church}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Church Partners */}
        <div className="bg-gray-50 dark:bg-surface-dark-elevated py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-8">
              Church Partners
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Partnering with churches across Ghana to build strong Christian marriages
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Church Logo</span>
                </div>
              ))}
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

export default About;
