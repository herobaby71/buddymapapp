import {updateMessages} from './actions'
import _ from 'lodash'

export function update(messages, group_id) {
  data = { messages, group_id}
  // console.log("MESSAGE DATA:", data)
  return (dispatch) => {
    dispatch(updateMessages(data))
  }
}
