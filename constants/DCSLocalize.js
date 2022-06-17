import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import vn from './translations/vn';
import en from './translations/en';
const LANGUAGES = {
  vn,
  en,
};

const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      console.log(language + 5);
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing Vietnamese as fallback');
        }
        // const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(
        //   LANG_CODES
        // );
        callback( 'vn' );
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  },
};
i18n.use(LANGUAGE_DETECTOR).use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: LANGUAGES,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});
