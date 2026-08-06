import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
})

API.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('ems_user')
    if (stored) {
      const { token } = JSON.parse(stored)
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch {
  }
  return config
})

export default API