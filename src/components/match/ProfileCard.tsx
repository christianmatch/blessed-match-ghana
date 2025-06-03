
import { useState } from 'react';
import { Heart, MapPin, CheckCircle, X, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileCardProps {
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image_url?: string;
    denomination?: string;
    church_name?: string;
    bio?: string;
    address?: string;
    compatibility_score?: number;
    mutual_connections?: number;
    church_attendance?: string;
    verified?: boolean;
  };
  showActions?: boolean;
  type?: 'suggestion' | 'request' | 'regular';
}

export const ProfileCard = ({ profile, showActions = true, type = 'regular' }: ProfileCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const sendMatchRequest = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check if user has premium subscription
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('plan_type', 'premium')
        .eq('status', 'active')
        .single();

      if (!subscription) {
        toast({
          title: "Premium Required",
          description: "Upgrade to premium to send match requests",
          variant: "destructive"
        });
        return;
      }

      // Send match request logic would go here
      toast({
        title: "Match Request Sent!",
        description: `Your request has been sent to ${profile.first_name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send match request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendPrayer = async () => {
    toast({
      title: "Prayer Sent",
      description: `You've sent a prayer for ${profile.first_name}`,
    });
  };

  const hideProfile = () => {
    setIsHidden(true);
    toast({
      title: "Profile Hidden",
      description: "This profile has been hidden from your suggestions",
    });
  };

  const getCompatibilityColor = (score?: number) => {
    if (!score) return 'bg-gray-500';
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCompatibilityLabel = (score?: number) => {
    if (!score) return 'Unknown';
    if (score >= 80) return 'Excellent Match';
    if (score >= 50) return 'Good Match';
    return 'Fair Match';
  };

  if (isHidden) return null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Header with profile image */}
        <div className="relative h-48 bg-gradient-to-br from-christian-blue to-blue-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end space-x-4">
              <Avatar className="w-20 h-20 border-4 border-white">
                <AvatarImage src={profile.profile_image_url} />
                <AvatarFallback className="text-lg font-semibold bg-white text-christian-blue">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-white">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold">
                    {profile.first_name} {profile.last_name}
                  </h3>
                  {profile.verified && (
                    <CheckCircle className="h-5 w-5 text-blue-300" />
                  )}
                </div>
                {profile.address && (
                  <div className="flex items-center space-x-1 text-sm opacity-90">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Faith Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {profile.denomination && (
                  <Badge variant="outline" className="text-christian-blue border-christian-blue">
                    {profile.denomination}
                  </Badge>
                )}
                {profile.church_name && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {profile.church_name}
                  </p>
                )}
              </div>
              {profile.compatibility_score && (
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getCompatibilityColor(profile.compatibility_score)}`}>
                    {profile.compatibility_score}% Match
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getCompatibilityLabel(profile.compatibility_score)}
                  </p>
                </div>
              )}
            </div>

            {profile.church_attendance && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Church Attendance: {profile.church_attendance}
              </p>
            )}

            {profile.mutual_connections && profile.mutual_connections > 0 && (
              <p className="text-sm text-christian-blue">
                {profile.mutual_connections} mutual connections
              </p>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {profile.bio}
            </p>
          )}

          {/* Actions */}
          {showActions && (
            <div className="flex space-x-2">
              {type === 'request' ? (
                <>
                  <Button className="flex-1" onClick={sendMatchRequest}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={hideProfile}>
                    <X className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="flex-1" 
                    onClick={sendMatchRequest}
                    disabled={isLoading}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Send Request
                  </Button>
                  <Button variant="outline" onClick={sendPrayer}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Pray
                  </Button>
                  <Button variant="ghost" size="icon" onClick={hideProfile}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
