import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/', // Adjust as needed
})

// Request Interceptor → Always send token if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

// Response Interceptor → Redirect to login if 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access') // Clear old/invalid token
            window.location.href = '/login/customer' // Redirect to login
        }
        return Promise.reject(error)
    }
)

export default api
