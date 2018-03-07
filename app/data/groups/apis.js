import { fetchApi } from '../../services/api'
import {getGroups, getGroupsSuccess, getGroupsFailure} from './actions'
import _ from 'lodash'

export function fetchGroupsFromAPI() {
  return (dispatch) => {
    dispatch(getGroups())
    fetchApi(`api/group/getgroups/`,payload = {}, method = 'get', headers = {})
    .then(response => {
      // console.log("Response:", response)
      // console.log("response groups:", response.groups)
      if(!_.isEmpty(response.groups) && response.success){
          dispatch(getGroupsSuccess(response.groups))
      }
      else{
        dispatch(getGroupsFailure())
      }
    })
    .catch(error => {
      throw error
      dispatch(getGroupsFailure(error))
    })
  }
}
