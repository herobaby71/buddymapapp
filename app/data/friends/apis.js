import { fetchApi } from '../../services/api'
import {getFriends, getFriendsSuccess, getFriendsFailure} from './actions'
import _ from 'lodash'

export function fetchFriendsFromAPI() {
  return (dispatch) => {
    dispatch(getFriends())
    fetchApi(`api/friend/get-friend-list/`,payload = {}, method = 'get', headers = {})
    .then(response => {
      // console.log("Response:", response)
      console.log("response friends:", response.friends)
      if(!_.isEmpty(response.friends) && response.success){
          dispatch(getFriendsSuccess(response.friends))
      }
      else{
        dispatch(getFriendsFailure())
      }
    })
    .catch(error => {
      throw error
      dispatch(getFriendsFailure(error))
    })
  }
}
