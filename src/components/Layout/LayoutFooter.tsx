import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import { keyframes, styled } from "@mui/system";
import Container from "@mui/material/Container";
import Image from "next/image";
import GithubLogo from "../../assets/logo/github-mark.svg";
import LinkedInLogo from "../../assets/logo/LI-In-Bug.png";
import InstaLogo from "../../assets/logo/Instagram_Glyph_Gradient.png";

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
            }}
          >
            <span>
              ©2023 LDH.
              <br /> All Rights Reserved.
            </span>
            <span>Send Email</span>
            <ul
              style={{
                display: "flex",
                gap: "1.5rem",
                listStyle: "none",
                paddingLeft: "0px",
              }}
            >
              <li>
                <Image
                  src={GithubLogo.src}
                  alt="logo"
                  width={40}
                  height={40}
                  onClick={() => window.open("https://github.com", "_blank")}
                />
              </li>
              <li>
                <Image
                  src={LinkedInLogo.src}
                  alt="logo"
                  width={40}
                  height={40}
                  onClick={() => window.open("https://linkedin.com", "_blank")}
                />
              </li>
              <li>
                <Image
                  src={InstaLogo.src}
                  alt="logo"
                  width={40}
                  height={40}
                  onClick={() => window.open("https://instagram.com", "_blank")}
                />
              </li>
            </ul>
          </div>
        </InnerContainer>
      </Container>
    </FooterBox>
  );
}
