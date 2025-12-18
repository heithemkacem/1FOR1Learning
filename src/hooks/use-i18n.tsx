import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import i18n, {
    changeLanguage,
    getNextLanguage,
    initializeLanguage,
    SUPPORTED_LANGUAGES,
    type SupportedLanguage,
} from '@/src/i18n';

type I18nContextType = {
  locale: SupportedLanguage;
  t: (scope: string, options?: Record<string, unknown>) => string;
  toggleLanguage: () => Promise<void>;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  isLoading: boolean;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<SupportedLanguage>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    initializeLanguage().then((lang) => {
      setLocale(lang);
      setIsLoading(false);
    });
  }, []);

  const setLanguage = useCallback(async (lang: SupportedLanguage) => {
    await changeLanguage(lang);
    setLocale(lang);
    forceUpdate((n) => n + 1); // Force re-render
  }, []);

  const toggleLanguage = useCallback(async () => {
    const nextLang = getNextLanguage(locale);
    await setLanguage(nextLang);
  }, [locale, setLanguage]);

  // Create t function that depends on locale to trigger re-renders
  const t = useMemo(() => {
    return (scope: string, options?: Record<string, unknown>) => {
      return i18n.t(scope, options);
    };
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t, toggleLanguage, setLanguage, isLoading }),
    [locale, t, toggleLanguage, setLanguage, isLoading]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export { SUPPORTED_LANGUAGES, type SupportedLanguage };
