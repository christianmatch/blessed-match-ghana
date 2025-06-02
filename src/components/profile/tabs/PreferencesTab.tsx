
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export const PreferencesTab = () => {
  const preferences = {
    ageRange: '25-35',
    location: 'Greater Accra',
    denomination: 'Any Christian',
    education: 'University Degree',
    lifestyle: ['Non-smoker', 'Occasional Drinker', 'Active'],
    interests: ['Bible Study', 'Traveling', 'Cooking', 'Reading', 'Church Activities']
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Match Preferences</CardTitle>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Edit Preferences
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Age Range</h4>
              <Badge variant="outline">{preferences.ageRange} years</Badge>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
              <Badge variant="outline">{preferences.location}</Badge>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Denomination</h4>
              <Badge variant="outline">{preferences.denomination}</Badge>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Education</h4>
              <Badge variant="outline">{preferences.education}</Badge>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Lifestyle Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {preferences.lifestyle.map((item, index) => (
                <Badge key={index} variant="secondary">{item}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Shared Interests</h4>
            <div className="flex flex-wrap gap-2">
              {preferences.interests.map((interest, index) => (
                <Badge key={index} variant="outline" className="text-christian-blue border-christian-blue">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
