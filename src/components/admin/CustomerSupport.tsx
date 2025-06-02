
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeadphonesIcon } from 'lucide-react';

export const CustomerSupport = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Support</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage support tickets and customer inquiries</p>
      </div>
      <Card className="text-center p-12">
        <HeadphonesIcon className="h-16 w-16 mx-auto mb-4 text-purple-600" />
        <CardTitle className="mb-2">Support Center</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Support features coming soon...</p>
      </Card>
    </div>
  );
};
