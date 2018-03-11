import { UPDATE } from './constants'

const initialState = {
  messages:{},
  group_id:-1 //most recent group opened
}

export default function messagesReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      newState = {...state}
      newState.messages[action.data.group_id] = action.data.messages
      return {
        ...newState,
        group_id: action.data.group_id
      }
    default:
      return state
  }
}
