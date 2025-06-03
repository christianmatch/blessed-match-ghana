
import { useState, useEffect } from 'react';
import { ProfileCard } from '../ProfileCard';
import { FaithFilters } from '../FaithFilters';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export const HomeTab = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    denomination: '',
    radius: 50,
    sameDenomination: false,
    nonSmoker: false,
    wantChildren: null as boolean | null,
  });

  useEffect(() => {
    fetchSuggestedProfiles();
  }, [filters]);

  const fetchSuggestedProfiles = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .limit(12);

      if (filters.denomination) {
        query = query.eq('denomination', filters.denomination);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Add mock compatibility scores and mutual connections
      const profilesWithScores = data?.map(profile => ({
        ...profile,
        compatibility_score: Math.floor(Math.random() * 40) + 60, // 60-100%
        mutual_connections: Math.floor(Math.random() * 5),
        church_attendance: ['Weekly', 'Bi-weekly', 'Monthly'][Math.floor(Math.random() * 3)],
        verified: Math.random() > 0.5,
      })) || [];

      setProfiles(profilesWithScores);
    } catch (error) {
      console.error('Error fetching profiles:', error);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Suggested Matches
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover Christian singles who share your faith and values
          </p>
        </div>
        <FaithFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile: any) => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            type="suggestion"
          />
        ))}
      </div>

      {profiles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No matches found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters to discover more Christian singles.
          </p>
        </div>
      )}
    </div>
  );
};
