import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Fix import
import authReducer from './reducers/authReducer';
import UserReducer from './reducers/UserReducer';
import storage from 'redux-persist/lib/storage'; // ✅ Use localStorage for persistence
import { persistStore, persistReducer } from 'redux-persist';

const initialState = {
  sidebarShow: true,
  theme: 'light', // ✅ Ensure light mode is the default
};

// UI reducer
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// ✅ Persist UI state (including theme)
const uiPersistConfig = {
  key: 'ui',
  storage, // Saves UI state (including theme) in localStorage
};

const rootReducer = combineReducers({
  auth: persistReducer({ key: 'auth', storage }, authReducer), // Persisted auth state
  user: persistReducer({ key: 'user', storage }, UserReducer), // Persisted user state
  ui: persistReducer(uiPersistConfig, changeState), // ✅ Persist UI state (fixes theme issue)
});

// Enable Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with persisted reducer
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store); // Persistor to rehydrate state

export { store, persistor };
