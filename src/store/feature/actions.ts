import { setAccessToken, setRefreshToken } from "./tokenSlice";
import { AppDispatch } from "../store";

export const updateAccessToken = (token: string) => (dispatch: AppDispatch) => {
  dispatch(setAccessToken(token));
};

export const updateRefreshToken =
  (token: string) => (dispatch: AppDispatch) => {
    dispatch(setRefreshToken(token));
  };
