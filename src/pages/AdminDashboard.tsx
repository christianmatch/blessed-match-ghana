
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { UserManagement } from '@/components/admin/UserManagement';
import { ContentModeration } from '@/components/admin/ContentModeration';
import { MatchManagement } from '@/components/admin/MatchManagement';
import { CommunicationTools } from '@/components/admin/CommunicationTools';
import { Analytics } from '@/components/admin/Analytics';
import { SubscriptionManagement } from '@/components/admin/SubscriptionManagement';
import { CommunityAndSafety } from '@/components/admin/CommunityAndSafety';
import { BlogManagement } from '@/components/admin/BlogManagement';
import { SystemSettings } from '@/components/admin/SystemSettings';
import { CustomerSupport } from '@/components/admin/CustomerSupport';
import { EventManagement } from '@/components/admin/EventManagement';
import { SecurityDashboard } from '@/components/admin/SecurityDashboard';
import { MarketingTools } from '@/components/admin/MarketingTools';
import { LegalCompliance } from '@/components/admin/LegalCompliance';
import { PerformanceMonitoring } from '@/components/admin/PerformanceMonitoring';

const AdminDashboard = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeSection, setActiveSection] = useState('overview');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview />;
      case 'users':
        return <UserManagement />;
      case 'moderation':
        return <ContentModeration />;
      case 'matches':
        return <MatchManagement />;
      case 'communication':
        return <CommunicationTools />;
      case 'analytics':
        return <Analytics />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'safety':
        return <CommunityAndSafety />;
      case 'blog':
        return <BlogManagement />;
      case 'settings':
        return <SystemSettings />;
      case 'support':
        return <CustomerSupport />;
      case 'events':
        return <EventManagement />;
      case 'security':
        return <SecurityDashboard />;
      case 'marketing':
        return <MarketingTools />;
      case 'legal':
        return <LegalCompliance />;
      case 'performance':
        return <PerformanceMonitoring />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <div className="pt-16 flex">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

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

export default AdminDashboard;
