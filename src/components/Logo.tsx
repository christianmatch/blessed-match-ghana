
import { Heart } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

export const Logo = ({ className = "", showText = true, textSize = "text-xl" }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-christian-blue p-2 rounded-full">
        <Heart className="h-6 w-6 text-white fill-current" />
      </div>
      {showText && (
        <span className={`font-playfair font-bold text-christian-navy dark:text-white ${textSize}`}>
          Christian Match Ghana
        </span>
      )}
    </div>
  );
};
