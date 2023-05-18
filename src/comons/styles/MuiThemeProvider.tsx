import { ThemeProvider, Theme } from "@mui/material/styles";
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

  // useEffect(() => {
  //   console.log(isDarkMode, " isDarkMode"); // This will reflect the updated state
  // }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : (lightTheme as Theme)}>
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
