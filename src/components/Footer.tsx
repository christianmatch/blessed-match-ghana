
import { Heart, Mail, Users, Calendar } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'About': [
      { label: 'Our Mission', href: '#' },
      { label: 'How It Works', href: '#' },
      { label: 'Success Stories', href: '#' },
      { label: 'Church Partners', href: '#' },
    ],
    'Features': [
      { label: 'Faith Matching', href: '#' },
      { label: 'Prayer Partners', href: '#' },
      { label: 'Christian Events', href: '#' },
      { label: 'Daily Devotionals', href: '#' },
    ],
    'Support': [
      { label: 'Help Center', href: '#' },
      { label: 'Safety Tips', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Report Issue', href: '#' },
    ],
    'Legal': [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
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
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-300">info@christianmatchghana.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-300">10,000+ Active Members</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-christian-blue" />
                <span className="text-gray-300">50+ Church Partners</span>
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
