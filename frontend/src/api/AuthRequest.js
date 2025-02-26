import axios from 'axios'

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"auth/"})

export const register = (formdata) => {
    return API.post("register", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const login = (formdata) => {
    return API.post("login", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const logout = (token) => {
    return API.post("logout", {}, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
}

export const verifyEmail = (formdata) => {
    return API.post("verify-email", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const resendOtp = (formdata) => {
    return API.post("resend-otp", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}