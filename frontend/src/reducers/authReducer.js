const initialData = {
    authData: null,
    loading: false,
    error: false,
    updLoading: true,
}

const authReducer = (state = initialData, action) => {
    switch(action.type){
        case 'AUTH_START':
            return {...state, loading: true, error: false}
        case 'AUTH_SUCCESS':
            return {...state, authData: action.payload, loading: false, error: false}
        case 'AUTH_FAILED':
            return {...state, authData: action.payload, loading: false, error: true}
        case 'LOGOUT':
            localStorage.removeItem('persist:auth')
            return {...state, authData: null, loading: false, error: false}

        default:
            return state
    }
}

export default authReducer