import axios from 'axios'

// const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"auth/"})

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + 'auth',  // Add base URL for authentication API
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // Ensure cookies (e.g., CSRF) are sent
});


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
    // Ensure you pass the correct Bearer token in the Authorization header
    return API.post("logout", {}, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token for logout
        },
    });
};

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