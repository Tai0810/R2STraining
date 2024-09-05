import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({ reducer: rootReducer });

export type DispatchState = ReturnType<typeof store.getState>;
export default store;
