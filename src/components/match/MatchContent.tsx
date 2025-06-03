
import { HomeTab } from './tabs/HomeTab';
import { RequestsTab } from './tabs/RequestsTab';
import { SuggestionsTab } from './tabs/SuggestionsTab';
import { AllUsersTab } from './tabs/AllUsersTab';
import { EventsTab } from './tabs/EventsTab';
import { CustomListsTab } from './tabs/CustomListsTab';

interface MatchContentProps {
  activeTab: string;
}

export const MatchContent = ({ activeTab }: MatchContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'requests':
        return <RequestsTab />;
      case 'suggestions':
        return <SuggestionsTab />;
      case 'all-users':
        return <AllUsersTab />;
      case 'events':
        return <EventsTab />;
      case 'custom-lists':
        return <CustomListsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
};
