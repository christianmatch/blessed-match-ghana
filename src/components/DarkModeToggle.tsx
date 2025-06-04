
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="hover:bg-faithful-ivory dark:hover:bg-charcoal-gray transition-colors"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-radiant-yellow" />
      ) : (
        <Moon className="h-5 w-5 text-deep-maroon" />
      )}
    </Button>
  );
};
