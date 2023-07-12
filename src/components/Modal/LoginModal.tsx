import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "@/auth/Oauth";
import { login } from "@/store/feature/userSlice";

import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Image from "next/image";
import KakaoImg from "@/assets/icon/kakao.svg";
import NaverImg from "@/assets/icon/naver.svg";
import GoogleImg from "@/assets/icon/google.svg";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import { TypographyProps } from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import LoginLogo from "@/assets/icon/Group.png";
import { closeModal } from "@/store/feature/modalSlice";

interface LoginModalProps {
  isOpen: boolean;
}

export default function LoginModalPage({ isOpen }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  // const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      ); // withCredentials 옵션 추가
      console.log(response.data);
      dispatch(login({ username }));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKakaoLogin = () => {
    router.push(KAKAO_AUTH_URL);
  };

  const handleNaverLogin = () => {
    router.push(NAVER_AUTH_URL);
  };
  const handleGoogleLogin = () => {
    router.push(GOOGLE_AUTH_URL);
  };

  const ClickCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={ClickCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={isOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#fff",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}>
            <CustomLoginTitle variant="h2" component="h3">
              <div>
                <Image src={LoginLogo} alt="logo" />
              </div>
              로그인
            </CustomLoginTitle>
            <LoginForm onSubmit={handleSubmit}>
              <div style={{ display: "flex" }}>
                <CustomIdText variant="h3" component="h4">
                  <label>아이디</label>
                </CustomIdText>
                <CustomInput
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="입력해주세요"
                />
              </div>
              <div style={{ display: "flex", marginTop: "2rem" }}>
                <CustomIdText variant="h3" component="h4">
                  <label>비밀번호</label>
                </CustomIdText>
                <CustomInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="입력해주세요"
                />
              </div>
              <CustomButton type="submit">로그인</CustomButton>
            </LoginForm>
            <div style={{ display: "flex", gap: "1rem" }}>
              <KakaoButton onClick={handleKakaoLogin} type="button">
                <Image src={KakaoImg} width={40} height={40} alt="kakao" />
                Kakao Login
              </KakaoButton>
              <NaverButton onClick={handleNaverLogin} type="button">
                <Image src={NaverImg} width={40} height={40} alt="kakao" />
                Naver Login
              </NaverButton>
              <GoogleButton onClick={handleGoogleLogin} type="button">
                <Image src={GoogleImg} width={40} height={40} alt="kakao" />
                Google Login
              </GoogleButton>
            </div>
            <div onClick={ClickCloseModal}>close</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const LoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "80px 0 ",
}));

const CustomIdText = styled(Typography)<
  TypographyProps & { component: React.ElementType }
>(({ theme }) => ({
  color: "#000",
  fontSize: "20px",
  minWidth: "120px",
}));

const CustomButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.custom.button.bg.darkBtn,
  color: theme.custom.button.text.darkBtn,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "360px",
  height: "56px",
  fontSize: "18px",
  marginTop: "50px",
}));

const KakaoButton = styled("button")(({ theme }) => ({}) => ({
  // backgroundColor: theme.palette.background.default,
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  width: "200px",
}));

const NaverButton = styled("button")(({ theme }) => ({}) => ({
  // backgroundColor: theme.palette.background.default,
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  width: "200px",
}));

const GoogleButton = styled("button")(({ theme }) => ({}) => ({
  // backgroundColor: theme.palette.background.default,
  fontSize: "16px",
  color: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
}));

const CustomLoginTitle = styled(Typography)<
  TypographyProps & { component: React.ElementType }
>(({ theme }) => ({
  color: "#000",
  textAlign: "center",
  fontSize: "48px",
}));

const CustomInput = styled("input")({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "6px 12px",
  fontSize: "16px",
  marginLeft: "16px",
  width: "100%", // Set the width as needed
});
