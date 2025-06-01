
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    setIsDarkMode(initialDarkMode);
    updateDocumentClass(initialDarkMode);

    // Load user preference from Supabase if authenticated
    loadUserThemePreference();
  }, []);

  const loadUserThemePreference = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('dark_mode_preference')
          .eq('id', user.id)
          .single();
        
        if (profile && profile.dark_mode_preference !== null) {
          setIsDarkMode(profile.dark_mode_preference);
          updateDocumentClass(profile.dark_mode_preference);
        }
      }
    } catch (error) {
      console.log('No user theme preference found');
    }
  };

  const updateDocumentClass = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateDocumentClass(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');

    // Save to Supabase if authenticated
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({ dark_mode_preference: newDarkMode })
          .eq('id', user.id);
      }
    } catch (error) {
      console.log('Could not save theme preference');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
