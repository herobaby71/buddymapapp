import { combineReducers } from 'redux';
import friends from './friends/reducer'
import location from './location/reducer'
import friendrequests from './friendrequests/reducer'

export default dataReducer = combineReducers({
    friends,
    friendrequests,
    location
})
