
import { Heart } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

export const Logo = ({ className = "", showText = true, textSize = "text-xl" }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-sacred-blue dark:bg-radiant-yellow p-2 rounded-full transition-colors duration-200">
        <Heart className="h-6 w-6 text-white dark:text-nightly-navy fill-current" />
      </div>
      {showText && (
        <span className={`font-playfair font-bold text-deep-maroon dark:text-divine-gold transition-colors duration-200 ${textSize}`}>
          Christian Match Ghana
        </span>
      )}
    </div>
  );
};
