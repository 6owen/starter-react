import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from 'axios'

function getBrowserToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.sessionStorage.getItem('token')
}

export function createHttpClient(axiosConfig: AxiosRequestConfig) {
  const instance = axios.create(axiosConfig)

  instance.interceptors.request.use((config) => {
    const token = getBrowserToken()
    const headers = (config.headers ?? {}) as AxiosRequestHeaders

    headers['X-Requested-With'] = 'XMLHttpRequest'

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    config.headers = headers

    return config
  })

  instance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => Promise.reject(error.response?.data ?? error),
  )

  return instance as AxiosInstance
}

export const http = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
})
