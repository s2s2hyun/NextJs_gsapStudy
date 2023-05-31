import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import { keyframes, styled } from "@mui/system";
import Container from "@mui/material/Container";

const FooterBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backdropFilter: "none",
  boxShadow: "none",
  backgroundColor: theme.palette.background.default,
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  borderTop: "1px solid #ebebeb",
}));

export default function LayoutFooter() {
  return (
    <FooterBox>
      <Container maxWidth="xl">
        <InnerContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "2.5rem 0 ",
              // textAlign: "center",
            }}>
            <span>
              ©2023 LDH.
              <br /> All Rights Reserved.
            </span>
            <span>Send Email</span>
            <ul
              style={{
                display: "flex",
                gap: "1rem",
                listStyle: "none",
                paddingLeft: "0px",
              }}>
              <li>hi</li>
              <li>hi</li>
              <li>hi</li>
              {/* <li>Github</li> */}
              {/* <li>Blog</li> */}
              {/* <li>LinkedIn</li> */}
            </ul>
          </div>
        </InnerContainer>
      </Container>
    </FooterBox>
  );
}
