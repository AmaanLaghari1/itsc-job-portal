const initialData = {
    completeness: {
        profile: 0,
        qualification: 0,
        experience: 0,
    },
    loading: false,
    error: false,
    updLoading: true
}

const profileReducer = (state=initialData, action) => {
    switch(action.type){
        case 'COMPLETENESS_START': 
            return {...state, loading: true, error: false}
        case 'GET_ALL_COMPLETENESS': 
            return {...state, completeness: action.payload, loading: true, error: false}
        case 'PROFILE_COMPLETENESS_SUCCESS': 
            return {...state, completeness: {...state.completeness, profile: action.payload}, loading: true, error: false}
        case 'QUALIFICATION_COMPLETENESS_SUCCESS': 
            return {...state, completeness: {...state.completeness, qualification: action.payload}, loading: true, error: false}
        case 'EXPERIENCE_COMPLETENESS_SUCCESS': 
            return {...state, completeness: {...state.completeness, experience: action.payload}, loading: true, error: false}
        case 'COMPLETENESS_FAILED': 
            return {...state, completeness: action.payload, loading: false, error: true}

        default: 
            return state
    }
}

export default profileReducer