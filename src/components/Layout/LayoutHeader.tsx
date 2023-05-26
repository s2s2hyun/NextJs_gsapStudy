import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import { keyframes } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";
import HeaderModal from "../Modal/HeaderModal";
import { useRouter } from "next/router";

interface StyledButtonProps extends ButtonProps {
  isClicked?: boolean;
  isBoardPage?: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  // backgroundColor: theme.palette.background.default,
  backdropFilter: "none",
  boxShadow: "none",
}));

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  position: "fixed",
  backdropFilter: "none",
  justifyContent: "center",
  boxShadow: "none",
  minHeight: "150px",
  backgroundColor: "var(--backgroundColor)",
  paddingLeft: theme.spacing(9),
  paddingRight: theme.spacing(9),

  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    minHeight: "100px",
  },

  [theme.breakpoints.between("sm", "lg")]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    minHeight: "120px",
  },

  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(9),
    paddingRight: theme.spacing(9),
    minHeight: "150px",
  },
}));

const rotateOneAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(3px) rotate(0);
  }
  100% {
    transform: translateY(3px) rotate(45deg);
  }
`;

const rotateTwoAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(0);
  }
  100% {
    transform: translateY(-20px) rotate(-45deg);
  }
`;

const waveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -9999px 0; }
`;

const StyledButton = styled(
  ({ isBoardPage, isClicked, ...rest }: StyledButtonProps) => (
    <Button {...rest} />
  )
)<StyledButtonProps>(({ theme, isClicked, isBoardPage }) => ({
  margin: "0",
  padding: "0",
  border: "0",
  background: "transparent",
  overflow: "visible",
  cursor: "pointer",
  lineHeight: "1",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  "& span": {
    position: "absolute",
    left: 0,
    width: "40px",
    height: "3px",
    backgroundColor: "#fff",
    borderRadius: "1.5px",
    cursor: "pointer",
  },
  "& .span_color1": {
    animation: isClicked ? `${rotateOneAnimation} 0.75s forwards` : "none",
  },
  "& .span_color2": {
    opacity: isClicked ? "0" : "1",
    marginTop: "1.5rem",
  },
  "& .span_color3": {
    animation: isClicked ? `${rotateTwoAnimation} 0.75s forwards` : "none",
    marginTop: "3rem",
  },
}));

export default function LayoutHeader() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const theme: Theme = useTheme();

  const ModalHandler = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollPosition(
        window.pageYOffset || document.documentElement.scrollTop
      );
    };

    window.addEventListener("scroll", updateScrollPosition);

    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, []);
  // HeaderModal

  const router = useRouter();
  const isBoardPage = router.pathname === "/board";
  return (
    <>
      {isClicked ? (
        <HeaderModal isClicked={isClicked} setIsClicked={setIsClicked} />
      ) : null}
      <StyledBox
        style={
          {
            "--backgroundColor":
              scrollPosition < 1000
                ? "unset"
                : theme.palette.appBarBackground.default,
          } as React.CSSProperties
        }>
        <StyledAppBar position={isBoardPage ? "static" : "fixed"} theme={theme}>
          <Toolbar>
            <StyledButton
              type="button"
              sx={{ flexGrow: 1 }}
              onClick={ModalHandler}
              isClicked={isClicked}
              isBoardPage={isBoardPage}
              disableRipple>
              <span className="span_color1"></span>
              <span className="span_color2"></span>
              <span className="span_color3"></span>
            </StyledButton>
            <Typography
              variant="h4"
              component="div"
              style={{
                color: isBoardPage ? "red" : "blue",
                textAlign: "center",
                fontFamily: "Poppins, Sans-serif",
                fontWeight: "600",
              }}
              sx={{ flexGrow: 1 }}>
              PPRK
            </Typography>
            <Typography
              variant="h4"
              component="div"
              style={{
                color: isBoardPage ? "red" : "blue",
                textAlign: "center",
                fontFamily: "Poppins, Sans-serif",
                fontWeight: "600",
              }}
              sx={{ flexGrow: 1 }}>
              한국어
            </Typography>
          </Toolbar>
        </StyledAppBar>
      </StyledBox>
    </>
  );
}
