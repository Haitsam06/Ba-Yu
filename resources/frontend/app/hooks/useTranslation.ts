import { useLanguage, type LanguageCode } from '../contexts/LanguageContext';

// Import all locale files
import id from '../locales/id.json';
import en from '../locales/en.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import zh from '../locales/zh.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import pt from '../locales/pt.json';
import ru from '../locales/ru.json';

const translations: Record<LanguageCode, Record<string, any>> = {
  id, en, ja, ko, zh, es, fr, de, pt, ru,
};

/**
 * Get a nested value from an object by dot-separated key
 * e.g. getNestedValue(obj, 'nav.home') -> obj.nav.home
 */
function getNestedValue(obj: Record<string, any>, key: string): any {
  return key.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object') return acc[part];
    return undefined;
  }, obj as any);
}

/**
 * Custom hook that provides the translation function `t(key)`
 * 
 * Usage:
 *   const { t } = useTranslation();
 *   <h1>{t('nav.home')}</h1>  // "Beranda" or "Home" depending on language
 */
export function useTranslation() {
  const { resolvedLanguage } = useLanguage();

  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    // Try the current language first
    const value = getNestedValue(translations[resolvedLanguage], key);
    if (value !== undefined) return value;

    // Fallback to Indonesian (default)
    const fallback = getNestedValue(translations.id, key);
    if (fallback !== undefined) return fallback;

    // If key doesn't exist anywhere, return the key itself
    return key;
  };

  return { t, language: resolvedLanguage };
}
