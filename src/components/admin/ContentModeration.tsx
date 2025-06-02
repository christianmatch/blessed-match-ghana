
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Eye, Flag, Image, MessageSquare, User } from 'lucide-react';

export const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState('profiles');

  const pendingProfiles = [
    {
      id: '1',
      user: 'Emmanuel Boateng',
      type: 'profile',
      content: 'New profile registration',
      submittedAt: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      user: 'Grace Amoah',
      type: 'profile',
      content: 'Profile information update',
      submittedAt: '4 hours ago',
      status: 'pending'
    },
  ];

  const pendingPhotos = [
    {
      id: '1',
      user: 'David Osei',
      type: 'photo',
      content: 'Profile photo upload',
      submittedAt: '1 hour ago',
      status: 'pending',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      user: 'Abena Serwaa',
      type: 'photo',
      content: 'Gallery photo upload',
      submittedAt: '3 hours ago',
      status: 'pending',
      imageUrl: '/placeholder.svg'
    },
  ];

  const reportedContent = [
    {
      id: '1',
      reportedUser: 'John Doe',
      reportedBy: 'Sarah Mensah',
      type: 'inappropriate_content',
      reason: 'Inappropriate profile photo',
      submittedAt: '30 minutes ago',
      status: 'open'
    },
    {
      id: '2',
      reportedUser: 'Michael Smith',
      reportedBy: 'Mary Asante',
      type: 'harassment',
      reason: 'Sending inappropriate messages',
      submittedAt: '2 hours ago',
      status: 'investigating'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'approved': return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      case 'open': return <Badge className="bg-yellow-100 text-yellow-800">Open</Badge>;
      case 'investigating': return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Moderation</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and moderate user-generated content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">45</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">234</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">18</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rejected Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profiles">Profile Reviews</TabsTrigger>
          <TabsTrigger value="photos">Photo Reviews</TabsTrigger>
          <TabsTrigger value="reports">User Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Pending Profile Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingProfiles.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.user}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.content}</p>
                      <p className="text-xs text-gray-500">{item.submittedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="default">
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Pending Photo Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingPhotos.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <img 
                      src={item.imageUrl} 
                      alt="Pending review" 
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.user}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.content}</p>
                      <p className="text-xs text-gray-500">{item.submittedAt}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" className="flex-1">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="flex-1">
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                User Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedContent.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Report against {report.reportedUser}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reported by: {report.reportedBy}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reason: {report.reason}
                      </p>
                      <p className="text-xs text-gray-500">{report.submittedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(report.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Flag className="h-4 w-4 mr-1" />
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
