import { FETCHING, SUCCESS, FAILURE } from './constants'

export function getGroups() {
  return {
    type: FETCHING
  }
}

export function getGroupsSuccess(data) {
  return {
    type: SUCCESS,
    data,
  }
}

export function getGroupsFailure() {
  return {
    type: FAILURE
  }
}
