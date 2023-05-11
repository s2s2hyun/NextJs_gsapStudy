import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import MuiThemeProvider from "@/comons/styles/MuiThemeProvider";
import GlobalStyles from "@/comons/styles/GlobalStyles";
import PageTransition from "@/components/Transition/PageTransition";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PageTransition>
            <MuiThemeProvider>
              <Component {...pageProps} />
            </MuiThemeProvider>
          </PageTransition>
        </ThemeProvider>
      </Provider>
    </>
  );
}
