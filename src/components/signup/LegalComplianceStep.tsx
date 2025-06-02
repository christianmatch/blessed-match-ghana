
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { SignupFormData } from '@/pages/Signup';

interface LegalComplianceStepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
}

export const LegalComplianceStep = ({ formData, updateFormData }: LegalComplianceStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-christian-navy dark:text-white mb-4">
          Legal Compliance
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please review and accept our terms and data processing policies.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => updateFormData({ acceptTerms: checked as boolean })}
            className="mt-1"
          />
          <div>
            <Label htmlFor="acceptTerms" className="flex items-center cursor-pointer">
              I accept the Terms & Conditions <span className="text-red-500 ml-1">*</span>
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              By checking this box, you agree to our Terms of Service and Privacy Policy.
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-christian-blue hover:text-blue-600"
              onClick={() => window.open('https://forms.gle/7iL4GCCJsFi9G8JD6', '_blank')}
            >
              Read Terms & Conditions
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-christian-navy dark:text-white mb-4">
            Data Processing Consent
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="dataProcessingConsent"
                checked={formData.dataProcessingConsent}
                onCheckedChange={(checked) => updateFormData({ dataProcessingConsent: checked as boolean })}
                className="mt-1"
              />
              <div>
                <Label htmlFor="dataProcessingConsent" className="cursor-pointer">
                  Data Processing Consent (Required)
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  I consent to the processing of my personal data for matchmaking services, 
                  profile creation, and communication with potential matches.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketingConsent"
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => updateFormData({ marketingConsent: checked as boolean })}
                className="mt-1"
              />
              <div>
                <Label htmlFor="marketingConsent" className="cursor-pointer">
                  Marketing Communications (Optional)
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  I consent to receiving marketing communications, newsletters, and updates 
                  about Christian Match Ghana services and events.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-christian-navy dark:text-white mb-2">
            Your Privacy is Important
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We are committed to protecting your privacy and personal information. 
            Your data will only be used for the purposes you've consented to and 
            will never be shared with third parties without your explicit permission.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            Please Note
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            You must accept the Terms & Conditions and provide data processing consent 
            to complete your registration and access our matchmaking services.
          </p>
        </div>
      </div>
    </div>
  );
};
