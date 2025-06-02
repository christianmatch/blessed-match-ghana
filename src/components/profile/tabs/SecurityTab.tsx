
import { useState } from 'react';
import { Shield, Key, Eye, EyeOff, Smartphone, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
}

interface SecurityTabProps {
  user: User;
}

export const SecurityTab = ({ user }: SecurityTabProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { toast } = useToast();

  const handlePasswordChange = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled."
        : "Two-factor authentication has been enabled for enhanced security.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="flex items-center gap-3 mt-1">
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="flex-1"
              />
              <Badge variant="outline" className="text-green-600 border-green-600">
                Verified
              </Badge>
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-3">
            <Label>Change Password</Label>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
              />
            </div>
            <Button onClick={handlePasswordChange}>
              <Key className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable 2FA</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
            />
          </div>
          
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Shield className="h-4 w-4" />
                <span className="font-medium">2FA is enabled</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Your account is protected with two-factor authentication.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive emails about matches and messages
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Profile Visibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show your profile to potential matches
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Online Status</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Let others see when you're online
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
              Temporarily Deactivate Account
            </Button>
            <Button variant="destructive">
              Permanently Delete Account
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These actions cannot be undone. Please be certain before proceeding.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
