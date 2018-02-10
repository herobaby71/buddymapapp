// Global API fetch (with token attached)
import fetchival from 'fetchival'
import _ from 'lodash'

import * as sessionSelectors from '../session/selectors'
import refresh from '../session/apis'
import apiConfig from './config'

export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
  const accessToken = sessionSelectors.get().tokens.access.value
  return fetchival(`${apiConfig.url}${endPoint}`, {
    headers: _.pickBy({
      ...(accessToken ? {Authorization:`Bearer ${accessToken}`} : {}),
      ...headers
    }, item => !_.isEmpty(item))
  })[method.toLowerCase()](payload)
	.catch((error) => {
		if(error.response.status === 401){
			console.log("401 Error")
			throw error
		}
    else if(error.response && error.response.json){
      error.response.json().then((json) => {
        if(json) throw json
        console.log("Error:",error)
        throw error
      })
    } else {
      console.log("Error:",error)
      throw error
    }
  })
}
