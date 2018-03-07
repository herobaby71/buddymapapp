import { FETCHING, SUCCESS, FAILURE } from './constants'

const initialState = {
  groups: [],
  isFetching: true,
  page: 1,
  seed: 1,
  refreshing: false,
  error: false
}

export default function groupsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        isFetching: false,
        refreshing: false,
        groups: action.data
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
