import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,

  //   backgroundColor: theme.palette.background.default,
  backdropFilter: "none",
  boxShadow: "none",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "none",
  justifyContent: "center",
  boxShadow: "none",
  minHeight: "150px",

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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "0",
  padding: "0",
  border: "0",
  // font: inherit;
  // color: inherit;
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
    width: "10%",
    height: "1px",
    backgroundColor: "#fff",
    borderRadius: "1.5px",
  },
  "& .span_color2": {
    marginTop: "1.5rem",
  },
  "& .span_color3": {
    marginTop: "3rem",
  },
}));

export default function LayoutHeader() {
  return (
    <StyledBox>
      <StyledAppBar position="absolute">
        <Toolbar>
          <StyledButton type="button" sx={{ flexGrow: 1 }}>
            <span className="span_color1"></span>
            <span className="span_color2"></span>
            <span className="span_color3"></span>
          </StyledButton>
          <Typography
            variant="h6"
            component="div"
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "Poppins',Sans-serif",
            }}
            sx={{ flexGrow: 1 }}>
            PPRK
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ color: "#fff", textAlign: "center" }}
            sx={{ flexGrow: 1 }}>
            한국어
          </Typography>
          {/* <Button color="inherit" style={{ color: "#fff" }}>
            Login
          </Button> */}
        </Toolbar>
      </StyledAppBar>
    </StyledBox>
  );
}
