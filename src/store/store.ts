import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./feature/modalSlice";
import tokenReducer from "./feature/tokenSlice";
import userReducer from "./feature/userSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    token: tokenReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
