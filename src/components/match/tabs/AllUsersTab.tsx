
import { useState, useEffect } from 'react';
import { ProfileCard } from '../ProfileCard';
import { FaithFilters } from '../FaithFilters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export const AllUsersTab = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    denomination: '',
    radius: 50,
    sameDenomination: false,
    nonSmoker: false,
    wantChildren: null as boolean | null,
  });

  useEffect(() => {
    fetchAllProfiles();
  }, [filters, searchQuery]);

  const fetchAllProfiles = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select('*');

      if (searchQuery) {
        query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`);
      }

      if (filters.denomination) {
        query = query.eq('denomination', filters.denomination);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      const profilesWithScores = data?.map(profile => ({
        ...profile,
        compatibility_score: Math.floor(Math.random() * 100),
        mutual_connections: Math.floor(Math.random() * 8),
        church_attendance: ['Weekly', 'Bi-weekly', 'Monthly', 'Occasionally'][Math.floor(Math.random() * 4)],
        verified: Math.random() > 0.3,
      })) || [];

      setProfiles(profilesWithScores);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Users
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse all Christian singles on the platform
          </p>
        </div>
        <FaithFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-christian-blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile: any) => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
            />
          ))}
        </div>
      )}

      {!isLoading && profiles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No profiles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};
