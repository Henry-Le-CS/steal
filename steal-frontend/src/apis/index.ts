import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
})

export * from './product'
export * from './checkout'
export * from './order'