import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"announcement/"})
const AdminAPI = axios.create({baseURL: import.meta.env.VITE_API_URL+"admin/annoucement"})

export const createAnnouncement = (formdata) => {
    return API.post("post", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getAnnouncement = () => {
    return API.get("get", {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getRecentAnnouncement = () => {
    return API.get("recent", {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}


export const updateAnnouncement = (formdata, id) => {
    return API.put("put/"+id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const deleteAnnouncement = (id) => {
    return API.delete("delete/"+id, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}
