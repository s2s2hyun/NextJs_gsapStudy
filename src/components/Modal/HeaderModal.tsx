import React from "react";
import { styled, keyframes } from "@mui/system";
import Container from "@mui/material/Container";
import { Transition } from "react-transition-group";
import { useRouter } from "next/router";

// interface IHeaderModalProps {
//   isClicked: boolean;
//   setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
// }

interface HeaderModalProps {
  isOpen: boolean;
  close: () => void;
}

export default function HeaderModal({ isOpen, close }: HeaderModalProps) {
  const router = useRouter();

  const BoardHandler = () => {
    router.push("/board");
    close();
  };

  const HomeHandler = () => {
    router.push("/");
    close();
  };

  const ContactHandler = () => {
    router.push("/contact");
    close();
  };

  return (
    <HeaderModalWrapper isOpen={isOpen}>
      <Wrapper className="gallery">
        <Container maxWidth="xl">
          <InnerContainer>
            <h4
              style={{ fontSize: "40px", zIndex: "17" }}
              onClick={BoardHandler}>
              게시판
            </h4>
            <h4 style={{ fontSize: "40px" }} onClick={HomeHandler}>
              Home
            </h4>
            <h4 style={{ fontSize: "40px" }} onClick={ContactHandler}>
              CONTACT
            </h4>
          </InnerContainer>
        </Container>
      </Wrapper>
      <div style={{ position: "relative", bottom: "1rem" }}>
        <HeaderWave />
      </div>
    </HeaderModalWrapper>
  );
}

const HeaderModalWrapper = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "fixed",
  display: "flex", // add this line
  flexDirection: "column", // add this line
  width: "100%",
  zIndex: "15",
  animationFillMode: "forwards",
  animationDuration: "1s",
  animationName: `${isOpen ? slideIn : slideOut}`,
}));

const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.modalBackground.default,
  overflow: "hidden",
  zIndex: "1",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  fontSize: "100px",
  color: "#fff",
}));

const slideIn = keyframes`
  from {
    transform: translateY(-370px);
  }

  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-370px);
  }
`;

const waveAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -5000px 0; }
`;

const HeaderWave = styled("div")({
  content: '""',
  width: "300vw",
  display: "block",
  left: 0,
  backgroundImage: `url('/assets/header_wave.svg')`,
  backgroundRepeat: "repeat-x",
  backgroundPosition: "top left",
  animation: `${waveAnimation} 7s linear infinite`,
  backgroundSize: "100vw 100%",
  height: "5.6vw",
  zIndex: "1",
});
