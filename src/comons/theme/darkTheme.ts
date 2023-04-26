const pxToRem = (size: number) => `${size / 16}rem`;

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
}

interface CustomTheme {
  custom: {
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

export const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#8E26DF",
      contrastText: "#fff",
    },
    background: {
      default: "#333333",
      paper: "#181818",
      overlay: "#000000",
    },
    text: {
      primary: "#ffffff",
      contrastText: "#000000",
      secondary: "#BDBDBD",
      tertiary: "#DADADA",
      quaternary: "#333333",
    },
    custom: {
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
  },
  typography: {
    fontFamily: "NotoSans",
    fontSize: 16,
    pxToRem,
    h2: {
      lineHeight: "1",
      color: "#BDBDBD",
      fontSize: "4rem",
      fontWeight: "300",
    },
    subtitle1: {
      lineHeight: "1",
      color: "#333333",
      fontSize: "4rem",
      fontWeight: "bold",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1536,
    },
  },
  components: {
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
};
