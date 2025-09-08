import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL})

export const getDeptWithAnnouncement = () => {
    return API.get('/department/get', {
        header: {
            "Content-Type": "application/json"
        }
    })
}

export const assignUserRole = (formdata) => {
    return API.post('/assign_role', formdata, {
        header: {
            "Content-Type": "application/json"
        }
    })
}

export const removeUserRole = (roleId) => {
    return API.get('/delete_role/'+roleId, {}, {
        header: {
            "Content-Type": "application/json"
        }
    })
}
