
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SignupFormData } from '@/pages/Signup';

interface BasicInfoStepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

const churchAttendanceOptions = [
  'Weekly', 'Bi-weekly', 'Monthly', 'Occasionally', 'Rarely', 'Never'
];

const relationshipStatusOptions = [
  'Single', 'Divorced', 'Widowed', 'Separated'
];

const ghanaianTribes = [
  'Akan', 'Ashanti', 'Ewe', 'Ga', 'Dagbani', 'Fante', 'Twi', 'Other'
];

const educationLevels = [
  'PhD/Doctorate', 'Masters Degree', 'Bachelors Degree', 'Diploma/Certificate', 
  'High School', 'Middle School', 'Other'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const BasicInfoStep = ({ formData, updateFormData }: BasicInfoStepProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-christian-navy dark:text-white mb-4">
          Basic Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tell us more about yourself and your background.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="churchAttendance" className="flex items-center">
            Church Attendance Frequency <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.churchAttendance} onValueChange={(value) => updateFormData({ churchAttendance: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {churchAttendanceOptions.map((option) => (
                <SelectItem key={option} value={option.toLowerCase()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="flex items-center">
            Gender <span className="text-red-500 ml-1">*</span>
          </Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value: 'male' | 'female' | 'other') => updateFormData({ gender: value })}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div>
        <Label className="flex items-center">
          Birthdate <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <Select value={formData.birthDay} onValueChange={(value) => updateFormData({ birthDay: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formData.birthMonth} onValueChange={(value) => updateFormData({ birthMonth: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formData.birthYear} onValueChange={(value) => updateFormData({ birthYear: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="relationshipStatus" className="flex items-center">
            Relationship Status <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.relationshipStatus} onValueChange={(value) => updateFormData({ relationshipStatus: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {relationshipStatusOptions.map((status) => (
                <SelectItem key={status} value={status.toLowerCase()}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ethnicGroup" className="flex items-center">
            Ethnic Group <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.ethnicGroup} onValueChange={(value) => updateFormData({ ethnicGroup: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select ethnic group" />
            </SelectTrigger>
            <SelectContent>
              {ghanaianTribes.map((tribe) => (
                <SelectItem key={tribe} value={tribe.toLowerCase()}>
                  {tribe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="churchName" className="flex items-center">
            Church Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="churchName"
            type="text"
            placeholder="Enter church name or 'Don't attend'"
            value={formData.churchName}
            onChange={(e) => updateFormData({ churchName: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="educationLevel" className="flex items-center">
            Education Level <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.educationLevel} onValueChange={(value) => updateFormData({ educationLevel: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level.toLowerCase()}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="occupation" className="flex items-center">
            Occupation <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="occupation"
            type="text"
            placeholder="Enter your occupation"
            value={formData.occupation}
            onChange={(e) => updateFormData({ occupation: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};
