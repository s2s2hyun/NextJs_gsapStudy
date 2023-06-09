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
import Dark_GithubLogo from "../../assets/logo/github-mark.svg";
import Dark_LinkedInLogo from "../../assets/logo/LI-In-Bug.png";
import Dark_InstaLogo from "../../assets/logo/Instagram_Glyph_Gradient.png";

import footer_Logo from "@/assets/logo/footer.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@/store/feature/modalSlice";
import LoginModalPage from "../Modal/LoginModal";

const FooterBox = styled(Box)(({ theme }) => ({
  paddingTop: "5rem",
  flexGrow: 1,
  backdropFilter: "none",
  boxShadow: "none",
  backgroundColor: theme.palette.background.default,
}));

const InnerContainer = styled("div")<{ isDarkMode: boolean }>(
  ({ theme, isDarkMode }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
    borderTop: `1px solid ${isDarkMode ? "#000" : "#ebebeb"}`,
  })
);

export default function LayoutFooter() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const githubLogo = isDarkMode ? Dark_GithubLogo : GithubLogo;
  const linkedinLogo = isDarkMode ? Dark_LinkedInLogo : LinkedInLogo;
  const instaLogo = isDarkMode ? Dark_InstaLogo : InstaLogo;

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  console.log(isOpen, " isOpen??");

  const router = useRouter();

  const ClickHome = () => {
    router.push("/");
  };

  return (
    <>
      {isOpen && <LoginModalPage isOpen={isOpen} />}
      <FooterBox>
        <Container maxWidth="lg">
          <InnerContainer isDarkMode={isDarkMode}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2.5rem 0 ",
                // textAlign: "center",
              }}>
              <span onClick={handleOpenModal}>
                ©2023 LDH.
                <br /> All Rights Reserved.
              </span>
              <span>
                <Image
                  src={footer_Logo}
                  alt="footer_logo"
                  onClick={ClickHome}
                  style={{ cursor: "pointer" }}
                />
              </span>
              <ul
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  listStyle: "none",
                  paddingLeft: "0px",
                }}>
                <li>
                  <Image
                    src={githubLogo.src}
                    alt="logo"
                    width={40}
                    height={40}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open("https://github.com/s2s2hyun", "_blank")
                    }
                  />
                </li>
                <li>
                  <Image
                    src={linkedinLogo.src}
                    alt="logo"
                    width={40}
                    height={40}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/%EB%8F%99%ED%98%84-%EC%9E%84-06ba14240/",
                        "_blank"
                      )
                    }
                  />
                </li>
                <li>
                  <Image
                    src={instaLogo.src}
                    alt="logo"
                    width={40}
                    height={40}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/d.hyun_/",
                        "_blank"
                      )
                    }
                  />
                </li>
              </ul>
            </div>
          </InnerContainer>
        </Container>
      </FooterBox>
    </>
  );
}
