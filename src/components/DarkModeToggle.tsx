
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
      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-highlight-yellow" />
      ) : (
        <Moon className="h-5 w-5 text-christian-navy" />
      )}
    </Button>
  );
};
