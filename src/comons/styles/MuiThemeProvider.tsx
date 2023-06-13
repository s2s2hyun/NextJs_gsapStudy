import { ThemeProvider, Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { darkTheme } from "../theme/darkTheme";
import { lightTheme } from "../theme/lightTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleTheme } from "@/store/feature/themeSlice";

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

const MuiThemeProvider = ({ children }: CustomThemeProviderProps) => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const handleThemeChange = () => {
    dispatch(toggleTheme());
    console.log(isDarkMode, " isDarkMode");
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : (lightTheme as Theme)}>
      <div
        style={{
          position: "fixed",
          right: "5rem",
          bottom: "5rem",
          cursor: "pointer",
          userSelect: "none",
          zIndex: "10",
        }}
        onClick={handleThemeChange}
      >
        {isDarkMode ? <>☀️</> : <>🌙</>}
      </div>
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
