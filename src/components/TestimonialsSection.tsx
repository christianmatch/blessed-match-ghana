
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah & Michael',
      location: 'Accra, Ghana',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'We met through Christian Match Ghana and instantly connected over our shared love for missions. Six months later, we were engaged!',
      verse: 'Ecclesiastes 4:12'
    },
    {
      name: 'Emmanuel & Grace',
      location: 'Kumasi, Ghana',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'The prayer partner feature brought us together. We started praying for each other and God opened our hearts to love.',
      verse: 'Matthew 18:20'
    },
    {
      name: 'David & Ruth',
      location: 'Tamale, Ghana',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'Christian Match Ghana helped us find not just love, but a ministry partner. We now serve together in youth ministry.',
      verse: 'Genesis 2:18'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-christian-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy mb-6">
            Love Stories Written by God
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read how Christian Match Ghana has been instrumental in bringing together believers who now walk in God's perfect plan for their lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="hover-lift bg-white border-0 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name} testimonial`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-sm opacity-90">{testimonial.location}</div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <Heart className="h-5 w-5 text-christian-gold mr-2 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.story}"
                  </p>
                </div>
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-christian-blue font-medium">
                    {testimonial.verse}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-christian-blue">
            <Heart className="h-5 w-5" />
            <span className="text-lg font-medium">Your love story could be next</span>
            <Heart className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
};
