import {
  FACEBOOK_LOGIN_CLEAR,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILURE
}from './constants'

const initialState = {
  user: {},
  error:false,
  isLoggedIn:false,
}

export default function facebookloginReducer (state = initialState, action)
{
    switch(action.type){
      case FACEBOOK_LOGIN_CLEAR:
        return{
          ...state,
          error: false,
          isLoggedIn:false,
          user: {}
        }
      case FACEBOOK_LOGIN_SUCCESS:
        return{
          ...state,
          user: action.data,
          isLoggedIn:true,
          error:false
        }
      case FACEBOOK_LOGIN_FAILURE:
        return{
          ...state,
          error:false,
          isLoggedIn:false,
          user:{}
        }
      default:
        return state
    }
}
