import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { postsReducer } from "./reducers/postsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra tính khả chuyển của state
    }).concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./reducers/authReducer";
// import { postsReducer } from "./reducers/postsReducer";
// import { usersReducer } from "./reducers/usersReducer";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     posts: postsReducer,
//     users: usersReducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export default store;
