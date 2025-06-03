
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const EventsTab = () => {
  const events = [
    {
      id: 1,
      title: 'Singles Fellowship Night',
      date: '2024-02-15',
      time: '6:00 PM',
      location: 'Lighthouse Chapel International, Accra',
      attendees: 45,
      type: 'Fellowship',
      description: 'Join us for an evening of worship, fellowship, and connection with other Christian singles.',
    },
    {
      id: 2,
      title: 'Christian Singles Volleyball',
      date: '2024-02-18',
      time: '4:00 PM',
      location: 'University of Ghana Sports Complex',
      attendees: 28,
      type: 'Sports',
      description: 'Fun volleyball games followed by refreshments and mingling.',
    },
    {
      id: 3,
      title: 'Prayer & Praise Night',
      date: '2024-02-22',
      time: '7:00 PM',
      location: 'Methodist Church Cathedral, Accra',
      attendees: 62,
      type: 'Prayer',
      description: 'An evening dedicated to prayer, praise, and seeking God\'s will in relationships.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nearby Christian Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with other Christian singles at upcoming events in your area
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge variant="outline" className="mt-2">
                    {event.type}
                  </Badge>
                </div>
                <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  Join Event
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
