
import {
  SUCCESS,
  FAILURE,
  FETCHING
}from './constants'

const initialState = {
  user: {},
  isFetching:false,
  error:false
}

export default function userReducer (state = initialState, action)
{
    switch(action.type){
      case SUCCESS:
        return{
          ...state,
          isFetching:false,
          error:false,
          user: {...action.data}
        }
      case FAILURE:
        return{
          ...state,
          isFetching:false,
          error:true,
          user: {}
        }
      case FETCHING:
        return{
          ...state,
          isFetching:true
        }
      default:
        return state
    }
}
