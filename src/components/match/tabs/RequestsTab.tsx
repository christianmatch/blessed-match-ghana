
import { useState, useEffect } from 'react';
import { ProfileCard } from '../ProfileCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const RequestsTab = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMatchRequests();
    }
  }, [user]);

  const fetchMatchRequests = async () => {
    setIsLoading(true);
    try {
      // Mock data for now - in real app, fetch from match_requests table
      const mockIncoming = [
        {
          id: '1',
          first_name: 'Sarah',
          last_name: 'Mensah',
          denomination: 'Methodist',
          church_name: 'Wesley Cathedral',
          address: 'Accra',
          compatibility_score: 85,
          mutual_connections: 3,
          verified: true,
        },
        {
          id: '2',
          first_name: 'David',
          last_name: 'Owusu',
          denomination: 'Presbyterian',
          church_name: 'St. Andrews Church',
          address: 'Kumasi',
          compatibility_score: 78,
          mutual_connections: 1,
          verified: false,
        },
      ];

      const mockOutgoing = [
        {
          id: '3',
          first_name: 'Grace',
          last_name: 'Adu',
          denomination: 'Pentecostal',
          church_name: 'Lighthouse Chapel',
          address: 'Tema',
          compatibility_score: 92,
          mutual_connections: 2,
          verified: true,
        },
      ];

      setIncomingRequests(mockIncoming);
      setOutgoingRequests(mockOutgoing);
    } catch (error) {
      console.error('Error fetching match requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-christian-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Match Requests
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your incoming and outgoing match requests
        </p>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">
            Incoming ({incomingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="outgoing">
            Outgoing ({outgoingRequests.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="incoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incomingRequests.map((profile: any) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                type="request"
              />
            ))}
          </div>
          {incomingRequests.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No incoming requests
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                When someone sends you a match request, it will appear here.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="outgoing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outgoingRequests.map((profile: any) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                showActions={false}
              />
            ))}
          </div>
          {outgoingRequests.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No outgoing requests
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Send match requests to connect with other Christian singles.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
