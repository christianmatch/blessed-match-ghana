
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const BlogManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog & Content Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Create and manage blog posts and content</p>
      </div>
      <Card className="text-center p-12">
        <FileText className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <CardTitle className="mb-2">Blog Management</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">Blog management features coming soon...</p>
      </Card>
    </div>
  );
};
