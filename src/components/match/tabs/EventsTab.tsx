
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateEventModal } from '../CreateEventModal';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  date_time: string;
  location: string;
  current_attendees: number;
  max_attendees: number | null;
  event_type: string;
  description: string;
  registration_fee: number;
}

export const EventsTab = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchUserParticipation();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .gte('date_time', new Date().toISOString())
        .order('date_time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to load events.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserParticipation = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('event_participants')
        .select('event_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const participantEventIds = new Set(data?.map(p => p.event_id) || []);
      setJoinedEvents(participantEventIds);
    } catch (error) {
      console.error('Error fetching user participation:', error);
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to join events.',
        variant: 'destructive',
      });
      return;
    }

    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Check if event is full
    if (event.max_attendees && event.current_attendees >= event.max_attendees) {
      toast({
        title: 'Event Full',
        description: 'This event has reached its maximum capacity.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const isJoined = joinedEvents.has(eventId);
      
      if (isJoined) {
        // Leave event
        const { error } = await supabase
          .from('event_participants')
          .delete()
          .eq('event_id', eventId)
          .eq('user_id', user.id);

        if (error) throw error;

        setJoinedEvents(prev => {
          const newSet = new Set(prev);
          newSet.delete(eventId);
          return newSet;
        });

        toast({
          title: 'Left Event',
          description: 'You have successfully left the event.',
        });
      } else {
        // Join event
        const { error } = await supabase
          .from('event_participants')
          .insert({
            event_id: eventId,
            user_id: user.id,
          });

        if (error) throw error;

        setJoinedEvents(prev => new Set([...prev, eventId]));

        toast({
          title: 'Joined Event',
          description: 'You have successfully joined the event!',
        });
      }

      // Refresh events to update attendee count
      fetchEvents();
    } catch (error) {
      console.error('Error joining/leaving event:', error);
      toast({
        title: 'Error',
        description: 'Failed to update event participation.',
        variant: 'destructive',
      });
    }
  };

  const handleEventCreated = () => {
    fetchEvents();
    if (user) {
      fetchUserParticipation();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nearby Christian Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with other Christian singles at upcoming events in your area
            </p>
          </div>
        </div>
        
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-christian-blue mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nearby Christian Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with other Christian singles at upcoming events in your area
          </p>
        </div>
        
        <CreateEventModal onEventCreated={handleEventCreated} />
      </div>

      {events.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Upcoming Events
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There are no upcoming events at the moment. Be the first to create one!
            </p>
            <CreateEventModal onEventCreated={handleEventCreated} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => {
            const isJoined = joinedEvents.has(event.id);
            const isFull = event.max_attendees && event.current_attendees >= event.max_attendees;
            
            return (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {event.event_type}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date_time).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(event.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2">
                    {event.location && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.current_attendees}
                        {event.max_attendees && ` / ${event.max_attendees}`} attending
                      </span>
                    </div>
                    {event.registration_fee > 0 && (
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        Fee: GHS {event.registration_fee}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={() => handleJoinEvent(event.id)}
                      disabled={!user || (isFull && !isJoined)}
                      variant={isJoined ? "outline" : "default"}
                      className="flex-1"
                    >
                      {!user ? 'Login to Join' :
                       isFull && !isJoined ? 'Event Full' :
                       isJoined ? 'Leave Event' : 'Join Event'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
