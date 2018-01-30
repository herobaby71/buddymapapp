import {combineReducers} from 'redux'
import session from './session/reducer'
import facebook from './facebook/reducer'
import persist from './persist/reducer'
import user from './user/reducer'

export default servicesReducer = combineReducers({
  session,
  // facebook,
  persist,
  // user
})
