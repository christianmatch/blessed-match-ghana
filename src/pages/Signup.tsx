
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MembershipInfoStep } from '@/components/signup/MembershipInfoStep';
import { BasicInfoStep } from '@/components/signup/BasicInfoStep';
import { LifestylePreferencesStep } from '@/components/signup/LifestylePreferencesStep';
import { MatchPreferencesStep } from '@/components/signup/MatchPreferencesStep';
import { LegalComplianceStep } from '@/components/signup/LegalComplianceStep';
import { SignupProgress } from '@/components/signup/SignupProgress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface SignupFormData {
  // Membership Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  suiteApt: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  membershipType: 'basic' | 'premium';
  
  // Basic Information
  churchAttendance: string;
  gender: 'male' | 'female' | 'other';
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  relationshipStatus: string;
  ethnicGroup: string;
  churchName: string;
  educationLevel: string;
  occupation: string;
  
  // Lifestyle & Preferences
  monthlyIncome: string;
  hasChildren: boolean;
  wantsChildren: boolean;
  heightFeet: string;
  heightInches: string;
  bodyType: string;
  languagesSpoken: string[];
  smokingHabit: string;
  alcoholHabit: string;
  
  // Match Preferences
  preferredAgeMin: number;
  preferredAgeMax: number;
  preferredEthnicGroups: string[];
  preferredChurch: string;
  preferredEducation: string[];
  preferredIncome: string;
  preferredHeightMinFeet: string;
  preferredHeightMinInches: string;
  preferredHeightMaxFeet: string;
  preferredHeightMaxInches: string;
  datesSmoker: string;
  datesDrinker: string;
  sharedActivities: string[];
  idealPartnerDescription: string;
  
  // Legal Compliance
  acceptTerms: boolean;
  dataProcessingConsent: boolean;
  marketingConsent: boolean;
}

const initialFormData: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  streetAddress: '',
  suiteApt: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  membershipType: 'basic',
  churchAttendance: '',
  gender: 'male',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  relationshipStatus: '',
  ethnicGroup: '',
  churchName: '',
  educationLevel: '',
  occupation: '',
  monthlyIncome: '',
  hasChildren: false,
  wantsChildren: false,
  heightFeet: '',
  heightInches: '',
  bodyType: '',
  languagesSpoken: [],
  smokingHabit: '',
  alcoholHabit: '',
  preferredAgeMin: 18,
  preferredAgeMax: 65,
  preferredEthnicGroups: [],
  preferredChurch: '',
  preferredEducation: [],
  preferredIncome: '',
  preferredHeightMinFeet: '',
  preferredHeightMinInches: '',
  preferredHeightMaxFeet: '',
  preferredHeightMaxInches: '',
  datesSmoker: '',
  datesDrinker: '',
  sharedActivities: [],
  idealPartnerDescription: '',
  acceptTerms: false,
  dataProcessingConsent: false,
  marketingConsent: false,
};

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const totalSteps = 5;

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would integrate with your backend/Firebase
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <MembershipInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <LifestylePreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <MatchPreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <LegalComplianceStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
              Join Christian Match Ghana
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find your God-given match through faith-centered relationships
            </p>
          </div>

          <SignupProgress currentStep={currentStep} totalSteps={totalSteps} />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            {renderCurrentStep()}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="btn-christian flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="btn-christian"
                disabled={!formData.acceptTerms}
              >
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
