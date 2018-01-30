import {
  SUCCESS,
  FAILURE,
  FETCHING
} from './constants'

export const getUserInfo = (data) => ({
  type:FETCHING
})

export const getUserInfoSuccess = (data) => ({
  type:SUCCESS,
  data
})

export const getUserInfoFailure = (data) => ({
  type:FAILURE
})
