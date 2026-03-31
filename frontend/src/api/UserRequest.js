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

export const getUserById = (id) => {
    return API.get("get/"+id, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const getUser = () => {
    return API.get("get", {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const uploadImg = (data) => API.post('/upload-img/', data)

export const addResearchPublication = (formData) => {
    return API.post('add_research_publication', formData, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data"
        }
    })
}

export const getResearchPublications = (user_id) => {
    return API.get(`get_research_publications/${user_id}`, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const deleteResearchPublication = (id) => {
    return API.delete(`delete_research_publication/${id}`, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const updateResearchPublication = (id, formData) => {
    return API.put(`update_research_publication/${id}`, formData, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}