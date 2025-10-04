import axios from "axios";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"qualification/"})

export const createQualification = (formdata) => {
    return API.post("post", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getQualification = (userId) => {
    return API.get("get/"+userId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateQualification = (formdata, id) => {
    return API.put("put/"+id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const deleteQualification = (id) => {
    return API.delete("delete/"+id, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getDegreeProgram = () => {
    return API.get("program", {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getProgramDiscipline = (programId) => {
    return API.get("discipline/"+programId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}
