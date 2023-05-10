import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "@/auth/Oauth";
import { login } from "@/store/feature/userSlice";
import { Box } from "@mui/system";
import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { styled } from "@mui/system";
import Image from "next/image";
import KakaoImg from "@/assets/icon/kakao.svg";
import NaverImg from "@/assets/icon/naver.svg";
import GoogleImg from "@/assets/icon/google.svg";
import Typography from "@mui/material/Typography";
import { TypographyProps } from "@mui/material/Typography";

interface CustomButtonProps {
  lightBg?: boolean;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

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

  return (
    <>
      <CustomBackground>
        <Box maxWidth="lg">
          <div>
            <CustomLoginTitle variant="h2" component="h3">
              로그인
            </CustomLoginTitle>
            <LoginForm onSubmit={handleSubmit}>
              <div style={{ display: "flex" }}>
                <CustomIdText variant="h3" component="h4">
                  아이디
                </CustomIdText>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="입력해주세요"
                />
              </div>
              <div style={{ display: "flex", marginTop: "2rem" }}>
                <CustomIdText variant="h3" component="h4">
                  비밀번호
                </CustomIdText>
                <input
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
          </div>
        </Box>
      </CustomBackground>
    </>
  );
}

const LoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "100px 0 ",
}));

const CustomText = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "center",
  cursor: "pointer",
}));

const CustomLoginTitle = styled(Typography)<
  TypographyProps & { component: React.ElementType }
>(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const CustomIdText = styled(Typography)<
  TypographyProps & { component: React.ElementType }
>(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "20px",
  minWidth: "120px",
}));

const CustomTextTitle = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "center",
  cursor: "pointer",
}));

const CustomBackground = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const CustomButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.custom.button.darkBtn,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "#000",
  width: "420px",
  height: "56px",
  fontSize: "18px",
  marginTop: "50px",
}));

const KakaoButton = styled("button")(({ theme }) => ({}) => ({
  backgroundColor: theme.palette.background.default,
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,

  width: "200px",
}));

const NaverButton = styled("button")(({ theme }) => ({}) => ({
  backgroundColor: theme.palette.background.default,
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,
  width: "200px",
}));

const GoogleButton = styled("button")(({ theme }) => ({}) => ({
  backgroundColor: theme.palette.background.default,
  fontSize: "16px",

  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
}));

const LayHeaderCustomBackground = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
