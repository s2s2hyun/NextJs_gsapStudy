import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { darkTheme } from "../theme/darkTheme";
import { lightTheme } from "../theme/lightTheme";

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

const MuiThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = () => {
    setIsDarkMode((prev) => !prev);
    console.log(isDarkMode, " isDarkMode");
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div
        style={{
          position: "fixed",
          right: "5rem",
          bottom: "5rem",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={handleThemeChange}>
        {isDarkMode ? <>☀️</> : <>🌙</>}
      </div>
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
