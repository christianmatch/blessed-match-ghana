
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export const CommunityAndSafety = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community & Safety</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage community guidelines and user safety</p>
      </div>
      <Card className="text-center p-12">
        <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-red-600" />
        <CardTitle className="mb-2">Community & Safety Center</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Safety features coming soon...</p>
      </Card>
    </div>
  );
};
