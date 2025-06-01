
import { Heart, Mail, Users, Calendar, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'About': [
      { label: 'Our Mission', href: '/about' },
      { label: 'How It Works', href: '/about' },
      { label: 'Success Stories', href: '/about' },
      { label: 'Church Partners', href: '/about' },
    ],
    'Features': [
      { label: 'Faith Matching', href: '/about' },
      { label: 'Prayer Partners', href: '/about' },
      { label: 'Christian Events', href: '/gallery' },
      { label: 'Daily Devotionals', href: '/blog' },
    ],
    'Support': [
      { label: 'Help Center', href: '#' },
      { label: 'Safety Tips', href: '#' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Report Issue', href: '#' },
    ],
    'Legal': [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Community Guidelines', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  return (
    <footer id="contact" className="bg-christian-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-christian-blue p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-playfair font-bold">
                Christian Match Ghana
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting Christian singles across Ghana through faith-centered relationships. 
              Find your God-given partner in a safe, verified community of believers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-christian-blue mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>GPS: GW-0000-4771</div>
                  <div>Next to Raydos pharmacy</div>
                  <div>Jacos Media Building</div>
                  <div>Amasaman Stadium Junction</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-christian-blue" />
                <div className="text-gray-300">
                  <div>+233 256 023 816</div>
                  <div>+233 592 036 044</div>
                  <div>+233 578 870 638</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-300">christianmatchghanaltd@gmail.com</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-300">500+ Active Members</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-300">25+ Church Partners</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4 text-christian-gold">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Christian Match Ghana. All rights reserved.
            </div>
            
            {/* Bible Verse */}
            <div className="text-center md:text-right">
              <p className="text-sm text-christian-gold font-medium">
                "Love is patient, love is kind" - 1 Corinthians 13:4
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
