import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomPalette {
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

  interface Palette extends CustomPalette {}

  interface CustomTheme {
    palette: Palette;
  }

  interface Theme extends CustomTheme {}
}
