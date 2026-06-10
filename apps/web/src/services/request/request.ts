import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from 'axios'

export function createRequest(axiosConfig: AxiosRequestConfig) {
  const instance = axios.create(axiosConfig)

  instance.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem('token')
    const headers = config.headers as AxiosRequestHeaders

    headers['X-Requested-With'] = 'XMLHttpRequest'

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => Promise.reject(error.response?.data ?? error),
  )

  return instance as AxiosInstance
}
