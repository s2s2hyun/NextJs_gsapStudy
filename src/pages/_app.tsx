import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useEffect, useState } from "react";
import MuiThemeProvider from "@/comons/styles/MuiThemeProvider";
import GlobalStyles from "@/comons/styles/GlobalStyles";
import { StylesProvider } from "@mui/styles";
import PageTransition from "@/components/Transition/PageTransition";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <StylesProvider injectFirst>
          <PageTransition>
            <MuiThemeProvider>
              <Component {...pageProps} />
            </MuiThemeProvider>
          </PageTransition>
        </StylesProvider>
      </Provider>
    </>
  );
}
