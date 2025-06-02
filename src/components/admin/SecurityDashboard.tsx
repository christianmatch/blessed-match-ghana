
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export const SecurityDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor security events and manage access</p>
      </div>
      <Card className="text-center p-12">
        <Lock className="h-16 w-16 mx-auto mb-4 text-red-600" />
        <CardTitle className="mb-2">Security Center</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Security features coming soon...</p>
      </Card>
    </div>
  );
};
