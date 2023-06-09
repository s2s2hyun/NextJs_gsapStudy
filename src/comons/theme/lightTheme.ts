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
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      color: string;
      fontSize: string;
      fontWeight: "normal" | "bold";
    };
    h2: {
      color: string;
      fontSize: string;
      fontWeight: "normal" | "bold";
    };
    subtitle1: {
      color: string;
      fontSize: string;
      fontWeight: "normal" | "bold";
    };
    [key: string]: any; // Optional, for any other typography styles you might add later
  };
}

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

const baseTheme = createTheme();

export const lightTheme: CustomTheme = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: "light",
    primary: {
      main: "#333333",
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
    fontFamily: "Poppins",
    fontSize: 16,
    h1: {
      color: "#718096",
      fontSize: "2.4rem",
      fontWeight: "normal",
    },
    h2: {
      color: "#718096",
      fontSize: "2rem",
      fontWeight: "normal",
    },
    subtitle1: {
      color: "#718096",
      fontSize: "1.6rem",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: "black",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "blue",
          // backgroundImage: "none",
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
