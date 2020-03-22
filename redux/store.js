import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers";

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const store = createStore(rootReducer, bindMiddleware([]));

export const initStore = () => {
  return store;
};

export const persistor = persistStore(store);

export const initPersistStore = () => {
  return persistStore(store);
};
