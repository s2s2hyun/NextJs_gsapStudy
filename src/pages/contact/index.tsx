import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import axios from "axios";
import { Box, styled } from "@mui/system";
import { Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "100px",
  height: "100vh",
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

export default function ContactPage() {
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
          {/* <Box sx={{ borderLeftWidth: "5px", borderLeftColor: "#000" }}>
            <Typography variant="h3" style={{ fontFamily: "Poppins" }}>
              CONTACT
            </Typography>
          </Box> */}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <CustomEmailTextField
              placeholder="이메일"
              //   value={commentEmail}
              //   onChange={(e) => setCommentEmail(e.target.value)}
            />
            <CustomNickNameTextField
              placeholder="이름"
              //   value={commentNickName}
              //   onChange={(e) => setCommentNickName(e.target.value)}
            />
          </Box>
          <CustomTextField
            placeholder="메세지를 입력하세요"
            //   value={commentData}
            //   onChange={(e) => setCommentData(e.target.value)}
            multiline
            rows={4}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
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
              type="submit">
              이메일 전송
            </Button>
          </Box>
        </InnerContainer>
      </Container>
    </Wrapper>
  );
}
