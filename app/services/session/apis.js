import fetchival from 'fetchival'
import { fetchApi } from '../api'
import apiConfig from '../api/config'
import * as sessionSelectors from './selectors'

const endPoints = {
  social_authenticate: 'auth/convert-token/',
  authenticate: 'auth/token/',
  refresh:'auth/token/',
  revoke: 'auth/revoke-token/',
  verify_access: 'api/account/verify/'
}

export const authenticate = (email, password) => fetchApi(endPoints.authenticate,
   {client_id:apiConfig.clientId,
    client_secret:apiConfig.clientSecret,
    grant_type: "password",
    user_type:"customer",
    username:email,
    password:password},'post',{})

export const authenticateFacebook = (token) => fetchApi(endPoints.social_authenticate,
   {client_id:apiConfig.clientId,
    client_secret:apiConfig.clientSecret,
    grant_type: "convert_token",
    user_type:"customer",
    backend:"facebook",
    token:token},'post',{})

export const refresh = refresh_token => {
  console.log("Refresh API is Called")
  accessToken = null
  payload = {
    client_id:apiConfig.clientId,
    client_secret:apiConfig.clientSecret,
    grant_type:'refresh_token',
    refresh_token:refresh_token
  }
  return fetchival(`${apiConfig.url}${endPoints.refresh}`, {
    headers: {}
  })['post'](payload)
  .catch((error) => {
    if(error.response && error.response.json){
      error.response.json().then((json) => {
        if(json) throw json
        console.log("Error:",error)
        throw error
      })
    } else {
      console.log("Error:",error)
      throw error
    }
  })
}

export const revoke = token => fetchApi(endPoints.revoke,
  {client_id:apiConfig.clientId,
   client_secret:apiConfig.clientSecret,
   token:token},'post',{})
