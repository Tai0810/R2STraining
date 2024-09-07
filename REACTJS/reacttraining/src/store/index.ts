import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { postsReducer } from "./reducers/postsReducer";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
