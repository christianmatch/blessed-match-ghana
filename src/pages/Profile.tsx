
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';

const Profile = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Mock user data - in real app this would come from authentication/database
  const mockUser = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Mensah',
    email: 'sarah.mensah@example.com',
    phone: '+233 24 123 4567',
    profileImage: null,
    bio: 'A devoted Christian seeking a God-fearing partner to share life\'s journey. I love reading the Bible, volunteering at church, and spending time in nature.',
    age: 28,
    location: 'Accra, Ghana',
    church: 'Grace Baptist Church',
    denomination: 'Baptist',
    occupation: 'Teacher',
    education: 'Bachelor\'s Degree',
    relationshipStatus: 'Single',
    membershipType: 'Premium',
    joinDate: '2024-01-15',
    lastActive: new Date().toISOString(),
    verified: true,
    profileCompletion: 85
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Profile Header */}
          <ProfileHeader user={mockUser} />
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar user={mockUser} />
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <ProfileTabs user={mockUser} />
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

export default Profile;
