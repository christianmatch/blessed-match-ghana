
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export const PerformanceMonitoring = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Monitoring</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor system performance and uptime</p>
      </div>
      <Card className="text-center p-12">
        <Activity className="h-16 w-16 mx-auto mb-4 text-orange-600" />
        <CardTitle className="mb-2">Performance Dashboard</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Performance monitoring coming soon...</p>
      </Card>
    </div>
  );
};
