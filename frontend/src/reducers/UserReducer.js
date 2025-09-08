const initialData = {
    userData: null,
    loading: false,
    error: false,
    updLoading: true
}

const UserReducer = (state=initialData, action) => {
    switch(action.type){
        case 'UPDATE_START': 
            return {...state, loading: true, error: false}
        case 'UPDATE_SUCCESS': 
            return {...state, userData: action.payload, loading: true, error: false}
        case 'UPDATE_FAILED': 
            return {...state, userData: action.payload, loading: false, error: true}

        default: 
            return state
    }
}

export default UserReducer