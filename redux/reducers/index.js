import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import codeReducer from "./codeReducer";

const persistConfig = {
  key: "root",
  storage
};

export const rootReducer = combineReducers({
  codeReducer
});

export default persistReducer(persistConfig, rootReducer);
