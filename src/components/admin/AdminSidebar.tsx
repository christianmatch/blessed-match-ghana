
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Users, Shield, Heart, Megaphone, BarChart3, 
  CreditCard, ShieldCheck, FileText, Settings, HeadphonesIcon, 
  Calendar, Lock, TrendingUp, Scale, Activity 
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'moderation', label: 'Content Moderation', icon: Shield },
    { id: 'matches', label: 'Match Management', icon: Heart },
    { id: 'communication', label: 'Communication', icon: Megaphone },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'safety', label: 'Community & Safety', icon: ShieldCheck },
    { id: 'blog', label: 'Blog & Content', icon: FileText },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'support', label: 'Customer Support', icon: HeadphonesIcon },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'legal', label: 'Legal & Compliance', icon: Scale },
    { id: 'performance', label: 'Performance', icon: Activity },
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Admin Dashboard
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "bg-christian-blue text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
