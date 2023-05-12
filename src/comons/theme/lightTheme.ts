import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

interface CustomTheme extends ThemeOptions {
  custom: {
    container: {
      background: string;
    };
    footer: {
      background: string;
      text: string;
    };
    button: {
      bg: {
        darkBtn: string;
      };
      text: {
        darkBtn: string;
      };
    };
  };
}

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

const baseTheme = createTheme();

export const lightTheme: Theme = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: "light",
    primary: {
      main: "#8E26DF",
      light: "#ABCDEF",
      dark: "#123456",
      contrastText: "#fff",
    },
    background: {
      default: "#ffffff",
      paper: "#f0f0f0",
    },
    text: {
      primary: "#333333",
      secondary: "#BDBDBD",
      disabled: "#FF0000",
    },
  },
  typography: {
    ...baseTheme.typography,
    fontFamily: "NotoSans",
    fontSize: 16,
    h2: {
      color: "#BDBDBD",
      fontSize: "4rem",
      fontWeight: "normal",
    },
    subtitle1: {
      color: "#333333",
      fontSize: "4rem",
      fontWeight: "bold",
    },
  },
  breakpoints: {
    ...baseTheme.breakpoints,
    values: {
      ...baseTheme.breakpoints.values,
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1536,
    },
  },
  components: {
    ...baseTheme.components,
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "unset",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "unset",
          backgroundImage: "none",
          backdropFilter: "blur(5px)",
        },
      },
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
        darkBtn: "#000",
      },
      text: {
        darkBtn: "#fff",
      },
    },
  },
};
