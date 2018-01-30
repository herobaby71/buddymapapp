import { fetchApi } from '../../services/api'
import {getFriends, getFriendsSuccess, getFriendsFailure} from './actions'

export function fetchFriendsFromAPI() {
  return (dispatch) => {
    dispatch(getFriends())
    fetchApi(`api/friend/get-friend-list/`,payload = {}, method = 'get', headers = {})
    .then(response => {
      console.log("Response Friends:", response)
      if(response.success){
        dispatch(getFriendsSuccess(response.friends))
      }
      else{
        dispatch(getFriendsFailure())
      }
    })
    .catch(error => {
      console.log("error",error)
      dispatch(getFriendsFailure(error))
    })
  }
}
