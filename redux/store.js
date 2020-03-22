import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// Create Persisted Reducer

const persistConfig = {
  key: "root",
  storage
};

export const persisitedReducer = persistReducer(persistConfig, rootReducer);

// Create Store

export const store = createStore(persisitedReducer, bindMiddleware([]));

export const initStore = () => {
  return store;
};

export const persistor = persistStore(store);

export const initPersistStore = () => {
  return persistStore(store);
};
