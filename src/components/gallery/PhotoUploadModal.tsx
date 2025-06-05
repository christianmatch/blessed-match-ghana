
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const FAITH_MOMENT_TAGS = [
  '#BibleStudy', '#MissionTrip', '#Baptism', '#Wedding', '#ChurchEvent',
  '#PrayerMeeting', '#Worship', '#Fellowship', '#ServiceProject', '#Testimony'
];

const VERSE_SUGGESTIONS = [
  "Proverbs 31:30 - 'Charm is deceptive and beauty is fleeting, but a woman who fears the Lord is to be praised.'",
  "1 Peter 3:3-4 - 'Your beauty should not come from outward adornment... Rather, it should be that of your inner self.'",
  "Psalm 139:14 - 'I praise you because I am fearfully and wonderfully made.'",
  "Song of Songs 4:7 - 'You are altogether beautiful, my darling; there is no flaw in you.'"
];

export const PhotoUploadModal = ({ isOpen, onClose, onUploadSuccess }: PhotoUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [eventName, setEventName] = useState('');
  const [faithMomentTag, setFaithMomentTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a JPG or PNG image",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !caption.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a photo and add a caption",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to upload photos",
          variant: "destructive"
        });
        return;
      }

      // Upload image to Supabase storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(fileName);

      // Save photo metadata to database
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          caption: caption.trim(),
          event_name: eventName.trim() || null,
          faith_moment_tag: faithMomentTag || null,
          approved: false // Pending admin approval
        });

      if (dbError) throw dbError;

      toast({
        title: "Photo uploaded successfully!",
        description: "Your photo is pending approval and will appear soon."
      });

      onUploadSuccess();
      handleClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setCaption('');
    setEventName('');
    setFaithMomentTag('');
    onClose();
  };

  const addVerseToCaption = (verse: string) => {
    setCaption(prev => prev + (prev ? '\n\n' : '') + verse);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-sacred-blue" />
            Share Your Faith Moment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <Label htmlFor="photo-upload">Select Photo (Max 5MB)</Label>
            <div className="mt-2">
              {selectedFile ? (
                <div className="relative">
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-sacred-blue/30 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-sacred-blue mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Caption */}
          <div>
            <Label htmlFor="caption">Caption (300 characters max)</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, 300))}
              placeholder="Share your faith moment..."
              className="mt-2 min-h-20 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{caption.length}/300</p>
          </div>

          {/* Verse Suggestions */}
          <div>
            <Label className="text-sm font-medium">Add a Bible Verse</Label>
            <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
              {VERSE_SUGGESTIONS.map((verse, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-2 text-xs text-left justify-start w-full whitespace-normal leading-relaxed"
                  onClick={() => addVerseToCaption(verse)}
                >
                  {verse}
                </Button>
              ))}
            </div>
          </div>

          {/* Event Name */}
          <div>
            <Label htmlFor="event-name">Event Name (Optional)</Label>
            <Input
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., Sunday Service, Youth Camp"
              className="mt-2"
            />
          </div>

          {/* Faith Moment Tags */}
          <div>
            <Label className="text-sm font-medium">Faith Moment Tag (Optional)</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {FAITH_MOMENT_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={faithMomentTag === tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-sacred-blue hover:text-white text-xs"
                  onClick={() => setFaithMomentTag(faithMomentTag === tag ? '' : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || !caption.trim() || isUploading}
              className="flex-1 bg-sacred-blue hover:bg-sacred-blue/90"
            >
              {isUploading ? 'Uploading...' : 'Share Photo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
