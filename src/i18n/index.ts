import { getLocales } from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import { I18n } from 'i18n-js';

import en from './en/common';
import fr from './fr/common';

const i18n = new I18n({
  en,
  fr,
});

// Supported languages
export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const LANGUAGE_STORAGE_KEY = 'app_language';

// Get device language or default to English
function getDeviceLanguage(): SupportedLanguage {
  const locales = getLocales();
  if (locales && locales.length > 0) {
    const deviceLang = locales[0].languageCode;
    if (deviceLang && SUPPORTED_LANGUAGES.includes(deviceLang as SupportedLanguage)) {
      return deviceLang as SupportedLanguage;
    }
  }
  return 'en';
}

// Initialize language from storage or device
export async function initializeLanguage(): Promise<SupportedLanguage> {
  try {
    const storedLanguage = await SecureStore.getItemAsync(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage as SupportedLanguage)) {
      i18n.locale = storedLanguage;
      return storedLanguage as SupportedLanguage;
    }
  } catch (error) {
    console.warn('Failed to load language from storage:', error);
  }

  const deviceLang = getDeviceLanguage();
  i18n.locale = deviceLang;
  return deviceLang;
}

// Change language and persist
export async function changeLanguage(lang: SupportedLanguage): Promise<void> {
  i18n.locale = lang;
  try {
    await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to save language to storage:', error);
  }
}

// Toggle between supported languages
export function getNextLanguage(currentLang: SupportedLanguage): SupportedLanguage {
  const currentIndex = SUPPORTED_LANGUAGES.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
  return SUPPORTED_LANGUAGES[nextIndex];
}

// Set fallback behavior
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;
