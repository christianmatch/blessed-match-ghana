
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';

export const LegalCompliance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Legal & Compliance</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage legal documents and compliance</p>
      </div>
      <Card className="text-center p-12">
        <Scale className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <CardTitle className="mb-2">Legal & Compliance Center</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Legal features coming soon...</p>
      </Card>
    </div>
  );
};
