import axios from 'axios'
import getStoredState from 'redux-persist/es/getStoredState'

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
    return API.post("logout", null, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
}

export const checkLoggedIn = (token) => {
    return API.get(import.meta.env.VITE_API_URL+"login-check/"+token, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
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

export const setPassword = (formdata) => {
    return API.post("change-password", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const resetPassword = (formdata) => {
    return API.post("reset-password", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const verifyPasswordToken = (token) => {
    return API.get("verify-password-token/"+token, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}