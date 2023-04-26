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

export const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#8E26DF",
      contrastText: "#fff",
    },
    background: {
      default: "#ffffff", // Change this to a lighter color
      paper: "#f0f0f0", // Change this to a lighter color as well
    },
    text: {
      primary: "#333333", // Change this to a darker color
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
          darkBtn: "#000",
        },
        text: {
          darkBtn: "#fff",
        },
      },
    },
  },
  typography: {
    fontFamily: "NotoSans",
    fontSize: 16,
    pxToRem,
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
