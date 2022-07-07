import axios from "axios";


const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export const http = (options = {}) => {
    return axios.create({
        baseURL: BASE_URL,
        timeout: 60000,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    })
}