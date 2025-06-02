
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export const SubscriptionManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage user subscriptions and payments</p>
      </div>
      <Card className="text-center p-12">
        <CreditCard className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <CardTitle className="mb-2">Subscription Management</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Subscription features coming soon...</p>
      </Card>
    </div>
  );
};
