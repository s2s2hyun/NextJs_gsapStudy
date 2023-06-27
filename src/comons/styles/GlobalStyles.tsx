import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Add your global styles here */

      @font-face {
        font-family: "Poppins";
        src: url("/assets/font/Poppins-Medium.otf") format("opentype");
        font-weight: normal;
        font-style: normal;
      }
      body {
        margin: 0;
        font-family: "Poppins", Sans-serif;
        overflow-x: hidden;
      }
    `}
  />
);

export default GlobalStyles;
