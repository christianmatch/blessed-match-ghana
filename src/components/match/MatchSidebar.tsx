
import { Home, Heart, Users, MapPin, List, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MatchSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MatchSidebar = ({ activeTab, onTabChange }: MatchSidebarProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'requests', label: 'Match Requests', icon: Heart },
    { id: 'suggestions', label: 'Suggestions', icon: Users },
    { id: 'all-users', label: 'All Users', icon: Users },
    { id: 'events', label: 'Nearby Events', icon: MapPin },
    { id: 'custom-lists', label: 'Custom Lists', icon: List },
  ];

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Find Match</h2>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
