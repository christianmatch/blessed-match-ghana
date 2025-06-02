
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Mail, Bell, MessageSquare } from 'lucide-react';

export const CommunicationTools = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Communication Tools</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage announcements, messages, and notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center p-6">
          <Megaphone className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <CardTitle className="mb-2">Announcements</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Send site-wide announcements</p>
          <Button>Create Announcement</Button>
        </Card>

        <Card className="text-center p-6">
          <Mail className="h-12 w-12 mx-auto mb-4 text-green-600" />
          <CardTitle className="mb-2">Email Campaigns</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage email marketing</p>
          <Button>Create Campaign</Button>
        </Card>

        <Card className="text-center p-6">
          <Bell className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
          <CardTitle className="mb-2">Push Notifications</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Send push notifications</p>
          <Button>Send Notification</Button>
        </Card>

        <Card className="text-center p-6">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-purple-600" />
          <CardTitle className="mb-2">Broadcast Messages</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Message user segments</p>
          <Button>Create Broadcast</Button>
        </Card>
      </div>
    </div>
  );
};
