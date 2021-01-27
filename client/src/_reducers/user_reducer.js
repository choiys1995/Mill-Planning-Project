import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CHECK_USER,
    PROFILE_CHECK,
    PROFILE_EDIT
} from '../_actions/types'

const initialState = {
    error: null,
    account: null
}

const userAction = function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload.data,
                            status: action.payload.status }
        case REGISTER_USER:
            return {...state, register: action.payload.data,
                status: action.payload.status}
        case AUTH_USER:
            return {...state, account: action.payload.data,
                status: action.payload.status}
        case LOGOUT_USER:
            return {...state, account: null,
                status: action.payload.status}
        case CHECK_USER:
            return {...state, checkIsExistUser: action.payload.data,
                status: action.payload.status}

        case PROFILE_CHECK:
            return {...state, passwordConfirm: action.payload.data,
                status: action.payload.status}

        case PROFILE_EDIT:
            return {...state, profileEdit: action.payload.data,
                status: action.payload.status}
        
        default:
            return state;
    }
}

export default userAction;