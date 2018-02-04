import store from '../../config/store'

import * as api from './apis';

export const getUserInfo = () => {
  store.dispatch(api.fetchUserInfoFromAPI())
}

export function getUser(){
	return (dispatch) => {
		dispatch(api.fetchUserInfoFromAPI())
	}
}
