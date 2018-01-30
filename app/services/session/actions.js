import {UPDATE, UPDATING} from './constants'

export const update = (session) => ({
  type: UPDATE,
  session
})

export const updating = () => ({
  type: UPDATING,
})
