import { createStore, applyMiddleware } from 'redux';
import combinedReducers from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel,
};

const pReducer = persistReducer(persistConfig, combinedReducers);
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
