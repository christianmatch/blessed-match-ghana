
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Share2, Copy, MessageSquare, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: any;
  currentUser: any;
  onShareSuccess: () => void;
}

export const ShareModal = ({ isOpen, onClose, photo, currentUser, onShareSuccess }: ShareModalProps) => {
  const [repostCaption, setRepostCaption] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const handleRepost = async () => {
    if (!currentUser) {
      toast({
        title: "Sign in required",
        description: "Please sign in to repost",
        variant: "destructive"
      });
      return;
    }

    setIsSharing(true);

    try {
      const { error } = await supabase
        .from('gallery_reposts')
        .insert({
          photo_id: photo.id,
          user_id: currentUser.id,
          caption: repostCaption.trim() || null
        });

      if (error) throw error;

      toast({
        title: "Reposted successfully!",
        description: "The photo has been shared to your profile."
      });

      onShareSuccess();
      onClose();
    } catch (error) {
      console.error('Repost error:', error);
      toast({
        title: "Error",
        description: "Failed to repost. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/gallery?photo=${photo.id}`;
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Photo link has been copied to clipboard."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link.",
        variant: "destructive"
      });
    }
  };

  const handleExternalShare = (platform: string) => {
    const url = `${window.location.origin}/gallery?photo=${photo.id}`;
    const text = `Check out this beautiful faith moment: ${photo.caption.slice(0, 100)}...`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-sacred-blue" />
            Share This Photo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Photo Preview */}
          <div className="flex items-center space-x-3 p-3 bg-faithful-ivory dark:bg-charcoal-gray rounded-lg">
            <img 
              src={photo.image_url} 
              alt={photo.caption}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-deep-maroon dark:text-divine-gold">
                {photo.profiles ? `${photo.profiles.first_name} ${photo.profiles.last_name}` : 'Anonymous'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {photo.caption}
              </p>
            </div>
          </div>

          {/* Repost Section */}
          {currentUser && (
            <div className="space-y-2">
              <Label>Repost to Your Profile</Label>
              <Textarea
                value={repostCaption}
                onChange={(e) => setRepostCaption(e.target.value)}
                placeholder="This blessed me! 🙌 Add your thoughts..."
                className="min-h-16"
              />
              <Button
                onClick={handleRepost}
                disabled={isSharing}
                className="w-full bg-graceful-green hover:bg-graceful-green/90"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {isSharing ? 'Reposting...' : 'Repost'}
              </Button>
            </div>
          )}

          {/* Copy Link */}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>

          {/* External Sharing */}
          <div className="space-y-2">
            <Label>Share on Social Media</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleExternalShare('facebook')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Facebook
              </Button>
              <Button
                onClick={() => handleExternalShare('twitter')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Twitter
              </Button>
              <Button
                onClick={() => handleExternalShare('whatsapp')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Send to Match */}
          {currentUser && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // This would open a modal to select matches to send to
                toast({
                  title: "Feature coming soon",
                  description: "Send to matches feature will be available soon!"
                });
              }}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send to a Match
            </Button>
          )}

          <Button variant="ghost" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
