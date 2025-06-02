
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const MarketingTools = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Marketing Tools</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage marketing campaigns and referrals</p>
      </div>
      <Card className="text-center p-12">
        <TrendingUp className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <CardTitle className="mb-2">Marketing Suite</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Marketing features coming soon...</p>
      </Card>
    </div>
  );
};
