import { FETCHING, SUCCESS, FAILURE } from './constants'

export function getFriends() {
  return {
    type: FETCHING
  }
}

export function getFriendsSuccess(data) {
  return {
    type: SUCCESS,
    data,
  }
}

export function getFriendsFailure() {
  return {
    type: FAILURE
  }
}
