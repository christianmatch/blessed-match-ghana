
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CommentsSection } from './CommentsSection';
import { ShareModal } from './ShareModal';

interface PhotoCardProps {
  photo: {
    id: string;
    image_url: string;
    caption: string;
    event_name: string | null;
    faith_moment_tag: string | null;
    likes_count: number;
    comments_count: number;
    reposts_count: number;
    created_at: string;
    user_id: string;
    profiles: { first_name: string; last_name: string } | null;
  };
  currentUser: any;
  onUpdate: () => void;
}

export const PhotoCard = ({ photo, currentUser, onUpdate }: PhotoCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(photo.likes_count);
  const [isLiking, setIsLiking] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    if (!currentUser) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like photos",
        variant: "destructive"
      });
      return;
    }

    setIsLiking(true);

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('photo_likes')
          .delete()
          .eq('photo_id', photo.id)
          .eq('user_id', currentUser.id);

        if (error) throw error;

        // Update likes count in gallery_photos
        await supabase
          .from('gallery_photos')
          .update({ likes_count: Math.max(0, likesCount - 1) })
          .eq('id', photo.id);

        setIsLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        // Like
        const { error } = await supabase
          .from('photo_likes')
          .insert({
            photo_id: photo.id,
            user_id: currentUser.id
          });

        if (error) throw error;

        // Update likes count in gallery_photos
        await supabase
          .from('gallery_photos')
          .update({ likes_count: likesCount + 1 })
          .eq('id', photo.id);

        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Like error:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLiking(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <>
      <Card className="bg-white dark:bg-charcoal-gray border-sacred-blue/20 dark:border-celestial-teal/20 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-sacred-blue text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-deep-maroon dark:text-divine-gold">
                {photo.profiles ? `${photo.profiles.first_name} ${photo.profiles.last_name}` : 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatTimeAgo(photo.created_at)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img 
            src={photo.image_url} 
            alt={photo.caption}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardContent className="p-4">
          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={`p-2 ${isLiked ? 'text-love-red' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="p-2 text-gray-600 dark:text-gray-400"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowShareModal(true)}
                className="p-2 text-gray-600 dark:text-gray-400"
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Likes and engagement stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span>{likesCount} likes</span>
            <span>{photo.comments_count} comments</span>
            {photo.reposts_count > 0 && <span>{photo.reposts_count} shares</span>}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {photo.event_name && (
              <Badge className="bg-graceful-green/10 text-graceful-green border-graceful-green/20">
                {photo.event_name}
              </Badge>
            )}
            {photo.faith_moment_tag && (
              <Badge className="bg-divine-gold/10 text-divine-gold border-divine-gold/20">
                {photo.faith_moment_tag}
              </Badge>
            )}
          </div>

          {/* Caption */}
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {photo.caption}
          </p>

          {/* View Comments Button */}
          {photo.comments_count > 0 && !showComments && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(true)}
              className="mt-2 p-0 h-auto text-gray-500 hover:text-sacred-blue"
            >
              View all {photo.comments_count} comments
            </Button>
          )}
        </CardContent>

        {/* Comments Section */}
        {showComments && (
          <CommentsSection
            photoId={photo.id}
            currentUser={currentUser}
            onCommentAdded={onUpdate}
          />
        )}
      </Card>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        photo={photo}
        currentUser={currentUser}
        onShareSuccess={onUpdate}
      />
    </>
  );
};
