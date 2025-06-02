
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure system settings and preferences</p>
      </div>
      <Card className="text-center p-12">
        <Settings className="h-16 w-16 mx-auto mb-4 text-gray-600" />
        <CardTitle className="mb-2">System Configuration</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">System settings coming soon...</p>
      </Card>
    </div>
  );
};
