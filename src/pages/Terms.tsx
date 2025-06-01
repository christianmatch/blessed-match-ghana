
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
                Agreement Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                By using Christian Match Ghana, you agree to these Terms of Service. Our platform is designed 
                to help Christians find meaningful relationships based on shared faith and values. We are 
                committed to maintaining a safe, respectful, and faith-centered community.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="eligibility" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                1. Eligibility Requirements
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>To use our service, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Be a committed Christian seeking marriage</li>
                  <li>Be legally able to enter into a binding contract</li>
                  <li>Provide accurate and truthful information in your profile</li>
                  <li>Have only one active account on our platform</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="conduct" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                2. Community Standards & Conduct
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>All members must adhere to Christian values and principles:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Treat all members with respect, kindness, and Christian love</li>
                  <li>No inappropriate, offensive, or sexually explicit content</li>
                  <li>No harassment, bullying, or discriminatory behavior</li>
                  <li>No sharing of personal contact information in initial messages</li>
                  <li>Report any suspicious or inappropriate behavior to our team</li>
                  <li>Respect others' boundaries and faith journey</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                3. Privacy & Data Protection
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We are committed to protecting your privacy:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your personal information is kept confidential and secure</li>
                  <li>We will never sell your data to third parties</li>
                  <li>You control what information is visible on your profile</li>
                  <li>Messages between members are private and encrypted</li>
                  <li>You can delete your account and data at any time</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                4. Payment Terms
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>For Premium and Platinum memberships:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payments are processed securely through Stripe</li>
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Refunds are available within 7 days of purchase</li>
                  <li>Prices may change with 30 days notice</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="content" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                5. Content Guidelines
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>All content shared on our platform must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Align with Christian values and principles</li>
                  <li>Be appropriate for all ages</li>
                  <li>Not violate any copyrights or intellectual property</li>
                  <li>Be truthful and not misleading</li>
                  <li>Not promote other dating services or websites</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="termination" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                6. Account Termination
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We reserve the right to terminate accounts that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate our community standards</li>
                  <li>Engage in fraudulent or deceptive behavior</li>
                  <li>Harass or abuse other members</li>
                  <li>Use the platform for commercial purposes</li>
                  <li>Create multiple accounts</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                7. Limitation of Liability
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Please understand that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We provide a platform to meet others but cannot guarantee relationships</li>
                  <li>Members are responsible for their own actions and decisions</li>
                  <li>Always meet in public places and inform others of your plans</li>
                  <li>We are not liable for any damages arising from use of our service</li>
                  <li>Use our platform at your own discretion and risk</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes" className="bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-christian-navy dark:text-white hover:text-love-red">
                8. Changes to Terms
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We may update these terms from time to time:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You will be notified of significant changes via email</li>
                  <li>Continued use of our service constitutes acceptance of new terms</li>
                  <li>The most current version will always be available on this page</li>
                  <li>Changes take effect 30 days after notification</li>
                </ul>
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
                <a href="mailto:terms@christianmatchghana.com" className="text-love-red hover:underline">
                  terms@christianmatchghana.com
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
