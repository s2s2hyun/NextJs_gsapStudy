import React from "react";
import Image from "next/image";
import { Box, styled } from "@mui/system";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import AboutMePic from "@/assets/picture/About_me.jpg";

import GithubLogo from "../../assets/logo/github-mark.svg";
import LinkedInLogo from "../../assets/logo/LI-In-Bug.png";
import InstaLogo from "../../assets/logo/Instagram_Glyph_Gradient.png";
import Dark_GithubLogo from "../../assets/logo/github-mark.svg";
import Dark_LinkedInLogo from "../../assets/logo/LI-In-Bug.png";
import Dark_InstaLogo from "../../assets/logo/Instagram_Glyph_Gradient.png";

import SkillCss3 from "../../assets/skillIcon/css3.svg";
import SkillHtml5 from "../../assets/skillIcon/html5.svg";
import SkillJavascript from "../../assets/skillIcon/javascript.svg";
import SkillNextjs from "../../assets/skillIcon/nextjs.svg";
import SkillReactjs from "../../assets/skillIcon/reactjs.svg";
import SkillTypescript from "../../assets/skillIcon/typescript.svg";

const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

export default function AboutPage() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const githubLogo = isDarkMode ? Dark_GithubLogo : GithubLogo;
  const linkedinLogo = isDarkMode ? Dark_LinkedInLogo : LinkedInLogo;
  const instaLogo = isDarkMode ? Dark_InstaLogo : InstaLogo;

  return (
    <Wrapper>
      <Container maxWidth="lg">
        <InnerContainer>
          {/* <Box>
            <div style={{ borderLeft: "5px solid #e2e8f0" }}>
              <Typography
                style={{ paddingLeft: "2rem", fontFamily: "Poppins" }}
                variant="h4">
                ABOUT
              </Typography>
            </div>
          </Box> */}
          {/* 사진 + 소개글 */}
          <Box
            style={{ width: "70%", paddingTop: "2rem" }}
            display="flex"
            flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Image
                  src={AboutMePic}
                  alt="picture"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center">
                <Typography style={{ fontFamily: "Poppins" }}>Hi!</Typography>
                <Typography style={{ fontFamily: "Poppins" }}>
                  Welcome to my Blog!
                </Typography>
                <Typography style={{ fontFamily: "Poppins" }}>
                  My name is s2s2hyun(임동현) I’m a front-end Web <br />{" "}
                  Developer based in South Korea. 👋 🧑🏻‍💻 🌳
                </Typography>
                <Box style={{ gap: "2rem" }}>
                  <Box
                    style={{
                      display: "flex",
                      height: "50px",
                      alignItems: "center",
                    }}>
                    <Image
                      src={githubLogo.src}
                      alt="logo"
                      width={30}
                      height={30}
                      style={{ cursor: "pointer" }}
                    />
                    <a
                      style={{
                        color: "#5a69eb",
                        cursor: "pointer",
                        paddingLeft: "1rem",
                      }}
                      onClick={() =>
                        window.open("https://github.com/s2s2hyun", "_blank")
                      }>
                      Github
                    </a>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      height: "50px",
                      alignItems: "center",
                    }}>
                    <Image
                      src={linkedinLogo.src}
                      alt="logo"
                      width={30}
                      height={30}
                      style={{ cursor: "pointer" }}
                    />
                    <a
                      style={{
                        color: "#5a69eb",
                        cursor: "pointer",
                        paddingLeft: "1rem",
                      }}
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/in/%EB%8F%99%ED%98%84-%EC%9E%84-06ba14240/",
                          "_blank"
                        )
                      }>
                      LinkedIn
                    </a>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "50px",
                    }}>
                    <Image
                      src={instaLogo.src}
                      alt="logo"
                      width={30}
                      height={30}
                      style={{ cursor: "pointer" }}
                    />
                    <a
                      style={{
                        color: "#5a69eb",
                        cursor: "pointer",
                        paddingLeft: "1rem",
                      }}
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/d.hyun_/",
                          "_blank"
                        )
                      }>
                      Instagram
                    </a>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* 사진밑 텍스트 */}
            <Box>
              <Typography style={{ fontFamily: "NotoKr-Medium" }}>
                주어진 상황에서 최선을 다해 최선의 해결책을 찾으려고 노력하는
                개발자, 꾸준한 실천으로 세상을 향해 비상하고 싶습니다.
              </Typography>
              <Typography
                style={{ fontFamily: "NotoKr-Medium", padding: "2rem 0" }}>
                Next.js React.js 프레임워크 기반 프론트엔드 웹 애플리케이션
                개발과 개발자에게 더 좋은 개발 환경을 만드는 것과 반복적인{" "}
                <br /> 업무의 자동화에 관심이 많은 프론트엔드 개발자
                임동현입니다.
              </Typography>
              <Box display="flex" gap={2}>
                <Image src={SkillCss3} alt="skill logo" />
                <Image src={SkillHtml5} alt="skill logo" />
                <Image src={SkillJavascript} alt="skill logo" />
                <Image src={SkillNextjs} alt="skill logo" />
                <Image src={SkillReactjs} alt="skill logo" />
                <Image src={SkillTypescript} alt="skill logo" />
              </Box>
            </Box>
            <ul style={{ paddingInlineStart: 0 }}>
              <Typography
                variant="h5"
                style={{ fontFamily: "NotoKr-Medium", padding: "2rem 0" }}>
                이렇게 일하고 있습니다.
              </Typography>
              <li style={{ marginLeft: "1.2rem" }}>준비중...</li>
              <Typography
                variant="h5"
                style={{ fontFamily: "NotoKr-Medium", padding: "2rem 0" }}>
                이런 일을 했습니다.
              </Typography>
              <li style={{ marginLeft: "1.2rem" }}>준비중...</li>
              <Typography
                variant="h5"
                style={{
                  fontFamily: "NotoKr-Medium",
                  padding: "2rem 0",
                }}>
                이런 일을 하고 싶습니다.
              </Typography>
              <li style={{ marginLeft: "1.2rem" }}>준비중...</li>
            </ul>
          </Box>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
