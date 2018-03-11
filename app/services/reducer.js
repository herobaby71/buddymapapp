import {combineReducers} from 'redux'
import session from './session/reducer'
import facebook from './facebook/reducer'
import persist from './persist/reducer'
import messages from './messages/reducer'
import user from './user/reducer'

export default servicesReducer = combineReducers({
  session,
  messages,
  // facebook,
  persist,
  user
})
