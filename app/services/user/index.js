import store from 'FoodReact/app/config/store'

import * as api from './apis';

export const getUserInfo = () => {
  store.dispatch(api.fetchUserInfoFromAPI())
}
