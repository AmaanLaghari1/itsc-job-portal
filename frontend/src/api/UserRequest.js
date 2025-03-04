import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"user/"})

export const createUser = (formdata) => {
    return API.post("post", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateUser = (formdata, id) => {
    return API.put("put/"+id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const uploadImg = (data) => API.post('/upload-img/', data)