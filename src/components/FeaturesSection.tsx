
import { Heart, Users, Bell, Calendar, Book, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Heart,
      title: 'Faith-Based Matching',
      description: 'Our advanced algorithm considers your denomination, prayer habits, and spiritual maturity to find compatible matches.',
      color: 'text-red-500'
    },
    {
      icon: Users,
      title: 'Verified Profiles',
      description: 'Church affiliation verification and leader endorsements ensure authentic Christian connections.',
      color: 'text-christian-blue'
    },
    {
      icon: Bell,
      title: 'Prayer Partner Matching',
      description: 'Find someone to pray with and share spiritual burdens through our prayer partner feature.',
      color: 'text-christian-gold'
    },
    {
      icon: Calendar,
      title: 'Christian Events',
      description: 'Discover local church events, mission trips, and Christian gatherings in your area.',
      color: 'text-green-500'
    },
    {
      icon: Book,
      title: 'Daily Devotionals',
      description: 'Share and discuss daily devotionals with your matches to deepen spiritual connections.',
      color: 'text-purple-500'
    },
    {
      icon: Video,
      title: 'Video Testimonials',
      description: 'Share your faith journey through short video testimonials on your profile.',
      color: 'text-orange-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy mb-6">
            Features Built on Faith
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover meaningful connections through features designed specifically for Christian singles seeking God-centered relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="hover-lift border-0 shadow-lg group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-christian-navy mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Banner */}
        <div className="mt-16 bg-gradient-to-r from-christian-blue to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Safe & Secure Platform</h3>
          <p className="text-lg opacity-90 mb-6">
            Advanced content moderation, language filters, and admin oversight ensure a pure, Christian environment for all members.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Content Moderation</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Language Filters</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ 24/7 Support</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Privacy Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
};
