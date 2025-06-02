
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const EventManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Event Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Create and manage Christian dating events</p>
      </div>
      <Card className="text-center p-12">
        <Calendar className="h-16 w-16 mx-auto mb-4 text-purple-600" />
        <CardTitle className="mb-2">Event Management</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Event features coming soon...</p>
      </Card>
    </div>
  );
};
