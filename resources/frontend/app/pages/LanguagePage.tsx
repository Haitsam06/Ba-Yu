import { MobileLayout } from '../components/MobileLayout';
import { ArrowLeft, Check, Globe, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage, type LanguagePreference } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface LangOption {
  id: LanguagePreference;
  nativeName: string;
  englishName: string;
  flag: string;
  description: string;
}

export default function LanguagePage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const languageOptions: LangOption[] = [
    {
      id: 'id',
      nativeName: 'Bahasa Indonesia',
      englishName: 'Indonesian',
      flag: '🇮🇩',
      description: 'Semua teks ditampilkan dalam Bahasa Indonesia.'
    },
    {
      id: 'en',
      nativeName: 'English',
      englishName: 'English',
      flag: '🇬🇧',
      description: 'All text will be displayed in English.'
    },
    {
      id: 'ja',
      nativeName: '日本語',
      englishName: 'Japanese',
      flag: '🇯🇵',
      description: 'すべてのテキストが日本語で表示されます。'
    },
    {
      id: 'ko',
      nativeName: '한국어',
      englishName: 'Korean',
      flag: '🇰🇷',
      description: '모든 텍스트가 한국어로 표시됩니다.'
    },
    {
      id: 'zh',
      nativeName: '中文简体',
      englishName: 'Chinese (Simplified)',
      flag: '🇨🇳',
      description: '所有文本将以简体中文显示。'
    },
    {
      id: 'es',
      nativeName: 'Español',
      englishName: 'Spanish',
      flag: '🇪🇸',
      description: 'Todo el texto se mostrará en español.'
    },
    {
      id: 'fr',
      nativeName: 'Français',
      englishName: 'French',
      flag: '🇫🇷',
      description: 'Tout le texte sera affiché en français.'
    },
    {
      id: 'de',
      nativeName: 'Deutsch',
      englishName: 'German',
      flag: '🇩🇪',
      description: 'Alle Texte werden auf Deutsch angezeigt.'
    },
    {
      id: 'pt',
      nativeName: 'Português',
      englishName: 'Portuguese',
      flag: '🇧🇷',
      description: 'Todo o texto será exibido em português.'
    },
    {
      id: 'ru',
      nativeName: 'Русский',
      englishName: 'Russian',
      flag: '🇷🇺',
      description: 'Весь текст будет отображаться на русском языке.'
    },
  ];

  const systemOption: LangOption = {
    id: 'system',
    nativeName: t('language.system'),
    englishName: 'Follow System',
    flag: '🌐',
    description: t('language.system_desc'),
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-black/20 flex justify-center font-['Manrope']">
        <div className="w-full max-w-[800px] min-h-screen border-x border-slate-200 dark:border-white/5 bg-white dark:bg-[#13111C]">
          {/* Top Navigation */}
          <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#13111C]/90 backdrop-blur-md border-b border-slate-100 dark:border-white/5 px-6 py-4 flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 p-1.5 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t('language.title')}
            </h1>
          </div>

          {/* Page Content */}
          <div className="px-6 py-8">
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {t('language.subtitle')}
              </h2>
              <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {t('language.description')}
              </p>
            </div>

            {/* System Option */}
            <div className="mb-6">
              <button
                onClick={() => setLanguage('system')}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5 group
                  ${language === 'system'
                    ? 'bg-indigo-50/50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 shadow-[0_4px_20px_rgba(79,70,229,0.08)] dark:shadow-none'
                    : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/10 hover:border-indigo-100 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/10'
                  }
                `}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors bg-slate-100 dark:bg-white/10`}>
                  <Monitor size={24} className="text-slate-500 dark:text-slate-400" strokeWidth={language === 'system' ? 2.5 : 2} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-[15px] font-bold mb-1 transition-colors ${language === 'system' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                    {systemOption.nativeName}
                  </h3>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {systemOption.description}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${language === 'system'
                    ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-500'
                    : 'border-slate-200 dark:border-white/20 group-hover:border-indigo-300 dark:group-hover:border-white/40'
                  }`}
                >
                  {language === 'system' && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {t('language.title')}
              </span>
              <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
            </div>

            {/* Language Options */}
            <div className="space-y-3">
              {languageOptions.map((option) => {
                const isActive = language === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => setLanguage(option.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 sm:gap-5 group
                      ${isActive
                        ? 'bg-indigo-50/50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 shadow-[0_4px_20px_rgba(79,70,229,0.08)] dark:shadow-none'
                        : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/10 hover:border-indigo-100 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl shrink-0">
                      {option.flag}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className={`text-[15px] font-bold transition-colors truncate ${isActive ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                          {option.nativeName}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
                          {option.englishName}
                        </span>
                      </div>
                      <p className="text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed truncate">
                        {option.description}
                      </p>
                    </div>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                      ${isActive
                        ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-500'
                        : 'border-slate-200 dark:border-white/20 group-hover:border-indigo-300 dark:group-hover:border-white/40'
                      }`}
                    >
                      {isActive && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Info Footer */}
            <div className="mt-10 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
              <div className="flex items-start gap-3">
                <Globe size={18} className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {t('language.info')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
