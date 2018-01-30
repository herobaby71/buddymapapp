import { fetchApi } from 'FoodReact/app/services/api'
import { getUserInfo, getUserInfoSuccess, getUserInfoFailure } from './actions'

export function fetchUserInfoFromAPI(){
  const queryString = require('query-string');
  return (dispatch) => {
    dispatch(getUserInfo())
    fetchApi(`api/customer/info/`,payload = {}, method = 'get', headers = {})
    .then(response => {
      console.log("GetUSER Response:",response)
      dispatch(getUserInfoSuccess(response))
    })
    .catch(error => {
      console.log("error",error)
      dispatch(getUserInfoFailure(error))
    })
  }
}
