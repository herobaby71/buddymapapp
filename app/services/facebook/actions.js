import {
  FACEBOOK_LOGIN_CLEAR,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILURE
} from './constants'
import { socialAuthenticate } from '../session'
export const facebookLogin = (data) => {
  return (dispatch) => {
    if(data.type == "success"){
      socialAuthenticate(data.credentials.token)
      .then(
        dispatch(facebookLoginSuccess(data))
      )
    }
    else{
      dispatch(facebookLoginFailure(data))
    }
  }
}

export const facebookLoginSuccess = (data) => ({
  type:FACEBOOK_LOGIN_SUCCESS,
  data
})

export const facebookLoginFailure = (data) => ({
  type:FACEBOOK_LOGIN_FAILURE,
  data
})

export const facebookClearCredentials = () => ({
  type:FACEBOOK_LOGIN_CLEAR,
})
