import * as API from '../api/UserRequest';

export const updateUser = (formData, id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'UPDATE_START' });

        try {
            const response = await API.updateUser(formData, id);
            console.log("Update Response -", response);

            if (response?.data?.status) {
                const { auth } = getState(); // Get the current auth state
                
                // Ensure authData is parsed properly
                const currentAuthData = typeof auth.authData === 'string' ? JSON.parse(auth.authData) : auth.authData;

                const updatedAuthData = { 
                    ...currentAuthData,  // Keep existing auth data
                    profile_completeness: response.data.profile_completeness,
                    user: { ...currentAuthData.user, ...response.data.data }, // Update user data only
                    token: auth.token // Ensure token remains unchanged
                };

                dispatch({ type: 'AUTH_SUCCESS', payload: updatedAuthData });
                dispatch({ type: 'PROFILE_COMPLETENESS_SUCCESS', payload: response.data.profile_completeness });
                
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.log("Update failed -", error);
            dispatch({ type: 'UPDATE_FAILED' });
        }
    };
};

export const uploadImage = (data) => {
    return async dispatch => {
    try {
        const response = await API.uploadImg(data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
}