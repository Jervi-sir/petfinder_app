import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeyNames from '@utils/KeyNames';

const LanguageContext = createContext(null);
const KEY_NAME = KeyNames.currentLanguage;

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English'); // default language
  const [isRtl, setIsRtl] = useState(false); // default is left-to-right

  useEffect(() => {
    
    getLanguage();
  }, []);

  const getLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem(KEY_NAME);
      if (storedLanguage) {
        setLanguage(storedLanguage);
        setIsRtl(storedLanguage === 'Arabic');
      }
    } catch (error) {
      console.error('Failed to get language:', error);
    }
  };

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    setIsRtl(newLanguage === 'Arabic'); 
    await AsyncStorage.setItem(KEY_NAME, newLanguage);
  };

  const translate = (key) => {
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, isRtl, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );

};

export const translations = {
  "English":{
     "English":"English",
     "French":"Anglais",
     "Arabic":"الإنجليزية"
  },
  "French":{
     "English":"French",
     "French":"Français",
     "Arabic":"الفرنسية"
  },
  "Arabic":{
     "English":"Arabic",
     "French":"Arabe",
     "Arabic":"العربية"
  },


   
}