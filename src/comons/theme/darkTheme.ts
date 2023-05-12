import { createTheme } from "@mui/material/styles";
import { lightTheme } from "./lightTheme";

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: "dark",
    primary: {
      main: "#8E26DF",
    },
    secondary: {
      main: "#FF4081",
    },
    error: {
      main: "#F44336",
    },
    background: {
      default: "#333333",
      paper: "#181818",
    },
    text: {
      primary: "#ffffff",
      secondary: "#BDBDBD",
    },
  },
  custom: {
    container: {
      background: "#fff",
    },
    footer: {
      background: "#2C2C2C",
      text: "#C8C8C8",
    },
    button: {
      bg: {
        darkBtn: "#fff",
      },
      text: {
        darkBtn: "#000",
      },
    },
  },
});
