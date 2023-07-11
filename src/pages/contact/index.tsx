import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import axios from "axios";
import { Box, styled } from "@mui/system";
import { Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";

const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "100px",
  height: "64vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
}));

const InnerContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
  width: "100%",
  minWidth: "300px",
  paddingBottom: "1rem",
}));

const CustomEmailTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
  width: "48%",
  minWidth: "200px",
  paddingBottom: "1rem",
}));

const CustomNickNameTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  },
  width: "48%",
  minWidth: "200px",
  paddingBottom: "1rem",
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일을 입력하세요.")
    .required("이메일은 필수입니다.")
    .min(10, "이메일은 최소 5글자 이상이어야 합니다."),
  nickname: yup
    .string()
    .required("닉네임은 필수입니다.")
    .min(2, "닉네임은 최소 2글자 이상이여야 합니다."),
  message: yup
    .string()
    .min(4, "메시지는 최소 4자 이상이어야 합니다.")
    .max(1000, "메시지는 최대 1000자까지 허용됩니다.")
    .required("메시지는 필수입니다."),
});

export default function ContactPage() {
  const [emailTime, setEmailTime] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const email = watch("email", ""); // "email" 입력 필드의 값에 접근
  const nickname = watch("nickname", ""); // "nickname" 입력 필드의 값에 접근
  const message = watch("message", ""); // "message" 입력 필드의 값에 접근

  const handleEmailSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/email/send", {
        to: data.email,
        subject: data.nickname,
        text: `이메일: ${data.email}\n닉네임: ${data.nickname}\n내용: ${data.message}`,
      });
      console.log("Email sent successfully", response.data);
      Cookies.set("emailSent", "true", { expires: 0.0104167 });

      const expirationTime = new Date().getTime() + 15 * 60 * 1000; // 현재 시간 + 15분
      Cookies.set("emailSentExpires", expirationTime.toString(), {
        expires: 0.0104167,
      });

      // 즉시 emailTime 업데이트
      const remainingSeconds = Math.floor(
        (expirationTime - new Date().getTime()) / 1000
      );
      setEmailTime(remainingSeconds);

      reset();
    } catch (error) {
      console.log("Failed to send email", error);
    }
  });

  useEffect(() => {
    const emailSentCookie = Cookies.get("emailSent");

    if (emailSentCookie) {
      const expirationTime = parseInt(
        Cookies.get("emailSentExpires") || "0",
        10
      );
      const currentTime = new Date().getTime();
      const remainingSeconds = Math.floor(
        (expirationTime - currentTime) / 1000
      );
      // console.log(remainingSeconds, "remainingSeconds");
      setEmailTime(remainingSeconds);

      const interval = setInterval(() => {
        const updatedCurrentTime = new Date().getTime();
        const updatedRemainingSeconds = Math.floor(
          (expirationTime - updatedCurrentTime) / 1000
        );
        setEmailTime(updatedRemainingSeconds);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [emailTime]);

  const minutes = Math.floor(emailTime / 60);
  const seconds = emailTime % 60;

  return (
    <Wrapper>
      <Container maxWidth="md">
        <Box style={{ padding: "2rem 0" }}>
          <div style={{ borderLeft: "5px solid #e2e8f0" }}>
            <Typography
              style={{ paddingLeft: "2rem", fontFamily: "Poppins" }}
              variant="h4">
              Contact
            </Typography>
          </div>
        </Box>
        <InnerContainer>
          <form onSubmit={handleEmailSubmit} style={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <CustomEmailTextField
                placeholder="이메일"
                value={email}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <CustomNickNameTextField
                placeholder="닉네임"
                value={nickname}
                {...register("nickname")}
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
              />
            </Box>
            <CustomTextField
              placeholder="내용을 입력하세요"
              {...register("message")}
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}>
              <Button
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#4a5568",
                  padding: "20px 30px",
                  border: "0",
                  borderRadius: "5px",
                  background: "#dfe5ed",
                  transition: "color 0.2s, background 0.2s",
                  "&:hover": {
                    color: "#fff",
                    background: "#8d99ff",
                    transition: "color 0.2s, background 0.2s",
                  },
                }}
                disabled={emailTime > 0}
                type="submit">
                {emailTime > 0
                  ? `이메일 전송 (${minutes}분 ${seconds}초 남음)`
                  : "이메일 전송"}
              </Button>
            </Box>
          </form>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
