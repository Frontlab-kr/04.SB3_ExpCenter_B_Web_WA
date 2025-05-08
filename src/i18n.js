import { createI18n } from 'vue-i18n';
import ko from '@/locales/ko.json';
import en from '@/locales/en.json';


const messages = {
  ko: ko,
  en: en,
};

const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  // fallbackLocale: 'ko',
  warnHtmlMessage: false, // disable warning HTML in message
  messages,
});


export default i18n;