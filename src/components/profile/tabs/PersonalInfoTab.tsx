
import { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  occupation: string;
  church: string;
  denomination: string;
}

interface PersonalInfoTabProps {
  user: User;
}

export const PersonalInfoTab = ({ user }: PersonalInfoTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const { toast } = useToast();

  const handleSave = () => {
    // In real app, save to database
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Basic Information</CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-gray-900 dark:text-white">{formData.firstName}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-gray-900 dark:text-white">{formData.lastName}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-gray-900 dark:text-white">{formData.email}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-gray-900 dark:text-white">{formData.phone}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              placeholder="Tell others about yourself, your faith journey, and what you're looking for..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="min-h-[120px]"
            />
          ) : (
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {formData.bio || "No bio added yet. Click edit to add information about yourself."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Faith Information */}
      <Card>
        <CardHeader>
          <CardTitle>Faith & Church</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="church">Church Name</Label>
              {isEditing ? (
                <Input
                  id="church"
                  value={formData.church}
                  onChange={(e) => setFormData({ ...formData, church: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-gray-900 dark:text-white">{formData.church}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="denomination">Denomination</Label>
              {isEditing ? (
                <Input
                  id="denomination"
                  value={formData.denomination}
                  onChange={(e) => setFormData({ ...formData, denomination: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-gray-900 dark:text-white">{formData.denomination}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            {isEditing ? (
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-gray-900 dark:text-white">{formData.occupation}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
