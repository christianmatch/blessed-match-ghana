
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, Users, Target } from 'lucide-react';

export const MatchManagement = () => {
  const matchStats = [
    { label: 'Total Matches Made', value: '3,245', change: '+12.5%', icon: Heart },
    { label: 'Success Rate', value: '78.4%', change: '+3.2%', icon: Target },
    { label: 'Active Conversations', value: '1,892', change: '+8.7%', icon: Users },
    { label: 'Matches This Week', value: '156', change: '+15.3%', icon: TrendingUp },
  ];

  const recentMatches = [
    {
      id: '1',
      user1: 'Sarah Mensah',
      user2: 'David Osei',
      compatibility: '92%',
      status: 'mutual',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      user1: 'Grace Amoah',
      user2: 'Emmanuel Boateng',
      compatibility: '87%',
      status: 'pending',
      createdAt: '5 hours ago'
    },
    {
      id: '3',
      user1: 'Mary Asante',
      user2: 'John Doe',
      compatibility: '94%',
      status: 'mutual',
      createdAt: '1 day ago'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'mutual': return <Badge className="bg-green-100 text-green-800">Mutual</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'expired': return <Badge variant="outline">Expired</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Match Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor and optimize matching algorithms</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {matchStats.map((stat, index) => {
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
                    <p className="text-sm text-green-600">{stat.change} from last week</p>
                  </div>
                  <Icon className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {match.user1} & {match.user2}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Compatibility: {match.compatibility}
                    </p>
                    <p className="text-xs text-gray-500">{match.createdAt}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(match.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Match Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Match Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Compatibility Score</span>
                <span className="text-lg font-bold text-green-600">85.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Response Rate</span>
                <span className="text-lg font-bold text-blue-600">72.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Conversation Conversion</span>
                <span className="text-lg font-bold text-purple-600">64.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Meeting Success Rate</span>
                <span className="text-lg font-bold text-orange-600">42.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Algorithm Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Matching Algorithm Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Target className="h-6 w-6 mb-2" />
              Adjust Algorithm
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manual Matching
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              A/B Test Matches
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
