
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Reporting</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive analytics and insights</p>
      </div>
      <Card className="text-center p-12">
        <BarChart3 className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <CardTitle className="mb-2">Analytics Dashboard</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Advanced analytics coming soon...</p>
      </Card>
    </div>
  );
};
