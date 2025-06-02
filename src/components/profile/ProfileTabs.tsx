
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoTab } from './tabs/PersonalInfoTab';
import { PreferencesTab } from './tabs/PreferencesTab';
import { PhotosTab } from './tabs/PhotosTab';
import { SecurityTab } from './tabs/SecurityTab';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  age: number;
  location: string;
  church: string;
  denomination: string;
  occupation: string;
  education: string;
  relationshipStatus: string;
}

interface ProfileTabsProps {
  user: User;
}

export const ProfileTabs = ({ user }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="mt-6">
        <PersonalInfoTab user={user} />
      </TabsContent>
      
      <TabsContent value="preferences" className="mt-6">
        <PreferencesTab />
      </TabsContent>
      
      <TabsContent value="photos" className="mt-6">
        <PhotosTab />
      </TabsContent>
      
      <TabsContent value="security" className="mt-6">
        <SecurityTab user={user} />
      </TabsContent>
    </Tabs>
  );
};
