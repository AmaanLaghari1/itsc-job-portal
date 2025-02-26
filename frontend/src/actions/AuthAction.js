import * as API from '../api/AuthRequest';

export const register = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: "AUTH_START" });
        
        try {
            const response = await API.register(formdata);
            console.log("Full API Response:", response);
            
            if (response.data?.status) { // Use response.data.status instead of response.success
                console.log("Response Data:", response.data);
                const auth = response.data;
                
                if (auth) {
                    dispatch({ type: "AUTH_SUCCESS", payload: auth });
                    return { success: true, data: response.data };
                } else {
                    console.error("User data is missing in response");
                    dispatch({ type: "AUTH_FAILED" });
                    return { success: false, data: response.data };
                }
            } else {
                console.error("Registration failed:", response.data);
                dispatch({ type: "AUTH_FAILED" });
                return { success: false, data: response.data?.message || "Registration failed" };
            }
        } catch (e) {
            console.error("Error in registration:", e);
            dispatch({ type: "AUTH_FAILED" });
            return { success: false, error: e.response?.data || e.response?.data?.message || "Sign up failed" };
        }
    };
};

export const login = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: "AUTH_START" });
        try {
            const response = await API.login(formdata);
            console.log("Full API Response:", response);
            
            if (response?.data?.status) { // Use response.data.status instead of response.success
                console.log("Response Data:", response.data);
                const auth = response.data;
                
                if (auth) {
                    dispatch({ type: "AUTH_SUCCESS", payload: auth });
                    return { success: true, data: response.data };
                } else {
                    console.error("User data is missing in response");
                    dispatch({ type: "AUTH_FAILED" });
                    return { success: false, data: response.data };
                }
            } else {
                console.error("Login failed:", response.data);
                dispatch({ type: "AUTH_FAILED" });
                return { success: false, data: response.data?.message || "Login failed" };
            }
        } catch (e) {
            console.error("Error in loggin in:", e);
            dispatch({ type: "AUTH_FAILED" });
            return { success: false, error: e.response?.data || e.response?.data?.message || "Login failed" };
        }
    }
}

export const logOut = (token) => {
    return async dispatch => {
        try {
            const response = await API.logout(token)
            dispatch({type: "LOGOUT"})
        } catch (error) {
            console.log(error || 'some error occured')
        }
    }
}

export const verifyEmail = (formdata) => {
    return async dispatch => {
        try {
            const response = await API.verifyEmail(formdata)
            const auth = response.data
            if(auth){
                dispatch({type: "AUTH_SUCCESS", payload: auth})
                return { success: true, data: response.data }
            }
            else {
                dispatch({type: "AUTH_FAILED"})
                return { success: false, data: response.data?.message || "Verification failed" };
            }
        }
        catch (e) {
            console.log(e)
            dispatch({type: "AUTH_FAILED"})
            return { success: false, error: e.response?.data || e.response?.data?.message || "Verification failed" };
        }
    }
}
