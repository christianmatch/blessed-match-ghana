
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar } from 'lucide-react';

interface CTASectionProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const CTASection = ({ onOpenAuth }: CTASectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full" />
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-white rounded-full" />
        <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-white rounded-full" />
        <div className="absolute bottom-40 right-10 w-24 h-24 border-2 border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
            Ready to Begin Your Faith Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of Christian singles who trust Christian Match Ghana to help them find their God-given partner. 
            Your love story starts with a single step of faith.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Faith-Centered</h3>
              <p className="text-gray-300 text-sm">Relationships built on Christian values and biblical principles</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Community</h3>
              <p className="text-gray-300 text-sm">Authentic believers verified through church connections</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Active Events</h3>
              <p className="text-gray-300 text-sm">Connect through Christian events and community activities</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => onOpenAuth('signup')}
              className="text-lg px-10 py-4 font-semibold bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Free Today
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onOpenAuth('login')}
              className="text-lg px-10 py-4 border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Sign In
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Free to join • No hidden fees • Cancel anytime
            </p>
          </div>

          {/* Bible Verse */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-lg font-playfair italic text-blue-300 mb-2">
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future."
            </p>
            <p className="text-gray-400 text-sm">- Jeremiah 29:11</p>
          </div>
        </div>
      </div>
    </section>
  );
};
