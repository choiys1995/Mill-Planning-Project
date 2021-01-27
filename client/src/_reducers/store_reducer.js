import {
    STORE_ADD,
    STORE_INFO,
    STORE_SEARCH,
    STORE_LIMIT_SEARCH,
    STORE_UPDATE,
    STORE_ADMIN_LIST
} from '../_actions/types'

const initialState = {
    error: null,
    store: null,
}

const storeReducer = function (state = initialState, action) {
    switch (action.type) {
        case STORE_ADD:
            return { ...state, insertStoreSuccess: action.payload.data,
                            status: action.payload.status }
        case STORE_INFO:
            return {...state, findStoreInfo: action.payload.data,
                status: action.payload.status}

        case STORE_SEARCH:
            return {...state, arrayStoreList: action.payload.data,
                status: action.payload.status}

        case STORE_LIMIT_SEARCH:
            return {...state, homeArrayStoreList: action.payload.data,
                status: action.payload.status}

        case STORE_UPDATE:
            return {...state, updateStoreSuccess: action.payload.data,
                status: action.payload.status}

        case STORE_ADMIN_LIST:
            return {...state, adminManagmentStoreList: action.payload.data,
                status: action.payload.status}
        default:
            return state;
    }
}

export default storeReducer;