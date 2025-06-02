import axios from 'axios'

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
  apiClient.interceptors.request.use(
    config => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error)
  )

  apiClient.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error)
    }
  )
}
