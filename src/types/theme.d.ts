import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomPalette {
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

  interface Palette extends CustomPalette {}

  interface CustomTheme {
    custom: any;
    palette: Palette;
  }

  interface Theme extends CustomTheme {}
}
