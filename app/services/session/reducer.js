import {UPDATE, UPDATING} from './constants'

export const initialState = {
  isFetching:true,
  tokens:{
    access:{
      type:null,
      value:null,
      expiresIn:null,
      createdAt:null
    },
    refresh:{
      type:null,
      value:null,
    }
  }
}
export default sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return{
        ...action.session,
      }
    case UPDATING:
      return{
        ...state,
        isFetching:true,
      }
    default:
      return state
  }
}
