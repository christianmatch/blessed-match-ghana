import { useState } from 'react';
import { Plus, X, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const PhotosTab = () => {
  const [photos, setPhotos] = useState([
    { id: 1, url: '/api/placeholder/300/400', isPrimary: true, approved: true },
    { id: 2, url: '/api/placeholder/300/400', isPrimary: false, approved: true },
    { id: 3, url: '/api/placeholder/300/400', isPrimary: false, approved: false },
  ]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle photo upload logic here
      console.log('Photos to upload:', files);
    }
  };

  const deletePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const setPrimaryPhoto = (id: number) => {
    setPhotos(photos.map(photo => ({
      ...photo,
      isPrimary: photo.id === id
    })));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Photos</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add photos to showcase yourself. The first photo will be your main profile picture.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Existing Photos */}
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={photo.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Photo Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {photo.isPrimary && (
                    <Badge className="text-xs bg-christian-blue">
                      <Star className="h-3 w-3 mr-1" />
                      Primary
                    </Badge>
                  )}
                  {!photo.approved && (
                    <Badge variant="secondary" className="text-xs">
                      Pending
                    </Badge>
                  )}
                </div>
                
                {/* Photo Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!photo.isPrimary && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPrimaryPhoto(photo.id)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deletePhoto(photo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {/* Add Photo Button */}
            {photos.length < 6 && (
              <label className="aspect-[3/4] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-christian-blue transition-colors">
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Add Photo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Photo Guidelines</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Upload clear, recent photos of yourself</li>
              <li>• Include at least one photo showing your face clearly</li>
              <li>• Avoid group photos as your primary image</li>
              <li>• Keep photos appropriate and family-friendly</li>
              <li>• Maximum 6 photos allowed</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
