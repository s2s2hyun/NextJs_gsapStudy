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

export default function BoardComment() {
  const [commentData, setCommentData] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentNickName, setCommentNickName] = useState("");

  // 대기
  // const fetchBoards = async () => {
  //   const response = await axios.post("대기");
  //   return response.data;
  // };

  // const { data, isLoading, error } = useQuery("boards", fetchBoards);
  // //  useQuery 비동기 처리 6/4 리액트쿼리

  // if (isLoading) {
  //   return "Loading";
  // }

  // if (error) {
  //   const errorMessage = (error as CustomError).message;
  //   return "An Error has occurred: " + errorMessage;
  // }
  // if (data) {

  //   console.log(data); // Example: '2 hours ago', '5 minutes ago'
  // }

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
        <form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <CustomTextField label="*댓글*" />
            <CustomEmailTextField label="*이메일*" />
            <CustomNickNameTextField label="*닉네임*" />
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
