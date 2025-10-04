import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"degree_program/"})

export const getProgram = () => {
    return API.get('get', {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getDisciplineByProgramId = (programId) => {
    return API.get('discipline/get/'+programId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const createDiscipline = (formdata) => {
    return API.post('discipline/post', formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateDiscipline = (formdata, id) => {
    return API.put('discipline/put/'+id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const setDisciplineStatus = (formdata, id) => {
    return API.put('discipline/status/update/'+id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}