import Vue from 'vue'
import VueI18n from 'vue-i18n'
import utils from '@/util/index'
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'
import zhCN from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}
let urlLanguage = utils.getIframeParam('uac')
let language = urlLanguage || utils.getCookie('Language') || 'en'
console.log('cookie:', utils.getCookie('Language'), 'language', language)

if (language === 'zh_CN') {
  locale.use(zhCN)
} else {
  locale.use(en)
}

export default new VueI18n({
  locale: language,
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})
