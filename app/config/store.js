import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import createFilter from 'redux-persist-transform-filter';
import { persistStore, persistReducer, persistCombineReducers} from 'redux-persist';
import { createStore, compose, applyMiddleware } from 'redux';

import data from '../data/reducer';
import services from '../services/reducer';
import * as persistActionCreators from '../services/persist/actions';

// AsyncStorage.clear()
const saveAndLoadSessionFilter = createFilter(
	'services',
	['session', 'messages'],
	['session', 'messages']
);

const rootPersistConfig =  {
	key:'primary',
	storage: AsyncStorage,
	blacklist: ['data'],
	transforms: [saveAndLoadSessionFilter],
}

const rootReducer = persistCombineReducers(rootPersistConfig,{
	services,
	data
});

const enhancer = compose(
	applyMiddleware(thunk),
	devTools()
);

const store = createStore(
	rootReducer,
	enhancer
);

export const persist = persistStore(store,
	null,
	() => store.dispatch(persistActionCreators.update({ isHydrated: true })));

export default store;
