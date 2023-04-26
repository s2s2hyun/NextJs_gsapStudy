import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useState } from "react";
import MuiThemeProvider from "@/comons/styles/MuiThemeProvider";
import GlobalStyles from "@/comons/styles/GlobalStyles";
import { StylesProvider } from "@mui/styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <StylesProvider injectFirst>
          <MuiThemeProvider>
            <Component {...pageProps} />
          </MuiThemeProvider>
        </StylesProvider>
      </Provider>
    </>
  );
}
