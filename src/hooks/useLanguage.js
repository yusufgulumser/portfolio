import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage'dan dil tercihi al
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
    loadTranslations(savedLanguage);
  }, []);

  const loadTranslations = async (language) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/locales/${language}.json`);
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error(`Error loading ${language} translations:`, error);
      // Fallback to English if error
      if (language !== 'en') {
        const fallbackResponse = await fetch('/locales/en.json');
        const fallbackData = await fallbackResponse.json();
        setTranslations(fallbackData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    loadTranslations(newLanguage);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    return value || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    isLoading,
    availableLanguages: ['en', 'tr']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 