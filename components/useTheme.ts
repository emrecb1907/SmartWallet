import { useState, useEffect } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@app_theme';
const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const systemTheme = useSystemColorScheme();
  const [theme, setTheme] = useState<Theme>('system');
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      setIsOnboardingCompleted(completed === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setThemePreference = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const getActiveTheme = (): 'light' | 'dark' => {
    // Eğer tema açıkça ayarlanmışsa onu kullan
    if (theme === 'dark' || theme === 'light') {
      return theme;
    }
    // Onboarding tamamlandıysa her zaman koyu tema kullan
    if (isOnboardingCompleted) {
      return 'dark';
    }
    // Onboarding öncesi sistem temasını kullan
    return systemTheme === 'dark' ? 'dark' : 'light';
  };

  return {
    theme,
    activeTheme: getActiveTheme(),
    setTheme: setThemePreference,
    isLoading,
  };
}

