
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import type { SignupFormData } from '@/pages/Signup';

interface MatchPreferencesStepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

const ethnicGroups = [
  'Akan', 'Ashanti', 'Ewe', 'Ga', 'Dagbani', 'Fante', 'Twi', 'Any', 'Other'
];

const educationLevels = [
  'PhD/Doctorate', 'Masters Degree', 'Bachelors Degree', 'Diploma/Certificate', 
  'High School', 'Any'
];

const incomeRanges = [
  'Under GHS 1,000', 'GHS 1,000 - 2,500', 'GHS 2,500 - 5,000', 
  'GHS 5,000 - 7,500', 'GHS 7,500 - 10,000', 'Over GHS 10,000', 'Any'
];

const activities = [
  'Bible Study', 'Prayer', 'Church Service', 'Missionary Work', 
  'Travel', 'Sports', 'Music', 'Reading', 'Cooking', 'Dancing'
];

const maybeOptions = ['Yes', 'No', 'Maybe'];

export const MatchPreferencesStep = ({ formData, updateFormData }: MatchPreferencesStepProps) => {
  const feetOptions = Array.from({ length: 4 }, (_, i) => i + 4); // 4-7 feet
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i); // 0-11 inches

  const handleEthnicGroupChange = (group: string, checked: boolean) => {
    const currentGroups = formData.preferredEthnicGroups || [];
    if (checked) {
      updateFormData({ preferredEthnicGroups: [...currentGroups, group] });
    } else {
      updateFormData({ preferredEthnicGroups: currentGroups.filter(g => g !== group) });
    }
  };

  const handleEducationChange = (education: string, checked: boolean) => {
    const currentEducation = formData.preferredEducation || [];
    if (checked) {
      updateFormData({ preferredEducation: [...currentEducation, education] });
    } else {
      updateFormData({ preferredEducation: currentEducation.filter(e => e !== education) });
    }
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    const currentActivities = formData.sharedActivities || [];
    if (checked) {
      updateFormData({ sharedActivities: [...currentActivities, activity] });
    } else {
      updateFormData({ sharedActivities: currentActivities.filter(a => a !== activity) });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-christian-navy dark:text-white mb-4">
          Match Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tell us about your ideal partner and what you're looking for.
        </p>
      </div>

      <div>
        <Label className="flex items-center">
          Preferred Age Range <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="mt-4">
          <Slider
            value={[formData.preferredAgeMin, formData.preferredAgeMax]}
            onValueChange={([min, max]) => updateFormData({ preferredAgeMin: min, preferredAgeMax: max })}
            min={18}
            max={65}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
            <span>{formData.preferredAgeMin} years</span>
            <span>{formData.preferredAgeMax} years</span>
          </div>
        </div>
      </div>

      <div>
        <Label className="flex items-center">
          Preferred Ethnic Groups <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {ethnicGroups.map((group) => (
            <div key={group} className="flex items-center space-x-2">
              <Checkbox
                id={`ethnic${group}`}
                checked={formData.preferredEthnicGroups?.includes(group) || false}
                onCheckedChange={(checked) => handleEthnicGroupChange(group, checked as boolean)}
              />
              <Label htmlFor={`ethnic${group}`} className="text-sm">
                {group}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="preferredChurch" className="flex items-center">
            Preferred Church <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="preferredChurch"
            type="text"
            placeholder="Same denomination as me"
            value={formData.preferredChurch}
            onChange={(e) => updateFormData({ preferredChurch: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="preferredIncome" className="flex items-center">
            Preferred Income <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.preferredIncome} onValueChange={(value) => updateFormData({ preferredIncome: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select income preference" />
            </SelectTrigger>
            <SelectContent>
              {incomeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="flex items-center">
          Preferred Education <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {educationLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`edu${level}`}
                checked={formData.preferredEducation?.includes(level) || false}
                onCheckedChange={(checked) => handleEducationChange(level, checked as boolean)}
              />
              <Label htmlFor={`edu${level}`} className="text-sm">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="flex items-center">
          Preferred Height Range <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <Select value={formData.preferredHeightMinFeet} onValueChange={(value) => updateFormData({ preferredHeightMinFeet: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Min Ft" />
            </SelectTrigger>
            <SelectContent>
              {feetOptions.map((feet) => (
                <SelectItem key={feet} value={feet.toString()}>
                  {feet} ft
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formData.preferredHeightMinInches} onValueChange={(value) => updateFormData({ preferredHeightMinInches: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Min In" />
            </SelectTrigger>
            <SelectContent>
              {inchesOptions.map((inches) => (
                <SelectItem key={inches} value={inches.toString()}>
                  {inches} in
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formData.preferredHeightMaxFeet} onValueChange={(value) => updateFormData({ preferredHeightMaxFeet: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Max Ft" />
            </SelectTrigger>
            <SelectContent>
              {feetOptions.map((feet) => (
                <SelectItem key={feet} value={feet.toString()}>
                  {feet} ft
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formData.preferredHeightMaxInches} onValueChange={(value) => updateFormData({ preferredHeightMaxInches: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Max In" />
            </SelectTrigger>
            <SelectContent>
              {inchesOptions.map((inches) => (
                <SelectItem key={inches} value={inches.toString()}>
                  {inches} in
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="flex items-center">
            Would date someone who smokes? <span className="text-red-500 ml-1">*</span>
          </Label>
          <RadioGroup
            value={formData.datesSmoker}
            onValueChange={(value) => updateFormData({ datesSmoker: value })}
            className="mt-2"
          >
            {maybeOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase()} id={`smoker${option}`} />
                <Label htmlFor={`smoker${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className="flex items-center">
            Would date someone who drinks? <span className="text-red-500 ml-1">*</span>
          </Label>
          <RadioGroup
            value={formData.datesDrinker}
            onValueChange={(value) => updateFormData({ datesDrinker: value })}
            className="mt-2"
          >
            {maybeOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase()} id={`drinker${option}`} />
                <Label htmlFor={`drinker${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div>
        <Label className="flex items-center">
          Activities I want to share <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {activities.map((activity) => (
            <div key={activity} className="flex items-center space-x-2">
              <Checkbox
                id={`activity${activity}`}
                checked={formData.sharedActivities?.includes(activity) || false}
                onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
              />
              <Label htmlFor={`activity${activity}`} className="text-sm">
                {activity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="idealPartner" className="flex items-center">
          Describe your ideal partner <span className="text-red-500 ml-1">*</span>
        </Label>
        <Textarea
          id="idealPartner"
          placeholder="Tell us about your ideal partner in 500 characters or less..."
          value={formData.idealPartnerDescription}
          onChange={(e) => updateFormData({ idealPartnerDescription: e.target.value })}
          maxLength={500}
          className="mt-1"
          rows={4}
        />
        <div className="text-sm text-gray-500 mt-1">
          {formData.idealPartnerDescription.length}/500 characters
        </div>
      </div>
    </div>
  );
};
