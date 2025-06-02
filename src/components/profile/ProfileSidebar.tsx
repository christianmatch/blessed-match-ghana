
import { Church, GraduationCap, Briefcase, Heart, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface User {
  church: string;
  denomination: string;
  occupation: string;
  education: string;
  relationshipStatus: string;
  joinDate: string;
  lastActive: string;
}

interface ProfileSidebarProps {
  user: User;
}

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLastActiveText = (dateString: string) => {
    const now = new Date();
    const lastActive = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `Active ${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Active ${diffInDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Quick Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Church className="h-5 w-5 text-christian-blue" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{user.church}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.denomination}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-christian-blue" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{user.occupation}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Profession</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-christian-blue" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{user.education}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Education</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-christian-blue" />
            <div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {user.relationshipStatus}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {getLastActiveText(user.lastActive)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last seen</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-christian-blue" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(user.joinDate)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Member since</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Button className="w-full" variant="outline">
            Share Profile
          </Button>
          <Button className="w-full" variant="outline">
            Download Profile
          </Button>
          <Button className="w-full" variant="destructive">
            Report Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
