import { FETCHING, SUCCESS, FAILURE } from './constants'

const initialState = {
  friends: [],
  isFetching: false,
  page: 1,
  seed: 1,
  refreshing: false,
  error: false
}

export default function friendsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        friends: [],
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        isFetching: false,
        refreshing: false,
        friends: action.data
      }
    case FAILURE:
      return {
        ...state,
        isFetching: false,
        refreshing: false,
        error: true
      }
    default:
      return state
  }
}
