import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // ✅ Fix import
import authReducer from './reducers/authReducer';
import UserReducer from './reducers/UserReducer';
import storage from 'redux-persist/lib/storage'; // ✅ Use localStorage for persistence
import { persistStore, persistReducer } from 'redux-persist';

const initialState = {
  sidebarShow: true,
  theme: 'light',
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

// Configure Redux Persist for auth
const authPersistConfig = {
  key: 'auth',
  storage, // Stores auth data in localStorage
};

const userPersistConfig = {
  key: 'user',
  storage, // Stores auth data in localStorage
};

const uiPersistConfig = {
  key: 'ui',
  storage, // Stores auth data in localStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // Persisted auth state
  user: persistReducer(userPersistConfig, UserReducer), // Persisted user state
  ui: persistReducer(uiPersistConfig, changeState) // UI-related state (not persisted)
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
