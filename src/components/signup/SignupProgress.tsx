
interface SignupProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const SignupProgress = ({ currentStep, totalSteps }: SignupProgressProps) => {
  const steps = [
    'Membership Info',
    'Basic Info',
    'Lifestyle',
    'Match Preferences',
    'Legal Compliance'
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 <= currentStep
                  ? 'bg-christian-blue text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-0.5 w-16 ${
                  index + 1 < currentStep
                    ? 'bg-christian-blue'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
        <div
          className="bg-christian-blue h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
