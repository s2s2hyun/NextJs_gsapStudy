import Cookie from "js-cookie";
import { setAccessToken, setRefreshToken } from "./tokenSlice";
import { AppDispatch } from "../store";

export const updateAccessToken = (token: string) => (dispatch: AppDispatch) => {
  Cookie.set("access_token", token);
  dispatch(setAccessToken(token));
};

export const updateRefreshToken =
  (token: string) => (dispatch: AppDispatch) => {
    Cookie.set("refresh_token", token);
    dispatch(setRefreshToken(token));
  };
