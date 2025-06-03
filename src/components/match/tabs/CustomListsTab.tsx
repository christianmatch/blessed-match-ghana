
import { Plus, Users, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CustomListsTab = () => {
  const customLists = [
    {
      id: 1,
      name: 'Prayer Partners',
      description: 'Fellow believers I pray with regularly',
      count: 8,
      icon: Heart,
      color: 'text-red-500',
    },
    {
      id: 2,
      name: 'Bible Study Group',
      description: 'Members from my weekly Bible study',
      count: 12,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      id: 3,
      name: 'Favorites',
      description: 'Profiles I want to keep track of',
      count: 5,
      icon: Star,
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Custom Lists
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize and categorize your connections
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customLists.map((list) => {
          const Icon = list.icon;
          return (
            <Card key={list.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${list.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{list.name}</CardTitle>
                    <Badge variant="secondary">{list.count} members</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {list.description}
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View List
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
        <Plus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Create Your First Custom List
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Organize your connections by creating custom lists for prayer partners, Bible study groups, and more.
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create List
        </Button>
      </div>
    </div>
  );
};
