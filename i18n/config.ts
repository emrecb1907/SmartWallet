import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translations
import onboardingTr from './locales/onboarding/tr.json';
import onboardingEn from './locales/onboarding/en.json';
import nameInputTr from './locales/name-input/tr.json';
import nameInputEn from './locales/name-input/en.json';
import homeTr from './locales/home/tr.json';
import homeEn from './locales/home/en.json';
import cardsTr from './locales/cards/tr.json';
import cardsEn from './locales/cards/en.json';
import payTr from './locales/pay/tr.json';
import payEn from './locales/pay/en.json';
import analyticsTr from './locales/analytics/tr.json';
import analyticsEn from './locales/analytics/en.json';
import profileTr from './locales/profile/tr.json';
import profileEn from './locales/profile/en.json';
import sendMoneyTr from './locales/send-money/tr.json';
import sendMoneyEn from './locales/send-money/en.json';
import confirmPaymentTr from './locales/confirm-payment/tr.json';
import confirmPaymentEn from './locales/confirm-payment/en.json';
import tabsTr from './locales/tabs/tr.json';
import tabsEn from './locales/tabs/en.json';

export const LANGUAGE_STORAGE_KEY = '@app_language';

// Get system language
const getSystemLanguage = (): string => {
  try {
    const systemLocale = Localization.locale;
    if (systemLocale && typeof systemLocale === 'string' && systemLocale.startsWith('tr')) {
      return 'tr';
    }
  } catch (error) {
    console.error('Error getting system language:', error);
  }
  return 'en';
};

// Load saved language or use system language
export const getInitialLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'tr' || savedLanguage === 'en') {
      return savedLanguage;
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
  return getSystemLanguage();
};

// Save language preference
export const saveLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Change language
export const changeLanguage = async (language: string): Promise<void> => {
  await saveLanguage(language);
  i18n.changeLanguage(language);
};

const resources = {
  tr: {
    onboarding: onboardingTr,
    'name-input': nameInputTr,
    home: homeTr,
    cards: cardsTr,
    pay: payTr,
    analytics: analyticsTr,
    profile: profileTr,
    'send-money': sendMoneyTr,
    'confirm-payment': confirmPaymentTr,
    tabs: tabsTr,
  },
  en: {
    onboarding: onboardingEn,
    'name-input': nameInputEn,
    home: homeEn,
    cards: cardsEn,
    pay: payEn,
    analytics: analyticsEn,
    profile: profileEn,
    'send-money': sendMoneyEn,
    'confirm-payment': confirmPaymentEn,
    tabs: tabsEn,
  },
};

// Initialize i18n with system language
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: getSystemLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Load saved language on init
getInitialLanguage().then((savedLang) => {
  if (savedLang !== getSystemLanguage()) {
    i18n.changeLanguage(savedLang);
  }
});

export default i18n;

