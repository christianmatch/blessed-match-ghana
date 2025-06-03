
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { MatchSidebar } from '@/components/match/MatchSidebar';
import { MatchContent } from '@/components/match/MatchContent';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const FindMatch = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useAuth();

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Redirect to home if not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 h-screen">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <MatchSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <MatchContent activeTab={activeTab} />
            </div>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default FindMatch;
