import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL + "application/" })

export const createApplication = (formdata) => {
    return API.post("post", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

// export const applicationRequirement = (formdata) => {
//     return API.post("application_requirement", formdata, {
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-Type": "application/json"
//         }
//     })
// }

// ApplicationRequest.js
export const applicationRequirement = async (formdata) => {
    try {
        const res = await API.post("application_requirement", formdata);
        return res.data;
    } catch (error) {
        if (error.response?.status === 403) {
            // Expected case → user not eligible
            return {
                success: false,
                message: error.response?.data?.error_message || "Not eligible",
            };
        }

        // Unexpected errors only
        console.error("Unexpected error:", error);
        throw error;
    }
};

export const getApplicationById = (id) => {
    return API.get("get/" + id, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getApplication = (userId) => {
    return API.get("get_by_user_id/" + userId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getApplicationExperience = (applicationId) => {
    return API.get("experience/get/" + applicationId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getPaidApplications = (formdata) => {
    return API.post("payment/report/get", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getApplicationByAnnouncementId = (announcementId) => {
    return API.get("get_by_announcement/" + announcementId, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateApplication = (formdata, id) => {
    return API.put("put/" + id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateApplicationExperience = (formdata, id) => {
    return API.put("experience/update/" + id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const deleteApplication = (id) => {
    return API.delete("delete/" + id, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateUserApplicationData = (formdata, id) => {
    return API.put("update-user/" + id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const importPaidApplications = (formdata) => {
    return API.put("payment/import", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getUserApplicationQualifications = (applicationId) => {
    return API.get("qualifications/get/" + applicationId, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const updateQualification = (formdata, id) => {
    return API.put("qualifications/update/" + id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const updateExperience = (formdata, id) => {
    return API.put("experience/update/" + id, formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getUserApplicationExperience = (applicationId) => {
    return API.get("experience/get/" + applicationId, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const getApplicationByCNIC = (formData) => {
    return API.post("get_by_cnic", formData, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const addExperience = (formdata) => {
    return API.post("experience/add", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const deleteExperience = (formdata) => {
    return API.post("experience/delete", formdata, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    })
}

export const getApplicationStatuses = () => {
    return API.get("status/get", {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const addScrutinyApplication = (formdata) => {
    return API.post("scrutiny/add", formdata, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getScrutinyApplications = (formdata) => {
    return API.post('scrutiny/get', formdata, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const changeScrutinyStatus = (formdata) => {
    return API.post('scrutiny/update', formdata, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const scrutinyReportDownload = (formdata) => {
    return API.post('scrutiny/report/download', formdata,
        {
            responseType: "blob",   // IMPORTANT for PDF
        }
    )
}