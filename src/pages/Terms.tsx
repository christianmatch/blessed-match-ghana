
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const lastUpdated = "January 1, 2025";

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Please read these terms carefully before using Christian Match Ghana
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          <Card className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-christian-navy dark:text-white">
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Welcome to Christian Match Ghana. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully. If you do not agree with these terms, you should not use our services.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="eligibility" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                1. Eligibility
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>To use our services, you must be at least 18 years old and a practicing Christian. By registering with us, you confirm that you meet these eligibility requirements.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                2. Services Provided
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Christian Match Ghana offers offline personalized matchmaking services. We do not provide online dating services. Our services include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personalized matchmaking</li>
                  <li>Relationship coaching</li>
                  <li>Christian counseling</li>
                  <li>Singles events</li>
                  <li>Marriage preparation and retreats</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                3. Privacy and Confidentiality
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We are committed to protecting your privacy. All personal information provided to us will be kept confidential and used solely for the purpose of providing our services. We do not have an online platform so your information is safe from public consumption. We will not share your information with third parties without your consent, except as required by law.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="responsibilities" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                4. User Responsibilities
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>As a user of our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and truthful information during registration and throughout your use of our services</li>
                  <li>Respect the privacy and confidentiality of other users</li>
                  <li>Use our services in a manner consistent with Christian values and principles</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fees" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                5. Fees and Payments
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Our services are subject to fees, which will be communicated to you during the registration process. All fees are non-refundable, except as required by law.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="termination" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                6. Termination of Services
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We reserve the right to terminate your access to our services at any time, without notice, if we believe you have violated these terms and conditions or engaged in conduct that is harmful to our community.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                7. Limitation of Liability
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Christian Match Ghana is not responsible for any damages or losses resulting from your use of our services. We do not guarantee the success of any match or relationship.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                8. Changes to Terms and Conditions
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We may update these terms and conditions from time to time. Any changes will be posted on our website, and your continued use of our services constitutes acceptance of the updated terms.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                9. Governing Law
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>These terms and conditions are governed by the laws of Ghana. Any disputes arising from these terms will be resolved in the courts of Ghana.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="bg-love-red/5 dark:bg-love-red/10 border-love-red/20 mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-christian-navy dark:text-white mb-3">
                Questions About These Terms?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about our Terms of Service, please contact us at{' '}
                <a href="mailto:christianmatchghanaltd@gmail.com" className="text-love-red hover:underline">
                  christianmatchghanaltd@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default Terms;
