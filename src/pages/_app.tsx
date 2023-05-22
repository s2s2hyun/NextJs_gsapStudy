import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import MuiThemeProvider from "@/comons/styles/MuiThemeProvider";
import GlobalStyles from "@/comons/styles/GlobalStyles";
import PageTransition from "@/components/Transition/PageTransition";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import LayoutFooter from "@/components/Layout/LayoutFooter";
import { useRouter } from "next/router";

// const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        {/* <ThemeProvider theme={theme}> */}
        <PageTransition>
          <MuiThemeProvider>
            {router.pathname !== "/gsap/chapter4/practice_one" && (
              <LayoutHeader />
            )}

            <Component {...pageProps} />
            <LayoutFooter />
          </MuiThemeProvider>
        </PageTransition>
        {/* </ThemeProvider> */}
      </Provider>
    </>
  );
}
