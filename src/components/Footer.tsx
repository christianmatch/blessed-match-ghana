
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-deep-maroon dark:bg-nightly-navy text-white py-8 sm:py-16 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="bg-sacred-blue dark:bg-radiant-yellow p-2 rounded-full transition-colors duration-200">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white dark:text-nightly-navy fill-current" />
              </div>
              <span className="font-playfair font-bold text-yellow-400 transition-colors duration-200 text-lg sm:text-xl lg:text-2xl">
                Christian Match Ghana
              </span>
            </div>
            <p className="text-faithful-ivory/90 dark:text-soft-white/90 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Christian Match Ghana is dedicated to helping God-fearing singles find their life partners through 
              faith-centered connections. Join thousands of believers who have found love through our platform.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="bg-divine-gold/20 hover:bg-divine-gold/30 p-2 rounded-full transition-colors">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-divine-gold" />
              </a>
              <a href="#" className="bg-divine-gold/20 hover:bg-divine-gold/30 p-2 rounded-full transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-divine-gold" />
              </a>
              <a href="#" className="bg-divine-gold/20 hover:bg-divine-gold/30 p-2 rounded-full transition-colors">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-divine-gold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-divine-gold">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/about" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors text-sm sm:text-base">About Us</Link></li>
              <li><Link to="/pricing" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors text-sm sm:text-base">Pricing</Link></li>
              <li><Link to="/blog" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors text-sm sm:text-base">Blog</Link></li>
              <li><Link to="/gallery" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors text-sm sm:text-base">Gallery</Link></li>
              <li><Link to="/terms" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors text-sm sm:text-base">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-divine-gold">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blush-pink dark:text-celestial-teal flex-shrink-0" />
                <span className="text-faithful-ivory/80 dark:text-soft-white/80 text-sm sm:text-base break-all">info@christianmatchghana.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blush-pink dark:text-celestial-teal flex-shrink-0" />
                <span className="text-faithful-ivory/80 dark:text-soft-white/80 text-sm sm:text-base">+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blush-pink dark:text-celestial-teal flex-shrink-0" />
                <span className="text-faithful-ivory/80 dark:text-soft-white/80 text-sm sm:text-base">Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-divine-gold/30 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-faithful-ivory/80 dark:text-soft-white/80 text-sm sm:text-base">
            © {new Date().getFullYear()} Christian Match Ghana. All rights reserved. Built with love for the Christian community.
          </p>
        </div>
      </div>
    </footer>
  );
};
