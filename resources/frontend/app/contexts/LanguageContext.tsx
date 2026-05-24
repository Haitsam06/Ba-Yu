import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'id' | 'en' | 'ja' | 'ko' | 'zh' | 'es' | 'fr' | 'de' | 'pt' | 'ru';
export type LanguagePreference = LanguageCode | 'system';

interface LanguageContextType {
  language: LanguagePreference;
  resolvedLanguage: LanguageCode;
  setLanguage: (lang: LanguagePreference) => void;
}

const SUPPORTED_LANGUAGES: LanguageCode[] = ['id', 'en', 'ja', 'ko', 'zh', 'es', 'fr', 'de', 'pt', 'ru'];

function detectSystemLanguage(): LanguageCode {
  const browserLang = navigator.language?.toLowerCase() || 'id';
  
  // Exact match first (e.g. 'ja', 'ko')
  const exact = SUPPORTED_LANGUAGES.find(l => browserLang === l);
  if (exact) return exact;

  // Prefix match (e.g. 'en-US' -> 'en', 'zh-CN' -> 'zh', 'pt-BR' -> 'pt')
  const prefix = browserLang.split('-')[0] as LanguageCode;
  if (SUPPORTED_LANGUAGES.includes(prefix)) return prefix;

  // Default to Indonesian
  return 'id';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguagePreference>(() => {
    if (typeof window === 'undefined') return 'id';
    const stored = localStorage.getItem('bayu-lang') as LanguagePreference | null;
    return stored || 'id';
  });

  const [resolvedLanguage, setResolvedLanguage] = useState<LanguageCode>('id');

  useEffect(() => {
    let resolved: LanguageCode;
    if (language === 'system') {
      resolved = detectSystemLanguage();
    } else {
      resolved = language;
    }
    setResolvedLanguage(resolved);
    localStorage.setItem('bayu-lang', language);
    document.documentElement.setAttribute('lang', resolved);
  }, [language]);

  // Listen for system language changes when set to 'system'
  useEffect(() => {
    if (language !== 'system') return;

    const handleLanguageChange = () => {
      setResolvedLanguage(detectSystemLanguage());
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, [language]);

  const setLanguage = (newLang: LanguagePreference) => {
    setLanguageState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, resolvedLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { SUPPORTED_LANGUAGES };
