import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Fix import
import authReducer from './reducers/authReducer';
import UserReducer from './reducers/UserReducer';
import profileReducer from './reducers/profileReducer';
import rolesReducer from './reducers/rolesReducer';
import storage from 'redux-persist/lib/storage'; // ✅ Use localStorage for persistence
import { persistStore, persistReducer } from 'redux-persist';
import applicationFilterSlice from './slicers/applicationFilterSlice';

const initialState = {
  sidebarShow: true,
  theme: 'light', // ✅ Ensure light mode is the default
  role: 1
};

// UI reducer
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    case 'switch_role':
      return { ...state, role: rest.role };
    default:
      return state;
  }
};

// Persist config for auth and user state
const authPersistConfig = {
  key: 'auth',
  storage, // Saves auth state in localStorage
};

// ✅ Persist UI state (including theme)
const uiPersistConfig = {
  key: 'ui',
  storage, // Saves UI state (including theme) in localStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // Persisted auth state
  user: persistReducer({ key: 'user', storage }, UserReducer), // Persisted user state
  profile: persistReducer({ key: 'profile', storage }, profileReducer), // Persisted user state
  roles: persistReducer({key: 'roles', storage}, rolesReducer),
  ui: persistReducer(uiPersistConfig, changeState), // ✅ Persist UI state (fixes theme issue)
  applicationFilter: applicationFilterSlice,
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
