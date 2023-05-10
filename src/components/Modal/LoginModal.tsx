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

import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";

interface LoginModalProps {
  setIsLogginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginModalOpen: boolean;
}

export default function LoginModalPage({
  setIsLogginModalOpen,
  isLoginModalOpen,
}: LoginModalProps) {
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

  const ClickCloseModal = () => {
    setIsLogginModalOpen(!isLoginModalOpen);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isLoginModalOpen}
        onClose={ClickCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={isLoginModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}>
            <div>hidsadsadasdsadsadasdsadas</div>
            <div onClick={ClickCloseModal}>close</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
