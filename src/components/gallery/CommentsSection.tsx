
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, User, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  parent_comment_id: string | null;
  profiles: { first_name: string; last_name: string } | null;
}

interface CommentsSectionProps {
  photoId: string;
  currentUser: any;
  onCommentAdded: () => void;
}

export const CommentsSection = ({ photoId, currentUser, onCommentAdded }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadComments();
  }, [photoId]);

  const loadComments = async () => {
    const { data, error } = await supabase
      .from('gallery_comments')
      .select(`
        id,
        content,
        created_at,
        user_id,
        parent_comment_id,
        profiles!gallery_comments_user_id_fkey (first_name, last_name)
      `)
      .eq('photo_id', photoId)
      .order('created_at', { ascending: true });

    if (data) {
      const transformedComments = data.map(comment => ({
        ...comment,
        profiles: Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles
      }));
      setComments(transformedComments as Comment[]);
    }
  };

  const handleSubmitComment = async () => {
    if (!currentUser) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('gallery_comments')
        .insert({
          photo_id: photoId,
          user_id: currentUser.id,
          content: newComment.trim(),
          parent_comment_id: replyTo
        });

      if (error) throw error;

      setNewComment('');
      setReplyTo(null);
      loadComments();
      onCommentAdded();

      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully."
      });
    } catch (error) {
      console.error('Comment error:', error);
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('gallery_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', currentUser?.id);

      if (error) throw error;

      loadComments();
      onCommentAdded();

      toast({
        title: "Comment deleted",
        description: "Your comment has been removed."
      });
    } catch (error) {
      console.error('Delete comment error:', error);
      toast({
        title: "Error",
        description: "Failed to delete comment.",
        variant: "destructive"
      });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const topLevelComments = comments.filter(c => !c.parent_comment_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_comment_id === parentId);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
      {/* Comments List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {topLevelComments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            {/* Main Comment */}
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-sacred-blue text-white text-xs">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="bg-faithful-ivory dark:bg-charcoal-gray rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm text-deep-maroon dark:text-divine-gold">
                      {comment.profiles ? `${comment.profiles.first_name} ${comment.profiles.last_name}` : 'Anonymous'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                      {currentUser?.id === comment.user_id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className="mt-1 h-6 text-xs text-gray-500 hover:text-sacred-blue"
                >
                  Reply
                </Button>
              </div>
            </div>

            {/* Replies */}
            {getReplies(comment.id).map((reply) => (
              <div key={reply.id} className="ml-11 flex space-x-3">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarFallback className="bg-graceful-green text-white text-xs">
                    <User className="h-3 w-3" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="bg-faithful-ivory dark:bg-charcoal-gray rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-xs text-deep-maroon dark:text-divine-gold">
                        {reply.profiles ? `${reply.profiles.first_name} ${reply.profiles.last_name}` : 'Anonymous'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(reply.created_at)}
                        </span>
                        {currentUser?.id === reply.user_id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteComment(reply.id)}
                            className="h-5 w-5 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-2 w-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {reply.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className="space-y-2">
        {replyTo && (
          <div className="text-xs text-gray-500 flex items-center justify-between">
            <span>Replying to comment...</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyTo(null)}
              className="h-5 text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
        <div className="flex space-x-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
            className="min-h-10 text-sm"
            rows={2}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            size="sm"
            className="bg-sacred-blue hover:bg-sacred-blue/90 self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
