
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Shield, Award, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

const About = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const services = [
    {
      title: "Matchmaking",
      description: "Personalized matchmaking service dedicated to connecting Christian singles who share common faith and values. Our thoughtful approach ensures each match is spiritually compatible with shared life goals.",
      icon: <Heart className="h-8 w-8 text-love-red" />
    },
    {
      title: "Offline Dating",
      description: "We prioritize your safety with personalized matchmaking services instead of traditional online dating. Each match is carefully selected based on shared faith and values for meaningful connections.",
      icon: <Shield className="h-8 w-8 text-love-red" />
    },
    {
      title: "Relationship Coaching",
      description: "Experienced coaches provide guidance rooted in Christian principles, helping you navigate dating, engagement, and marriage with Christ-centered advice.",
      icon: <Users className="h-8 w-8 text-love-red" />
    },
    {
      title: "Singles Events",
      description: "Exclusive events from casual meetups to faith-based workshops and retreats. Connect with like-minded Christian singles in a safe, welcoming environment.",
      icon: <Award className="h-8 w-8 text-love-red" />
    },
    {
      title: "Speed Dating",
      description: "Unique speed dating events in a fun, structured environment with short face-to-face meetings to determine compatibility with multiple potential matches.",
      icon: <Heart className="h-8 w-8 text-love-red" />
    },
    {
      title: "Christian Counselling",
      description: "Professional therapeutic techniques integrated with biblical principles to address emotional, spiritual, and relational challenges with faith and wisdom.",
      icon: <Shield className="h-8 w-8 text-love-red" />
    },
    {
      title: "Marriage Preparation",
      description: "Thorough preparation through courses, seminars, and personalized counseling focusing on communication, conflict resolution, and spiritual growth.",
      icon: <Users className="h-8 w-8 text-love-red" />
    },
    {
      title: "Marriage Retreats",
      description: "Enriching retreats in peaceful, faith-centered environments where couples reconnect, reflect, and grow together through guided sessions and spiritual activities.",
      icon: <Award className="h-8 w-8 text-love-red" />
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Create an Account",
      description: "Fill and submit our subscription form to create your offline account with Christian Match Ghana.",
      icon: <Users className="h-8 w-8 text-love-red" />
    },
    {
      step: 2,
      title: "Complete Your Profile",
      description: "Take time to complete the form and provide every requested information about yourself and what you're looking for in a partner.",
      icon: <Heart className="h-8 w-8 text-love-red" />
    },
    {
      step: 3,
      title: "Pre-Match and Connect",
      description: "Our team analyzes and screens your profile, and pairs you with a potential match. We then release your information to your match upon your consent.",
      icon: <Shield className="h-8 w-8 text-love-red" />
    },
    {
      step: 4,
      title: "Connect and Date",
      description: "When you are satisfied with your match, connect and engage in meaningful, Godly conversations, go on dates, and let love bloom.",
      icon: <Award className="h-8 w-8 text-love-red" />
    }
  ];

  const whyChooseUs = [
    {
      title: "Personalized Service",
      description: "We offer one-on-one matchmaking services, ensuring that each match is carefully considered and aligned with your faith and values."
    },
    {
      title: "Faith-Based Matching",
      description: "Our focus on spiritual compatibility sets us apart, helping you find a partner who shares your commitment to a Christ-centered relationship."
    },
    {
      title: "Safety and Privacy",
      description: "Your safety and privacy are our top priorities. We conduct thorough background checks and maintain strict confidentiality."
    },
    {
      title: "Community Building",
      description: "We organize exclusive events and activities that provide opportunities for Christian singles to meet and connect in a safe environment."
    }
  ];

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
              About Christian Match Ghana
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Welcome to Christian Match Ghana, your trusted partner in finding meaningful, faith-based relationships. 
              Based in Accra, Ghana, we specialize in personalised offline matchmaking services tailored to the unique needs of Christian singles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "He who finds a wife finds what is good and receives favor from the Lord." - Proverbs 18:22
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                At Christian Match Ghana, we believe that love and faith go hand in hand. Our mission is to connect 
                like-minded individuals who share a common faith and values, fostering relationships that are built on 
                a strong, Christ-centered foundation. We understand that finding the right partner can be challenging, 
                which is why we are dedicated to providing personalized and thoughtful matchmaking.
              </p>
              <Button 
                onClick={() => handleOpenAuth('signup')}
                className="bg-love-red hover:bg-love-red-dark text-white"
              >
                Join Our Community
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-christian-cream to-white dark:from-surface-dark-elevated dark:to-surface-dark p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-love-red mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-300">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-growth-green mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-300">Success Stories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-highlight-yellow mb-2">25+</div>
                  <div className="text-gray-600 dark:text-gray-300">Church Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-christian-blue mb-2">100%</div>
                  <div className="text-gray-600 dark:text-gray-300">Faith-Centered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Services */}
        <div className="bg-gray-50 dark:bg-surface-dark-elevated py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
                Our Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive faith-based services to support your journey to lasting love
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="bg-love-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-christian-navy dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
              Our Approach
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our approach is simple yet effective. We take the time to get to know each of our clients personally, 
              understanding their faith journey, values, and relationship goals. This allows us to make thoughtful and 
              compatible matches that go beyond surface-level connections.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 dark:bg-surface-dark-elevated py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simple steps to finding your God-ordained partner
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card key={step.step} className="bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="bg-love-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="text-sm font-semibold text-love-red mb-2">Step {step.step}</div>
                    <h3 className="text-xl font-semibold text-christian-navy dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
              Why Choose Us?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-christian-navy dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet Our Founder */}
        <div className="bg-gray-50 dark:bg-surface-dark-elevated py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-8">
              Meet Our Founder
            </h2>
            <Card className="max-w-2xl mx-auto bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Mrs Gifty Gyapong Narh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-christian-navy dark:text-white mb-4">
                  Mrs Gifty Gyapong Narh
                </h3>
                <p className="text-love-red font-medium mb-4">Founder & CEO</p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  As the founder of Christian Match Ghana, Mrs Gifty Gyapong Narh has always been passionate about 
                  creating a community where faith and love flourish. With a strong commitment to fostering meaningful 
                  connections, Gifty launched this platform to help fellow believers find companionship grounded in 
                  shared values and faith in Christ. Inspired by personal experiences and a deep understanding of the 
                  importance of community, Gifty continues to lead with vision and heart, ensuring that Christian Match 
                  Ghana remains a trusted space for Christians to meet, connect, and grow together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-christian-navy dark:text-white mb-4">
              Visit Us
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-love-red mx-auto mb-4" />
                <h3 className="font-semibold text-christian-navy dark:text-white mb-3">Our Location</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  GPS: GW-0000-4771<br />
                  Next to Raydos pharmacy<br />
                  Jacos Media Building<br />
                  Amasaman Stadium Junction
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-love-red mx-auto mb-4" />
                <h3 className="font-semibold text-christian-navy dark:text-white mb-3">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  +233 256 023 816<br />
                  +233 592 036 044<br />
                  +233 578 870 638
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-surface-dark-elevated border-gray-200 dark:border-gray-700 text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-love-red mx-auto mb-4" />
                <h3 className="font-semibold text-christian-navy dark:text-white mb-3">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  christianmatchghanaltd@gmail.com<br />
                  <br />
                  christianmatchghana.com
                </p>
              </CardContent>
            </Card>
          </div>
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

export default About;
