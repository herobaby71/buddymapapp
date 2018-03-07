import store from 'FoodReact/app/config/store'

import * as api from './apis';

export const getGroups = () => {
  store.dispatch(api.fetchGroupsFromAPI())
}
