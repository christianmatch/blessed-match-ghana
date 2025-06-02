
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { SignupFormData } from '@/pages/Signup';

interface LifestylePreferencesStepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

const incomeRanges = [
  'Under GHS 1,000', 'GHS 1,000 - 2,500', 'GHS 2,500 - 5,000', 
  'GHS 5,000 - 7,500', 'GHS 7,500 - 10,000', 'Over GHS 10,000'
];

const bodyTypes = [
  'Slim', 'Athletic', 'Average', 'Curvy', 'Heavy Set', 'Prefer not to say'
];

const languages = [
  'English', 'Twi', 'Ga', 'Ewe', 'Dagbani', 'Hausa', 'French', 'Other'
];

const habitOptions = ['Yes', 'No', 'Occasionally'];

export const LifestylePreferencesStep = ({ formData, updateFormData }: LifestylePreferencesStepProps) => {
  const feetOptions = Array.from({ length: 4 }, (_, i) => i + 4); // 4-7 feet
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i); // 0-11 inches

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = formData.languagesSpoken || [];
    if (checked) {
      updateFormData({ languagesSpoken: [...currentLanguages, language] });
    } else {
      updateFormData({ languagesSpoken: currentLanguages.filter(l => l !== language) });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-christian-navy dark:text-white mb-4">
          Lifestyle & Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Share more about your lifestyle and personal preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="monthlyIncome" className="flex items-center">
            Average Monthly Income <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.monthlyIncome} onValueChange={(value) => updateFormData({ monthlyIncome: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select income range" />
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

        <div>
          <Label htmlFor="bodyType" className="flex items-center">
            Body Type <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.bodyType} onValueChange={(value) => updateFormData({ bodyType: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent>
              {bodyTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="flex items-center">
          Children Questions <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="mt-4 space-y-4">
          <div>
            <Label className="text-sm font-medium">Do you have kids?</Label>
            <RadioGroup
              value={formData.hasChildren ? 'yes' : 'no'}
              onValueChange={(value) => updateFormData({ hasChildren: value === 'yes' })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="hasKidsYes" />
                <Label htmlFor="hasKidsYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="hasKidsNo" />
                <Label htmlFor="hasKidsNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium">Want (more) kids?</Label>
            <RadioGroup
              value={formData.wantsChildren ? 'yes' : 'no'}
              onValueChange={(value) => updateFormData({ wantsChildren: value === 'yes' })}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="wantsKidsYes" />
                <Label htmlFor="wantsKidsYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="wantsKidsNo" />
                <Label htmlFor="wantsKidsNo">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div>
        <Label className="flex items-center">
          Height <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <Select value={formData.heightFeet} onValueChange={(value) => updateFormData({ heightFeet: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Feet" />
            </SelectTrigger>
            <SelectContent>
              {feetOptions.map((feet) => (
                <SelectItem key={feet} value={feet.toString()}>
                  {feet} ft
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formData.heightInches} onValueChange={(value) => updateFormData({ heightInches: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Inches" />
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

      <div>
        <Label className="flex items-center">
          Languages Spoken <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {languages.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={language}
                checked={formData.languagesSpoken?.includes(language) || false}
                onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
              />
              <Label htmlFor={language} className="text-sm">
                {language}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="flex items-center">
            Smoking Habit <span className="text-red-500 ml-1">*</span>
          </Label>
          <RadioGroup
            value={formData.smokingHabit}
            onValueChange={(value) => updateFormData({ smokingHabit: value })}
            className="mt-2"
          >
            {habitOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase()} id={`smoking${option}`} />
                <Label htmlFor={`smoking${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className="flex items-center">
            Alcohol Habit <span className="text-red-500 ml-1">*</span>
          </Label>
          <RadioGroup
            value={formData.alcoholHabit}
            onValueChange={(value) => updateFormData({ alcoholHabit: value })}
            className="mt-2"
          >
            {habitOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase()} id={`alcohol${option}`} />
                <Label htmlFor={`alcohol${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
