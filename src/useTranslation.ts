// useTranslation.ts - Auto-detect browser language and load translations
import { useState, useEffect } from 'react';
import translations from './translations.json';

type TranslationStrings = typeof translations.en;
type SupportedLanguage = keyof typeof translations;

// Language detection with fallback chain
function detectLanguage(): SupportedLanguage {
  // Try browser language first
  const browserLang = navigator.language.toLowerCase();
  
  // Check exact match (e.g., 'en-US' -> 'en')
  const primaryLang = browserLang.split('-')[0] as SupportedLanguage;
  
  if (primaryLang in translations) {
    return primaryLang;
  }
  
  // Check if any supported language starts with the browser language
  const matchedLang = Object.keys(translations).find(lang => 
    browserLang.startsWith(lang)
  ) as SupportedLanguage | undefined;
  
  if (matchedLang) {
    return matchedLang;
  }
  
  // Default to English
  return 'en';
}

// Replace placeholders like {name} and {email}
function interpolate(str: string, values: Record<string, string>): string {
  return str.replace(/\{(\w+)\}/g, (match, key) => values[key] || match);
}

export function useTranslation() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [strings, setStrings] = useState<TranslationStrings>(translations.en);

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
    setStrings(translations[detectedLang]);
    
    console.log(`[i18n] Detected language: ${detectedLang} (browser: ${navigator.language})`);
  }, []);

  // Helper function to get a translated string with optional interpolation
  const t = (key: keyof TranslationStrings, values?: Record<string, string>): string => {
    const text = strings[key] || translations.en[key]; // Fallback to English
    return values ? interpolate(text, values) : text;
  };

  return {
    t,
    language,
    setLanguage, // Allow manual override if needed
    availableLanguages: Object.keys(translations) as SupportedLanguage[],
  };
}

// Standalone function for non-React contexts
export function getTranslation(lang: SupportedLanguage = 'en'): TranslationStrings {
  return translations[lang] || translations.en;
}

export function getSupportedLanguages(): SupportedLanguage[] {
  return Object.keys(translations) as SupportedLanguage[];
}
