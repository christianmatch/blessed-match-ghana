
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const HeroSection = ({ onOpenAuth }: HeroSectionProps) => {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-christian-navy leading-tight mb-6">
              Find Your
              <span className="text-christian-blue"> God-Given </span>
              Partner
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with fellow believers who share your faith, values, and commitment to Christ. 
              Build meaningful relationships rooted in God's love and purpose.
            </p>
            
            {/* Features Preview */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-700 font-medium">Faith-Based Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-700 font-medium">Verified Profiles</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-700 font-medium">Christian Events</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => onOpenAuth('signup')}
                className="btn-christian text-lg px-8 py-4"
              >
                Start Your Journey
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onOpenAuth('login')}
                className="text-lg px-8 py-4 hover:bg-christian-blue hover:text-white transition-all duration-300"
              >
                Sign In
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Trusted by thousands of Christian singles</p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-christian-blue">10K+</div>
                  <div className="text-xs text-gray-500">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-christian-blue">500+</div>
                  <div className="text-xs text-gray-500">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-christian-blue">50+</div>
                  <div className="text-xs text-gray-500">Churches</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="animate-scale-in">
            <div className="relative">
              <div className="bg-gradient-to-br from-christian-blue to-blue-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Happy Christian couple"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="mt-4 text-center">
                    <div className="text-lg font-semibold text-christian-navy">
                      "He brought us together through faith"
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      - Sarah & Michael
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-christian-gold text-white p-3 rounded-full shadow-lg animate-bounce">
                <Heart className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-christian-blue p-3 rounded-full shadow-lg border-2 border-christian-blue">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
