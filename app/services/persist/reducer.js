import { UPDATE } from './constants'

export const initialState = {
  isHydrated: false
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case UPDATE:
      return action.payload
    default:
      return state
  }
}
