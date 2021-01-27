import {
    REVIEW_INDEX,
    REVIEW_ADD
} from '../_actions/types'

const initialState = {
    error: null,
    review: null,
}

const reviewAction = function (state = initialState, action) {
    switch (action.type) {
        case REVIEW_INDEX:
            return { ...state, indexReview: action.payload.data,
                            status: action.payload.status }
        case REVIEW_ADD:
            return {...state, reviewAddSuccess: action.payload.data,
                status: action.payload.status}
        
        default:
            return state;
    }
}

export default reviewAction;