
import { useState } from 'react';
import { Camera, MapPin, Calendar, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  age: number;
  location: string;
  membershipType: string;
  verified: boolean;
  profileCompletion: number;
}

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload - in real app, upload to storage
      setTimeout(() => {
        setIsUploading(false);
        // Handle successful upload
      }, 2000);
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-christian-blue to-blue-600 relative">
        <div className="absolute inset-0 bg-black/20" />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <Camera className="h-4 w-4 mr-2" />
          Edit Cover
        </Button>
      </div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Profile Picture */}
        <div className="relative -mt-16 mb-4">
          <div className="relative inline-block">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800">
              <AvatarImage src={user.profileImage || undefined} />
              <AvatarFallback className="text-2xl font-semibold bg-christian-blue text-white">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            {/* Upload Button */}
            <label className="absolute bottom-2 right-2 p-2 bg-christian-blue text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
              {user.verified && (
                <CheckCircle className="h-6 w-6 text-blue-500" />
              )}
              <Badge variant={user.membershipType === 'Premium' ? 'default' : 'secondary'}>
                {user.membershipType}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{user.age} years old</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
            <Button>
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Completion
            </span>
            <span className="text-sm font-semibold text-christian-blue">
              {user.profileCompletion}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-christian-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${user.profileCompletion}%` }}
            />
          </div>
          {user.profileCompletion < 100 && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Complete your profile to increase your match potential!
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
