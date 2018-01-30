import store from '../../config/store'

import * as api from './apis';
import * as selectors from './selectors';
import * as actionCreators from './actions';
import { initialState } from './reducer';

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const setSessionTimeout = (duration) => {
	clearTimeout(sessionTimeout);
	sessionTimeout = setTimeout(
		refreshToken, // eslint-disable-line no-use-before-define
		(duration - SESSION_TIMEOUT_THRESHOLD) * 1000
	);
};

const clearSession = () => {
	clearTimeout(sessionTimeout);
	store.dispatch(actionCreators.update(initialState));
};

const onRequestSuccess = (response) => {
	console.log("Successfully Login with response:", response)
	const session = {
	  isFetching:false,
		tokens:{
			access:{
				type: response.token_type,
				value: response.access_token,
				expiresIn: response.expires_in,
			},
			refresh:{
				type: response.token_type,
				value: response.refresh_token,
			}
		}
	}
	store.dispatch(actionCreators.update(session));
	setSessionTimeout(session.tokens.access.expiresIn);
};

const onRequestFailed = (exception) => {
	console.log("Failed To login")
	clearSession();
	throw exception;
};

export const refreshToken = () => {
	const session = selectors.get();
	store.dispatch(actionCreators.updating)
	if (!session.tokens.refresh.value || !session.user.id) {
		return Promise.reject();
	}

	return api.refresh(session.tokens.refresh, session.user)
	.then(onRequestSuccess)
	.catch(onRequestFailed);
};

export const socialAuthenticate = (token) => {
	store.dispatch(actionCreators.updating())
  return api.authenticateFacebook(token)
  .then(onRequestSuccess)
  .catch(onRequestFailed);
}
export function authenticate(email, password){
	return (dispatch) => {
		dispatch(actionCreators.updating())
		api.authenticate(email, password)
		.then(onRequestSuccess)
		.catch(onRequestFailed)
	}
}

export const revoke = () => {
	const session = selectors.get();
	return api.revoke(Object.keys(session.tokens).map(tokenKey => ({
		type: session.tokens[tokenKey].type,
		value: session.tokens[tokenKey].value,
	})))
	.then(clearSession())
	.catch(() => {});
};
