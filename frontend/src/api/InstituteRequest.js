import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+'institute/'})

export const getInstitute = () => {
    return API.get('get', {
        headers: {
            "Access-Control-Allow-Origin": '*'
        }
    })
}

export const getInstituteType = () => {
    return API.get('type/get', {
        headers: {
            "Access-Control-Allow-Origin": '*'
        }
    })
}

export const createInstitute = (formdata) => {
    return API.post('post', formdata, {
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": "application/json"
        }
    })
}

export const updateInstitute = (formdata, id) => {
    return API.put('put/'+id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}