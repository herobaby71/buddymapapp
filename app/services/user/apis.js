import { fetchApi } from '../api'
import { getUserInfo, getUserInfoSuccess, getUserInfoFailure } from './actions'

export function fetchUserInfoFromAPI(){
  return (dispatch) => {
    dispatch(getUserInfo())
    fetchApi(`api/account/info/`,payload = {}, method = 'get', headers = {})
    .then(response => {
      // console.log("GetUSER Response:",response)
      dispatch(getUserInfoSuccess(response))
    })
    .catch(error => {
      console.log("error",error)
      dispatch(getUserInfoFailure(error))
    })
  }
}
