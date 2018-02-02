import { fetchApi } from '../../services/api'
import {getRequests, getRequestsSuccess, getRequestsFailure} from './actions'

export function fetchRequestsFromAPI() {
  return (dispatch) => {
    dispatch(getRequests())
    fetchApi(`api/friend/get-friend-requests/`,payload = {}, method = 'get', headers = {})
    .then(response => {
      console.log("Response Friends Requests:", response)
      if(response.success){
        dispatch(getRequestsSuccess(response.requests))
      }
      else{
        dispatch(getRequestsFailure())
      }
    })
    .catch(error => {
      throw error
      console.log("error",error)
      dispatch(getRequestsFailure(error))
    })
  }
}
