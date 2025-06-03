
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { ChatSystem } from '@/components/chat/ChatSystem';

const Chat = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
              Premium Chat
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Connect with your matches through real-time messaging
            </p>
          </div>
          
          <ChatSystem />
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

export default Chat;
