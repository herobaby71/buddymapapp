import { combineReducers } from 'redux';
import friends from './friends/reducer'
import location from './location/reducer'
import friendrequests from './friendrequests/reducer'
import groups from './groups/reducer'

export default dataReducer = combineReducers({
    friends,
    friendrequests,
    groups,
    location
})
