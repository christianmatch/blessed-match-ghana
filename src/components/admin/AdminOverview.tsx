
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, MessageCircle, TrendingUp, AlertTriangle, DollarSign, Calendar, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminOverview = () => {
  const stats = [
    { label: 'Total Users', value: '12,847', change: '+8.2%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Matches', value: '3,245', change: '+12.5%', icon: Heart, color: 'text-red-600' },
    { label: 'Monthly Revenue', value: 'GHS 45,230', change: '+15.3%', icon: DollarSign, color: 'text-green-600' },
    { label: 'New Signups (30d)', value: '1,842', change: '+6.7%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Pending Reports', value: '23', change: '-12.1%', icon: AlertTriangle, color: 'text-orange-600' },
    { label: 'Messages Today', value: '8,934', change: '+4.2%', icon: MessageCircle, color: 'text-cyan-600' },
  ];

  const recentActivities = [
    { action: 'New user registration', user: 'Sarah Mensah', time: '2 minutes ago', type: 'signup' },
    { action: 'Profile reported', user: 'John Doe', time: '15 minutes ago', type: 'report' },
    { action: 'Premium subscription', user: 'Mary Asante', time: '1 hour ago', type: 'subscription' },
    { action: 'Match created', user: 'David Osei & Grace Amoah', time: '2 hours ago', type: 'match' },
    { action: 'Event registration', user: 'Emmanuel Boateng', time: '3 hours ago', type: 'event' },
  ];

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'signup': return <Badge variant="default">Signup</Badge>;
      case 'report': return <Badge variant="destructive">Report</Badge>;
      case 'subscription': return <Badge variant="secondary">Premium</Badge>;
      case 'match': return <Badge className="bg-pink-100 text-pink-800">Match</Badge>;
      case 'event': return <Badge className="bg-purple-100 text-purple-800">Event</Badge>;
      default: return <Badge variant="outline">Activity</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor and manage Christian Match Ghana</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className={cn(
                      "text-sm",
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    )}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={cn("h-8 w-8", stat.color)} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.user}
                    </p>
                  </div>
                  <div className="text-right">
                    {getActivityBadge(activity.type)}
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">Manage Users</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and manage user accounts</p>
              </button>
              
              <button className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <Shield className="h-6 w-6 text-red-600 mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">Content Review</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review reported content</p>
              </button>
              
              <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-left hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">View detailed reports</p>
              </button>
              
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-left hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <Calendar className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">Events</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage upcoming events</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
