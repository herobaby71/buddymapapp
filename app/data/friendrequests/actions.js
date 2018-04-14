import { FETCHING, SUCCESS, FAILURE } from './constants'

export function getRequests() {
  return {
    type: FETCHING
  }
}
export function getRequestsSuccess(data) {
  return {
    type: SUCCESS,
    data,
  }
}

export function getRequestsFailure() {
  return {
    type: FAILURE
  }
}
