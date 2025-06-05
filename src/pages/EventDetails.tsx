
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, Users, ArrowLeft, UserCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  location: string;
  date_time: string;
  max_attendees: number | null;
  current_attendees: number;
  registration_fee: number;
  created_by: string;
}

interface Participant {
  id: string;
  user_id: string;
  joined_at: string;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isParticipant, setIsParticipant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joinLoading, setJoinLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id, user]);

  const fetchEventDetails = async () => {
    try {
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (eventError) throw eventError;
      setEvent(eventData);

      // Fetch participants
      const { data: participantsData, error: participantsError } = await supabase
        .from('event_participants')
        .select(`
          id,
          user_id,
          joined_at,
          profiles:user_id (
            first_name,
            last_name
          )
        `)
        .eq('event_id', id);

      if (participantsError) throw participantsError;
      setParticipants(participantsData || []);

      // Check if current user is a participant
      if (user) {
        const userParticipant = participantsData?.find(p => p.user_id === user.id);
        setIsParticipant(!!userParticipant);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load event details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

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

    setJoinLoading(true);
    try {
      if (isParticipant) {
        // Leave event
        const { error } = await supabase
          .from('event_participants')
          .delete()
          .eq('event_id', event.id)
          .eq('user_id', user.id);

        if (error) throw error;

        toast({
          title: 'Left Event',
          description: 'You have successfully left the event.',
        });
      } else {
        // Join event
        const { error } = await supabase
          .from('event_participants')
          .insert({
            event_id: event.id,
            user_id: user.id,
          });

        if (error) throw error;

        toast({
          title: 'Joined Event',
          description: 'You have successfully joined the event!',
        });
      }

      // Refresh event details
      fetchEventDetails();
    } catch (error) {
      console.error('Error joining/leaving event:', error);
      toast({
        title: 'Error',
        description: 'Failed to update event participation.',
        variant: 'destructive',
      });
    } finally {
      setJoinLoading(false);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
        <Header onOpenAuth={handleOpenAuth} />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-christian-blue mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading event details...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
        <Header onOpenAuth={handleOpenAuth} />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Event Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/find-match')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/find-match')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </div>

            {/* Main Event Card */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl sm:text-3xl mb-2">{event.title}</CardTitle>
                    <Badge variant="outline" className="mb-4">
                      {event.event_type}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={handleJoinEvent}
                      disabled={joinLoading}
                      variant={isParticipant ? "outline" : "default"}
                      className="flex items-center space-x-2"
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>
                        {joinLoading ? 'Processing...' : 
                         isParticipant ? 'Leave Event' : 'Join Event'}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Event Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date_time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(event.date_time).toLocaleTimeString()}</span>
                  </div>
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
                </div>

                {/* Description */}
                {event.description && (
                  <div>
                    <h3 className="font-semibold mb-2">About This Event</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}

                {/* Registration Fee */}
                {event.registration_fee > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      <strong>Registration Fee:</strong> GHS {event.registration_fee}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Participants ({participants.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {participants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Avatar>
                          <AvatarFallback>
                            {participant.profiles?.first_name?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {participant.profiles?.first_name} {participant.profiles?.last_name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Joined {new Date(participant.joined_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No participants yet. Be the first to join!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default EventDetails;
