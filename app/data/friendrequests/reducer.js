import { FETCHING, SUCCESS, FAILURE } from './constants'

const initialState = {
  requests: [],
  isFetching: false,
  page: 1,
  seed: 1,
  refreshing: false,
  error: false
}

export default function requestsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        requests: [],
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        isFetching: false,
        refreshing: false,
        requests: action.data
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
