import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-colors"
    >
      {language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}