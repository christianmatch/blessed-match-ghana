
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SignupFormData } from '@/pages/Signup';

interface MembershipInfoStepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

const countries = [
  'Ghana', 'Nigeria', 'United States', 'United Kingdom', 'Canada', 'South Africa', 'Other'
];

export const MembershipInfoStep = ({ formData, updateFormData }: MembershipInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-christian-navy dark:text-white mb-4">
          Membership Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please provide your basic contact information to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className="flex items-center">
            First Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="flex items-center">
            Last Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center">
            Email <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center">
            Phone <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="023 123 4567"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            required
            className="mt-1"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-christian-navy dark:text-white mb-4">
          Location Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input
              id="streetAddress"
              type="text"
              value={formData.streetAddress}
              onChange={(e) => updateFormData({ streetAddress: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="suiteApt">Suite/Apt #</Label>
            <Input
              id="suiteApt"
              type="text"
              value={formData.suiteApt}
              onChange={(e) => updateFormData({ suiteApt: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="city" className="flex items-center">
              City/Town <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="state">State/County/Province</Label>
            <Input
              id="state"
              type="text"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="postalCode">Postal/Zip Code</Label>
            <Input
              id="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={(e) => updateFormData({ postalCode: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="country" className="flex items-center">
              Country <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={formData.country} onValueChange={(value) => updateFormData({ country: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country.toLowerCase()}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <Label className="flex items-center text-lg font-semibold">
          Membership Type <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          value={formData.membershipType}
          onValueChange={(value: 'basic' | 'premium') => updateFormData({ membershipType: value })}
          className="mt-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="basic" id="basic" />
            <Label htmlFor="basic">Basic Membership</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="premium" id="premium" />
            <Label htmlFor="premium">Premium Membership</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
