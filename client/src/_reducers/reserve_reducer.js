import {
    RESERVE_ADD,
    RESERVE_INDEX,
    RESERVE_DELETE,
    PRE_RESERVE_DATA,
    RESERVE_DATA,
    ADMIN_RESERVE_DATA
} from '../_actions/types'

const initialState = {
    error: null,
    reserve: null,
    dateplan: null,
    payment: null,
}

const reserveAction = function (state = initialState, action) {
    switch (action.type) {
        case RESERVE_ADD:
            return { ...state, insertReserveSuccess: action.payload.data,
                            status: action.payload.status }
        
        case RESERVE_INDEX:
            return { ...state, indexReserveData: action.payload.data,
                        status: action.payload.status }

        case RESERVE_DELETE:
            return {...state, deleteReserveSuccess: action.payload.data,
                status: action.payload.status }
        
        case RESERVE_DATA:
            return {...state, viewReserveData: action.payload.data,
                    status: action.payload.status }
        case PRE_RESERVE_DATA:
            return {...state, viewPreReserveData: action.payload.data,
                    status: action.payload.status }

        case ADMIN_RESERVE_DATA:
            return {...state, viewAdminReserveData: action.payload.data,
                    status: action.payload.status }
        
        default:
            return state;
    }
}

export default reserveAction;