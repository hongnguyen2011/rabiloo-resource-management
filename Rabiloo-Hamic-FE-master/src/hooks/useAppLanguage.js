import {useEffect, useState} from 'react';
import {Strings} from '../utils';

let listeners = [];

function useAppLanguage() {
  const langLocal = localStorage.getItem('lang');
  const [language, setLanguage] = useState(langLocal);

  useEffect(() => {
    listeners.push(setLanguage);
    return () => {
      const newListeners = listeners.filter(listener => {
        return listener !== setLanguage;
      });
      listeners = newListeners;
    };
  }, []);

  useEffect(() => {
    if (language) {
      localStorage.setItem('lang', language);
      listeners.forEach(listener => listener(language));
    } else {
      setLanguage('VI');
    }
  }, [language]);

  //write this to recommend code in other files
  let STRINGS = Strings.EN;
  if (language) {
    STRINGS = Strings[language];
  }

  return {
    Strings: STRINGS,
    setLanguage: setLanguage,
    language: language,
  };
}

export {useAppLanguage};
