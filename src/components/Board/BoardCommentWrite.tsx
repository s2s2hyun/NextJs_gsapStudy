import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Box, styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

interface CustomError extends Error {
  message: string;
}

interface BoardCommentProps {
  id: string;
}

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
  width: "50%",
  minWidth: "200px",
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
  width: "50%",
  minWidth: "200px",
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function BoardComment({ id }: BoardCommentProps) {
  const [commentData, setCommentData] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentNickName, setCommentNickName] = useState("");

  // 대기
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.

    const commentWriteData = {
      comment: commentData,
      email: commentEmail,
      nickname: commentNickName,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/boards/${id}/comments`,
        commentWriteData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px 0 ",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" component="h2">
          댓글 제출
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          이메일 주소는 공개되지 않습니다. 필수 필드는 *로 표시됩니다.
        </Typography>
      </Box>
      <div>
        <form onSubmit={submitComment}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <CustomTextField
              label="*댓글*"
              onChange={(e) => setCommentData(e.target.value)}
            />
            <CustomEmailTextField
              label="*이메일*"
              onChange={(e) => setCommentEmail(e.target.value)}
            />
            <CustomNickNameTextField
              label="*닉네임*"
              onChange={(e) => setCommentNickName(e.target.value)}
            />
          </Box>
          <label>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox {...label} />
              <Typography>
                다음 번 댓글 작성을 위해 이 브라우저에 이름, 이메일, 그리고
                웹사이트를 저장합니다.(쿠키저장 예정)
              </Typography>
            </Box>
          </label>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                fontFamily: "notokr",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "100%",
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
              type="submit"
            >
              작성
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}
