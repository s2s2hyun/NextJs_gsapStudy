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
import Container from "@mui/material/Container";
import HeaderModal from "../Modal/HeaderModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal, openModal } from "@/store/feature/modalSlice";

interface StyledButtonProps extends ButtonProps {
  isClicked?: boolean;
  isBoardPage?: boolean;
  isOpen?: boolean;
}

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  // backgroundColor: theme.palette.background.default,
  backdropFilter: "none",
  boxShadow: "none",
}));

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backdropFilter: "none",
  justifyContent: "flex-start",
  boxShadow: "none",
  zIndex: "16",

  backgroundColor: "var(--backgroundColor)",
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),

  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    // minHeight: "100px",
  },

  [theme.breakpoints.between("sm", "lg")]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },

  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(9),
    paddingRight: theme.spacing(9),
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
  ({ isBoardPage, isOpen, ...rest }: StyledButtonProps) => <Button {...rest} />
)<StyledButtonProps>(({ theme, isOpen, isBoardPage }) => ({
  margin: "0",
  padding: "0",
  border: "0",
  zIndex: "19",
  background: "transparent",
  overflow: "visible",
  cursor: "pointer",
  lineHeight: "1",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  "& span": {
    position: "absolute",
    zIndex: "16",
    left: 0,
    width: "40px",
    height: "3px",
    backgroundColor: isBoardPage ? "#000" : "#fff",
    borderRadius: "1.5px",
    cursor: "pointer",
  },
  "& .span_color1": {
    animation: isOpen ? `${rotateOneAnimation} 0.75s forwards` : "none",
  },
  "& .span_color2": {
    opacity: isOpen ? "0" : "1",
    marginTop: "1.5rem",
  },
  "& .span_color3": {
    animation: isOpen ? `${rotateTwoAnimation} 0.75s forwards` : "none",
    marginTop: "3rem",
  },
}));

export default function LayoutHeader() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const theme: Theme = useTheme();

  const ModalHandler = () => {
    if (isOpen) {
      dispatch(closeModal());
    } else {
      dispatch(openModal());
    }
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

  // console.log(isOpen, "isOpen");

  return (
    <>
      <StyledBox>
        <StyledAppBar position={isBoardPage ? "static" : "fixed"} theme={theme}>
          <Container
            maxWidth="lg"
            style={
              {
                backgroundColor: scrollPosition < 1000 ? "unset" : "#000",
              } as React.CSSProperties
            }>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              style={{ height: "100px" }}>
              <Box>
                <Typography>(로고)S2s2hyun</Typography>
              </Box>
              <Box display="flex" style={{ gap: "2rem" }}>
                <Typography style={{ fontFamily: "Poppins" }}>Blog</Typography>
                <Typography style={{ fontFamily: "Poppins" }}>
                  Project
                </Typography>
                <Typography style={{ fontFamily: "Poppins" }}>About</Typography>
                <Typography style={{ fontFamily: "Poppins" }}>
                  Contact
                </Typography>
              </Box>
            </Box>
          </Container>
        </StyledAppBar>
      </StyledBox>
    </>
  );
}
