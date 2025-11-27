import { SafeView } from '@/components/SafeView';
import { changeLanguage } from '@/i18n/config';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AnalyticsScreen() {
  const { t, i18n } = useTranslation('analytics');
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = async (language: 'tr' | 'en') => {
    if (language === currentLanguage) return;

    // Change language instantly
    try {
      await changeLanguage(language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <SafeView className="flex-1 bg-background">
      <View className="flex-1 px-4 pt-8">
        <Text className="text-primary text-2xl font-bold mb-8">{t('controlPanel')}</Text>

        <View className="gap-4">
          <Text className="text-secondary text-base mb-2">{t('languageSelection')}</Text>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => handleLanguageChange('tr')}
              className={`flex-1 py-4 px-4 rounded-xl border-2 items-center justify-center ${
                currentLanguage === 'tr'
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-card border-border'
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  currentLanguage === 'tr' ? 'text-white' : 'text-primary'
                }`}
              >
                {t('turkish')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleLanguageChange('en')}
              className={`flex-1 py-4 px-4 rounded-xl border-2 items-center justify-center ${
                currentLanguage === 'en'
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-card border-border'
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  currentLanguage === 'en' ? 'text-white' : 'text-primary'
                }`}
              >
                {t('english')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeView>
  );
}
