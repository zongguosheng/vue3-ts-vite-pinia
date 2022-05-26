// import Vue from 'vue'
import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/utils/cookies'

// element-ui built-in lang
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementEsLocale from 'element-plus/lib/locale/lang/es'
import elementJaLocale from 'element-plus/lib/locale/lang/ja'
import elementKoLocale from 'element-plus/lib/locale/lang/ko'
import elementItLocale from 'element-plus/lib/locale/lang/it'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'
import koLocale from './ko'
import itLocale from './it'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale
  },
  ko: {
    ...koLocale,
    ...elementKoLocale
  },
  it: {
    ...itLocale,
    ...elementItLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    document.documentElement.lang = cookieLanguage
    return cookieLanguage
  }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      document.documentElement.lang = locale
      return locale
    }
  }

  // Default language is english
  return 'en'
}

const i18n = createI18n({
  locale: getLocale(),
  globalInjection: true,
  messages
})

export default i18n
