import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { tokens } from '@/locales/tokens'

export function useAppToast() {
  const toast = useToast()
  const { t } = useI18n()

  return {
    success(message: string, title?: string) {
      toast.add({
        severity: 'success',
        summary: title || t(tokens.common.success),
        detail: message,
        life: 3000
      })
    },
    
    error(message: string, title?: string) {
      toast.add({
        severity: 'error',
        summary: title || t(tokens.common.error),
        detail: message,
        life: 5000
      })
    },
    
    info(message: string, title?: string) {
      toast.add({
        severity: 'info',
        summary: title || t(tokens.common.info),
        detail: message,
        life: 3000
      })
    },
    
    warning(message: string, title?: string) {
      toast.add({
        severity: 'warn',
        summary: title || t(tokens.common.warning),
        detail: message,
        life: 4000
      })
    }
  }
}
