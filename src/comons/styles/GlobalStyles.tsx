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

      @font-face {
        font-family: "NotoKr-Medium";
        src: url("/assets/font/Noto_Sans/NotoSansKR-Medium.otf")
          format("opentype");
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: "NotoKr-Bold";
        src: url("/assets/font/Noto_Sans/NotoSansKR-Bold.otf")
          format("opentype");
        font-weight: 700;
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
