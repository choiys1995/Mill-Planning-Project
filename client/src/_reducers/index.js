import {combineReducers} from 'redux'
import user from './user_reducer'
import reserve from './reserve_reducer'
import store from './store_reducer'
import review from './review_reducer'


const rootReducer = combineReducers({
    user, reserve, store, review
    //comment
})

export default rootReducer