
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Upload, Search, Calendar, User, Camera } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  image_url: string;
  caption: string;
  event_name: string;
  likes_count: number;
  created_at: string;
  user_id: string;
  profiles: { first_name: string; last_name: string } | null;
}

const Gallery = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadPhotos();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadPhotos = async () => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select(`
        id,
        image_url,
        caption,
        event_name,
        likes_count,
        created_at,
        user_id,
        profiles!gallery_photos_user_id_fkey (first_name, last_name)
      `)
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (data) {
      const transformedPhotos = data.map(photo => ({
        ...photo,
        profiles: Array.isArray(photo.profiles) ? photo.profiles[0] : photo.profiles
      }));
      setPhotos(transformedPhotos as GalleryPhoto[]);
    }
  };

  const filteredPhotos = photos.filter(photo =>
    photo.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.event_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
              Community Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Celebrate love and faith with photos from Christian events, weddings, and community gatherings.
            </p>
          </div>

          {/* Search and Upload */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-surface-dark-elevated dark:border-gray-600"
              />
            </div>
            
            {user ? (
              <Button className="bg-love-red hover:bg-love-red-dark text-white">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            ) : (
              <Button 
                onClick={() => handleOpenAuth('login')}
                className="bg-love-red hover:bg-love-red-dark text-white"
              >
                <Camera className="h-4 w-4 mr-2" />
                Sign In to Upload
              </Button>
            )}
          </div>

          {/* Photos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <Card key={photo.id} className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={photo.image_url} 
                    alt={photo.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-growth-green/10 text-growth-green border-growth-green/20">
                      {photo.event_name}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-love-red" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{photo.likes_count}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {photo.caption}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {photo.profiles ? `${photo.profiles.first_name} ${photo.profiles.last_name}` : 'Anonymous'}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(photo.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">No photos found. Be the first to share!</p>
            </div>
          )}
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

export default Gallery;
