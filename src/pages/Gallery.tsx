
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Search, Camera, Grid3X3, List } from 'lucide-react';
import { PhotoUploadModal } from '@/components/gallery/PhotoUploadModal';
import { PhotoCard } from '@/components/gallery/PhotoCard';

interface GalleryPhoto {
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
}

const Gallery = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_photos')
      .select(`
        id,
        image_url,
        caption,
        event_name,
        faith_moment_tag,
        likes_count,
        comments_count,
        reposts_count,
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
    setLoading(false);
  };

  const filteredPhotos = photos.filter(photo =>
    photo.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.event_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.faith_moment_tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-faithful-ivory dark:bg-nightly-navy transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-maroon dark:text-divine-gold mb-6">
              Community Gallery
            </h1>
            <p className="text-xl text-charcoal dark:text-soft-white max-w-3xl mx-auto leading-relaxed">
              Celebrate love and faith with photos from Christian events, weddings, and community gatherings. 
              Share your moments and spread positivity through our blessed community.
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search photos, events, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-sacred-blue/30 dark:border-celestial-teal/30 focus:border-sacred-blue dark:focus:border-celestial-teal"
              />
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center border border-sacred-blue/30 dark:border-celestial-teal/30 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-sacred-blue text-white' : ''}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-sacred-blue text-white' : ''}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Upload Button */}
              {user ? (
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-divine-gold hover:bg-divine-gold/90 text-deep-maroon font-semibold"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              ) : (
                <Button 
                  onClick={() => handleOpenAuth('login')}
                  className="bg-divine-gold hover:bg-divine-gold/90 text-deep-maroon font-semibold"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Sign In to Upload
                </Button>
              )}
            </div>
          </div>

          {/* Photos Grid/List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sacred-blue mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Loading photos...</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-6 max-w-2xl mx-auto"
            }>
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  currentUser={user}
                  onUpdate={loadPhotos}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-deep-maroon dark:text-divine-gold mb-2">
                {searchTerm ? 'No photos found' : 'No photos yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse all photos.' 
                  : 'Be the first to share a beautiful faith moment with the community!'
                }
              </p>
              {!searchTerm && user && (
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-sacred-blue hover:bg-sacred-blue/90 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload First Photo
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />

      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={loadPhotos}
      />
    </div>
  );
};

export default Gallery;
