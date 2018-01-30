import { fetchApi } from '../../services/api'
import {postLocation, postLocationSuccess, postLocationFailure} from './actions'

export function postLocationToAPI(coords) {
  return (dispatch) => {
    dispatch(postLocation())
    fetchApi(`api/locator/update/`,payload = {longitude:coords.longitude, latitude:coords.latitude}, method = 'post', headers = {})
    .then(response => {
      console.log("Response Location:", response)
      if(response.success){
        dispatch(postLocationSuccess(coords))
      }
      else{
        dispatch(postLocationFailure())
      }
    })
    .catch(error => {
      console.log("error",error)
      dispatch(postLocationFailure(error))
    })
  }
}
