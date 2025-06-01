
import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { StatsSection } from '@/components/StatsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { BibleVerseWidget } from '@/components/BibleVerseWidget';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-christian-light to-white dark:from-surface-dark to-surface-dark-elevated">
      <Header onOpenAuth={handleOpenAuth} />
      <HeroSection onOpenAuth={handleOpenAuth} />
      
      {/* Bible Verse Widget Section */}
      <div className="py-16 bg-gray-50 dark:bg-surface-dark-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <BibleVerseWidget />
          </div>
        </div>
      </div>
      
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection onOpenAuth={handleOpenAuth} />
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

export default Index;
