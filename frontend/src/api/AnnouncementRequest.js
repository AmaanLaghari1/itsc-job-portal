import axios from "axios";
import setupAxiosInterceptor from "../helpers/setupAxiosInterceptor";

const API = axios.create({baseURL: import.meta.env.VITE_API_URL+"announcement/"})

// Authorization Header
// setupAxiosInterceptor(API);

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
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            // "Authorization": "Bearer "+ token
        }
    })
}

export const getRecentAnnouncement = (cutoff) => {
    return API.get("recent/"+cutoff, {
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

export const getReport = (formdata) => {
    return API.post('report/get', formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const downloadApplicationsReport = async (payload) => {
  return API.post(`report/applications`,
    payload,
    {
      responseType: "blob",   // IMPORTANT for PDF
    }
  );
};

export const downloadApplicationExperienceReport = async (payload) => {
  return API.post(`report/experience`,
    payload,
    {
      responseType: "blob",   // IMPORTANT for PDF
    }
  );
};

export const downloadCandidatesReport = async (payload) => {
  return API.post(`report/candidates`,
    payload,
    {
      responseType: "blob",   // IMPORTANT for PDF
    }
  );
};