import { UPDATE } from './constants'

export function updateMessages(data) {
  return {
    type: UPDATE,
    data: data
  }
}
