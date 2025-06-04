
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-deep-maroon dark:bg-nightly-navy text-white py-16 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Logo className="mb-6" textSize="text-2xl" />
            <p className="text-faithful-ivory/90 dark:text-soft-white/90 mb-6 leading-relaxed">
              Christian Match Ghana is dedicated to helping God-fearing singles find their life partners through 
              faith-centered connections. Join thousands of believers who have found love through our platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-divine-gold/20 hover:bg-divine-gold/30 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5 text-divine-gold" />
              </a>
              <a href="#" className="bg-divine-gold/20 hover:bg-divine-gold/30 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5 text-divine-gold" />
              </a>
              <a href="#" className="bg-divine-gold/20 hover:bg-divine-gold/30 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-divine-gold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-divine-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors">Blog</Link></li>
              <li><Link to="/gallery" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors">Gallery</Link></li>
              <li><Link to="/terms" className="text-faithful-ivory/80 dark:text-soft-white/80 hover:text-divine-gold transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-divine-gold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blush-pink dark:text-celestial-teal" />
                <span className="text-faithful-ivory/80 dark:text-soft-white/80">info@christianmatchghana.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blush-pink dark:text-celestial-teal" />
                <span className="text-faithful-ivory/80 dark:text-soft-white/80">+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blush-pink dark:text-celestial-teal" />
                <span className="text-faithful-ivory/80 dark:text-soft-white/80">Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-divine-gold/30 mt-12 pt-8 text-center">
          <p className="text-faithful-ivory/80 dark:text-soft-white/80">
            © {new Date().getFullYear()} Christian Match Ghana. All rights reserved. Built with love for the Christian community.
          </p>
        </div>
      </div>
    </footer>
  );
};
