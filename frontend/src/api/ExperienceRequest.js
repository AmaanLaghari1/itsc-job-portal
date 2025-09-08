import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"experience/"})

export const createExperience = (formdata) => {
    return API.post("post", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getExperience = (userId) => {
    return API.get("get/"+userId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateExperience = (formdata, id) => {
    return API.put("put/"+id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const deleteExperience = (id) => {
    return API.delete("delete/"+id, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}
