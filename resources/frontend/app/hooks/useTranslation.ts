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
import ar from '../locales/ar.json';
import hi from '../locales/hi.json';
import ms from '../locales/ms.json';
import tr from '../locales/tr.json';
import ur from '../locales/ur.json';
import bn from '../locales/bn.json';
import vi from '../locales/vi.json';
import fa from '../locales/fa.json';
import it from '../locales/it.json';
import th from '../locales/th.json';
import pa from '../locales/pa.json';
import sw from '../locales/sw.json';
import nl from '../locales/nl.json';
import pl from '../locales/pl.json';
import uk from '../locales/uk.json';
import ro from '../locales/ro.json';
import cs from '../locales/cs.json';
import el from '../locales/el.json';
import hu from '../locales/hu.json';
import sv from '../locales/sv.json';
import fi from '../locales/fi.json';
import da from '../locales/da.json';
import tl from '../locales/tl.json';
import my from '../locales/my.json';
import km from '../locales/km.json';
import lo from '../locales/lo.json';
import ne from '../locales/ne.json';
import si from '../locales/si.json';
import he from '../locales/he.json';
import am from '../locales/am.json';
import zu from '../locales/zu.json';
import af from '../locales/af.json';
import enGB from '../locales/en-GB.json';
import zhTW from '../locales/zh-TW.json';

const translations: Record<LanguageCode, any> = {
  id,
  en,
  'en-GB': enGB,
  ja,
  ko,
  zh,
  'zh-TW': zhTW,
  es,
  fr,
  de,
  pt,
  ru,
  ar,
  hi,
  ms,
  tr,
  ur,
  bn,
  vi,
  fa,
  it,
  th,
  pa,
  sw,
  nl,
  pl,
  uk,
  ro,
  cs,
  el,
  hu,
  sv,
  fi,
  da,
  tl,
  my,
  km,
  lo,
  ne,
  si,
  he,
  am,
  zu,
  af,
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

  const t = (key: string, variables?: Record<string, any>): any => {
    // Try the current language first
    let value = getNestedValue(translations[resolvedLanguage], key);
    
    // Fallback to Indonesian (default)
    if (value === undefined) {
      value = getNestedValue(translations.id, key);
    }

    // If key doesn't exist anywhere, return the key itself
    if (value === undefined) return key;

    // Perform variable interpolation if it's a string
    if (typeof value === 'string' && variables) {
      Object.keys(variables).forEach((varKey) => {
        value = value.replace(new RegExp(`\\{\\{${varKey}\\}\\}`, 'g'), String(variables[varKey]));
      });
    }

    return value;
  };

  return { t, language: resolvedLanguage };
}
