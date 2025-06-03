
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, MessageCircle, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ChatAccessGate } from '@/components/premium/ChatAccessGate';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

interface Conversation {
  id: string;
  last_message_at: string;
  participants: any[];
}

export const ChatSystem = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchConversations();
      
      // Subscribe to real-time updates
      const channel = supabase
        .channel('chat-updates')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
          },
          (payload) => {
            if (payload.new.conversation_id === activeConversation) {
              setMessages(prev => [...prev, payload.new as Message]);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, activeConversation]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          conversations (
            id,
            last_message_at,
            conversation_participants (
              user_id,
              profiles (
                first_name,
                last_name,
                profile_image_url
              )
            )
          )
        `)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      const formattedConversations = data?.map(item => ({
        id: item.conversation_id,
        last_message_at: item.conversations?.last_message_at || '',
        participants: item.conversations?.conversation_participants || []
      })) || [];

      setConversations(formattedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages.",
        variant: "destructive"
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: activeConversation,
          sender_id: user?.id,
          content: newMessage.trim(),
        });

      if (error) throw error;
      
      setNewMessage('');
      
      // Update conversation last message time
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', activeConversation);
        
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive"
      });
    }
  };

  const selectConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    fetchMessages(conversationId);
  };

  return (
    <ChatAccessGate>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
              <Badge className="bg-love-red text-white">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet. Start chatting with matches!
                </div>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => selectConversation(conversation.id)}
                    className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b ${
                      activeConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-christian-blue rounded-full flex items-center justify-center text-white font-semibold">
                        {conversation.participants.find(p => p.user_id !== user?.id)?.profiles?.first_name?.[0] || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {conversation.participants.find(p => p.user_id !== user?.id)?.profiles?.first_name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(conversation.last_message_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {activeConversation ? (
            <>
              <CardHeader>
                <CardTitle>Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-80">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === user?.id
                            ? 'bg-christian-blue text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-christian-blue hover:bg-christian-blue/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </ChatAccessGate>
  );
};
