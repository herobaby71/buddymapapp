import { POSTING, SUCCESS, FAILURE } from './constants'

export function postLocation() {
  return {
    type: POSTING
  }
}

export function postLocationSuccess(data) {
  return {
    type: SUCCESS,
    data,
  }
}

export function postLocationFailure() {
  return {
    type: FAILURE
  }
}
