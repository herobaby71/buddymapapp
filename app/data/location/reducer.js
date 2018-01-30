import { POSTING, SUCCESS, FAILURE } from './constants'

const initialState = {
  coords: {},
  isPosting: false,
  error: false
}

export default function locationReducer (state = initialState, action) {
  switch (action.type) {
    case POSTING:
      return {
        ...state,
        coords: {},
        isPosting: true
      }
    case SUCCESS:
      return {
        ...state,
        error:false,
        isPosting: false,
        coords: action.data
      }
    case FAILURE:
      return {
        ...state,
        isPosting: false,
        error: true
      }
    default:
      return state
  }
}
