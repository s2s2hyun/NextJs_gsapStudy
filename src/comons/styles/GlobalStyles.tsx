import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Add your global styles here */
      body {
        margin: 0;
        font-family: sans-serif;
      }
    `}
  />
);

export default GlobalStyles;
