import { createI18n } from 'vue-i18n';

import { en } from './translations/en';
import { ptBR } from './translations/pt-br';

export const i18n = createI18n({
  legacy: false,
  locale: 'ptBR',
  fallbackLocale: 'en',
  messages: {
    en,
    ptBR
  }
});
