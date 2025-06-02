import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { tokens } from '@/locales/tokens'
import { i18n } from '@/locales/i18n'

let API_URL: string;
API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default apiClient

export function setupInterceptors(getToken: () => string | null) {
  let router: ReturnType<typeof useRouter> | null = null;
  let toast: ReturnType<typeof useToast> | null = null;

  const getRouter = () => {
    if (!router) {
      try {
        router = useRouter();
      } catch (error) {
        console.error('Router not available yet');
      }
    }
    return router;
  };

  const getToast = () => {
    if (!toast) {
      try {
        toast = useToast();
      } catch (error) {
        console.error('Toast service not available yet');
      }
    }
    return toast;
  };

  apiClient.interceptors.request.use(
    config => {
      const isAuthEndpoint = 
        (config.url?.includes('/auth/sign_in') || 
         config.url?.includes('/auth/sign_up'));
      
      const token = getToken()
      if (token && !isAuthEndpoint) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error)
  )

  apiClient.interceptors.response.use(
    response => response,
    error => {
      const { t } = i18n.global;
      
      if (error.response?.status === 401) {
        const toast = getToast();
        const router = getRouter();
        
        if (toast) {
          toast.add({
            severity: 'error',
            summary: t('common.sessionExpired'),
            detail: t('common.pleaseLogin'),
            life: 5000
          });
        } else {
          console.error('Session expired, please log in again');
        }
        
        if (router) {
          router.push('/login');
        } else {
          console.error('Router not available for redirection');
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error)
    }
  )
}
