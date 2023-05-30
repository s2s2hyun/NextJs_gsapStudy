import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import MuiThemeProvider from "@/comons/styles/MuiThemeProvider";
import GlobalStyles from "@/comons/styles/GlobalStyles";
import PageTransition from "@/components/Transition/PageTransition";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import LayoutFooter from "@/components/Layout/LayoutFooter";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
// const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {/* <ThemeProvider theme={theme}> */}
          <PageTransition>
            <MuiThemeProvider>
              {router.pathname !== "/gsap/chapter4/practice_one" &&
                router.pathname !== "/boardWrite" && <LayoutHeader />}
              <Component {...pageProps} />
              <LayoutFooter />
            </MuiThemeProvider>
          </PageTransition>
          {/* </ThemeProvider> */}
        </QueryClientProvider>
      </Provider>
    </>
  );
}
